import type { ReactNode } from "react";
import { KasiLogo } from "@/components/KasiLogo";
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
  scoreBandLabel,
  selectCostLine,
  selectGapSentences,
  strongestArea,
  weakestArea,
  type AreaKey,
  type Scores,
} from "@/lib/diagnostic-data";
import {
  Trophy,
  Settings,
  Banknote,
  Megaphone,
  Lightbulb,
  Star,
  Globe,
  Phone,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

type Props = {
  name?: string | null;
  businessName?: string | null;
  answers: Record<string, unknown>;
  scores: Scores;
  aiOpening?: string | null;
  /** True while the AI paragraph is still being generated. */
  aiPending?: boolean;
  /** True when the AI paragraph can no longer be produced for this report. */
  aiUnavailable?: boolean;
  onEnrol?: () => void;
  showPrintButton?: boolean;
  firstParagraphOnly?: boolean;
  showTeaser?: boolean;
};

const BRAND = {
  bg: "#0A0A0A",
  card: "#0F0F0F",
  border: "#1E1E1E",
  emerald: "#00C896",
  gold: "#F59E0B",
  red: "#E24B4A",
  text: "#F5F5F0",
  muted: "#9CA3AF",
};

const AREA_ICON: Record<AreaKey, typeof Settings> = {
  capacity: Settings,
  money: Banknote,
  growth: Megaphone,
};

export function DiagnosticReport({
  name,
  businessName,
  answers,
  scores,
  aiOpening,
  aiPending = false,
  aiUnavailable = false,

  onEnrol,
  showPrintButton = true,
  firstParagraphOnly = false,
  showTeaser = false,
}: Props) {
  const strongest = strongestArea(scores);
  const weakest = weakestArea(scores);
  const date = new Date().toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const areas: AreaKey[] = ["capacity", "money", "growth"];

  return (
    <div
      className="diagnostic-report"
      aria-busy={!aiUnavailable && (aiPending || !aiOpening?.trim())}
      style={{
        background: `radial-gradient(1200px 600px at 20% -10%, rgba(0,200,150,0.06), transparent), ${BRAND.bg}`,
        color: BRAND.text,
        fontFamily: "Inter, system-ui, sans-serif",
        padding: "32px 20px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <KasiLogo size="lg" tagline />
          <div style={{ textAlign: "right", fontSize: 14 }}>
            {name ? <div style={{ fontWeight: 700, color: BRAND.text }}>{name}</div> : null}
            {businessName ? (
              <div style={{ color: BRAND.muted, marginTop: 2 }}>{businessName}</div>
            ) : null}
            <div style={{ color: BRAND.muted, marginTop: 2 }}>{date}</div>
          </div>
        </div>

        {/* HERO + STAGE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 24,
            marginBottom: 32,
          }}
          className="report-hero-grid"
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(44px, 6vw, 76px)",
                fontWeight: 800,
                lineHeight: 1,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Your business
              <br />
              <span style={{ color: BRAND.emerald }}>diagnostic</span>
            </h1>
            <div
              style={{
                width: 120,
                height: 2,
                background: `linear-gradient(90deg, ${BRAND.gold}, transparent)`,
                margin: "20px 0",
              }}
            />
            <p style={{ fontStyle: "italic", color: BRAND.muted, fontSize: 16, margin: 0 }}>
              Honest insights. Practical next steps.
              <br />
              Built for your growth.
            </p>
          </div>

          <div
            style={{
              background: BRAND.card,
              border: `1px solid ${BRAND.border}`,
              borderRadius: 14,
              padding: 24,
            }}
          >
            <div
              style={{
                color: BRAND.gold,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              RIGHT NOW, YOUR BUSINESS IS
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <IconCircle color={BRAND.gold} bg="rgba(245,158,11,0.15)">
                <TrendingUp size={22} />
              </IconCircle>
              <div
                style={{
                  background: STAGE_COLOR[scores.stage],
                  color: scores.stage === "stabilisation" ? "#1a1200" : "#03110A",
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 24,
                  letterSpacing: "-0.01em",
                }}
              >
                {STAGE_LABEL[scores.stage]}
              </div>
            </div>
            <p
              style={{
                color: BRAND.muted,
                fontSize: 14,
                textAlign: "center",
                marginTop: 16,
                lineHeight: 1.5,
              }}
            >
              {STAGE_DESCRIPTION[scores.stage]}
            </p>
          </div>
        </div>

        {/* WHAT WE'RE SEEING (AI opening) */}
        {aiUnavailable && !aiOpening?.trim() ? null : aiOpening && aiOpening.trim() ? (
          (() => {
            const paras = aiOpening.trim().split(/\n\s*\n/);
            const shown = firstParagraphOnly ? paras.slice(0, 1) : paras;
            return (
              <div
                style={{
                  background: BRAND.card,
                  border: `1px solid ${BRAND.border}`,
                  borderLeft: `3px solid ${BRAND.emerald}`,
                  borderRadius: 14,
                  padding: 24,
                  marginBottom: 20,
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
                  WHAT WE'RE SEEING
                </div>
                {shown.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      color: BRAND.text,
                      fontSize: 16,
                      lineHeight: 1.65,
                      whiteSpace: "pre-wrap",
                      paddingTop: i === 0 ? 0 : 18,
                      marginTop: i === 0 ? 0 : 18,
                      borderTop: i === 0 ? "none" : `1px solid ${BRAND.border}`,
                    }}
                  >
                    {para.trim()}
                  </p>
                ))}
                {showTeaser ? (
                  <p
                    style={{
                      margin: "16px 0 0",
                      color: BRAND.text,
                      fontSize: 16,
                      lineHeight: 1.65,
                    }}
                  >
                    There are specific systems we'd prioritise for you — they're in your{" "}
                    <span style={{ color: BRAND.gold, fontWeight: 700 }}>free</span> full report,
                    along with what to fix first and why. Download it below.
                  </p>
                ) : null}
              </div>
            );
          })()
        ) : (
          <div
            style={{
              background: BRAND.card,
              border: `1px solid ${BRAND.border}`,
              borderLeft: `3px solid ${BRAND.emerald}`,
              borderRadius: 14,
              padding: 24,
              marginBottom: 20,
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
              WHAT WE'RE SEEING
            </div>
            <div
              role="status"
              aria-live="polite"
              style={{
                color: BRAND.muted,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span className="kasi-spinner" />
              Still writing this part…
            </div>
          </div>
        )}

        {/* STRONGEST BANNER */}
        <StrongestBanner area={strongest} scores={scores} answers={answers} />

        {/* THREE GAPS */}
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "32px 0 16px" }}>Your three gaps</h2>
        <div style={{ display: "grid", gap: 14 }}>
          {areas.map((area) => (
            <GapCard
              key={area}
              area={area}
              scores={scores}
              answers={answers}
              isStrongest={area === strongest}
            />
          ))}
        </div>

        {/* WHERE YOU START */}
        <div
          style={{
            marginTop: 24,
            background: "linear-gradient(180deg, rgba(0,200,150,0.08), rgba(0,0,0,0))",
            border: `1px solid rgba(0,200,150,0.35)`,
            borderRadius: 14,
            padding: 28,
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 24,
            alignItems: "center",
          }}
          className="report-start-grid"
        >
          <div>
            <div
              style={{
                color: BRAND.emerald,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                marginBottom: 8,
              }}
            >
              WHERE YOU START
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 12px" }}>
              Session 1 — Think and Plan
            </h3>
            <p style={{ color: BRAND.muted, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Everyone starts here, because what you map in Session 1 becomes the raw material for
              Session 2. Your biggest gap is{" "}
              <strong style={{ color: BRAND.text }}>{AREA_LABEL[weakest].toLowerCase()}</strong> —
              the workflow you build in Session 1 is exactly what gets turned into a working system
              in Session 2.
            </p>
          </div>
          <JourneySteps />
        </div>

        {/* PRICING */}
        <div
          style={{
            marginTop: 24,
            background: BRAND.card,
            border: `1px solid ${BRAND.border}`,
            borderRadius: 14,
            padding: 28,
          }}
        >
          <div
            style={{
              color: BRAND.gold,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: 6,
            }}
          >
            WHAT'S INCLUDED
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 18px" }}>
            Simple pricing. Everything included.
          </h3>
          <div
            className="report-pricing-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div
              style={{
                border: `1px solid ${BRAND.border}`,
                borderRadius: 12,
                padding: 20,
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                style={{
                  color: BRAND.muted,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                }}
              >
                PER SESSION
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6, color: BRAND.text }}>
                R1,500
              </div>
              <ul
                style={{
                  margin: "14px 0 0",
                  paddingLeft: 18,
                  color: BRAND.muted,
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                <li>The full session (hands-on training)</li>
                <li>1 month subscription to that session's AI tool — included</li>
                <li>30 days of WhatsApp support included.</li>
              </ul>
              <div style={{ marginTop: 12, color: BRAND.emerald, fontSize: 12, fontWeight: 600 }}>
                No extra software costs. No extra support costs. It's all included.
              </div>
            </div>

            <div
              style={{
                border: `1px solid ${BRAND.gold}`,
                borderRadius: 12,
                padding: 20,
                background: "rgba(245,158,11,0.05)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: 16,
                  background: BRAND.gold,
                  color: "#1a1200",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                SAVE R500
              </div>
              <div
                style={{
                  color: BRAND.gold,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                }}
              >
                FULL PROGRAMME BUNDLE
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6, color: BRAND.text }}>
                R4,000
              </div>
              <ul
                style={{
                  margin: "14px 0 0",
                  paddingLeft: 18,
                  color: BRAND.muted,
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                <li>All 3 sessions</li>
                <li>All 3 AI tool subscriptions — included</li>
                <li>30 days of WhatsApp support included after every session.</li>
              </ul>
              <div style={{ marginTop: 12, color: BRAND.emerald, fontSize: 12, fontWeight: 600 }}>
                No extra software costs. No extra support costs. It's all included.
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={onEnrol}
              style={{
                background: BRAND.emerald,
                color: "#03110A",
                border: "none",
                padding: "16px 26px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                cursor: onEnrol ? "pointer" : "default",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ChevronRight size={18} strokeWidth={3} />
              Enrol in the AI Business Accelerator
            </button>
          </div>
        </div>

        {!firstParagraphOnly ? (
          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: `1px solid ${BRAND.border}`,
              color: BRAND.muted,
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: BRAND.text, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
              You just told us about your business.
            </div>
            <div>
              Help us understand others like yours too — five quick questions, nothing to sell, just
              real input from real businesses like yours.
            </div>
            <a
              href="/township-study"
              style={{
                color: BRAND.emerald,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                marginTop: 10,
                display: "inline-block",
              }}
            >
              Contribute to the Community Business Study →
            </a>
          </div>
        ) : null}

        {/* FOOTER */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: `1px solid ${BRAND.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            color: BRAND.muted,
            fontSize: 13,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Globe size={14} /> kasiaihub<span style={{ color: BRAND.emerald }}>.com</span>
            </span>
            <span style={{ color: BRAND.border }}>|</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Phone size={14} /> +27 81 890 5861
            </span>
          </div>
          <div>Your results link stays live — come back anytime.</div>
        </div>

        {showPrintButton ? (
          <div style={{ marginTop: 20, textAlign: "center" }} className="no-print">
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                background: "transparent",
                color: BRAND.emerald,
                border: `1px solid ${BRAND.emerald}`,
                padding: "10px 18px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Print / Save as PDF
            </button>
          </div>
        ) : null}
      </div>

      <style>{`
        @media (max-width: 780px) {
          .report-hero-grid, .report-start-grid { grid-template-columns: 1fr !important; }
          .report-cta-grid { grid-template-columns: 1fr !important; text-align: center; }
          .report-pricing-grid { grid-template-columns: 1fr !important; }
          .strongest-banner { grid-template-columns: 1fr !important; text-align: left; }
          .strongest-stats { flex-wrap: wrap; justify-content: flex-start !important; gap: 14px !important; }
        }
        @media (max-width: 640px) {
          .gap-card { grid-template-columns: 1fr !important; gap: 16px !important; padding: 18px !important; }
          .gap-panel {
            border-left: none !important;
            border-top: 1px solid ${BRAND.border} !important;
            padding-left: 0 !important;
            padding-top: 14px !important;
            background: rgba(255,255,255,0.02);
            margin: 0 -18px -18px;
            padding: 14px 18px 4px !important;
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
          }
        }
        @media print {
          .no-print { display: none !important; }
          .diagnostic-report { padding: 0 !important; }
        }
      `}</style>
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
    <div
      style={{
        background: BRAND.card,
        border: `1px solid rgba(0,200,150,0.4)`,
        borderRadius: 14,
        padding: 24,
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 20,
        alignItems: "center",
      }}
      className="strongest-banner"
    >
      <IconCircle color={BRAND.emerald} bg="rgba(0,200,150,0.12)">
        <Trophy size={24} />
      </IconCircle>
      <div>
        <div style={{ color: BRAND.emerald, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
          Your strongest area
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{AREA_LABEL[area]}</div>
        <div style={{ color: BRAND.muted, fontSize: 14, lineHeight: 1.5 }}>{sentence}</div>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }} className="strongest-stats">
        <StatBlock value={`${score} / ${max}`} label="Your Score" color={BRAND.emerald} />
        <Divider />
        <StatBlock
          value={scoreBandLabel(pct, "visibility")}
          label="Market Visibility"
          color={BRAND.text}
        />
        <Divider />
        <StatBlock
          value={scoreBandLabel(pct, "growth")}
          label="Growth Potential"
          color={BRAND.text}
        />
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
    <div
      style={{
        background: BRAND.card,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 14,
        padding: 22,
        display: "grid",
        gridTemplateColumns: "1.7fr 1fr",
        gap: 24,
        alignItems: "stretch",
      }}
      className="gap-card"
    >
      <div style={{ display: "flex", gap: 16 }} className="gap-card-main">
        <IconCircle color={color} bg={`${color}22`}>
          <Icon size={22} />
        </IconCircle>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="gap-card-titlerow"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700 }}>{AREA_LABEL[area]}</div>
            <div
              style={{ fontSize: 18, fontWeight: 800, whiteSpace: "nowrap" }}
              className="gap-card-score"
            >
              <span style={{ color }}>{score}</span>
              <span style={{ color: BRAND.muted }}> / {max}</span>
            </div>
          </div>
          <div
            style={{
              height: 8,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 999,
              marginTop: 10,
              overflow: "hidden",
            }}
          >
            <div style={{ width: `${pct}%`, height: "100%", background: color }} />
          </div>
          <div style={{ marginTop: 12, color: BRAND.muted, fontSize: 14, lineHeight: 1.55 }}>
            {sentences.map((s, i) => (
              <p key={i} style={{ margin: i === 0 ? 0 : "8px 0 0" }}>
                {s}
              </p>
            ))}
            {costLine ? (
              <p
                style={{
                  margin: "10px 0 0",
                  paddingLeft: 10,
                  borderLeft: `2px solid ${BRAND.gold}`,
                  color: "#B8B8B8",
                  fontSize: 13,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                {costLine}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div
        style={{
          borderLeft: `1px solid ${BRAND.border}`,
          paddingLeft: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
        }}
        className="gap-panel"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <IconCircle
            small
            color={isStrongest ? BRAND.emerald : BRAND.gold}
            bg={isStrongest ? "rgba(0,200,150,0.15)" : "rgba(245,158,11,0.15)"}
          >
            {isStrongest ? <Star size={14} /> : <Lightbulb size={14} />}
          </IconCircle>
          <div
            style={{
              color: isStrongest ? BRAND.emerald : BRAND.gold,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {isStrongest ? "Strength" : "Opportunity"}
          </div>
        </div>
        <div style={{ color: BRAND.muted, fontSize: 14, lineHeight: 1.55 }}>
          {isStrongest ? STRENGTH_TEXT[area] : OPPORTUNITY_TEXT[area]}
        </div>
      </div>
    </div>
  );
}

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
  const size = small ? 28 : 44;
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

function StatBlock({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2, letterSpacing: "0.03em" }}>
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 32, background: BRAND.border }} />;
}

function JourneySteps() {
  const steps = [
    { n: 1, label: "Think and Plan", sub: "Strategy, pricing, workflow", active: true },
    {
      n: 2,
      label: "Build and Create",
      sub: "A real working system, live the same day",
      active: false,
    },
    { n: 3, label: "Brand and Grow", sub: "Content, images, a month of marketing", active: false },
  ];
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      {steps.map((s, i) => (
        <div key={s.n} style={{ display: "flex", gap: 8, alignItems: "flex-start", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: s.active ? BRAND.emerald : "transparent",
                border: `2px solid ${s.active ? BRAND.emerald : "#444"}`,
                color: s.active ? "#03110A" : "#666",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                fontWeight: 700,
                color: s.active ? BRAND.emerald : BRAND.text,
                textAlign: "center",
              }}
            >
              {s.label}
            </div>
            <div style={{ marginTop: 4, fontSize: 10, color: BRAND.muted, textAlign: "center" }}>
              {s.sub}
            </div>
          </div>
          {i < steps.length - 1 ? (
            <div style={{ height: 2, background: "#333", flex: 1, marginTop: 17, minWidth: 8 }} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
