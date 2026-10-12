import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { buildSubmission } from "./diagnostic-data";

const stageEnum = z.enum(["growth_ready", "stabilisation", "crisis"]);

const submitSchema = z.object({
  answers: z.record(z.string(), z.union([z.string(), z.number()])),
  stage: stageEnum,
  capacity_score: z.number().int().min(0).max(8),
  customer_money_score: z.number().int().min(0).max(8),
  growth_score: z.number().int().min(0).max(6),
  first_name: z.string().trim().min(1).max(100).optional(),
  // Optional and forgiving: a mistyped address must never block the submission.
  email: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((v) => (v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : undefined)),
  business_name: z.string().trim().max(200).optional(),
  whatsapp_number: z.string().trim().max(50).optional(),
  // Collected before submission; report links are read-only afterwards.
  magic_wand_answer: z.string().trim().max(300).optional(),
});

function createPublicClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const submitDiagnostic = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    // Scores and stage are recomputed here from the exact answers being
    // saved, so the stored report, AI paragraph, email and report link all
    // come from one answer set. Incomplete answer sets are refused.
    const built = buildSubmission(data.answers);
    if (built.missing.length > 0) {
      throw new Error("Incomplete diagnostic");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("diagnostic_submissions")
      .insert({
        answers: data.answers,
        stage: built.stage,
        capacity_score: built.capacity_score,
        customer_money_score: built.customer_money_score,
        growth_score: built.growth_score,
        name: data.first_name || null,
        email: data.email ? data.email.toLowerCase() : null,
        business_name: data.business_name || null,
        whatsapp_number: data.whatsapp_number || null,
        magic_wand_answer: data.magic_wand_answer || null,
      })
      .select("id, access_token")
      .single();
    if (error) {
      console.error("[diagnostic] insert failed", error);
      throw new Error("Could not save diagnostic");
    }
    return { id: inserted.id as string, access_token: inserted.access_token as string };
  });

// Freshness (one hour), attempt limits and the single-winner claim are
// enforced in the database by claim_ai_opening.
export const generateDiagnosticOpening = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        access_token: z.string().uuid(),
        // Non-persisted prompt hint: the Magic Wand step runs after the
        // submission is saved (report links are read-only afterwards), so the
        // answer is passed along for the AI paragraph only, never stored.
        magic_wand_hint: z.string().trim().max(300).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing, error } = await supabaseAdmin
      .from("diagnostic_submissions")
      .select(
        "id, created_at, answers, stage, capacity_score, customer_money_score, growth_score, magic_wand_answer, ai_opening, name, business_name, email",
      )
      .eq("access_token", data.access_token)
      .single();
    if (error || !existing) {
      console.error("[diagnostic] generate-opening fetch failed", error);
      return { ai_opening: null as string | null, unavailable: false };
    }
    // Email a copy of the report whenever an address was given, regardless of
    // whether the AI paragraph could be written. Idempotent per submission.
    const emailReportCopy = async () => {
      const recipient = (existing.email as string | null) ?? null;
      if (!recipient) return;
      const { sendDiagnosticReportEmail } = await import("./report-email.server");
      await sendDiagnosticReportEmail({
        email: recipient,
        name: (existing.name as string | null) ?? null,
        accessToken: data.access_token,
        stage: existing.stage as string,
        submissionId: existing.id as string,
      });
    };

    // Reuse if already stored — never regenerate.
    if (existing.ai_opening) {
      await emailReportCopy();
      return { ai_opening: existing.ai_opening as string, unavailable: false };
    }
    // Atomic database claim: only one caller per fresh report may call the
    // paid AI service; duplicates get the saved opening or "pending".
    const { generateAiOpening, AiOpeningUnavailableError } = await import("./ai-opening.server");
    const { generateOpeningOnce, supabaseClaimDeps } = await import("./ai-opening-claim.server");
    const answers = (existing.answers ?? {}) as Record<string, unknown>;
    // Visitor = salted hash of the caller's IP (raw IP is never stored).
    const { getRequestHeader } = await import("@tanstack/react-start/server");
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;
    let visitor: string | null = null;
    if (ip) {
      const salt = process.env["SUPABASE_URL"] ?? "kasiaihub";
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${ip}`));
      visitor = Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
    }
    const result = await generateOpeningOnce(data.access_token, {
      ...supabaseClaimDeps(supabaseAdmin, visitor),
      isTerminalError: (err) => err instanceof AiOpeningUnavailableError,
      generate: () =>
        generateAiOpening({
          name: (existing.name as string | null) ?? null,
          businessName: (existing.business_name as string | null) ?? null,
          scores: {
            stage: existing.stage as "growth_ready" | "stabilisation" | "crisis",
            capacity: existing.capacity_score as number,
            money: existing.customer_money_score as number,
            growth: existing.growth_score as number,
          },
          answers,
          magicWand:
            (existing.magic_wand_answer as string | null) ?? (data.magic_wand_hint || null),
        }),
    });
    await emailReportCopy();
    return result;
  });

export const getDiagnosticByToken = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ access_token: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("diagnostic_submissions")
      .select(
        "id, created_at, access_token, name, email, whatsapp_number, business_name, answers, stage, capacity_score, customer_money_score, growth_score, magic_wand_answer, readiness, ai_opening",
      )
      .eq("access_token", data.access_token)
      .single();
    if (error || !row) {
      throw new Error("Report not found");
    }
    return row;
  });

export type DiagnosticSubmissionRow = {
  id: string;
  created_at: string;
  access_token: string;
  name: string | null;
  email: string | null;
  whatsapp_number: string | null;
  business_name: string | null;
  answers: Record<string, string | number | boolean | null>;
  stage: string;
  capacity_score: number;
  customer_money_score: number;
  growth_score: number;
  report_downloaded: boolean;
  enrolled: boolean;
  magic_wand_answer: string | null;
  readiness: string | null;
  ai_opening: string | null;
};

export const listDiagnosticSubmissions = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdminUnlocked } = await import("./admin-session.server");
  await requireAdminUnlocked();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("diagnostic_submissions")
    .select(
      "id, created_at, access_token, name, email, whatsapp_number, business_name, answers, stage, capacity_score, customer_money_score, growth_score, report_downloaded, enrolled, magic_wand_answer, readiness, ai_opening",
    )
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) {
    console.error("[diagnostic] list failed", error);
    throw new Error("Could not load diagnostic submissions");
  }
  return (data ?? []) as unknown as DiagnosticSubmissionRow[];
});

export const getDiagnosticByIdAdmin = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./admin-session.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("diagnostic_submissions")
      .select(
        "id, created_at, access_token, name, email, whatsapp_number, business_name, answers, stage, capacity_score, customer_money_score, growth_score, report_downloaded, enrolled, magic_wand_answer, readiness, ai_opening",
      )
      .eq("id", data.id)
      .single();
    if (error || !row) throw new Error("Submission not found");
    return row as unknown as DiagnosticSubmissionRow;
  });
