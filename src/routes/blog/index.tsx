import { createFileRoute, Link } from "@tanstack/react-router";
import { blogSortKey } from "@/lib/blog-dates";

const CANONICAL = "https://kasiaihub.com/blog";
const TITLE = "kasiAIhub Blog — AI Guides for South African Entrepreneurs";
const DESCRIPTION =
  "Practical AI guides for South African small business owners and entrepreneurs — tools, training and real-world use cases.";

const posts = [
  {
    slug: "/blog/your-next-customer-will-send-a-bot",
    title: "Your Next Customer Might Not Visit Your Website. They Will Send a Bot.",
    excerpt: "Your customer's agent needs facts it can find: prices, hours, availability and how to order. Four practical fixes for a community business.",
  },
  {
    slug: "/blog/what-an-ai-agent-does-for-a-community-business",
    title: "What an AI Agent Actually Does for a Community Business",
    excerpt: "What to charge, being seen, customers going quiet. Seven jobs an AI agent covers for one subscription - and the one thing it can't do.",
  },
  {
    slug: "/blog/run-your-back-office-with-an-ai-agent",
    title: "I Run My Back Office With an AI Agent — Here's What That Actually Means",
    excerpt: "I run my business with an AI agent. How I use two of them, and the four things that went wrong.",
  },
  {
    slug: "/blog/grok-bot-ai-agents-township-entrepreneur",
    title: "Chatbots Made Me Smarter. Then an Agent Made Me Faster.",
    excerpt:
      "What xAI's Grok Bot actually changed for a solopreneur running a business alone — including the part its marketing page leaves out.",
  },
  {
    slug: "/blog/ai-watermarking-township-business-risk",
    title: "The Invisible Mark — Does AI Watermarking Put Your Business at Risk?",
    excerpt:
      "You used Claude to get the proposal out the door. The client never saw that — a detector might. Here's what that actually means.",
  },
  {
    slug: "/blog/ai-bottleneck-moved-township-business",
    title: "The Bottleneck Moved — And Most Businesses Haven't Noticed",
    excerpt:
      "The world's most famous mathematician just described a shift at the frontier of research. The same shift already happened in your business.",
  },
  {
    slug: "/blog/what-ai-can-do-for-your-business-test",
    title: "What AI Can and Can't Do For Your Business — And How to Tell",
    excerpt:
      "AI is brilliant at some things and useless at others. Here is the one test that sorts your work into what you can hand over and what stays yours.",
  },
  {
    slug: "/blog/what-to-teach-children-age-of-ai",
    title:
      "How Micro-Schools Will Flourish in the Age of AI",
    excerpt:
      "Why micro-schools are about to grow fast in South Africa, and how AI makes personalised, child-led education practical at small scale.",
  },
  {
    slug: "/blog/business-diagnostic-south-africa",
    title: "How Do You Know What Your Business Actually Needs?",
    excerpt:
      "Pricing, compliance, marketing, systems — they all sound urgent. Take the free diagnostic to find out which one is actually costing you the most right now.",
  },
  {
    slug: "/blog/ai-for-small-business-south-africa",
    title: "AI for Small Business South Africa: What Actually Works in 2026",
    excerpt:
      "Most \"AI for small business\" guides are written for the US. Here's what AI actually looks like when you're running a spaza, a creche or a catering business in South Africa.",
  },
  {
    slug: "/blog/ai-course-south-africa",
    title: "AI Course South Africa: How Entrepreneurs Are Learning AI in 2026",
    excerpt:
      "Compare formats, costs and outcomes — and see how South African entrepreneurs learn Claude, ChatGPT, Gemini and Lovable in a practical 3-day journey.",
  },
  {
    slug: "/blog/best-ai-business-training-platforms-south-africa",
    title:
      "Best AI Business Training Platforms for South African Entrepreneurs (2026)",
    excerpt:
      "Coursera, Udemy, School of IT, Digital Regenesys and kasiAIhub — an honest comparison of which AI training actually fits a small business owner in South Africa.",
  },
  {
    slug: "/blog/start-using-ai-small-business-no-technical-background",
    title:
      "How to Start Using AI in Your Small Business (No Tech Background Needed)",
    excerpt:
      "No code, no jargon. Exactly how a South African entrepreneur with zero technical background gets started with AI.",
  },
  {
    slug: "/blog/ai-marketing-tools-small-business-south-africa",
    title:
      "AI Marketing Tools for Small Businesses in South Africa: What Actually Works",
    excerpt:
      "Canva AI, ChatGPT, Meta AI and more compared for South African small business marketing — what each tool does well and how to actually use them.",
  },
  {
    slug: "/blog/ai-tools-managing-small-business-without-staff",
    title: "AI Tools for Managing a Small Business Without Hiring Staff",
    excerpt:
      "Booking, customer follow-up and admin — the AI tools South African solo entrepreneurs use to run operations without hiring.",
  },
  {
    slug: "/blog/ai-business-training-cost-south-africa",
    title: "How Much Does AI Business Training Cost in South Africa?",
    excerpt:
      "From free YouTube content to R50,000 corporate programmes — an honest breakdown of what AI business training costs in South Africa.",
  },
  {
    slug: "/blog/ai-marketing-guide",
    title: "AI for Small Business Marketing — A Practical Guide",
    excerpt:
      "How South African small business owners are using AI to generate content, product images and marketing that competes with big brands.",
  },
  {
    slug: "/blog/township-business-marketing-south-africa",
    title:
      "Why Marketing Is the #1 Struggle for Community Businesses in South Africa",
    excerpt:
      "63% of community businesses say marketing is their biggest need. What the research shows, and what practical AI-powered marketing actually looks like.",
  },
  {
    slug: "/blog/township-business-compliance-registration-south-africa",
    title:
      "Why 4 in 5 Community Businesses Are Unregistered in South Africa",
    excerpt:
      "Nearly 80% of community businesses are unregistered. Why it happens, what it's costing entrepreneurs, and how to close the gap.",
  },
  {
    slug: "/blog/township-business-funding-applications-south-africa",
    title:
      "Why Funding Applications Get Rejected in South Africa (And How to Fix It)",
    excerpt:
      "Incomplete documentation and weak business plans are the top funding blockers. What you actually need, and how AI helps you get it right.",
  },
  {
    slug: "/blog/township-business-pricing-strategy-south-africa",
    title:
      "Pricing Without Guesswork: How Community Entrepreneurs Can Stop Racing to the Bottom",
    excerpt:
      "Community businesses often face up to 20 competitors in the same community. Here's how to price with confidence instead of guesswork.",
  },
  {
    slug: "/blog/township-business-financial-management-south-africa",
    title:
      "Getting Out of Your Own Head: Simple Financial Systems for Cash-Based Businesses",
    excerpt:
      "74% of South African community businesses have no business bank account. Here's what actually works for cash-based financial management.",
  },
  {
    slug: "/blog/township-business-customer-retention-south-africa",
    title:
      "Why Your Best Customers Keep Disappearing (And How to Actually Keep Them)",
    excerpt:
      "Community customers often disappear without explanation. Simple, realistic ways to build retention without a full CRM system.",
  },
  {
    slug: "/blog/ai-language-barrier-township-entrepreneurs-south-africa",
    title: "Why English-First AI Tools Are Failing Community Entrepreneurs",
    excerpt:
      "Only 8.7% of South Africans speak English at home. What the research shows about the AI language gap, and what's emerging to close it.",
  },
  {
    slug: "/blog/ai-infrastructure-barriers-south-africa-2026",
    title:
      "Data, Devices and Load Shedding: What's Actually Still Stopping AI Adoption in 2026",
    excerpt:
      "Load shedding isn't the barrier it used to be. An honest, current look at what's actually limiting AI adoption in South Africa.",
  },
  {
    slug: "/blog/township-business-product-development-south-africa",
    title:
      "Turning Customer Feedback Into Better Products (Without a Focus Group)",
    excerpt:
      "You don't need market research budgets to improve your product. How community entrepreneurs can use feedback and simple AI tools to iterate.",
  },
  {
    slug: "/blog/popia-ai-small-business-south-africa",
    title: "POPIA and AI: What South African Small Businesses Need to Know",
    excerpt:
      "Using ChatGPT or Claude in your business? POPIA already applies. A plain-English guide to what's allowed, what isn't, and how to use AI safely.",
  },
  {
    slug: "/blog/ai-investable-township-business-south-africa",
    title: "How AI Makes a Community Business Investable",
    excerpt:
      "Most community businesses were started to survive, not to scale. How AI closes the gap between a business that works and one a funder can see.",
  },
  {
    slug: "/blog/ai-agents-township-business-south-africa",
    title: "AI Agents for Community Businesses: What's Real and What's Hype",
    excerpt:
      "An honest look at what an AI agent can actually do for your business today — and what is still just a demo.",
  },
  {
    slug: "/blog/township-business-study-south-africa",
    title: "Why We're Studying Community Businesses Differently",
    excerpt:
      "Most research about community entrepreneurs is done about them, not with them. Here's why we built something different, and why your five minutes matters.",
  },
  {
    slug: "/blog/ai-plus-kasi-wisdom-township-business",
    title: "What Happens When Mam Soso Has 300 Customers Instead of 30?",
    excerpt:
      "Community businesses were built on trust, not algorithms. Why AI doesn't replace kasi wisdom — and what happens the moment a business outgrows one person's memory.",
  },
] as const;

