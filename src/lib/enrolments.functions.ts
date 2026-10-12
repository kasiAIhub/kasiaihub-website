import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const statusValues = ["pending", "confirmed", "paid", "cancelled"] as const;
export type EnrolmentStatus = (typeof statusValues)[number];

export type EnrolmentRow = {
  id: string;
  created_at: string;
  full_name: string;
  business_name: string;
  business_description: string;
  whatsapp: string;
  location: string;
  laptop_access: string;
  gmail_account: string;
  computer_comfort: string;
  ai_tools_used: string;
  ai_tools_list: string;
  sessions_selected: string[];
  week_preference: string;
  preferred_location: string;
  days_available: string[];
  preferred_day: string;
  total_price: number;
  consent: boolean;
  updates: boolean;
  status: EnrolmentStatus;
};

// Server-side source of truth for pricing. Never trust the browser's total.
const SESSION_PRICES: Record<string, number> = {
  "Session 1": 1500,
  "Session 2": 1500,
  "Session 3": 1500,
  "Session 4": 4500,
  "Full Programme": 4000,
};
const ALLOWED_SESSIONS = Object.keys(SESSION_PRICES) as [string, ...string[]];
const MAX_SESSION_ITEMS = 20;

function normaliseWeekPreference(value: string): string {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  const match = trimmed.match(/^Week [1-9]\d?$/);
  if (match) return match[0];
  return "Flexible";
}

function computeTotalPrice(sessions: string[]): number {
  return sessions.reduce((sum, label) => sum + (SESSION_PRICES[label] ?? 0), 0);
}

const enrolmentInputSchema = z.object({
  full_name: z.string().trim().min(1).max(200),
  business_name: z.string().trim().max(200).default(""),
  business_description: z.string().trim().max(1000).default(""),
  whatsapp: z.string().trim().max(50).default(""),
  location: z.string().trim().max(200).default(""),
  laptop_access: z.string().trim().max(100).default(""),
  gmail_account: z.string().trim().max(100).default(""),
  computer_comfort: z.string().trim().max(100).default(""),
  ai_tools_used: z.string().trim().max(200).default(""),
  ai_tools_list: z.string().trim().max(1000).default(""),
  sessions_selected: z
    .array(z.enum(ALLOWED_SESSIONS))
    .max(MAX_SESSION_ITEMS)
    .default([]),
  week_preference: z.string().trim().max(50).default(""),
  preferred_location: z.enum(["Gauteng"]),
  preferred_day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
  // Accepted for backwards compatibility but ignored: the server recalculates.
  total_price: z.number().int().nonnegative().max(10_000_000).optional(),
  consent: z.boolean().default(false),
  updates: z.boolean().default(false),
  // Optional magic-link token from a completed Business Check. When present and
  // the enrolment saves, the matching diagnostic report is marked enrolled.
  diagnostic_access_token: z.string().uuid().optional(),
});


function createPublicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

export const submitEnrolment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enrolmentInputSchema.parse(data))
  .handler(async ({ data }) => {
    const { total_price: _ignored, diagnostic_access_token, ...rest } = data;
    const sessions_selected = rest.sessions_selected;
    const record = {
      ...rest,
      sessions_selected,
      week_preference: normaliseWeekPreference(rest.week_preference),
      location: rest.preferred_location,
      days_available: [rest.preferred_day],
      total_price: computeTotalPrice(sessions_selected),
      status: "pending" as const,
    };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("enrolments")
      .insert(record)
      .select("id")
      .single();

    if (error) {
      console.error("[enrolments] insert failed", error);
      throw new Error("Could not save enrolment");
    }

    // Create an unverified account so the entrepreneur can sign in later.
    // Records are NOT linked here: a typed email is not proof of ownership.
    // Linking happens when they sign in via their own email link (verified).
    try {
      const { ensureAccountForEmail } = await import("./account-linking.server");
      await ensureAccountForEmail(rest.gmail_account.trim().toLowerCase());
    } catch (err) {
      console.error("[enrolments] account setup failed", err);
    }

    // Mark the linked diagnostic report enrolled, but only alongside a real
    // enrolment — there is no standalone public endpoint for this update.
    if (diagnostic_access_token) {
      try {
        await supabaseAdmin
          .from("diagnostic_submissions")
          .update({ enrolled: true })
          .eq("access_token", diagnostic_access_token);
      } catch (err) {
        console.error("[enrolments] diagnostic enrolled flag failed", err);
      }
    }

    return { id: inserted.id as string };
  });



export const listEnrolments = createServerFn({ method: "GET" }).handler(
  async () => {
    const { requireAdminUnlocked } = await import("./admin-session.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { data, error } = await supabaseAdmin
      .from("enrolments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[enrolments] list failed", error);
      throw new Error("Could not load enrolments");
    }
    return (data ?? []) as unknown as EnrolmentRow[];
  },
);

export const updateEnrolmentStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(statusValues),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./admin-session.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { error } = await supabaseAdmin
      .from("enrolments")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) {
      console.error("[enrolments] update failed", error);
      throw new Error("Could not update enrolment");
    }
    return { ok: true as const };
  });

export const deleteEnrolment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./admin-session.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { error } = await supabaseAdmin
      .from("enrolments")
      .delete()
      .eq("id", data.id);
    if (error) {
      console.error("[enrolments] delete failed", error);
      throw new Error("Could not delete enrolment");
    }
    return { ok: true as const };
  });
