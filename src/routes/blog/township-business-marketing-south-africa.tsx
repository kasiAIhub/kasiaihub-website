import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/township-business-marketing-south-africa";
const TITLE =
  "Why Marketing Is the #1 Struggle for Community Businesses in South Africa | kasiAIhub";
const DESCRIPTION =
  "63% of community businesses say marketing is their biggest need. Here's what the research shows about why, and what practical AI-powered marketing actually looks like.";
const PUBLISHED = "2026-04-22";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "I already post on WhatsApp and Instagram. Why isn't it working?",
    a: "Posting alone isn't a marketing strategy. Research shows most community businesses have the platforms but lack a consistent plan, professional content, or a way to convert followers into repeat customers — that structure is what tends to be missing, not the platform itself.",
  },
  {
    q: "Do I need a website if I already have WhatsApp and Instagram?",
    a: "Not immediately, but a simple website adds credibility for customers who research a business before buying or booking, and it's one of the clearest gaps between community businesses and their formal-sector competitors — only 30% currently have one.",
  },
  {
    q: "Can AI really help with marketing if I don't understand social media strategy?",
    a: "Yes. The most effective current use cases are simple: writing captions, planning what to post and when, and creating visuals — tasks that don't require deep marketing expertise, just consistent execution.",
  },
];