const sortedPosts = [...posts].sort(
  (a, b) => blogSortKey(b.slug) - blogSortKey(a.slug),
);

const featured = {
  slug: "/blog/ai-adoption-township-entrepreneurs-south-africa-2026",
  title:
    "The State of AI Adoption Among Community Entrepreneurs in South Africa (2026)",
  excerpt:
    "A fully sourced look at where AI adoption actually stands among community entrepreneurs — the real numbers, the real barriers, and what's genuinely working. The anchor piece for the whole community AI hub.",
} as const;

export const Route = createFileRoute("/blog/")({
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
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Back to kasiAIhub
          </Link>
        </nav>
        <header>
          <p className="text-sm uppercase tracking-widest text-primary">Blog</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            AI guides for South African entrepreneurs
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Practical, no-fluff writing on how AI actually works for small business owners
            in South Africa.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 p-6 md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Ready to build systems that work?
              </p>
              <h2 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
                See the full Entrepreneur AI Journey breakdown
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Three practical sessions — and an optional advanced team — built for South African small businesses.
              </p>
            </div>
            <Link
              to="/entrepreneur-ai-journey"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 hover:shadow-primary/30"
            >
              View the journey →
            </Link>
          </div>
        </section>


        <section className="mt-12 rounded-2xl border border-primary/40 bg-primary/5 p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-primary">
            Start here · Community AI Hub anchor
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
            <Link to={featured.slug} className="hover:text-primary">
              {featured.title}
            </Link>
          </h2>
          <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
          <p className="mt-4">
            <Link to={featured.slug} className="text-primary hover:underline">
              Read the anchor piece →
            </Link>
          </p>
        </section>

        <ul className="mt-12 space-y-8">
          {sortedPosts.map((p) => (
            <li key={p.slug} className="border-t border-border pt-8">
              <h2 className="text-2xl font-bold text-foreground">
                <Link to={p.slug} className="hover:text-primary">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
              <p className="mt-3">
                <Link to={p.slug} className="text-primary hover:underline">
                  Read the guide →
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
