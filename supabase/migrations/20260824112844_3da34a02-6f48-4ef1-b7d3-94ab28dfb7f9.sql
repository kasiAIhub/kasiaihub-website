ALTER TABLE public.diagnostic_submissions ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.enrolments ADD COLUMN IF NOT EXISTS user_id uuid;
CREATE INDEX IF NOT EXISTS diagnostic_submissions_user_id_idx ON public.diagnostic_submissions (user_id);
CREATE INDEX IF NOT EXISTS enrolments_user_id_idx ON public.enrolments (user_id);
CREATE INDEX IF NOT EXISTS diagnostic_submissions_email_idx ON public.diagnostic_submissions (lower(email));
CREATE INDEX IF NOT EXISTS enrolments_gmail_idx ON public.enrolments (lower(gmail_account));

CREATE TABLE IF NOT EXISTS public.admin_emails (
  email text PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.admin_emails TO service_role;

ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_emails (email) VALUES ('kasihubai@gmail.com')
ON CONFLICT (email) DO NOTHING;