import { createFileRoute, Link } from "@tanstack/react-router";
import { TownshipStudyInvite } from "@/components/TownshipStudyInvite";

const CANONICAL =
  "https://kasiaihub.com/blog/ai-plus-kasi-wisdom-township-business";
const TITLE =
  "What Happens When Mam Soso Has 300 Customers Instead of 30? | kasiAIhub";
const DESCRIPTION =
  "Community businesses were built on trust, not algorithms. Here's why AI doesn't replace that — and what happens the moment a business outgrows one person's memory.";
const PUBLISHED = "2026-07-29";
const UPDATED = "2026-08-06";

const faq = [
  {
    q: "Does using AI mean losing the personal touch that built the business?",
    a: "No — the goal is the opposite. AI in this context handles the parts memory can't scale (reminders, records, follow-ups), specifically so the personal relationship stays personal even as the business grows past what one person can hold in their head.",
  },
  {
    q: "At what point does a community business actually need this kind of support?",
    a: "Usually it's not about a fixed number of customers — it's the moment an owner notices they can no longer remember who's a regular, who's drifted away, or who's due to come back. That's the signal, whether it happens at 50 customers or 500.",
  },
  {
    q: "Isn't this just automation replacing relationships?",
    a: "It's the reverse. Automation handling reminders and records is what allows the relationship-building — the part only a person can do — to stay the owner's full focus, instead of competing with admin for their attention.",
  },
  {
    q: "If the wisdom and trust are already real, why does a business still struggle to grow or get funded?",
    a: "Because trust built inside a community rarely exists in a form anyone outside that community can see or verify. A funder can't assess loyalty they can't observe. This isn't a flaw in the wisdom — it's a gap in what's been written down. Turning real income, real pricing and a real operating record into something that exists outside one person's memory is what starts to close that gap.",
  },
];

export const Route = createFileRoute(
  "/blog/ai-plus-kasi-wisdom-township-business",
)({
  head: () => ({
    meta: [
      { title: "What If Mam Soso Has 300 Customers Instead of 30?" },
      { name: "description", content: "Community businesses were built on trust, not algorithms. AI doesn't replace that. See what happens the moment a business outgrows one person's memory." },
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
            "What Happens When Mam Soso Has 300 Customers Instead of 30?",
          description: DESCRIPTION,
          author: { "@type": "Organization", name: "kasiAIhub" },
          publisher: { "@type": "Organization", name: "kasiAIhub" },
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          mainEntityOfPage: CANONICAL,
          inLanguage: "en-ZA",
          about: "AI community business South Africa",
          keywords:
            "AI community business South Africa, kasi wisdom AI, community entrepreneur trust customer relationships",
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
              name: "AI Plus Kasi Wisdom",
              item: CANONICAL,
            },
          ],
        }),
      },
    ],
  }),
  component: AiPlusKasiWisdomArticle,
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

