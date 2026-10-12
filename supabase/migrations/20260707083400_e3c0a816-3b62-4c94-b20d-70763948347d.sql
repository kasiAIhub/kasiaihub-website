DROP POLICY IF EXISTS "Public can submit enrolments" ON public.enrolments;

CREATE POLICY "Public can submit enrolments"
ON public.enrolments
FOR INSERT
TO anon, authenticated
WITH CHECK (
  consent = true
  AND status = 'pending'
  AND length(btrim(full_name)) > 0
  AND length(full_name) <= 200
);