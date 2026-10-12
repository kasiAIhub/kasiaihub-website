import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normaliseSaWhatsApp } from "./kasi-move-phone";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  stall_name: z.string().trim().min(1).max(120),
  whatsapp: z.string().trim().min(1).max(30),
  area: z.string().trim().min(1).max(160),
  biggest_headache: z.string().trim().max(300).optional().default(""),
  website: z.string().max(200).optional().default(""), // honeypot
});

export const joinKasiMoveWaitlist = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // bot: pretend success
    const phone = normaliseSaWhatsApp(data.whatsapp);
    if (!phone) throw new Error("Please enter a valid WhatsApp number, e.g. 0791234567.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("kasi_move_waitlist")
      .upsert(
        { name: data.name, stall_name: data.stall_name, whatsapp_number: phone, area: data.area, biggest_headache: data.biggest_headache || null },
        { onConflict: "whatsapp_number", ignoreDuplicates: true },
      )
      .select("id");
    if (error) {
      console.error("[kasi-move] insert failed", error);
      throw new Error("Could not save your place. Please try again.");
    }
    const row = inserted?.[0];
    if (row) {
      // Staff notification; the signup is already saved, so a failed email never fails the signup.
      try {
        const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
        await sendTemplateEmail("kasi-move-waitlist-signup", "kasihubai@gmail.com", {
          templateData: { name: data.name, stallName: data.stall_name, whatsapp: phone, area: data.area, headache: data.biggest_headache },
          idempotencyKey: `kasi-move-waitlist-signup-${row.id}`,
        });
      } catch (e) {
        console.error("[kasi-move] notification email failed", e);
      }
    }
    return { ok: true };
  });

export type WaitlistRow = {
  id: string;
  created_at: string;
  name: string;
  stall_name: string;
  whatsapp_number: string;
  area: string;
  biggest_headache: string | null;
};

export const listKasiMoveWaitlist = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdminUnlocked } = await import("./admin-session.server");
  await requireAdminUnlocked();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error, count } = await supabaseAdmin
    .from("kasi_move_waitlist")
    .select("id, created_at, name, stall_name, whatsapp_number, area, biggest_headache", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(2000);
  if (error) throw new Error("Could not load waitlist");
  return { rows: (data ?? []) as WaitlistRow[], total: count ?? data?.length ?? 0 };
});
