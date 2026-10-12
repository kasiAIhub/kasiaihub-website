import { createFileRoute } from "@tanstack/react-router";
import { SessionPage, buildFaqSchema, type FaqItem } from "@/components/SessionPage";

const TITLE = "Session 3: Market Visibility Engine | kasiAIhub";
const DESCRIPTION =
  "Build your Market Visibility Engine in one day with ChatGPT + Claude. Create brand assets, a 30-day content plan and reusable marketing support — R1,500.";
const URL = "https://kasiaihub.com/sessions/brand-and-grow";

const faq: FaqItem[] = [
  {
    q: "Do I need design experience?",
    a: "No. ChatGPT generates professional images and content from simple descriptions. You just need to know your business.",
  },
  {
    q: "Can I attend Session 3 without 1 and 2?",
    a: "No. Session 3 brands and markets what was strategised in Session 1 and built in Session 2. All three sessions must be attended in sequence.",
  },
  {
    q: "What do I leave with exactly?",
    a: "A fully branded app or website, a 30-day content calendar, professional product images, and a funding proposal draft — all built around your specific business.",
  },
];

export const Route = createFileRoute("/sessions/brand-and-grow")({
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
      eyebrow="SESSION 03 · BRAND & GROW"
      prerequisiteLine="Prerequisite: Sessions 1 & 2"
      headline="Build Your Market Visibility Engine"
      subheadline="One day. Your Market Visibility Engine gets built — your system gets branded, your marketing gets built, and your business finally looks as good as it actually is."
      ctaLabel="Enrol in Session 3 — R1,500"
      preselectSession="s3"
      problemHeadline="43% of Entrepreneurs Are Invisible in Their Own Community"
      problemBody={
        <>
          <p style={{ margin: "0 0 16px" }}>
            Not because the product is bad. Because nobody knows it exists. You post
            sometimes. Nothing happens. You stop posting. Still nothing happens. Meanwhile
            your competitor down the road looks twice as professional with half the quality.
          </p>
          <p style={{ margin: 0 }}>
            Session 3 fixes how your business looks and sounds — permanently.
          </p>
        </>
      }
      poweredBy="Claude (strategy & copy) + ChatGPT (visual generation)"
      buildItems={[
        { title: "Product & Brand Photography", description: "Professional images generated in seconds — food that looks irresistible, spaces that feel premium, products that sell themselves." },
        { title: "Your App, Fully Branded", description: "The placeholder images from Session 2 get replaced. Your Lovable app or website is now complete, live and fully branded." },
        { title: "A 30-Day Content Calendar", description: "Posts, captions and offers — planned and ready. Show up consistently without the daily stress of 'what do I post today?'" },
        { title: "Social Media Strategy", description: "Claude builds the strategy. ChatGPT creates the assets. Your brand voice, finally consistent everywhere." },
        { title: "Bonus: Pitching & Funding Assistant", description: "A professional funding proposal structure, drafted from information you verify — for grants, loans or investors. Funding is never guaranteed." },
      ]}
      duration={[
        "6 hours · 9:00am – 3:00pm",
        "Up to 8 learners per class",
      ]}
      walkAway="A fully branded business system and a working Market Visibility Engine — your Session 1 strategy, your Session 2 build, and now a full month of professional marketing content ready to post."
      priceHeadline="Pricing — R1,500 per session includes:"
      priceIncludes={[
        "6-hour guided brand and marketing-system build session.",
        "ChatGPT Plus subscription (1 month)",
        "Refreshments on the day",
        "30 days of WhatsApp support included.",
      ]}
      bundleLine="Or save R500 with the Full Programme Bundle — R4,000. All 3 sessions. All tools. A practical business system starter."
      faq={faq}
      closingHeadline="Your Business Is Ready to Be Seen."
      faqSchemaId="s3-faq"
    />
  );
}
