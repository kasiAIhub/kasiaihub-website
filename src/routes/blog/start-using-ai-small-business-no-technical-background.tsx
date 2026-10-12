import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL =
  "https://kasiaihub.com/blog/start-using-ai-small-business-no-technical-background";
const TITLE =
  "How to Start Using AI in Your Small Business (No Tech Background Needed) | kasiAIhub";
const DESCRIPTION =
  "You don't need to code or understand tech to use AI in your business. Here's exactly how a South African entrepreneur with zero technical background gets started.";
const PUBLISHED = "2026-03-11";
const UPDATED = "2026-08-06";
const H1 =
  "How to Start Using AI in a Small Business With No Technical Background in South Africa";

const faq = [
  {
    q: "I've never used any AI tool. Can I still start?",
    a: "Yes. All the tools mentioned are designed for plain-language use. Zero prior experience is required to begin.",
  },
  {
    q: "How long before I see a real result?",
    a: "With a specific, well-described problem, useful results are often immediate — within the same conversation. Building a complete working system, like a website or booking tool, typically takes a single focused session.",
  },
  {
    q: "Do I need to buy expensive software to start?",
    a: "No. Claude, Gemini and ChatGPT all have free tiers sufficient for getting started. Paid subscriptions (roughly R400/month each) unlock more capacity once you're using them regularly.",
  },
];

export const Route = createFileRoute(
  "/blog/start-using-ai-small-business-no-technical-background",
)({
  head: () => ({
    meta: [
      { title: "Start Using AI in Your Small Business, No Tech Needed" },
      { name: "description", content: "You don't need to code or understand tech to use AI in your business. Here is how a South African entrepreneur with no technical background gets started." },
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
          headline: H1,
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
            { "@type": "ListItem", position: 2, name: "AI Basics", item: "https://kasiaihub.com/blog/ai-basics" },
            { "@type": "ListItem", position: 3, name: H1, item: CANONICAL },
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
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog/ai-basics" className="hover:text-foreground">AI Basics</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Start Using AI (No Tech Background)</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">Guide · Getting Started</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">{H1}</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Most South African entrepreneurs who avoid AI aren't avoiding it because they don't see
            the value. They're avoiding it because every explanation assumes a level of technical
            comfort they don't have — and don't need.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            This is the guide for the entrepreneur who has never written a line of code, doesn't
            fully understand what "prompting" means, and just wants to know: where do I actually
            start?
          </p>
        </header>

        <Section id="why-guides-fail" title="Why Most AI Guides Fail Non-Technical Entrepreneurs">
          <p>
            Most AI content is written by and for technically comfortable people. It assumes you
            already understand APIs, integrations, or at minimum, feel confident exploring a new
            app on your own. For an entrepreneur running a business day to day with no technical
            background, this creates a wall before the guide even gets to anything useful.
          </p>
          <p>
            The good news: the tools that matter most for a small business — Claude, ChatGPT,
            Gemini, and app builders like Lovable — are specifically designed to be used through
            plain conversation. You don't need technical skill. You need a starting point and a
            specific problem to solve.
          </p>
        </Section>

        <Section id="step-1" title="Step 1: Start With a Problem, Not a Tool">
          <p>
            The biggest mistake non-technical entrepreneurs make is opening an AI tool and typing
            something vague like "help me with my business." This produces a vague, unhelpful
            answer, and the entrepreneur concludes AI "doesn't work for them."
          </p>
          <p>
            Instead, start with your most specific, most immediate problem. Not "help my business"
            — but "I don't know how much profit I make on each product I sell" or "I keep
            forgetting to follow up with customers."
          </p>
        </Section>

        <Section id="step-2" title="Step 2: Give the Tool Real Information">
          <p>
            AI tools produce genuinely useful answers only when given real, specific context. Your
            actual costs. Your actual prices. Your actual customer numbers. The more real detail
            you provide, the more useful and accurate the response.
          </p>
          <p>
            This is the step most non-technical users skip — not because it's hard, but because
            nobody told them it mattered. A vague question gets a vague answer. A specific
            question, with real numbers, gets a specific, usable answer.
          </p>
        </Section>

        <Section id="step-3" title="Step 3: Treat the First Answer as a Draft, Not a Final Decision">
          <p>
            AI tools are extremely good starting points and consistently imperfect final
            authorities. The output from Claude on your pricing strategy is a strong first draft —
            not a decision to implement blindly. You remain the expert on your own business. The
            tool accelerates your thinking; it doesn't replace your judgment.
          </p>
        </Section>

        <Section id="step-4" title="Step 4: Build One Small System Before Trying to Build Everything">
          <p>
            Non-technical entrepreneurs often try to overhaul their entire business with AI at
            once, get overwhelmed, and stop. The better approach: pick one specific, painful
            problem — late customer payments, inconsistent social media, unclear pricing — and
            build one working solution to that single problem first.
          </p>
          <p>
            Once you've experienced one AI-built system actually working, the next one becomes far
            less intimidating.
          </p>
        </Section>

        <Section id="which-tool" title="Which Tool for Which Problem">
          <ul className="ml-6 list-disc space-y-3">
            <li><strong className="text-foreground">Business strategy, pricing, planning:</strong> Claude. Describe your situation in plain language; it responds the same way.</li>
            <li><strong className="text-foreground">Market research and competitors:</strong> Gemini. Connected to real-time search and can pull current information.</li>
            <li><strong className="text-foreground">Marketing content, product images, social posts:</strong> ChatGPT. Describe what you want to see; it generates it.</li>
            <li><strong className="text-foreground">Building a real working tool — booking system, website:</strong> Lovable. Describe the tool you need in plain language; it builds it.</li>
          </ul>
        </Section>

        <Section id="why-alone" title="Why Doing This Alone Is Harder Than It Needs to Be">
          <p>
            Technically, nothing stops a non-technical entrepreneur from opening these tools today
            and starting. In practice, most people who try alone hit the same wall: they don't know
            what to ask, they don't know if the answer is good, and they give up after one or two
            attempts.
          </p>
          <p>
            This is the exact gap hands-on, guided training closes — not by teaching technical
            skills, but by applying these tools to your real business, with someone experienced in
            the room who knows what a good result looks like and can help you get there faster
            than trial and error alone.
          </p>
        </Section>

        <Section id="kasiaihub" title="How kasiAIhub Approaches This">
          <p>
            kasiAIhub was built specifically for entrepreneurs with no technical background. The
            3-session programme applies Claude, Gemini, Lovable and ChatGPT directly to your
            business — not abstract examples — with hands-on guidance throughout.
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <Link to="/sessions/think-and-plan" className="text-primary hover:underline">Session 1: Think & Plan</Link> — Claude + Gemini for business strategy.
            </li>
            <li>
              <Link to="/sessions/build-and-create" className="text-primary hover:underline">Session 2: Build & Create</Link> — Claude + Lovable to build a real working tool.
            </li>
            <li>
              <Link to="/sessions/brand-and-grow" className="text-primary hover:underline">Session 3: Brand & Grow</Link> — Claude + ChatGPT for marketing.
            </li>
          </ul>
          <p>No coding. No prior AI experience required.</p>
          <p>
            <Link
              to="/entrepreneur-ai-journey"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              See how the full programme works →
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
      </article>
    </main>
  );
}
