import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL =
  "https://kasiaihub.com/blog/ai-business-training-cost-south-africa";
const TITLE =
  "How Much Does AI Business Training Cost in South Africa? | kasiAIhub";
const DESCRIPTION =
  "From free YouTube content to R50,000 corporate programmes — a real, honest breakdown of what AI business training costs in South Africa, and what you actually get.";
const PUBLISHED = "2026-04-01";
const UPDATED = "2026-08-06";
const H1 =
  "How Much Does AI Business Training Cost in South Africa? A Real Price Breakdown";

const faq = [
  {
    q: "Why does AI training cost vary so much?",
    a: "Price generally reflects how customised the training is to your specific business, whether it's live and hands-on versus self-paced video, and what level of client (individual vs corporate) it's built for.",
  },
  {
    q: "Is free content enough to actually implement AI in my business?",
    a: "For general familiarity, yes. For building a working, business-specific system, most entrepreneurs find free content alone insufficient without guided application.",
  },
  {
    q: "What's included in kasiAIhub's price that isn't included elsewhere?",
    a: "The AI tool subscription for the month, hands-on building during the session (not just instruction), and 30 days of WhatsApp support included after training ends.",
  },
];

export const Route = createFileRoute(
  "/blog/ai-business-training-cost-south-africa",
)({
  head: () => ({
    meta: [
      { title: "What Does AI Business Training Cost in South Africa?" },
      { name: "description", content: "From free online content to R50,000 corporate programmes: an honest breakdown of what AI business training costs in South Africa and what you get." },
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
          <span className="text-foreground">AI Training Cost in South Africa</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">Guide · Pricing</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">{H1}</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Pricing for AI business training in South Africa ranges from completely free to tens of
            thousands of rand — with very little transparency about what the price actually buys.
            This article breaks down the real cost landscape honestly.
          </p>
        </header>

        <Section id="free" title="Free: YouTube and Self-Directed Content">
          <p><strong className="text-foreground">Cost:</strong> R0</p>
          <p><strong className="text-foreground">What you get:</strong> General AI literacy, specific tutorials, prompt examples. Endlessly available, no time pressure.</p>
          <p><strong className="text-foreground">What you don't get:</strong> Application to your specific business, accountability, a working end result, or anyone to ask when you get stuck. Most entrepreneurs who try this route report starting several times and not finishing, or finishing without a usable outcome.</p>
        </Section>

        <Section id="low-cost" title="Low-Cost Online Courses: R150 – R1,500">
          <p>Platforms like Udemy offer individual courses at low prices, often discounted further.</p>
          <p><strong className="text-foreground">What you get:</strong> Structured video content on a specific topic, sometimes with downloadable resources.</p>
          <p><strong className="text-foreground">What you don't get:</strong> Live support, application to your business, or verification that the content suits the South African context. Quality varies significantly by instructor.</p>
        </Section>

        <Section id="mid-tier" title="Mid-Tier Structured Programmes: R2,000 – R10,000">
          <p>Various local digital skills providers offer structured, multi-week programmes at this price point, sometimes with employer or funding subsidies available.</p>
          <p><strong className="text-foreground">What you get:</strong> More structure, sometimes live sessions, broader digital skills coverage beyond just AI.</p>
          <p><strong className="text-foreground">What you don't get:</strong> Typically still generic content not built around your specific business, and a longer time commitment (weeks to months) before completion.</p>
        </Section>

        <Section id="premium" title="Premium International Credentials: R500 – R5,000 per course">
          <p>Coursera and similar platforms.</p>
          <p><strong className="text-foreground">What you get:</strong> Recognised international certification, university or major tech company-backed content.</p>
          <p><strong className="text-foreground">What you don't get:</strong> Local context, application to a South African small business specifically, or a working system at the end.</p>
        </Section>

        <Section id="corporate" title="Corporate AI Consulting: R30,000+">
          <p>Enterprise-focused AI consultancies charge significantly more, reflecting corporate client budgets, longer engagement timelines, and dedicated account management.</p>
          <p><strong className="text-foreground">What you get:</strong> Deep, customised integration — if you're a company with the budget and internal team to support it.</p>
          <p><strong className="text-foreground">What you don't get:</strong> Anything realistic for a solo entrepreneur or small business owner — this pricing tier isn't built for you, regardless of how the marketing is framed.</p>
        </Section>

        <Section id="kasiaihub" title="kasiAIhub: R1,500 per session / R4,000 full programme">
          <p><strong className="text-foreground">What you get:</strong> Hands-on training built specifically around your business, a working strategy, a working app or system, a month of marketing content, the relevant AI tool subscription included, refreshments, and 30 days of WhatsApp support included after each session.</p>
          <p><strong className="text-foreground">What you don't get:</strong> A pre-recorded video library or a broad, generic curriculum unrelated to your specific business.</p>
          <ul className="ml-6 list-disc space-y-2">
            <li><Link to="/sessions/think-and-plan" className="text-primary hover:underline">Session 1: Think & Plan</Link> — R1,500</li>
            <li><Link to="/sessions/build-and-create" className="text-primary hover:underline">Session 2: Build & Create</Link> — R1,500</li>
            <li><Link to="/sessions/brand-and-grow" className="text-primary hover:underline">Session 3: Brand & Grow</Link> — R1,500</li>
          </ul>
        </Section>

        <Section id="what-youre-paying-for" title="What You're Actually Paying For">
          <p>
            The honest difference across this price range isn't really about AI knowledge — most of
            the underlying tools (Claude, ChatGPT, Gemini) are the same regardless of which
            training route you choose, and several have free tiers.
          </p>
          <p>
            What you're paying for is: how directly the training applies to your specific business,
            whether you leave with something built and working versus something explained, and
            whether there's support after the session ends to keep you using it.
          </p>
          <p>
            Free and low-cost content wins on price but leaves the application work entirely to
            you. Corporate consulting wins on depth but prices out small business owners entirely.
            The realistic, honest cost of hands-on, business-specific AI training that produces a
            working result sits in the R1,500 – R4,000 range — which is where kasiAIhub is
            deliberately priced.
          </p>
          <p>
            <Link
              to="/entrepreneur-ai-journey"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              See the full pricing breakdown →
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
