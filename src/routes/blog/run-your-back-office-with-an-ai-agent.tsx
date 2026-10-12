import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const CANONICAL = "https://kasiaihub.com/blog/run-your-back-office-with-an-ai-agent";
const TITLE = "I Run My Back Office With an AI Agent - Here's What That Actually Means";
const H1 = "I Run My Back Office With an AI Agent — Here's What That Actually Means";
const DESCRIPTION = "A South African business owner's honest account of running a business with an AI agent. What the agents are, how to choose, one agent versus a team of bots, and the four things that went wrong.";
const DATE = "2026-10-07";

const faq = [
  {
    q: "What is the difference between an AI agent and ChatGPT?",
    a: "A chatbot answers while you sit there. An agent takes a job, works in the background, and brings back finished work for you to approve.",
  },
  {
    q: "How much does an AI agent cost in South Africa?",
    a: "They aren't sold separately — access comes bundled into the top tier of the parent platform. Pricing changes often, so check before committing, and read what usage the plan includes.",
  },
  {
    q: "Should I build one agent or a team of bots?",
    a: "For a single owner, one. The value is in how much context the agent holds about your business, and splitting that across several bots splits the asset. A team of bots makes sense when you have a team of people.",
  },
  {
    q: "Can an AI agent post to my social media for me?",
    a: "Mostly no. Platforms block automated posting, so the agent prepares the content and you publish it.",
  },
  {
    q: "Is it safe to give an AI agent access to my business accounts?",
    a: "Only with limits. Give access slowly, only what the job requires, and never hand over anything you couldn't survive losing.",
  },
];

