/**
 * Report / enrolment to account linking.
 *
 * Security rule: a record attaches to an account ONLY when
 *   1. the record has no owner yet (never overwrite an existing owner), and
 *   2. the email stored on the record matches the signed-in account's
 *      VERIFIED email (case-insensitive), checked server-side against the
 *      auth service — never trusted from the browser or token claims alone.
 * A report link (access token) is a read-only viewing key; on its own it
 * never grants ownership.
 */

export type LinkDeps = {
  /** Lowercased email if the account's email is verified, else null. */
  getVerifiedEmail: (userId: string) => Promise<string | null>;
  /** Report row for a token, or null. */
  findReportByToken: (
    token: string,
  ) => Promise<{ id: string; email: string | null; user_id: string | null } | null>;
  /** Conditionally set owner where id matches, owner is null and email matches. Returns rows changed. */
  claimReportById: (id: string, userId: string, email: string) => Promise<number>;
  /** Attach unowned reports with this email. Returns rows changed. */
  claimReportsByEmail: (userId: string, email: string) => Promise<number>;
  /** Attach unowned enrolments with this email. */
  claimEnrolmentsByEmail: (userId: string, email: string) => Promise<number>;
};

export async function linkRecordsCore(
  userId: string,
  accessToken: string | undefined,
  deps: LinkDeps,
): Promise<{ linkedReport: boolean; reportIsMine: boolean }> {
  const email = await deps.getVerifiedEmail(userId);
  let linkedReport = false;
  let reportIsMine = false;

  if (email && accessToken) {
    const report = await deps.findReportByToken(accessToken);
    if (
      report &&
      report.user_id === null &&
      report.email &&
      report.email.toLowerCase() === email
    ) {
      linkedReport = (await deps.claimReportById(report.id, userId, email)) > 0;
    }
  }

  if (email) {
    linkedReport = (await deps.claimReportsByEmail(userId, email)) > 0 || linkedReport;
    await deps.claimEnrolmentsByEmail(userId, email);
  }

  if (accessToken) {
    const after = await deps.findReportByToken(accessToken);
    reportIsMine = after?.user_id === userId;
  }
  return { linkedReport, reportIsMine };
}

async function supabaseLinkDeps(): Promise<LinkDeps> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const escape = (e: string) => e.replace(/[\\%_]/g, (c) => `\\${c}`);
  return {
    async getVerifiedEmail(userId) {
      const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);
      if (error || !data?.user) return null;
      const u = data.user;
      if (!u.email || !u.email_confirmed_at) return null;
      return u.email.trim().toLowerCase();
    },
    async findReportByToken(token) {
      const { data } = await supabaseAdmin
        .from("diagnostic_submissions")
        .select("id, email, user_id")
        .eq("access_token", token)
        .maybeSingle();
      return (data as { id: string; email: string | null; user_id: string | null } | null) ?? null;
    },
    async claimReportById(id, userId, email) {
      const { data, error } = await supabaseAdmin
        .from("diagnostic_submissions")
        .update({ user_id: userId } as never)
        .eq("id", id)
        .is("user_id", null)
        .ilike("email", escape(email))
        .select("id");
      if (error) console.error("[account] link report failed", error);
      return (data ?? []).length;
    },
    async claimReportsByEmail(userId, email) {
      const { data, error } = await supabaseAdmin
        .from("diagnostic_submissions")
        .update({ user_id: userId } as never)
        .is("user_id", null)
        .ilike("email", escape(email))
        .select("id");
      if (error) console.error("[account] link reports by email failed", error);
      return (data ?? []).length;
    },
    async claimEnrolmentsByEmail(userId, email) {
      const { data, error } = await supabaseAdmin
        .from("enrolments")
        .update({ user_id: userId } as never)
        .is("user_id", null)
        .ilike("gmail_account", escape(email))
        .select("id");
      if (error) console.error("[account] link enrolments failed", error);
      return (data ?? []).length;
    },
  };
}

export async function linkRecordsForUser(userId: string, accessToken?: string) {
  return linkRecordsCore(userId, accessToken, await supabaseLinkDeps());
}

/**
 * Returns the auth user id for this email, creating an UNVERIFIED account if
 * none exists. No records are linked here — linking waits until the real
 * owner signs in through their own email link (which verifies the address).
 */
export async function ensureAccountForEmail(email: string): Promise<string | null> {
  const normalised = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalised)) return null;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("[account] cannot create account: server env missing");
    return null;
  }

  try {
    const res = await fetch(
      `${url}/auth/v1/admin/users?filter=${encodeURIComponent(normalised)}`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
    );
    if (res.ok) {
      const body = (await res.json()) as { users?: Array<{ id: string; email?: string }> };
      const existing = (body.users ?? []).find(
        (u) => (u.email ?? "").toLowerCase() === normalised,
      );
      if (existing) return existing.id;
    }
  } catch (err) {
    console.error("[account] user lookup failed", err);
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: normalised,
    email_confirm: false,
  });
  if (error || !data?.user) {
    console.error("[account] account creation failed", error);
    return null;
  }
  return data.user.id;
}
