import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Cpu,
  Globe,
  Bot,
  BadgeDollarSign,
  Settings2,
  Users,
  CalendarDays,
  Headset,
  UserRound,
  Hammer,
  CheckCheck,
  CalendarCheck,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { KasiLogo } from "@/components/KasiLogo";
import { EnrolModal } from "@/components/EnrolModal";

import heroImage from "@/assets/kasi-hero-1.webp.asset.json";
import trustBarAsset from "@/assets/lovable-certified-short-dark-surface.svg.asset.json";

import buildSessionImage from "@/assets/kasi-build-session.webp.asset.json";
import ctaPortraitImage from "@/assets/kasi-cta-portrait.webp.asset.json";
import goldTextureImage from "@/assets/kasi-gold-texture.webp.asset.json";
import p2Image from "@/assets/kasi-p2-system.webp.asset.json";
import oneBloomImage from "@/assets/kasi-one-bloom.webp.asset.json";
import cohortImage from "@/assets/kasi-cohort.webp.asset.json";
import EntrepreneurJourney from "@/components/EntrepreneurJourney";
import HomeMotionEffects from "@/components/HomeMotionEffects";

const SITE_TITLE = "AI Business Systems Training for South African Community Businesses | kasiAIhub";
const SITE_DESCRIPTION =
  "Helping community businesses build real systems with AI. In a practical 3-day programme, leave with working websites, marketing assistants, and business workflows — not notes.";
const OG_IMAGE_URL = `https://kasiaihub.com${heroImage.url}`;

const systemCards = [
  {
    badge: "Personalised Learning System",
    name: "P²",
    description:
      "Personalised daily lesson plans built around each child. Aligned to curriculum. Delivered to parents via WhatsApp every week.",
    link: "View P² website →",
    href: "https://mypsquared.com/",
    image: p2Image.url,
    imageAlt: "P² personalised learning system graphic with a learner on a glowing path toward a bright city.",
  },
  {
    badge: "Wellness Distribution System",
    name: "One Bloom",
    description:
      "An intelligent system that qualifies wellness leads, personalises product recommendations, and prepares coaching reports for review.",
    link: "View One Bloom website →",
    href: "https://myonebloom.co.za/",
    image: oneBloomImage.url,
    imageAlt: "One Bloom wellness distribution system graphic with gold typography and a botanical leaf.",
  },
  {
    badge: "Food Vendor Ordering Platform",
    name: "Kasi Move",
    panelVariant: "kasi-move",
    description:
      "We built Kasi Move so food vendors can give customers a menu they can order from on their phones. See the customer view in a live demo stall.",
    link: "Try a live demo stall →",
    href: "https://move.kasiaihub.com/stall/b74d09a3-4739-40aa-b4f5-cc19b93e20d4",
  },
  {
    badge: "Braiding Salon Booking App",
    name: "Crowned",
    panelVariant: "crowned",
    description:
      "We built Crowned so families can book a place in a braiding salon's line and follow their booking on a private live page. The salon manages the line while it works.",
    link: "Try Crowned →",
    href: "https://crownedsalon.lovable.app/",
  },
] as const;

const journeyOutcomes = [
  {
    label: "Session 1 — Think & Plan",
    tone: "emerald",
    outcome:
      "You leave knowing who your likely buyer is, what makes your offer different, and how the first prospects and follow-up will be approached.",
  },
  {
    label: "Session 2 — Build & Create",
    tone: "blue",
    outcome:
      "You leave with one working priority system built around your real business and customer journey, plus a clear handover for using it.",
  },
  {
    label: "Session 3 — Brand & Grow",
    tone: "purple",
    outcome:
      "You leave with a brand identity and asset pack, a marketing assistant, a 30-day content plan, and pitching materials you verify.",
  },
] as const;

