import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL = "https://kasiaihub.com/blog/what-to-teach-children-age-of-ai";
const TITLE =
  "How Micro-Schools Will Flourish in the Age of AI | kasiAIhub";
const DESCRIPTION =
  "Why micro-schools are about to grow fast in South Africa, and how AI makes personalised, child-led education practical at small scale — from an entrepreneur already building both.";
const PUBLISHED = "2026-08-05";
const UPDATED = "2026-08-05";
const DATE_LABEL = "Published 5 August 2026";
const DATE_ISO = "2026-08-05";

const faq = [
  {
    q: "Should children still learn to code?",
    a: "As a way of understanding how systems work and how to think in steps, yes. As a career guarantee, no — software engineering was among the first areas AI absorbed, so it should be taught as a way of thinking rather than as a destination.",
  },
  {
    q: "What skills actually hold their value in the age of AI?",
    a: "Judgement about people and situations: knowing what question is worth asking, reading someone accurately, deciding what is worth doing, and being trustworthy. These have no checkable right answer, which is why no system has been able to practise them.",
  },
  {
    q: "Are micro schools realistic in a community context?",
    a: "The main historical barrier to personalised education was the cost of one adult per small group of children. That barrier has not disappeared, but a significant part of what made it unworkable at small scale — planning, material preparation, differentiating for each learner, administration — is now substantially cheaper. A room, a few children, an attentive adult and access to tools is a lower bar than it was five years ago.",
  },
  {
    q: "Should children be allowed to use AI for schoolwork?",
    a: "Banning it prepares them for a world that no longer exists. The more useful approach is supervised use with a strict habit of verification — never accepting an output because a machine produced it.",
  },
];

export const Route = createFileRoute("/blog/what-to-teach-children-age-of-ai")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "Why micro-schools are about to grow fast in South Africa, and how AI makes personalised, child-led learning practical at small scale." },
      { name: "author", content: "Tsholo Monyausi" },
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
          headline: "How Micro-Schools Will Flourish in the Age of AI",
          description: DESCRIPTION,
          author: {
            "@type": "Person",
            name: "Tsholo Monyausi",
            jobTitle: "Founder, kasiAIhub and P-Squared",
          },
          publisher: {
            "@type": "Organization",
            name: "kasiAIhub",
            url: "https://kasiaihub.com/",
          },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          keywords:
            "what to teach children about AI, how to prepare children for AI future, micro schools South Africa, personalised learning AI, education in the age of AI",
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
              name: "How Micro-Schools Will Flourish in the Age of AI",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: TeachChildrenArticle,
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

function TeachChildrenArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">How Micro-Schools Will Flourish in the Age of AI</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">Essay</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            How Micro-Schools Will Flourish in the Age of AI
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            <time dateTime={DATE_ISO}>{DATE_LABEL}</time>
          </p>
          <h2 className="mt-6 text-lg md:text-xl font-medium text-muted-foreground leading-relaxed">
            What should we teach our children in the age of AI? An entrepreneur
            and homeschooling mother on what still holds its value, why
            micro-schools are coming, and what she is actually teaching her two
            sons.
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-semibold text-foreground">
              By Tsholo Monyausi
            </span>
            <span className="text-muted-foreground">
              · Founder, kasiAIhub and P-Squared
            </span>
          </div>
        </header>

        <section className="mt-12 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            I have two boys. They are ten, both in Grade 4, and I teach them at
            home.
          </p>
          <p>
            I also spend my working life with entrepreneurs, watching which
            businesses adapt and which ones get overtaken. So I end up looking at
            my sons' education the way I look at a business: what is this
            actually for, what has changed in the market, and what am I building
            toward that will still be standing in fifteen years?
          </p>
          <p>
            That is not a comfortable way to think about your own children. It
            is, I've decided, the honest one.
          </p>
          <p>
            For a long time I answered the question the way most parents do. Get
            the basics right. Push maths. Steer them toward something technical,
            because that's where the work is going to be.
          </p>
          <p>I've had to revise that, and this is what changed my mind.</p>
        </section>

        <Section
          id="out-of-date"
          title="The advice I was giving was already out of date"
        >
          <p>
            In July 2026, the mathematician Terence Tao described an experiment
            in which four AI systems were given ten genuinely new research-level
            mathematics problems. Seven of the ten were solved to publication
            standard by at least one of them, checked by expert referees.
          </p>
          <p>
            Not exam questions. Not problems with answers in the back of a book.
            New ones.
          </p>
          <p>
            Around the same time, Jensen Huang — chief executive of Nvidia, the
            company whose chips most of this technology runs on — was asked in a
            podcast interview who the smartest person he had ever met was. He
            said he couldn't answer, and explained why. What most people call
            intelligence, technical problem-solving, is becoming a commodity, and
            it is the part AI handles most easily. Software engineering, he
            pointed out, was supposed to be the ultimate proof of a sharp mind.
            It was among the first things to fall.
          </p>
          <p>
            "Learn to code" was good advice for about fifteen years. It is now
            advice to compete directly with the thing that does it faster,
            cheaper, and without getting tired.
          </p>
          <p>
            That doesn't mean don't teach it. It means stop treating it as the
            destination.
          </p>
        </Section>

        <Section
          id="holds-value"
          title="What Huang says holds its value instead"
        >
          <p>
            His own definition of smart is someone technically capable who also
            carries real empathy, and who can read what has not been said out
            loud. "People who are able to see around corners," as he put it —
            someone who senses a problem before it arrives, because they can feel
            the vibe in a room.
          </p>
          <p>
            That instinct, he said, comes from a combination of analysis, first
            principles, life experience, wisdom, and reading other people.
          </p>
          <p>
            And then the line that stopped me: a person like that might score
            badly on a standardised test.
          </p>
          <p>
            I read that as a South African parent and thought immediately of the
            people I work with every week — entrepreneurs running real businesses
            on exactly that instinct, who never received a qualification for it,
            and who have been told their whole lives that the intelligence they
            have doesn't count as intelligence.
          </p>
          <p className="text-foreground font-medium">
            It counts now. It may be the only kind that keeps counting.
          </p>
        </Section>

        <Section id="why-maths" title="So why am I still teaching maths?">
          <p>
            This is the question I get asked most, and I want to answer it
            properly, because the obvious conclusion is wrong.
          </p>
          <p>
            If AI can solve research-level mathematics, why should a ten-year-old
            grind through long division?
          </p>
          <p>
            Because we never taught maths so that children could compute.
            Calculators removed that reason forty years ago and nobody stopped
            teaching it. We teach it because of what it builds underneath: the
            ability to hold a structure in your head, to follow a chain of
            reasoning without losing the thread, to work in steps, and — this is
            the part that matters most now —{" "}
            <span className="text-foreground font-medium">
              to know when an answer smells wrong.
            </span>
          </p>
          <p>
            That last one used to be a nice extra. It has become essential.
          </p>
          <p>
            These tools produce wrong answers with total confidence. They do not
            hesitate, they do not hedge, and they do not tell you when they are
            guessing. A person who has no feel for whether a number is plausible
            will simply accept whatever appears on the screen. A person who does
            will stop and say: that can't be right.
          </p>
          <p>
            So we still do maths. But I've changed what I'm listening for. I'm
            less interested in whether the answer is correct and more interested
            in whether they can tell me why they believe it — and whether they'd
            notice if it were wrong.
          </p>
          <p>
            The same goes for reading. Not "can you read this," but "does this
            make sense, and what is this person actually trying to do to you?"
          </p>
        </Section>

        <Section
          id="market-of-one"
          title="I've started treating it like market research on a market of one"
        >
          <p>
            Here is where being an entrepreneur genuinely changes how I do this.
          </p>
          <p>
            When you build a business, you don't decide in advance what the
            market wants and then insist on it. You watch. You test. You pay
            attention to what people actually do rather than what you assumed
            they would do, and you revise.
          </p>
          <p>
            Most of us do the opposite with our children. We decide early what
            they should become, then spend twelve years pushing them toward it and
            calling the resistance a discipline problem.
          </p>
          <p>
            So I've started observing my two the way a scientist would study a
            market — deliberately, in writing, over time. Four questions, and I
            revisit them every term.

          </p>
          <p>
            <span className="text-foreground font-medium">
              What does this child actually love?
            </span>{" "}
            Not what he says when asked. What he returns to when nobody is
            watching and there is no reward attached.
          </p>
          <p>
            <span className="text-foreground font-medium">
              What is he genuinely good at?
            </span>{" "}
            Not what I wish he were good at. This one requires more honesty than
            it sounds like it does.
          </p>
          <p>
            <span className="text-foreground font-medium">
              What will the world need — that AI cannot do?
            </span>{" "}
            This is the question that has changed, and it is the reason I'm
            writing any of this. The old version was "what jobs will exist." That
            is no longer answerable with any confidence. But "what will still
            require a human" is answerable, and I've written about{" "}
            <Link
              to="/blog/what-ai-can-do-for-your-business-test"
              className="text-primary hover:underline"
            >
              the test I use
            </Link>{" "}
            elsewhere: work where a machine can check its own answer is work that
            gets absorbed. Work that requires judgement about people, trust, and
            what matters does not.
          </p>
          <p>
            <span className="text-foreground font-medium">
              And how does that become a living?
            </span>{" "}
            This is the entrepreneur's question, and I don't apologise for asking
            it. Loving something and being good at it is not enough. There has to
            be a path where somebody will pay for it, or you have raised a person
            with a wonderful gift and no way to eat.
          </p>
          <p>
            The four together are the old ikigai idea, with one update: the third
            circle now has a filter on it. Not just what the world needs — what
            the world needs that a machine will not be doing.
          </p>
          <p>
            <span className="text-foreground font-medium">
              One warning, since I’m being honest.
            </span>{" "}
            A child is not a startup. A business begins with an intention of what
            it will become, and this approach goes badly wrong the moment you
            impose that intention on a child - forcing them into your own idea of
            what success looks like. The point is the opposite of a plan. It is
            noticing who is actually in front of you, instead of teaching to the
            child you had in mind before they arrived.
          </p>
        </Section>

        <Section
          id="differently"
          title="What we actually do differently now"
        >
          <p>Some of this is small and unglamorous.</p>
          <p>
            <span className="text-foreground font-medium">
              They use the tools, and they argue with them.
            </span>{" "}
            Not banned, not treated as cheating. But nothing gets accepted because
            a machine said it. The habit I want is checking, not asking.
          </p>
          <p>
            <span className="text-foreground font-medium">
              More questions than answers.
            </span>{" "}
            The skill I think is most undervalued is knowing what is worth asking
            in the first place. A machine will answer almost anything. It will not
            tell you that you're asking the wrong question, and it never will,
            because it has no idea what you're actually trying to do.
          </p>
          <p>
            <span className="text-foreground font-medium">
              Real work with real consequences.
            </span>{" "}
            Things where somebody is genuinely waiting, or genuinely disappointed.
            You cannot learn judgement from an exercise where nothing is at stake.
          </p>
          <p>
            <span className="text-foreground font-medium">
              People, deliberately.
            </span>{" "}
            Time with grandparents, with neighbours, with people who are not like
            us and who require some effort to understand. Reading a person is a
            skill, it is learned by practice, and it is close to the top of the
            list of things that will still matter in twenty years.
          </p>
          <p>
            <span className="text-foreground font-medium">
              And I have stopped pretending I know what they'll do for a living.
            </span>{" "}
            Nobody does. Anyone confidently naming the safe careers of 2045 is
            guessing. What I can do is send them into it as people who notice
            things, who can tell when something is off, who can be trusted, and
            who are not frightened of the tools.
          </p>
        </Section>

        <Section
          id="micro-schools"
          title="Why I think school itself is about to change"
        >
          <p>
            This is a prediction rather than a fact, and I'm making it as someone
            who watches markets for a living.
          </p>
          <p className="text-foreground font-medium">
            I think we are about to see a flood of micro schools.
          </p>
          <p>
            Small setups. A handful of children. Built around how a particular
            child learns rather than around how the average child is assumed to
            learn. Some run by teachers who have left the system, some by parents
            who started with their own children and found other families asking to
            join, some by entrepreneurs who spot the demand before the sector does.
          </p>
          <p>
            The reason is not that mass schooling was badly designed. It is that
            it was well designed for a different economy. Standardised schooling
            was built to produce people who could follow instructions accurately
            and reliably at scale — because that is what factories, and later
            offices, needed. It did that job properly for a century.
          </p>
          <p>
            That economy is the one being absorbed fastest. Following instructions
            accurately is precisely the checkable work machines now do without
            tiring. A system optimised to produce reliable instruction-followers
            is optimising for the wrong thing, at exactly the wrong moment.
          </p>
          <p>
            What replaces it, I think, looks less like a smaller classroom and
            more like an inversion:{" "}
            <span className="text-foreground font-medium">
              the child as the curriculum, rather than the child fitted to one.
            </span>{" "}
            Instead of pulling a child into the box and measuring how well they
            fit, you start with who they actually are and build outward.
          </p>
          <p>
            <span className="text-foreground font-medium">
              And I want to say this part plainly, because it's easy to assume
              otherwise:
            </span>{" "}
            this does not have to be an expensive, elite thing. A micro school is
            a room, a few children, an adult who pays attention, and access to
            tools that are now nearly free. Those are conditions that exist in a
            community as readily as anywhere. The barrier to personalised education
            used to be the cost of one adult per handful of children. AI does not
            remove that adult — but it does remove a great deal of what used to
            make that adult's job impossible at small scale: the planning, the
            material preparation, the differentiation, the admin.
          </p>
          <p>
            If you are an entrepreneur reading this and looking for where demand
            is moving, I would look here.
          </p>
        </Section>

        <Section
          id="township-families"
          title="The part that community families should hear"
        >
          <p>
            There is a particular version of this that I want to say directly.
          </p>
          <p>
            The knowledge that makes a business work in a community has always
            been treated as informal. Understanding how a stokvel actually
            operates. Knowing why a customer's silence this month means something
            different from last month. Knowing what a recommendation from the taxi
            rank is worth. Knowing when to extend credit and to whom — and being
            right.
          </p>
          <p>
            None of that has ever appeared on a CV. It doesn't come with a
            certificate. It has been quietly regarded as what people do when they
            didn't get the education.
          </p>
          <p>
            That knowledge now sits in the column that does not get automated. Not
            because it's precious, but for a hard structural reason: there is no
            way to check it against anything except the community it came from, so
            there is no way for a machine to practise it. It's the same argument I
            make in{" "}
            <Link
              to="/blog/ai-plus-kasi-wisdom-township-business"
              className="text-primary hover:underline"
            >
              AI plus kasi wisdom
            </Link>
            .
          </p>
          <p>
            If you have it, you should stop apologising for it. And you should be
            teaching it deliberately to your children, not assuming they'll absorb
            it by being nearby.
          </p>
        </Section>

        <Section id="what-i-tell-them" title="What I actually tell them">
          <p>
            Not much, honestly. Ten-year-olds don't need a lecture about labour
            markets.
          </p>
          <p>
            But when it comes up, it's roughly this: the machine is very good at
            the parts that can be marked right or wrong. It's not good at people,
            and it doesn't know what matters. Get good at those, stay curious,
            learn to use the tools without being impressed by them.
          </p>
          <p>
            And be someone others can rely on. That has never once gone out of
            date, and I don't think it's about to start.
          </p>
        </Section>

        <div className="mt-16 border-t border-border pt-10">
          <p className="kasi-signature">Tsholo Monyausi</p>
          <p className="font-bold text-foreground">Tsholofelo Monyausi</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Founder, kasiAIhub · Founder, P-Squared
          </p>
          <p className="text-sm text-muted-foreground">
            Homeschooling mother of two
          </p>

          <p className="mt-8 border-l-2 border-primary pl-4 text-sm italic text-muted-foreground">
            I do two things with my days. I build kasiAIhub, which helps community
            entrepreneurs put real systems into their businesses using AI. And I
            build P-Squared, a personalised learning approach that began as
            something I made for my own sons. This piece sits where those two
            things meet, which is where I actually live.
          </p>

          <p className="mt-8">
            <Link
              to="/diagnostic"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              Take the free Business Diagnostic →
            </Link>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            If you're running a business alongside raising them, this is where to
            start.
          </p>
        </div>

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
          Congress of Mathematicians, 24 July 2026. Jensen Huang, interviewed on
          the <em>A Bit Personal</em> podcast with Jodi Shelton, reported January
          2026.
        </p>

        <TownshipStudyInvite />
      </article>
    </main>
  );
}
