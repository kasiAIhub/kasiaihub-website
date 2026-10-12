import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL =
  "https://kasiaihub.com/blog/township-business-study-south-africa";
const TITLE =
  "Why We're Studying Community Businesses Differently | kasiAIhub";
const DESCRIPTION =
  "Most research about community entrepreneurs is done about them, not with them. Here's why we built something different, and why your five minutes actually matters.";
const PUBLISHED = "2026-07-22";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "Do I need to be a kasiAIhub client to take part in the Study?",
    a: "No. Anyone running a business, particularly in a community or community setting in South Africa, is welcome to contribute — there's no requirement to have used any kasiAIhub product first.",
  },
  {
    q: "What happens to my answers?",
    a: "Answers may be used anonymously in aggregate findings or future articles. Individual answers are never shared or sold. If you provide a contact email, it's used only if you've asked to be followed up with.",
  },
  {
    q: "Is there a prize for completing it?",
    a: "No. There's no prize, discount, or incentive attached. It's a direct request for honest input, nothing more.",
  },
  {
    q: "How is this different from a normal survey?",
    a: "Most of the questions are open text rather than multiple choice, deliberately, because pre-set options tend to produce answers that confirm what was already assumed rather than surface what's actually happening.",
  },
  {
    q: "Will the findings be published?",
    a: "Yes — as they become substantial enough to say something real, findings will be shared back through this same blog, in plain language, not locked in a report nobody sees.",
  },
];

