import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import {
  Q1_QUESTION,
  SCORED_QUESTIONS,
  SECTION_INTROS,
  computeScores,
  buildSubmission,
  AREA_LABEL,
  weakestArea,
  STAGE_LABEL,
  type Stage,
} from "@/lib/diagnostic-data";
import {
  submitDiagnostic,
  generateDiagnosticOpening,
} from "@/lib/diagnostic.functions";
import { KasiLogo } from "@/components/KasiLogo";
import { DiagnosticReport } from "@/components/DiagnosticReport";
import {
  PrintableDiagnosticReport,
  PreviewReportModal,
} from "@/components/PrintableDiagnosticReport";

const canonical = "https://kasiaihub.com/diagnostic";

export const Route = createFileRoute("/diagnostic")({
  head: () => ({
    meta: [
      { title: "Free Business Diagnostic | kasiAIhub" },
      {
        name: "description",
        content:
          "A free 12-question business diagnostic for community entrepreneurs. Get your stage, your three gaps, and a personalised report — in under 4 minutes.",
      },
      { property: "og:title", content: "Free Business Diagnostic — kasiAIhub" },
      {
        property: "og:description",
        content:
          "12 honest questions. One personalised report. See what's really holding your business back.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free Business Diagnostic — kasiAIhub" },
      {
        name: "twitter:description",
        content: "12 honest questions. One personalised report.",
      },
    ],
    links: [{ rel: "canonical", href: canonical }],
  }),
  component: DiagnosticPage,
});

const ALL_QS = [Q1_QUESTION, ...SCORED_QUESTIONS];
const TOTAL = ALL_QS.length;

const BRAND = {
  bg: "#0A0A0A",
  card: "#0F0F0F",
  border: "#1E1E1E",
  emerald: "#00C896",
  gold: "#F59E0B",
  text: "#F5F5F0",
  muted: "#9CA3AF",
};

type Answers = Record<string, string | number>;

