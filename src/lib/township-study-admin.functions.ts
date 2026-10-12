import { createServerFn } from "@tanstack/react-start";

export type TownshipStudyRow = {
  id: string;
  created_at: string;
  business_name: string | null;
  whatsapp_number: string | null;
  contact_email: string | null;
  answers: Record<string, string>;
};

export const listTownshipStudyResponses = createServerFn({ method: "GET" }).handler(
  async () => {
    const { requireAdminUnlocked } = await import("./admin-session.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("township_study_responses" as never)
      .select("id, created_at, business_name, whatsapp_number, contact_email, answers")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) {
      console.error("[township-study] list failed", error);
      throw new Error("Could not load community study responses");
    }
    return (data ?? []) as unknown as TownshipStudyRow[];
  },
);
