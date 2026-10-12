import { KasiLogo } from "@/components/KasiLogo";
import { Link } from "@tanstack/react-router";

const BRAND = {
  bg: "#000000",
  emerald: "#10B981",
  text: "#FFFFFF",
  muted: "#9CA3AF",
  border: "rgba(255,255,255,0.08)",
};

const resourceLinks: Array<{ label: string; to: string }> = [
  { label: "About", to: "/about" },
  { label: "AI Basics", to: "/blog/ai-basics" },
  { label: "Community Business Hub", to: "/blog/township-business-hub" },
  { label: "The Community Business Study", to: "/township-study" },
  { label: "FAQ", to: "/faq" },
];

export function SiteFooter() {
  return (
    <footer
      style={{
        background: BRAND.bg,
        color: BRAND.muted,
        borderTop: `1px solid ${BRAND.border}`,
        padding: "56px 20px 32px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gap: 40,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <div>
          <KasiLogo size="sm" />
          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6 }}>
            Intelligent Business Systems For Entrepreneurs.
          </p>
        </div>

        <div>
          <h3 style={footerHeadingStyle}>Resources</h3>
          <ul style={footerListStyle}>
            {resourceLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} style={footerLinkStyle}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={footerHeadingStyle}>Contact</h3>
          <ul style={footerListStyle}>
            <li>
              <a href="tel:+27818905861" style={footerLinkStyle}>+27 81 890 5861</a>
            </li>
            <li>
              <a href="mailto:info@kasiaihub.com" style={footerLinkStyle}>info@kasiaihub.com</a>
            </li>
            <li>
              <Link to="/blog" style={footerLinkStyle}>Blog</Link>
            </li>
            <li>
              <Link to="/account" style={footerLinkStyle}>My account</Link>
            </li>
            <li>
              <Link to="/privacy" style={footerLinkStyle}>How we handle your data</Link>
            </li>
          </ul>

        </div>
      </div>

      <div
        style={{
          maxWidth: 1180,
          margin: "40px auto 0",
          paddingTop: 24,
          borderTop: `1px solid ${BRAND.border}`,
          textAlign: "center",
          fontSize: 13,
          color: BRAND.muted,
        }}
      >
        © {new Date().getFullYear()} kasiAIhub. Built with intelligence. Powered by purpose.
      </div>

    </footer>
  );
}

const footerHeadingStyle: React.CSSProperties = {
  color: BRAND.text,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  margin: "0 0 14px",
};

const footerListStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: 10,
};

const footerLinkStyle: React.CSSProperties = {
  color: BRAND.emerald,
  textDecoration: "none",
  fontSize: 14,
  lineHeight: 1.4,
};

export default SiteFooter;
