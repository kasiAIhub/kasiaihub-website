import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/popia-ai-small-business-south-africa";
const TITLE =
  "POPIA and AI: What South African Small Businesses Need to Know | kasiAIhub";
const DESCRIPTION =
  "Using ChatGPT or Claude in your business? POPIA already applies. A plain-English guide for South African small business owners on what's allowed, what isn't, and how to use AI safely.";
const PUBLISHED = "2026-07-01";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "Is it illegal to use ChatGPT or Claude in a South African business?",
    a: "No. There is no law prohibiting the use of AI tools in South Africa. POPIA governs how you handle personal information when using them — which is a rules-for-use question, not a ban.",
  },
  {
    q: "Does POPIA apply to my small business, or only to big companies?",
    a: "POPIA applies broadly to organisations processing personal information, not only to large companies. The practical obligations scale with what you actually do, but the law is not limited to businesses of a certain size.",
  },
  {
    q: "Can I paste my customer list into an AI tool?",
    a: "It's safer to anonymise it first — remove names and identifying details, then paste. You'll get the same analytical benefit without transferring identifiable personal information to servers outside South Africa.",
  },
  {
    q: "Is South Africa getting an AI law?",
    a: "Not immediately. The Draft National AI Policy was published in April 2026 and withdrawn shortly afterwards, and the timeline has extended beyond 2026. The current expectation is that existing laws like POPIA will be strengthened to address AI, rather than a standalone AI Act being introduced.",
  },
  {
    q: "What happens if I get this wrong?",
    a: "POPIA provides for enforcement action by the Information Regulator. Rather than focusing on worst-case penalties, the practical takeaway is that most small business risk is addressed by basic caution about what personal information you share with AI tools. If you're concerned about your specific situation, speak to a qualified attorney.",
  },
];

