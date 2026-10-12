import { KasiLogo } from "@/components/KasiLogo";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const EMERALD = "#00A86B";

const linkBase = {
  color: "#ccc",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 500,
  padding: "6px 10px",
  borderRadius: 6,
} as const;

function NavLink({ to, label }: { to: string; label: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive =
    to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);
  return (
    <Link
      to={to}
      style={{
        ...linkBase,
        color: isActive ? "#fff" : "#ccc",
        background: isActive ? "rgba(0,168,107,0.15)" : "transparent",
        border: isActive
          ? `1px solid rgba(0,168,107,0.4)`
          : "1px solid transparent",
      }}
    >
      {label}
    </Link>
  );
}

export function AdminNav() {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    await router.invalidate();
    router.navigate({ to: "/admin" });
  }


  return (
    <header
      style={{
        background: "#111",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >

      <Link
        to="/admin"
        style={{ textDecoration: "none" }}
      >
        <KasiLogo size="sm" suffix="Admin" />
      </Link>
      <nav style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <NavLink to="/admin" label="Dashboard" />
        <NavLink to="/admin/diagnostics" label="Diagnostics" />
        <NavLink to="/admin/township-study" label="Community Study" />
        <NavLink to="/admin/waitlist" label="Waitlist" />
        <button
          onClick={signOut}
          style={{
            marginLeft: 8,
            padding: "6px 12px",
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </nav>
      </div>
    </header>

  );
}
