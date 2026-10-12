// Single-winner orchestration for the paid AI paragraph.
// The database (claim_ai_opening) decides atomically who may call the AI
// Gateway; everyone else gets the saved opening or a "pending" answer.

export type ClaimOutcome =
  | "claimed"
  | "generated"
  | "pending"
  | "rate_limited"
  | "expired"
  | "unavailable"
  | "not_found";

export interface ClaimDeps {
  claim: (token: string, lease: string) => Promise<{ outcome: ClaimOutcome; opening: string | null }>;
  finish: (token: string, lease: string, opening: string) => Promise<boolean>;
  fail: (token: string, lease: string, terminal: boolean) => Promise<void>;
  generate: () => Promise<string | null>;
  isTerminalError: (err: unknown) => boolean;
  newLease?: () => string;
}

export interface OpeningResult {
  ai_opening: string | null;
  /** true = this report will never get a paragraph; stop polling. */
  unavailable: boolean;
  /** true = report-writing limit reached; show the "very busy" message. */
  busy?: boolean;
}

export async function generateOpeningOnce(token: string, deps: ClaimDeps): Promise<OpeningResult> {
  const lease = (deps.newLease ?? (() => crypto.randomUUID()))();
  const { outcome, opening } = await deps.claim(token, lease);
  switch (outcome) {
    case "generated":
      return { ai_opening: opening, unavailable: false };
    case "pending":
      return { ai_opening: null, unavailable: false };
    case "rate_limited":
      return { ai_opening: null, unavailable: true, busy: true };
    case "expired":
    case "unavailable":
    case "not_found":
      return { ai_opening: null, unavailable: true };
    case "claimed":
      break;
  }

  let text: string | null;
  try {
    text = await deps.generate();
  } catch (err) {
    const terminal = deps.isTerminalError(err);
    await deps.fail(token, lease, terminal);
    if (terminal) return { ai_opening: null, unavailable: true };
    return { ai_opening: null, unavailable: false };
  }
  if (!text) {
    await deps.fail(token, lease, false);
    return { ai_opening: null, unavailable: false };
  }
  const saved = await deps.finish(token, lease, text);
  // If our lease was lost, the stored value is authoritative; the next poll reads it.
  return saved ? { ai_opening: text, unavailable: false } : { ai_opening: null, unavailable: false };
}

// Supabase-backed deps (service role only; call from server handlers).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function supabaseClaimDeps(admin: any, visitor: string | null = null): Pick<ClaimDeps, "claim" | "finish" | "fail"> {
  return {
    async claim(token, lease) {
      const { data, error } = await admin.rpc("claim_ai_opening", { _token: token, _lease: lease, _visitor: visitor });
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      return { outcome: (row?.outcome ?? "not_found") as ClaimOutcome, opening: row?.opening ?? null };
    },
    async finish(token, lease, opening) {
      const { data, error } = await admin.rpc("finish_ai_opening", {
        _token: token,
        _lease: lease,
        _opening: opening,
      });
      if (error) {
        console.error("[ai-opening] finish failed", error);
        return false;
      }
      return Boolean(data);
    },
    async fail(token, lease, terminal) {
      const { error } = await admin.rpc("fail_ai_opening", {
        _token: token,
        _lease: lease,
        _terminal: terminal,
      });
      if (error) console.error("[ai-opening] fail-mark failed", error);
    },
  };
}
