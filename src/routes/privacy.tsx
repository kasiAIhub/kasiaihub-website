import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "How we handle your data | kasiAIhub" },
      {
        name: "description",
        content:
          "A plain-language note on what kasiAIhub collects, why we collect it, and how we look after it. Never sold, never shared.",
      },
      { property: "og:title", content: "How we handle your data | kasiAIhub" },
      {
        property: "og:description",
        content:
          "What kasiAIhub collects, why, and how we look after it. Plain language, no legal maze.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main style={{ background: "#0A0A0A", color: "#F5F5F0", minHeight: "100vh", padding: "64px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Link to="/" style={{ color: "#9CA3AF", fontSize: 14, textDecoration: "none" }}>
          ← Home
        </Link>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, margin: "20px 0 8px", letterSpacing: "-0.02em" }}>
          How we handle your data
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: 17, lineHeight: 1.7 }}>
          Short and plain. This is not a legal maze.
        </p>

        <Section title="What we collect">
          <p>Only what you give us:</p>
          <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Your name and business name</li>
            <li>Your email address and/or WhatsApp number</li>
            <li>Your answers to the business diagnostic</li>
            <li>Your enrolment details and status, if you enrol</li>
          </ul>
        </Section>

        <Section title="Why we collect it">
          <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li>To build and show you your diagnostic report</li>
            <li>To save that report so you can open it again later</li>
            <li>To email you a copy of your report if you gave us an email address</li>
            <li>To track your enrolment and confirm your training date</li>
          </ul>
        </Section>

        <Section title="Who sees it">
          <p>
            Only Tsholo and the kasiAIhub team. We never sell your information and we never
            share it with third parties for marketing.
          </p>
        </Section>

        <Section title="Your account">
          <p>
            Creating an account is optional. If you sign in with Google or an email link, we
            link the report you just completed to that account so you can find it again. We
            do not go back and link older records.
          </p>
        </Section>

        <Section title="Removing your data">
          <p>
            Ask us and we'll delete it. Email{" "}
            <a href="mailto:kasihubai@gmail.com" style={{ color: "#00C896" }}>
              kasihubai@gmail.com
            </a>{" "}
            and we'll remove your submissions and account.
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 36 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>{title}</h2>
      <div style={{ color: "#C7C7C2", fontSize: 16, lineHeight: 1.75 }}>{children}</div>
    </section>
  );
}
