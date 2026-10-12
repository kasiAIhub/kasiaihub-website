import { describe, expect, it, vi } from "vitest";
import { generateOpeningOnce, type ClaimDeps, type ClaimOutcome } from "./ai-opening-claim.server";

class Terminal extends Error {}

// In-memory model of claim_ai_opening / finish / fail (same rules as the SQL,
// migration 0003). `log` is the shared rolling-hour claim log.
type Log = { at: number }[];
let clock = Date.now();
const now = () => clock;
function fakeDb(opts: { ageMs?: number; log?: Log } = {}) {
  const log = opts.log ?? [];
  const row = {
    created: now() - (opts.ageMs ?? 0),
    status: "pending",
    lease: null as string | null,
    leaseExp: 0,
    attempts: 0,
    opening: null as string | null,
  };
  let n = 0;
  const deps: Omit<ClaimDeps, "generate"> = {
    newLease: () => `lease-${++n}-${Math.random()}`,
    isTerminalError: (e) => e instanceof Terminal,
    async claim(_t, lease) {
      if (row.opening) return { outcome: "generated", opening: row.opening };
      if (row.status === "unavailable") return { outcome: "unavailable", opening: null };
      if (row.status === "generating") {
        if (row.leaseExp > now()) return { outcome: "pending", opening: null };
        Object.assign(row, { status: "unavailable", lease: null }); // fail closed
        return { outcome: "unavailable", opening: null };
      }
      if (now() - row.created > 3600_000) return { outcome: "expired", opening: null };
      if (row.attempts >= 3) {
        row.status = "unavailable";
        return { outcome: "unavailable", opening: null };
      }
      if (log.filter((l) => l.at > now() - 3600_000).length >= 40) return { outcome: "rate_limited", opening: null };
      log.push({ at: now() });
      Object.assign(row, { status: "generating", lease, leaseExp: now() + 180_000 });
      row.attempts += 1;
      return { outcome: "claimed" as ClaimOutcome, opening: null };
    },
    async finish(_t, lease, text) {
      if (row.lease !== lease || row.opening) return false;
      Object.assign(row, { opening: text, status: "generated", lease: null });
      return true;
    },
    async fail(_t, lease, terminal) {
      if (row.lease !== lease) return;
      Object.assign(row, { status: terminal ? "unavailable" : "failed", lease: null });
    },
  };
  return { row, deps, log };
}

