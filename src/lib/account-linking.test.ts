import { describe, it, expect } from "vitest";
import { linkRecordsCore, type LinkDeps } from "./account-linking.server";

type Report = { id: string; token: string; email: string | null; user_id: string | null };

function fake(users: Record<string, { email: string; verified: boolean }>, reports: Report[]) {
  const enrolments = [{ id: "e1", email: "owner@x.com", user_id: null as string | null }];
  const deps: LinkDeps = {
    getVerifiedEmail: async (id) => (users[id]?.verified ? users[id].email : null),
    findReportByToken: async (t) => reports.find((r) => r.token === t) ?? null,
    claimReportById: async (id, uid, email) => {
      const r = reports.find((x) => x.id === id && x.user_id === null && x.email === email);
      if (!r) return 0;
      r.user_id = uid;
      return 1;
    },
    claimReportsByEmail: async (uid, email) => {
      let n = 0;
      for (const r of reports) if (r.user_id === null && r.email === email) { r.user_id = uid; n++; }
      return n;
    },
    claimEnrolmentsByEmail: async (uid, email) => {
      let n = 0;
      for (const e of enrolments) if (e.user_id === null && e.email === email) { e.user_id = uid; n++; }
      return n;
    },
  };
  return { deps, reports, enrolments };
}

const users = {
  owner: { email: "owner@x.com", verified: true },
  stranger: { email: "stranger@x.com", verified: true },
  unverified: { email: "owner@x.com", verified: false },
};

describe("account linking", () => {
  it("another signed-in person cannot claim an owned report with the link", async () => {
    const { deps, reports } = fake(users, [
      { id: "r1", token: "t1", email: "owner@x.com", user_id: "owner" },
    ]);
    const res = await linkRecordsCore("stranger", "t1", deps);
    expect(res).toEqual({ linkedReport: false, reportIsMine: false });
    expect(reports[0].user_id).toBe("owner");
  });

  it("a non-matching email cannot claim an unowned report with the link", async () => {
    const { deps, reports } = fake(users, [
      { id: "r1", token: "t1", email: "owner@x.com", user_id: null },
    ]);
    const res = await linkRecordsCore("stranger", "t1", deps);
    expect(res.reportIsMine).toBe(false);
    expect(reports[0].user_id).toBeNull();
  });

  it("a report with no email cannot be claimed by link alone", async () => {
    const { deps, reports } = fake(users, [
      { id: "r1", token: "t1", email: null, user_id: null },
    ]);
    await linkRecordsCore("stranger", "t1", deps);
    expect(reports[0].user_id).toBeNull();
  });

  it("an unverified account with the matching email cannot claim reports or enrolments", async () => {
    const { deps, reports, enrolments } = fake(users, [
      { id: "r1", token: "t1", email: "owner@x.com", user_id: null },
    ]);
    await linkRecordsCore("unverified", "t1", deps);
    expect(reports[0].user_id).toBeNull();
    expect(enrolments[0].user_id).toBeNull();
  });

  it("the true owner (verified matching email) can claim report and enrolment", async () => {
    const { deps, reports, enrolments } = fake(users, [
      { id: "r1", token: "t1", email: "owner@x.com", user_id: null },
      { id: "r2", token: "t2", email: "owner@x.com", user_id: null },
    ]);
    const res = await linkRecordsCore("owner", "t1", deps);
    expect(res).toEqual({ linkedReport: true, reportIsMine: true });
    expect(reports.every((r) => r.user_id === "owner")).toBe(true);
    expect(enrolments[0].user_id).toBe("owner");
  });

  it("never overwrites an existing owner, even for a matching email", async () => {
    const { deps, reports } = fake(users, [
      { id: "r1", token: "t1", email: "owner@x.com", user_id: "someone-else" },
    ]);
    await linkRecordsCore("owner", "t1", deps);
    expect(reports[0].user_id).toBe("someone-else");
  });
});