function DiagnosticPage() {
  const navigate = useNavigate();
  const submitFn = useServerFn(submitDiagnostic);
  
  const generateOpeningFn = useServerFn(generateDiagnosticOpening);

  // Steps: 0..TOTAL-1 questions, TOTAL magic wand, TOTAL+1 generating, TOTAL+2 results.
  const MAGIC_STEP = TOTAL;
  const GENERATING_STEP = TOTAL + 1;
  const RESULTS_STEP = TOTAL + 2;

  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [nameGiven, setNameGiven] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [magicWand, setMagicWand] = useState("");
  const [magicWandChips, setMagicWandChips] = useState<string[]>([]);

  const [aiOpening, setAiOpening] = useState<string | null>(null);
  const [aiPending, setAiPending] = useState(false);
  const [aiUnavailable, setAiUnavailable] = useState(false);

  
  const [contact, setContact] = useState({
    name: "",
    email: "",
    business_name: "",
    whatsapp_number: "",
  });

  const [aiBusy, setAiBusy] = useState(false);
  const scores = useMemo(() => computeScores(answers), [answers]);

  const hasAiOpening = Boolean(aiOpening?.trim());
  // "Report is complete" = paragraph present, or the AI service told us it can
  // never produce one for this submission.
  const aiSettled = hasAiOpening || aiUnavailable;

  // Defensive retry: a report with no saved paragraph is never considered
  // complete. Keep re-checking after every transient failure until real text
  // exists or this results view unmounts.
  useEffect(() => {
    if (step < RESULTS_STEP || hasAiOpening || aiUnavailable || !accessToken) return;
    let cancelled = false;
    let tries = 0;
    setAiPending(true);
    const attempt = async () => {
      tries += 1;
      try {
        const res = await generateOpeningFn({
          data: { access_token: accessToken, magic_wand_hint: magicWand || undefined },
        });
        if (!cancelled && res?.ai_opening?.trim()) {
          setAiOpening(res.ai_opening);
          setAiPending(false);
          return;
        }
        if (!cancelled && res?.unavailable) {
          if (res.busy) setAiBusy(true);
          setAiUnavailable(true);
          setAiPending(false);
          return;
        }
      } catch (err) {
        console.error("[diagnostic] opening retry failed", err);
      }
      if (cancelled) return;
      // Give up after ~1 minute so the rest of the report (and the PDF) stays usable.
      if (tries >= 15) {
        setAiUnavailable(true);
        setAiPending(false);
        return;
      }
      window.setTimeout(attempt, 4000);
    };
    void attempt();

    return () => {
      cancelled = true;
    };
  }, [step, hasAiOpening, aiUnavailable, accessToken, generateOpeningFn, magicWand, RESULTS_STEP]);

  const currentQ = step < TOTAL ? ALL_QS[step] : null;

  const sectionIntro = currentQ ? SECTION_INTROS[currentQ.section] : null;
  const showSectionIntro =
    currentQ && (step === 0 || (step > 0 && ALL_QS[step - 1].section !== currentQ.section));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  async function pickAnswer(value: string | number) {
    if (!currentQ) return;
    const nextAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(nextAnswers);

    if (step < TOTAL - 1) {
      setStep(step + 1);
      return;
    }
    // Final question answered — save the diagnostic now so answers and
    // contact details are kept even if the visitor leaves on the next
    // (optional) screen. Report links are read-only after submission, so
    // the Magic Wand answer is passed to the AI paragraph as a hint only.
    // Pass the just-built answers: React state has not updated yet, so the
    // `answers` variable here would still be missing the final answer.
    void submitAll("", nextAnswers);
    setStep(MAGIC_STEP);
  }

  async function submitAll(magicWandText: string, answersToSave: Answers = answers) {
    setSubmitting(true);
    setSubmitErr(null);
    try {
      const built = buildSubmission(answersToSave);
      const s = built.scores;
      const res = await submitFn({
        data: {
          answers: answersToSave,
          stage: built.stage,
          capacity_score: built.capacity_score,
          customer_money_score: built.customer_money_score,
          growth_score: built.growth_score,
          first_name: firstName.trim() || undefined,
          email: contact.email.trim() || undefined,
          business_name: contact.business_name.trim() || undefined,
          whatsapp_number: contact.whatsapp_number.trim() || undefined,
          magic_wand_answer: magicWandText || undefined,
        },
      });
      setAccessToken(res.access_token);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            "kasiaihub_diagnostic",
            JSON.stringify({ token: res.access_token, answers, scores: s }),
          );
        } catch {
          /* ignore */
        }
      }
      return res.access_token;
    } catch (err) {
      console.error("[diagnostic] submit failed", err);
      setSubmitErr("We couldn't save your diagnostic. Please check your connection and try again.");
      return null;
    } finally {
      setSubmitting(false);
    }
  }

  async function fetchOpening(token: string, hint?: string): Promise<string | null> {
    try {
      const res = await generateOpeningFn({
        data: { access_token: token, magic_wand_hint: hint || undefined },
      });
      return res?.ai_opening ?? null;
    } catch (err) {
      console.error("[diagnostic] generateOpening failed", err);
      return null;
    }
  }

  async function runGeneration(token: string, hint?: string) {
    setStep(GENERATING_STEP);
    setAiPending(true);
    // Make one initial generation request. The results view itself owns the
    // persistent defensive retry contract if this request returns no content.
    const opening = await fetchOpening(token, hint);
    if (opening?.trim()) {
      setAiOpening(opening);
      setAiPending(false);
    }
    setStep(RESULTS_STEP);
  }

  async function submitMagicWand() {
    const parts: string[] = [...magicWandChips];
    const extra = magicWand.trim();
    if (extra) parts.push(extra);
    const text = parts.join("; ");
    setMagicWand(text);
    if (submitting) return;
    // The diagnostic was already submitted after the last question; this only
    // retries if that save failed. The wand text itself is never stored —
    // it is passed to the AI paragraph as a one-off hint.
    const token = accessToken ?? (await submitAll(""));
    if (!token) return; // stay on this step; error shown below the button
    await runGeneration(token, text || undefined);
  }

  function goEnrol() {
    if (accessToken && typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          "kasiaihub_enrol_prefill",
          JSON.stringify({
            token: accessToken,
            full_name: firstName,
            business: contact.business_name,
            whatsapp: contact.whatsapp_number,
            email: contact.email,
          }),
        );
      } catch {
        /* ignore */
      }
    }
    navigate({ to: "/", hash: "enrol" });
  }

  // -------- MAGIC WAND STEP ----------
  if (step === MAGIC_STEP) {
    const CHIPS = [
      "More consistent sales",
      "Stop chasing payments",
      "Get my pricing right",
      "A working website",
      "Sort out my compliance",
      "Automate my daily tasks",
      "Stop running everything from memory",
    ];
    const canContinue = magicWandChips.length > 0 || magicWand.trim().length > 0;

    return (
      <div style={{ background: BRAND.bg, minHeight: "100vh", color: BRAND.text }}>
        <TopBar contentWidth={640} />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 80px" }}>
          <div
            style={{
              color: BRAND.emerald,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}
          >
            ONE LAST THING
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 12px", lineHeight: 1.15 }}>
            If you could fix three things about your business today, what would they be?
          </h2>
          <p style={{ color: BRAND.muted, margin: "0 0 20px", fontSize: 15, lineHeight: 1.55 }}>
            Pick any that apply, or tell us in your own words.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            {CHIPS.map((chip) => {
              const selected = magicWandChips.includes(chip);
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setMagicWandChips((prev) =>
                      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip],
                    );
                  }}
                  style={{
                    background: selected ? BRAND.emerald : "transparent",
                    color: selected ? "#03110A" : BRAND.text,
                    border: `1px solid ${selected ? BRAND.emerald : BRAND.border}`,
                    padding: "10px 16px",
                    borderRadius: 999,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  {chip}
                </button>
              );
            })}
          </div>
          <textarea
            value={magicWand}
            onChange={(e) => setMagicWand(e.target.value.slice(0, 300))}
            placeholder="Something else? Tell us in your own words…"
            aria-label="Something else? Tell us in your own words"
            rows={3}
            maxLength={300}
            style={{
              width: "100%",
              background: "transparent",
              color: BRAND.muted,
              border: `1px dashed ${BRAND.border}`,
              borderRadius: 10,
              padding: 14,
              fontSize: 15,
              lineHeight: 1.5,
              fontFamily: "inherit",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ color: BRAND.muted, fontSize: 12, marginTop: 6, textAlign: "right" }}>
            Optional · {magicWand.length}/300
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="button"
              onClick={submitMagicWand}
              disabled={submitting}
              style={{
                background: BRAND.emerald,
                color: "#03110A",
                border: "none",
                padding: "14px 22px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? "Saving…" : "I'm ready to see it"}
            </button>
            {!canContinue && !submitting ? (
              <button
                type="button"
                onClick={submitMagicWand}
                style={{
                  background: "transparent",
                  color: BRAND.muted,
                  border: "none",
                  padding: "14px 8px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Skip — show my results
              </button>
            ) : null}
          </div>
          {submitErr ? (
            <div role="alert" style={{ color: "#F87171", fontSize: 14, marginTop: 12 }}>
              {submitErr}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // -------- GENERATING STEP (AI opening) ----------
  if (step === GENERATING_STEP) {
    return (
      <div style={{ background: BRAND.bg, minHeight: "100vh", color: BRAND.text }}>
        <TopBar contentWidth={560} />
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            padding: "80px 20px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              color: BRAND.emerald,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}
          >
            PREPARING YOUR RESULTS
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.2 }}>
            Reading what you told us…
          </h2>
          <p style={{ color: BRAND.muted, margin: "0 0 20px", fontSize: 14 }}>
            This takes a few seconds. Please don't close the tab.
          </p>
          <ThreeStepLoader />
        </div>
      </div>
    );
  }

  // -------- RESULTS PAGE ----------
  if (step >= RESULTS_STEP) {
    return (
      <div style={{ background: BRAND.bg, minHeight: "100vh", color: BRAND.text }}>
        <TopBar />
        {aiBusy && (
          <p role="status" className="mx-auto mt-4 max-w-[900px] rounded-xl border border-border px-4 py-3 text-foreground">
            We are very busy right now. Please try again in a little while.
          </p>
        )}
        <DiagnosticReport
          name={firstName || undefined}
          businessName={contact.business_name || undefined}
          answers={answers}
          scores={scores}
          aiOpening={aiOpening}
          aiPending={!aiSettled}
          aiUnavailable={aiUnavailable}
          showPrintButton={false}
          onEnrol={goEnrol}
        />

        <PrintableDiagnosticReport
          name={firstName || undefined}
          businessName={contact.business_name || undefined}
          answers={answers}
          scores={scores}
          aiOpening={aiOpening}
          aiPending={!aiSettled}
          aiUnavailable={aiUnavailable}
        />

        <PreviewReportModal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          onDownload={() => window.print()}
          aiPending={aiPending && !aiUnavailable}
          aiUnavailable={aiUnavailable}
          name={firstName || undefined}
          businessName={contact.business_name || undefined}
          answers={answers}
          scores={scores}
          aiOpening={aiOpening}
        />

        <div style={{ maxWidth: 1080, margin: "0 auto 32px", padding: "0 20px" }}>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            disabled={!aiSettled}
            style={{
              background: BRAND.emerald,
              color: "#03110A",
              border: "none",
              padding: "13px 22px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              cursor: aiSettled ? "pointer" : "wait",
              opacity: aiSettled ? 1 : 0.55,
            }}
          >
            {aiSettled ? "Save your report as PDF" : "Still writing your report…"}
          </button>
          <div style={{ color: BRAND.muted, fontSize: 12, marginTop: 10 }}>
            This opens your device's print dialogue — choose "Save as PDF" to keep a copy.
          </div>
        </div>

      </div>
    );
  }

  // -------- FIRST NAME STEP (before Q1) ----------
  if (!nameGiven) {
    const wa = contact.whatsapp_number.trim();
    const waDigits = wa.replace(/\D/g, "");
    const waValid = /^[+\d][\d\s()-]*$/.test(wa) && waDigits.length >= 9 && waDigits.length <= 15;
    const bizValid = contact.business_name.trim().length >= 2;
    const emailRaw = contact.email.trim();
    const emailValid = emailRaw.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw);
    const canContinue = firstName.trim().length > 0 && waValid && bizValid && emailValid;
    const handleContinue = () => {
      if (!canContinue) return;
      const fn = firstName.trim().split(/\s+/)[0];
      setFirstName(fn);
      setContact((c) => ({ ...c, name: c.name || fn }));
      setNameGiven(true);
    };
    return (
      <div style={{ background: BRAND.bg, minHeight: "100vh", color: BRAND.text }}>
        <TopBar contentWidth={560} />
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "64px 20px 80px" }}>
          <div
            style={{
              color: BRAND.emerald,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}
          >
            BEFORE WE START
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 12px", lineHeight: 1.2 }}>
            First, what should we call you?
          </h1>
          <p style={{ color: BRAND.muted, margin: "0 0 20px", fontSize: 15, lineHeight: 1.55 }}>
            Just a name, your business name, and a WhatsApp number — so the questions and your
            report can speak to you directly, and Tsholo can follow up if you'd like.
          </p>
          <input
            type="text"
            value={firstName}
            autoFocus
            onChange={(e) => setFirstName(e.target.value.slice(0, 60))}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleContinue();
            }}
            placeholder="Your first name"
            style={{
              width: "100%",
              background: "#000",
              border: `1px solid ${BRAND.border}`,
              color: BRAND.text,
              padding: "14px 16px",
              borderRadius: 10,
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            value={contact.business_name}
            onChange={(e) =>
              setContact((c) => ({ ...c, business_name: e.target.value.slice(0, 120) }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") handleContinue();
            }}
            aria-label="Your business name"
            placeholder="Your business name (e.g. Thandi's Catering)"
            style={{
              width: "100%",
              marginTop: 12,
              background: "#000",
              border: `1px solid ${BRAND.border}`,
              color: BRAND.text,
              padding: "14px 16px",
              borderRadius: 10,
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <input
            type="tel"
            inputMode="tel"
            value={contact.whatsapp_number}
            onChange={(e) =>
              setContact((c) => ({ ...c, whatsapp_number: e.target.value.slice(0, 40) }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") handleContinue();
            }}
            placeholder="WhatsApp number (e.g. 081 234 5678)"
            style={{
              width: "100%",
              marginTop: 12,
              background: "#000",
              border: `1px solid ${wa && !waValid ? "#E24B4A" : BRAND.border}`,
              color: BRAND.text,
              padding: "14px 16px",
              borderRadius: 10,
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ color: BRAND.muted, fontSize: 12, marginTop: 6 }}>
            First name, business name and WhatsApp are required — we'll only use your number to
            follow up on your report.
          </div>
          <input
            type="email"
            inputMode="email"
            value={contact.email}
            onChange={(e) => setContact((c) => ({ ...c, email: e.target.value.slice(0, 160) }))}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleContinue();
            }}
            aria-label="Email (optional)"
            placeholder="you@example.com"
            style={{
              width: "100%",
              marginTop: 14,
              background: "#000",
              border: `1px solid ${emailValid ? BRAND.border : "#E24B4A"}`,
              color: BRAND.text,
              padding: "14px 16px",
              borderRadius: 10,
              fontSize: 16,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ color: emailValid ? BRAND.muted : "#E24B4A", fontSize: 12, marginTop: 6 }}>
            {emailValid
              ? "Email (optional) — so we can also send you a copy of your report."
              : "That email doesn't look right — please check it, or leave it blank."}
          </div>


          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            style={{
              marginTop: 20,
              background: BRAND.emerald,
              color: "#03110A",
              border: "none",
              padding: "14px 22px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              cursor: canContinue ? "pointer" : "default",
              opacity: canContinue ? 1 : 0.5,
            }}
          >
            Start my diagnostic →
          </button>
          <p
            style={{
              margin: "12px 0 0",
              color: BRAND.muted,
              fontSize: 13,
              lineHeight: 1.55,
              textAlign: "left",
            }}
          >
            By continuing, you agree we can contact you about your business check. Your details
            stay with us - never shared, never sold. One message and we delete them.
          </p>
        </div>
      </div>
    );
  }

  // -------- QUESTION PAGE ----------
  return (
    <div style={{ background: BRAND.bg, minHeight: "100vh", color: BRAND.text }}>
      <TopBar contentWidth={720} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 20px 80px" }}>
        {/* Progress */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 12,
              color: BRAND.muted,
              marginBottom: 8,
              letterSpacing: "0.05em",
            }}
          >
            <span>
              Question {step + 1} of {TOTAL}
            </span>
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: BRAND.muted,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 12,
                }}
              >
                <ChevronLeft size={14} /> Back
              </button>
            ) : null}
          </div>
          <div
            style={{
              height: 4,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${((step + 1) / TOTAL) * 100}%`,
                height: "100%",
                background: BRAND.emerald,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {showSectionIntro && sectionIntro ? (
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                color: BRAND.gold,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                marginBottom: 6,
              }}
            >
              SECTION {currentQ!.section} — {sectionIntro.title.toUpperCase()}
            </div>
            <div style={{ color: BRAND.muted, fontStyle: "italic", fontSize: 14 }}>
              {sectionIntro.sub}
            </div>
          </div>
        ) : null}

        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 34px)",
            fontWeight: 800,
            lineHeight: 1.25,
            margin: "0 0 24px",
            letterSpacing: "-0.01em",
          }}
        >
          {currentQ!.label}
        </h2>

        <div style={{ display: "grid", gap: 12 }}>
          {currentQ!.type === "stage"
            ? currentQ!.options.map((opt) => (
                <AnswerCard
                  key={opt.stage}
                  label={opt.label}
                  onClick={() => !submitting && pickAnswer(opt.stage as Stage)}
                  disabled={submitting}
                />
              ))
            : currentQ!.options.map((opt) => (
                <AnswerCard
                  key={opt.label}
                  label={opt.label}
                  onClick={() => !submitting && pickAnswer(opt.points)}
                  disabled={submitting}
                />
              ))}
        </div>

        {submitting ? (
          <div style={{ marginTop: 20, color: BRAND.muted, textAlign: "center" }}>
            Building your report…
          </div>
        ) : null}

        {submitErr ? (
          <div
            role="alert"
            style={{
              marginTop: 20,
              padding: "14px 16px",
              border: "1px solid #E24B4A",
              background: "rgba(226,75,74,0.08)",
              color: "#F5F5F0",
              borderRadius: 10,
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            <div style={{ color: "#E24B4A", fontWeight: 700, marginBottom: 4 }}>
              Something went wrong
            </div>
            {submitErr}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ThreeStepLoader() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  const steps = ["Reading your answers…", "Connecting your gaps…", "Writing your report…"];
  return (
    <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
      {steps.map((label, i) => {
        const done = i < step;
        const active = i === step;
        const color = done ? BRAND.emerald : active ? BRAND.text : BRAND.muted;
        return (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color,
              fontSize: 14,
              opacity: done || active ? 1 : 0.55,
              transition: "opacity 200ms, color 200ms",
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: `2px solid ${done ? BRAND.emerald : active ? BRAND.emerald : "#333"}`,
                background: done ? BRAND.emerald : "transparent",
                display: "inline-block",
                flexShrink: 0,
                boxShadow: active ? `0 0 0 4px rgba(0,200,150,0.15)` : undefined,
              }}
            />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function TopBar({ contentWidth = 1080 }: { contentWidth?: number }) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${BRAND.border}`,
        padding: "16px 0",
        background: "rgba(0,0,0,0.85)",
      }}
    >
      <div
        style={{
          maxWidth: contentWidth,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <KasiLogo size="sm" />
        </Link>
        <Link to="/" style={{ color: BRAND.muted, textDecoration: "none", fontSize: 14 }}>
          ← Home
        </Link>
      </div>
    </div>
  );
}

function AnswerCard({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        textAlign: "left",
        background: BRAND.card,
        border: `1px solid ${BRAND.border}`,
        color: BRAND.text,
        padding: "18px 20px",
        borderRadius: 12,
        cursor: disabled ? "default" : "pointer",
        fontSize: 16,
        lineHeight: 1.45,
        transition: "border-color 0.15s, background 0.15s, transform 0.05s",
        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = BRAND.emerald;
          e.currentTarget.style.background = "rgba(0,200,150,0.05)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = BRAND.border;
        e.currentTarget.style.background = BRAND.card;
      }}
    >
      {label}
    </button>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontSize: 13, color: BRAND.muted, marginBottom: 6 }}>{label}</div>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "#000",
          border: `1px solid ${BRAND.border}`,
          color: BRAND.text,
          padding: "12px 14px",
          borderRadius: 8,
          fontSize: 15,
          outline: "none",
        }}
      />
    </label>
  );
}
