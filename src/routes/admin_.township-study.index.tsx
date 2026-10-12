import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { checkAdminSession } from "@/lib/admin-gate.functions";
import { AdminNav } from "@/components/AdminNav";
import {
  listTownshipStudyResponses,
  type TownshipStudyRow,
} from "@/lib/township-study-admin.functions";

const EMERALD = "#00A86B";

export const Route = createFileRoute("/admin_/township-study/")({
  head: () => ({
    meta: [
      { title: "Community Study · Admin · kasiAIhub" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  ssr: false,
  loader: async () => {
    const s = await checkAdminSession();
    if (!s.unlocked) throw redirect({ to: "/admin" });
    return s;
  },
  component: TownshipStudyAdmin,
});

const Q_LABELS: Record<string, string> = {
  q1_handle_or_learn:
    "1. Would you prefer part of your business handled for you, or to learn it yourself?",
  q2_yesterday_wish: "2. Yesterday — what did you wish someone else had just done for you?",
  q3_recurring_problem: "3. Something you've tried to fix more than once, but it keeps coming back?",
  q4_hardest_area: "4. Hardest area (compliance / pricing / admin) — what do you actually do about it?",
  q5_magic_wand: "5. If you could wave a wand and one part disappeared — what and why?",
};

const Q1_LABELS: Record<string, string> = {
  handled: "I'd want it handled for me",
  learn: "I'd rather learn to do it myself",
  depends: "Depends on the task",
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function formatAnswerValue(key: string, value: string): string {
  if (key === "q1_handle_or_learn") return Q1_LABELS[value] ?? value;
  return value;
}

function previewSnippet(answers: Record<string, string>) {
  const preferred = ["q2_yesterday_wish", "q3_recurring_problem", "q5_magic_wand", "q4_hardest_area"];
  for (const k of preferred) {
    const v = answers[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  const first = Object.values(answers).find((v) => typeof v === "string" && v.trim());
  return typeof first === "string" ? first : "";
}

function TownshipStudyAdmin() {
  const fetchFn = useServerFn(listTownshipStudyResponses);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-township-study"],
    queryFn: () => fetchFn(),
  });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const rows: TownshipStudyRow[] = data ?? [];
  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const t = new Date(r.created_at).getTime();
      if (from) {
        const f = new Date(from).getTime();
        if (!isNaN(f) && t < f) return false;
      }
      if (to) {
        const tt = new Date(to).getTime() + 24 * 60 * 60 * 1000;
        if (!isNaN(tt) && t >= tt) return false;
      }
      return true;
    });
  }, [rows, from, to]);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <AdminNav />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginTop: 0, marginBottom: 8 }}>
          Community Business Study
        </h1>
        <div style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 20 }}>
          {isLoading ? "Loading…" : `${filtered.length} response${filtered.length === 1 ? "" : "s"}${filtered.length !== rows.length ? ` (of ${rows.length} total)` : " total"}`}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
          <label style={{ fontSize: 12, color: "#9CA3AF" }}>
            From{" "}
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={{ fontSize: 12, color: "#9CA3AF" }}>
            To{" "}
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={inputStyle}
            />
          </label>
          {(from || to) && (
            <button
              type="button"
              onClick={() => {
                setFrom("");
                setTo("");
              }}
              style={{
                background: "transparent",
                color: "#9CA3AF",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 6,
                padding: "6px 10px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {error ? (
          <div style={{ color: "#FF6B6B", fontSize: 14 }}>
            Could not load responses. {(error as Error).message}
          </div>
        ) : null}

        {!isLoading && filtered.length === 0 ? (
          <div style={{ color: "#777", padding: 40, textAlign: "center", background: "#161616", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12 }}>
            No responses yet.
          </div>
        ) : null}

        <div style={{ display: "grid", gap: 10 }}>
          {filtered.map((r) => {
            const isOpen = expanded === r.id;
            const snippet = previewSnippet(r.answers);
            return (
              <div
                key={r.id}
                style={{
                  background: "#161616",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : r.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "16px 18px",
                    background: "transparent",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>
                      {r.business_name?.trim() || <span style={{ color: "#777" }}>Anonymous business</span>}
                    </div>
                    <div style={{ color: "#9CA3AF", fontSize: 12 }}>{formatDate(r.created_at)}</div>
                  </div>
                  {snippet ? (
                    <div style={{ color: "#B8B8B8", fontSize: 13, marginTop: 6, lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      "{snippet}"
                    </div>
                  ) : null}
                  <div style={{ color: EMERALD, fontSize: 12, marginTop: 8 }}>
                    {isOpen ? "Hide full response ▲" : "View full response ▼"}
                  </div>
                </button>
                {isOpen ? (
                  <div style={{ padding: "8px 18px 20px", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
                    {r.whatsapp_number ? (
                      <div style={{ color: "#9CA3AF", fontSize: 12, margin: "10px 0" }}>
                        WhatsApp: <a href={`https://wa.me/${r.whatsapp_number.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" style={{ color: EMERALD }}>{r.whatsapp_number}</a>
                      </div>
                    ) : null}
                    {r.contact_email ? (
                      <div style={{ color: "#9CA3AF", fontSize: 12, margin: "10px 0" }}>
                        Email: <a href={`mailto:${r.contact_email}`} style={{ color: EMERALD }}>{r.contact_email}</a>
                      </div>
                    ) : null}
                    {!r.whatsapp_number && !r.contact_email ? (
                      <div style={{ color: "#777", fontSize: 12, margin: "10px 0" }}>
                        No contact details provided.
                      </div>
                    ) : null}
                    <dl style={{ margin: 0 }}>
                      {Object.keys(Q_LABELS).map((key) => {
                        const raw = r.answers?.[key];
                        if (!raw || (typeof raw === "string" && !raw.trim())) return null;
                        return (
                          <div key={key} style={{ padding: "10px 0", borderTop: "0.5px solid rgba(255,255,255,0.04)" }}>
                            <dt style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 4 }}>
                              {Q_LABELS[key]}
                            </dt>
                            <dd style={{ margin: 0, color: "#F5F5F0", fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
                              {formatAnswerValue(key, String(raw))}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  marginLeft: 6,
  padding: "6px 10px",
  background: "#0d0d0d",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 6,
  color: "#fff",
  fontSize: 13,
};
