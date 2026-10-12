import React, { useEffect, useState } from "react";

const EMERALD = "#10B981";
const GOLD = "#F59E0B";
const MUTED = "#9CA3AF";

const glowFilter = "drop-shadow(0 0 8px rgba(0,168,107,0.55))";

function DecorativeLines({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 600"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: "8%",
        height: "84%",
        width: "clamp(110px, 16vw, 300px)",
        opacity: 0.22,
        pointerEvents: "none",
        transform: mirrored ? "scaleX(-1)" : undefined,
        [mirrored ? "right" : "left"]: 0,
      } as React.CSSProperties}
    >
      <path d="M-20 40 C 120 140, 60 300, 190 420" stroke={EMERALD} strokeWidth={1.4} fill="none" />
      <path d="M-40 110 C 110 220, 40 360, 180 500" stroke={EMERALD} strokeWidth={1.4} fill="none" />
      <path d="M-30 200 C 130 300, 70 440, 200 560" stroke={EMERALD} strokeWidth={1.4} fill="none" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        width: "clamp(30px, 4.4vw, 58px)",
        height: "clamp(30px, 4.4vw, 58px)",
        color: EMERALD,
        filter: glowFilter,
      }}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" />
    </svg>
  );
}

function GearIcon() {
  const teeth: Array<[number, number, number, number]> = [
    [19, 12, 21.8, 12],
    [16.95, 16.95, 18.93, 18.93],
    [12, 19, 12, 21.8],
    [7.05, 16.95, 5.07, 18.93],
    [5, 12, 2.2, 12],
    [7.05, 7.05, 5.07, 5.07],
    [12, 5, 12, 2.2],
    [16.95, 7.05, 18.93, 5.07],
  ];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        width: "clamp(30px, 4.4vw, 58px)",
        height: "clamp(30px, 4.4vw, 58px)",
        color: EMERALD,
        filter: glowFilter,
      }}
    >
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" />
      {teeth.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={3.4} />
      ))}
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        width: "clamp(30px, 4.4vw, 58px)",
        height: "clamp(30px, 4.4vw, 58px)",
        color: EMERALD,
        filter: glowFilter,
      }}
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        color: EMERALD,
        filter: "drop-shadow(0 0 6px rgba(0,200,120,0.7))",
        minWidth: 0,
      }}
    >
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
      <span style={{ flex: 1, height: 2, background: "currentColor", margin: "0 2px" }} />
      <svg width="14" height="16" viewBox="0 0 14 16">
        <polygon points="0,0 14,8 0,16" fill="currentColor" />
      </svg>
    </div>
  );
}

function ChevronDown() {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      aria-hidden="true"
      style={{
        color: EMERALD,
        filter: "drop-shadow(0 0 6px rgba(0,200,120,0.7))",
        margin: "8px auto",
        display: "block",
      }}
    >
      <polyline points="2,4 14,16 26,4" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Bullseye() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={1.6} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" fill={GOLD} />
    </svg>
  );
}

type SessionId = "s1" | "s2" | "s3";