describe("generateOpeningOnce", () => {
  it("first-time visitor gets a paragraph with one paid call", async () => {
    const { deps, row } = fakeDb();
    const generate = vi.fn(async () => "Hello Thandi");
    const res = await generateOpeningOnce("t", { ...deps, generate });
    expect(res).toEqual({ ai_opening: "Hello Thandi", unavailable: false });
    expect(generate).toHaveBeenCalledTimes(1);
    expect(row.status).toBe("generated");
  });

  it("two simultaneous calls on one token make only one paid call", async () => {
    const { deps } = fakeDb();
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const generate = vi.fn(async () => {
      await gate;
      return "Once";
    });
    const a = generateOpeningOnce("t", { ...deps, generate });
    const b = generateOpeningOnce("t", { ...deps, generate });
    await Promise.resolve();
    release();
    const results = await Promise.all([a, b]);
    expect(generate).toHaveBeenCalledTimes(1);
    expect(results).toContainEqual({ ai_opening: "Once", unavailable: false });
    expect(results).toContainEqual({ ai_opening: null, unavailable: false }); // pending
  });

  it("repeated calls reuse the saved opening", async () => {
    const { deps } = fakeDb();
    const generate = vi.fn(async () => "Saved");
    for (let i = 0; i < 5; i++) await generateOpeningOnce("t", { ...deps, generate });
    const last = await generateOpeningOnce("t", { ...deps, generate });
    expect(last.ai_opening).toBe("Saved");
    expect(generate).toHaveBeenCalledTimes(1);
  });

  it("expired report never calls the AI", async () => {
    const { deps } = fakeDb({ ageMs: 2 * 3600_000 });
    const generate = vi.fn(async () => "x");
    const res = await generateOpeningOnce("t", { ...deps, generate });
    expect(res).toEqual({ ai_opening: null, unavailable: true });
    expect(generate).not.toHaveBeenCalled();
  });

  it("failed generation can retry, but at most 3 paid attempts", async () => {
    const { deps } = fakeDb();
    const generate = vi.fn(async () => null);
    const results = [];
    for (let i = 0; i < 6; i++) results.push(await generateOpeningOnce("t", { ...deps, generate }));
    expect(generate).toHaveBeenCalledTimes(3);
    expect(results.at(-1)).toEqual({ ai_opening: null, unavailable: true });
  });

  it("failed generation then success on retry", async () => {
    const { deps } = fakeDb();
    const generate = vi.fn().mockRejectedValueOnce(new Error("net")).mockResolvedValueOnce("Second try");
    expect((await generateOpeningOnce("t", { ...deps, generate })).ai_opening).toBeNull();
    expect((await generateOpeningOnce("t", { ...deps, generate })).ai_opening).toBe("Second try");
  });

  it("terminal gateway error stops further attempts", async () => {
    const { deps } = fakeDb();
    const generate = vi.fn(async () => {
      throw new Terminal("402");
    });
    expect(await generateOpeningOnce("t", { ...deps, generate })).toEqual({ ai_opening: null, unavailable: true });
    await generateOpeningOnce("t", { ...deps, generate });
    expect(generate).toHaveBeenCalledTimes(1);
  });

  it("lease expiry during a hung call fails closed: no overlapping paid call", async () => {
    const { row, deps } = fakeDb();
    let release!: (v: string) => void;
    const generate = vi.fn(() => new Promise<string | null>((r) => (release = r)));
    const first = generateOpeningOnce("t", { ...deps, generate });
    await Promise.resolve();
    clock += 200_000; // hold (3 min) expires while first call is still running
    const second = await generateOpeningOnce("t", { ...deps, generate });
    expect(second).toEqual({ ai_opening: null, unavailable: true });
    expect(generate).toHaveBeenCalledTimes(1);
    release("Late text");
    await first;
    // Late result from a lost lease is not saved; still one paid call total.
    expect(row.opening).toBeNull();
    expect(generate).toHaveBeenCalledTimes(1);
  });

  it("timeout / unknown outcome (terminal) never retries", async () => {
    const { deps } = fakeDb();
    const generate = vi.fn(async () => {
      throw new Terminal("unknown_outcome");
    });
    for (let i = 0; i < 4; i++) await generateOpeningOnce("t", { ...deps, generate });
    expect(generate).toHaveBeenCalledTimes(1);
  });

  it("40 claims per rolling hour across reports, retries included", async () => {
    const log: Log = [];
    const generate = vi.fn(async () => null); // explicit failure -> retryable
    // 14 reports x 3 attempts would be 42; cap stops at 40.
    const reports = Array.from({ length: 14 }, () => fakeDb({ log }));
    for (let round = 0; round < 3; round++)
      for (const r of reports) await generateOpeningOnce("t", { ...r.deps, generate });
    expect(generate).toHaveBeenCalledTimes(40);
    expect(log.length).toBe(40);
    const fresh = fakeDb({ log });
    const res = await generateOpeningOnce("t", { ...fresh.deps, generate: vi.fn(async () => "x") });
    expect(res).toEqual({ ai_opening: null, unavailable: true, busy: true }); // rate limited, not billed
    clock += 3600_001; // window rolls over
    const later = fakeDb({ log });
    const ok = await generateOpeningOnce("t", { ...later.deps, generate: vi.fn(async () => "y") });
    expect(ok.ai_opening).toBe("y");
  });

  it("duplicates during a live hold get pending, not a second call", async () => {
    const { deps } = fakeDb();
    let release!: (v: string) => void;
    const generate = vi.fn(() => new Promise<string | null>((r) => (release = r)));
    const first = generateOpeningOnce("t", { ...deps, generate });
    await Promise.resolve();
    const dups = await Promise.all([1, 2, 3].map(() => generateOpeningOnce("t", { ...deps, generate })));
    dups.forEach((d) => expect(d).toEqual({ ai_opening: null, unavailable: false }));
    release("Done");
    expect((await first).ai_opening).toBe("Done");
    expect(generate).toHaveBeenCalledTimes(1);
  });
});

describe("report-writing limits", () => {
  it("rate-limited claim makes no paid call and reports busy", async () => {
    const generate = vi.fn(async () => "x");
    const res = await generateOpeningOnce("t", {
      claim: async () => ({ outcome: "rate_limited", opening: null }),
      finish: async () => true,
      fail: async () => {},
      generate,
      isTerminalError: () => false,
    });
    expect(generate).not.toHaveBeenCalled();
    expect(res).toEqual({ ai_opening: null, unavailable: true, busy: true });
  });
});
