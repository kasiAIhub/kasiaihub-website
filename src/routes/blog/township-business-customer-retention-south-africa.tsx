import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/township-business-customer-retention-south-africa";
const TITLE =
  "Customer Retention for Community Businesses in South Africa | kasiAIhub";
const DESCRIPTION =
  "Community customers often disappear without explanation. Here's what the research suggests about why, and simple, realistic ways to build retention without a full CRM system.";
const PUBLISHED = "2026-05-27";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "Is there research proving these retention tactics work for community businesses specifically?",
    a: "Not directly — the evidence base here is thinner than for marketing or compliance. These approaches are a reasonable extension of what's known about trust, communication channels, and customer behaviour in community markets, not a proven formula from a dedicated study.",
  },
  {
    q: "Do I need special software to track customers?",
    a: "Not necessarily. Given how cash-based and time-constrained most community businesses are, a simple running note — even in a notebook or basic phone note — combined with consistent WhatsApp check-ins is often more realistic and sustainable than formal CRM software.",
  },
  {
    q: "How often should I check in with a customer who hasn't returned?",
    a: "There's no research-backed universal answer. A reasonable approach is timing it to how often that customer would naturally need your product or service again — sooner for perishable goods or regular services, longer for occasional purchases.",
  },
];

export const Route = createFileRoute(
  "/blog/township-business-customer-retention-south-africa",
)({
  head: () => ({
    meta: [
      { title: "Customer Retention for Community Businesses | kasiAIhub" },
      { name: "description", content: "Community customers often disappear without explanation. See what the research suggests about why, and simple ways to build retention without a full CRM." },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Why Your Best Customers Keep Disappearing (And How to Actually Keep Them)",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kasiaihub.com/" },
            { "@type": "ListItem", position: 2, name: "Community Business Hub", item: "https://kasiaihub.com/blog/township-business-hub" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Why Your Best Customers Keep Disappearing",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">Customer Retention</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Community Hub · Customer Retention
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Why Your Best Customers Keep Disappearing (And How to Actually Keep Them)
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            You served a customer well. They seemed happy. And then they
            simply stopped coming back — no complaint, no explanation,
            nothing you could act on. If this feels familiar, you're
            describing one of the most common and least understood challenges
            in community business: not attracting customers, but keeping them.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            It's worth being upfront about something before going further:
            the research base specifically on community customer retention in
            South Africa is thinner than the evidence available on marketing,
            compliance, or pricing. What follows draws on the closest
            available research and reasonable inference from it — not
            settled, direct findings. Where the evidence is inferential
            rather than proven, that will be flagged clearly.
          </p>
        </header>

        <Section id="research" title="What the Research Does Show">
          <p>
            Standard Bank's 2025 community economy research offers a useful,
            if broad, observation: South African community SMEs are often more
            traditional and reactive in how they operate, prioritising
            immediate needs over longer-term planning — while stronger-performing
            businesses tend to be more customer-centric in their approach.
          </p>
          <p>
            This distinction matters. A reactive business responds to what's
            directly in front of it — the customer currently being served,
            the order currently being filled. A customer-centric business
            also thinks about the customer who isn't currently there: the
            one who visited last month and hasn't been back, the one who
            might respond to a simple check-in message.
          </p>
          <p>
            Consumer and retail research into community markets more broadly
            consistently points to locality, convenience, familiarity, and
            trusted service as powerful drivers of where people choose to
            spend money. This suggests community customer relationships are
            often built on trust and proximity — which is a strength, but
            one that can quietly erode if it isn't actively maintained.
          </p>
        </Section>

        <Section id="hard-to-track" title="Why This Is Genuinely Hard to Track">
          <p>
            Part of the retention challenge is structural rather than a lack
            of care. Standard Bank's research and Statistics South Africa
            data both show community businesses are predominantly cash-based,
            with limited formal record-keeping. Without a system tracking
            who your customers are, when they last visited, and what they
            bought, "customer X hasn't been back in six weeks" isn't
            something you can notice — it simply happens quietly, in the
            background, until revenue reflects it without an obvious cause.
          </p>
          <p>
            For more on why cash-first operations create these blind spots,
            see{" "}
            <Link
              to="/blog/township-business-financial-management-south-africa"
              className="text-primary hover:underline"
            >
              simple financial systems for cash-based businesses
            </Link>
            .
          </p>
        </Section>

        <Section id="approach" title="A Reasonable, Honest Approach">
          <p>
            Given the limits of direct evidence here, the most defensible
            approach is to work from what's already well-documented elsewhere
            in community business research — particularly the{" "}
            <Link
              to="/blog/township-business-marketing-south-africa"
              className="text-primary hover:underline"
            >
              marketing findings
            </Link>{" "}
            — and apply that same logic to retention specifically.
          </p>
          <p>
            We know WhatsApp is used by 74% of community businesses for
            marketing and communication. This is also, logically, the most
            realistic channel for retention — not a formal CRM system most
            solo entrepreneurs won't have time to maintain, but simple,
            consistent WhatsApp-based habits:
          </p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <strong className="text-foreground">A simple customer note.</strong>{" "}
              Even a basic running note — name, what they bought, roughly
              when — turns invisible customer history into something you can
              actually act on.
            </li>
            <li>
              <strong className="text-foreground">A check-in message after a reasonable gap.</strong>{" "}
              A brief, warm WhatsApp message to a customer who hasn't been
              in for a while — not a hard sell, just genuine contact — is a
              low-cost way to stay present in their mind before they've
              fully moved on.
            </li>
            <li>
              <strong className="text-foreground">Appointment or repeat-order reminders.</strong>{" "}
              For service businesses especially — salons, beauty, catering —
              a simple reminder timed to when a customer would naturally
              need the service again keeps you top of mind at the right
              moment.
            </li>
            <li>
              <strong className="text-foreground">A simple thank-you or follow-up after a larger purchase.</strong>{" "}
              A short message after a catering event or a significant
              purchase signals that the relationship mattered beyond the
              transaction itself.
            </li>
          </ul>
        </Section>

        <Section id="plausible" title="This Is a Plausible Application, Not a Proven One">
          <p>
            To be clear: there isn't a specific South African study proving
            these exact tactics work for community businesses. What exists is
            strong evidence that trust, familiarity, and consistent presence
            matter in these markets, combined with clear evidence of which
            communication channel community businesses already use daily.
            Building simple retention habits on top of an existing, trusted
            channel is a reasonable, low-risk approach — not a guaranteed
            formula backed by direct research.
          </p>
        </Section>

        <Section id="ai" title="Where AI Fits, Realistically">
          <p>
            AI's role here is mostly about removing friction from habits
            that are simple in concept but easy to abandon in practice.
            Drafting a warm, non-pushy check-in message takes thought and
            time when done from scratch repeatedly — having a tool generate
            several natural-sounding options removes that friction.
            Similarly, converting a rough customer note into a simple,
            searchable log — without needing to learn a formal CRM system —
            makes an otherwise abandoned habit more sustainable.
          </p>
        </Section>

        <Section id="kasiaihub" title="How kasiAIhub Approaches This">
          <p>
            kasiAIhub's{" "}
            <Link to="/sessions/think-and-plan" className="text-primary hover:underline">
              Think &amp; Plan
            </Link>{" "}
            and{" "}
            <Link to="/sessions/build-and-create" className="text-primary hover:underline">
              Build &amp; Create
            </Link>{" "}
            sessions work together on this: Session 1 identifies where
            customer follow-up matters most for a specific business, and
            Session 2 builds a simple, working system — often WhatsApp-based —
            that makes consistent follow-up realistic rather than one more
            thing an already-stretched entrepreneur has to remember manually.{" "}
            <Link to="/sessions/brand-and-grow" className="text-primary hover:underline">
              Brand &amp; Grow
            </Link>{" "}
            then wires it into the ongoing content plan.
          </p>
          <p>
            This piece sits inside the broader{" "}
            <Link
              to="/blog/ai-adoption-township-entrepreneurs-south-africa-2026"
              className="text-primary hover:underline"
            >
              State of AI Adoption Among Community Entrepreneurs (2026)
            </Link>{" "}
            hub.
          </p>
          <p>
            <Link
              to="/entrepreneur-ai-journey"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              See the full 3-session programme →
            </Link>
          </p>
        </Section>

        <Section id="faq" title="Frequently asked questions">
          <div className="space-y-6">
            {faq.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
                <p className="mt-2">{f.a}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="sources" title="Sources">
          <p className="text-sm">
            Standard Bank Community and Informal Economy Report (2025);
            Statistics South Africa Survey of Employers and the Self-Employed
            (2023). Note: this article extends findings from adjacent
            research areas where direct township-specific customer retention
            research is limited.
          </p>
        </Section>
              <TownshipStudyInvite />
      </article>
    </main>
  );
}
