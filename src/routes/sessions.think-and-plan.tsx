import { createFileRoute } from "@tanstack/react-router";
import { SessionPage, buildFaqSchema, type FaqItem } from "@/components/SessionPage";

const TITLE = "Session 1: Think & Plan | AI Business Strategy Training | kasiAIhub";
const DESCRIPTION =
  "Sales is the thread through Session 1. Using Claude + Gemini, turn what you know about your business into a practical Customer Pipeline Starter — a clearer offer, your ideal customer, prospect starting points and a follow-up rhythm. R1,500. Book now.";
const URL = "https://kasiaihub.com/sessions/think-and-plan";

const faq: FaqItem[] = [
  {
    q: "Do I need to know anything about AI before Session 1?",
    a: "No. This is built for entrepreneurs with no technical background. If Claude is new to you, we start from the very beginning.",
  },
  {
    q: "Can I only attend Session 1?",
    a: "Yes. Session 1 stands alone and gives you real, immediate value. Sessions 2 and 3 build on what you create here, so we recommend continuing when you're ready.",
  },
  {
    q: "What do I need to bring?",
    a: "A laptop or computer, a Gmail account, and your actual business — real numbers, real challenges, real goals.",
  },
];

export const Route = createFileRoute("/sessions/think-and-plan")({
  head: () => ({
    meta: [
      { title: "Session 1: Think & Plan | Pipeline Starter | kasiAIhub" },
      { name: "description", content: "Session 1 turns what you know about your business into a Customer Pipeline Starter: a clearer offer, your ideal customer and a follow-up rhythm. R1,500." },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(buildFaqSchema(faq)) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SessionPage
      eyebrow="SESSION 01 · THINK & PLAN"
      headline="Build Your Customer Pipeline Starter"
      subheadline="Sales is the thread through Session 1. Using Claude and Gemini, you will turn what you know about your business into a practical Customer Pipeline Starter: a clearer offer, an ideal-customer profile, a prospect list structure, outreach starting points and a simple follow-up rhythm. These are working starting points for your review and use, not a promise of replies or sales."
      ctaLabel="Enrol in Session 1 — R1,500"
      preselectSession="s1"
      problemHeadline="You're Busy Every Day. Still Broke Every Month."
      problemBody={
        <>
          <p style={{ margin: "0 0 16px" }}>
            Most entrepreneurs know their sales. Almost none know their real profit. You're
            guessing on pricing, avoiding compliance because it feels overwhelming, and
            running your entire business from memory.
          </p>
          <p style={{ margin: 0 }}>Session 1 fixes that in one sitting.</p>
        </>
      }
      poweredBy="Claude (business writing & strategy) + Gemini (research engine, free)"
      frameworkBlock={
        <div>
          <h3 style={{ fontSize: 22, margin: "16px 0 12px" }}>The 4 Ds Framework</h3>
          <p style={{ color: "#9CA3AF", marginBottom: 16 }}>
            Every entrepreneur learns how to work with Claude properly:
          </p>
          <ul style={{ display: "grid", gap: 10, paddingLeft: 20, color: "#FFFFFF" }}>
            <li><strong style={{ color: "#10B981" }}>Delegate</strong> — know what to hand to Claude and what stays with you</li>
            <li><strong style={{ color: "#10B981" }}>Describe</strong> — give Claude enough context to actually help</li>
            <li><strong style={{ color: "#10B981" }}>Discern</strong> — you're the expert on your business, Claude is the tool</li>
            <li><strong style={{ color: "#10B981" }}>Diligence</strong> — keep feeding it, keep refining it</li>
          </ul>
        </div>
      }
      buildItems={[
        { title: "Customer Pipeline Starter", description: "Buyer definition, qualification rules, three researched prospect examples, tailored outreach and a 7-day follow-up plan — working starting points for your review and use, not a promise of replies or sales." },
        { title: "Your Claude Skills", description: "Skills tailored to your business — permanent, and yours to keep." },
        { title: "Market & Competitor Research", description: "Gemini pulls real data — what's selling in your industry, what competitors charge, what your market is actually searching for." },
        { title: "Pricing Intelligence", description: "Stop guessing. Get a pricing strategy built on your real costs and real market position." },
        { title: "Compliance Checklist", description: "Claude researches exactly what your specific business needs — registration, permits, certificates — mapped out clearly, no jargon." },
        { title: "Your Business Workflow", description: "Step by step, how your business actually operates — mapped so clearly it becomes the blueprint for Session 2." },
      ]}
      duration={[
        "6 hours · 9:00am – 3:00pm",
        "Up to 8 learners per class",
        "No technical experience required",
      ]}
      walkAway="By the end of Session 1, you have a practical Customer Pipeline Starter — a clearer offer, your ideal customer, prospect starting points and a follow-up rhythm — plus Claude Skills tailored to your business, ready to be built into a practical business system starter in Session 2."
      priceHeadline="Pricing — R1,500 per session includes:"
      priceIncludes={[
        "6-hour guided build session, with learning built into the work.",
        "Claude Pro subscription (1 month)",
        "Gemini research access (free)",
        "Refreshments on the day",
        "30 days of WhatsApp support included.",
      ]}
      bundleLine="Or save R500 with the Full Programme Bundle — R4,000. All 3 sessions. All tools. A practical business system starter."
      faq={faq}
      closingHeadline="Your Business Deserves a Strategy. Not a Guess."
      faqSchemaId="s1-faq"
    />
  );
}
