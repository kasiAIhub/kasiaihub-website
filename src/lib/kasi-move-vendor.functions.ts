import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normaliseSaWhatsApp } from "./kasi-move-phone";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const hoursSchema = z
  .array(
    z.object({
      day: z.enum(DAYS),
      from: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      to: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    }),
  )
  .min(1, "Please tick at least one opening day.")
  .max(7);

const schema = z.object({
  business_name: z.string().trim().min(1).max(120),
  owner_name: z.string().trim().min(1).max(120),
  whatsapp: z.string().trim().min(1).max(30),
  street_area: z.string().trim().min(1).max(200),
  town: z.string().trim().min(1).max(120),
  opening_hours: hoursSchema,
  menu_text: z.string().trim().min(1).max(4000),
  delivers: z.boolean(),
  rider_name: z.string().trim().max(120).optional().default(""),
  rider_whatsapp: z.string().trim().max(30).optional().default(""),
  delivery_areas: z.string().trim().max(300).optional().default(""),
  collects: z.boolean(),
  pay_cash: z.boolean(),
  pay_card: z.boolean(),
  pay_eft: z.boolean(),
  first_special: z.string().trim().max(300).optional().default(""),
  consent: z.literal(true),
  website: z.string().max(200).optional().default(""), // honeypot
});

export const submitKasiMoveVendorForm = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // bot: pretend success
    const phone = normaliseSaWhatsApp(data.whatsapp);
    if (!phone) throw new Error("Please enter a valid WhatsApp number, e.g. 0791234567.");
    let riderPhone: string | null = null;
    if (data.delivers) {
      if (!data.rider_name) throw new Error("Please add your rider's name, or choose No for delivery.");
      riderPhone = normaliseSaWhatsApp(data.rider_whatsapp);
      if (!riderPhone) throw new Error("Please enter a valid rider WhatsApp number, e.g. 0791234567.");
      if (!data.delivery_areas) throw new Error("Please add the areas you deliver to, or choose No for delivery.");
    }
    if (!data.pay_cash && !data.pay_card && !data.pay_eft)
      throw new Error("Please tick at least one way you take payment.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("kasi_move_vendor_intake")
      .upsert(
        {
          business_name: data.business_name,
          owner_name: data.owner_name,
          whatsapp_number: phone,
          street_area: data.street_area,
          town: data.town,
          opening_hours: data.opening_hours,
          menu_text: data.menu_text,
          delivers: data.delivers,
          rider_name: data.delivers ? data.rider_name : null,
          rider_whatsapp: data.delivers ? riderPhone : null,
          delivery_areas: data.delivers ? data.delivery_areas : null,
          collects: data.collects,
          pay_cash: data.pay_cash,
          pay_card: data.pay_card,
          pay_eft: data.pay_eft,
          first_special: data.first_special || null,
          consent: true,
        },
        { onConflict: "whatsapp_number" },
      )
      .select("id");
    if (error) {
      console.error("[kasi-move vendor] insert failed", error);
      throw new Error("Could not save your details. Please try again.");
    }
    const row = inserted?.[0];
    if (row) {
      // Staff notification; the form is already saved, so a failed email never fails the submission.
      try {
        const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
        await sendTemplateEmail("kasi-move-vendor-form", "kasihubai@gmail.com", {
          templateData: { name: data.owner_name, stallName: data.business_name, whatsapp: phone, town: data.town },
          idempotencyKey: `kasi-move-vendor-form-${row.id}`,
        });
      } catch (e) {
        console.error("[kasi-move vendor] notification email failed", e);
      }
    }
    return { ok: true };
  });

export type VendorIntakeRow = {
  id: string;
  created_at: string;
  business_name: string;
  owner_name: string;
  whatsapp_number: string;
  street_area: string;
  town: string;
  opening_hours: { day: string; from: string; to: string }[];
  menu_text: string;
  delivers: boolean;
  rider_name: string | null;
  rider_whatsapp: string | null;
  delivery_areas: string | null;
  collects: boolean;
  pay_cash: boolean;
  pay_card: boolean;
  pay_eft: boolean;
  first_special: string | null;
  consent: boolean;
  built: boolean;
};

export const listKasiMoveVendorForms = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdminUnlocked } = await import("./admin-session.server");
  await requireAdminUnlocked();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error, count } = await supabaseAdmin
    .from("kasi_move_vendor_intake")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error("Could not load vendor forms");
  return { rows: (data ?? []) as VendorIntakeRow[], total: count ?? data?.length ?? 0 };
});

export const setKasiMoveVendorBuilt = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), built: z.boolean() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./admin-session.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("kasi_move_vendor_intake")
      .update({ built: data.built })
      .eq("id", data.id);
    if (error) throw new Error("Could not update the entry");
    return { ok: true };
  });