const leaveWithItems = [
  {
    title: "Customer Pipeline Starter",
    description:
      "Buyer definition, qualification rules, three researched prospect examples, tailored outreach and a 7-day follow-up plan.",
    icon: Users,
  },
  {
    title: "Claude Skills",
    description: "Tailored to your business. Permanent, and yours to keep.",
    icon: Cpu,
  },
  {
    title: "Customer Conversion System",
    description:
      "One working priority system built from your diagnostic, around your real business and customer journey.",
    icon: Globe,
  },
  {
    title: "Business Workflow",
    description: "Your operating model written down and organised.",
    icon: Settings2,
  },
  {
    title: "Brand Identity & Asset Pack",
    description: "Practical brand assets you can start using straight away.",
    icon: Hammer,
  },
  {
    title: "Marketing Assistant",
    description: "Grounded in your business and buyer. You review before anything is published.",
    icon: Bot,
  },
  {
    title: "30-Day Content Plan",
    description: "Linked to real customer questions and offers. Ready to adapt, approve and publish.",
    icon: CalendarDays,
  },
  {
    title: "Pitching & Funding Assistant",
    description: "Helps you prepare and improve funding and pitching materials; funding is not guaranteed.",
    icon: BadgeDollarSign,
  },
  {
    title: "30 Days of WhatsApp Support Included",
    description: "Direct WhatsApp access to kasiAIhub after the journey ends.",
    icon: Headset,
  },
  {
    title: "1-Month AI Subscription",
    description: "Your tools stay live for 30 days after the session. The work continues without interruption.",
    icon: CalendarCheck,
  },
] as const;

const cohortPoints = [
  {
    title: "Personal attention",
    description: "You are not a number. Your business is treated as unique.",
    icon: UserRound,
  },
  {
    title: "Hands-on implementation",
    description: "You build during the session — not as homework afterward.",
    icon: Hammer,
  },
  {
    title: "Build alongside peers",
    description: "Other entrepreneurs sharpen your thinking in real time.",
    icon: Users,
  },
  {
    title: "Leave with working assets",
    description: "Every session produces something real you take home that day.",
    icon: CheckCheck,
  },
] as const;

const sessionCards: Array<{
  session: string;
  title: string;
  tools: string;
  tagline: string;
  note: string;
  price: string;
  prerequisite: string;
  accent: "emerald" | "blue" | "purple" | "gold";
  items: string[];
  image?: string;
  imageAlt?: string;
  isNew?: boolean;
  cta?: string;
  sessionKey: "s1" | "s2" | "s3" | "s4";
}> = [
  {
    session: "Session 1",
    title: "Think & Plan",
    tools: "Claude + Gemini",
    tagline: "Turn your business diagnosis into a practical customer plan.",
    note: "Sales is the spine of Session 1: understand the business, understand the buyer, find the first prospects and prepare the first outreach. The prospect examples are based on public information and are starting points for human review, not a promise of replies or sales.",
    price: "R1,500",
    prerequisite: "Prerequisite: None",
    accent: "emerald",
    sessionKey: "s1",
    cta: "Enrol In Session 1 →",
    items: [
      "In-depth business diagnostic, done together in person",
      "Clear offer, value proposition and likely buyer",
      "Customer Pipeline Starter: buyer definition, qualification rules, three researched prospect examples, tailored outreach and a 7-day follow-up plan",
      "Competitor, market and pricing research",
      "Business workflow and operating model",
      "Compliance and risk research",
      "Claude Skills tailored to your business, permanent and yours to keep",
      "1-month AI tool subscription",
    ],
  },

  {
    session: "Session 2",
    title: "Build & Create",
    tools: "Claude + Lovable",
    tagline:
      "Build your Customer Conversion System — the one priority system identified in Session 1 that turns interest into action.",
    note: "You leave with a working Customer Conversion System built around your real business and customer journey, plus a clear handover for using it.",
    price: "R1,500",
    prerequisite: "Prerequisite: Session 1",
    accent: "blue",
    sessionKey: "s2",
    cta: "Enrol In Session 2 →",
    items: [
      "Depending on your diagnostic: a focused website or landing page, lead-capture form, booking or deposit flow, customer-record system, follow-up tracker, or another practical workflow",
      "Claude helps define the logic and content; Lovable turns the agreed solution into a working digital build",
      "A clear handover so you know how to use what was built",
      "1-month AI tool subscription",
    ],
    image: buildSessionImage.url,
    imageAlt: "Entrepreneur working on a laptop in a dark studio setting.",
  },
  {
    session: "Session 3",
    title: "Brand & Grow",
    tools: "ChatGPT + Claude",
    tagline:
      "Build your Market Visibility Engine — the brand and marketing system that keeps new customers coming, built around the customer insight and working system created in Sessions 1 and 2.",
    note: "The tools help you prepare, organise and improve the work. You review every public message, proposal and application. Funding, reach and sales are never guaranteed. You leave with reusable assistants and templates you can continue using and refining.",
    price: "R1,500",
    prerequisite: "Prerequisite: Sessions 1 & 2",
    accent: "purple",
    sessionKey: "s3",
    cta: "Enrol In Session 3 →",
    items: [
      "Brand identity and practical asset pack",
      "Marketing GPT grounded in your business and buyer",
      "30-day content plan linked to real customer questions and offers",
      "Sustainable social media routine",
      "Pitching and funding assistant built from information you verify",
      "Reusable campaign and follow-up templates",
      "1-month AI tool subscription",
    ],
  },
  {
    session: "Session 4",
    title: "Advanced: Agentic AI",
    tools: "Grokbot, ChatGPT dots and Instinct",
    tagline: "Install your Supervised Digital Team around the systems your business already uses.",
    note: "The agents prepare, organise, recommend and flag. You approve important actions. This is supervised agentic AI, not an unattended system running the business.",
    price: "R4,500",
    prerequisite: "Recommended after the Core Journey — or start here if you already work comfortably with AI",
    accent: "gold",
    isNew: true,
    sessionKey: "s4",
    cta: "Enrol In Session 4 →",
    items: [
      "Pricing, Visibility, Compliance, Finance and Follow-up support, coordinated by a Chief of Staff",
      "Connected workflows tailored to the business",
      "Approval gates for client communication, money, compliance and final decisions",
      "Cost monitoring and a clear daily check-in",
      "30 days of WhatsApp support included.",
    ],
  },
];

