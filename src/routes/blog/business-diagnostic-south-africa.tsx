import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/business-diagnostic-south-africa";
const TITLE =
  "How to Know What Your Business Actually Needs | Free Business Diagnostic | kasiAIhub";
const DESCRIPTION =
  "Pricing, compliance, marketing, systems — they all sound urgent. Here's how to know which one is actually costing you the most right now, and where to start fixing it.";
const PUBLISHED = "2026-06-24";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "How long does the diagnostic take?",
    a: "About 3–5 minutes. Twelve questions, one at a time, answered on your phone or computer.",
  },
  {
    q: "Does the diagnostic tell me which session to book?",
    a: "Not directly — the three sessions are designed to be completed in sequence, since each one builds on the last. What the diagnostic shows you is why that starting point makes sense for your specific business, based on your actual answers.",
  },
  {
    q: "Is the diagnostic really free?",
    a: "Yes, completely free, with no obligation to book anything afterward. You'll also get the option to download a personalised report of your results to keep.",
  },
  {
    q: "What happens to my answers?",
    a: "Your answers are used to generate your personalised report and, if you choose to share your details, to help us understand your business before you arrive at your first session — so the training is built around you from the start, not generic content.",
  },
];

export const Route = createFileRoute(
  "/blog/business-diagnostic-south-africa",
)({
  head: () => ({
    meta: [
      { title: "What Your Business Actually Needs | Free Diagnostic" },
      { name: "description", content: "Pricing, compliance, marketing, systems all sound urgent. Here is how to know which one is costing you the most right now, and where to start fixing it." },
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
            "How Do You Know What Your Business Actually Needs? Take the Free Diagnostic",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          about: "Small business diagnostic South Africa",
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
              name: "How Do You Know What Your Business Actually Needs?",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: BusinessDiagnosticArticle,
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

function BusinessDiagnosticArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">Business Diagnostic</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Diagnostic
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            How Do You Know What Your Business Actually Needs? Take the Free
            Diagnostic
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Pricing, compliance, marketing, systems — they all sound urgent.
            Here's how to know which one is actually costing you the most right
            now, and where to start fixing it.
          </p>
        </header>

        <section className="mt-12 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            If you've read a few articles in this hub, you've probably noticed
            a problem — and it's not the content, it's you. Every article
            sounds urgent. The one about pricing convinces you pricing is your
            biggest issue. The one about compliance convinces you that's the
            real emergency. The marketing one makes a compelling case too. By
            the time you've read three or four, you're not more decided —
            you're more overwhelmed.
          </p>
          <p>
            That's not a flaw in the advice. It's a flaw in reading advice
            written for everyone, when your business is not "everyone."
            Pricing, compliance, marketing, and systems are all genuinely real
            problems in South African small business — the research across
            this hub backs that up. But which one is actually costing{" "}
            <em>you</em> the most, this month, in your specific business, is a
            different question entirely — and it's one no article can answer
            for you, because it depends on facts only you have.
          </p>
        </section>

        <Section id="fix-everything" title="Why 'Just Fix Everything' Doesn't Work">
          <p>
            The honest reality of running a small business — especially alone,
            without a team — is that you cannot fix four things at once.
            Trying to overhaul pricing, chase compliance, rebuild your
            marketing, and fix your admin simultaneously usually means none of
            them actually get fixed. Something has to come first, and it has
            to be the right something, not just the loudest one.
          </p>
          <p>
            The businesses that make real progress tend to do one thing
            differently: they identify the single biggest constraint holding
            them back, fix that specifically, and let everything else follow
            from there. This isn't a new idea — it shows up throughout
            business literature as the idea of a "constraint" or a
            "bottleneck": the one weak point that, once addressed, unlocks
            progress everywhere else. The challenge has never been
            understanding this idea. It's been figuring out, honestly, which
            constraint is actually yours.
          </p>
        </Section>

        <Section
          id="four-things"
          title="The Four Things That Actually Determine Where You Start"
        >
          <p>
            Rather than guessing, or working through every article in order,
            there's a more direct way to find your actual starting point. It
            comes down to four honest questions about your business right now:
          </p>
          <p>
            <strong className="text-foreground">
              Where does your money actually stand?
            </strong>{" "}
            Not what you hope, not what a good month looked like — whether
            your income is genuinely reliable, unpredictable, or actively
            going backwards. This single fact changes what "urgent" even
            means for your business.
          </p>
          <p>
            <strong className="text-foreground">
              Does your business run without you standing over it every second?
            </strong>{" "}
            Or does everything — every order, every follow-up, every piece of
            information — depend entirely on you being present and
            remembering?
          </p>
          <p>
            <strong className="text-foreground">
              Do you know where your money is actually going, and coming from?
            </strong>{" "}
            Not roughly. Whether you can say with confidence what you make
            per sale, whether customers who disappear get noticed, and
            whether business money and personal money are actually separated.
          </p>
          <p>
            <strong className="text-foreground">
              Can people who don't already know you find your business, and
              does it look as good as the work you actually do?
            </strong>{" "}
            Whether you're relying entirely on people who already know you, or
            whether your business is genuinely visible and looks the part to
            someone discovering you for the first time.
          </p>
          <p>
            These four areas — not ten scattered topics — are what actually
            determine where a business's real bottleneck sits. Get an honest
            read on these, and you know where to start. Guess, and you risk
            spending months fixing something that was never your biggest
            problem.
          </p>
          <DiagnosticCta label="Find out what kind of business you're really running →" />
        </Section>

        <Section id="what-it-does" title="What the Diagnostic Actually Does">
          <p>
            We built a free, 12-question diagnostic specifically to answer
            this — not with generic advice, but by asking about your business
            directly and giving you an honest, personalised read on exactly
            these four areas.
          </p>
          <p>
            It's not a quiz that tells you which "type" of entrepreneur you
            are. It gives you two specific things: an honest picture of where
            your business currently stands financially, and a clear
            breakdown of your three biggest operational gaps — named
            specifically, not generically — along with what's actually strong
            about what you've already built.
          </p>
          <p>
            To be direct about what it isn't: it won't tell you to skip ahead
            to a different training session, because the sessions in the{" "}
            <Link to="/entrepreneur-ai-journey" className="text-primary hover:underline">
              AI Business Accelerator
            </Link>{" "}
            are sequential — what you build in{" "}
            <Link to="/sessions/think-and-plan" className="text-primary hover:underline">
              Session 1
            </Link>{" "}
            becomes the foundation Session 2 is built on, and Session 3
            builds on both. What the diagnostic does instead is show you{" "}
            <em>why</em> you're starting where you're starting, grounded in
            your actual answers, not a generic curriculum.
          </p>
        </Section>

        <Section
          id="before-another-article"
          title="Why This Matters Before You Read Another Article"
        >
          <p>
            If you've been reading through this hub trying to figure out
            whether pricing, compliance, marketing, or systems is your real
            problem — stop guessing. Answer twelve honest questions about
            your actual business, and get a clear, specific read on where
            your energy will do the most good right now.
          </p>
          <p>
            You'll walk away with a personalised breakdown you can keep,
            showing your business's current stage, your three biggest gaps in
            plain language, and exactly what each one is quietly costing you
            — plus what's already working, because most diagnoses forget to
            mention that part.
          </p>
          <DiagnosticCta label="Find out what kind of business you're really running →" />
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
              <TownshipStudyInvite />
      </article>
    </main>
  );
}
