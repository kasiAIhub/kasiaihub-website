import { createFileRoute } from "@tanstack/react-router";
import { SessionPage, buildFaqSchema, type FaqItem } from "@/components/SessionPage";

const TITLE = "Session 2: Customer Conversion System | kasiAIhub";
const DESCRIPTION =
  "Build your Customer Conversion System in one day with Claude + Lovable. Create the priority system identified in Session 1 — R1,500.";
const URL = "https://kasiaihub.com/sessions/build-and-create";

const faq: FaqItem[] = [
  {
    q: "Do I need to know how to code?",
    a: "No. Lovable builds the app through conversation, not code. Claude helps you describe exactly what you need.",
  },
  {
    q: "Can I attend Session 2 without Session 1?",
    a: "No. Session 2 builds directly on the strategy and workflow created in Session 1. Attending Session 1 first is required.",
  },
  {
    q: "What kind of tool will I actually build?",
    a: "Whatever your business needs most — a booking system, a website, a fee tracker, a compliance form. Built specifically around your business, not a generic template.",
  },
];

export const Route = createFileRoute("/sessions/build-and-create")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
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
      eyebrow="SESSION 02 · BUILD & CREATE"
      prerequisiteLine="Prerequisite: Session 1"
      headline="Build Your Customer Conversion System"
      subheadline="One day. Your Session 1 strategy becomes your Customer Conversion System — a real, working tool built and live before you go home."
      ctaLabel="Enrol in Session 2 — R1,500"
      preselectSession="s2"
      problemHeadline="78% of Entrepreneurs Run Their Business From Memory"
      problemBody={
        <>
          <p style={{ margin: "0 0 16px" }}>
            No booking system. No records. No way to prove your operations to a funder or a
            bank. Customers cancel last minute after you've already bought the stock. You
            reply to WhatsApp enquiries hours late and lose the sale.
          </p>
          <p style={{ margin: 0 }}>
            Session 2 builds the system that fixes this — for good.
          </p>
        </>
      }
      poweredBy="Claude (technical co-pilot) + Lovable (the build platform)"
      frameworkBlock={
        <div>
          <h3 style={{ fontSize: 22, margin: "16px 0 12px" }}>How It Works</h3>
          <p style={{ color: "#9CA3AF", lineHeight: 1.7 }}>
            You arrive with your Session 1 workflow already mapped. No starting from
            scratch. Claude converts each step of your workflow into a Lovable prompt.
            Lovable builds it. You watch your business come to life in real time.
          </p>
        </div>
      }
      buildItemsHeading="What Gets Built — Matched To Your Business"
      buildItems={[
        { title: "Your Customer Conversion System — Prescribed by Session 1", description: "We build the single system your diagnostic identified — not a fixed list of everything. The options below are examples of what that can be." },
        { title: "Booking & Deposit Flow", description: "Customers book and pay a deposit online. Fewer last-minute cancellations costing you stock and time." },
        { title: "Compliance Forms, Fillable Online", description: "The compliance requirements identified in Session 1 become real, fillable forms — ready to complete and signable online. You review and submit them yourself." },
        { title: "Client & Fee Tracking", description: "Especially built for service businesses — ECDs, salons, consultants — with reminders prepared for you so payments stop slipping." },
        { title: "A Focused Business Website", description: "Claude writes the content. Lovable builds the site. You're visible to customers who will never find you through word of mouth alone." },
        { title: "Lead Capture & Follow-Up", description: "Every WhatsApp or website enquiry gets captured, with follow-up drafted and tracked. You review messages before they go out." },
      ]}
      duration={[
        "6 hours · 9:00am – 3:00pm",
        "Up to 8 learners per class",
        "Placeholder images used — real branding comes in Session 3",
      ]}
      walkAway="A live, working app or website — built specifically around your business, ready to use immediately, and ready to be fully branded in Session 3."
      priceHeadline="Pricing — R1,500 per session includes:"
      priceIncludes={[
        "6-hour guided system build and testing session.",
        "Lovable subscription (1 month)",
        "Refreshments on the day",
        "30 days of WhatsApp support included.",
      ]}
      bundleLine="Or save R500 with the Full Programme Bundle — R4,000. All 3 sessions. All tools. A practical business system starter."
      faq={faq}
      closingHeadline="Stop Running Your Business From Memory. Build The System."
      faqSchemaId="s2-faq"
    />
  );
}
