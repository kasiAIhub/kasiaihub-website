ALTER TABLE public.ai_claim_log ADD COLUMN IF NOT EXISTS visitor_hash text;
CREATE INDEX IF NOT EXISTS ai_claim_log_claimed_at_idx ON public.ai_claim_log (claimed_at);
CREATE INDEX IF NOT EXISTS ai_claim_log_visitor_idx ON public.ai_claim_log (visitor_hash, claimed_at);

DROP FUNCTION IF EXISTS public.claim_ai_opening(uuid, uuid);

CREATE FUNCTION public.claim_ai_opening(_token uuid, _lease uuid, _visitor text)
 RETURNS TABLE(outcome text, opening text)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  r public.diagnostic_submissions%ROWTYPE;
  visitor_reports integer;
  site_reports integer;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('claim_ai_opening'));

  SELECT * INTO r FROM public.diagnostic_submissions WHERE access_token = _token FOR UPDATE;
  IF NOT FOUND THEN RETURN QUERY SELECT 'not_found'::text, NULL::text; RETURN; END IF;
  IF r.ai_opening IS NOT NULL THEN RETURN QUERY SELECT 'generated'::text, r.ai_opening; RETURN; END IF;
  IF r.ai_status = 'unavailable' THEN RETURN QUERY SELECT 'unavailable'::text, NULL::text; RETURN; END IF;
  IF r.ai_status = 'generating' THEN
    IF r.ai_lease_expires_at > now() THEN
      RETURN QUERY SELECT 'pending'::text, NULL::text; RETURN;
    END IF;
    UPDATE public.diagnostic_submissions
      SET ai_status = 'unavailable', ai_lease_id = NULL, ai_lease_expires_at = NULL WHERE id = r.id;
    RETURN QUERY SELECT 'unavailable'::text, NULL::text; RETURN;
  END IF;
  IF r.created_at < now() - interval '1 hour' THEN RETURN QUERY SELECT 'expired'::text, NULL::text; RETURN; END IF;
  IF r.ai_attempts >= 3 THEN
    UPDATE public.diagnostic_submissions
      SET ai_status = 'unavailable', ai_lease_id = NULL, ai_lease_expires_at = NULL WHERE id = r.id;
    RETURN QUERY SELECT 'unavailable'::text, NULL::text; RETURN;
  END IF;

  -- Limits count distinct reports (retries of the same report do not count twice).
  IF _visitor IS NOT NULL THEN
    SELECT count(DISTINCT submission_id) INTO visitor_reports FROM public.ai_claim_log
      WHERE visitor_hash = _visitor AND claimed_at > now() - interval '1 hour' AND submission_id <> r.id;
    IF visitor_reports >= 3 THEN RETURN QUERY SELECT 'rate_limited'::text, NULL::text; RETURN; END IF;
  END IF;
  SELECT count(DISTINCT submission_id) INTO site_reports FROM public.ai_claim_log
    WHERE claimed_at > now() - interval '1 day' AND submission_id <> r.id;
  IF site_reports >= 150 THEN RETURN QUERY SELECT 'rate_limited'::text, NULL::text; RETURN; END IF;

  INSERT INTO public.ai_claim_log (submission_id, lease_id, visitor_hash) VALUES (r.id, _lease, _visitor);
  UPDATE public.diagnostic_submissions
    SET ai_status = 'generating', ai_lease_id = _lease,
        ai_lease_expires_at = now() + interval '3 minutes',
        ai_attempts = ai_attempts + 1, ai_last_claimed_at = now()
    WHERE id = r.id;
  RETURN QUERY SELECT 'claimed'::text, NULL::text;
END;
$function$;

REVOKE ALL ON FUNCTION public.claim_ai_opening(uuid, uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_ai_opening(uuid, uuid, text) TO service_role;