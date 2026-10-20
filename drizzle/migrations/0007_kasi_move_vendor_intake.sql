CREATE TABLE public.kasi_move_vendor_intake (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  business_name text NOT NULL CHECK (length(btrim(business_name)) BETWEEN 1 AND 120),
  owner_name text NOT NULL CHECK (length(btrim(owner_name)) BETWEEN 1 AND 120),
  whatsapp_number text NOT NULL UNIQUE CHECK (whatsapp_number ~ '^\+27[0-9]{9}$'),
  street_area text NOT NULL CHECK (length(btrim(street_area)) BETWEEN 1 AND 200),
  town text NOT NULL CHECK (length(btrim(town)) BETWEEN 1 AND 120),
  opening_hours jsonb NOT NULL,
  menu_text text NOT NULL CHECK (length(btrim(menu_text)) BETWEEN 1 AND 4000),
  delivers boolean NOT NULL DEFAULT false,
  rider_name text CHECK (rider_name IS NULL OR length(rider_name) <= 120),
  rider_whatsapp text CHECK (rider_whatsapp IS NULL OR rider_whatsapp ~ '^\+27[0-9]{9}$'),
  delivery_areas text CHECK (delivery_areas IS NULL OR length(delivery_areas) <= 300),
  collects boolean NOT NULL DEFAULT true,
  pay_cash boolean NOT NULL DEFAULT false,
  pay_card boolean NOT NULL DEFAULT false,
  pay_eft boolean NOT NULL DEFAULT false,
  first_special text CHECK (first_special IS NULL OR length(first_special) <= 300),
  consent boolean NOT NULL CHECK (consent = true),
  built boolean NOT NULL DEFAULT false
);
GRANT INSERT ON public.kasi_move_vendor_intake TO anon, authenticated;
GRANT ALL ON public.kasi_move_vendor_intake TO service_role;
ALTER TABLE public.kasi_move_vendor_intake ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit vendor form" ON public.kasi_move_vendor_intake FOR INSERT TO anon, authenticated WITH CHECK (true);
