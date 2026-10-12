import { useState, type ReactNode } from "react";
import { KasiLogo } from "@/components/KasiLogo";
import { Link } from "@tanstack/react-router";
import { EnrolModal } from "@/components/EnrolModal";

const BRAND = {
  bg: "#000000",
  emerald: "#10B981",
  gold: "#F59E0B",
  text: "#FFFFFF",
  muted: "#9CA3AF",
  border: "rgba(255,255,255,0.08)",
  card: "#0A0A0A",
};

export type SessionBuildItem = { title: string; description: string };
export type FaqItem = { q: string; a: string };

export type SessionPageProps = {
  eyebrow: string;
  prerequisiteLine?: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  preselectSession: "s1" | "s2" | "s3" | "all";
  problemHeadline: string;
  problemBody: ReactNode;
  poweredBy: string;
  frameworkBlock?: ReactNode;
  buildItems: SessionBuildItem[];
  buildItemsHeading?: string;
  duration: string[];
  walkAway: string;
  priceHeadline: string;
  priceIncludes: string[];
  bundleLine: string;
  faq: FaqItem[];
  closingHeadline: string;
  faqSchemaId: string;
};

export function SessionPage(props: SessionPageProps) {
  const [enrolOpen, setEnrolOpen] = useState(false);
  const [preselect, setPreselect] =
    useState<"s1" | "s2" | "s3" | "all" | null>(null);

  const openEnrol = () => {
    setPreselect(props.preselectSession);
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
      {/* Top bar */}
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
            maxWidth: 1080,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Link
            to="/"
            style={{ textDecoration: "none" }}
          >
            <KasiLogo size="sm" />
          </Link>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Link
              to="/"
              style={{ color: BRAND.muted, textDecoration: "none", fontSize: 14 }}
            >
              ← All sessions
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
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "60px 20px 80px" }}>
        {/* HERO */}
        <section style={{ textAlign: "center", marginBottom: 80 }}>
          <div
            style={{
              color: BRAND.gold,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: 20,
            }}
          >
            {props.eyebrow}
          </div>
          {props.prerequisiteLine ? (
            <div
              style={{
                color: BRAND.muted,
                fontSize: 12,
                letterSpacing: "0.15em",
                marginBottom: 24,
                textTransform: "uppercase",
              }}
            >
              {props.prerequisiteLine}
            </div>
          ) : null}
          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
            }}
          >
            {props.headline}
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.8vw, 20px)",
              color: BRAND.muted,
              maxWidth: 720,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            {props.subheadline}
          </p>
          <button
            type="button"
            onClick={openEnrol}
            style={{
              background: BRAND.emerald,
              color: "#03110A",
              border: "none",
              padding: "18px 32px",
              fontWeight: 700,
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            {props.ctaLabel}
          </button>
          <div style={{ marginTop: 20 }}>
            <Link
              to="/diagnostic"
              style={{
                color: BRAND.gold,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                borderBottom: `1px dashed ${BRAND.gold}`,
                paddingBottom: 2,
              }}
            >
              Not sure where you're starting from? Find out what kind of business you're really running →
            </Link>
          </div>
        </section>

        {/* PROBLEM */}
        <Section>
          <SectionHeadline>{props.problemHeadline}</SectionHeadline>
          <div style={{ color: BRAND.muted, fontSize: 18, lineHeight: 1.7 }}>
            {props.problemBody}
          </div>
        </Section>

        {/* WHAT HAPPENS */}
        <Section>
          <Eyebrow>What Happens In The Room</Eyebrow>
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              border: `1px solid ${BRAND.emerald}`,
              borderRadius: 999,
              color: BRAND.emerald,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Powered by {props.poweredBy}
          </div>
          {props.frameworkBlock}
        </Section>

        {/* WHAT YOU BUILD */}
        <Section>
          <SectionHeadline>
            {props.buildItemsHeading || "What You Build"}
          </SectionHeadline>
          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              marginTop: 16,
            }}
          >
            {props.buildItems.map((item) => (
              <div
                key={item.title}
                style={{
                  background: BRAND.card,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 14,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    color: BRAND.emerald,
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 8,
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.title}
                </div>
                <p style={{ color: BRAND.muted, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* DURATION */}
        <Section>
          <Eyebrow>Duration & Format</Eyebrow>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            {props.duration.map((d) => (
              <li key={d} style={{ color: BRAND.text, fontSize: 17 }}>
                <span style={{ color: BRAND.gold, marginRight: 10 }}>◆</span>
                {d}
              </li>
            ))}
          </ul>
        </Section>

        {/* WALK AWAY */}
        <Section>
          <Eyebrow>What You Walk Away With</Eyebrow>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: BRAND.text, margin: 0 }}>
            {props.walkAway}
          </p>
        </Section>

        {/* PRICING */}
        <Section>
          <SectionHeadline>{props.priceHeadline}</SectionHeadline>
          <div
            style={{
              background: BRAND.card,
              border: `1px solid ${BRAND.border}`,
              borderRadius: 16,
              padding: 32,
              marginTop: 16,
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {props.priceIncludes.map((i) => (
                <li
                  key={i}
                  style={{
                    color: BRAND.text,
                    fontSize: 16,
                    lineHeight: 1.5,
                    display: "flex",
                    gap: 12,
                  }}
                >
                  <span style={{ color: BRAND.emerald }}>✓</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: 24,
                paddingTop: 24,
                borderTop: `1px solid ${BRAND.border}`,
                color: BRAND.gold,
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              {props.bundleLine}
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionHeadline>Frequently Asked Questions</SectionHeadline>
          <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
            {props.faq.map((f) => (
              <details
                key={f.q}
                style={{
                  background: BRAND.card,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 12,
                  padding: "18px 22px",
                }}
              >
                <summary
                  style={{
                    color: BRAND.text,
                    fontWeight: 600,
                    fontSize: 17,
                    cursor: "pointer",
                    listStyle: "none",
                  }}
                >
                  {f.q}
                </summary>
                <p style={{ color: BRAND.muted, marginTop: 12, lineHeight: 1.6 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* CLOSING CTA */}
        <section
          style={{
            marginTop: 80,
            padding: "60px 24px",
            textAlign: "center",
            background: "linear-gradient(180deg, rgba(16,185,129,0.08), rgba(0,0,0,0))",
            border: `1px solid ${BRAND.border}`,
            borderRadius: 20,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              margin: "0 0 28px",
              letterSpacing: "-0.02em",
            }}
          >
            {props.closingHeadline}
          </h2>
          <button
            type="button"
            onClick={openEnrol}
            style={{
              background: BRAND.emerald,
              color: "#03110A",
              border: "none",
              padding: "18px 32px",
              fontWeight: 700,
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            {props.ctaLabel}
          </button>
        </section>
      </main>



      <EnrolModal
        open={enrolOpen}
        onClose={() => setEnrolOpen(false)}
        preselectSession={preselect}
      />
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section style={{ marginBottom: 72 }}>{children}</section>;
}

function SectionHeadline({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "clamp(26px, 3.4vw, 38px)",
        fontWeight: 800,
        margin: "0 0 20px",
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
      }}
    >
      {children}
    </h2>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        color: BRAND.gold,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.2em",
        marginBottom: 16,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

export function buildFaqSchema(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
