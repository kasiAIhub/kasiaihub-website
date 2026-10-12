import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://kasiaihub.com/blog/ai-course-south-africa";
const TITLE = "AI Course South Africa: How Entrepreneurs Are Learning AI in 2026";
const DESCRIPTION =
  "Looking for an AI course in South Africa? Compare formats, costs and outcomes — and see how South African entrepreneurs learn Claude, ChatGPT, Gemini and Lovable in a practical 3-day journey.";
const PUBLISHED = "2026-02-25";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "What is the best AI course in South Africa for entrepreneurs?",
    a: "The best AI course for a South African entrepreneur is the one that produces a working business system — not just a certificate. That means hands-on training with tools you'll actually use (Claude, ChatGPT, Gemini, Lovable), taught in small cohorts, and matched to your real business. Long theoretical courses tend to leave entrepreneurs with knowledge but no working system.",
  },
  {
    q: "How much does an AI course cost in South Africa?",
    a: "AI courses in South Africa range from free (short YouTube-style modules) to R30,000+ for university certificates. Practical, hands-on programmes for entrepreneurs typically sit between R1,500 and R6,000, depending on cohort size, duration, and whether tool subscriptions are included. kasiAIhub's Entrepreneur AI Journey is R1,500 per session or R4,000 for the full 3-session bundle.",
  },
  {
    q: "Do I need a matric or degree to do an AI course?",
    a: "No. Practical AI courses for entrepreneurs don't require matric, a degree or a tech background. What you need is your real business, a laptop, a Gmail account, and a willingness to build during the session — not just take notes.",
  },
  {
    q: "How long does it take to learn AI for business?",
    a: "You can learn the core tools (Claude, ChatGPT, Gemini, Lovable) well enough to run a small business in about 3 focused days — one for strategy, one for building, one for branding and marketing. Mastery comes from using them daily on your own business afterward.",
  },
  {
    q: "Which AI tools should a South African small business learn first?",
    a: "Start with Claude (your business brain and writing assistant), Gemini (free research), ChatGPT (visual and content generation), and Lovable (build websites and apps by conversation). Together they cover strategy, marketing, systems and branding — which is exactly what a small business needs.",
  },
];

