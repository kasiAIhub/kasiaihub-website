import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { EnrolModal } from "@/components/EnrolModal";
import { KasiLogo } from "@/components/KasiLogo";

const TITLE = "The Entrepreneur AI Journey | Diagnose, Build, Grow | kasiAIhub";
const DESCRIPTION =
  "We don't teach AI tools — we find where your business is leaking money and build only the systems that stop it. Core Journey R4,000. Advanced supervised digital team R4,500.";
const URL = "https://kasiaihub.com/entrepreneur-ai-journey";

const BRAND = {
  bg: "#000000",
  emerald: "#10B981",
  gold: "#F59E0B",
  text: "#FFFFFF",
  muted: "#9CA3AF",
  border: "rgba(255,255,255,0.08)",
  card: "#0A0A0A",
};

export const Route = createFileRoute("/entrepreneur-ai-journey")({
  head: () => ({
    meta: [
      { title: "Entrepreneur AI Journey: Diagnose, Build, Grow" },
      { name: "description", content: "We find where your business is leaking money and build only the systems that stop it. Core Journey R4,000. Advanced supervised digital team R4,500." },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Page,
});

const coreOutcomes = [
  "Diagnostic and full strategy",
  "Customer Pipeline Starter",
  "Claude Skills tailored to your business",
  "Customer Conversion System — one working priority system based on your diagnostic",
  "Brand identity and practical asset pack",
  "Marketing assistant and 30-day content plan",
  "Pitching and funding assistant based on information you verify",
  "30 days of WhatsApp support included, plus a 1-month AI tool subscription after each session",
];

const advancedOutcomes = [
  "Installed supervised digital team (Pricing, Visibility, Compliance, Finance, Follow-up support + Chief of Staff)",
  "Connected workflows that prepare and coordinate defined work under approval gates",
  "Approval gates and cost monitoring",
  "30 days of WhatsApp support included.",
];

const digitalTeam = [
  {
    name: "AI Pricing Support",
    body: "Replaces pricing set by feeling with pricing built from real costs and what competitors actually charge.",
  },
  {
    name: "AI Visibility Support",
    body: "Keeps your online presence current (website, Google Business, WhatsApp Business) and produces simple daily content.",
  },
  {
    name: "AI Compliance Support",
    body: "Keeps CIPC, tax, invoicing and basic compliance paperwork organised and up to date, so the business is easier to fund and harder to catch out.",
    note: "You always review and approve compliance submissions yourself before anything is filed — this system prepares the work, it does not file on your behalf.",
  },
  {
    name: "AI Finance Support",
    body: "Separates personal and business money, tracks cash flow, and shows you plainly what's actually left.",
    note: "You approve every transfer or reclassification — this system shows you the picture, the decisions stay yours.",
  },
  {
    name: "AI Follow-Up Support",
    body: "Chases every enquiry and quote that hasn't had a reply, until there's a clear yes or a clear no.",
  },
  {
    name: "Coordinator",
    body: "Checks in with you once a day, tells you what each part of the system did, flags anything that needs your decision, and keeps the rest of the team pointed at what actually matters.",
  },
];

const sessionLinks = [
  { label: "Session 1 — Diagnose & Strategise", href: "/sessions/think-and-plan" },
  { label: "Session 2 — Build Your Customer Conversion System", href: "/sessions/build-and-create" },
  { label: "Session 3 — Build Your Market Visibility Engine", href: "/sessions/brand-and-grow" },
] as const;

const h2Style = {
  fontSize: "clamp(26px, 3.4vw, 38px)",
  fontWeight: 800,
  margin: "0 0 20px",
  letterSpacing: "-0.02em",
} as const;

const bodyStyle = {
  color: BRAND.muted,
  fontSize: 17,
  lineHeight: 1.75,
  margin: "0 0 16px",
} as const;

function Page() {
  const [enrolOpen, setEnrolOpen] = useState(false);
  const [preselect, setPreselect] = useState<"s1" | "s2" | "s3" | "all" | null>(null);

  const openEnrol = () => {
    setPreselect("all");
    setEnrolOpen(true);
  };

  return (
    <div
      style={{
        background: BRAND.bg,
        color: BRAND.text,
        fontFamily: "Inter, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          borderBottom: `1px solid ${BRAND.border}`,
          padding: "18px 0",
          position: "sticky",
          top: 0,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <KasiLogo size="sm" />
          </Link>
          <button
            type="button"
            onClick={openEnrol}
            style={{
              background: BRAND.emerald,
              color: "#03110A",
              border: "none",
              padding: "10px 16px",
              fontWeight: 700,
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Enrol
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 20px 80px" }}>
        {/* Hero */}
        <section style={{ marginBottom: 80, textAlign: "center" }}>
          <div
            style={{
              color: BRAND.gold,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: 20,
            }}
          >
            THE ENTREPRENEUR AI JOURNEY
          </div>
          <h1
            style={{
              fontSize: "clamp(34px, 5.4vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.06,
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
            }}
          >
            Build the system your business needs first.
          </h1>
          <p style={{ ...bodyStyle, fontSize: 18, maxWidth: 760, margin: "0 auto 16px" }}>
            Most businesses coming to us are stuck in survival mode — pricing set by feeling,
            no visibility beyond word of mouth, compliance nobody's had time for, personal and
            business money in one account, and WhatsApp chaos eating a 14-hour day.
          </p>
          <p style={{ ...bodyStyle, fontSize: 18, maxWidth: 760, margin: "0 auto 36px" }}>
            We don't start with training. We start with a diagnostic. We find exactly where the
            money is leaking, build only the systems that stop that specific leak, and — for those
            who want to go further — install a supervised digital team that prepares and coordinates
            defined work under approval gates.
          </p>
          <Link
            to="/diagnostic"
            style={{
              display: "inline-block",
              background: BRAND.emerald,
              color: "#03110A",
              padding: "18px 32px",
              fontWeight: 700,
              borderRadius: 12,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            Find out what kind of business you're running →
          </Link>
        </section>

        {/* Core Journey */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={h2Style}>
            The Core Journey — R4,000{" "}
            <span style={{ color: BRAND.gold, fontSize: "0.6em" }}>(save R500 on the bundle)</span>
          </h2>
          <p style={bodyStyle}>
            Up to 8 learners per class. Each session is a standalone one-day class, 9am–3pm, Monday
            to Friday — you don't have to take them back-to-back. You choose your preferred location
            and day, and we group learners by demand. If a confirmed class cannot go ahead
            within two weeks of your confirmed date, we'll offer the next available date or a full
            refund. Every session has 30 days of WhatsApp support included, plus a 1-month AI tool subscription.
          </p>
          <p style={bodyStyle}>
            Sales is the thread running through the journey. Session 1 clarifies the offer and buyer
            and creates the first Customer Pipeline Starter. Session 2 builds the Customer Conversion
            System — the one priority system that captures or converts interest. Session 3 creates the
            Market Visibility Engine — the brand and marketing rhythm that keeps the pipeline moving.
          </p>

          <div style={{ display: "grid", gap: 20 }}>
            {/* Session 1 */}
            <article
              style={{
                background: BRAND.card,
                border: `1px solid ${BRAND.border}`,
                borderRadius: 16,
                padding: 28,
              }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>
                Session 1 — Diagnose &amp; Strategise
              </h3>
              <div style={{ color: BRAND.emerald, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
                Claude + Gemini · R1,500 · No prerequisite
              </div>
              <p style={bodyStyle}>
                We open with a full diagnostic of your business — deeper and more detailed than the
                free version on our website, because this one is done together, in person, with time
                to get it right.
              </p>
              <p style={bodyStyle}>
                It shows you exactly where your business is losing ground: cash, leads, follow-up,
                pricing, or compliance. It shows you which of the three stages your business is
                actually in — growth-ready, stabilising, or in crisis — because what you need next
                depends entirely on which one is true right now.
              </p>
              <p style={bodyStyle}>
                From there, you leave with a real strategy: pricing built from actual costs, a
                compliance roadmap, your business workflow written down for the first time, and a
                clear plan for separating business money from personal money.
              </p>
              <p style={bodyStyle}>
                Every outcome is captured as <strong>Claude Skills tailored to your business</strong>
                {" "}— permanent, and yours to keep.
              </p>
              <p style={bodyStyle}>
                The strategy must reach the market. We define the likely buyer, set simple
                qualification rules, research three starting prospect examples from public
                information, prepare tailored outreach, and map a seven-day follow-up rhythm. These
                are researched starting points, not endorsements or promised customers.
              </p>

              <p style={{ ...bodyStyle, color: BRAND.text, margin: 0 }}>
                <strong>Nothing gets built until this diagnostic is done.</strong> That's deliberate.
                Building before diagnosing is how a business ends up with a beautiful website and the
                same unanswered enquiries it had before.
              </p>
            </article>

            {/* Session 2 */}
            <article
              style={{
                background: BRAND.card,
                border: `1px solid ${BRAND.border}`,
                borderRadius: 16,
                padding: 28,
              }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>
                Session 2 — Build Your Customer Conversion System
              </h3>
              <div style={{ color: BRAND.emerald, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
                Claude + Lovable · R1,500 · Requires Session 1
              </div>
              <p style={bodyStyle}>
                We build your Customer Conversion System — the priority system identified in Session
                1 — not a fixed list, not a template, and not everything at once. Depending on your diagnostic, this may be a
                focused website or landing page, lead-capture form, booking or deposit flow,
                customer-record system, follow-up tracker, or another practical workflow. Claude
                helps define the logic and content; Lovable turns the agreed solution into a working
                digital build.
              </p>
              <p style={{ ...bodyStyle, margin: 0 }}>
                You leave with a working Customer Conversion System built around your real business and
                customer journey, plus a clear handover for using it.
              </p>
            </article>

            {/* Session 3 */}
            <article
              style={{
                background: BRAND.card,
                border: `1px solid ${BRAND.border}`,
                borderRadius: 16,
                padding: 28,
              }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>
                Session 3 — Build Your Market Visibility Engine
              </h3>
              <div style={{ color: BRAND.emerald, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
                ChatGPT + Claude · R1,500 · Requires Sessions 1 and 2
              </div>
              <p style={bodyStyle}>
                Brand identity and a practical asset pack. A marketing assistant grounded in your
                business and buyer. A 30-day content plan linked to real customer questions and
                offers, and a social media routine that fits a 14-hour working day rather than
                assuming you have spare hours for it. Reusable campaign and follow-up templates, and
                a pitching and funding assistant built from information you verify.
              </p>
              <p style={{ ...bodyStyle, margin: 0 }}>
                Content and brand work are tied to the buyer, offer and pipeline created earlier.
                Any pitch or funding material is based on information the learner verifies.
                kasiAIhub does not promise funding, reach or sales. You review every public message,
                proposal and application.
              </p>
            </article>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 24 }}>
            {sessionLinks.map((s) => (
              <Link
                key={s.href}
                to={s.href}
                style={{ color: BRAND.gold, fontSize: 14, fontWeight: 600, textDecoration: "none" }}
              >
                {s.label} →
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <button
              type="button"
              onClick={openEnrol}
              style={{
                background: BRAND.emerald,
                color: "#03110A",
                border: "none",
                padding: "16px 28px",
                fontWeight: 700,
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Enrol in the Core Journey — R4,000
            </button>
            <p style={{ color: BRAND.muted, marginTop: 12, fontSize: 13 }}>
              Sessions are sequential — do all three at once, or one at a time. T&amp;Cs apply.
            </p>
          </div>
        </section>

        {/* Core outcomes */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={h2Style}>What You Leave With (Core Journey)</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {coreOutcomes.map((i) => (
              <li key={i} style={{ display: "flex", gap: 12, fontSize: 16, lineHeight: 1.6 }}>
                <span style={{ color: BRAND.emerald }}>✓</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Session 4 — Advanced */}
        <section
          style={{
            marginBottom: 72,
            border: `1px solid ${BRAND.gold}`,
            borderRadius: 20,
            padding: "32px 24px",
            background: "linear-gradient(180deg, rgba(245,158,11,0.06), rgba(0,0,0,0))",
          }}
        >
          <div
            style={{
              color: BRAND.gold,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: 14,
            }}
          >
            ADVANCED — SEPARATE &amp; OPTIONAL
          </div>
          <h2 style={h2Style}>Session 4: A Supervised Digital Team — R4,500</h2>
          <div style={{ color: BRAND.gold, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
            Grok + Cursor · R4,500 · Optional — recommended after the Core Journey
          </div>
          <p style={{ ...bodyStyle, fontStyle: "italic" }}>
            This is a separate, optional offering. It is not part of the Core Journey and is not
            required to complete it.
          </p>
          <p style={bodyStyle}>
            By the time most entrepreneurs finish the Core Journey, the systems are built and
            running — but someone still has to operate them. Session 4 installs a supervised digital
            team around those systems to prepare and coordinate defined work under approval gates,
            so less of the routine preparation sits on the owner.
          </p>
          <p style={bodyStyle}>
            This session includes access to Grok and Cursor, in addition to the tools used in the
            Core Journey, plus kasiAIhub's setup and support — which is part of why it's priced
            separately.
          </p>
          <p style={bodyStyle}>
            <strong style={{ color: BRAND.text }}>Who this is for:</strong> entrepreneurs who've
            completed the Core Journey and are ready to go further, or anyone confident with
            computers who wants to start here directly. It is not a required next step — the Core
            Journey remains complete and valuable entirely on its own.
          </p>

          <h3 style={{ fontSize: 20, fontWeight: 800, margin: "28px 0 16px" }}>
            What gets installed — a supervised team, tailored to a community business's real
            conditions
          </h3>
          <div style={{ display: "grid", gap: 16 }}>
            {digitalTeam.map((m) => (
              <div
                key={m.name}
                style={{
                  background: BRAND.card,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 8 }}>{m.name}</div>
                <p style={{ ...bodyStyle, margin: 0 }}>{m.body}</p>
                {m.note ? (
                  <p
                    style={{
                      margin: "12px 0 0",
                      color: BRAND.gold,
                      fontSize: 14,
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    {m.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              border: `1px solid ${BRAND.emerald}`,
              borderRadius: 16,
              padding: 24,
              background: "rgba(16,185,129,0.06)",
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 12px" }}>
              You are always in the loop.
            </h3>
            <p style={{ ...bodyStyle, color: BRAND.text, margin: 0 }}>
              Every part of this system works on approval gates — it prepares, recommends and flags;
              you decide. Nothing involving money, a client conversation, or a final decision happens
              without you. This isn't AI running your business. It's AI carrying the parts of the
              work that don't need to be carried by you, so the parts that do — judgement,
              relationships, decisions — get your full attention instead of competing for it.
            </p>
          </div>

          <p style={{ ...bodyStyle, marginTop: 24, marginBottom: 0 }}>
            Built for WhatsApp-first, low-data conditions — the way these businesses
            actually run, not the way a demo assumes they do.
          </p>
        </section>

        {/* Advanced outcomes */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={h2Style}>What You Leave With (Advanced)</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {advancedOutcomes.map((i) => (
              <li key={i} style={{ display: "flex", gap: 12, fontSize: 16, lineHeight: 1.6 }}>
                <span style={{ color: BRAND.gold }}>✓</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Closing */}
        <section
          style={{
            marginTop: 40,
            padding: "60px 24px",
            textAlign: "center",
            background: "linear-gradient(180deg, rgba(16,185,129,0.08), rgba(0,0,0,0))",
            border: `1px solid ${BRAND.border}`,
            borderRadius: 20,
          }}
        >
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            Start with the diagnostic. Build only what it prescribes.
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/diagnostic"
              style={{
                background: BRAND.emerald,
                color: "#03110A",
                padding: "18px 32px",
                fontWeight: 700,
                borderRadius: 12,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              Find out what kind of business you're running →
            </Link>
            <button
              type="button"
              onClick={openEnrol}
              style={{
                background: "transparent",
                color: BRAND.text,
                border: `1px solid ${BRAND.border}`,
                padding: "18px 32px",
                fontWeight: 700,
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Enrol in the Core Journey — R4,000
            </button>
          </div>
          <p style={{ color: BRAND.muted, marginTop: 16, fontSize: 13 }}>T&amp;Cs apply.</p>
        </section>
      </main>

      <footer
        style={{
          borderTop: `1px solid ${BRAND.border}`,
          padding: "32px 20px",
          textAlign: "center",
          color: BRAND.muted,
          fontSize: 14,
        }}
      >
        © {new Date().getFullYear()} kasiAIhub ·{" "}
        <Link to="/" style={{ color: BRAND.emerald, textDecoration: "none" }}>Home</Link>
      </footer>

      <EnrolModal open={enrolOpen} onClose={() => setEnrolOpen(false)} preselectSession={preselect} />
    </div>
  );
}
