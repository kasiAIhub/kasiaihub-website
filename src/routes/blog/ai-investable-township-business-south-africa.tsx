import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/ai-investable-township-business-south-africa";
const TITLE =
  "How AI Makes a Community Business Investable | kasiAIhub";
const DESCRIPTION =
  "Most community businesses were started to survive, not to scale. Here's how AI closes the gap between a business that works and a business a funder can actually see.";
const PUBLISHED = "2026-07-08";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "Do I need to be registered before I can get any funding?",
    a: "Most formal funding channels require registration and tax compliance as a baseline. This is one of the most common reasons applications stall before the business itself is ever assessed.",
  },
  {
    q: "Is it worth applying for funding if my records are still informal?",
    a: "Usually not yet — and that is not a reason for discouragement. Incomplete documentation is one of the most consistently cited blockers in South African small business funding. Building the records first substantially changes the outcome.",
  },
  {
    q: "How long does it take to make a business investable?",
    a: "It depends where you are starting. A business already trading profitably with informal records is often closer than the owner assumes — the gap is documentation, not performance. A business still in survival mode should stabilise first.",
  },
  {
    q: "Can AI write my funding application for me?",
    a: "AI can structure and draft a proposal from your real business information, which removes a genuine barrier for people who know their business but have never written a formal proposal. The accuracy of your numbers and the substance of your plan remain yours.",
  },
];