export const Route = createFileRoute("/blog/ai-course-south-africa")({
  head: () => ({
    meta: [
      { title: "AI Course South Africa: How Entrepreneurs Learn AI" },
      { name: "description", content: "Looking for an AI course in South Africa? Compare formats, costs and outcomes, and see how entrepreneurs learn AI in a practical 3-day journey." },
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
          headline: TITLE,
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          about: "AI course South Africa",
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
            { "@type": "ListItem", position: 3, name: TITLE, item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: AiCourseSouthAfrica,
});

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function AiCourseSouthAfrica() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog/ai-basics" className="hover:text-foreground">AI Basics</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">AI Course South Africa</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Guide · AI Course South Africa
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            AI Course South Africa: How Entrepreneurs Are Learning AI in 2026
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            The AI course market in South Africa has exploded — free YouTube playlists,
            R30,000 university certificates, short bootcamps, and everything in between.
            This guide cuts through the noise and shows what a working AI course for a
            South African entrepreneur actually looks like in 2026 — and what to skip.
          </p>
        </header>

        <Section id="who-this-is-for" title="Who this guide is for">
          <p>
            You already run a business — a spaza, a salon, an ECD, a consultancy, a food
            business, a service company — and you keep hearing that AI could help. You've
            tried ChatGPT once or twice. You've seen the LinkedIn posts. Now you want
            actual training that leads to something real in your business, not another
            certificate for the wall.
          </p>
          <p>
            If that's you, this guide compares the AI course options available in South
            Africa today and shows you what to look for.
          </p>
        </Section>

        <Section id="types" title="The 4 types of AI course you'll find in South Africa">
          <p>
            Most AI courses in South Africa fall into one of four buckets. Each is designed
            for a different outcome — pick based on what you actually need.
          </p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <strong className="text-foreground">Free introductory courses</strong> — short
              modules on YouTube, LinkedIn Learning free tier, or Google's AI Essentials.
              Great to see if AI is for you. Won't take you far on their own.
            </li>
            <li>
              <strong className="text-foreground">University and college certificates</strong> —
              Wits, UCT, UNISA and others run AI-related certificates (usually R15,000 to
              R30,000+). Strong theory. Slower to translate into a working business tool.
            </li>
            <li>
              <strong className="text-foreground">Developer bootcamps</strong> — code-heavy
              programmes for people who want to build AI applications. Not the right fit if
              you're a non-technical business owner.
            </li>
            <li>
              <strong className="text-foreground">Entrepreneur-focused practical courses</strong> —
              short, hands-on cohorts that teach you to use existing AI tools (Claude,
              ChatGPT, Gemini, Lovable) to run and grow your business. This is where
              kasiAIhub sits.
            </li>
          </ul>
        </Section>

        <Section id="what-to-look-for" title="What to look for in an AI course as an entrepreneur">
          <p>
            Before you enrol in any AI course in South Africa, check for the following.
            These are the things that separate a course that builds your business from a
            course that just fills your notebook.
          </p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <strong className="text-foreground">You build something real during the session.</strong>{" "}
              Not homework. Not a demo. An actual asset you leave with.
            </li>
            <li>
              <strong className="text-foreground">The tools are current.</strong> Claude,
              ChatGPT, Gemini and Lovable are the practical stack in 2026. Courses still
              teaching only prompt engineering theory from 2023 are out of date.
            </li>
            <li>
              <strong className="text-foreground">The cohort is small.</strong> AI training
              works best with personalised attention — up to 8 learners per class, not 100 in a
              webinar.
            </li>
            <li>
              <strong className="text-foreground">Your own business is the case study.</strong>{" "}
              You want a course where your real numbers, real customers and real problems
              are what get worked on — not a generic scenario.
            </li>
            <li>
              <strong className="text-foreground">There's post-course support.</strong> The
              first 30 days after training is when most entrepreneurs get stuck. Look for
              WhatsApp or community support included.
            </li>
          </ul>
        </Section>

        <Section id="tools" title="The AI tools every South African entrepreneur should learn">
          <p>
            Four tools cover 90% of what a small business actually needs. A good AI course
            in South Africa will teach you all four together, because they work best as a
            system — not in isolation.
          </p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <strong className="text-foreground">Claude</strong> — your business brain.
              Strategy, planning, writing, research briefs, compliance research.
            </li>
            <li>
              <strong className="text-foreground">Gemini</strong> — free deep research.
              Competitor analysis, market data, industry trends.
            </li>
            <li>
              <strong className="text-foreground">ChatGPT</strong> — content and images.
              Product photos, social media assets, marketing copy.
            </li>
            <li>
              <strong className="text-foreground">Lovable</strong> — build without code.
              Websites, booking systems, forms, dashboards — described in conversation.
            </li>
          </ul>
        </Section>

        <Section id="kasiaihub" title="The kasiAIhub Entrepreneur AI Journey">
          <p>
            kasiAIhub runs a practical 3-session AI course in South Africa built
            specifically for entrepreneurs. It's structured as a journey — each session
            builds on the previous one — so what you strategise in Session 1 gets built in
            Session 2 and branded in Session 3.
          </p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <Link to="/sessions/think-and-plan" className="text-primary hover:underline">
                Session 1: Think & Plan
              </Link>{" "}
              — Claude + Gemini. Build your Customer Pipeline Starter — sales-first business strategy, pricing, compliance and workflow. R1,500.
            </li>
            <li>
              <Link to="/sessions/build-and-create" className="text-primary hover:underline">
                Session 2: Build & Create
              </Link>{" "}
              — Claude + Lovable. Build your Customer Conversion System — a working website or app around your business.
              R1,500.
            </li>
            <li>
              <Link to="/sessions/brand-and-grow" className="text-primary hover:underline">
                Session 3: Brand & Grow
              </Link>{" "}
              — Claude + ChatGPT. Build your Market Visibility Engine — brand your app, generate a 30-day content plan, draft a
              funding proposal. R1,500.
            </li>
            <li>
              <strong className="text-foreground">Session 4 (optional): A Supervised Digital Team</strong> — Grok + Cursor. Set
              up AI agents that work for your business under your supervision, with approval gates for money, clients and
              compliance. R4,500.
            </li>
            <li>
              <Link to="/entrepreneur-ai-journey" className="text-primary hover:underline">
                Full Programme Bundle
              </Link>{" "}
              — all 3 sessions for R4,000 (save R500). Recommended.
            </li>
          </ul>
          <p>
            All sessions run with up to 8 learners per class, have 30 days of WhatsApp support
            included, and require no technical background.
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

        <Section id="next" title="Next steps">
          <p>
            If you're serious about learning AI in South Africa as an entrepreneur, the
            fastest path is a hands-on cohort where you leave with a real system — not
            just knowledge.
          </p>
          <p>
            <Link
              to="/entrepreneur-ai-journey"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              Explore the Entrepreneur AI Journey →
            </Link>
          </p>
          <p className="text-sm">
            Related reading:{" "}
            <Link
              to="/blog/ai-marketing-guide"
              className="text-primary hover:underline"
            >
              AI for Small Business Marketing — A Practical Guide
            </Link>
            .
          </p>
        </Section>
      </article>
    </main>
  );
}
