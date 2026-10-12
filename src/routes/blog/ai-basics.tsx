import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://kasiaihub.com/blog/ai-basics";
const TITLE = "AI Basics for Small Business | kasiAIhub";
const DESCRIPTION =
  "Plain-English AI guidance for small business owners — no jargon, no assumed experience.";

const posts: Array<{ slug: string; title: string; excerpt: string }> = [
  { slug: "/blog/ai-course-south-africa", title: "AI Course South Africa", excerpt: "How entrepreneurs are learning AI in 2026 — formats, costs and outcomes." },
  { slug: "/blog/ai-for-small-business-south-africa", title: "AI for Small Business", excerpt: "What AI actually looks like for a spaza, creche or catering business in South Africa." },
  { slug: "/blog/ai-marketing-guide", title: "AI Marketing Guide", excerpt: "A practical guide to using AI for small business marketing." },
  { slug: "/blog/best-ai-business-training-platforms-south-africa", title: "Best AI Training Platforms", excerpt: "An honest comparison of AI training that actually fits a small business owner." },
  { slug: "/blog/start-using-ai-small-business-no-technical-background", title: "Getting Started With No Tech Background", excerpt: "No code, no jargon — exactly how to start using AI from zero." },
  { slug: "/blog/ai-marketing-tools-small-business-south-africa", title: "AI Marketing Tools", excerpt: "Canva AI, ChatGPT, Meta AI and more, compared for South African small business." },
  { slug: "/blog/ai-tools-managing-small-business-without-staff", title: "AI Tools For Managing Without Staff", excerpt: "Booking, follow-up and admin — the AI tools solo entrepreneurs actually use." },
  { slug: "/blog/ai-business-training-cost-south-africa", title: "AI Business Training Cost", excerpt: "An honest breakdown of what AI business training costs in South Africa." },
];

export const Route = createFileRoute("/blog/ai-basics")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: AIBasicsHub,
});

function AIBasicsHub() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to kasiAIhub</Link>
        </nav>
        <header>
          <p className="text-xs uppercase tracking-widest text-primary">AI Basics</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            AI basics for small business
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Plain-English AI guidance for small business owners — no jargon, no assumed
            experience.
          </p>
        </header>

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
