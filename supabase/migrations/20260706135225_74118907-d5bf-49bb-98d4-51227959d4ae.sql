
CREATE TABLE public.enrolments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  business_name text NOT NULL DEFAULT '',
  business_description text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  laptop_access text NOT NULL DEFAULT '',
  gmail_account text NOT NULL DEFAULT '',
  computer_comfort text NOT NULL DEFAULT '',
  ai_tools_used text NOT NULL DEFAULT '',
  ai_tools_list text NOT NULL DEFAULT '',
  sessions_selected text[] NOT NULL DEFAULT '{}',
  week_preference text NOT NULL DEFAULT '',
  total_price integer NOT NULL DEFAULT 0,
  consent boolean NOT NULL DEFAULT false,
  updates boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','paid','cancelled'))
);

GRANT INSERT ON public.enrolments TO anon, authenticated;
GRANT ALL ON public.enrolments TO service_role;

ALTER TABLE public.enrolments ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an enrolment through the public form.
CREATE POLICY "Public can submit enrolments"
  ON public.enrolments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies for anon/authenticated: admin dashboard
-- goes through server functions using the service role, gated by the
-- admin session cookie.

CREATE INDEX enrolments_created_at_idx ON public.enrolments (created_at DESC);
