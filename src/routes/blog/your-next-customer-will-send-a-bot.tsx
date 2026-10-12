import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const CANONICAL = "https://kasiaihub.com/blog/your-next-customer-will-send-a-bot";
const TITLE = "Your Next Customer Might Not Visit Your Website. They Will Send a Bot.";
const DESCRIPTION = "Your customer's agent needs facts it can find: prices, hours, availability and how to order. Four practical fixes for a community business.";
const DATE = "2026-10-09";

const faq = [
  {
    q: 'What does it mean for a business to be "AI readable"?',
    a: "It means an AI assistant can find your key facts - what you sell, your prices, your area, your hours, how to order - stated consistently where the assistant can access them. Text is a useful starting point. Assistants with image or voice support can also understand material sent directly to them, but that doesn't make a private WhatsApp status discoverable.",
  },
  {
    q: "Can I pay ChatGPT or Gemini to recommend my business?",
    a: "No. ChatGPT runs labelled ads below answers and says advertisers can't change the answer or their ranking. These systems reward information they can read clearly, not payment for placement.",
  },
  {
    q: "Do I need a website to be found by AI assistants?",
    a: "It helps, but the first step is consistency: the same business name, services, area, prices and contact details across every profile you already have.",
  },
  {
    q: "Why do my prices need to be public?",
    a: 'An assistant comparing options skips a business whose price it can\'t find. "DM for price" is effectively invisible to a bot. A from-price or a range is enough.',
  },
  {
    q: "Should I be building for WebMCP or agent payment standards now?",
    a: "No. Those are early and aimed at large platforms. Get your facts consistent, your prices visible and your bots unblocked. If you sell through a platform, the rest will arrive as a setting.",
  },
];

const sources = [
  { label: "Cloudflare - pay per crawl", url: "https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/" },
  { label: "AWS - AI traffic monetization", url: "https://aws.amazon.com/about-aws/whats-new/2026/06/aws-waf-ai-traffic-monetization/" },
  { label: "OpenAI - image inputs", url: "https://help.openai.com/en/articles/8400551-chatgpt-image-inputs-faq" },
  { label: "OpenAI - ChatGPT capabilities", url: "https://help.openai.com/en/articles/9260256-chatgpt-capabilities-overview" },
  { label: "OpenAI - ads in ChatGPT", url: "https://help.openai.com/en/articles/20001047-ads-in-chatgpt" },
  { label: "OpenAI - buy it in ChatGPT", url: "https://openai.com/index/buy-it-in-chatgpt/" },
  { label: "Search Engine Land - ChatGPT checkout change", url: "https://searchengineland.com/chatgpt-instant-checkout-plan-change-471033" },
  { label: "Google - Universal Commerce Protocol", url: "https://developers.google.com/merchant/ucp" },
  { label: "Chrome - WebMCP", url: "https://developer.chrome.com/docs/ai/webmcp" },
  { label: "Google Cloud - AP2 payments protocol", url: "https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol" },
  { label: "Visa - Trusted Agent Protocol", url: "https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/default.aspx" },
];

