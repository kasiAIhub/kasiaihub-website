import { createServerFn } from "@tanstack/react-start";

/**
 * Soft check used by /admin route loaders: reports whether the caller holds a
 * valid Supabase session belonging to an allowlisted staff email.
 */
export const checkAdminSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getAdminIdentity } = await import("./auth-admin.server");
    const admin = await getAdminIdentity();
    return {
      unlocked: admin !== null,
      email: admin?.email ?? null,
    };
  },
);
