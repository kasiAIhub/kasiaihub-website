import { createFileRoute, Link } from "@tanstack/react-router";

const CANONICAL = "https://kasiaihub.com/about";
const TITLE = "About kasiAIhub | Building Businesses That Grow Beyond the Owner";
const DESCRIPTION =
  "Most community businesses were started to survive, not to scale. We help South African entrepreneurs build the systems that let a business grow beyond one person.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About kasiAIhub | Businesses That Grow Beyond the Owner" },
      { name: "description", content: "Most community businesses were started to survive, not to scale. We help South African entrepreneurs build the systems that let a business grow past one person." },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
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
          "@type": "AboutPage",
          name: "About kasiAIhub",
          url: CANONICAL,
          description: DESCRIPTION,
          mainEntity: {
            "@type": "Organization",
            name: "kasiAIhub",
            url: "https://kasiaihub.com",
            founder: { "@type": "Person", name: "Tsholo Monyausi" },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kasiaihub.com/" },
            { "@type": "ListItem", position: 2, name: "About", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-14 text-2xl md:text-3xl font-bold text-foreground">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">{children}</p>;
}

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">About</span>
        </nav>

        <header>
          <p className="text-xs uppercase tracking-widest text-primary">About kasiAIhub</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">About kasiAIhub</h1>
        </header>

        <H2>Where this starts</H2>
        <P>Most community businesses were not started to become businesses.</P>
        <P>
          They were started because a salary stopped. Because a factory closed. Because a child
          needed something that month and there was no other way to find it.
        </P>
        <P>
          So the business grows the way it has to — organically, never strategically. It responds.
          It survives. And often, over years, it becomes genuinely good at what it does.
        </P>
        <P>
          But somewhere along the way, nobody ever sat down with the owner and asked the
          questions a business is supposed to answer. Who exactly do you serve? What does this
          actually cost you to make? What happens when you're not there?
        </P>
        <P>Those questions don't get asked because there's no time to ask them. There's trading to do today.</P>
        <P>That gap — not effort, not ability, not ambition — is what we work on.</P>

        <H2>Who this is for</H2>
        <P>The entrepreneur who built something through resilience rather than strategy.</P>
        <P>
          You're already trading. Already serving customers. Already known in your community, and
          people come back. Nobody needs to convince you to work hard — you've been doing it for
          years, often for longer than the people advising you have been in business at all.
        </P>
        <P>But the business still runs on you. Your memory. Your hours. Your hands.</P>
        <P>
          You don't need motivation. You need clarity, and the systems that turn everything you
          already do into something that holds without you holding it.
        </P>

        <H2>What we actually solve</H2>
        <P>We don't sell AI. We don't sell websites. We don't sell automation.</P>
        <P>We solve one problem:</P>
        <p className="mt-6 rounded-xl border-l-4 border-primary bg-black/40 px-5 py-4 text-lg md:text-xl font-semibold text-foreground">
          Hard work eventually reaches its limit. Systems don't.
        </p>
        <P>
          Every business that depends entirely on one person has a ceiling, and the ceiling is
          that person's capacity. You can work harder for a while. You cannot work harder forever.
          And the moment you stop — illness, a funeral, a week away — the income stops with you.
        </P>
        <P>
          Systems are what change that. Not fancy ones. A real price built from real costs. A way
          for enquiries to be caught when you're busy. A record of who owes you money. A way for
          customers to find you who don't already know your street.
        </P>
        <P>
          AI is simply what makes those systems affordable for a business that could never
          previously justify them.
        </P>

        <H2>Why we start with a question</H2>
        <P>Most agencies ask: how do we get you more customers?</P>
        <P>Most AI companies ask: what do you want to automate?</P>
        <p className="mt-6 rounded-xl border-l-4 border-primary bg-black/40 px-5 py-4 text-lg md:text-xl font-semibold text-foreground">
          We ask something different: why is your business struggling to grow?
        </p>
        <P>
          The answer is rarely what people expect. The business that says it has a marketing
          problem often doesn't — it has a catching problem, where enquiries arrive and quietly
          disappear while the owner is serving someone else. The business that says it needs
          funding often can't get it for a different reason entirely: nothing about how it
          operates is written down anywhere a funder could read it.
        </P>
        <P>
          So we diagnose before we build. Always. Because building the wrong system properly is
          still the wrong system.
        </P>

        <H2>How we work</H2>
        <P>We build with you, not before or after a separate course. Your business is the brief.</P>
        <P>
          Together we decide what needs to work, build it, test it against your workflow, and
          practise using it. Learning happens inside that work, so you understand the system as
          well as owning the output.
        </P>
        <P>
          Three sessions. Each one produces something you keep and use — a pricing model, a
          working tool, a brand and a plan to grow it. Not notes. Not a certificate.
        </P>

        <H2>Who's behind it</H2>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">FOUNDER</p>
        <h3 className="mt-1 text-xl font-bold text-foreground md:text-2xl">Tsholo Monyausi</h3>
        <P>
          kasiAIhub is founded and run by Tsholo Monyausi, who has spent more than 20 years building
          entrepreneurship programmes for community and rural businesses across South Africa. She founded and led
          Boago Learning Solutions, delivering SETA and government-funded SMME development nationwide — including
          a mobile training model that reached communities far from urban centres. She has facilitated ten-week
          business development programmes hand-in-hand with community entrepreneurs, and serves on the Panel of
          Experts for eKasiLabs Enterprise Development at The Innovation Hub. kasiAIhub is the next chapter: the
          same hands-on, real-business approach, now with AI as the tool.
        </P>
        <P>
          She now builds digital products and helps community entrepreneurs build systems around the way
          their businesses actually work. Tsholo is a certified Lovable Expert Partner, in both website
          building and app building.
        </P>


        <H2>What we're promising</H2>
        <P>We help South African entrepreneurs build businesses that can grow beyond the owner.</P>
        <P>
          Not overnight. Not magically. Deliberately, one system at a time, starting with the one
          that's costing you most right now.
        </P>
        <P>
          Because every entrepreneur deserves a business that works for them — not one that only
          works because of them.
        </P>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/diagnostic"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:opacity-90"
          >
            What kind of business system do you need — free, 4 min →
          </Link>
          <Link
            to="/faq"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-black px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            Read the FAQ
          </Link>
        </div>
      </div>
    </main>
  );
}
