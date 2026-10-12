import type { ReactNode } from "react";
import {
  AREA_LABEL,
  AREA_MAX,
  OPPORTUNITY_TEXT,
  STAGE_COLOR,
  STAGE_DESCRIPTION,
  STAGE_LABEL,
  STRENGTH_TEXT,
  areaPct,
  barColor,
  personalisedJourney,
  scoreBandLabel,
  selectCostLine,
  selectGapSentences,
  strongestArea,
  type AreaKey,
  type Scores,
} from "@/lib/diagnostic-data";
import { Trophy, Settings, Banknote, Megaphone, Lightbulb, Star, TrendingUp } from "lucide-react";

type Props = {
  name?: string | null;
  businessName?: string | null;
  answers: Record<string, unknown>;
  scores: Scores;
  aiOpening?: string | null;
  aiUnavailable?: boolean;
  aiPending?: boolean;
};

const C = {
  bg: "#000000",
  card: "#0F0F0F",
  border: "#262626",
  emerald: "#00C896",
  gold: "#F59E0B",
  text: "#F5F5F0",
  muted: "#9CA3AF",
};

const AREA_ICON: Record<AreaKey, typeof Settings> = {
  capacity: Settings,
  money: Banknote,
  growth: Megaphone,
};

// ============================================================
// Shared inner body — used by both print component and modal
// ============================================================
function ReportBody({ name, businessName, answers, scores, aiOpening, aiUnavailable }: Props) {
  const strongest = strongestArea(scores);
  const journey = personalisedJourney(scores, answers);
  const date = new Date().toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const areas: AreaKey[] = ["capacity", "money", "growth"];

  return (
    <div className="printable-inner">
      {/* -------- PAGE 1 -------- */}
      <section className="report-section printable-header">
        <div className="ph-top">
          <div>
            <div className="wordmark">
              kasi<span style={{ color: C.emerald }}>AI</span>hub
            </div>
            <div className="tagline">INTELLIGENT BUSINESS SYSTEMS</div>
          </div>
          <div className="who">
            {name ? <div className="who-name">{name}</div> : null}
            {businessName ? <div className="who-biz">{businessName}</div> : null}
            <div className="who-date">{date}</div>
          </div>
        </div>

        <div className="hero-grid">
          <div>
            <h1 className="hero-title">
              Your business
              <br />
              <span style={{ color: C.emerald }}>diagnostic</span>
            </h1>
            <div className="hero-rule" />
            <p className="hero-sub">
              Honest insights. Practical next steps.
              <br />
              Built for your growth.
            </p>
          </div>

          <div className="stage-card">
            <div className="stage-label">RIGHT NOW, YOUR BUSINESS IS</div>
            <div className="stage-row">
              <IconCircle color={C.gold} bg="rgba(245,158,11,0.15)">
                <TrendingUp size={22} />
              </IconCircle>
              <div
                className="stage-pill"
                style={{
                  background: STAGE_COLOR[scores.stage],
                  color: scores.stage === "stabilisation" ? "#1a1200" : "#03110A",
                }}
              >
                {STAGE_LABEL[scores.stage]}
              </div>
            </div>
            <p className="stage-desc">{STAGE_DESCRIPTION[scores.stage]}</p>
          </div>
        </div>
      </section>

      {aiUnavailable && !aiOpening?.trim() ? null : aiOpening && aiOpening.trim() ? (
        <section className="report-section ai-opening-card">
          <div className="ai-opening-eyebrow">WHAT WE'RE SEEING</div>
          {aiOpening
            .trim()
            .split(/\n\s*\n/)
            .map((para, i) => (
              <p
                key={i}
                className="ai-opening-body"
                style={
                  i === 0
                    ? undefined
                    : {
                        marginTop: 14,
                        paddingTop: 14,
                        borderTop: "1px solid #222",
                      }
                }
              >
                {para.trim()}
              </p>
            ))}
        </section>
      ) : (
        <section className="report-section ai-opening-card">
          <div className="ai-opening-eyebrow">WHAT WE'RE SEEING</div>
          <div className="ai-opening-pending" role="status" aria-live="polite">
            <span className="kasi-spinner" />
            Still writing this part…
          </div>
        </section>
      )}

      <section className="report-section">
        <StrongestBanner area={strongest} scores={scores} answers={answers} />
      </section>

      {/* -------- PAGE 2 -------- */}
      <div className="report-page-break-before" />
      <h2 className="h2">Your three gaps</h2>
      {areas.map((area) => (
        <section key={area} className="report-section gap-wrap">
          <GapCard area={area} scores={scores} answers={answers} isStrongest={area === strongest} />
        </section>
      ))}

      {/* -------- PAGE 3 -------- */}
      <div className="report-page-break-before" />
      <section className="report-section journey-card">
        <div className="journey-eyebrow">YOUR PERSONALISED JOURNEY</div>
        <h2 className="h2">Built from your actual answers</h2>
        <p className="journey-intro">
          Every entrepreneur starts in the same three sessions — but where you start, what gets
          built for you, and what we prioritise depends on your diagnostic. Here's how your
          programme reads specifically for {name || "you"}
          {businessName ? ` at ${businessName}` : ""}.
        </p>

        <JourneyStep n={1} title="Session 1 — Think and Plan" body={journey.s1} />
        <JourneyStep n={2} title="Session 2 — Build and Create" body={journey.s2} />
        <JourneyStep
          n={3}
          title="Session 3 — Brand and Grow"
          body={journey.s3}
          flag={journey.growthIsBiggestOpportunity ? "YOUR BIGGEST OPPORTUNITY" : undefined}
        />
      </section>

      {/* -------- PAGE 4 -------- */}
      <div className="report-page-break-before" />
      <section className="report-section pricing-card">
        <div className="pricing-eyebrow">WHAT'S INCLUDED</div>
        <h3 className="h3">Simple pricing. Everything included.</h3>
        <div className="pricing-grid">
          <div className="price-tile">
            <div className="price-kicker">PER SESSION</div>
            <div className="price-amount">R1,500</div>
            <ul className="price-list">
              <li>The full session (hands-on training)</li>
              <li>1 month subscription to that session's AI tool — included</li>
              <li>30 days of WhatsApp support included.</li>
            </ul>
            <div className="price-note">No extra software costs. No extra support costs.</div>
          </div>
          <div className="price-tile bundle">
            <div className="price-badge">SAVE R500</div>
            <div className="price-kicker gold">FULL PROGRAMME BUNDLE</div>
            <div className="price-amount">R4,000</div>
            <ul className="price-list">
              <li>All 3 sessions</li>
              <li>All 3 AI tool subscriptions — included</li>
              <li>30 days of WhatsApp support included after every session.</li>
            </ul>
            <div className="price-note">No extra software costs. No extra support costs.</div>
          </div>
        </div>
        <div className="pricing-enrol-row">
          <div className="pricing-enrol-btn">▸ Enrol in the AI Business Accelerator</div>
        </div>
      </section>

      <section className="report-section study-invite">
        <div className="study-invite-title">You just told us about your business.</div>
        <div className="study-invite-body">
          Help us understand others like yours too — five quick questions, nothing to sell, just
          real input from real businesses like yours.
        </div>
        <div className="study-invite-link">
          Contribute to the Community Business Study — kasiaihub.com/township-study
        </div>
      </section>

      <div className="closing-line">
        kasiaihub.com &nbsp;|&nbsp; +27 81 890 5861 &nbsp;|&nbsp; Your results link stays live —
        come back anytime.
      </div>
    </div>
  );
}

