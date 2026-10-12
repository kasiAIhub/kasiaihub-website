import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type AdminIdentity = { userId: string; email: string };

function bearerToken(): string | null {
  const request = getRequest();
  const header = request?.headers?.get("authorization");
  if (!header || !header.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  if (!token || token.split(".").length !== 3) return null;
  return token;
}

/** Verifies the Supabase bearer token and returns the signed-in user, or null. */
export async function getCurrentUser(): Promise<AdminIdentity | null> {
  const token = bearerToken();
  if (!token) return null;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase server env is not configured");

  const client = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client.auth.getClaims(token);
  const claims = data?.claims as { sub?: string; email?: string } | undefined;
  if (error || !claims?.sub) return null;
  return { userId: claims.sub, email: (claims.email ?? "").toLowerCase() };
}

/** True when the signed-in user's email is on the staff allowlist. */
export async function getAdminIdentity(): Promise<AdminIdentity | null> {
  const user = await getCurrentUser();
  if (!user?.email) return null;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("admin_emails" as never)
    .select("email")
    .eq("email", user.email)
    .maybeSingle();
  if (error) {
    console.error("[admin] allowlist lookup failed", error);
    return null;
  }
  return data ? user : null;
}

export async function requireAdmin(): Promise<AdminIdentity> {
  const admin = await getAdminIdentity();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}
