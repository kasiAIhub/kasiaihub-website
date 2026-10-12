import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sitemapSource = readFileSync(
  new URL("../routes/sitemap[.]xml.ts", import.meta.url),
  "utf8",
);

describe("requested sitemap update dates", () => {
  it.each([
    "/",
    "/about",
    "/entrepreneur-ai-journey",
    "/diagnostic",
    "/sessions/think-and-plan",
    "/resources",
    "/kasi-move",
    "/privacy",
    "/blog/your-next-customer-will-send-a-bot",
    "/blog/run-your-back-office-with-an-ai-agent",
    "/blog/what-an-ai-agent-does-for-a-community-business",
    "/blog/ai-marketing-guide",
    "/blog/ai-course-south-africa",
    "/blog/ai-for-small-business-south-africa",
    "/blog/best-ai-business-training-platforms-south-africa",
    "/blog/start-using-ai-small-business-no-technical-background",
    "/blog/ai-marketing-tools-small-business-south-africa",
    "/blog/ai-tools-managing-small-business-without-staff",
    "/blog/ai-business-training-cost-south-africa",
    "/blog/township-business-marketing-south-africa",
    "/blog/township-business-compliance-registration-south-africa",
    "/blog/township-business-funding-applications-south-africa",
    "/blog/township-business-pricing-strategy-south-africa",
    "/blog/township-business-financial-management-south-africa",
    "/blog/ai-adoption-township-entrepreneurs-south-africa-2026",
    "/blog/business-diagnostic-south-africa",
    "/blog/township-business-customer-retention-south-africa",
    "/blog/ai-language-barrier-township-entrepreneurs-south-africa",
    "/blog/ai-infrastructure-barriers-south-africa-2026",
    "/blog/township-business-product-development-south-africa",
    "/blog/popia-ai-small-business-south-africa",
    "/blog/ai-agents-township-business-south-africa",
    "/blog/township-business-study-south-africa",
    "/blog/ai-plus-kasi-wisdom-township-business",
    "/blog/ai-bottleneck-moved-township-business",
    "/blog/what-ai-can-do-for-your-business-test",
    "/blog/what-to-teach-children-age-of-ai",
    "/blog/ai-watermarking-township-business-risk",
    "/blog/grok-bot-ai-agents-township-entrepreneur",
  ])("dates %s to the approved 9 October 2026 update", (path) => {
    expect(sitemapSource).toContain(
      `{ path: "${path}", lastmod: "2026-10-09",`,
    );
  });

  it("does not apply a fallback modification date to unrelated pages", () => {
    expect(sitemapSource).not.toContain("DEFAULT_LASTMOD");
    expect(sitemapSource).toContain(
      'e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null',
    );
  });
});