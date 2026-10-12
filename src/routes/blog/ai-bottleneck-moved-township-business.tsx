import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/ai-bottleneck-moved-township-business";
const TITLE =
  "The Bottleneck Moved — And Most Businesses Haven't Noticed | kasiAIhub";
const DESCRIPTION =
  "The world's most famous mathematician just described a shift happening at the frontier of research. The same shift is happening in your business, and it changes what you should be worried about.";
const PUBLISHED = "2026-08-04";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "What was Terence Tao's talk actually about?",
    a: "Delivered at the International Congress of Mathematicians on 24 July 2026, it argued that AI is shifting mathematics from a period where proofs were scarce to one where they are abundant — and that this creates new problems around verifying, explaining and making sense of results, rather than solving all problems at once.",
  },
  {
    q: "Does this mean AI can now run a business on its own?",
    a: "No, and Tao's own framing is a useful check on that idea. He described AI as strong at generating results and improving at checking them, with later stages still requiring people. The same pattern applies in business: tools can build systems quickly, but deciding what to build, and whether the output is right for your market, remains yours.",
  },
  {
    q: "If building is now cheap, why do I need training at all?",
    a: "Because the constraint moved. When building was expensive, the skill worth having was access to someone who could build. Now that building is cheap, the skill worth having is knowing what to build first — which is a judgement about your specific business, not a technical skill.",
  },
];

