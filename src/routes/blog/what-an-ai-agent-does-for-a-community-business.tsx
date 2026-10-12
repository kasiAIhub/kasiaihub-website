import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const CANONICAL = "https://kasiaihub.com/blog/what-an-ai-agent-does-for-a-community-business";
const TITLE = "What an AI Agent Actually Does for a Community Business";
const DESCRIPTION = "Pricing, visibility, customers going quiet, compliance, books and funding - what an AI agent does for a community entrepreneur, what it replaces, and where your own judgement still decides.";
const DATE = "2026-10-09";
const SOURCE = "https://kasimaverick.co.za/more-flexibility-when-it-matters-most-fnb-enhances-ewallet-cash-advance-and-introduces-fnb-connect-prepaid-advance/";

const faq = [
  {
    q: "Is an AI agent worth the money for a small business?",
    a: "Compare it to what it replaces, not to zero. One agent covers pricing research, social media, a website, compliance help, bookkeeping, funding applications and customer follow-ups - jobs that would otherwise be four to seven people.",
  },
  {
    q: "Can an AI agent help me work out what to charge?",
    a: "Yes. It can research what competitors charge and interview you about your own costs, then recommend a price. You still decide what your customers will actually pay.",
  },
  {
    q: "Can an AI agent build my website?",
    a: "Yes. It can draft the pages and the copy, walk you through buying a domain and publishing, and set up business email on that domain.",
  },
  {
    q: "Can an AI agent do my bookkeeping?",
    a: "It can record sales and expenses as you tell it or photograph slips, and produce an income and expense statement on request. It also helps keep business money separate from personal money.",
  },
  {
    q: "Do I need technical skills to use an AI agent?",
    a: "No. You talk to it in ordinary language, in whatever language you're comfortable in. The skill you need is knowing which work to hand over.",
  },
  {
    q: "Which job should I start with?",
    a: "The one that eats the most of your time and that you dread. Get that running cleanly with your approval on every draft, then add the next one.",
  },
];