export const Route = createFileRoute(
  "/blog/popia-ai-small-business-south-africa",
)({
  head: () => ({
    meta: [
      { title: "POPIA and AI: What Small Businesses Need to Know | kasiAIhub" },
      { name: "description", content: "Using AI in your business? POPIA already applies. A plain-English guide for South African owners on what is allowed, what isn't, and how to use AI safely." },
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
            "POPIA and AI: What South African Small Businesses Need to Know",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          about: "POPIA compliance and AI for South African small business",
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
              name: "POPIA and AI",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: PopiaAndAI,
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

function PopiaAndAI() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">POPIA and AI</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Compliance · POPIA
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            POPIA and AI: What South African Small Businesses Need to Know
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            You've started using ChatGPT or Claude in your business. Maybe you
            pasted a customer list in to sort it. Maybe you typed a client's
            details into a chatbot to draft a quote. And somewhere at the back
            of your mind, a question you can't quite answer: am I actually
            allowed to do this?
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            It's a fair question, and almost nobody is answering it for small
            business owners. Most POPIA content is written for companies with
            legal departments. Most AI guidance is written for the United
            States, where POPIA doesn't exist. Here's the plain-English
            version for a South African small business.
          </p>
          <p className="mt-4 text-sm italic text-muted-foreground">
            This article is general information, not legal advice. For
            guidance on your specific situation, speak to a qualified
            attorney.
          </p>
        </header>

        <Section id="misconception" title="First, the thing most people get wrong">
          <p>
            There's a widespread assumption that AI is unregulated in South
            Africa — that because there's no AI Act, there are no rules. That's
            not correct.
          </p>
          <p>
            South Africa does not have a standalone AI law, and it's not
            getting one imminently. A Draft National Artificial Intelligence
            Policy was published for public comment on 10 April 2026 — then
            withdrawn roughly two weeks later, after it emerged the document
            contained fictitious academic citations, most likely generated by
            AI itself. The policy timeline has since stretched well beyond
            2026.
          </p>
          <p>
            But a missing AI Act does not mean a legal vacuum. POPIA already
            governs how AI systems handle personal information — including
            automated decision-making, profiling, and sending data across
            borders. If your AI use touches anyone's personal information,
            POPIA applies to you right now, today, whether or not a dedicated
            AI law ever arrives.
          </p>
        </Section>

        <Section id="personal-information" title='What actually counts as "personal information"'>
          <p>
            This is where most small business owners trip up, because POPIA's
            definition is broader than people expect. It covers information
            relating to an identifiable person — a customer, a supplier, an
            employee, a child in your care.
          </p>
          <p>In practice, for a typical small business, that includes:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Names, ID numbers, addresses, phone numbers, email addresses</li>
            <li>Banking and payment details</li>
            <li>
              Health information — directly relevant if you run a creche, a
              salon doing chemical treatments, or a beauty business recording
              client allergies
            </li>
            <li>Information about children, which POPIA treats with additional care</li>
            <li>Employment records for anyone you employ</li>
          </ul>
          <p>
            It's worth being clear about the flip side too, because the fear
            is often bigger than the risk: a great deal of AI use touches no
            personal information at all. Asking Claude to help you think
            through your pricing, using Gemini to research what competitors
            are charging, generating a marketing image in ChatGPT, drafting a
            social media caption — none of that involves anyone's personal
            data. POPIA has nothing to say about it.
          </p>
          <p>The rules kick in when real people's details are involved.</p>
        </Section>

        <Section id="cross-border" title="The issue nobody thinks about: your data leaves the country">
          <p>Here's the one that catches people out.</p>
          <p>
            When you paste something into ChatGPT or Claude, that information
            is processed on servers outside South Africa. POPIA has specific
            provisions governing the transfer of personal information across
            borders — and most small business owners have never considered
            that pasting a client list into a chatbot is, legally speaking, a
            cross-border data transfer.
          </p>
          <p>
            This doesn't mean you can't use these tools. It means you should
            be deliberate about what you put into them.
          </p>
        </Section>

        <Section id="five-rules" title="Five practical rules that solve most of it">
          <p>
            You don't need a compliance department. For a small business,
            most of the risk disappears with a handful of habits.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                1. Anonymise before you paste.
              </h3>
              <p className="mt-2">
                If you want AI to help analyse your customer list, strip the
                names first. "Customer 1, Customer 2" works just as well for
                spotting patterns as real names do. The AI doesn't need to
                know who they are to be useful.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                2. Use initials, not full names.
              </h3>
              <p className="mt-2">
                Drafting a message to a specific client? Write "draft a
                payment reminder for a client who is 30 days late" — not
                "draft a payment reminder for Thabo Mokoena at 42 Church
                Street."
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                3. Never upload identity documents.
              </h3>
              <p className="mt-2">
                ID copies, passports, birth certificates, proof of address.
                There is almost no business task where uploading these to a
                chatbot is necessary, and it's the highest-risk thing you
                could do.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                4. Be especially careful with children's and health data.
              </h3>
              <p className="mt-2">
                If you run an ECD centre or a health-adjacent service, this
                category deserves extra caution. Don't put children's names,
                medical details, or family circumstances into AI tools.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                5. Know what the tool does with your input.
              </h3>
              <p className="mt-2">
                Some AI tools use what you type to train their models by
                default; some don't; many let you turn it off in settings.
                Check the setting on whichever tool you use, and turn
                training off if the option exists.
              </p>
            </div>
          </div>
        </Section>

        <Section id="marketing-warning" title="A separate warning: marketing messages">
          <p>
            This one isn't about AI directly, but it catches small businesses
            constantly, and AI makes it easier to get wrong at scale.
          </p>
          <p>
            Amended POPIA regulations that took effect on 17 April 2025
            tightened the rules on direct marketing, requiring written
            consent before sending unsolicited electronic communications.
            Enforcement attention on electronic direct marketing has been
            increasing.
          </p>
          <p>
            The practical implication: using AI to generate a marketing
            campaign is completely fine. Using it to blast that campaign to a
            list of people who never agreed to hear from you is where the
            risk sits — and that risk exists whether a human or an AI wrote
            the message.
          </p>
        </Section>

        <Section id="why-it-matters" title="Why this matters more than it used to">
          <p>
            South Africa's Information Regulator has been actively focused on
            data breaches. Reported security compromises between April and
            September 2025 numbered 1,607 — around a 60% increase on the
            previous year. A mandatory reporting tool went live in April 2025
            to streamline how breaches get reported.
          </p>
          <p>
            The direction of travel is clear: more attention, more reporting,
            more enforcement. Small businesses that build good habits now are
            simply better positioned than those who deal with it after
            something goes wrong.
          </p>
        </Section>

        <Section id="small-business" title="What this means for a community or small business specifically">
          <p>
            There's an honest point worth making here. Compliance
            conversations in South Africa are usually pitched at businesses
            that can afford a compliance officer. That framing leaves out
            most of the country's actual businesses — and it creates a real
            problem, because fear of getting it wrong stops people from
            adopting tools that would genuinely help them.
          </p>
          <p>
            The realistic position for a small business is this: you are not
            expected to build a corporate data governance framework. You are
            expected to be careful with other people's information. For most
            small businesses, the five habits above cover the overwhelming
            majority of the practical risk.
          </p>
          <p>
            Being cautious about what you paste into a chatbot costs you
            nothing. Avoiding AI entirely because you're unsure about the
            rules costs you a great deal. If you're still weighing the
            broader compliance picture,{" "}
            <Link
              to="/blog/township-business-compliance-registration-south-africa"
              className="text-primary hover:underline"
            >
              our guide on community business registration
            </Link>{" "}
            is a good companion read, and the{" "}
            <Link to="/diagnostic" className="text-primary hover:underline">
              free business diagnostic
            </Link>{" "}
            will tell you where compliance sits relative to the other gaps
            in your business.
          </p>
        </Section>

        <Section id="kasiaihub" title="How kasiAIhub handles this">
          <p>
            Compliance runs through the kasiAIhub programme rather than
            sitting in a separate module. In{" "}
            <Link to="/sessions/think-and-plan" className="text-primary hover:underline">
              Session 1
            </Link>
            , entrepreneurs build a compliance checklist specific to their
            business type using Claude — and part of that work is
            understanding what information their business actually holds,
            and how to use AI tools safely with it.
          </p>
          <p>
            The approach throughout is the same as this article: practical
            habits over paperwork, and confidence over fear. You should
            finish the{" "}
            <Link to="/entrepreneur-ai-journey" className="text-primary hover:underline">
              Entrepreneur AI Journey
            </Link>{" "}
            using AI more, not less — just deliberately.
          </p>
          <p>
            <Link
              to="/sessions/think-and-plan"
              className="inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              See how compliance is covered in Session 1 →
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
            Michalsons commentary on South African AI policy and POPIA
            (April 2026); DLA Piper analysis of the withdrawal of South
            Africa's Draft AI Policy (May 2026); Werksmans Attorneys, South
            Africa's Data, AI and Cybersecurity Outlook 2026; HRSpot
            guidance on POPIA-aligned workplace AI policy (2026).
          </p>
          <p className="mt-4 text-sm italic">
            This article provides general information only and does not
            constitute legal advice.
          </p>
        </Section>
              <TownshipStudyInvite />
      </article>
    </main>
  );
}