export const Route = createFileRoute("/blog/your-next-customer-will-send-a-bot")({
  head: () => ({
    meta: [
      { title: "Your Next Customer Might Send a Bot, Not Visit" },
      { name: "description", content: DESCRIPTION },
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
          citation: sources.map((source) => source.url),
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
  component: CustomerBotArticle,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function CustomerBotArticle() {
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
          <p>The first two pieces were about <Link to="/blog/run-your-back-office-with-an-ai-agent" className="text-primary hover:underline">running your own business with one</Link> of these agents, and <Link to="/blog/what-an-ai-agent-does-for-a-community-business" className="text-primary hover:underline">what it does for a business like yours</Link>.</p>
          <p>Now the other side.</p>
          <p>Someone arrives in Soweto for the weekend. They want a kota and they don't know who sells the best one. They don't open five websites. They open the agent on their phone and say: <em>"Find me the best kota within five kilometres, show me the prices, and recommend one."</em></p>
          <p>The agent goes and looks. It reads, it compares, it comes back with a recommendation and a price.</p>
          <p>Now think about the shop that gets skipped. Its kota is better. Its prices are on a photo of a handwritten board, posted to a WhatsApp status three weeks ago. An agent can read a photo sent directly to it. But it can't go and find an old WhatsApp status. So it moves on to the shop whose prices it can actually find.</p>
          <p>That's the whole article. The customer didn't reject you. She never saw you.</p>
        </section>

        <Section title="Two things worth knowing">
          <p>Platforms are starting to treat bot access as something with rules - Cloudflare and Amazon both now let site owners charge AI crawlers or turn them away, which tells you your information has value to bots and the terms are being set right now.</p>
          <p>And the recommendation itself is not for sale. People ask me this constantly: can I pay ChatGPT to recommend my business? No. Ads sit below the answer and are labelled, and advertisers can't change the answer. What these systems reward is information they can read clearly. (Links in the sources below if you want the detail.)</p>
        </Section>

        <Section title="Who pays depends on the platform.">
          <p>This is the part people get wrong, so be clear on it.</p>
          <p>Some assistants have free access; some charge a subscription. Some platforms charge merchants a transaction fee; others use a different model. There isn't one rule that says shopping is free or that the merchant always pays.</p>
          <p>With ads you pay to be seen and hope. Where a platform charges only on a completed sale, you pay when business arrives. Check the terms of the platform you're using.</p>
        </Section>

        <Section title="WhatsApp-first businesses are already half-prepared">
          <p>Here's the thing that surprised me.</p>
          <p>Most community businesses run on WhatsApp. For years that's been treated as the thing holding them back - no website, no system, just a phone. But the agents are coming for the channels people actually use, and WhatsApp is one of them.</p>
          <p>So the channel isn't the problem. The gap is narrower than that: <strong className="font-semibold text-foreground">can an agent find your facts, and read them clearly?</strong> A price typed in a public listing, yes. A picture of a chalkboard or a voice note sent directly to an assistant that supports them, yes. An old WhatsApp status it can't access, no. Your head, no.</p>
          <p>You're not starting from behind. You're starting from one step away.</p>
        </Section>

        <Section title="The four things to fix this month">
          <p>None of this needs a developer.</p>
          <p><strong className="font-semibold text-foreground">1. Say the same thing everywhere.</strong> One name, one set of services, one area, one number - identical on your Facebook page, your Google listing, your WhatsApp Business profile and your website. An agent comparing three versions of your business treats you as unreliable, or as three different shops.</p>
          <p><strong className="font-semibold text-foreground">2. Write your prices down.</strong> In text. Photos and voice notes can be understood when someone sends them directly to an assistant that supports them. But for a customer comparing shops, typed prices in an accessible listing are easier to find than "DM for price". Our kota seller doesn't need a website. He needs "Kota R35, Full house R55" typed into his WhatsApp Business catalogue and his Google listing. That's it.</p>
          <p><strong className="font-semibold text-foreground">3. Check that good bots aren't blocked.</strong> If you have a website, many of them block every bot by accident through a file called robots.txt or a security setting nobody revisited. One question to whoever built it.</p>
          <p><strong className="font-semibold text-foreground">4. Keep your hours and availability current.</strong> An agent that sends a customer to a closed shop stops sending them.</p>
          <p>Four things you can start yourself. The tools you choose, or help you need, may cost money.</p>
        </Section>

        <Section title="What's next, and what to ignore">
          <p>The next real rung is a product feed - a structured list of what you sell with prices and availability, which shopping assistants read. Google Merchant Center is the route in.</p>
          <p>Everything above that - agents that book, agents that pay, systems that verify an agent is legitimate - is being built for large platforms, and if you sell through one it will mostly arrive as a setting to switch on. Your job is to have the facts ready for the day the switch appears.</p>
        </Section>

        <Section title="The big idea">
          <p>First the bot runs your business. Then your customer's bot comes shopping.</p>
          <p>The businesses that win this won't be the loudest. They'll be the clearest. And right now, you can start being clearer without buying ads or hiring an agency. That doesn't guarantee a recommendation. It gives an agent facts it can find and compare. Your facts, typed out, in the same words everywhere.</p>
          <p>That window won't stay open forever. It's open now.</p>
          <p>So: if someone standing in your street asked their agent for the best kota nearby, would it find you? Or are your prices still sitting in an old WhatsApp status nobody can find?</p>
          <p>Not sure where to start? <Link to="/diagnostic" className="text-primary hover:underline">The diagnostic</Link> takes four minutes. To set this up properly on your real business, that's <Link to="/entrepreneur-ai-journey" className="text-primary hover:underline">Session 4</Link>.</p>
        </Section>

        <hr className="mt-10 border-border" />
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
        <Section title="Sources">
          <ul className="list-disc pl-6 space-y-2">
            {sources.map((source) => (
              <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{source.label}</a></li>
            ))}
          </ul>
          <p><em>Standards in this space are moving fast - Cloudflare's pay per crawl is in beta, ChatGPT's ads began as a US test, and WebMCP is still a proposal. Check the links before you act on any of it.</em></p>
        </Section>
        <hr className="mt-10 border-border" />
      </article>
    </main>
  );
}