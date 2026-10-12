import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { X, Check } from "lucide-react";
import { KasiLogo } from "@/components/KasiLogo";
import { submitEnrolment } from "@/lib/enrolments.functions";




type Props = {
  open: boolean;
  onClose: () => void;
  preselectSession?: "s1" | "s2" | "s3" | "s4" | "all" | null;
};

type Errors = Record<string, string>;

const trainingLocations = ["Gauteng"];

const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const SCHEDULING_COPY =
  "Training runs in Gauteng, Monday to Friday from 9am to 3pm. Select your preferred location and day. We group learners according to demand, with up to 8 people per class, and confirm your training date after enrolment.";


const laptopOptions = [
  "Yes — I own one and will bring it",
  "Yes — I can borrow one and will bring it",
  "No — I do not have access to one",
];

const gmailOptions = [
  "Yes, I use it regularly",
  "Yes, but I barely use it",
  "No, I do not have one",
];

const comfortOptions = [
  "Very comfortable — I use it daily",
  "I manage fine — I know the basics",
  "I sometimes struggle — I am still learning",
];

const aiOptions = [
  "Yes, I use them regularly",
  "I have tried one or two but not regularly",
  "No, I have never used AI tools",
];

type SessionId = "s1" | "s2" | "s3" | "s4" | "all";

type SessionOption = {
  id: SessionId;
  label: string;
  title: string;
  days: string;
  price: number;
  desc: string;
  featured: boolean;
  bundle?: boolean;
  savings?: string;
};

const sessionOptions: SessionOption[] = [
  {
    id: "s1",
    label: "SESSION 1",
    title: "Think & Plan",
    days: "One day · 9am–3pm",
    price: 1500,
    desc: "Sales is the thread: build your Customer Pipeline Starter — a clearer offer, your ideal customer, prospect starting points and a follow-up rhythm. Powered by Claude + Gemini. No prerequisite.",
    featured: false,
  },
  {
    id: "s2",
    label: "SESSION 2",
    title: "Build & Create",
    days: "One day · 9am–3pm",
    price: 1500,
    desc: "Build your Customer Conversion System — the one priority system from your diagnostic: a focused website, lead capture, booking or follow-up flow. Powered by Claude + Lovable. Requires Session 1.",
    featured: false,
  },
  {
    id: "s3",
    label: "SESSION 3",
    title: "Brand & Grow",
    days: "One day · 9am–3pm",
    price: 1500,
    desc: "Build your Market Visibility Engine — brand assets, a marketing assistant and a 30-day content plan that keep your pipeline moving. Powered by ChatGPT + Claude. Requires Sessions 1 and 2.",
    featured: false,
  },
  {
    id: "all",
    label: "★ FULL PROGRAMME — RECOMMENDED",
    title: "All 3 Sessions",
    days: "Three separate days · 9am–3pm each",
    price: 4000,
    desc: "Complete the three-session Core Journey and connect your strategy, customer pipeline, working system, brand and growth plan.",
    savings: "Save R500 vs individual sessions",
    featured: true,
    bundle: true,
  },
  {
    id: "s4",
    label: "SESSION 4 — ADVANCED (OPTIONAL)",
    title: "Advanced: Agentic AI",
    days: "One day · 9am–3pm · scheduled independently",
    price: 4500,
    desc: "Optional advanced session. Set up your Supervised Digital Team that prepares and coordinates defined work under clear approval gates. Powered by Grok + Cursor. Not part of the Core Journey bundle.",
    featured: false,
  },
];

const BUNDLE_PRICE = 4000;
const BUNDLE_FULL_PRICE = 4500;

function totalSessionCount(counts: Record<SessionId, number>) {
  return (
    (counts.s1 || 0) +
    (counts.s2 || 0) +
    (counts.s3 || 0) +
    (counts.s4 || 0) +
    (counts.all || 0)
  );
}

function computeTotal(counts: Record<SessionId, number>) {
  return sessionOptions.reduce((sum, o) => sum + (counts[o.id] || 0) * o.price, 0);
}

const diagnosticOptions = ["Yes, I've done it", "Not yet"];

const initialForm = {
  fullName: "",
  business: "",
  whatsapp: "",
  trainingLocation: "",
  preferredDay: "",
  laptop: "",
  gmail: "",
  comfort: "",
  aiUse: "",
  aiTools: "",
  diagnosticDone: "",
  sessionCounts: { s1: 0, s2: 0, s3: 0, s4: 0, all: 0 } as Record<SessionId, number>,
  consent: false,
  updates: false,
};

