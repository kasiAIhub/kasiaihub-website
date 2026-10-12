import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://kasiaihub.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/privacy", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.7" },
          { path: "/kasi-move", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.7" },
          { path: "/blog/your-next-customer-will-send-a-bot", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/what-an-ai-agent-does-for-a-community-business", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/run-your-back-office-with-an-ai-agent", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/", lastmod: "2026-10-09", changefreq: "weekly", priority: "1.0" },
          { path: "/about", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.8" },
          { path: "/entrepreneur-ai-journey", lastmod: "2026-10-09", changefreq: "weekly", priority: "0.9" },
          { path: "/diagnostic", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/sessions/think-and-plan", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/sessions/build-and-create", changefreq: "monthly", priority: "0.9" },
          { path: "/sessions/brand-and-grow", changefreq: "monthly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/resources", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.7" },
          { path: "/blog/ai-basics", changefreq: "weekly", priority: "0.8" },
          { path: "/blog/township-business-hub", changefreq: "weekly", priority: "0.8" },
          { path: "/township-study", changefreq: "monthly", priority: "0.7" },
          { path: "/faq", changefreq: "monthly", priority: "0.7" },
          { path: "/blog/ai-marketing-guide", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.8" },
          { path: "/blog/ai-course-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-for-small-business-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/best-ai-business-training-platforms-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/start-using-ai-small-business-no-technical-background", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-marketing-tools-small-business-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-tools-managing-small-business-without-staff", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-business-training-cost-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/township-business-marketing-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/township-business-compliance-registration-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/township-business-funding-applications-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/township-business-pricing-strategy-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/township-business-financial-management-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-adoption-township-entrepreneurs-south-africa-2026", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/business-diagnostic-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/township-business-customer-retention-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-language-barrier-township-entrepreneurs-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-infrastructure-barriers-south-africa-2026", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/township-business-product-development-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/popia-ai-small-business-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-investable-township-business-south-africa", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-agents-township-business-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/township-business-study-south-africa", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.8" },
          { path: "/blog/ai-plus-kasi-wisdom-township-business", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-bottleneck-moved-township-business", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/what-ai-can-do-for-your-business-test", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/what-to-teach-children-age-of-ai", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/ai-watermarking-township-business-risk", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
          { path: "/blog/grok-bot-ai-agents-township-entrepreneur", lastmod: "2026-10-09", changefreq: "monthly", priority: "0.9" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
