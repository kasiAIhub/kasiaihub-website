import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/ai-watermarking-township-business-risk";
const TITLE = "Does AI Watermarking Put Your Business at Risk? | kasiAIhub";
const DESCRIPTION =
  "You used Claude to get the proposal out the door. The client never saw that — a detector might. Here's exactly what AI watermarking means for a community business, and what doesn't apply yet.";
const PUBLISHED = "2026-08-18";
const UPDATED = "2026-08-18";

const faq = [
  {
    q: "Is this already costing community businesses contracts?",
    a: "There is no documented case of a business losing a tender specifically because a Claude watermark was detected. The current practical risk is low. The longer-term structural risk is real and worth preparing for.",
  },
  {
    q: "Does the watermark mean the AI owns my work?",
    a: "No. The mark indicates that Claude was involved in processing the text. It does not transfer legal ownership or authorship.",
  },
  {
    q: "Should I stop using Claude or similar tools?",
    a: "No. Use them deliberately. Keep a strong human layer on high-stakes work and maintain simple records of your own input.",
  },
  {
    q: "Is South Africa going to require watermarking?",
    a: "Not yet. There is still no binding local law. A revised National AI Policy is expected — no date has been given. Early signals lean toward disclosure requirements, particularly around media and public content.",
  },
  {
    q: "What is the single most useful habit right now?",
    a: "Rewrite the critical sections of client-facing work in your own words and structure. It protects ownership clarity and usually weakens any statistical mark at the same time.",
  },
  {
    q: "Should I do anything today?",
    a: "Rewrite the parts a client will judge you on. Then do the free diagnostic at kasiaihub.com/diagnostic. It will not detect a watermark. It will tell you whether the business still runs only because you do.",
  },
];

