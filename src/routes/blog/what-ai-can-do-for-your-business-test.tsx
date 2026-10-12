import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/what-ai-can-do-for-your-business-test";
const TITLE =
  "What AI Can and Can't Do For Your Business — And How to Tell | kasiAIhub";
const DESCRIPTION =
  "AI is brilliant at some things and useless at others, and the pattern isn't random. One simple test sorts your work into what you can hand over and what will always be yours.";
const PUBLISHED = "2026-08-03";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "How do I know if a task is one AI can handle?",
    a: "Ask whether a machine could check the answer. If a right answer can be verified — a calculation, a draft, a form, a booking — it is well suited. If the answer depends on judgement about a specific person or situation, it is not.",
  },
  {
    q: "Will AI eventually be able to make these judgement calls too?",
    a: "There is no current method for training a system on questions that have no checkable answer, which is why capability has advanced so unevenly. Whether that changes is genuinely uncertain — but for the decisions described here, treating them as yours is the sensible working assumption.",
  },
  {
    q: "Does using AI for the routine work mean losing the personal touch?",
    a: "The opposite is the point. Handing over checkable work is what leaves room for the relationship-based judgement that only the owner can provide — the part of the business that customers actually notice.",
  },
  {
    q: "Where should a business start?",
    a: "With whichever checkable task is currently costing the most. For most small businesses that is unanswered enquiries, uncollected money, or pricing set by guesswork rather than by cost.",
  },
];