// Shared visual styles applied inside a scoping selector.
// `scope` is either `.printable-root` (print) or `.report-preview` (modal).
function reportStyles(scope: string) {
  return `
    ${scope} { color: ${C.text}; font-family: Inter, system-ui, sans-serif; background: ${C.bg}; }
    ${scope} .printable-inner { max-width: 900px; margin: 0 auto; padding: 24px; }
    ${scope} .report-section { break-inside: avoid; page-break-inside: avoid; margin: 0 0 14px; }
    ${scope} .report-page-break-before { break-before: page; page-break-before: always; height: 0; }
    ${scope} .wordmark { font-size: 26px; font-weight: 800; color: ${C.text}; letter-spacing: -0.01em; line-height: 1; text-align: left; }
    ${scope} .tagline { font-size: 8px; letter-spacing: 0.22em; color: ${C.muted}; margin-top: 3px; font-weight: 700; line-height: 1.2; text-align: left; }
    ${scope} .printable-header .ph-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; gap: 12px; flex-wrap: wrap; }
    ${scope} .who { text-align: right; font-size: 12px; }
    ${scope} .who-name { color: ${C.text}; font-weight: 700; }
    ${scope} .who-biz, ${scope} .who-date { color: ${C.muted}; margin-top: 2px; }
    ${scope} .hero-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 20px; align-items: start; }
    ${scope} .hero-title { font-size: 54px; font-weight: 800; line-height: 1; margin: 0; letter-spacing: -0.02em; color: ${C.text}; }
    ${scope} .hero-rule { width: 100px; height: 2px; background: linear-gradient(90deg, ${C.gold}, transparent); margin: 14px 0; }
    ${scope} .hero-sub { font-style: italic; color: ${C.muted}; font-size: 13px; margin: 0; }
    ${scope} .stage-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 12px; padding: 18px; }
    ${scope} .stage-label { color: ${C.gold}; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-align: center; margin-bottom: 12px; }
    ${scope} .stage-row { display: flex; align-items: center; gap: 10px; justify-content: center; }
    ${scope} .stage-pill { padding: 10px 22px; border-radius: 8px; font-weight: 800; font-size: 20px; letter-spacing: -0.01em; }
    ${scope} .stage-desc { color: ${C.muted}; font-size: 12px; text-align: center; margin: 12px 0 0; line-height: 1.5; }
    ${scope} .h2 { font-size: 20px; font-weight: 800; margin: 6px 0 10px; color: ${C.text}; }
    ${scope} .h3 { font-size: 18px; font-weight: 800; margin: 0 0 14px; color: ${C.text}; }
    ${scope} .print-gap-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 12px; padding: 16px; display: grid; grid-template-columns: 1.7fr 1fr; gap: 18px; }
    ${scope} .print-gap-main { display: flex; gap: 12px; }
    ${scope} .print-gap-title { font-size: 15px; font-weight: 700; color: ${C.text}; }
    ${scope} .print-gap-score { font-size: 15px; font-weight: 800; white-space: nowrap; }
    ${scope} .print-gap-bar { height: 7px; background: rgba(255,255,255,0.06); border-radius: 999px; margin-top: 8px; overflow: hidden; }
    ${scope} .print-gap-text { margin-top: 10px; color: ${C.muted}; font-size: 12px; line-height: 1.55; }
    ${scope} .print-gap-cost { margin: 8px 0 0; padding-left: 8px; border-left: 2px solid ${C.gold}; color: #B8B8B8; font-size: 11.5px; font-style: italic; line-height: 1.5; }
    ${scope} .ai-opening-card { background: ${C.card}; border: 1px solid ${C.border}; border-left: 3px solid ${C.emerald}; border-radius: 12px; padding: 18px; }
    ${scope} .ai-opening-eyebrow { color: ${C.emerald}; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; margin-bottom: 8px; }
    ${scope} .ai-opening-body { margin: 0; color: ${C.text}; font-size: 13px; line-height: 1.65; white-space: pre-wrap; }
    ${scope} .ai-opening-pending { color: ${C.muted}; font-size: 13px; display: flex; align-items: center; gap: 8px; min-height: 24px; }
    ${scope} .print-gap-panel { border-left: 1px solid ${C.border}; padding-left: 16px; display: flex; flex-direction: column; gap: 8px; justify-content: center; }
    ${scope} .print-gap-panel-label { font-weight: 700; font-size: 12px; }
    ${scope} .print-gap-panel-body { color: ${C.muted}; font-size: 12px; line-height: 1.55; }
    ${scope} .journey-card { background: linear-gradient(180deg, rgba(0,200,150,0.08), rgba(0,0,0,0)); border: 1px solid rgba(0,200,150,0.35); border-radius: 12px; padding: 20px; }
    ${scope} .journey-eyebrow { color: ${C.emerald}; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; margin-bottom: 6px; }
    ${scope} .journey-intro { color: ${C.muted}; font-size: 13px; line-height: 1.6; margin: 4px 0 14px; }
    ${scope} .journey-step { border-top: 1px solid ${C.border}; padding: 14px 0 6px; display: grid; grid-template-columns: 44px 1fr; gap: 14px; align-items: start; }
    ${scope} .js-num { width: 36px; height: 36px; border-radius: 50%; background: ${C.emerald}; color: #03110A; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; }
    ${scope} .js-title { font-size: 15px; font-weight: 800; color: ${C.text}; margin: 0 0 6px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    ${scope} .js-flag { background: rgba(245,158,11,0.15); color: ${C.gold}; border: 1px solid rgba(245,158,11,0.5); font-size: 9px; font-weight: 800; letter-spacing: 0.15em; padding: 3px 8px; border-radius: 999px; }
    ${scope} .js-body { color: ${C.muted}; font-size: 12.5px; line-height: 1.6; margin: 0; }
    ${scope} .pricing-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 12px; padding: 20px; }
    ${scope} .pricing-eyebrow { color: ${C.gold}; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; margin-bottom: 4px; }
    ${scope} .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    ${scope} .price-tile { border: 1px solid ${C.border}; border-radius: 10px; padding: 14px; background: rgba(255,255,255,0.02); position: relative; }
    ${scope} .price-tile.bundle { border-color: ${C.gold}; background: rgba(245,158,11,0.06); }
    ${scope} .price-badge { position: absolute; top: -9px; right: 12px; background: ${C.gold}; color: #1a1200; font-size: 9px; font-weight: 800; letter-spacing: 0.15em; padding: 3px 8px; border-radius: 999px; }
    ${scope} .price-kicker { color: ${C.muted}; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; }
    ${scope} .price-kicker.gold { color: ${C.gold}; }
    ${scope} .price-amount { font-size: 24px; font-weight: 800; margin-top: 4px; color: ${C.text}; }
    ${scope} .price-list { margin: 10px 0 0; padding-left: 16px; color: ${C.muted}; font-size: 12px; line-height: 1.55; }
    ${scope} .price-note { margin-top: 10px; color: ${C.emerald}; font-size: 11px; font-weight: 600; }
    ${scope} .pricing-enrol-row { margin-top: 18px; display: flex; justify-content: center; }
    ${scope} .pricing-enrol-btn { background: ${C.emerald}; color: #03110A; padding: 12px 20px; border-radius: 8px; font-weight: 800; font-size: 13px; }
    ${scope} .closing-line { margin-top: 16px; text-align: center; color: ${C.muted}; font-size: 11px; }
    ${scope} .study-invite { margin-top: 18px; padding-top: 14px; border-top: 1px solid ${C.border}; color: ${C.muted}; font-size: 12px; line-height: 1.55; }
    ${scope} .study-invite-title { color: ${C.text}; font-weight: 700; font-size: 13px; margin-bottom: 4px; }
    ${scope} .study-invite-link { color: ${C.emerald}; font-weight: 600; margin-top: 8px; font-size: 12px; }
    ${scope} .print-strongest { background: ${C.card}; border: 1px solid rgba(0,200,150,0.4); border-radius: 12px; padding: 18px; display: grid; grid-template-columns: auto 1fr auto; gap: 16px; align-items: center; }
    ${scope} .print-strongest-title { color: ${C.emerald}; font-size: 12px; font-weight: 700; margin-bottom: 4px; }
    ${scope} .print-strongest-area { font-size: 17px; font-weight: 800; margin-bottom: 4px; color: ${C.text}; }
    ${scope} .print-strongest-text { color: ${C.muted}; font-size: 12px; line-height: 1.5; }
    ${scope} .print-strongest-stats { display: flex; gap: 14px; align-items: center; }
    ${scope} .print-stat { text-align: center; }
    ${scope} .print-stat-val { font-size: 17px; font-weight: 800; }
    ${scope} .print-stat-label { font-size: 10px; color: ${C.muted}; margin-top: 2px; }
    ${scope} .print-divider { width: 1px; height: 26px; background: ${C.border}; }
    ${scope} .quickwin-inner { border: 1px solid ${C.gold}; background: rgba(245,158,11,0.06); border-radius: 12px; padding: 16px 18px; }
    ${scope} .qw-eyebrow { color: ${C.gold}; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; margin-bottom: 6px; }
    ${scope} .qw-title { font-size: 16px; font-weight: 800; color: ${C.text}; margin-bottom: 6px; }
    ${scope} .qw-body { color: ${C.muted}; font-size: 12.5px; line-height: 1.6; margin: 0; }
    @media (max-width: 720px) {
      ${scope} .hero-grid, ${scope} .pricing-grid, ${scope} .print-gap-card, ${scope} .print-strongest { grid-template-columns: 1fr !important; }
      ${scope} .print-strongest-stats { flex-wrap: wrap; gap: 12px; }
      ${scope} .print-gap-panel { border-left: none; border-top: 1px solid ${C.border}; padding-left: 0; padding-top: 12px; }
      ${scope} .hero-title { font-size: 40px; }
    }
  `;
}

