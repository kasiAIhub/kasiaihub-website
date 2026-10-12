import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://kasiaihub.com/blog/ai-marketing-guide";
const TITLE = "AI for Small Business Marketing: A Practical Guide for South African Entrepreneurs";
const DESCRIPTION =
  "A practical guide to AI for small business marketing. Learn how South African entrepreneurs use Claude and ChatGPT for content planning, campaigns, and new AI business ideas.";
const PUBLISHED = "2026-04-08";
const UPDATED = "2026-08-06";

export const Route = createFileRoute("/blog/ai-marketing-guide")({
  head: () => ({
    meta: [
      { title: "AI for Small Business Marketing: A Practical Guide" },
      { name: "description", content: "A practical guide to AI for small business marketing. See how South African entrepreneurs plan content, run campaigns and find new business ideas with AI." },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
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
  component: AiMarketingGuide,
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function AiMarketingGuide() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog/ai-basics" className="hover:text-foreground">AI Basics</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">AI Marketing Guide</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">Guide · Entrepreneurs</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            AI for Small Business Marketing: A Practical Guide for South African Entrepreneurs
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            AI has quietly become the most affordable marketing team a small business can hire. This guide
            shows how South African entrepreneurs are using tools like Claude and ChatGPT to plan content,
            run campaigns, and unlock new AI business ideas — without a full-time agency.
          </p>
        </header>

        <Section id="why-ai" title="Why AI matters for small business marketing">
          <p>
            Marketing used to reward whoever could afford the most airtime. Today it rewards whoever shows
            up consistently, speaks to a specific customer, and moves fast when something works. That is
            exactly the shift AI unlocks for small businesses: consistency and speed at a price point that
            makes sense for a spaza, a salon, a bakery or a service business.
          </p>
          <p>
            You do not need to become a technologist. You need a repeatable system — a way to plan content,
            write it, publish it, and learn from it every week. AI is the assistant that makes that system
            possible on your own.
          </p>
        </Section>

        <Section id="toolkit" title="The starter toolkit: Claude and ChatGPT">
          <p>
            Two general-purpose AI assistants cover most of what a small business needs for marketing:
            Claude (from Anthropic) and ChatGPT (from OpenAI). Both are strong at writing, planning, and
            reasoning. In practice, entrepreneurs use them for four things:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li><strong>Content planning</strong> — turning one idea into a month of posts.</li>
            <li><strong>Copywriting</strong> — captions, WhatsApp broadcasts, email, ad copy, landing pages.</li>
            <li><strong>Customer research</strong> — clarifying who you serve and what they actually want.</li>
            <li><strong>Operations</strong> — scripts for replies, FAQs, quotes, and follow-ups.</li>
          </ul>
          <p>
            Pick one and stay with it for 30 days. Switching tools too often is the fastest way to feel busy
            without shipping anything.
          </p>
        </Section>

        <Section id="content-plan" title="Build a monthly content plan in one sitting">
          <p>
            The most common blocker for small business owners is not writing — it is knowing what to write
            about. AI solves this in an afternoon. A workable prompt looks like this:
          </p>
          <blockquote className="border-l-2 border-primary pl-4 italic">
            "You are a marketing coach for a {`{your business}`} in {`{your city}`}. My customers are
            {` {who they are}`} and they care about {`{what they care about}`}. Give me 12 content ideas for
            the next month — 4 educational, 4 behind-the-scenes, 4 offers. For each, write a hook, a
            caption, and a call to action."
          </blockquote>
          <p>
            You will get a full month of ideas in under a minute. Your job then is to edit for your voice
            and your local context — never publish AI copy raw. The plan is the scaffolding; you are the
            brand.
          </p>
        </Section>

        <Section id="ai-business-ideas" title="AI business ideas worth testing">
          <p>
            Beyond marketing your existing business, AI has opened the door to new services entrepreneurs
            can offer clients directly. A few AI business ideas that are working for small operators right
            now:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>AI-assisted content packages for local businesses that do not have time to post.</li>
            <li>WhatsApp response templates and FAQ systems for busy service providers.</li>
            <li>Menu, quote, and proposal writing for restaurants, tradies, and consultants.</li>
            <li>Onboarding playbooks and SOPs written from a single voice-note interview.</li>
            <li>Localised product descriptions for community e-commerce sellers.</li>
          </ul>
          <p>
            The pattern is the same: take a task a small business already needs done, use AI to do it in a
            fraction of the time, and charge for the outcome rather than the hours.
          </p>
        </Section>

        <Section id="weekly-rhythm" title="A weekly marketing rhythm">
          <p>Structure beats motivation. A simple rhythm that works for solo founders:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li><strong>Monday</strong> — 30 minutes with AI to plan the week's posts.</li>
            <li><strong>Tuesday–Thursday</strong> — 15 minutes a day to publish and reply.</li>
            <li><strong>Friday</strong> — 20 minutes to review what worked and note it down.</li>
          </ul>
          <p>
            That is under 2 hours a week. Compounded over a year, it is more marketing than most small
            businesses do in five.
          </p>
        </Section>

        <Section id="mistakes" title="Mistakes to avoid">
          <ul className="list-disc space-y-2 pl-6">
            <li>Publishing AI output without editing — customers can tell.</li>
            <li>Chasing every new tool instead of mastering one.</li>
            <li>Skipping the customer research step; AI cannot invent insight you have not given it.</li>
            <li>Treating AI as a magic button rather than a junior team member you brief clearly.</li>
          </ul>
        </Section>

        <Section id="next-step" title="Your next step">
          <p>
            If you want to build this into a system with support, our Brand &amp; Grow session walks
            entrepreneurs through applying Claude and ChatGPT to their own business in one focused
            afternoon. You leave with a content plan, a set of prompts, and a rhythm you can actually keep.
          </p>
          <p>
            <Link to="/" className="text-primary underline underline-offset-4 hover:no-underline">
              Explore kasiAIhub sessions →
            </Link>
          </p>
        </Section>
      </article>
    </main>
  );
}