const methodSteps = [
  {
    number: "01",
    title: "Assess",
    description: "Understand the entrepreneur. Their context, constraints, and goals.",
  },
  {
    number: "02",
    title: "Plan",
    description: "Create a personalised roadmap. Not a generic template.",
  },
  {
    number: "03",
    title: "Build",
    description: "Build the actual system. Not slides about the system.",
  },
  {
    number: "04",
    title: "Grow",
    description: "Support, measure, and scale what works.",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "kasiAIhub",
  url: "https://kasiaihub.com/",
  telephone: "+27 81 890 5861",
  email: "kasihubai@gmail.com",
  slogan: "Helping Community Businesses Build Real Systems With AI",
  description: SITE_DESCRIPTION,
  image: OG_IMAGE_URL,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Business Systems Training | kasiAIhub" },
      { name: "description", content: "A practical 3-day programme where community businesses build real systems with AI. Leave with a working system for your business, not notes." },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kasiaihub.com/" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: "https://kasiaihub.com/" },
      { rel: "preload", as: "image", href: heroImage.url, fetchpriority: "high" } as unknown as {
        rel: string;
        href: string;
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Logo() {
  return <KasiLogo tagline />;
}

/* Small WhatsApp glyph drawn inline — lucide has no brand icons. */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function WhatsAppNavButton() {
  return (
    <a
      className="kasi-nav-wa"
      href="https://wa.me/27818905861"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp us"
      title="WhatsApp us"
    >
      <WhatsAppIcon />
    </a>
  );
}

function scrollToId(id: string) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
}

function NavLink({
  label,
  target,
  active = false,
  onClick,
}: {
  label: string;
  target: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={active ? "kasi-nav-link is-active" : "kasi-nav-link"}
      onClick={() => {
        scrollToId(target);
        onClick?.();
      }}
    >
      {label}
    </button>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [enrolOpen, setEnrolOpen] = useState(false);
  const [preselectSession, setPreselectSession] = useState<"s1" | "s2" | "s3" | "s4" | "all" | null>(null);

  const openEnrol = () => {
    setPreselectSession(null);
    setMenuOpen(false);
    setEnrolOpen(true);
  };

  const openEnrolWithSession = (id: "s1" | "s2" | "s3" | "s4" | "all" | null) => {
    setPreselectSession(id);
    setMenuOpen(false);
    setEnrolOpen(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#enrol") {
      setPreselectSession(null);
      setEnrolOpen(true);
      // Clear the hash so re-navigating home later doesn't re-open the modal.
      try {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="kasi-page">
      <header className="kasi-nav-shell">
        <div className="kasi-nav">
          <div className="kasi-nav-mobile-toggle-wrap">
            <div className="kasi-nav-wa-slot">
              <button
                type="button"
                className="kasi-menu-toggle"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
              <WhatsAppNavButton />
            </div>
          </div>

          <div className="kasi-nav-logo-wrap">
            <button
              type="button"
              className="kasi-logo-button"
              aria-label="kasiAIhub home"
              onClick={() => scrollToId("home")}
            >
              <Logo />
            </button>
          </div>

          <nav className="kasi-nav-links" aria-label="Primary">
            <NavLink label="Home" target="home" active />
            <Link to="/about" className="kasi-nav-link">
              About
            </Link>
            <Link to="/diagnostic" className="kasi-nav-link">
              Business Check
            </Link>
            <Link to="/resources" className="kasi-nav-link">
              Resources
            </Link>
            <Link to="/kasi-move" className="kasi-nav-link">
              Kasi Move
            </Link>
            <button type="button" className="kasi-nav-link" onClick={openEnrol}>
              Work with us
            </button>
            <NavLink label="Systems" target="systems" />
          </nav>

          <div className="kasi-nav-actions">
            <WhatsAppNavButton />
            <button type="button" className="kasi-button kasi-button-nav" onClick={() => scrollToId("apply")}>
              Book a build →
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="kasi-mobile-menu">
            <NavLink label="Home" target="home" active onClick={() => setMenuOpen(false)} />
            <Link to="/about" className="kasi-nav-link" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/diagnostic" className="kasi-nav-link" onClick={() => setMenuOpen(false)}>
              Business Check
            </Link>
            <Link to="/resources" className="kasi-nav-link" onClick={() => setMenuOpen(false)}>
              Resources
            </Link>
            <Link
              to="/kasi-move"
              className="kasi-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Kasi Move
            </Link>
            <button type="button" className="kasi-nav-link" onClick={openEnrol}>
              Work with us
            </button>
            <NavLink label="Systems" target="systems" onClick={() => setMenuOpen(false)} />
          </div>
        ) : null}
      </header>

      <main>
        <section id="home" className="kasi-hero-section">
          <div className="kasi-hero-grid">
            <div className="kasi-hero-copy-wrap">
              <div className="kasi-hero-copy">
                <div className="kasi-badge">AI SYSTEMS, BUILT WITH YOU</div>

                <h1 className="kasi-hero-headline">
                  <span className="kasi-hero-line kasi-hero-line-intro">We build the system.</span>
                  <span className="kasi-hero-line-row">
                    <span className="kasi-hero-line-strong">You learn  </span>
                    <span className="kasi-hero-line-accent">by</span>
                  </span>
                  <span className="kasi-hero-line kasi-hero-line-script">building it.</span>
                </h1>

                <div className="kasi-hero-subtag">WORKING SYSTEMS FOR COMMUNITY ENTREPRENEURS</div>
                <p className="kasi-hero-body">
                  You build. We guide. Your business is the brief. In three days you build a working system for your
                  business with us beside you, and you keep building after the three days while we support you.
                </p>

                <div className="kasi-hero-actions">
                  <button
                    type="button"
                    className="kasi-button kasi-button-primary kasi-button-large"
                    onClick={() => scrollToId("journey")}
                  >
                    Book Your Seat →
                  </button>
                  <Link to="/diagnostic" className="kasi-button kasi-button-secondary kasi-button-large">
                    What kind of business system do you need — free, 4 min →
                  </Link>
                </div>


                <img
                  src={trustBarAsset.url}

                  alt="Lovable Certified Partner 2026"
                  className="kasi-hero-trustbar"
                  width={546}
                  height={128}
                  loading="eager"
                />
              </div>

            </div>

            <div className="kasi-hero-media">
              <img
                src={heroImage.url}
                alt="Smiling entrepreneur seated at a desk, representing the kasiAIhub Entrepreneur AI Journey."
                className="kasi-hero-image"
                loading="eager"
              />
              <div className="kasi-hero-image-overlay" aria-hidden="true" />

              <div className="kasi-floating-badge kasi-floating-badge-top">
                <div className="kasi-floating-number">3 DAYS</div>
                <div className="kasi-floating-label">TO BUILD YOUR SYSTEM</div>
                <div className="kasi-floating-divider" />
                <div className="kasi-floating-number kasi-floating-number-accent">1 MONTH</div>
                <div className="kasi-floating-label">OF SUPPORT</div>
              </div>

              <div className="kasi-floating-badge kasi-floating-badge-bottom">
                <div className="kasi-floating-mini-label">LEAVE WITH</div>
                <div className="kasi-floating-list-item">A working system you built.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="kasi-kasimove-strip">
          <div className="kasi-kasimove-strip-inner">
            <div className="kasi-kasimove-left">
              <span className="kasi-kasimove-mark" aria-hidden="true">
                K
              </span>
              <div className="kasi-kasimove-copy">
                <p className="kasi-kasimove-title">Food vendors: Kasi Move is coming.</p>
                <p className="kasi-kasimove-sub">Join the waitlist and be first in line.</p>
              </div>
            </div>
            <Link
              to="/kasi-move"
              className="kasi-button kasi-button-secondary kasi-kasimove-cta"
            >
              Join the waitlist
            </Link>
          </div>
        </div>

        <EntrepreneurJourney onEnrol={openEnrolWithSession} />

        <section className="kasi-section kasi-section-dark-gray">
          <div className="kasi-section-inner max-wrap">
            <div className="kasi-section-heading kasi-section-heading-centered">
              <div className="kasi-section-label">THE ENTREPRENEUR AI JOURNEY</div>
              <h2 className="kasi-section-title">Start Where You Are</h2>
              <p className="kasi-section-copy">
                You do not need R4,000 to begin. Start with one session and build from there.
              </p>
            </div>

            <div className="kasi-session-grid">
              {sessionCards.map((card) => (
                <article key={card.title} className={`kasi-session-card kasi-session-card-${card.accent}`}>
                  {card.isNew ? <span className="kasi-new-pill">NEW</span> : null}
                  <div className={`kasi-session-badge kasi-session-badge-${card.accent}`}>{card.session}</div>
                  <h3 className="kasi-session-title">{card.title}</h3>
                  <div className={`kasi-session-tools kasi-tone-${card.accent}`}>{card.tools}</div>
                  <div className="kasi-session-tagline">{card.tagline}</div>
                  <ul className="kasi-check-list">
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="kasi-session-note">{card.note}</div>
                  {card.image ? (
                    <img src={card.image} alt={card.imageAlt} className="kasi-session-accent-image" loading="lazy" />
                  ) : null}
                  <div className="kasi-session-price">{card.price}</div>
                  <div className="kasi-session-prerequisite">{card.prerequisite}</div>
                  {card.cta ? (
                    <button
                      type="button"
                      className={`kasi-button kasi-button-${card.accent} kasi-button-block`}
                      style={{ marginTop: "1rem" }}
                      onClick={() => openEnrolWithSession(card.sessionKey)}
                    >
                      {card.cta}
                    </button>
                  ) : null}
                </article>
              ))}

              <article className="kasi-featured-card">
                <div className="kasi-featured-badge">★ MOST POPULAR</div>
                <h3 className="kasi-session-title">Complete Journey</h3>
                <div className="kasi-session-tools kasi-tone-emerald">All 3 Sessions</div>
                <p className="kasi-system-description kasi-featured-description">
                  Complete the three-session Core Journey and connect your strategy, customer pipeline, working system,
                  brand and growth plan. Save R500.
                </p>
                <ul className="kasi-check-list">
                  <li>Personal attention throughout</li>
                  <li>Hands-on implementation in every session</li>
                  <li>Build alongside other learners</li>
                  <li>Leave with your strategy, working priority system, brand and growth plan connected</li>
                  <li>
                    1-Month AI Tool Subscription — Your tools stay active for 30 days after the session so your work
                    continues immediately.
                  </li>
                </ul>
                <div className="kasi-featured-price">R4,000</div>
                <div className="kasi-featured-savings">Save R500 vs individual sessions</div>
                <button type="button" className="kasi-button kasi-button-primary kasi-button-block" onClick={openEnrol}>
                  Enrol In The Complete Journey →
                </button>
              </article>
            </div>

            <p className="kasi-section-note kasi-section-note-small">
              Sessions can be booked individually. Prerequisites apply. Up to 8 learners per class. Each session is a
              standalone one-day class, 9am–3pm, Monday to Friday.
            </p>

            <p className="kasi-section-note kasi-section-note-small">
              Session 4 is a separate, optional advanced session.{" "}
              <Link to="/entrepreneur-ai-journey" style={{ color: "#F59E0B", textDecoration: "none" }}>
                See the full Session 4 detail →
              </Link>
            </p>
          </div>
        </section>

        <section
          className="kasi-section kasi-section-texture"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url(${goldTextureImage.url})`,
          }}
        >
          <div className="kasi-section-inner max-wrap">
            <div className="kasi-section-heading kasi-section-heading-centered">
              <div className="kasi-section-label">WHAT YOU GET</div>
              <h2 className="kasi-section-title">What You'll Leave With</h2>
              <p className="kasi-section-copy">
                Not certificates. Not notes. Not theory. Real assets you own and keep.
              </p>
            </div>

            <div className="kasi-assets-grid">
              {leaveWithItems.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="kasi-asset-card">
                    <Icon className="kasi-asset-icon" aria-hidden="true" />
                    <h3 className="kasi-asset-title">{item.title}</h3>
                    <p className="kasi-asset-description">{item.description}</p>
                  </article>
                );
              })}
            </div>

            <div className="kasi-keep-note">You keep everything you build.</div>
          </div>
        </section>

        <section id="systems" className="kasi-section kasi-section-black">
          <div className="kasi-section-inner max-wrap">
            <div className="kasi-section-heading kasi-section-heading-centered">
              <div className="kasi-section-label">REAL BUSINESSES. REAL RESULTS.</div>
              <h2 className="kasi-section-title">We Don't Just Teach Systems.</h2>
              <div className="kasi-section-title kasi-section-title-accent">We Build Them.</div>
              <p className="kasi-section-copy">
                Systems built by kasiAIhub. Explore the products and the problems they were designed to solve.
              </p>
            </div>

            <div className="kasi-systems-grid">
              {systemCards.map((card) => (
                <article key={card.name} className="kasi-system-card">
                  {"image" in card ? (
                    <img src={card.image} alt={card.imageAlt} className="kasi-system-card-image" loading="lazy" />
                  ) : (
                    <div
                      className={`kasi-system-card-image kasi-system-card-panel kasi-system-card-panel--${card.panelVariant}`}
                      aria-hidden="true"
                    >
                      {card.panelVariant === "crowned" ? (
                        <span className="kasi-crowned-panel-mark">
                          <svg
                            viewBox="0 0 30 24"
                            className="kasi-crowned-crown"
                            width="38"
                            height="30"
                            aria-hidden="true"
                          >
                            <path d="M3 8.2 8.2 13 15 3.8 21.8 13 27 8.2l-2.7 10.1H5.7L3 8.2Z" fill="currentColor" />
                            <circle cx="3" cy="6.8" r="1.8" fill="currentColor" />
                            <circle cx="15" cy="2.6" r="2.2" fill="currentColor" />
                            <circle cx="27" cy="6.8" r="1.8" fill="currentColor" />
                            <rect x="6" y="21" width="18" height="2" rx="1" fill="currentColor" />
                          </svg>
                          <span className="kasi-crowned-wordmark">Crowned</span>
                        </span>
                      ) : (
                        card.name
                      )}
                    </div>
                  )}
                  <div className="kasi-system-card-body">
                    <div className="kasi-system-badge">{card.badge}</div>
                    <h3 className="kasi-system-name">{card.name}</h3>
                    <p className="kasi-system-description">{card.description}</p>
                    <a href={card.href} target="_blank" rel="noopener noreferrer" className="kasi-system-link">
                      {card.link}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <p className="kasi-section-note">
              These products show how we turn business workflows into working digital systems.
            </p>
          </div>
        </section>

        <section className="kasi-section kasi-section-black">
          <div className="kasi-section-inner max-wrap">
            <div className="kasi-two-column kasi-two-column-reverse-mobile">
              <div className="kasi-cohort-copy">
                <div className="kasi-section-label kasi-section-label-left">WHY THIS WORKS</div>
                <h2 className="kasi-section-title kasi-section-title-left">Up to 8 Learners per Class</h2>
                <p className="kasi-section-copy kasi-section-copy-left">
                  This is not a classroom. This is a workshop. We group learners by session, location and preferred day,
                  with up to 8 learners per class, so every person gets real attention and real feedback.
                </p>

                <div className="kasi-point-list">
                  {cohortPoints.map((point) => {
                    const Icon = point.icon;
                    return (
                      <div key={point.title} className="kasi-point-item">
                        <div className="kasi-point-icon-wrap">
                          <Icon className="kasi-point-icon" aria-hidden="true" />
                        </div>
                        <div className="kasi-point-text">
                          <div className="kasi-point-title">{point.title}</div>
                          <div className="kasi-point-description">{point.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="kasi-cohort-media">
                <img
                  src={cohortImage.url}
                  alt="A small group of entrepreneurs around a table collaborating on laptops together."
                  className="kasi-cohort-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="kasi-section kasi-section-dark-gray">
          <div className="kasi-section-inner max-wrap">
            <div className="kasi-section-heading kasi-section-heading-centered">
              <div className="kasi-section-label">THE METHOD BEHIND EVERY SYSTEM</div>
              <h2 className="kasi-section-title">The kasiAIhub Method</h2>
              <p className="kasi-section-copy">
                Assess the problem. Plan the workflow. Build and test the system together. Support the owner in using
                it. You understand what is being built, why it matters and how to keep it useful.
              </p>
            </div>

            <div className="kasi-method-grid">
              {methodSteps.map((step, index) => (
                <div key={step.number} className="kasi-method-step-wrap">
                  <article className="kasi-method-card">
                    <div className="kasi-method-number">{step.number}</div>
                    <h3 className="kasi-method-title">{step.title}</h3>
                    <p className="kasi-method-description">{step.description}</p>
                  </article>
                  {index < methodSteps.length - 1 ? (
                    <div className="kasi-method-arrow" aria-hidden="true">
                      →
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <p className="kasi-method-note">
              This framework powers P², One Bloom, One Seed, and the Entrepreneur AI Journey.
            </p>
          </div>
        </section>


        <section id="apply" className="kasi-final-cta-section">
          <div className="kasi-final-cta-media" aria-hidden="true">
            <img src={ctaPortraitImage.url} alt="Smiling entrepreneur ready to start the free business check." className="kasi-final-cta-image" loading="lazy" />
            <div className="kasi-final-cta-gradient" />
          </div>

          <div className="kasi-final-cta-content max-wrap">
            <div className="kasi-final-cta-copy">
              <h2 className="kasi-final-title">
                <span>The Magic Is</span>
                <span>Already There.</span>
                <span className="kasi-final-title-accent">We'll Help You Bring It To Life.</span>
              </h2>

              <button type="button" className="kasi-button kasi-button-primary kasi-button-xl" onClick={openEnrol}>
                Enrol In The Entrepreneur AI Journey →
              </button>

              <p className="kasi-quiet-contact">
                Questions?{" "}
                <a href="https://wa.me/27818905861" target="_blank" rel="noreferrer">
                  WhatsApp us
                </a>
              </p>

              <div className="kasi-final-details">

                <span>Up to 8 Learners per Class</span>
                <span className="kasi-separator">|</span>
                <a href="tel:+27818905861">+27 81 890 5861</a>
                <span className="kasi-separator">|</span>
                <a href="https://kasiAIhub.com" target="_blank" rel="noreferrer">
                  kasiAIhub.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <HomeMotionEffects />

      <EnrolModal open={enrolOpen} onClose={() => setEnrolOpen(false)} preselectSession={preselectSession} />
    </div>
  );
}
