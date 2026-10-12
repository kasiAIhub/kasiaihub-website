
CREATE TABLE public.township_study_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  business_name TEXT,
  contact_email TEXT,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb
);

GRANT INSERT ON public.township_study_responses TO anon, authenticated;
GRANT ALL ON public.township_study_responses TO service_role;

ALTER TABLE public.township_study_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit township study responses"
  ON public.township_study_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (jsonb_typeof(answers) = 'object');
