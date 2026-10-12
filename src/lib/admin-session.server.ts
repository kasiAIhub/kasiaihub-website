// Staff access is Supabase Auth + an email allowlist (public.admin_emails).
// The old shared-password cookie gate has been removed entirely.
export { getAdminIdentity, requireAdmin, getCurrentUser } from "./auth-admin.server";

import { requireAdmin } from "./auth-admin.server";

/** Kept for existing call sites: throws unless the caller is an allowlisted staff account. */
export async function requireAdminUnlocked() {
  await requireAdmin();
}
