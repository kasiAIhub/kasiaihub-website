ALTER TABLE public.enrolments
  ADD COLUMN IF NOT EXISTS preferred_location text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS days_available text[] NOT NULL DEFAULT '{}'::text[];

UPDATE public.enrolments SET preferred_location = location WHERE preferred_location = '';