export const Route = createFileRoute("/blog/what-an-ai-agent-does-for-a-community-business")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "What an AI agent does for a community entrepreneur: pricing, visibility, customers, compliance, books and funding, and where your judgement still decides." },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { property: "article:published_time", content: DATE },
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
          author: { "@type": "Person", name: "Tsholo Monyausi" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: DATE,
          dateModified: DATE,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          citation: SOURCE,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
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
            { "@type": "ListItem", position: 3, name: TITLE, item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: CommunityBusinessAgentArticle,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function CommunityBusinessAgentArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog" className="hover:text-foreground">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">{TITLE}</span>
        </nav>

        <header>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">{TITLE}</h1>
          <p className="mt-4 text-sm text-muted-foreground">By Tsholo Monyausi · <time dateTime={DATE}>9 October 2026</time></p>
        </header>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>I run my own business with an AI agent - the admin, the social media, the follow-ups, the proposals. I wrote about how that works, what it costs and what went wrong with it, <Link to="/blog/run-your-back-office-with-an-ai-agent" className="text-primary hover:underline">here</Link>.</p>
          <p>This piece is the more useful one. It's about what an agent does for someone running a business out of their community.</p>
          <p>Picture that person. A few regular customers, a phone, a notebook, cash moving in and out. Busy every day, couldn't tell you last month's profit. I've met hundreds of them.</p>
        </section>

        <Section title={'"I don\'t know what to charge"'}>
          <p>Most of these businesses price by copying the person next door.</p>
          <p>Ask the agent to research what competitors actually charge and it goes and looks. Then ask it to interview you about your costs - stock, transport, electricity, packaging, your own time - and it will, one question at a time, until it has the real number. Then it tells you what you should be charging, and why. It'll also research which markets you could move into.</p>
          <p>Then it stops, and you start. The agent doesn't know your customers get paid on the 25th and are broke by the 10th. Maybe you charge its number at month end and run a special mid-month. Maybe you hold your price and change what's included. That call is yours.</p>
          <p>The difference is you're making it <strong className="font-semibold text-foreground">on top of facts</strong> instead of them. Before, you guessed. Now you adjust.</p>
        </Section>

        <Section title={'"Nobody knows I exist"'}>
          <p>Posting daily across LinkedIn, TikTok, Instagram, Facebook and X is a second job. Nobody running a business alone does it consistently - they manage two weeks and stop. An agent runs it: captions, visuals, the same idea adapted per platform. You check and publish.</p>
          <p>It goes further than posters. Ask it to build your website and it drafts the pages and the words, then walks you through buying a domain and publishing. It can buy the domain for you and set up business email on it, so you stop sending quotes from a Gmail address. A business that's existed for years with no website and no proper email can have both in an afternoon.</p>
        </Section>

        <Section title={'"My customers go quiet"'}>
          <p><em>"I haven't seen you in a few weeks, come through."</em> Everyone knows this works. Almost nobody sends it, because when you're serving the customer in front of you, you're not writing to the one who isn't there.</p>
          <p>An agent holds the whole list and keeps it going - the quote nobody replied to, the customer who came twice and stopped. It does the outreach to new people too, and works out with you what you say at each stage of a customer relationship, so the same message isn't reinvented every time.</p>
        </Section>

        <Section title={'"I\'ve been avoiding the forms"'}>
          <p>Tell it what compliance is outstanding and it brings the forms up and coaches you through them, field by field.</p>
          <p>Most of us have paid someone for this - not because the forms are hard, but because nobody explained them. Now you have something that will explain them as many times as you need, without charging per question. This is how my own compliance finally got up to date.</p>
        </Section>

        <Section title={'"I don\'t know what I made last month"'}>
          <p>Tell your agent your sales and expenses as they happen, in your own words - "I withdrew R1,000 and spent it on this and this" - or photograph the slip. It records everything, asks you at the end of the day what you sold, and at the end of the week hands you an income and expense statement. Business money stops mixing with personal money, which is the most common place a small business quietly loses control.</p>
          <p>That has always mattered. Now it matters double.</p>
          <p>Banks are starting to use AI and behavioural data to assess some small loans. FNB's eWallet Cash Advance is one example, with offers subject to its qualifying criteria and affordability checks. That makes keeping a clear record worth doing, but it doesn't turn your banking behaviour into a guaranteed loan approval.</p>
          <p className="text-sm">Source: <a href={SOURCE} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Kasi Maverick — FNB enhances eWallet Cash Advance and introduces FNB Connect Prepaid Advance</a>.</p>
          <p>This is where the agent earns its keep as a coach, not just a bookkeeper. It reminds you to record the withdrawal and what it went on. It tells you to bank the R800 from today's sales - and what to write as the deposit reference. It keeps your business money separate so your record reads clean. Day by day it helps you build better money habits.</p>
          <p>The agent doesn't get you the loan. It helps you keep clearer records and build better money habits. The lender still decides.</p>
        </Section>

        <Section title={'"I keep missing opportunities"'}>
          <p>Funding and programmes get missed because nobody has time to look every day. An agent has nothing but time - it can scout LinkedIn daily for opportunities you'd qualify for and bring them to you.</p>
          <p>Build a funding template with it once and it writes every application off that after. You read, you say write that one, and it's drafted.</p>
        </Section>

        <Section title="Count those again">
          <p>Pricing analyst. Social media manager. Web developer. Compliance consultant. Bookkeeper. Funding writer. Salesperson.</p>
          <p>Seven jobs. In a formal business that's four to seven people and tens of thousands of rands a month. Most community entrepreneurs have none of them - which isn't a budgeting choice, it's why the business stays the size it is.</p>
          <p>One subscription covers all of it. That's the honest answer to "can I afford it." You're not buying software, you're buying the parts of a team you were never going to hire.</p>
        </Section>

        <Section title="And the judgement stays with you">
          <p>Across all of it the pattern is the same: the agent does the work, you make the call.</p>
          <p>It researches the price - you decide what your customer will pay. It writes the post - you decide whether that's how your business sounds. It fills the form - you sign it. It drafts the application - you know whether that funder is worth three weeks.</p>
          <p>People get this wrong in both directions. Some delegate nothing and stay buried. Others delegate the judgement too, and end up with a business that sounds like nobody and prices like a spreadsheet.</p>
          <p>The work is delegable. The judgement isn't. And none of it needs technical skill - you talk to it the way you'd talk to a person, in whatever language you're comfortable in. The barrier isn't skill, it's knowing what to hand over, and that's a business judgement you already have.</p>
        </Section>

        <Section title="How to start">
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong className="font-semibold text-foreground">Pick the job that eats your time.</strong> Follow-ups, expenses, weekly posts. The one you dread.</li>
            <li><strong className="font-semibold text-foreground">Write down how you do it now,</strong> in plain words. Or photograph the notebook and the slips.</li>
            <li><strong className="font-semibold text-foreground">It drafts, you approve.</strong> Every time, at the start.</li>
            <li><strong className="font-semibold text-foreground">Save your standards somewhere</strong> - branding, tone, templates - so you can point it back when it drifts.</li>
            <li><strong className="font-semibold text-foreground">When that job runs cleanly, add the next.</strong></li>
          </ol>
          <p>Not sure which job? <Link to="/diagnostic" className="text-primary hover:underline">The diagnostic</Link> takes four minutes and tells you whether admin is actually your bottleneck or whether you're about to automate the wrong thing. To set this up on your real business rather than a demo, that's <Link to="/entrepreneur-ai-journey" className="text-primary hover:underline">Session 4</Link>.</p>
        </Section>

        <Section title="Final word">
          <p>The entrepreneurs I work with aren't short of hustle, they're short of hours - the ones going into follow-ups nobody sends, records nobody keeps, posts nobody writes. An agent gives those back. It doesn't give back judgement, and it shouldn't. That part was always the job.</p>
        </Section>

        <hr className="mt-10 border-border" />
        <Section title="Frequently asked questions">
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