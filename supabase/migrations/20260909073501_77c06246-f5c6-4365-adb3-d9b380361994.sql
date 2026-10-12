REVOKE ALL ON public.admin_emails FROM anon, authenticated;
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_emails FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_emails_no_client_access" ON public.admin_emails;
CREATE POLICY "admin_emails_no_client_access"
ON public.admin_emails
FOR SELECT
TO anon, authenticated
USING (false);
COMMENT ON TABLE public.admin_emails IS 'Staff allowlist. Server-only: no client (anon/authenticated) access. Read via service role in auth-admin.server.ts.';