export const Route = createFileRoute(
  "/blog/township-business-marketing-south-africa",
)({
  head: () => ({
    meta: [
      { title: "Why Marketing Is the #1 Struggle for Community Business" },
      { name: "description", content: "63% of community businesses say marketing is their biggest need. Here is what the research shows about why, and what practical AI-powered marketing looks like." },
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
            "Why Marketing Is the #1 Struggle for Community Businesses — And What Actually Works",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          about: "Community business marketing South Africa",
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
              name: "Why Marketing Is the #1 Struggle for Community Businesses",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: TownshipMarketing,
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

function TownshipMarketing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">Community Business Marketing</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Community Hub · Marketing
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Why Marketing Is the #1 Struggle for Community Businesses — And What
            Actually Works
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            If you run a business in a South African community, you already know
            this without needing a survey to tell you: getting customers to
            find you, and keep coming back, is harder than it should be.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            The data confirms what you're feeling. In Standard Bank's 2025
            community economy research, marketing support was identified as the
            single most pressing need — cited by 63% of community businesses
            surveyed, more than any other challenge including funding or
            compliance.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            Here's what the research actually shows about why marketing is so
            hard for community entrepreneurs specifically, and what's
            realistically working right now.
          </p>
        </header>

        <Section id="why-harder" title="Why Community Marketing Is Genuinely Harder">
          <p>
            It's not that community entrepreneurs don't understand marketing.
            Standard Bank's research paints a specific picture: businesses
            often operate in saturated markets, facing as many as 20 similar
            competitors within the same community. That level of local
            competition means standing out isn't optional — it's survival.
          </p>
          <p>
            At the same time, Statistics South Africa's 2023 Survey of
            Employers and the Self-Employed found that assistance with
            marketing was the most commonly requested support area among
            non-VAT-registered businesses — confirming this isn't a perception
            problem, it's a structural gap in access to marketing skills and
            tools.
          </p>
        </Section>

        <Section id="digital-foundation" title="The Surprising Part: The Digital Foundation Already Exists">
          <p>
            Here's what most people get wrong about community marketing. The
            assumption is that entrepreneurs simply aren't online. The data
            says otherwise.
          </p>
          <p>
            Standard Bank's research found WhatsApp is used by 74% of community
            businesses for marketing and communication, and Instagram by 47%.
            These are not low numbers — they show most community entrepreneurs
            are already active on the exact platforms their customers use
            daily.
          </p>
          <p>
            What's missing is different: only 30% have any kind of website,
            and only 36% use any dedicated business app. The gap isn't digital
            presence — it's digital infrastructure. Entrepreneurs are showing
            up on WhatsApp and Instagram, but without a website, a booking
            system, or a consistent content strategy behind that presence, the
            effort doesn't compound the way it could.
          </p>
        </Section>

        <Section id="already-using-ai" title="What Community Entrepreneurs Are Already Doing With AI">
          <p>
            There's early evidence this gap is starting to close, and AI is
            playing a specific role. Reporting on South African community
            entrepreneurs has documented owners using tools like ChatGPT to
            plan marketing content, write social media captions, and speed up
            customer communication — exactly the kind of support that doesn't
            require hiring an agency or a consultant.
          </p>
          <p>
            This matches what the research suggests is the realistic entry
            point for AI in community business: not advanced analytics or
            automated ad campaigns, but front-office support — writing,
            planning, translating, and organising the marketing work that's
            already happening informally.
          </p>
        </Section>

        <Section id="what-works" title="What Actually Works: A Practical Approach">
          <p>
            Based on the evidence, the most realistic and effective use of AI
            for community business marketing focuses on a few specific,
            low-cost applications:
          </p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <strong className="text-foreground">Caption and content writing.</strong>{" "}
              Instead of staring at a blank WhatsApp status or Instagram
              caption box, describing your product or offer to an AI tool and
              getting three or four options to choose from turns a 20-minute
              task into a 2-minute one.
            </li>
            <li>
              <strong className="text-foreground">A simple content calendar.</strong>{" "}
              Rather than posting inconsistently — busy weeks with nothing,
              slow weeks with a flurry — a monthly content plan built once
              means you always know what to post next, without starting from
              scratch each time.
            </li>
            <li>
              <strong className="text-foreground">Translation and local language support.</strong>{" "}
              With South Africa having 11 official languages and the vast
              majority of the population not speaking English at home, being
              able to draft content in English and have it adapted into
              isiZulu, isiXhosa, Sesotho, or code-switched local language
              significantly widens who your marketing actually reaches.
            </li>
            <li>
              <strong className="text-foreground">WhatsApp follow-up scripts.</strong>{" "}
              Since WhatsApp is already the dominant marketing channel, having
              ready-made, professional-sounding follow-up messages for
              enquiries, bookings, and repeat customers turns your most-used
              platform into a more consistent sales tool.
            </li>
            <li>
              <strong className="text-foreground">Simple flyer and poster content.</strong>{" "}
              AI image generation tools can now produce professional-looking
              promotional visuals in seconds — closing part of the gap between
              a business with an in-house designer and one without.
            </li>
          </ul>
        </Section>

        <Section id="why-it-matters" title="Why This Matters More Than It Might Seem">
          <p>
            Standard Bank's research also found that stronger-performing
            community businesses tend to be more customer-centric, while others
            remain more traditional and reactive — responding to what's in
            front of them rather than planning ahead. Marketing is often where
            this difference shows up first: a business with a plan, however
            simple, moves from reactive to intentional.
          </p>
        </Section>

        <Section id="kasiaihub" title="How kasiAIhub Approaches This">
          <p>
            kasiAIhub's{" "}
            <Link to="/sessions/brand-and-grow" className="text-primary hover:underline">
              Session 3 — Brand & Grow
            </Link>{" "}
            is built directly around closing this exact gap. Using Claude for
            strategy and ChatGPT for content and visual generation,
            entrepreneurs leave the session with a 30-day content calendar,
            professional product and brand images, and a marketing approach
            built specifically around their business — not a generic template.
          </p>
          <p>
            The starting point is always the same question: what do you
            already have working (your WhatsApp following, your Instagram
            presence, your existing customers) and how do we build consistency
            and reach on top of that foundation, rather than starting over.
          </p>
          <p>
            Marketing sits alongside two connected challenges for community
            entrepreneurs:{" "}
            <Link
              to="/blog/township-business-compliance-registration-south-africa"
              className="text-primary hover:underline"
            >
              formal registration and compliance
            </Link>{" "}
            and{" "}
            <Link
              to="/blog/township-business-funding-applications-south-africa"
              className="text-primary hover:underline"
            >
              accessing funding
            </Link>{" "}
            — all three are addressed across the{" "}
            <Link to="/entrepreneur-ai-journey" className="text-primary hover:underline">
              Entrepreneur AI Journey
            </Link>
            , starting with{" "}
            <Link to="/sessions/think-and-plan" className="text-primary hover:underline">
              Session 1: Think & Plan
            </Link>{" "}
            and{" "}
            <Link to="/sessions/build-and-create" className="text-primary hover:underline">
              Session 2: Build & Create
            </Link>
            .
          </p>
          <p>
            <Link
              to="/sessions/brand-and-grow"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              See what gets built in Session 3 →
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

        <Section id="sources" title="Sources">
          <p className="text-sm">
            Standard Bank Township and Informal Economy Report (October 2025);
            Statistics South Africa Survey of Employers and the Self-Employed
            (2023); reporting on community entrepreneur AI tool use.
          </p>
        </Section>
              <TownshipStudyInvite />
      </article>
    </main>
  );
}
