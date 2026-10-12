CREATE TABLE public.diagnostic_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  access_token uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  name text,
  email text,
  whatsapp_number text,
  business_name text,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  stage text NOT NULL CHECK (stage IN ('growth_ready','stabilisation','crisis')),
  capacity_score integer NOT NULL DEFAULT 0 CHECK (capacity_score BETWEEN 0 AND 8),
  customer_money_score integer NOT NULL DEFAULT 0 CHECK (customer_money_score BETWEEN 0 AND 8),
  growth_score integer NOT NULL DEFAULT 0 CHECK (growth_score BETWEEN 0 AND 6),
  report_downloaded boolean NOT NULL DEFAULT false,
  enrolled boolean NOT NULL DEFAULT false
);

GRANT INSERT ON public.diagnostic_submissions TO anon, authenticated;
GRANT ALL ON public.diagnostic_submissions TO service_role;

ALTER TABLE public.diagnostic_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (anonymous diagnostic completion)
CREATE POLICY "Public can submit diagnostics"
  ON public.diagnostic_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    stage IN ('growth_ready','stabilisation','crisis')
    AND capacity_score BETWEEN 0 AND 8
    AND customer_money_score BETWEEN 0 AND 8
    AND growth_score BETWEEN 0 AND 6
  );

-- No public SELECT/UPDATE/DELETE. Reads and updates go through server functions using service role.

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_diagnostic_submissions_updated_at
  BEFORE UPDATE ON public.diagnostic_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX diagnostic_submissions_access_token_idx ON public.diagnostic_submissions(access_token);
CREATE INDEX diagnostic_submissions_created_at_idx ON public.diagnostic_submissions(created_at DESC);