export const Route = createFileRoute(
  "/blog/ai-watermarking-township-business-risk",
)({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "You used AI to get the proposal out. The client never saw that, but a detector might. What AI watermarking means for a community business today." },
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
          headline: "The Invisible Mark",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          keywords:
            "AI watermarking South Africa, is AI text detectable, Claude watermark meaning, AI disclosure small business South Africa",
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
              name: "The Invisible Mark",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: WatermarkingArticle,
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

function WatermarkingArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">The Invisible Mark</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            AI &amp; Business
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            The Invisible Mark
          </h1>
          <p className="mt-4 text-lg font-medium text-foreground">
            Do community entrepreneurs have cause to worry about AI watermarking?
          </p>
        </header>

        <section className="mt-10 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            You used Claude to get the proposal out the door. There was no one
            else to write it. The client never saw that. A detector might.
          </p>
          <p>
            In August 2026, new Claude models started leaving an invisible mark in
            the text. The sentences still read like yours. The meaning does not
            change. Nothing on the page looks different. With the right key, a
            machine can still tell that Claude passed through the work.
          </p>
          <p>
            This is not an emergency. It is also not nothing. Especially if you
            run a community business, and the words that win you the next job are
            the ones you did not have time to write by hand.
          </p>
          <p>
            The system works by slightly adjusting the probability of which words
            the model chooses. Anthropic began embedding this statistical
            watermark into text from Claude models launched on or after 2 August
            2026. It applied the mark globally because it said it did not yet have
            a reliable way to limit it by region.
          </p>
          <p>
            The change was driven by European Union rules on AI transparency.
            Other large providers have signed the same voluntary European code and
            are moving in a similar direction. Google has been using its own text
            watermarking system on Gemini since 2024. Grok, from xAI, did not sign
            that voluntary code and currently does not watermark its text outputs.
          </p>
          <p>
            A watermark shows that Claude was involved in processing the text. It
            does not transfer ownership of your ideas or change your legal rights.
            Anthropic states this clearly. At the time of writing, there is no
            widely available public detection tool, the mark is usually weakened
            or removed by substantial rewriting, and there is no documented case
            of a business losing a tender because a Claude watermark was detected.
          </p>
          <p>
            South Africa still has no binding law requiring AI watermarking. The
            draft National AI Policy was published in April 2026 and withdrawn
            weeks later after it was found to contain fabricated academic
            references. A revised version is expected for public comment. No date
            has been given. Government comments so far have focused more on
            disclosure of AI-generated content on media platforms than on ordinary
            business documents.
          </p>
        </section>

        <Section
          id="why-it-matters"
          title="Why this still matters for community businesses"
        >
          <p>
            The current practical risk is low. The longer-term pattern is worth
            watching.
          </p>
          <p>
            Community businesses operate with thinner margins and fewer buffers
            than larger formal companies. When the tools that help you compete
            start leaving permanent technical fingerprints, three things become
            relevant over time.
          </p>
          <p>
            First, perception often moves faster than perfect technical detection.
            Once detection tools become easier to use, some clients or funders may
            treat a positive signal as a reason for caution, even if the
            underlying thinking was yours. Larger organisations can absorb or
            negotiate these questions. A lean operation often cannot.
          </p>
          <p>
            Second, every new layer of scrutiny or disclosure costs more,
            relatively, for a business that has no compliance staff. What a
            corporate team treats as routine becomes another demand on time and
            focus.
          </p>
          <p>
            Third, dependency grows while control shrinks. The more essential
            these models become for competing, the more significant it is that the
            dominant ones embed marks under foreign rules. The same tools that
            closed capability gaps can begin to reintroduce hierarchy through
            technical and compliance channels.
          </p>
          <p>
            None of this means you should stop using AI. It means you should use
            it deliberately.
          </p>
        </Section>

        <Section id="what-works" title="What actually works right now">
          <p>
            The practical response is the same discipline that already serves
            community businesses well in other areas: keep the highest-value work
            clearly yours, and build simple systems that make your process
            visible.
          </p>
          <p>
            <span className="text-foreground font-medium">
              Keep a clear human layer on client-facing work.
            </span>{" "}
            Use AI for research, structure, first drafts and editing. Then rewrite
            the important sections — the core argument, the recommendations, the
            parts a client will judge you on — in your own language and structure.
            Substantial human revision usually weakens statistical marks. More
            importantly, it keeps the final work recognisably yours.
          </p>
          <p>
            <span className="text-foreground font-medium">
              Separate work by risk.
            </span>{" "}
            Internal thinking, learning and low-stakes drafting can stay on the
            strongest tools available. Proposals, formal reports, delivered code
            and anything likely to face external scrutiny should receive
            deliberate human oversight.
          </p>
          <p>
            <span className="text-foreground font-medium">
              Keep simple records of your process.
            </span>{" "}
            Dated notes or version history that show your direction and decisions
            cost almost nothing. They become useful the moment questions about how
            the work was produced arise.
          </p>
          <p>
            <span className="text-foreground font-medium">
              Do not depend on a single provider.
            </span>{" "}
            Maintain familiarity with more than one strong tool, including options
            that do not currently watermark text. Switching cost is lower than
            long-term dependence on terms you cannot control.
          </p>
          <p>
            <span className="text-foreground font-medium">
              Be strategic about transparency with clients.
            </span>{" "}
            Many buyers already assume AI is being used. Controlled disclosure on
            your terms is usually better than discovery on theirs. Match the level
            of openness to the relationship and the stakes.
          </p>
          <p>
            <span className="text-foreground font-medium">
              Watch the South African policy process.
            </span>{" "}
            When the revised National AI Policy opens for comment, input from
            small-business operators will matter. The direction of travel is more
            likely to emphasise transparency and risk management than pure user
            ownership of unmarked outputs.
          </p>
        </Section>

        <Section id="the-real-point" title="The real point">
          <p>
            The mark is currently hard to detect. Substantial rewriting usually
            weakens it. There is no documented case of a community business losing
            a tender because a detector caught Claude.
          </p>
          <p>
            The trajectory is the part to take seriously. The tools that closed the
            gap can start leaving a fingerprint you did not choose, under rules
            you did not write.
          </p>
          <p>
            Keep the highest-value work visibly yours. Then find out which gap is
            actually the one in the business, not in the software.
          </p>
          <p className="border-l-2 border-primary pl-4 text-sm italic">
            Deciding which work to hand over in the first place is a separate
            question —{" "}
            <Link
              to="/blog/what-ai-can-do-for-your-business-test"
              className="text-primary hover:underline"
            >
              What AI Can and Can't Do For Your Business
            </Link>
          </p>
          <DiagnosticCta label="Take the free Business Diagnostic — 4 minutes →" />
        </Section>

        <Section id="faq" title="Frequently asked questions">
          <div className="space-y-6">
            {faq.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
                <p className="mt-2">
                  {f.q === "Should I do anything today?" ? (
                    <>
                      Rewrite the parts a client will judge you on. Then do the{" "}
                      <Link
                        to="/diagnostic"
                        className="text-primary hover:underline"
                      >
                        free diagnostic at kasiaihub.com/diagnostic
                      </Link>
                      . It will not detect a watermark. It will tell you whether
                      the business still runs only because you do.
                    </>
                  ) : (
                    f.a
                  )}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          Sources: Anthropic, "How Claude's text watermark works" (August 2026);
          EU AI Act Article 50 transparency provisions; Department of
          Communications and Digital Technologies, National AI Policy withdrawal
          notice (2026).
        </p>

        <TownshipStudyInvite />
      </article>
    </main>
  );
}