export const Route = createFileRoute(
  "/blog/ai-bottleneck-moved-township-business",
)({
  head: () => ({
    meta: [
      { title: "The Bottleneck Moved, and Most Haven't Noticed" },
      { name: "description", content: "A famous mathematician described a shift at the frontier of research. The same shift is happening in your business, and it changes what to worry about." },
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
          headline: "The Bottleneck Moved — And Most Businesses Haven't Noticed",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          keywords:
            "AI business systems South Africa, why AI matters small business, community business technology adoption",
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
              name: "The Bottleneck Moved",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: BottleneckMovedArticle,
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

function BottleneckMovedArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">The Bottleneck Moved</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Perspective
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            The Bottleneck Moved — And Most Businesses Haven't Noticed
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            The world's most famous mathematician just described a shift
            happening at the frontier of research. The same shift is happening
            in your business, and it changes what you should be worried about.
          </p>
        </header>

        <section className="mt-12 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            On 24 July 2026, at the International Congress of Mathematicians in
            Philadelphia, Terence Tao gave a talk called "Mathematics in the Age
            of AI."
          </p>
          <p>
            Tao is a Fields Medallist and, by most accounts, the greatest living
            mathematician. When he speaks about the direction of his field, the
            field listens.
          </p>
          <p>
            He described an experiment called First Proof. Four AI systems were
            tested against ten novel research-level mathematics problems —
            genuinely new problems, under controlled conditions, in May 2026.
            Seven of the ten were solved at publication-level quality by at
            least one of the systems. Expert referees checked the results for
            correctness and for how well they were explained. The compute cost
            ranged from about ten to a thousand US dollars per problem.
          </p>
          <p>
            Then Tao said the thing that matters, and it wasn't "look what AI can
            do."
          </p>
          <p className="text-foreground font-medium">
            He said mathematics is moving from an era of proof scarcity to an era
            of proof abundance.
          </p>
          <p>
            For centuries, the hard part of mathematics was producing a proof.
            That was the bottleneck — the scarce thing, the reason a single
            result could make a career. Tao's argument is that this is ending.
            Proofs are becoming abundant. And when the scarce thing stops being
            scarce, the hard part moves somewhere else.
          </p>
          <p>
            In his framing, it moves to what comes after: verifying that a proof
            is actually correct, explaining it so others can use it, publishing
            it, and eventually settling it into the body of knowledge that gets
            taught. AI is strong at the first stage and improving at the second.
            The rest still needs people.
          </p>
          <p className="text-foreground font-medium">
            The bottleneck moved. It didn't disappear.
          </p>
        </section>

        <Section
          id="why-care"
          title="Why a community business owner should care about any of this"
        >
          <p>
            Because the same shift has already happened to you, and almost
            nobody has said it out loud.
          </p>
          <p>
            Think about what it used to take to get a booking system into a
            small business. You needed a developer. A developer cost more than
            the business made in a month, sometimes more than it made in a
            quarter. So you didn't get one. Not because you didn't want one, and
            not because you didn't understand what it would do — because the
            thing was scarce and it was priced for businesses much larger than
            yours.
          </p>
          <p>
            Same for a proper website. Same for a costing model built by someone
            who actually knew how to build one. Same for a customer database.
            Same for a designed brand.
          </p>
          <p>
            All of it was scarce. All of it was expensive. And the constraint on
            your business was straightforward:{" "}
            <span className="text-foreground font-medium">
              you could not get these things built.
            </span>
          </p>
          <p>That constraint is gone.</p>
          <p>
            Not "getting easier." Gone. A working booking system can now be
            built in an afternoon by the person who will use it, with no code,
            for a fraction of what it cost two years ago. Building has become
            abundant, in exactly the way Tao says proofs have become abundant.
          </p>
        </Section>

        <Section id="hard-part" title="So what's the hard part now?">
          <p>
            Here is where the parallel gets useful, and slightly uncomfortable.
          </p>
          <p>
            When Tao says proofs will be abundant, he isn't celebrating. Most of
            his talk is about the problem this creates. If AI can generate more
            proofs than mathematicians can check, then the scarce thing becomes{" "}
            <span className="text-foreground font-medium">
              verification and judgement
            </span>{" "}
            — knowing which results matter, whether they're actually right, and
            what to do with them.
          </p>
          <p>Abundance doesn't remove the hard problem. It relocates it.</p>
          <p>
            For your business, the hard problem has relocated in exactly the same
            way. It is no longer <em>can this be built.</em> It is:
          </p>
          <p className="text-foreground font-semibold text-lg">
            Which one should you build first?
          </p>
          <p>
            Because you can now build all of it, and you still only have so many
            hours. A business owner who builds a beautiful website while their
            real leak is enquiries going unanswered for six hours has built
            something abundant and solved nothing. The website works. The
            business doesn't improve. Effort was spent, and the actual constraint
            is untouched.
          </p>
          <p>
            This is the failure we see most often. Not businesses that can't
            build. Businesses that build the wrong thing well, then conclude that
            the technology doesn't work for businesses like theirs. It's the same
            reason we're careful about what{" "}
            <Link
              to="/blog/ai-agents-township-business-south-africa"
              className="text-primary hover:underline"
            >
              AI agents can and can't actually do
            </Link>{" "}
            today.
          </p>
        </Section>

        <Section id="cheap-not-free" title="Cheap doesn't mean free">
          <p>
            There's a second thing worth taking from Tao's talk, and it's the
            part most coverage skipped.
          </p>
          <p>
            He didn't say AI has solved mathematics. He said it's strong at one
            stage, improving at another, and that the remaining stages need
            people. The judgement didn't get automated. The responsibility didn't
            move.
          </p>
          <p>
            The same holds here. AI will build you a pricing model in twenty
            minutes. It cannot tell you whether the number is one your customers
            will actually pay, or whether the supplier you're costing against is
            about to raise prices, or whether the neighbour undercutting you is
            running at a loss and won't last the year.
          </p>
          <p>
            That knowledge is yours. It always was. The tools have become
            abundant; your judgement hasn't, and it's now the scarcer half of the
            pair. That's the argument we make at length in{" "}
            <Link
              to="/blog/ai-plus-kasi-wisdom-township-business"
              className="text-primary hover:underline"
            >
              AI plus kasi wisdom
            </Link>
            .
          </p>
        </Section>

        <Section
          id="next-six-months"
          title="What this actually means for the next six months"
        >
          <p>
            If you take one thing from a Fields Medallist's assessment of his own
            field, take this:
          </p>
          <p className="text-foreground font-medium">
            Stop asking whether you can build it. Start asking what to build
            first.
          </p>
          <p>
            The answer is rarely the thing that feels most urgent, and it's
            rarely the thing that would look most impressive. It's almost always
            the thing quietly costing you the most money right now — which, for
            most businesses, is not the absence of a website. It's enquiries that
            go unanswered, money owed that never gets chased, and prices set by
            feel rather than by cost.
          </p>
          <p>Those are unglamorous. They're also where the money is.</p>
        </Section>

        <Section id="one-question" title="The one question worth answering">
          <p>
            Tao's whole argument rests on a shift in what's scarce. In
            mathematics, generating proofs was scarce and became abundant. In
            small business, building systems was scarce and became abundant.
          </p>
          <p>
            In both cases, what became scarce instead is{" "}
            <span className="text-foreground font-medium">
              knowing which of the many things you could now do is the one that
              matters.
            </span>
          </p>
          <p>
            That's the entire reason our Business Diagnostic exists. Not to tell
            you AI can help — you already suspect that. To tell you,
            specifically, for your business, which three systems to build and in
            what order. Because in a world where you can build almost anything,
            building in the wrong order is the expensive mistake.
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
          Congress of Mathematicians, Philadelphia, 24 July 2026; First Proof
          benchmark results, May 2026.
        </p>

        <TownshipStudyInvite />
      </article>
    </main>
  );
}