type Session = {
  id: SessionId;
  number: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const sessions: Session[] = [
  { id: "s1", number: "01", label: "SESSION 1", title: "I DON'T HAVE A STRATEGY.", description: "I don't know what to focus on.", icon: <CompassIcon /> },
  { id: "s2", number: "02", label: "SESSION 2", title: "I DON'T HAVE SYSTEMS.", description: "Too much depends on me.", icon: <GearIcon /> },
  { id: "s3", number: "03", label: "SESSION 3", title: "MY CUSTOMERS CAN'T FIND ME.", description: "I’m invisible to the people who need me.", icon: <EyeIcon /> },
];

type DrawerContent = {
  eyebrow: string;
  title: string;
  tagline: string;
  tools: string[];
  summary: string;
  items: string[];
  price: string;
};

const drawerContent: Record<SessionId, DrawerContent> = {
  s1: {
    eyebrow: "SESSION 1",
    title: "I Don’t Have a Strategy.",
    tagline: "I don’t know what to focus on.",
    tools: ["Claude", "Gemini"],
    summary: "Most township and rural businesses run without a clear plan. Owners stay busy but directionless, saying yes to everything.",
    items: [
      "No written plan. Decisions are made day by day, in survival mode.",
      "About 20 similar businesses in the same community, and price competition is intense (Standard Bank 2025)",
      "Only 38% believe they have a competitive edge (Standard Bank 2025)",
      "Many face stagnation or decline, partly from poor financial planning (Standard Bank 2025)",
      "No focus keeps the business small and the owner exhausted",
    ],
    price: "R1,500",
  },
  s2: {
    eyebrow: "SESSION 2",
    title: "I Don’t Have Systems.",
    tagline: "Too much depends on me.",
    tools: ["Claude", "Lovable"],
    summary: "The business is the owner. If she stops, everything stops. Even profitable businesses often have almost no systems.",
    items: [
      "Everything lives in the owner’s head. No written steps, no handover.",
      "77% manage their money by hand (Standard Bank 2025)",
      "76.8% are profitable, yet only 34.7% have credible management reports and only 13.3% a 12-month budget (Fetola Bankability Gap Report)",
      "With a 12-month budget, 90.9% stayed financially stable. Without one, 65.3% (Fetola Bankability Gap Report)",
      "No records and no registration means no funding: 80% are unregistered, which blocks formal funding and markets (Standard Bank 2025)",
    ],
    price: "R1,500",
  },
  s3: {
    eyebrow: "SESSION 3",
    title: "My Customers Can’t Find Me.",
    tagline: "I’m invisible to the people who need me.",
    tools: ["ChatGPT", "Claude"],
    summary: "Most township businesses still rely on walk-in trade and word of mouth. They do good work but stay invisible outside a small local circle.",
    items: [
      "Marketing is the top need: 63% of township businesses (Standard Bank 2025)",
      "74% use WhatsApp and 47% Instagram, but only 30% have a website (Standard Bank 2025)",
      "Only 11% sell on online marketplaces, and about half depend on walk-in trade (Competition Commission 2026)",
      "Nearly a quarter (24%) say they can’t sell online because the business is not registered (Competition Commission 2026)",
    ],
    price: "R1,500",
  },
};

function SessionCard({ s, onActivate, isActive }: { s: Session; onActivate?: (id: SessionId) => void; isActive?: boolean }) {
  const [tapped, setTapped] = useState(false);

  const handleClick = () => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) {
      onActivate?.(s.id);
      return;
    }
    setTapped(true);
    window.setTimeout(() => {
      setTapped(false);
      onActivate?.(s.id);
    }, 300);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div style={{ position: "relative", marginTop: "clamp(22px, 2.4vw, 30px)" }}>
        {/* Number badge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%, -64%)",
            zIndex: 3,
            width: "clamp(42px, 4.4vw, 58px)",
            height: "clamp(42px, 4.4vw, 58px)",
            borderRadius: "50%",
            background: "linear-gradient(145deg, #10B981, #065F46)",
            color: "white",
            fontWeight: 700,
            fontSize: "clamp(16px, 1.7vw, 22px)",
            boxShadow: "0 0 0 5px #000000, 0 6px 22px -4px rgba(0,168,107,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {s.number}
        </div>

        {/* Circle */}
        <div
          className="kasi-journey-circle"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
          style={{
            position: "relative",
            width: "clamp(178px, 23vw, 322px)",
            height: "clamp(178px, 23vw, 322px)",
            borderRadius: "50%",
            border: (tapped || isActive) ? "2px solid rgba(16,185,129,1)" : "1px solid rgba(16, 185, 129, 0.38)",
            background: "radial-gradient(circle at 50% 42%, rgba(16,185,129,0.07), transparent 60%)",
            boxShadow: isActive ? "inset 0 0 60px -20px rgba(16,185,129,0.55), 0 0 28px -6px rgba(16,185,129,0.55)" : "inset 0 0 60px -20px rgba(16,185,129,0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(4px, 0.6vw, 8px)",
            padding: "7%",
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.3s ease",
          }}
        >
          <div className="kasi-journey-icon" style={{ position: "relative", marginTop: 8, marginBottom: -8 }}>

            {s.icon}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-8%",
                left: "22%",
                width: "56%",
                height: 13,
                borderRadius: "50%",
                background: `radial-gradient(ellipse at center, ${GOLD}, transparent 70%)`,
                filter: "blur(5px)",
                opacity: 0.85,
              }}
            />
          </div>
          <div
            style={{
              color: EMERALD,
              fontSize: "clamp(10px, 1vw, 13px)",
              fontWeight: 600,
              letterSpacing: "0.27em",
              marginTop: "clamp(3px, 0.5vw, 9px)",
            }}
          >
            {s.label}
          </div>
          <div
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: "clamp(18px, 2.3vw, 32px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              whiteSpace: "normal",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {s.title}
          </div>
          <div
            style={{
              width: "clamp(38px, 4vw, 56px)",
              height: 2,
              borderRadius: 2,
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              margin: "clamp(1px, 0.3vw, 5px) 0",
            }}
          />
          <div style={{ color: MUTED, fontSize: "clamp(11px, 1.05vw, 14px)", maxWidth: "72%", lineHeight: 1.35 }}>{s.description}</div>
        </div>
      </div>

    </div>
  );
}