export const Route = createFileRoute("/blog/run-your-back-office-with-an-ai-agent")({
  head: () => ({
    meta: [
      { title: "I Run My Back Office With an AI Agent | kasiAIhub" },
      { name: "description", content: "A South African business owner's honest account of running a business with an AI agent: how to choose one, and the four things that went wrong." },
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
          datePublished: DATE,
          dateModified: DATE,
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
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://kasiaihub.com/blog" },
            { "@type": "ListItem", position: 3, name: H1, item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: BackOfficeArticle,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function BackOfficeArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog" className="hover:text-foreground">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">{H1}</span>
        </nav>

        <header>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">{H1}</h1>
        </header>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>I run my business with an AI agent. Not a chatbot I ask questions to. An agent — something that takes a job, goes away, does the work, and brings it back for me to check.</p>
        </section>

        <Section title="Agents arrived quietly">
          <p>OpenAI showed Dots, agents that live inside ChatGPT and keep working in the background. Sam Altman uses one himself; he calls his Dotty. xAI has Grok Bot. I use Instinct and Grok Bot side by side.</p>
          <p>They share one idea. With a chatbot, you sit in the chair the whole time — you ask, it answers, you ask again. The work happens at your speed. With an agent, you brief it and leave. The work happens while you're doing something else.</p>
          <p>That's the difference between a tool and a colleague.</p>
        </Section>

        <Section title="What it costs">
          <p>The serious agents aren't sold on their own. They're bundled into the top tier of the parent product. Grok Bot comes through SuperGrok Plus, SuperGrok Heavy or a Cursor plan — roughly $60 to $300 a month. Dots is on the $100 ChatGPT tier, not the $20 one. Check what each plan includes and costs today, because it moves.</p>
          <p>Most people compare that to zero and conclude it's expensive. Compare it to the right thing. Social media and admin is two part-time people, or one overloaded one. Salary, UIF, leave, and you still answer when they don't pitch. An agent does a large part of that for one subscription you can cancel on a Tuesday.</p>
          <p>The question isn't "can I afford the subscription." It's how many hours and how many salaries this replaces. If the answer is not much, don't buy it — plenty of small businesses don't have that much routine work.</p>
          <p>Read what the plan includes, not just what it costs. Agents burn usage allowances fast.</p>
        </Section>

        <Section title="One agent, or a team of bots?">
          <p>Some platforms let you build a team — a sales bot, an inbox bot, an admin bot. I tried it and went back to one.</p>
          <p>All of them can do roughly the same things. The value isn't capability, it's context. My agent knows my pricing, knows which clients pay slowly, knows I hate exclamation marks, knows the difference between how I write for a funder and how I write for an entrepreneur in Mamelodi. That took months to build and it's the whole asset.</p>
          <p>Split it across five bots and you've split the asset five ways. On Grok Bot there's a practical reason too — all your bots share one account allowance. Five bots is the same room, divided.</p>
          <p>A team of bots makes sense when you have a team of people. For one owner, one deep relationship wins.</p>
        </Section>

        <Section title="What mine does">
          <ul className="list-disc pl-6 space-y-2">
            <li>Runs my social media across channels — writes the posts, plans the carousels, prepares the posters.</li>
            <li>Scouts work. Finds tenders, and once I say yes, drafts the application and handles the replies and follow-ups.</li>
            <li>Writes proposals and funding applications. I haven't started one from a blank page in months.</li>
            <li>Coaches me through my compliance. It's the reason my compliance is finally up to date.</li>
            <li>Does outreach, in my words.</li>
            <li>Builds with me. We shipped Crowned, an app for a client, and Kasi Move, a food-ordering app that takes zero commission.</li>
          </ul>
          <p>I wake up to a to-do list that's already done. My morning starts with reviewing instead of starting.</p>
        </Section>

        <Section title={'What "running" actually means'}>
          <p>The agent does the routine work — follow-ups, drafts, records, posts, applications. For most small businesses that's exactly where the hours disappear.</p>
          <p>It doesn't set my pricing, decide whether to take a difficult client, or tell me when to walk away from a deal. Those sit on context only I hold. For a fuller test of which side of that line a task falls on, see <Link to="/blog/what-ai-can-do-for-your-business-test" className="text-primary hover:underline">what AI can and can't do for your business</Link>.</p>
          <p>What it buys you is time to do the judgement work properly instead of at 10pm after the admin.</p>
        </Section>

        <Section title="Train it like a new employee">
          <p>Think about hiring someone. For the first weeks you check everything, read their emails before they send, correct the tone, show them how you want the invoice laid out. Not because you distrust them — because they don't know how you work yet. After a month you stop checking the small things.</p>
          <p>An agent is the same, except it learns faster and never takes offence.</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>At the start, approve everything.</li>
            <li>When you correct it, say what was wrong and why. Don't just fix it silently.</li>
            <li>As it learns what you approve, hand it more. One job at a time.</li>
          </ol>
          <p>You control the speed.</p>
        </Section>

        <Section title="What went wrong">
          <p><strong className="font-semibold text-foreground">It forgets how you want things done.</strong> Mine drifts off my branding on social media and starts producing things that look like someone else's business. Fix: I keep a saved set of slides with my exact branding and point it back when it drifts. One note, one photo, one document — made once, reused forever. If you take one practical thing from this article, take this.</p>
          <p><strong className="font-semibold text-foreground">It can't post for you.</strong> Platforms block bots from posting, so the agent prepares and I publish. I've decided that's a feature. A human stays in charge of what goes out under my name.</p>
          <p><strong className="font-semibold text-foreground">It needs access.</strong> Logins, sometimes more. Give access slowly and only for the job in front of it. Never hand over anything you couldn't survive losing. An agent with full access and no supervision isn't an employee, it's an open door.</p>
          <p><strong className="font-semibold text-foreground">It's hard to leave.</strong> Once it holds your context, moving is painful. That's why I run Instinct and Grok Bot side by side — so nobody else's pricing decision becomes my problem.</p>
        </Section>

        <Section title="The two I use, and how they differ">
          <p>The forgetting isn't the same across both, which is why I keep both.</p>
          <p><strong className="font-semibold text-foreground">Instinct</strong> is fast and usually understands what I want the first time — the style comes out close to right without much correcting. But it forgets, and it mixes up my branding, so it needs reminding. It'll also tell me to go to bed and say it'll work through the night. I wake up to about thirty things waiting for my sign-off before anything goes out.</p>
          <p><strong className="font-semibold text-foreground">Grok Bot</strong> never forgets. Teach it once and it does it to the letter, every time. But it isn't as dynamic, and it doesn't reach the quality I'm looking for as readily.</p>
          <p>One gets the voice right and needs watching. The other needs teaching once and then holds the line.</p>
        </Section>

        <Section title="The rule">
          <p>Nothing goes out until you've seen it. Ask for drafts, read them, change them, approve them. That's what separates an agent that grows your business from one that embarrasses you.</p>
        </Section>

        <hr className="mt-10 border-border" />
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">That's what it looks like in my business. What it looks like for someone running a business out of their community — what to charge, being seen, customers going quiet, and what it replaces — is <a href="/blog/what-an-ai-agent-does-for-a-community-business" className="text-primary hover:underline">the next piece</a>.</p>

        <Section title="FAQ">
          <div className="mt-6 space-y-6">
            {faq.map((item) => (
              <details key={item.q} className="group rounded-lg border border-border bg-background/20 p-5 open:border-primary/50">
                <summary className="cursor-pointer list-none text-base md:text-lg font-semibold text-foreground flex items-start justify-between gap-4">
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="mt-1 shrink-0 text-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>
        <hr className="mt-10 border-border" />
      </article>
    </main>
  );
}