export function PrintableDiagnosticReport(props: Props) {
  const waiting = !props.aiOpening?.trim() && !props.aiUnavailable;
  return (
    <>
      <div
        className="printable-root"
        aria-hidden="true"
        aria-busy={waiting || (props.aiPending && !props.aiUnavailable)}
      >
        <ReportBody {...props} />
      </div>
      <style>{`
        .printable-root { display: none; }
        @media print {
          @page { size: A4; margin: 12mm; background: #000; }
          html, body {
            background: ${C.bg} !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body * { visibility: hidden !important; }
          .printable-root, .printable-root * { visibility: visible !important; }
          .printable-root {
            display: block !important;
            position: absolute !important;
            left: 0 !important; top: 0 !important; right: 0 !important;
            width: 100% !important;
            z-index: 999999;
          }
          .printable-root .printable-inner { padding: 0 4mm !important; max-width: 100% !important; }
          ${reportStyles(".printable-root")}
        }
      `}</style>
    </>
  );
}

// ============================================================
// Preview modal — shows the same layout on screen
// ============================================================
export function PreviewReportModal({
  open,
  onClose,
  onDownload,
  aiPending = false,
  ...reportProps
}: Props & {
  open: boolean;
  onClose: () => void;
  onDownload?: () => void;
  /** True while the AI paragraph is still generating — blocks PDF export. */
  aiPending?: boolean;
}) {
  if (!open) return null;
  const waiting =
    !(reportProps.aiOpening && reportProps.aiOpening.trim()) && !reportProps.aiUnavailable;
  const handleDownload = () => {
    if (waiting) return;
    if (onDownload) onDownload();
    else if (typeof window !== "undefined") window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Preview your diagnostic report"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          margin: "0 auto",
          width: "100%",
          maxWidth: 960,
          background: C.bg,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(100vh - 32px)",
        }}
      >
        {/* Toolbar */}
        <div
          className="preview-toolbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: `1px solid ${C.border}`,
            background: "rgba(0,0,0,0.6)",
            flexShrink: 0,
            gap: 10,
          }}
        >
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>Report preview</div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>
              {waiting
                ? "Finishing your personal read — the PDF will be ready in a moment."
                : 'Opens your device\'s print dialogue — choose "Save as PDF" to keep a copy.'}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={handleDownload}
              disabled={waiting}
              style={{
                opacity: waiting ? 0.55 : 1,
                background: C.emerald,
                color: "#03110A",
                border: "none",
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: waiting ? "wait" : "pointer",
              }}
            >
              {waiting ? "Preparing…" : "Save as PDF"}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "transparent",
                color: C.muted,
                border: `1px solid ${C.border}`,
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="report-preview" style={{ overflow: "auto", background: C.bg }}>
          <ReportBody {...reportProps} />
        </div>
      </div>

      <style>{`
        ${reportStyles(".report-preview")}
        .report-preview .report-page-break-before {
          border-top: 1px dashed ${C.border};
          margin: 24px 0;
        }
        @media print {
          [role="dialog"] { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// Shared subcomponents
// ============================================================

function IconCircle({
  children,
  color,
  bg,
  small,
}: {
  children: ReactNode;
  color: string;
  bg: string;
  small?: boolean;
}) {
  const size = small ? 26 : 40;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        border: `1px solid ${color}`,
        color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

function StrongestBanner({
  area,
  scores,
  answers,
}: {
  area: AreaKey;
  scores: Scores;
  answers: Record<string, unknown>;
}) {
  const score =
    area === "capacity" ? scores.capacity : area === "money" ? scores.money : scores.growth;
  const max = AREA_MAX[area];
  const pct = areaPct(area, scores);
  const sentence = selectGapSentences(area, answers, true)[0];

  return (
    <div className="print-strongest">
      <IconCircle color={C.emerald} bg="rgba(0,200,150,0.12)">
        <Trophy size={20} />
      </IconCircle>
      <div>
        <div className="print-strongest-title">Your strongest area</div>
        <div className="print-strongest-area">{AREA_LABEL[area]}</div>
        <div className="print-strongest-text">{sentence}</div>
      </div>
      <div className="print-strongest-stats">
        <div className="print-stat">
          <div className="print-stat-val" style={{ color: C.emerald }}>
            {score} / {max}
          </div>
          <div className="print-stat-label">Your Score</div>
        </div>
        <div className="print-divider" />
        <div className="print-stat">
          <div className="print-stat-val" style={{ color: C.text }}>
            {scoreBandLabel(pct, "visibility")}
          </div>
          <div className="print-stat-label">Market Visibility</div>
        </div>
        <div className="print-divider" />
        <div className="print-stat">
          <div className="print-stat-val" style={{ color: C.text }}>
            {scoreBandLabel(pct, "growth")}
          </div>
          <div className="print-stat-label">Growth Potential</div>
        </div>
      </div>
    </div>
  );
}

function GapCard({
  area,
  scores,
  answers,
  isStrongest,
}: {
  area: AreaKey;
  scores: Scores;
  answers: Record<string, unknown>;
  isStrongest: boolean;
}) {
  const Icon = AREA_ICON[area];
  const score =
    area === "capacity" ? scores.capacity : area === "money" ? scores.money : scores.growth;
  const max = AREA_MAX[area];
  const pct = areaPct(area, scores);
  const color = barColor(pct);
  const sentences = selectGapSentences(area, answers, isStrongest);
  const costLine = isStrongest ? null : selectCostLine(area, answers);

  return (
    <div className="print-gap-card">
      <div className="print-gap-main">
        <IconCircle color={color} bg={`${color}22`}>
          <Icon size={20} />
        </IconCircle>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div className="print-gap-title">{AREA_LABEL[area]}</div>
            <div className="print-gap-score">
              <span style={{ color }}>{score}</span>
              <span style={{ color: C.muted }}> / {max}</span>
            </div>
          </div>
          <div className="print-gap-bar">
            <div style={{ width: `${pct}%`, height: "100%", background: color }} />
          </div>
          <div className="print-gap-text">
            {sentences.map((s, i) => (
              <p key={i} style={{ margin: i === 0 ? 0 : "6px 0 0" }}>
                {s}
              </p>
            ))}
            {costLine ? <p className="print-gap-cost">{costLine}</p> : null}
          </div>
        </div>
      </div>
      <div className="print-gap-panel">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconCircle
            small
            color={isStrongest ? C.emerald : C.gold}
            bg={isStrongest ? "rgba(0,200,150,0.15)" : "rgba(245,158,11,0.15)"}
          >
            {isStrongest ? <Star size={12} /> : <Lightbulb size={12} />}
          </IconCircle>
          <div
            className="print-gap-panel-label"
            style={{ color: isStrongest ? C.emerald : C.gold }}
          >
            {isStrongest ? "Strength" : "Opportunity"}
          </div>
        </div>
        <div className="print-gap-panel-body">
          {isStrongest ? STRENGTH_TEXT[area] : OPPORTUNITY_TEXT[area]}
        </div>
      </div>
    </div>
  );
}

function JourneyStep({
  n,
  title,
  body,
  flag,
}: {
  n: number;
  title: string;
  body: string;
  flag?: string;
}) {
  return (
    <div className="journey-step">
      <div className="js-num">{n}</div>
      <div>
        <div className="js-title">
          <span>{title}</span>
          {flag ? <span className="js-flag">{flag}</span> : null}
        </div>
        <p className="js-body">{body}</p>
      </div>
    </div>
  );
}
