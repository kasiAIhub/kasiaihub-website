ALTER TABLE public.diagnostic_submissions
  ADD COLUMN IF NOT EXISTS magic_wand_answer text,
  ADD COLUMN IF NOT EXISTS readiness text,
  ADD COLUMN IF NOT EXISTS ai_opening text;