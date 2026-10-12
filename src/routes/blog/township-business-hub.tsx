import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://kasiaihub.com/blog/township-business-hub";
const TITLE = "Community Business Hub | kasiAIhub";
const DESCRIPTION =
  "Practical, research-backed guidance for South African community entrepreneurs — compliance, funding, pricing, marketing, and AI adoption.";

const featured = {
  slug: "/blog/ai-adoption-township-entrepreneurs-south-africa-2026",
  title: "The State of AI Adoption Among Community Entrepreneurs (2026)",
  excerpt:
    "A fully sourced look at where AI adoption actually stands — the real numbers, the real barriers, and what's genuinely working.",
};

const posts: Array<{ slug: string; title: string; excerpt: string }> = [
  { slug: "/blog/your-next-customer-will-send-a-bot", title: "Your Next Customer Might Not Visit Your Website. They Will Send a Bot.", excerpt: "Your customer's agent needs facts it can find: prices, hours, availability and how to order. Four practical fixes for a community business." },
  { slug: "/blog/what-an-ai-agent-does-for-a-community-business", title: "What an AI Agent Actually Does for a Community Business", excerpt: "What to charge, being seen, customers going quiet. Seven jobs an AI agent covers for one subscription - and the one thing it can't do." },
  { slug: "/blog/run-your-back-office-with-an-ai-agent", title: "I Run My Back Office With an AI Agent — Here's What That Actually Means", excerpt: "I run my business with an AI agent. How I use two of them, and the four things that went wrong." },
  { slug: "/blog/grok-bot-ai-agents-township-entrepreneur", title: "Chatbots Made Me Smarter", excerpt: "What xAI's Grok Bot actually changed for a solopreneur running a business alone — including the part its marketing page leaves out." },
  { slug: "/blog/ai-watermarking-township-business-risk", title: "The Invisible Mark", excerpt: "You used Claude to get the proposal out the door. The client never saw that — a detector might. Here's what that actually means." },
  { slug: "/blog/ai-bottleneck-moved-township-business", title: "The Bottleneck Moved — And Most Businesses Haven't Noticed", excerpt: "The world's most famous mathematician just described a shift at the frontier of research. The same shift already happened in your business." },
  { slug: "/blog/what-ai-can-do-for-your-business-test", title: "What AI Can and Can't Do For Your Business", excerpt: "AI is brilliant at some things and useless at others. Here is the one test that sorts your work." },
  { slug: "/blog/what-to-teach-children-age-of-ai", title: "How Micro-Schools Will Flourish in the Age of AI", excerpt: "Why micro-schools are about to grow fast in South Africa, and how AI makes personalised, child-led education practical at small scale." },
  { slug: "/blog/township-business-marketing-south-africa", title: "Community Business Marketing", excerpt: "63% of community businesses say marketing is their biggest need. What actually works." },
  { slug: "/blog/township-business-compliance-registration-south-africa", title: "Compliance & Registration", excerpt: "Nearly 80% of community businesses are unregistered. Why, and how to close the gap." },
  { slug: "/blog/township-business-funding-applications-south-africa", title: "Funding Applications", excerpt: "Why funding applications get rejected — and how to fix it." },
  { slug: "/blog/township-business-pricing-strategy-south-africa", title: "Pricing Strategy", excerpt: "How to price with confidence instead of racing competitors to the bottom." },
  { slug: "/blog/township-business-financial-management-south-africa", title: "Financial Management", excerpt: "Simple financial systems for cash-based community businesses." },
  { slug: "/blog/township-business-customer-retention-south-africa", title: "Customer Retention", excerpt: "Why your best customers disappear — and how to actually keep them." },
  { slug: "/blog/township-business-product-development-south-africa", title: "Product Development", excerpt: "Turning customer feedback into better products without a focus group." },
  { slug: "/blog/ai-language-barrier-township-entrepreneurs-south-africa", title: "AI Language Barrier", excerpt: "Why English-first AI tools are failing community entrepreneurs." },
  { slug: "/blog/ai-infrastructure-barriers-south-africa-2026", title: "AI Infrastructure Barriers (2026)", excerpt: "Data, devices and load shedding — what's actually still stopping AI adoption." },
  { slug: "/blog/popia-ai-small-business-south-africa", title: "POPIA & AI", excerpt: "A plain-English guide to using AI safely in a South African business." },
  { slug: "/blog/ai-investable-township-business-south-africa", title: "AI Makes a Community Business Investable", excerpt: "How AI closes the gap between a business that works and one a funder can see." },
  { slug: "/blog/ai-agents-township-business-south-africa", title: "AI Agents for Community Businesses", excerpt: "What's real, what's hype, and what's actually usable today." },
  { slug: "/blog/ai-plus-kasi-wisdom-township-business", title: "What Happens When Mam Soso Has 300 Customers Instead of 30?", excerpt: "Community businesses were built on trust, not algorithms. Here's why AI doesn't replace that — and what happens the moment a business outgrows one person's memory." },
  { slug: "/blog/business-diagnostic-south-africa", title: "How Do You Know What Your Business Actually Needs? Take the Free Diagnostic", excerpt: "Twelve questions, four minutes, a real read on where your business actually stands." },
  { slug: "/blog/township-business-study-south-africa", title: "Why We're Studying Community Businesses Differently", excerpt: "Most research about community entrepreneurs is done about them, not with them. Here's why this Study is different." },
];

export const Route = createFileRoute("/blog/township-business-hub")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: TownshipHub,
});

function TownshipHub() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to kasiAIhub</Link>
        </nav>
        <header>
          <p className="text-xs uppercase tracking-widest text-primary">Community Business Hub</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Practical guidance for community entrepreneurs
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Research-backed, plain-English writing on compliance, funding, pricing, marketing
            and AI adoption for South African community businesses.
          </p>
        </header>

        <section className="mt-12 rounded-2xl border border-primary/40 bg-primary/5 p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-primary">Anchor piece</p>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold">
            <Link to={featured.slug} className="hover:text-primary">{featured.title}</Link>
          </h2>
          <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
          <p className="mt-4">
            <Link to={featured.slug} className="text-primary hover:underline">Read the anchor piece →</Link>
          </p>
        </section>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug} className="rounded-xl border border-border p-6 hover:border-primary/60 transition">
              <h3 className="text-lg font-semibold text-foreground">
                <Link to={p.slug} className="hover:text-primary">{p.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <p className="mt-3 text-sm">
                <Link to={p.slug} className="text-primary hover:underline">Read →</Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