export const Route = createFileRoute(
  "/blog/township-business-study-south-africa",
)({
  head: () => ({
    meta: [
      { title: "Why We're Studying Community Businesses Differently" },
      { name: "description", content: "Most research on community entrepreneurs is done about them, not with them. See why we built something different, and why your five minutes matters." },
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
            "Nobody Asks Community Entrepreneurs What They Actually Need. We're Trying to Change That.",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          about:
            "Community entrepreneurship research South Africa, informal sector research",
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
            { "@type": "ListItem", position: 3, name: "Community Business Study", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: TownshipStudyArticle,
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

function TownshipStudyArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">Community Business Study</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Research · Community Business Hub
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Nobody Asks Community Entrepreneurs What They Actually Need. We're Trying to Change That.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            There is a specific kind of insult that community entrepreneurs have gotten used to,
            and most of them have stopped noticing it because it happens so often.
          </p>
        </header>

        <Section id="pattern" title="The pattern most research follows">
          <p>
            A researcher arrives. Sometimes it's a university, sometimes a corporate CSI
            programme, sometimes a government department building a case for funding. They
            ask questions for twenty minutes, thank the business owner, and leave. Six months
            later, a report gets published. It has real community entrepreneurs' answers in
            it, turned into percentages and pull quotes. Nobody in that community ever sees
            it. Nothing in that business changes because of it. The entrepreneur gave
            something real and got a pen, or a t-shirt, or nothing, in return.
          </p>
          <p>
            This isn't a conspiracy. Nobody sets out to do this. It's just how research about
            poor and working-class communities has been done for decades, everywhere, not
            only in South Africa: extract information, leave, publish somewhere the people
            who gave the information will never read.
          </p>
          <p>
            We built the{" "}
            <Link to="/township-study" className="text-primary hover:underline">
              Community Business Study
            </Link>{" "}
            because we got tired of being on the wrong side of that pattern, even by accident.
          </p>
        </Section>

        <Section id="what-we-know" title="What we actually know, and how thin it is">
          <p>
            Here's an honest admission. Everything in this hub — the compliance article, the
            pricing article, the funding article — is built on real, credible sources.
            Standard Bank's community economy research. Stats SA's employment data. FinScope's
            MSME survey. Academic work like Gavaza's 2025 study on AI adoption in community
            businesses.
          </p>
          <p>
            All of it is good work. And all of it was produced the way research usually is:
            someone outside the community designed a survey, ran it once, and published
            findings that are now, in some cases, already a year or two old by the time
            anyone reads them.
          </p>
          <p>
            There is no version of this that updates in real time. There is no channel where
            a spaza owner in Sebokeng can tell someone, this week, that the thing everyone
            assumes is her biggest problem isn't actually her biggest problem — something
            else is, and nobody's asked.
          </p>
          <p>That gap is what the Study is for.</p>
        </Section>

        <Section id="different" title="What makes this different, honestly">
          <p>
            We're not claiming to have solved the extraction problem entirely. A
            five-question form on a website is still, structurally, one direction of
            information flow. But we've built in three things that most research in this
            space doesn't bother with.
          </p>
          <p>
            <strong className="text-foreground">We tell you exactly why we're asking.</strong>{" "}
            Not "for a report" — for deciding what kasiAIhub builds next. The systems in our
            sessions, the articles in{" "}
            <Link to="/blog/township-business-hub" className="text-primary hover:underline">
              this hub
            </Link>
            , the priorities for whatever comes after — this is where the evidence for those
            decisions comes from.
          </p>
          <p>
            <strong className="text-foreground">We share back what we learn.</strong> Not a
            PDF buried on a government website. Real findings, in plain language, published
            back into this same hub, where the people who answered the questions can actually
            read what came of it.
          </p>
          <p>
            <strong className="text-foreground">
              There's nothing to win, and we're not pretending otherwise.
            </strong>{" "}
            No prize, no discount, no "enter for a chance to." Just a direct ask: if you have
            five minutes, we would genuinely like to know what's actually going on in your
            business, in your own words.
          </p>
        </Section>

        <Section id="own-words" title='Why "in your own words" is the whole point'>
          <p>
            Most surveys hand you options. Pick A, B, C, or D. It's fast, and it's exactly
            why most surveys about small businesses tell you almost nothing useful. If you
            ask a hundred entrepreneurs to choose between "marketing," "compliance," "cash
            flow," and "staff," you'll get a chart. You won't get a single sentence you
            couldn't have guessed before you asked the question.
          </p>
          <p>
            The Study doesn't do multiple choice, on purpose, for the questions that matter.
            It asks about yesterday, specifically — what actually happened, what you
            actually did, what you're still doing about the thing you've tried to fix twice
            already and it keeps coming back. Those answers are harder to give. They're also
            the only kind of answer that tells us something we didn't already assume.
          </p>
        </Section>

        <Section id="pattern-coming" title="The pattern we already know is coming">
          <p>
            We can say this with some confidence before a single new response comes in,
            because it's already visible in everything else we've built from real cohort
            work: the loudest problem an entrepreneur names first is rarely the actual
            bottleneck.
          </p>
          <p>
            Someone says their problem is marketing. Underneath it, the real issue is that
            nothing catches an enquiry when they're busy, so the marketing they do pays for
            interest that quietly disappears. Someone says their problem is compliance.
            Underneath it, the real issue is that there's no system for paperwork at all, so
            compliance is just the most frightening version of a problem that shows up
            everywhere in the business.
          </p>
          <p>
            This is why the Study asks the way it does — not "what's your biggest problem,"
            but "what have you tried to fix more than once, and it keeps coming back." That
            question finds the real bottleneck. The first one just finds whatever's loudest
            that week.
          </p>
        </Section>

        <Section id="over-time" title="What this becomes over time">
          <p>
            One response tells us about one business. A hundred responses start to tell us
            something about a pattern. That's the honest scale this needs to work at — not
            to prove a point in a single week, but to become a real, living picture that
            updates as more community entrepreneurs contribute to it.
          </p>
          <p>
            Eventually, this is what should separate kasiAIhub's understanding of this
            economy from research done once, by outsiders, and then left to go stale. Not
            because we're smarter than the researchers who came before — because we're still
            here, still listening, months and years after the first version of this was
            built.
          </p>
        </Section>

        <Section id="reading" title="If you're reading this and running a business">
          <p>
            You don't need to be a kasiAIhub client to take part. You don't need to have done
            the{" "}
            <Link to="/diagnostic" className="text-primary hover:underline">
              Business Diagnostic
            </Link>{" "}
            first. This isn't a funnel — it's a question, asked honestly, to anyone willing
            to answer it.
          </p>
          <p>
            Five questions. A few minutes. Nothing to buy, nothing to win. Just tell us
            what's actually true in your business right now.
          </p>
          <p>
            <Link
              to="/township-study"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              Contribute to the Community Business Study →
            </Link>
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
        </Section>
      </article>
    </main>
  );
}