function AiPlusKasiWisdomArticle() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/blog/township-business-hub" className="hover:text-foreground">Community Business Hub</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">AI Plus Kasi Wisdom</span>
        </nav>

        <header>
          <p className="text-sm uppercase tracking-widest text-primary">
            Reflection
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            What Happens When Mam Soso Has 300 Customers Instead of 30?
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Community businesses were built on trust, not algorithms. Here's why
            AI doesn't replace that — and what happens the moment a business
            outgrows one person's memory.
          </p>
        </header>

        <section className="mt-12 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>Yesterday I read a comment that made me stop and think.</p>
          <p>
            Someone said community businesses don't need AI. Look at his aunt, he
            said. She started with nothing — a small stand outside her house,
            selling steamed bread and amagwinya. No Facebook, no website, no
            strategy. Just up before the sun, dough made, stove lit, hoping
            someone would come.
          </p>
          <p>
            First it was people from church. Then the stokvel. Then someone at
            the taxi rank mentioned her to a friend. Before long, the community
            knew one thing: Mam Soso bakes good bread.
          </p>
          <p>
            That's how these businesses have always been built. Not on
            algorithms. On trust, and showing up, and being good enough that
            people tell someone else.
          </p>
          <p className="text-foreground font-medium">
            No AI will ever replace that.
          </p>
        </section>

        <Section id="one-question" title="But then I asked myself one question">
          <p className="text-foreground font-medium">
            What happens when Mam Soso has 300 customers instead of 30?
          </p>
          <p>
            Can she still remember every face? Who hasn't come by in months? Who
            buys the week after payday and never before? At 30 customers, all of
            that lives easily in her head — it's not a system, it's just knowing
            your people. At 300, the same thing that made her business work
            starts to break, not because she's forgotten how to bake or how to
            treat people, but because no memory holds three hundred
            relationships the way it held thirty.
          </p>
          <p className="text-foreground font-medium">
            This is not AI replacing her. It's protecting what she built.
          </p>
          <p>
            A WhatsApp that goes out tomorrow morning — "the bread is fresh,
            come through" — sent to the people who buy after payday, right when
            they're likely to want it. A quiet record of who hasn't come by in a
            while, so she can reach out before they're gone for good, not after.
          </p>
          <p>
            AI can remember the details. It cannot know the people. It will
            never understand why the stokvel matters, or what it means when
            someone from the taxi rank vouches for you. Only Mam Soso can do
            that. What AI can do is carry the three hundred details so she
            doesn't have to — freeing her up to keep doing the one thing no
            system ever will: actually knowing the people she serves.
          </p>
          <p>
            We've written more about that disappearing-customer problem in{" "}
            <Link
              to="/blog/township-business-customer-retention-south-africa"
              className="text-primary hover:underline"
            >
              why your best customers keep disappearing
            </Link>
            .
          </p>
        </Section>

        <Section
          id="harder-truth"
          title="But there's a harder truth underneath even that"
        >
          <p>
            Here's what nobody wants to say plainly, so I will.
          </p>
          <p>
            Mam Soso's wisdom is real. The trust is real. Thirty years of
            showing up, remembering names, knowing who's struggling this month
            and quietly adding an extra vetkoek to their bag — that is genuine
            intelligence, built the hardest way there is.
          </p>
          <p className="text-foreground font-medium">
            And on its own, it has never travelled further than her own two
            hands.
          </p>
          <p>
            It's kept her invisible to a funder, yes — thirty years of loyal
            customers doesn't show up as a number anyone outside the community
            can verify. But it's kept her invisible to more than banks. To the
            customer three streets over who's never heard of her, because word
            of mouth only reaches as far as people already walking past her
            stand. To her own margin, because the real cost of her flour, her
            gas, her time was never actually worked out — she charges what feels
            fair, not what the numbers say she needs. And to her own future,
            because none of what she knows exists anywhere but in her. If she's
            sick for a week, the business doesn't slow down. It stops. Nobody
            else can pick up what was never written down anywhere.
          </p>
          <p>
            That's why so many businesses like hers stay small. Not because the
            wisdom running them is small. Because wisdom built entirely on
            presence and memory was never designed to travel beyond arm's reach
            — not to a funder, not to a stranger three streets away, not even to
            a family member who might one day want to carry it forward.
          </p>
        </Section>

        <Section
          id="where-ai-earns-its-place"
          title="This is where AI actually earns its place"
        >
          <p>
            Not by replacing what she knows. By finally giving it a form that
            travels — beyond her street, beyond her memory, beyond the days
            she's physically able to stand at that stove herself.
          </p>
          <p>
            A record of real income, kept daily, that could be shown to someone
            outside the community and still make sense. A true price, worked out
            from real costs, that survives being questioned by a stranger — and
            actually pays her what the work is worth. A way to be found by the
            customer three streets over who has never walked past her stand and
            never will, unless something other than foot traffic tells them she
            exists. A written account of exactly how the business runs, so it
            doesn't collapse the one week she can't be there, and could one day
            be handed to someone else to carry on.
          </p>
          <p>
            None of that replaces the thirty years. It's what finally lets the
            thirty years travel further than her own two hands ever could on
            their own. That's the same argument we make in{" "}
            <Link
              to="/blog/ai-investable-township-business-south-africa"
              className="text-primary hover:underline"
            >
              how AI makes a community business investable
            </Link>
            .
          </p>
        </Section>

        <Section
          id="never-a-choice"
          title="Maybe it was never a choice between the two"
        >
          <p>
            Most of the conversation about AI in townships gets framed as a
            fight. AI versus kasi wisdom. The algorithm versus the auntie who
            remembers your order before you say it.
          </p>
          <p>
            I don't think that's the real choice. I think it's AI plus kasi
            wisdom — the trust she's spent years building, finally held up by
            something that matches the size of what she's built, and legible to
            the people who could help her build further.
          </p>
          <p>
            But there's another reason this was never really a fight, and it
            goes back further than AI.
          </p>
          <p>
            Technology has always demanded a toll from businesses like Mam
            Soso's. Either you had the skill to use it yourself, or you had the
            money to pay someone who did. She never had a chance to learn the
            first, and a business that was started to survive was never going to
            have spare cash for the second. So for years, the honest truth was
            that software was never actually available to her at all — not
            because she wasn't capable, but because every door to it charged an
            entry fee she couldn't pay, in time she never had or money she never
            had either.
          </p>
          <p>
            What's different now is the toll itself. She doesn't need to learn
            to code. She doesn't need to hire someone who can. She just needs to
            describe her business, in her own words, the way she'd explain it to
            anyone — and the tool is built to actually understand her, well
            enough to give something accurate back. That's not a small shift.
            That's the door finally opening on a fee she was always able to pay:
            knowing her own business better than anyone.
          </p>
          <p>
            The entrepreneur has always been the hero of this story. Mam Soso
            was the hero long before anyone mentioned AI, and she'll still be
            the hero after. AI is just another tool in her hands — one that
            happens to be good at the things memory and reputation alone can't
            do: holding three hundred relationships as carefully as she once
            held thirty, finally showing the world what she's actually built,
            and understanding her, in her own words, without asking her to
            become someone she was never going to be.
          </p>
          <p>
            That belief is the reason{" "}
            <Link to="/about" className="text-primary hover:underline">
              kasiAIhub exists
            </Link>
            .
          </p>
          <DiagnosticCta label="Find out what kind of business you're running →" />
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
