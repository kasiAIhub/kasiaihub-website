CREATE TABLE public.ai_claim_log (
  id bigserial PRIMARY KEY,
  submission_id uuid NOT NULL,
  lease_id uuid NOT NULL,
  claimed_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ai_claim_log_claimed_at_idx ON public.ai_claim_log (claimed_at);
REVOKE ALL ON public.ai_claim_log FROM anon, authenticated;
GRANT ALL ON public.ai_claim_log TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.ai_claim_log_id_seq TO service_role;
ALTER TABLE public.ai_claim_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_claim_log FORCE ROW LEVEL SECURITY;
CREATE POLICY ai_claim_log_no_client_access ON public.ai_claim_log FOR SELECT TO anon, authenticated USING (false);

CREATE OR REPLACE FUNCTION public.claim_ai_opening(_token uuid, _lease uuid)
 RETURNS TABLE(outcome text, opening text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  r public.diagnostic_submissions%ROWTYPE;
  recent integer;
BEGIN
  -- Serialise claims so the site-wide rolling-hour cap cannot be raced.
  PERFORM pg_advisory_xact_lock(hashtext('claim_ai_opening'));

  SELECT * INTO r FROM public.diagnostic_submissions WHERE access_token = _token FOR UPDATE;
  IF NOT FOUND THEN RETURN QUERY SELECT 'not_found'::text, NULL::text; RETURN; END IF;
  IF r.ai_opening IS NOT NULL THEN RETURN QUERY SELECT 'generated'::text, r.ai_opening; RETURN; END IF;
  IF r.ai_status = 'unavailable' THEN RETURN QUERY SELECT 'unavailable'::text, NULL::text; RETURN; END IF;
  IF r.ai_status = 'generating' THEN
    IF r.ai_lease_expires_at > now() THEN
      RETURN QUERY SELECT 'pending'::text, NULL::text; RETURN;
    END IF;
    -- Hold expired while the prior paid call's outcome is unknown: fail closed.
    UPDATE public.diagnostic_submissions
      SET ai_status = 'unavailable', ai_lease_id = NULL, ai_lease_expires_at = NULL
      WHERE id = r.id;
    RETURN QUERY SELECT 'unavailable'::text, NULL::text; RETURN;
  END IF;
  IF r.created_at < now() - interval '1 hour' THEN RETURN QUERY SELECT 'expired'::text, NULL::text; RETURN; END IF;
  IF r.ai_attempts >= 3 THEN
    UPDATE public.diagnostic_submissions
      SET ai_status = 'unavailable', ai_lease_id = NULL, ai_lease_expires_at = NULL
      WHERE id = r.id;
    RETURN QUERY SELECT 'unavailable'::text, NULL::text; RETURN;
  END IF;

  -- Every paid attempt (including retries) is logged; cap 40 per rolling hour.
  SELECT count(*) INTO recent FROM public.ai_claim_log WHERE claimed_at > now() - interval '1 hour';
  IF recent >= 40 THEN RETURN QUERY SELECT 'rate_limited'::text, NULL::text; RETURN; END IF;

  INSERT INTO public.ai_claim_log (submission_id, lease_id) VALUES (r.id, _lease);
  UPDATE public.diagnostic_submissions
    SET ai_status = 'generating',
        ai_lease_id = _lease,
        ai_lease_expires_at = now() + interval '3 minutes',
        ai_attempts = ai_attempts + 1,
        ai_last_claimed_at = now()
    WHERE id = r.id;
  RETURN QUERY SELECT 'claimed'::text, NULL::text;
END;
$function$;

REVOKE ALL ON FUNCTION public.claim_ai_opening(uuid, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_ai_opening(uuid, uuid) TO service_role;