export const Route = createFileRoute(
  "/blog/what-ai-can-do-for-your-business-test",
)({
  head: () => ({
    meta: [
      { title: "What AI Can and Can't Do For Your Business | kasiAIhub" },
      { name: "description", content: "AI is brilliant at some things and useless at others, and the pattern isn't random. One simple test sorts what you can hand over from what stays yours." },
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
          headline:
            "What AI Can and Can't Do For Your Business — And How to Tell",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          keywords:
            "what can AI do for my business, what AI cannot do, will AI replace my job South Africa, AI limitations small business",
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
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://kasiaihub.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Community Business Hub",
              item: "https://kasiaihub.com/blog/township-business-hub",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "What AI Can and Can't Do For Your Business",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: WhatAiCanDoArticle,
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

function DiagnosticCta({ label }: { label: string }) {
  return (
    <p className="mt-6">
      <Link
        to="/diagnostic"
        className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
      >
        {label}
      </Link>
    </p>
  );
}

const canCheck = [
  "Working out what a job actually costs you, once you list the inputs",
  "Writing an invoice or a quote from figures you supply",
  "Checking whether your paperwork covers what your sector requires",
  "Drafting a customer message, a post, a description",
  "Building a booking form, a website, a record sheet",
  "Sorting a list, spotting a duplicate, adding up a month",
];

const cannotCheck = [
  "Whether this customer is going through something and deserves patience",
  "Whether the person undercutting you down the road will still be trading next year",
  "Who to trust with your keys, your money, your name",
  "When to say no to work you could take but shouldn't",
  "What this business is for, and whether you still want to be doing it in five years",
];

function WhatAiCanDoArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">
            What AI Can and Can't Do For Your Business
          </span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            AI Basics
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            What AI Can and Can't Do For Your Business — And How to Tell
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            AI is brilliant at some things and useless at others, and the pattern
            isn't random. One simple test sorts your work into what you can hand
            over and what will always be yours.
          </p>
        </header>

        <section className="mt-12 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Every entrepreneur who starts using AI runs into the same confusion.
          </p>
          <p>
            It writes a customer message in four seconds that would have taken
            you twenty minutes. Then you ask it something about your own business
            and it gives you a confident answer that's completely wrong. It
            builds you a working booking system in an afternoon, then tells you a
            supplier is reliable when you know for a fact they've let three
            people down this year.
          </p>
          <p>So which is it? Is this thing brilliant or is it useless?</p>
          <p>
            It's both, and the pattern is not random. Once you see what decides
            it, you can sort your own work in about ten minutes and know exactly
            what to hand over.
          </p>
        </section>

        <Section
          id="why-uneven"
          title="Why AI got so good at some things and not others"
        >
          <p>Here's the part almost nobody explains.</p>
          <p>
            When these tools are trained, one of the most powerful methods used is
            to set them loose on problems where{" "}
            <span className="text-foreground font-medium">
              a machine can check whether the answer is right.
            </span>
          </p>
          <p>
            Think about what that means. The system attempts a problem. Something
            automatically checks the attempt. Wrong — try again. Still wrong —
            try again. Right — remember what worked. No human needed anywhere in
            that loop. It can do this millions of times.
          </p>
          <p>
            Mathematics works like this: a proof either holds or it doesn't, and
            that can be checked. Code works like this: it either runs and does
            the job, or it doesn't. So these tools have been through an
            extraordinary amount of practice on exactly that kind of problem —
            and it shows. In one controlled test reported by the mathematician
            Terence Tao in July 2026, four AI systems were set ten genuinely new
            research-level mathematics problems, and seven of the ten were solved
            to publication standard by at least one of them.
          </p>
          <p>Now think about what has no such loop.</p>
          <p>
            Whether to give a customer another two weeks to pay. Whether your
            cousin is the right person to leave the shop with. Whether to take an
            order you're not sure you can deliver well. There is no machine
            anywhere that can check those answers, so no system has ever
            practised them. Not once.
          </p>
          <p>
            <span className="text-foreground font-medium">
              That's the whole pattern.
            </span>{" "}
            Not intelligence. Not how advanced the model is. Whether the work is
            the kind a machine can mark.
          </p>
        </Section>

        <Section id="the-test" title="The test">
          <p>Take any task in your business and ask one question:</p>
          <blockquote className="border-l-2 border-primary pl-4 text-lg font-semibold text-foreground">
            Could a machine tell whether it got this right?
          </blockquote>
          <p>That's it. That single question sorts almost everything.</p>
          <p>
            <span className="text-foreground font-medium">
              If the answer is yes,
            </span>{" "}
            this is work AI does well — often better and faster than you, and
            often well enough that you should stop doing it by hand.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            {canCheck.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <span className="text-foreground font-medium">
              If the answer is no,
            </span>{" "}
            this is yours, and it is going to stay yours.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            {cannotCheck.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Nothing is coming for the second list. Not this year, not with a
            bigger model. There is no way to practise those, because there is
            nothing to check them against. It's also why we're honest about what{" "}
            <Link
              to="/blog/ai-agents-township-business-south-africa"
              className="text-primary hover:underline"
            >
              AI agents can actually do today
            </Link>
            .
          </p>
        </Section>

        <Section
          id="your-week"
          title="What this means for how you spend your week"
        >
          <p>Look at where your hours actually go.</p>
          <p>
            For most business owners we work with, the honest answer is that the
            majority of the week is spent on the first list. Writing the same
            message again. Working out a price by feel because there's no time to
            do it properly. Chasing a payment. Trying to remember who hasn't been
            back. Redoing paperwork that got lost.
          </p>
          <p>
            All of that is checkable work. All of it can be handed over.
          </p>
          <p>
            And every hour spent on it is an hour not spent on the second list —
            which is where the actual value of you being the owner sits. Nobody
            else can decide who to trust, which order to take, or what this
            business is becoming. You are the only person who can do that, and it
            is currently competing for your attention with sending the same
            WhatsApp for the ninth time.
          </p>
          <p>That's the real cost. Not the hours. What the hours are being taken from.</p>
        </Section>

        <Section id="pride" title="A word about pride, honestly">
          <p>
            Some of what's on the first list is work people take real pride in.
            Knowing every customer's order by heart. Keeping the books by hand,
            neatly, for years. Remembering it all without writing anything down.
          </p>
          <p>
            That pride is earned, and it's not what we're asking anyone to give
            up.
          </p>
          <p>
            But it's worth separating two things. There's pride in{" "}
            <em>knowing your customers</em> — which is the second list, which is
            irreplaceable, and which is what actually built the business. And
            there's pride in <em>carrying every detail in your head</em> — which
            is the first list, and which is a load you took on because there was
            never another option.
          </p>
          <p>
            The first one is who you are. The second one is a burden that looked
            like a skill because you had no alternative. Putting the burden down
            doesn't cost you the first thing. It protects it, by leaving you the
            room to keep doing it as the business grows. We wrote about that
            trade-off in{" "}
            <Link
              to="/blog/ai-plus-kasi-wisdom-township-business"
              className="text-primary hover:underline"
            >
              AI plus kasi wisdom
            </Link>
            .
          </p>
        </Section>

        <Section id="monday" title="Where to start on Monday">
          <p>Take a piece of paper. Two columns.</p>
          <p>
            On the left, write down everything you did last week that a machine
            could have checked. Prices worked out, messages written, records
            updated, paperwork filed, the same question answered for the fifth
            time.
          </p>
          <p>
            On the right, write down everything you did that only you could have
            decided.
          </p>
          <p>
            Look at the two lists. If the left one is longer — and it almost
            always is — you now know exactly where to start, and you know it from
            your own week rather than from anyone's advice.
          </p>
          <p>
            Then pick the single most expensive thing on the left, and hand that
            one over first.
          </p>
        </Section>

        <Section
          id="underneath"
          title="The question underneath the question"
        >
          <p>There's a version of this that's worth sitting with.</p>
          <p>
            If the machine takes the checkable work, what's left is the work that
            requires judgement about people, risk, timing and trust. That's
            harder work than sending invoices. It's also the work that was always
            the point of running your own business, and the reason you started
            rather than taking a job.
          </p>
          <p>
            The tools didn't take your craft. They're handing back the part of it
            you never had time for.
          </p>
          <p className="border-l-2 border-primary pl-4 text-sm italic">
            Once you've written those two lists, a second question tends to
            follow: which column are my children being prepared for? That one is
            answered separately —{" "}
            <Link
              to="/blog/what-to-teach-children-age-of-ai"
              className="text-primary hover:underline"
            >
              What Should I Teach My Children in the Age of AI?
            </Link>
          </p>
          <DiagnosticCta label="What kind of business system do you need — free, 4 min →" />
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
        </Section>

        <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          Sources: Terence Tao, "Mathematics in the Age of AI," International
          Congress of Mathematicians, 24 July 2026; First Proof benchmark
          results, May 2026. Jensen Huang, interviewed on the{" "}
          <em>A Bit Personal</em> podcast with Jodi Shelton, reported January
          2026.
        </p>

        <TownshipStudyInvite />
      </article>
    </main>
  );
}