type FormState = typeof initialForm;


function formatRand(n: number) {
  return "R" + n.toLocaleString("en-ZA");
}

export function EnrolModal({ open, onClose, preselectSession }: Props) {
  const [step, setStep] = useState(1);
  const submitEnrolmentFn = useServerFn(submitEnrolment);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [diagnosticToken, setDiagnosticToken] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open && preselectSession) {
      setForm((f) => ({
        ...f,
        sessionCounts: { ...f.sessionCounts, [preselectSession]: Math.max(1, f.sessionCounts[preselectSession] || 0) },
      }));
    }
  }, [open, preselectSession]);

  // Consume diagnostic magic-link prefill from sessionStorage.
  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem("kasiaihub_enrol_prefill");
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        token?: string;
        full_name?: string;
        business?: string;
        whatsapp?: string;
        email?: string;
      };
      setForm((f) => ({
        ...f,
        fullName: parsed.full_name || f.fullName,
        business: parsed.business || f.business,
        whatsapp: parsed.whatsapp || f.whatsapp,
        diagnosticDone: parsed.token ? diagnosticOptions[0] : f.diagnosticDone,
      }));
      if (parsed.token) setDiagnosticToken(parsed.token);
    } catch {
      /* ignore */
    }
  }, [open]);



  useEffect(() => {
    if (open) bodyRef.current?.scrollTo({ top: 0 });
  }, [open, step]);

  function reset() {
    setStep(1);
    setForm(initialForm);
    setErrors({});
    setSubmitting(false);
    setSuccess(false);
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 250);
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const { [key as string]: _omit, ...rest } = e;
      return rest;
    });
  }

  function validate(currentStep: number): Errors {
    const e: Errors = {};
    if (currentStep === 1) {
      if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
      if (!form.business.trim()) e.business = "Please describe your business.";
      if (!form.whatsapp.trim()) e.whatsapp = "Please enter your WhatsApp number.";
      if (!form.diagnosticDone) e.diagnosticDone = "Please choose an option.";
    }
    if (currentStep === 2) {
      if (!form.laptop) e.laptop = "Please choose an option.";
      if (!form.gmail) e.gmail = "Please choose an option.";
      if (!form.comfort) e.comfort = "Please choose an option.";
      if (!form.aiUse) e.aiUse = "Please choose an option.";
      if (form.aiUse === aiOptions[0] && !form.aiTools.trim())
        e.aiTools = "Please tell us which tools.";
    }
    if (currentStep === 3) {
      const total = totalSessionCount(form.sessionCounts);
      if (total === 0) e.sessionCounts = "Please add at least one session.";
      if (!form.trainingLocation) e.trainingLocation = "Please choose a preferred location.";
      if (!form.preferredDay) e.preferredDay = "Please choose your preferred day.";
    }
    if (currentStep === 4) {
      if (!form.consent) e.consent = "Please confirm to continue.";
    }
    return e;
  }

  function next() {
    const e = validate(step);
    if (Object.keys(e).length) {
      setErrors(e);
      setTimeout(() => {
        const first = document.querySelector(".kasi-form-error");
        first?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(4, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function changeSessionCount(id: SessionId, delta: number) {
    setForm((f) => {
      const current = f.sessionCounts[id] ?? 0;
      const nextVal = Math.max(0, current + delta);
      return { ...f, sessionCounts: { ...f.sessionCounts, [id]: nextVal } };
    });
    setErrors((e) => {
      if (!e.sessionCounts) return e;
      const { sessionCounts: _o, ...rest } = e;
      return rest;
    });
  }

  function submit() {
    const e = validate(4);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    const lines: string[] = [];
    let total = 0;
    for (const opt of sessionOptions) {
      const qty = form.sessionCounts[opt.id] ?? 0;
      if (qty > 0) {
        const sub = qty * opt.price;
        total += sub;
        lines.push(`• ${opt.title} (${opt.days}) ×${qty} — ${formatRand(sub)}`);
      }
    }
    const sessionText = lines.length ? "\n" + lines.join("\n") : "";
    const aiAnswer =
      form.aiUse === aiOptions[0] && form.aiTools.trim()
        ? `${form.aiUse} — ${form.aiTools.trim()}`
        : form.aiUse;
    const locationText = form.trainingLocation;
    const preferredDay = form.preferredDay;

    const msg = `🆕 New kasiAIhub Enrolment

Name: ${form.fullName}
Business: ${form.business}
Preferred location: ${locationText}
    Preferred day: ${preferredDay}
WhatsApp: ${form.whatsapp}
Diagnostic: ${form.diagnosticDone}${diagnosticToken ? " (magic link)" : ""}

✅ Readiness Check
Laptop: ${form.laptop}
Gmail: ${form.gmail}
Computer comfort: ${form.comfort}
AI tools: ${aiAnswer}

📅 Sessions:${sessionText}
📍 Preferred location: ${locationText}
    🗓 Preferred day: ${preferredDay}
💰 Investment: ${formatRand(total)}

Status: ⏳ Awaiting your confirmation`;

    const sessionLabelMap: Record<SessionId, string> = {
      s1: "Session 1",
      s2: "Session 2",
      s3: "Session 3",
      s4: "Session 4",
      all: "Full Programme",
    };
    const sessionsSelected: string[] = [];
    for (const opt of sessionOptions) {
      const qty = form.sessionCounts[opt.id] ?? 0;
      for (let i = 0; i < qty; i++) sessionsSelected.push(sessionLabelMap[opt.id]);
    }
    const [bizName, ...bizRest] = form.business.split(/\s*[—-]\s*/);
    const record = {
      full_name: form.fullName,
      business_name: bizName?.trim() || form.business,
      business_description: bizRest.join(" — ").trim(),
      whatsapp: form.whatsapp,
      location: locationText,
      laptop_access: form.laptop,
      gmail_account: form.gmail,
      computer_comfort: form.comfort,
      ai_tools_used: form.aiUse,
      ai_tools_list: form.aiTools,
      sessions_selected: sessionsSelected,
      preferred_location: locationText,
      preferred_day: preferredDay,
      week_preference: "",
      total_price: total,
      consent: form.consent,
      updates: form.updates,
      ...(diagnosticToken ? { diagnostic_access_token: diagnosticToken } : {}),
    };

    const url = `https://wa.me/27818905861?text=${encodeURIComponent(msg)}`;
    // Open the WhatsApp tab synchronously inside the user-gesture click handler
    // so browser popup blockers don't kill it. We navigate it after the save
    // resolves (or immediately fall back to same-tab navigation if blocked).
    // NOTE: do NOT pass "noopener"/"noreferrer" here — those cause window.open
    // to return null, which would force us to navigate the current tab away.
    // We need the window reference so we can point it at WhatsApp after the
    // save resolves while keeping the origin tab on the success screen.
    const waWindow = window.open("about:blank", "_blank");

    (async () => {
      try {
        await submitEnrolmentFn({ data: record });
        if (diagnosticToken && typeof window !== "undefined") {
          try { sessionStorage.removeItem("kasiaihub_enrol_prefill"); } catch { /* ignore */ }
        }
      } catch (err) {
        console.error("Enrolment save failed", err);
        // Still proceed with WhatsApp handoff so the visitor can reach us.
      }
      if (waWindow && !waWindow.closed) {
        try {
          waWindow.location.href = url;
        } catch {
          window.location.href = url;
        }
      } else {
        // Popup was blocked — navigate the current tab instead so the
        // WhatsApp handoff still happens.
        window.location.href = url;
      }
      setSubmitting(false);
      setSuccess(true);
    })();
  }


  if (!open) return null;

  const firstName = form.fullName.trim().split(/\s+/)[0] || "Friend";
  const counts = form.sessionCounts;
  const bundleSelected = counts.all > 0;
  const allIndividuals = counts.s1 > 0 && counts.s2 > 0 && counts.s3 > 0;
  const total = computeTotal(counts);
  const strikeTotal =
    counts.all * BUNDLE_FULL_PRICE +
    (counts.s1 + counts.s2 + counts.s3) * 1500;
  const showSavings = bundleSelected;

  return (
    <div className="kasi-modal-overlay" role="dialog" aria-modal="true">
      <div className="kasi-modal">
        <div className="kasi-modal-header">
          <div className="kasi-modal-header-top">
            <KasiLogo size="sm" className="kasi-logo--on-emerald" />
            <button
              type="button"
              className="kasi-modal-close"
              aria-label="Close enrolment form"
              onClick={handleClose}
            >
              <X aria-hidden="true" />
            </button>
          </div>
          {!success ? (
            <>
              <div className="kasi-modal-title">Enrol in the Entrepreneur AI Journey</div>
              <div className="kasi-modal-progress-text">Step {step} of 4</div>
              <div className="kasi-modal-progress-bar">
                <div
                  className="kasi-modal-progress-fill"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </>
          ) : null}
        </div>

        <div className="kasi-modal-body" ref={bodyRef}>
          {success ? (
            <div className="kasi-modal-success">
              <div className="kasi-modal-success-icon">
                <Check aria-hidden="true" strokeWidth={3} />
              </div>
              <h3 className="kasi-modal-success-title">Thank You, {firstName}! 🎉</h3>
              <p className="kasi-modal-success-body">
                Thank you for enrolling. We have received your preferred location and day.
                KasiAIhub will group learners according to demand, confirm your training date and
                send you the payment link.
              </p>
              <p style={{ color: "#9CA3AF", fontSize: 13, margin: "0 0 18px" }}>
                We'll set up an account so you can track this booking.
              </p>
              <button type="button" className="kasi-modal-btn-primary" onClick={handleClose}>
                Back to Homepage
              </button>

            </div>
          ) : (
            <>
              {step === 1 && (
                <>
                  <h3 className="kasi-form-heading">Tell us about yourself</h3>

                  <Field label="Full Name" error={errors.fullName}>
                    <input
                      className="kasi-input"
                      placeholder="Your full name"
                      value={form.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                    />
                  </Field>

                  <Field label="Business Name and what it does" error={errors.business}>
                    <input
                      className="kasi-input"
                      placeholder="e.g. Nomsa's Catering — I make and deliver meals for events"
                      value={form.business}
                      onChange={(e) => set("business", e.target.value)}
                    />
                  </Field>

                  <Field
                    label="WhatsApp Number"
                    error={errors.whatsapp}
                    helper="We will confirm your enrolment on this number"
                  >
                    <input
                      type="tel"
                      className="kasi-input"
                      placeholder="071 234 5678"
                      value={form.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                    />
                  </Field>

                  <RadioCards
                    label="Have you done the free business diagnostic yet?"
                    options={diagnosticOptions}
                    value={form.diagnosticDone}
                    onChange={(v) => set("diagnosticDone", v)}
                    error={errors.diagnosticDone}
                  />
                  {form.diagnosticDone === diagnosticOptions[1] && (
                    <div style={{ marginTop: -6, marginBottom: 12 }}>
                      <Link
                        to="/diagnostic"
                        onClick={handleClose}
                        style={{
                          color: "#F59E0B",
                          fontSize: 14,
                          fontWeight: 600,
                          textDecoration: "underline",
                        }}
                      >
                        Find out what kind of business you're really running →
                      </Link>
                    </div>
                  )}


                  <div className="kasi-form-nav">
                    <button type="button" className="kasi-modal-btn-primary" onClick={next}>
                      Continue →
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="kasi-form-heading">Let's make sure you are set up for success</h3>

                  <RadioCards
                    label="Do you have a laptop or computer you can bring to training?"
                    options={laptopOptions}
                    value={form.laptop}
                    onChange={(v) => set("laptop", v)}
                    error={errors.laptop}
                    helper="A laptop or computer is required for all sessions. Phones and tablets are not suitable for this training."
                  />

                  <RadioCards
                    label="Do you have a Gmail account?"
                    options={gmailOptions}
                    value={form.gmail}
                    onChange={(v) => set("gmail", v)}
                    error={errors.gmail}
                    helper="A Gmail account is needed to access the AI tools we use. We will help you set one up before the session if needed."
                  />

                  <RadioCards
                    label="How comfortable are you using a computer?"
                    options={comfortOptions}
                    value={form.comfort}
                    onChange={(v) => set("comfort", v)}
                    error={errors.comfort}
                  />

                  <RadioCards
                    label="Do you currently use any AI tools in your business?"
                    options={aiOptions}
                    value={form.aiUse}
                    onChange={(v) => set("aiUse", v)}
                    error={errors.aiUse}
                    helper="This helps us understand where to start with you — there are no wrong answers."
                  />

                  {form.aiUse === aiOptions[0] && (
                    <Field label="" error={errors.aiTools}>
                      <input
                        className="kasi-input"
                        placeholder="Which tools do you use? e.g. ChatGPT, Claude, Gemini"
                        value={form.aiTools}
                        onChange={(e) => set("aiTools", e.target.value)}
                      />
                    </Field>
                  )}

                  <div className="kasi-form-nav kasi-form-nav-split">
                    <button type="button" className="kasi-modal-btn-secondary" onClick={back}>
                      ← Previous
                    </button>
                    <button type="button" className="kasi-modal-btn-primary" onClick={next}>
                      Continue →
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="kasi-form-heading">Choose your sessions</h3>

                  <div className="kasi-form-label">Which sessions are you enrolling for?</div>
                  <div className="kasi-session-card-stack">
                    {sessionOptions.map((opt) => {
                      const qty = counts[opt.id] ?? 0;
                      const isBundle = !!opt.bundle;
                      const included = !isBundle && opt.id !== "s4" && bundleSelected;
                      const selected = qty > 0;
                      const accentClass = isBundle ? "is-gold" : "";
                      const isS4 = opt.id === "s4";
                      return (
                        <div
                          key={opt.id}
                          className={`kasi-form-session-card ${
                            opt.featured ? "is-featured" : ""
                          } ${isS4 ? "is-gold-card" : ""} ${selected ? "is-selected" : ""}`}
                        >
                          <div className="kasi-session-card-row">
                            <div className="kasi-session-card-body">
                              <div className="kasi-form-session-top">
                                {opt.label}
                                {isS4 && <span className="kasi-session-new-badge">NEW</span>}
                              </div>
                              <div className="kasi-form-session-title">{opt.title}</div>
                              <div className="kasi-form-session-days">{opt.days}</div>
                              <div className="kasi-form-session-price">
                                {formatRand(opt.price)}
                              </div>
                              {opt.savings && (
                                <div className="kasi-form-session-savings">{opt.savings}</div>
                              )}
                              <div className="kasi-form-session-desc">{opt.desc}</div>
                              {isS4 && (
                                <div className="kasi-form-session-note">
                                  Standalone — not part of the Core Journey bundle. Can be
                                  scheduled independently of your other sessions.
                                </div>
                              )}
                              {included && (
                                <div className="kasi-session-included">✓ Included in bundle</div>
                              )}
                              {qty >= 1 && (
                                <div className={`kasi-session-qty-pill ${accentClass}`}>
                                  <button
                                    type="button"
                                    aria-label={`Remove one ${opt.title}`}
                                    onClick={() => changeSessionCount(opt.id, -1)}
                                  >
                                    −
                                  </button>
                                  <span>×{qty}</span>
                                  <button
                                    type="button"
                                    aria-label={`Add another ${opt.title}`}
                                    onClick={() => changeSessionCount(opt.id, 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              className={`kasi-session-toggle ${accentClass} ${
                                qty > 0 ? "is-active" : ""
                              }`}
                              aria-label={
                                qty > 0 ? `Remove ${opt.title}` : `Add ${opt.title}`
                              }
                              aria-pressed={qty > 0}
                              onClick={() =>
                                changeSessionCount(opt.id, qty > 0 ? -qty : 1)
                              }
                            >
                              {qty > 0 ? "−" : "+"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.sessionCounts && (
                    <div className="kasi-form-error">{errors.sessionCounts}</div>
                  )}

                  <div className="kasi-form-summary">
                    <div className="kasi-form-summary-title">Your selection</div>
                    {totalSessionCount(counts) === 0 ? (
                      <div className="kasi-form-summary-body">No sessions selected yet.</div>
                    ) : (
                      <>
                        {sessionOptions.map((opt) => {
                          const qty = counts[opt.id] ?? 0;
                          if (qty === 0) return null;
                          return (
                            <div key={opt.id} className="kasi-form-summary-row">
                              <span>
                                {opt.title}
                                {qty > 1 ? ` ×${qty}` : ""}
                              </span>
                              <span>{formatRand(opt.price * qty)}</span>
                            </div>
                          );
                        })}
                        <div className="kasi-form-summary-total">
                          <span>Total</span>
                          <span>
                            {showSavings && strikeTotal > total && (
                              <span className="kasi-form-summary-strike">
                                {formatRand(strikeTotal)}
                              </span>
                            )}
                            {formatRand(total)}
                            {showSavings && (
                              <span className="kasi-form-summary-save-badge">SAVE R500</span>
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  {allIndividuals && !bundleSelected && (
                    <div className="kasi-form-summary-tip">
                      Switch to the full programme above and save R500.
                    </div>
                  )}

                  {counts.s4 > 0 &&
                    counts.all === 0 &&
                    counts.s1 === 0 &&
                    counts.s2 === 0 &&
                    counts.s3 === 0 && (
                      <div className="kasi-form-session-note">
                        This session assumes comfort with computers and AI tools. If you're new to
                        this, we recommend starting with the Core Journey.
                      </div>
                    )}

                  <div className="kasi-form-session-note">
                    Sessions 2 and 3 require completion of the previous session. If you miss a
                    session you are welcome to join the next available cohort to continue your
                    journey.
                  </div>

                  <RadioCards
                    label="Preferred location"
                    options={trainingLocations}
                    value={form.trainingLocation}
                    onChange={(v) => set("trainingLocation", v)}
                    error={errors.trainingLocation}
                  />

                  <RadioCards
                    label="Preferred day"
                    options={dayOptions}
                    value={form.preferredDay}
                    onChange={(day) => set("preferredDay", day)}
                    error={errors.preferredDay}
                    helper={SCHEDULING_COPY}
                  />


                  <div className="kasi-form-nav kasi-form-nav-split">
                    <button type="button" className="kasi-modal-btn-secondary" onClick={back}>
                      ← Previous
                    </button>
                    <button type="button" className="kasi-modal-btn-primary" onClick={next}>
                      Continue →
                    </button>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 className="kasi-form-heading">Almost done</h3>

                  <div className="kasi-form-summary">
                    <div className="kasi-form-summary-title">
                      {total > 0 ? `Total — ${formatRand(total)}` : "No sessions selected"}
                    </div>
                    <div className="kasi-form-summary-body">
                      No payment is taken now. We group learners by session, location and preferred
                      day, confirm your training date, and then send you the payment link. 30 days
                      of WhatsApp support included.
                      <br />
                      T&Cs apply.
                    </div>
                  </div>

                  <CheckboxRow
                    checked={form.consent}
                    onChange={(v) => set("consent", v)}
                    error={errors.consent}
                    label="I confirm that I will bring a laptop to every session I attend and that I understand sessions must be completed in order."
                  />
                  <CheckboxRow
                    checked={form.updates}
                    onChange={(v) => set("updates", v)}
                    muted
                    label="I agree to receive training updates and programme information from kasiAIhub via WhatsApp."
                  />

                  <div className="kasi-form-nav kasi-form-nav-split">
                    <button
                      type="button"
                      className="kasi-modal-btn-secondary"
                      onClick={back}
                      disabled={submitting}
                    >
                      ← Previous
                    </button>
                  </div>

                  <button
                    type="button"
                    className="kasi-modal-btn-primary kasi-modal-btn-large"
                    onClick={submit}
                    disabled={
                      !form.consent ||
                      !form.trainingLocation ||
                      !form.preferredDay ||
                      submitting
                    }
                  >
                    {submitting ? (<><span className="kasi-spinner kasi-spinner-dark" />Submitting…</>) : "Submit My Enrolment →"}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  helper,
  children,
}: {
  label: string;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="kasi-form-field">
      {label && <label className="kasi-form-label">{label}</label>}
      {children}
      {helper && !error && <div className="kasi-form-helper">{helper}</div>}
      {error && <div className="kasi-form-error">{error}</div>}
    </div>
  );
}

function RadioCards({
  label,
  options,
  value,
  onChange,
  error,
  helper,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  helper?: string;
}) {
  return (
    <div className="kasi-form-field">
      <div className="kasi-form-label">{label}</div>
      <div className="kasi-radio-stack">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              type="button"
              key={opt}
              className={`kasi-radio-card ${selected ? "is-selected" : ""}`}
              onClick={() => onChange(opt)}
              aria-pressed={selected}
            >
              <span className={`kasi-radio-dot ${selected ? "is-selected" : ""}`} />
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {helper && !error && <div className="kasi-form-helper">{helper}</div>}
      {error && <div className="kasi-form-error">{error}</div>}
    </div>
  );
}

function CheckboxRow({
  checked,
  onChange,
  label,
  error,
  muted,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  error?: string;
  muted?: boolean;
}) {
  return (
    <div className="kasi-form-field">
      <button
        type="button"
        className="kasi-checkbox-row"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span className={`kasi-checkbox-box ${checked ? "is-checked" : ""}`}>
          {checked && <Check aria-hidden="true" strokeWidth={3} />}
        </span>
        <span className={muted ? "kasi-checkbox-label is-muted" : "kasi-checkbox-label"}>
          {label}
        </span>
      </button>
      {error && <div className="kasi-form-error">{error}</div>}
    </div>
  );
}

