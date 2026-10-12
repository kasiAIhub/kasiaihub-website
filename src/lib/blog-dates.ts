// Publication and last-updated dates for blog articles.
// Single source of truth used by the blog index, hub pages and article headers.

export type BlogDate = {
  published: string;
  updated: string;
  showPublished: boolean;
};

export const BLOG_DATES: Record<string, BlogDate> = {
  "/blog/your-next-customer-will-send-a-bot": { published: "2026-10-09", updated: "2026-10-09", showPublished: true },
  "/blog/what-an-ai-agent-does-for-a-community-business": { published: "2026-10-09", updated: "2026-10-09", showPublished: true },
  "/blog/run-your-back-office-with-an-ai-agent": { published: "2026-10-07", updated: "2026-10-07", showPublished: true },
  "/blog/grok-bot-ai-agents-township-entrepreneur": { published: "2026-08-19", updated: "2026-08-19", showPublished: false },
  "/blog/ai-watermarking-township-business-risk": { published: "2026-08-18", updated: "2026-08-18", showPublished: false },
  "/blog/what-to-teach-children-age-of-ai": { published: "2026-08-05", updated: "2026-08-05", showPublished: true },
  "/blog/ai-bottleneck-moved-township-business": { published: "2026-08-04", updated: "2026-08-06", showPublished: false },
  "/blog/what-ai-can-do-for-your-business-test": { published: "2026-08-03", updated: "2026-08-06", showPublished: false },
  "/blog/ai-plus-kasi-wisdom-township-business": { published: "2026-07-29", updated: "2026-08-06", showPublished: false },
  "/blog/township-business-study-south-africa": { published: "2026-07-22", updated: "2026-08-06", showPublished: false },
  "/blog/ai-agents-township-business-south-africa": { published: "2026-07-15", updated: "2026-08-06", showPublished: false },
  "/blog/ai-investable-township-business-south-africa": { published: "2026-07-08", updated: "2026-08-06", showPublished: false },
  "/blog/popia-ai-small-business-south-africa": { published: "2026-07-01", updated: "2026-08-06", showPublished: false },
  "/blog/business-diagnostic-south-africa": { published: "2026-06-24", updated: "2026-08-06", showPublished: false },
  "/blog/township-business-product-development-south-africa": { published: "2026-06-17", updated: "2026-08-06", showPublished: false },
  "/blog/ai-infrastructure-barriers-south-africa-2026": { published: "2026-06-10", updated: "2026-06-10", showPublished: true },
  "/blog/ai-language-barrier-township-entrepreneurs-south-africa": { published: "2026-06-03", updated: "2026-08-06", showPublished: false },
  "/blog/township-business-customer-retention-south-africa": { published: "2026-05-27", updated: "2026-08-06", showPublished: false },
  "/blog/township-business-financial-management-south-africa": { published: "2026-05-20", updated: "2026-08-06", showPublished: false },
  "/blog/township-business-pricing-strategy-south-africa": { published: "2026-05-13", updated: "2026-08-06", showPublished: false },
  "/blog/township-business-funding-applications-south-africa": { published: "2026-05-06", updated: "2026-08-06", showPublished: false },
  "/blog/township-business-compliance-registration-south-africa": { published: "2026-04-29", updated: "2026-08-06", showPublished: false },
  "/blog/township-business-marketing-south-africa": { published: "2026-04-22", updated: "2026-08-06", showPublished: false },
  "/blog/ai-adoption-township-entrepreneurs-south-africa-2026": { published: "2026-04-15", updated: "2026-04-15", showPublished: true },
  "/blog/ai-marketing-guide": { published: "2026-04-08", updated: "2026-08-06", showPublished: false },
  "/blog/ai-business-training-cost-south-africa": { published: "2026-04-01", updated: "2026-08-06", showPublished: false },
  "/blog/ai-tools-managing-small-business-without-staff": { published: "2026-03-25", updated: "2026-08-06", showPublished: false },
  "/blog/ai-marketing-tools-small-business-south-africa": { published: "2026-03-18", updated: "2026-08-06", showPublished: false },
  "/blog/start-using-ai-small-business-no-technical-background": { published: "2026-03-11", updated: "2026-08-06", showPublished: false },
  "/blog/best-ai-business-training-platforms-south-africa": { published: "2026-03-04", updated: "2026-08-06", showPublished: false },
  "/blog/ai-course-south-africa": { published: "2026-02-25", updated: "2026-08-06", showPublished: false },
  "/blog/ai-for-small-business-south-africa": { published: "2026-02-18", updated: "2026-08-06", showPublished: false },
};

export function formatBlogDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[(m ?? 1) - 1]} ${y}`;
}

export function blogDateLabel(slug: string): { label: string; iso: string } | null {
  const entry = BLOG_DATES[slug];
  if (!entry) return null;
  const iso = entry.showPublished ? entry.published : entry.updated;
  const prefix = entry.showPublished ? "Published" : "Last updated";
  return { label: `${prefix} ${formatBlogDate(iso)}`, iso };
}

export function blogSortKey(slug: string): number {
  const entry = BLOG_DATES[slug];
  return entry ? Date.parse(entry.published) : 0;
}
