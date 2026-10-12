import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/township-business-pricing-strategy-south-africa";
const TITLE =
  "Pricing Strategy for Community Businesses in South Africa: How to Stop Racing to the Bottom | kasiAIhub";
const DESCRIPTION =
  "Community businesses often face up to 20 competitors in the same community. Here's what the research shows about pricing under pressure, and how to price with confidence instead of guesswork.";
const PUBLISHED = "2026-05-13";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "Should I always match my competitors' prices?",
    a: "Not necessarily. Research shows competitive pricing is common in townships, but matching price alone doesn't address why a customer should choose you specifically. Understanding your true costs first ensures that whatever price you land on is still profitable.",
  },
  {
    q: "How do I know if I'm pricing too low?",
    a: "If you're not tracking your actual cost per item — including your time — it's genuinely difficult to know. Many community entrepreneurs discover through a proper cost calculation that certain products or services are selling at a loss or near-zero margin without realising it.",
  },
  {
    q: "Is it true that undercutting competitors is common in townships?",
    a: "Research specifically found that predatory pricing — deliberately pricing below cost to push competitors out — is not a systematic practice in South African townships. Price pressure tends to come from genuine market saturation rather than deliberate undercutting strategies.",
  },
];

export const Route = createFileRoute(
  "/blog/township-business-pricing-strategy-south-africa",
)({
  head: () => ({
    meta: [
      { title: "Pricing Strategy for Community Businesses | kasiAIhub" },
      { name: "description", content: "Community businesses often face up to 20 competitors nearby. See what the research shows about pricing under pressure and how to price with confidence." },
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
            "Pricing Without Guesswork: How Community Entrepreneurs Can Stop Racing to the Bottom",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          about: "Community business pricing strategy South Africa",
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
              name: "Pricing Without Guesswork: How Community Entrepreneurs Can Stop Racing to the Bottom",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: TownshipPricing,
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function TownshipPricing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">Community Pricing Strategy</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Community Hub · Pricing
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Pricing Without Guesswork: How Community Entrepreneurs Can Stop
            Racing to the Bottom
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            If you've ever dropped your price because the business two doors
            down undercut you, you're not making a mistake — you're responding
            rationally to one of the most well-documented pressures in South
            Africa's community economy: intense, hyper-local competition.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            Standard Bank's 2025 community economy research found that
            entrepreneurs often face up to 20 similar businesses operating
            within the same community. That level of local saturation changes
            how pricing actually works on the ground, and it's worth
            understanding the pattern before deciding how to respond to it.
          </p>
        </header>

        <Section id="pressure" title="Why Community Pricing Is Under Unusual Pressure">
          <p>
            Standard Bank's research describes community informal businesses as
            frequently operating in saturated markets, driven by low barriers
            to entry, which leads directly to intense price competition. This
            is particularly pronounced in sectors like fast food and
            groceries, where margins are already thin and the cost of entry
            for a new competitor is low.
          </p>
          <p>
            This isn't a failure of business skill — it's straightforward
            market economics playing out in a specific, constrained
            environment. When 20 businesses sell similar products within
            walking distance of each other, and customers are highly
            price-sensitive, downward pressure on pricing is close to
            inevitable without a deliberate counter-strategy.
          </p>
        </Section>

        <Section id="how-priced" title="How Community Entrepreneurs Are Actually Pricing Right Now">
          <p>
            Academic research into community pricing behaviour gives a clear
            picture. A 2024 study on pricing strategies in South African
            townships found that cost-plus pricing — calculating costs and
            adding a margin — is the most commonly used approach, followed by
            competitive pricing, where businesses set prices in direct
            reference to what competitors charge. Notably, the same research
            found that predatory pricing (deliberately pricing below cost to
            eliminate competitors) is not a systematic practice in townships
            — the price pressure appears to come from genuine competition and
            thin margins, not deliberate undercutting tactics.
          </p>
        </Section>

        <Section id="discipline" title="The Real Problem Isn't the Strategy — It's the Discipline">
          <p>
            Cost-plus and competitive pricing are both legitimate approaches
            used by businesses everywhere. The specific challenge in the
            community context is less about which method to use, and more
            about having reliable, current information to apply it
            consistently.
          </p>
          <p>
            Without an accurate, up-to-date view of your actual costs —
            ingredients, stock, transport, time — cost-plus pricing becomes
            guesswork rather than calculation. And without an easy way to
            check what nearby competitors are actually charging today,
            competitive pricing becomes reactive rather than strategic: you
            find out you're too expensive only after a customer tells you,
            or after sales quietly drop. This is why{" "}
            <Link
              to="/blog/township-business-financial-management-south-africa"
              className="text-primary hover:underline"
            >
              simple financial tracking
            </Link>{" "}
            is the foundation for any real pricing strategy.
          </p>
        </Section>

        <Section id="ai-help" title="What AI Can Genuinely Help With Here">
          <p>
            This is a case where AI's value is specific and honest, not a
            wholesale replacement for business judgment. Based on the actual
            pricing challenges the research describes, the most useful
            applications are:
          </p>
          <ul className="ml-6 list-disc space-y-3">
            <li>
              <strong className="text-foreground">Real cost-per-item calculation.</strong>{" "}
              Feeding in your actual ingredient, material or stock costs, plus
              your time, and getting a clear picture of your true cost per
              unit — removing the guesswork that leads to accidentally
              selling at a loss.
            </li>
            <li>
              <strong className="text-foreground">Margin visibility before you discount.</strong>{" "}
              Before agreeing to a discount, a bulk order, or a special
              request, quickly checking what that price actually does to your
              margin — rather than discovering afterward that you made little
              or nothing on the sale.
            </li>
            <li>
              <strong className="text-foreground">Competitor price awareness.</strong>{" "}
              Using AI-powered research tools to check what similar
              businesses in your area are currently charging, rather than
              relying on outdated information or guesswork about what
              "everyone else" charges.
            </li>
            <li>
              <strong className="text-foreground">Bundling and packaging strategy.</strong>{" "}
              Instead of just lowering your price to compete, exploring
              higher-margin combinations or bundles that offer customers more
              perceived value without eroding your margin the way a straight
              price cut does.
            </li>
          </ul>
        </Section>

        <Section id="cannot" title="What AI Cannot Do">
          <p>
            It's worth being direct: no tool can create margin that genuinely
            doesn't exist in a market this competitive. If you are one of 20
            similar businesses in your area, AI can help you price with more
            discipline and confidence — it cannot manufacture pricing power
            your market position doesn't currently support. The realistic
            goal is precision and confidence, not a magic solution to
            genuine market saturation.
          </p>
        </Section>

        <Section id="kasiaihub" title="How kasiAIhub Approaches Pricing">
          <p>
            kasiAIhub's{" "}
            <Link to="/sessions/think-and-plan" className="text-primary hover:underline">
              Session 1 — Think & Plan
            </Link>{" "}
            includes building a pricing model specific to each entrepreneur's
            actual costs and market position, using Claude to work through
            real numbers rather than industry averages or generic formulas.
            Combined with the market research also covered in Session 1,
            entrepreneurs leave with a clearer, evidence-based view of where
            their pricing stands relative to their specific local competition
            — not a one-size-fits-all pricing template.
          </p>
          <p>
            The pricing conversation continues in{" "}
            <Link to="/sessions/build-and-create" className="text-primary hover:underline">
              Session 2: Build & Create
            </Link>{" "}
            (packaging your offer into a bookable system) and{" "}
            <Link to="/sessions/brand-and-grow" className="text-primary hover:underline">
              Session 3: Brand & Grow
            </Link>{" "}
            (positioning that makes price less of the whole conversation). See
            the full{" "}
            <Link to="/entrepreneur-ai-journey" className="text-primary hover:underline">
              Entrepreneur AI Journey
            </Link>{" "}
            for how it all fits together, and read the broader{" "}
            <Link
              to="/blog/ai-adoption-township-entrepreneurs-south-africa-2026"
              className="text-primary hover:underline"
            >
              state of AI adoption in community business
            </Link>{" "}
            for context on where this fits in the bigger picture.
          </p>
          <p>
            <Link
              to="/sessions/think-and-plan"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              See how pricing gets built in Session 1 →
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
            Standard Bank Community and Informal Economy Report (October 2025);
            2024 academic research on pricing strategies in South African
            townships.
          </p>
        </Section>
              <TownshipStudyInvite />
      </article>
    </main>
  );
}
