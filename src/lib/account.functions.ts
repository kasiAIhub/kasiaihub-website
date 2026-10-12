import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type AccountReport = {
  access_token: string;
  created_at: string;
  name: string | null;
  business_name: string | null;
  email: string | null;
  ai_opening: string | null;
};

export type AccountEnrolment = {
  id: string;
  created_at: string;
  sessions_selected: string[];
  week_preference: string;
  total_price: number;
  status: string;
};

export type AccountData = {
  email: string;
  report: AccountReport | null;
  enrolments: AccountEnrolment[];
};

/**
 * Links records to the signed-in account.
 *
 * Matching is email-based: a submission is linked when its contact email
 * matches the account email exactly (case-insensitive) and it is not already
 * owned. Optionally scoped to one access token (the report the entrepreneur
 * just completed), plus a sweep for older matching saved records.
 */
export const linkMyRecords = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({ access_token: z.string().uuid().optional() })
      .default({})
      .parse(data ?? {}),
  )
  .handler(async ({ data }) => {
    const { getCurrentUser } = await import("./auth-admin.server");
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    // Verified-email check happens inside, against the auth service.
    const { linkRecordsForUser } = await import("./account-linking.server");
    const { linkedReport, reportIsMine } = await linkRecordsForUser(
      user.userId,
      data.access_token,
    );

    return { ok: true as const, linkedReport, reportIsMine };
  });


export const getMyAccount = createServerFn({ method: "GET" }).handler(
  async (): Promise<AccountData> => {
    const { getCurrentUser } = await import("./auth-admin.server");
    const user = await getCurrentUser();
    if (!user?.email) throw new Error("Unauthorized");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: reports, error: repErr } = await supabaseAdmin
      .from("diagnostic_submissions")
      .select(
        "access_token, created_at, name, business_name, email, ai_opening",
      )
      .eq("user_id", user.userId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (repErr) console.error("[account] report fetch failed", repErr);

    const { data: enrolments, error: enrErr } = await supabaseAdmin
      .from("enrolments")
      .select("id, created_at, sessions_selected, week_preference, total_price, status")
      .eq("user_id", user.userId)
      .order("created_at", { ascending: false });
    if (enrErr) console.error("[account] enrolments fetch failed", enrErr);

    return {
      email: user.email,
      report: ((reports ?? [])[0] as unknown as AccountReport) ?? null,
      enrolments: (enrolments ?? []) as unknown as AccountEnrolment[],
    };
  },
);
