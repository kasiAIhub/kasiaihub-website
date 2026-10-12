import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/township-business-financial-management-south-africa";
const TITLE =
  "Financial Management for Cash-Based Community Businesses in South Africa | kasiAIhub";
const DESCRIPTION =
  "74% of South African community businesses have no business bank account. Here's what the research shows about cash-based financial management, and simple systems that actually work.";
const PUBLISHED = "2026-05-20";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "Do I really need a separate business bank account?",
    a: "It's strongly connected to funding access — most formal funding and credit channels require it as proof of business income. Beyond that, it also makes it significantly easier to see your true business profit separate from personal spending.",
  },
  {
    q: "I don't have time for daily bookkeeping. What's the minimum I should track?",
    a: "At minimum, a daily total of what came in and a running note of major expenses gives you far more visibility than nothing. Consistency matters more than complexity — a simple habit maintained daily beats an elaborate system abandoned after a week.",
  },
  {
    q: "Is it true that most community businesses don't use banks at all?",
    a: "Not entirely — many community entrepreneurs do have personal bank accounts and use them for business transactions. The specific gap is a dedicated business account, which matters for funding access and financial clarity even if personal banking exists.",
  },
];

export const Route = createFileRoute(
  "/blog/township-business-financial-management-south-africa",
)({
  head: () => ({
    meta: [
      { title: "Money Management for Cash-Based Community Businesses" },
      { name: "description", content: "74% of South African community businesses have no business bank account. See what the research shows about cash-based finances, and simple systems that work." },
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
            "Getting Out of Your Own Head: Simple Financial Systems for Cash-Based Businesses",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          about: "Community business financial management South Africa",
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
              name: "Getting Out of Your Own Head: Simple Financial Systems for Cash-Based Businesses",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: TownshipFinancialManagement,
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

function TownshipFinancialManagement() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">Community Financial Management</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Community Hub · Financial Management
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Getting Out of Your Own Head: Simple Financial Systems for
            Cash-Based Businesses
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            If your business finances live in your head, a notebook, and a
            stack of till slips rather than a proper accounting system,
            you're managing money the way the overwhelming majority of South
            African community businesses do. This isn't a personal failing —
            it's the documented norm, and understanding why helps clarify
            what kind of financial system can actually work.
          </p>
        </header>

        <Section id="numbers" title="The Numbers Behind Cash-Based Business">
          <p>
            Statistics South Africa's 2023 Survey of Employers and the
            Self-Employed found that 74.4% of non-VAT-registered businesses
            had no business bank account at all. There's a genuine
            improvement worth noting here — that figure was 84.1% in 2017,
            meaning the trend is moving in the right direction. But it still
            means roughly three in four informal businesses are operating
            without the basic financial infrastructure most funding, credit,
            and formal business support assumes exists.
          </p>
          <p>
            Standard Bank's community research adds further detail: the vast
            majority of community businesses manage their finances manually,
            and businesses are predominantly self-funded, often using
            personal bank accounts for business transactions rather than
            maintaining separation between the two.
          </p>
        </Section>

        <Section id="why-matters" title="Why This Matters Beyond Just &quot;Being Organised&quot;">
          <p>
            The consequences of unstructured, cash-heavy financial management
            go beyond simple inconvenience. Without a business account and
            consistent records, it becomes genuinely difficult to demonstrate
            income and cash flow to a funder or bank — which directly
            connects to the{" "}
            <Link
              to="/blog/township-business-funding-applications-south-africa"
              className="text-primary hover:underline"
            >
              funding access challenges
            </Link>{" "}
            many community entrepreneurs face. Statistics South Africa's data
            on business start-up funding shows that 81.2% of community
            business owners who used their own money to start their business
            relied on personal resources — meaning most businesses begin with
            no external financial validation at all, and often continue that
            way indefinitely without a deliberate change.
          </p>
          <p>
            There's also a day-to-day cost. Without visibility into actual
            profit versus revenue, it's easy to feel busy and stressed while
            not actually knowing whether the business is genuinely profitable
            — a pattern commonly observed among cash-based, informally-managed
            businesses. It's also the foundation any real{" "}
            <Link
              to="/blog/township-business-pricing-strategy-south-africa"
              className="text-primary hover:underline"
            >
              pricing strategy
            </Link>{" "}
            depends on.
          </p>
        </Section>

        <Section id="dont-fit" title="Why Formal Systems Often Don't Fit">
          <p>
            It's worth acknowledging honestly why many community entrepreneurs
            haven't adopted formal bookkeeping or accounting software: most
            of these tools are built assuming a level of structure — regular
            banking, digital transactions, dedicated admin time — that
            doesn't match the reality of a cash-heavy, solo-operated
            business. The mismatch isn't a lack of willingness to be
            organised; it's that the available tools weren't designed for
            this specific operating reality.
          </p>
        </Section>

        <Section id="realistic" title="What a Realistic Financial System Actually Looks Like">
          <p>
            Given this context, the most practical starting point isn't a
            full accounting system — it's a small number of consistent
            habits, supported by tools that fit how the business actually
            runs:
          </p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <strong className="text-foreground">Daily sales logging.</strong>{" "}
              A simple, fast way to record what came in each day — even a
              basic voice note or photo of your till slip converted into a
              running log — beats no record at all, and is far more
              sustainable than a spreadsheet most cash-based entrepreneurs
              won't maintain consistently.
            </li>
            <li>
              <strong className="text-foreground">Expense tracking from receipts or photos.</strong>{" "}
              Rather than manually entering every expense, photographing
              receipts and having them categorised automatically removes the
              single biggest friction point in staying on top of costs.
            </li>
            <li>
              <strong className="text-foreground">Plain-language profit summaries.</strong>{" "}
              Rather than raw numbers that require interpretation, a weekly
              summary that simply states "you brought in X, spent Y, and
              kept Z" translates data into something immediately useful for
              decision-making.
            </li>
            <li>
              <strong className="text-foreground">A basic path toward a business account.</strong>{" "}
              Given the direct link between having a business account and
              accessing funding, even a simple, guided explanation of what's
              required to open one — and why it matters specifically for
              future funding applications — can be a meaningful first step.
            </li>
          </ul>
        </Section>

        <Section id="ai-fits" title="How AI Fits Into This">
          <p>
            This is a case where AI's real value is less about sophisticated
            forecasting, and more about lowering the friction of basic
            financial structure. Describing your day's sales and expenses in
            plain language — the way you'd naturally explain it to someone —
            and having that converted into a simple running record removes
            the barrier of needing to learn a formal bookkeeping system
            before you can start tracking anything at all.
          </p>
          <p>
            For a broader view of where practical AI actually sits for
            community businesses today, see our{" "}
            <Link
              to="/blog/ai-adoption-township-entrepreneurs-south-africa-2026"
              className="text-primary hover:underline"
            >
              full research summary on AI adoption among community
              entrepreneurs
            </Link>
            .
          </p>
        </Section>

        <Section id="kasiaihub" title="How kasiAIhub Approaches This">
          <p>
            kasiAIhub's{" "}
            <Link to="/sessions/think-and-plan" className="text-primary hover:underline">
              Session 1 — Think & Plan
            </Link>{" "}
            includes building a simple financial tracking approach specific
            to each entrepreneur's business — starting from wherever they
            currently are, whether that's a notebook, memory, or nothing
            formal at all. The goal is a realistic, sustainable system that
            produces genuine visibility into profit and cash flow, not an
            accounting framework the entrepreneur won't actually keep using
            after the session ends.
          </p>
          <p>
            The tracking system built in Session 1 gets connected to a
            working business app in{" "}
            <Link to="/sessions/build-and-create" className="text-primary hover:underline">
              Session 2: Build & Create
            </Link>
            , and to a professional brand and marketing plan in{" "}
            <Link to="/sessions/brand-and-grow" className="text-primary hover:underline">
              Session 3: Brand & Grow
            </Link>
            . See the full{" "}
            <Link to="/entrepreneur-ai-journey" className="text-primary hover:underline">
              Entrepreneur AI Journey
            </Link>{" "}
            for how the three sessions build on each other.
          </p>
          <p>
            <Link
              to="/sessions/think-and-plan"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              See how financial systems get built in Session 1 →
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
            Statistics South Africa Survey of Employers and the Self-Employed
            (2023); Standard Bank Community and Informal Economy Report
            (2025).
          </p>
        </Section>
              <TownshipStudyInvite />
      </article>
    </main>
  );
}
