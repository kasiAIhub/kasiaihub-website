CREATE TABLE public.kasi_move_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 120),
  stall_name text NOT NULL CHECK (length(btrim(stall_name)) BETWEEN 1 AND 120),
  whatsapp_number text NOT NULL UNIQUE CHECK (whatsapp_number ~ '^\+27[0-9]{9}$'),
  area text NOT NULL CHECK (length(btrim(area)) BETWEEN 1 AND 160)
);
GRANT INSERT ON public.kasi_move_waitlist TO anon, authenticated;
GRANT ALL ON public.kasi_move_waitlist TO service_role;
ALTER TABLE public.kasi_move_waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can join waitlist" ON public.kasi_move_waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);