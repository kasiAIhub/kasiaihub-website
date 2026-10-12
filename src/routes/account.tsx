import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getMyAccount, linkMyRecords } from "@/lib/account.functions";
import { KasiLogo } from "@/components/KasiLogo";

const BRAND = {
  bg: "#0A0A0A",
  card: "#0F0F0F",
  border: "#1E1E1E",
  emerald: "#00C896",
  gold: "#F59E0B",
  text: "#F5F5F0",
  muted: "#9CA3AF",
};

export const Route = createFileRoute("/account")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My account | kasiAIhub" },
      {
        name: "description",
        content:
          "Open your saved kasiAIhub business diagnostic report and check your enrolment status.",
      },
      { property: "og:title", content: "My account | kasiAIhub" },
      {
        property: "og:description",
        content: "Your saved diagnostic report and enrolment status.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fetchAccount = useServerFn(getMyAccount);
  const link = useServerFn(linkMyRecords);
  const [session, setSession] = useState<"loading" | "in" | "out">("loading");
  const [linkDone, setLinkDone] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setSession(data.user ? "in" : "out");
    });
  }, []);

  // Forward-only linking: link the report just completed (token stashed before sign-in).
  useEffect(() => {
    if (session !== "in" || linkDone) return;
    let token: string | null = null;
    try {
      token = window.localStorage.getItem("kasiaihub_link_token");
    } catch {
      /* ignore */
    }
    link({ data: token ? { access_token: token } : {} })
      .catch((e) => console.error("[account] linking failed", e))
      .finally(() => {
        try {
          window.localStorage.removeItem("kasiaihub_link_token");
        } catch {
          /* ignore */
        }
        setLinkDone(true);
        queryClient.invalidateQueries({ queryKey: ["my-account"] });
      });
  }, [session, linkDone, link, queryClient]);

  const { data, isLoading } = useQuery({
    queryKey: ["my-account"],
    queryFn: () => fetchAccount(),
    enabled: session === "in" && linkDone,
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    router.navigate({ to: "/", replace: true });
  }

  if (session === "loading") {
    return <Shell><p style={{ color: BRAND.muted }}>Loading…</p></Shell>;
  }

  if (session === "out") {
    return (
      <Shell>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 10px" }}>My account</h1>
        <p style={{ color: BRAND.muted, marginBottom: 20 }}>
          You're not signed in. Complete the business check and choose "Save this report" to
          create your account.
        </p>
        <Link
          to="/diagnostic"
          style={{
            display: "inline-block",
            background: BRAND.emerald,
            color: "#03110A",
            padding: "12px 20px",
            borderRadius: 10,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Take the business check →
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 4px" }}>My account</h1>
          {data?.email ? (
            <p style={{ color: BRAND.muted, margin: 0, fontSize: 14 }}>{data.email}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={signOut}
          style={{
            background: "transparent",
            color: BRAND.text,
            border: `1px solid ${BRAND.border}`,
            padding: "10px 16px",
            borderRadius: 10,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>

      {isLoading || !linkDone ? (
        <p style={{ color: BRAND.muted, marginTop: 32 }}>Loading your details…</p>
      ) : (
        <>
          <Card title="Your latest report">
            {data?.report ? (
              <>
                <p style={{ color: BRAND.muted, fontSize: 14, marginTop: 0 }}>
                  Completed{" "}
                  {new Date(data.report.created_at).toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {data.report.business_name ? ` · ${data.report.business_name}` : ""}
                </p>
                <a
                  href={`/diagnostic/results/${data.report.access_token}`}
                  style={{
                    display: "inline-block",
                    background: BRAND.emerald,
                    color: "#03110A",
                    padding: "12px 20px",
                    borderRadius: 10,
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  Open my report →
                </a>
              </>
            ) : (
              <p style={{ color: BRAND.muted, margin: 0 }}>
                No report saved to this account yet.{" "}
                <Link to="/diagnostic" style={{ color: BRAND.emerald }}>
                  Take the business check →
                </Link>
              </p>
            )}
          </Card>

          <Card title="Enrolment status">
            {data?.enrolments?.length ? (
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
                {data.enrolments.map((e) => (
                  <li
                    key={e.id}
                    style={{
                      border: `1px solid ${BRAND.border}`,
                      borderRadius: 10,
                      padding: 14,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 15 }}>
                      {(e.sessions_selected ?? []).join(", ") || "Sessions to be confirmed"}
                    </div>
                    <div style={{ color: BRAND.muted, fontSize: 13, marginTop: 4 }}>
                      {"Date to be confirmed"} · R
                      {Number(e.total_price ?? 0).toLocaleString("en-ZA")}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        display: "inline-block",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: e.status === "confirmed" ? "#03110A" : BRAND.gold,
                        background:
                          e.status === "confirmed" ? BRAND.emerald : "rgba(245,158,11,0.12)",
                        border:
                          e.status === "confirmed"
                            ? "none"
                            : "1px solid rgba(245,158,11,0.4)",
                        padding: "4px 10px",
                        borderRadius: 999,
                      }}
                    >
                      {e.status}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: BRAND.muted, margin: 0 }}>
                No enrolment yet.{" "}
                <Link to="/entrepreneur-ai-journey" style={{ color: BRAND.emerald }}>
                  See the Entrepreneur AI Journey →
                </Link>
              </p>
            )}
          </Card>
        </>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        background: BRAND.bg,
        color: BRAND.text,
        minHeight: "100vh",
        padding: "56px 20px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Link to="/" style={{ display: "inline-flex", marginBottom: 32, textDecoration: "none" }}>
          <KasiLogo size="sm" />
        </Link>
        {children}
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        marginTop: 28,
        background: BRAND.card,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 14,
        padding: 22,
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px" }}>{title}</h2>
      {children}
    </section>
  );
}