type Props = { onEnrol?: (id: SessionId | "all" | null) => void };

export function toggleJourneySession(selected: Record<SessionId, boolean>, id: SessionId) {
  return { ...selected, [id]: !selected[id] };
}

export default function EntrepreneurJourney({ onEnrol }: Props) {
  const [activeId, setActiveId] = useState<SessionId | null>(null);
  const [selected, setSelected] = useState<Record<SessionId, boolean>>({ s1: false, s2: false, s3: false });
  const [isMobile, setIsMobile] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStart = React.useRef<number | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const didMountActive = React.useRef(false);

  useEffect(() => {
    if (isMobile) return;
    if (!didMountActive.current) { didMountActive.current = true; return; }
    if (activeId && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeId, isMobile]);


  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!activeId || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [activeId, isMobile]);

  const close = () => { setActiveId(isMobile ? null : "s1"); setDragY(0); };
  const enrolNow = (id: SessionId) => { if (isMobile) setActiveId(null); onEnrol?.(id); };

  const toggleSelect = (id: SessionId) => setSelected((s) => toggleJourneySession(s, id));
  const addAll = () => setSelected({ s1: true, s2: true, s3: true });
  const clearAll = () => setSelected({ s1: false, s2: false, s3: false });

  const count = (Object.values(selected) as boolean[]).filter(Boolean).length;
  const subtotal = count * 1500;
  const fullJourney = count === 3;
  const discount = fullJourney ? 500 : 0;
  const total = subtotal - discount;

  const handleBookSeat = () => {
    if (fullJourney) onEnrol?.("all");
    else if (count === 1) {
      const onlyId = (Object.keys(selected) as SessionId[]).find((k) => selected[k]) ?? null;
      onEnrol?.(onlyId);
    } else onEnrol?.(null);
  };

  const content = activeId ? drawerContent[activeId] : null;
  const desktopActive = !isMobile && content ? content : null;

  return (
    <section
      id="journey"
      className="kasi-journey-section"
      style={{
        background: "#000000",
        width: "100%",
        padding: "clamp(44px, 6vw, 90px) clamp(18px, 5vw, 72px)",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="kasi-journey-deco">
        <DecorativeLines />
        <DecorativeLines mirrored />
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 800,
            color: "white",
            marginTop: 8,
          }}
        >
          The 3 Problems Holding Your Business Back
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 1.4vw, 18px)",
            color: "#6B7280",
            marginTop: 8,
          }}
        >
          See the three challenges holding your business back and how to overcome them.
        </p>
        <div
          style={{
            width: 48,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${EMERALD}, transparent)`,
            margin: "16px auto 0",
          }}
        />
      </div>

      {/* Cards grid */}
      <div
        className="kasi-journey-grid"
        style={{
          maxWidth: 1400,
          margin: "clamp(40px, 5vw, 70px) auto 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SessionCard s={sessions[0]} onActivate={setActiveId} isActive={activeId === "s1"} />
        <div className="kasi-journey-arrow-desktop"><ArrowRight /></div>
        <div className="kasi-journey-arrow-mobile"><ChevronDown /></div>
        <SessionCard s={sessions[1]} onActivate={setActiveId} isActive={activeId === "s2"} />
        <div className="kasi-journey-arrow-desktop"><ArrowRight /></div>
        <div className="kasi-journey-arrow-mobile"><ChevronDown /></div>
        <SessionCard s={sessions[2]} onActivate={setActiveId} isActive={activeId === "s3"} />
      </div>

      {/* Caption line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          marginTop: "clamp(48px, 6vw, 80px)",
          maxWidth: 1100,
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="kasi-journey-caption-line"
          style={{
            flex: 1,
            maxWidth: "clamp(60px, 18vw, 260px)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
          <span style={{ flex: 1, height: 0, borderTop: `1px dashed ${GOLD}`, opacity: 0.7 }} />
        </div>
        <Bullseye />
        <div
          style={{
            fontSize: "clamp(15px, 1.7vw, 23px)",
            fontWeight: 600,
            color: "white",
            textAlign: "center",
          }}
        >
          Build one stage at a time or complete the full{" "}
          <span style={{ color: EMERALD }}>Entrepreneur AI Journey.</span>
        </div>
        <div
          className="kasi-journey-caption-line"
          style={{
            flex: 1,
            maxWidth: "clamp(60px, 18vw, 260px)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ flex: 1, height: 0, borderTop: `1px dashed ${GOLD}`, opacity: 0.7 }} />
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
        </div>
      </div>

      {/* Desktop / tablet inline detail panel + summary tray (≥768px) */}
      {!isMobile && desktopActive && (() => {
        const dc = desktopActive;
        const id = activeId as SessionId;
        const isSelected = selected[id];
        return (
        <div
          ref={panelRef}
          className="kasi-journey-desktop-only"

          style={{
            maxWidth: 1200,
            margin: "clamp(40px, 5vw, 64px) auto 0",
            position: "relative",
            zIndex: 1,
            background: "#0F0F0F",
            border: "1px solid rgba(16,185,129,0.18)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ height: 3, width: "100%", background: EMERALD }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(24px, 3vw, 48px)",
              padding: "clamp(24px, 3vw, 40px)",
            }}
            className="kasi-journey-panel-grid"
          >
            {/* Left */}
            <div>
              <div style={{ color: EMERALD, fontSize: 12, fontWeight: 600, letterSpacing: "0.27em", textTransform: "uppercase" }}>
                {dc.eyebrow}
              </div>
              <h3 style={{ color: "white", fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 800, marginTop: 10, lineHeight: 1.15 }}>
                {dc.title}
              </h3>
              <p style={{ color: "#9CA3AF", fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.6, marginTop: 10 }}>
                {dc.tagline}
              </p>
              <div style={{ color: EMERALD, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", marginTop: 24, textTransform: "uppercase" }}>
                Tools
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {dc.tools.map((t) => (
                  <span key={t} style={{
                    fontSize: 13, color: EMERALD,
                    border: `1px solid ${EMERALD}`, borderRadius: 999,
                    padding: "5px 12px", background: "rgba(16,185,129,0.06)",
                  }}>{t}</span>
                ))}
              </div>
              <p style={{ color: "#9CA3AF", fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.6, marginTop: 20 }}>
                {dc.summary}
              </p>
            </div>
            {/* Right */}
            <div>
              <div style={{ color: EMERALD, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                The Real Problem
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
                {dc.items.map((it) => (
                  <li key={it} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "white", fontSize: 15 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 22 }}>
                <span style={{ color: "white", fontSize: 30, fontWeight: 800 }}>{dc.price}</span>
                <span style={{ color: "#9CA3AF", fontSize: 14 }}>/ single session</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSelect(id)}
                style={{
                  marginTop: 16, width: "100%",
                  background: isSelected ? "transparent" : EMERALD,
                  color: isSelected ? EMERALD : "white",
                  border: isSelected ? `2px solid ${EMERALD}` : "none",
                  borderRadius: 12,
                  padding: "14px 16px", fontSize: 15, fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {isSelected ? "In your journey — remove" : "Add this session"}
              </button>
            </div>
          </div>
        </div>
        );
      })()}

      {/* Summary tray (≥768px) */}
      {!isMobile && (
        <div
          className="kasi-journey-desktop-only"
          style={{
            maxWidth: 1200,
            margin: "clamp(20px, 2.4vw, 32px) auto 0",
            position: "relative",
            zIndex: 1,
            background: "rgba(16,185,129,0.05)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: 14,
            padding: "clamp(18px, 2.2vw, 28px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 18,
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ color: "#9CA3AF", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>
              Your Journey
            </div>
            <div style={{ color: "white", fontSize: 18, fontWeight: 700, marginTop: 6 }}>
              {count === 0 ? "No sessions selected yet" : `${count} session${count > 1 ? "s" : ""} selected`}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
              <span style={{ color: "white", fontSize: 26, fontWeight: 800 }}>R{total.toLocaleString()}</span>
              {fullJourney && (
                <>
                  <span style={{ color: "#9CA3AF", textDecoration: "line-through", fontSize: 16 }}>R{subtotal.toLocaleString()}</span>
                  <span style={{
                    color: GOLD, border: `1px solid ${GOLD}`,
                    borderRadius: 999, padding: "3px 10px",
                    fontSize: 12, fontWeight: 700, letterSpacing: "0.05em",
                  }}>Save R500</span>
                </>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={addAll}
              style={{
                background: "transparent", color: EMERALD,
                border: `2px solid ${EMERALD}`, borderRadius: 10,
                padding: "12px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}
            >
              Full Journey
            </button>
            <button
              type="button"
              onClick={clearAll}
              disabled={count === 0}
              style={{
                background: "transparent", color: count === 0 ? "#4B5563" : "#9CA3AF",
                border: "1px solid rgba(156,163,175,0.4)", borderRadius: 10,
                padding: "12px 18px", fontWeight: 600, fontSize: 14,
                cursor: count === 0 ? "not-allowed" : "pointer",
              }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleBookSeat}
              disabled={count === 0}
              style={{
                background: count === 0 ? "rgba(16,185,129,0.3)" : EMERALD,
                color: "white", border: "none", borderRadius: 10,
                padding: "12px 22px", fontWeight: 700, fontSize: 15,
                cursor: count === 0 ? "not-allowed" : "pointer",
              }}
            >
              Book Your Seat →
            </button>
          </div>
        </div>
      )}

      {/* Mobile-only bottom-sheet drawer */}
      {isMobile && content && (
        <div
          className="kasi-journey-drawer-root"
          role="dialog"
          aria-modal="true"
          aria-label={`${content.eyebrow} — ${content.title}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
          }}
        >
          <div
            onClick={close}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", animation: "kasiDrawerFade 0.3s ease-out" }}
          />
          <div
            onPointerDown={(e) => { dragStart.current = e.clientY; }}
            onPointerMove={(e) => {
              if (dragStart.current == null) return;
              const dy = e.clientY - dragStart.current;
              if (dy > 0) setDragY(dy);
            }}
            onPointerUp={() => {
              if (dragY > 120) close();
              else setDragY(0);
              dragStart.current = null;
            }}
            onPointerCancel={() => { setDragY(0); dragStart.current = null; }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#0F0F0F",
              borderRadius: "20px 20px 0 0",
              padding: "16px 20px 28px",
              color: "white",
              transform: `translateY(${dragY}px)`,
              transition: dragStart.current == null ? "transform 0.3s ease-out" : "none",
              animation: "kasiDrawerSlideUp 0.3s ease-out",
              boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ width: 40, height: 4, borderRadius: 999, background: "#4B5563", margin: "0 auto 16px" }} />
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              style={{
                position: "absolute", top: 12, right: 12,
                width: 36, height: 36, borderRadius: 999,
                background: "rgba(255,255,255,0.06)", color: "white",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div style={{ color: EMERALD, fontSize: 11, fontWeight: 600, letterSpacing: "0.27em" }}>{content.eyebrow}</div>
            <div style={{ color: "white", fontSize: 22, fontWeight: 800, marginTop: 4 }}>{content.title}</div>
            <div style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>{content.tagline}</div>

            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {content.tools.map((t) => (
                <span key={t} style={{
                  fontSize: 12, color: EMERALD,
                  border: `1px solid ${EMERALD}`, borderRadius: 999,
                  padding: "4px 10px", background: "rgba(16,185,129,0.06)",
                }}>{t}</span>
              ))}
            </div>

            <p style={{ color: "#D1D5DB", fontSize: 14, lineHeight: 1.55, marginTop: 16 }}>{content.summary}</p>

            <div style={{ color: EMERALD, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", marginTop: 20 }}>
              THE REAL PROBLEM
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
              {content.items.map((it) => (
                <li key={it} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "white", fontSize: 14 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 20 }}>
              <span style={{ color: "white", fontSize: 28, fontWeight: 800 }}>{content.price}</span>
              <span style={{ color: "#9CA3AF", fontSize: 14 }}>/ single session</span>
            </div>

            <button
              type="button"
              onClick={() => activeId && enrolNow(activeId)}
              style={{
                marginTop: 20, width: "100%",
                background: EMERALD, color: "white",
                border: "none", borderRadius: 12,
                padding: "14px 16px", fontSize: 16, fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Enrol In This Session →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
