import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://kasiaihub.com/faq";
const TITLE = "Frequently Asked Questions | kasiAIhub";
const DESCRIPTION =
  "Straight answers about what we build, how a project works, what it costs and what you end up with.";

type QA = { q: string; a: string };
type Section = { heading: string; items: QA[] };

const sections: Section[] = [
  {
    heading: "About kasiAIhub",
    items: [
      {
        q: "What does kasiAIhub do?",
        a: "We build working business systems with community entrepreneurs and small businesses: online ordering, booking and queues, learning tools and a free business diagnostic. You build it with us, and you learn by building it. We are a Lovable Expert Partner, certified in website and app building. You can see what we have built: Kasi Move (zero-commission online ordering for food vendors), Crowned (a booking and live-queue app for children's braiding salons, demo salon: Zama's Braids), mypsquared (personalised weekly lesson plans on WhatsApp, with a DBE registration form) and the Business Check on this website.",
      },
      {
        q: "Who runs kasiAIhub?",
        a: "kasiAIhub is founded and run by Tsholo Monyausi. Her method has never changed in 20 years: people learn by building the thing themselves. For 20 years she designed and delivered entrepreneurship programmes for South African small businesses, including SETA and government-funded programmes through Boago Learning Solutions. For the last two years she has facilitated community entrepreneurship programmes run by others, including a ten-week programme in Mamelodi and Tembisa run by Heavy Chef, where she was hired to facilitate, not to design. What has changed is what gets built. Today it is a working system for your business, not a plan on paper.",
      },
      {
        q: "How does a project work?",
        a: "You build. We guide. We start with your business and the one problem that holds it back. Over three days you build a working system for your business, with us next to you at every step. You keep building after the three days, and we support you for a month on WhatsApp. At the end you know how it works, because you built it.",
      },
      {
        q: "Is this right for my business?",
        a: "It is for businesses that are already trading: already serving customers, already earning something. It is less useful if you have not started trading yet (there is no real data to build around), if your main constraint is capital rather than organisation, or if your income is so unpredictable that three days away would put the business at risk. None of those mean never. They mean not yet.",
      },
      {
        q: "What kind of system can we build?",
        a: "Depending on your business: a website or landing page, an online ordering or booking flow, a lead-capture form, a customer-record system or a follow-up tracker. We choose the one that fixes your biggest problem first.",
      },
      {
        q: "Which of your products use AI?",
        a: "Two of them. The Business Check scores your answers with fixed rules, and an AI model writes the personalised opening of your report. The DBE registration form in mypsquared collects a parent's and learner's details and uses an AI integration to draft the motivation letter for studying at home. Kasi Move and Crowned are software products and do not contain AI. We use AI tools to help us build, and we say so plainly.",
      },
      {
        q: "Do I need to know about AI, or be good with technology?",
        a: "No. You are building a working system, not studying AI. Most owners have used AI once or twice, if at all, and we start wherever you are. You are guided step by step, and we explain what is built, why, and how you use it.",
      },
      {
        q: "Do you work outside South Africa?",
        a: "Yes. We work online with clients anywhere. The three-day builds run in person in South Africa.",
      },
    ],
  },
  {
    heading: "Cost and what's included",
    items: [
      {
        q: "How much does it cost?",
        a: "R4,000 for the full three-day build, with one month of WhatsApp support afterwards. Day 1 on its own is R1,500.",
      },
      {
        q: "What's included?",
        a: "Three days of building a working system with us guiding you, a clear handover so you can run it, and one month of WhatsApp support. Where a tool subscription is needed for what we build, the first month is included.",
      },
      {
        q: "How are the days arranged?",
        a: "In small groups of up to 8 owners. Each owner builds their own system. When at least 6 owners have chosen the same week, the group is confirmed and you are messaged the date. Days run Tuesday to Thursday.",
      },
      {
        q: "What if the group doesn't fill?",
        a: "If a week hasn't reached 6 owners within two weeks, we run it with whoever has committed.",
      },
      {
        q: "Can I get a refund or move to another date?",
        a: "Yes: a full refund or another date, whichever suits you.",
      },
      {
        q: "Is it in person or online?",
        a: "In person, in groups of up to 8.",
      },
      {
        q: "What languages are the days run in?",
        a: "English is the main language, with support in other South African languages where it helps.",
      },
      {
        q: "What do I walk away with?",
        a: "A working system built around your business, a handover so you can use it, and a month of support. Not notes and not a certificate.",
      },
    ],
  },
];

const allItems: QA[] = sections.flatMap((s) => s.items);

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
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
          "@type": "FAQPage",
          mainEntity: allItems.map((f) => ({
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
            { "@type": "ListItem", position: 2, name: "FAQ", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">FAQ</span>
        </nav>

        <header>
          <p className="text-xs uppercase tracking-widest text-primary">Frequently asked</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Straight answers about what we build, how a project works, what it costs and what you
            end up with.
          </p>
        </header>

        <div className="mt-12 space-y-14">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-6">
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-lg border border-border bg-black/20 p-5 open:border-primary/50"
                  >
                    <summary className="cursor-pointer list-none text-base md:text-lg font-semibold text-foreground flex items-start justify-between gap-4">
                      <span>{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-primary transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-primary/40 bg-black/40 p-6 md:p-8">
          <p className="text-base text-foreground/90">
            Still have a question? The fastest way is a quick WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://wa.me/27818905861"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-black px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Message on WhatsApp
            </a>
            <Link
              to="/"
              hash="systems"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:opacity-90"
            >
              See what we&apos;ve built
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
