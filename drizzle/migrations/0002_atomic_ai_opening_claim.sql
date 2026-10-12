ALTER TABLE public.diagnostic_submissions
  ADD COLUMN IF NOT EXISTS ai_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS ai_lease_id uuid,
  ADD COLUMN IF NOT EXISTS ai_lease_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS ai_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_last_claimed_at timestamptz;

UPDATE public.diagnostic_submissions SET ai_status = 'generated' WHERE ai_opening IS NOT NULL;

ALTER TABLE public.diagnostic_submissions
  ADD CONSTRAINT diagnostic_submissions_ai_status_check
  CHECK (ai_status IN ('pending','generating','generated','failed','unavailable'));

CREATE INDEX IF NOT EXISTS diagnostic_submissions_ai_last_claimed_idx
  ON public.diagnostic_submissions (ai_last_claimed_at);

-- Atomic single-winner claim for the paid AI paragraph.
-- Outcomes: claimed | generated | pending | rate_limited | expired | unavailable | not_found
CREATE OR REPLACE FUNCTION public.claim_ai_opening(_token uuid, _lease uuid)
RETURNS TABLE(outcome text, opening text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r public.diagnostic_submissions%ROWTYPE;
  recent integer;
BEGIN
  -- Serialise claims so the site-wide hourly cap cannot be raced.
  PERFORM pg_advisory_xact_lock(hashtext('claim_ai_opening'));

  SELECT * INTO r FROM public.diagnostic_submissions WHERE access_token = _token FOR UPDATE;
  IF NOT FOUND THEN RETURN QUERY SELECT 'not_found'::text, NULL::text; RETURN; END IF;
  IF r.ai_opening IS NOT NULL THEN RETURN QUERY SELECT 'generated'::text, r.ai_opening; RETURN; END IF;
  IF r.ai_status = 'unavailable' THEN RETURN QUERY SELECT 'unavailable'::text, NULL::text; RETURN; END IF;
  IF r.created_at < now() - interval '1 hour' THEN RETURN QUERY SELECT 'expired'::text, NULL::text; RETURN; END IF;
  IF r.ai_status = 'generating' AND r.ai_lease_expires_at > now() THEN
    RETURN QUERY SELECT 'pending'::text, NULL::text; RETURN;
  END IF;
  IF r.ai_attempts >= 3 THEN
    UPDATE public.diagnostic_submissions
      SET ai_status = 'unavailable', ai_lease_id = NULL, ai_lease_expires_at = NULL
      WHERE id = r.id;
    RETURN QUERY SELECT 'unavailable'::text, NULL::text; RETURN;
  END IF;

  SELECT count(*) INTO recent FROM public.diagnostic_submissions
    WHERE ai_last_claimed_at > now() - interval '1 hour' AND id <> r.id;
  IF recent >= 40 THEN RETURN QUERY SELECT 'rate_limited'::text, NULL::text; RETURN; END IF;

  UPDATE public.diagnostic_submissions
    SET ai_status = 'generating',
        ai_lease_id = _lease,
        ai_lease_expires_at = now() + interval '2 minutes',
        ai_attempts = ai_attempts + 1,
        ai_last_claimed_at = now()
    WHERE id = r.id;
  RETURN QUERY SELECT 'claimed'::text, NULL::text;
END;
$$;

CREATE OR REPLACE FUNCTION public.finish_ai_opening(_token uuid, _lease uuid, _opening text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE n integer;
BEGIN
  UPDATE public.diagnostic_submissions
    SET ai_opening = _opening, ai_status = 'generated', ai_lease_id = NULL, ai_lease_expires_at = NULL
    WHERE access_token = _token AND ai_lease_id = _lease AND ai_opening IS NULL;
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n > 0;
END;
$$;

CREATE OR REPLACE FUNCTION public.fail_ai_opening(_token uuid, _lease uuid, _terminal boolean)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.diagnostic_submissions
    SET ai_status = CASE WHEN _terminal THEN 'unavailable' ELSE 'failed' END,
        ai_lease_id = NULL, ai_lease_expires_at = NULL
    WHERE access_token = _token AND ai_lease_id = _lease AND ai_opening IS NULL;
$$;

REVOKE ALL ON FUNCTION public.claim_ai_opening(uuid, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.finish_ai_opening(uuid, uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.fail_ai_opening(uuid, uuid, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_ai_opening(uuid, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.finish_ai_opening(uuid, uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.fail_ai_opening(uuid, uuid, boolean) TO service_role;