export const Route = createFileRoute(
  "/blog/ai-investable-township-business-south-africa",
)({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
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
          headline: "How AI Makes a Community Business Investable",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          about:
            "Funding readiness and investability for South African community businesses",
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
            { "@type": "ListItem", position: 2, name: "Community Business Hub", item: "https://kasiaihub.com/blog/township-business-hub" },
            {
              "@type": "ListItem",
              position: 3,
              name: "How AI Makes a Community Business Investable",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: InvestableArticle,
});

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function InvestableArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">How AI Makes a Community Business Investable</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Funding · Investability
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            How AI Makes a Community Business Investable
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Most community businesses were not started to become investable. They were started to survive.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            That sentence explains more about South Africa's funding gap than any statistic. A woman starts cooking for events because her salary stopped covering the month. A man starts fixing cars in his yard because the factory closed. A creche opens because a mother in the street needed somewhere for her child while she worked, and the woman next door had a room.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            None of these businesses were designed. They were responses. And that is not a weakness — it is the most resourceful thing happening in this economy. But it creates a specific, fixable problem when the same business, five years later, is genuinely good, genuinely profitable, and completely unable to get funded.
          </p>
        </header>

        <Section id="legibility" title="The gap is not quality. It is legibility.">
          <p>Here is what the numbers say about businesses in this position.</p>
          <p>
            Roughly 70% operate without formal banking or credit facilities. Around 55% have had no formal financial management training. Between 70% and 80% are not formally registered. Only about 30% access formal financial services at all.
          </p>
          <p>
            Read those together and a pattern appears. This is not a picture of businesses that are failing. It is a picture of businesses that are <strong className="text-foreground">invisible to the systems that hand out money</strong>.
          </p>
          <p>
            A funder cannot fund what they cannot see. When a business's records live in the owner's head, its money moves through a personal account mixed with family expenses, its pricing is set by feel, and its customer history exists only as things the owner remembers — there is nothing for a funder to read. Not because the business is bad. Because the business is illegible.
          </p>
          <p>
            That distinction matters enormously, and almost nobody makes it. The conversation about community funding usually assumes the businesses aren't ready. Often they are more than ready. They are simply unreadable.
          </p>
        </Section>

        <Section id="four-questions" title="What funders are actually asking for">
          <p>Strip away the language and every funding application is asking four questions:</p>
          <p><strong className="text-foreground">Can I see your money?</strong> Not what you say you make — what can be verified. Consistent records, separated from personal and family money.</p>
          <p><strong className="text-foreground">Can I see your customers?</strong> Who buys, how often, whether they come back. Evidence of demand that exists outside the owner's memory.</p>
          <p><strong className="text-foreground">Can I see how this runs?</strong> Whether the business is a system that operates, or a person who works very hard. This is the question most community businesses fail, and it is rarely about capability.</p>
          <p><strong className="text-foreground">Can I see where the money goes?</strong> A specific, believable account of what funding would buy and what it would produce.</p>
          <p>
            None of these ask whether the entrepreneur is smart, hardworking, or good at what they do. All of them ask whether the business can be <em>observed</em>. That is a documentation problem wearing the costume of a readiness problem.
          </p>
        </Section>

        <Section id="usual-advice" title="Why the usual advice fails here">
          <p>
            The standard answer is: get registered, open a business account, keep records, write a business plan.
          </p>
          <p>
            It is correct advice, and it mostly does not happen. Not because entrepreneurs disagree with it, but because it asks a person already working fourteen-hour days to add an entirely separate job — administration — on top of running the business, with no immediate return. The registration takes weeks. The bookkeeping takes evenings. The business plan requires a skill nobody taught them. Meanwhile there is trading to do today.
          </p>
          <p>
            So it gets postponed, indefinitely, by people who fully intend to do it. And the business stays illegible for another year.
          </p>
          <p>
            This is the exact point where AI changes the equation — not by being clever, but by collapsing the cost of the admin that was always the barrier.
          </p>
        </Section>

        <Section id="fewer-tools" title="Fewer tools, used properly">
          <p>Before going further, one warning that matters more than any tool recommendation.</p>
          <p>
            The instinct when discovering AI is to collect. A tool for social media, a tool for invoicing, a tool for scheduling, a tool for design. Within a month there are eleven apps, three subscriptions, and no system — just more places for things to get lost.
          </p>
          <p>
            The entrepreneurs who actually change their businesses do the opposite. They pick two or three tools and go deep. Depth beats breadth here, badly. One AI assistant used properly every day will transform a business further than fifteen tools used once each.
          </p>
          <p>
            The goal is not to use AI. The goal is to make the business legible. AI is simply the cheapest way to do that now.
          </p>
        </Section>

        <Section id="four-things" title="What actually needs to exist">
          <p>
            Four things make a business readable to a funder. Each of them used to require either money or a lot of time. None of them do now.
          </p>
          <p>
            <strong className="text-foreground">A record of money that someone else can read.</strong> Not a full accounting system — a consistent daily record of what came in and what went out, in a form that can be shown to someone. Describing the day's sales and expenses in plain language and having that converted into a running record removes the barrier of needing to learn bookkeeping before you can start tracking anything.
          </p>
          <p>
            <strong className="text-foreground">A real price, built from real costs.</strong> Most community pricing is set by looking at what the next business charges. Working out the true cost of each item — materials, transport, and time — and setting price from that produces two things at once: better margins, and a number a funder can interrogate. "This is what it costs me and this is my margin" is a fundable sentence. "This is what everyone charges" is not.
          </p>
          <p>
            <strong className="text-foreground">A record of customers that exists outside your head.</strong> Who bought, when, what they spent. This is the evidence of demand that turns "business is good" into something a funder can verify. It also happens to be the thing that stops good customers quietly disappearing.
          </p>
          <p>
            <strong className="text-foreground">A written description of how the business runs.</strong> The workflow — what happens when an order comes in, who does what, what the steps are. This is the difference between a business and a job. It is also, not coincidentally, the thing that makes it possible to ever take a week off.
          </p>
          <p>
            Notice what all four have in common. None of them change what the business does. They change whether it can be seen.
          </p>
        </Section>

        <Section id="harder" title="The thing that makes this harder than it looks">
          <p>
            There is a reality here that most business advice steps around, and pretending it isn't there helps nobody.
          </p>
          <p>
            Community businesses are not just commercial entities. They are family survival systems and community institutions at the same time. The money in the business is often the money that handles a funeral, a school fee, a relative's emergency. Separating "business money" from "family money" is not a discipline problem to be solved with better habits. It is a structural conflict between what the business is for and what a funder expects it to be.
          </p>
          <p>This does not make the businesses less legitimate. It makes the standard advice incomplete.</p>
          <p>
            The practical path is not to pretend the obligations don't exist. It is to make them visible too — to have a business account and a defined amount that moves out of it, so that what remains is genuinely the business's, and the business's numbers mean something. The obligation is honoured. The books stay readable. Both things can be true, but only if the structure is deliberate rather than accidental.
          </p>
          <p>
            For a deeper look at practical financial separation, see our guide on{" "}
            <Link to="/blog/township-business-financial-management-south-africa" className="text-primary hover:underline">
              simple financial systems for cash-based businesses
            </Link>
            .
          </p>
        </Section>

        <Section id="sequence" title="From survival to system, honestly">
          <p>
            Not every business is at the same point, and treating them as if they are is how programmes fail.
          </p>
          <p>
            Roughly a third of the entrepreneurs we have worked with are genuinely growth-ready — viable, proven, and held back mainly by the absence of systems. A smaller group, under a fifth, are already succeeding and need networks and market access more than they need training. And a substantial group are still in survival, where talking about investability is premature and, honestly, a bit insulting. What they need first is stability: predictable income, separated money, a floor to stand on.
          </p>
          <p>
            The honest sequence is: survive, then systematise, then become investable. Skipping to step three because funding sounds exciting produces applications that get declined and entrepreneurs who conclude the system is closed to them.
          </p>
          <p>
            AI helps at every stage, but it helps differently. In survival, it is about seeing your numbers clearly enough to stop the leak. In systematising, it is about building the records and workflows that make the business run without you holding all of it. Only then does investability become a real conversation rather than an aspiration.
          </p>
          <p>
            If you're weighing what a funder will actually want to see, our guide on{" "}
            <Link to="/blog/township-business-funding-applications-south-africa" className="text-primary hover:underline">
              why funding applications get rejected in South Africa
            </Link>{" "}
            walks through the specifics.
          </p>
        </Section>

        <Section id="translation" title="What this actually looks like">
          <p>
            An entrepreneur who does this work does not end up with a more impressive business. They end up with the same business, described.
          </p>
          <p>
            They can say what they made last month and prove it. They can say what each thing they sell actually earns them. They can show that customers return. They can explain how the business runs without describing themselves. They can state what R50,000 would buy and what it would produce.
          </p>
          <p>
            That is not a transformation. It is a translation. The business was always real. Now it can be read.
          </p>
          <p>
            And a business that can be read can be funded, can be partnered with, can be sold into corporate supply chains, can be handed to someone else to run for a week. All the doors that were closed were closed by the same thing — not the quality of the business, but the impossibility of seeing inside it.
          </p>
        </Section>

        <Section id="kasiaihub" title="Where kasiAIhub fits">
          <p>
            This is precisely what the three sessions build.{" "}
            <Link to="/sessions/think-and-plan" className="text-primary hover:underline">Session 1</Link>{" "}
            produces the pricing model, the compliance position, and the workflow map — the foundations of a legible business. Session 2 turns that workflow into something that runs: a booking system, a lead capture flow, a way for the business to operate without the owner holding every part of it. Session 3 makes it visible to the outside world, including a funding proposal built from the entrepreneur's own real numbers.
          </p>
          <p>
            We are not teaching AI. We are using AI to build the four things a funder needs to see, in three days, with the entrepreneur doing the building.
          </p>
          <p>
            <Link
              to="/diagnostic"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              Take the free Business Diagnostic →
            </Link>{" "}
            <span className="block mt-2 text-sm">Find out which of the four is missing in your business, in about four minutes.</span>
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
          <p className="mt-8 text-sm italic">
            Sources: Heavy Chef Community Business Programme cohort data (Mamelodi and Tembisa); Standard Bank Community and Informal Economy Report (2025); Statistics South Africa Survey of Employers and the Self-Employed (2023); FinScope MSME South Africa (2024).
          </p>
        </Section>
              <TownshipStudyInvite />
      </article>
    </main>
  );
}
