import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submitSchema = z.object({
  business_name: z.string().trim().min(1, "Business name is required").max(200),
  whatsapp_number: z.string().trim().min(6, "WhatsApp number is required").max(40),
  contact_email: z.string().trim().max(200).optional().default(""),
  answers: z.record(z.string(), z.string().max(1000)),
});

export const submitTownshipStudy = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    const hasAnswer = Object.values(data.answers).some(
      (v) => typeof v === "string" && v.trim().length > 0,
    );
    if (!hasAnswer) {
      throw new Error("Please answer at least one question before submitting.");
    }

    const email = data.contact_email?.trim() ?? "";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address, or leave it blank.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("township_study_responses" as never)
      .insert({
        business_name: data.business_name.trim(),
        whatsapp_number: data.whatsapp_number.trim(),
        contact_email: email || null,
        answers: data.answers,
      } as never);

    if (error) {
      console.error("[township-study] insert failed", error);
      throw new Error("Could not save your response. Please try again.");
    }
    return { ok: true };
  });
