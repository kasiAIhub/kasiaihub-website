import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://kasiaihub.com/resources";
const TITLE = "Resources | kasiAIhub";
const DESCRIPTION =
  "AI Basics, the Community Business Hub, and the Community Business Study — practical, research-backed writing for South African entrepreneurs.";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources for South African Entrepreneurs | kasiAIhub" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const cards = [
    {
      to: "/blog/ai-basics",
      title: "AI Basics",
      desc: "Plain-English guidance for small business owners — no jargon, no assumed experience.",
    },
    {
      to: "/blog/township-business-hub",
      title: "Community Business Hub",
      desc: "Research-backed writing on compliance, funding, pricing, marketing and AI for community entrepreneurs.",
    },
    {
      to: "/township-study",
      title: "The Community Business Study",
      desc: "An ongoing research initiative — five quick questions that shape what kasiAIhub builds next.",
    },
  ] as const;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to kasiAIhub</Link>
        </nav>
        <header>
          <p className="text-xs uppercase tracking-widest text-primary">Resources</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Three ways to go deeper
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Start with the basics, explore the Community Business Hub, or add
            your voice to the Community Business Study.
          </p>
        </header>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="block rounded-2xl border border-border p-6 hover:border-primary/60 transition"
            >
              <h2 className="text-xl font-bold text-foreground">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <p className="mt-4 text-sm text-primary">Explore →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
