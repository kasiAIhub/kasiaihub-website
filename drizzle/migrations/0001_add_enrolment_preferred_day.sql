ALTER TABLE public.enrolments
  ADD COLUMN IF NOT EXISTS preferred_day text NOT NULL DEFAULT '';

UPDATE public.enrolments
SET preferred_day = COALESCE(days_available[1], '')
WHERE preferred_day = '';