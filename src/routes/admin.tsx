import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { checkAdminSession } from "@/lib/admin-gate.functions";
import { KasiLogo } from "@/components/KasiLogo";
import { supabase } from "@/integrations/supabase/client";
import { AdminNav } from "@/components/AdminNav";

import {
  deleteEnrolment,
  listEnrolments,
  updateEnrolmentStatus,
  type EnrolmentRow,
  type EnrolmentStatus,
} from "@/lib/enrolments.functions";
import {
  listDiagnosticSubmissions,
  type DiagnosticSubmissionRow,
} from "@/lib/diagnostic.functions";


export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · kasiAIhub" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  ssr: false,
  loader: () => checkAdminSession(),
  component: AdminPage,
});

type Status = EnrolmentStatus;

type Enrolment = EnrolmentRow & {
  submitted_at: string;
};

const EMERALD = "#00A86B";
const GOLD = "#C9A84C";
const STATUS_COLOR: Record<Status, string> = {
  pending: "#999999",
  confirmed: EMERALD,
  paid: "#4B9EFF",
  cancelled: "#FF6B6B",
};

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function locationOf(r: Enrolment): string {
  return r.preferred_location || r.location || "Unspecified";
}

function preferredDayOf(r: Enrolment): string {
  if (DAY_ORDER.includes(r.preferred_day)) return r.preferred_day;
  return (r.days_available || []).find((day) => DAY_ORDER.includes(day)) || "";
}

function sessionsOf(r: Enrolment): string[] {
  const list = r.sessions_selected || [];
  const out = new Set<string>();
  for (const s of list) {
    if (s === "Full Programme") {
      out.add("Session 1");
      out.add("Session 2");
      out.add("Session 3");
    } else {
      out.add(s);
    }
  }
  return [...out];
}

function toEnrolment(row: EnrolmentRow): Enrolment {
  return { ...row, submitted_at: row.created_at };
}

function formatR(n: number) {
  return "R" + (n || 0).toLocaleString("en-ZA");
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}



function AdminPage() {
  const router = useRouter();
  const { unlocked } = Route.useLoaderData();

  if (!unlocked) {
    return <LoginScreen onUnlocked={() => router.invalidate()} />;
  }
  return <Dashboard />;
}


function Logo() {
  return <KasiLogo />;
}

function LoginScreen({ onUnlocked }: { onUnlocked: () => void }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setSignedInEmail(data.user?.email ?? null);
    });
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const value = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setErr("Enter a valid email address.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: value,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      setSent(true);
    } catch (e2) {
      console.error("[admin] magic link failed", e2);
      setErr("Could not send the sign-in link. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSignedInEmail(null);
    onUnlocked();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 400, background: "#161616", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 24 }}><Logo /></div>
        <h1 style={{ color: "#fff", fontSize: 18, fontWeight: 600, textAlign: "center", marginBottom: 8 }}>Staff sign-in</h1>
        <p style={{ color: "#999", fontSize: 13, textAlign: "center", marginTop: 0, marginBottom: 24 }}>
          We'll email you a one-time sign-in link. Only approved staff accounts can open the
          dashboard.
        </p>
        {signedInEmail ? (
          <div style={{ color: "#FF6B6B", fontSize: 13, marginBottom: 14, textAlign: "center" }}>
            {signedInEmail} does not have admin access.{" "}
            <button type="button" onClick={signOut} style={{ background: "none", border: "none", color: "#fff", textDecoration: "underline", cursor: "pointer", padding: 0, fontSize: 13 }}>
              Sign out
            </button>
          </div>
        ) : null}
        {sent ? (
          <div style={{ color: EMERALD, fontSize: 14, textAlign: "center" }}>
            Check your inbox — the sign-in link is on its way.
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErr(""); }}
              placeholder="you@example.com"
              autoFocus
              autoComplete="email"
              aria-label="Staff email address"
              style={{ width: "100%", padding: "14px 16px", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#fff", fontSize: 16, marginBottom: 12 }}
            />
            {err && <div style={{ color: "#FF6B6B", fontSize: 13, marginBottom: 12 }}>{err}</div>}
            <button type="submit" disabled={busy} style={{ width: "100%", padding: "14px 16px", background: EMERALD, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: busy ? "wait" : "pointer", opacity: busy ? 0.7 : 1 }}>
              {busy ? "Sending…" : "Email me a sign-in link"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

type TabId = "enrolments" | "sessions" | "revenue" | "diagnostics";

function Dashboard() {
  const [rows, setRows] = useState<Enrolment[]>([]);
  const [tab, setTab] = useState<TabId>("enrolments");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const list = useServerFn(listEnrolments);
  const updateStatusFn = useServerFn(updateEnrolmentStatus);
  const deleteFn = useServerFn(deleteEnrolment);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await list();
      setRows(data.map(toEnrolment));
    } catch (err) {
      console.error("[admin] load failed", err);
      setLoadError("Could not load enrolments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [list]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const update = useCallback(
    async (
      action:
        | { type: "status"; id: string; status: Status }
        | { type: "delete"; id: string },
    ) => {
      // Optimistic update, then refresh from server.
      setRows((prev) => {
        if (action.type === "status") {
          return prev.map((r) =>
            r.id === action.id ? { ...r, status: action.status } : r,
          );
        }
        return prev.filter((r) => r.id !== action.id);
      });
      try {
        if (action.type === "status") {
          await updateStatusFn({ data: { id: action.id, status: action.status } });
        } else {
          await deleteFn({ data: { id: action.id } });
        }
      } catch (err) {
        console.error("[admin] update failed", err);
        await refresh();
      }
    },
    [updateStatusFn, deleteFn, refresh],
  );


  const totalRevenue = useMemo(() => rows.reduce((s, r) => s + (r.total_price || 0), 0), [rows]);
  const confirmedCount = rows.filter((r) => r.status === "confirmed" || r.status === "paid").length;
  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <AdminNav />


      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
          <Metric label="Total Enrolments" value={String(rows.length)} />
          <Metric label="Total Revenue" value={formatR(totalRevenue)} />
          <Metric label="Confirmed" value={String(confirmedCount)} />
          <Metric label="Pending" value={String(pendingCount)} />
        </div>

        <div style={{ display: "flex", gap: 8, borderBottom: "0.5px solid rgba(255,255,255,0.08)", marginBottom: 24, overflowX: "auto" }}>
          {[
            { id: "enrolments" as TabId, label: "All Enrolments" },
            { id: "sessions" as TabId, label: "Session Analytics" },
            { id: "revenue" as TabId, label: "Revenue" },
            { id: "diagnostics" as TabId, label: "Diagnostics" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "12px 16px",
                background: "transparent",
                color: tab === t.id ? "#fff" : "#999",
                border: "none",
                borderBottom: tab === t.id ? `2px solid ${EMERALD}` : "2px solid transparent",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "enrolments" && <EnrolmentsTab rows={rows} update={update} />}
        {tab === "sessions" && <SessionsTab rows={rows} />}
        {tab === "revenue" && <RevenueTab rows={rows} />}
        {tab === "diagnostics" && <DiagnosticsTab />}
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "#161616", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}>
      <div style={{ color: EMERALD, fontSize: 28, fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
      <div style={{ color: "#999", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginTop: 8 }}>{label}</div>
    </div>
  );
}

function Card({ children, padding = 20 }: { children: React.ReactNode; padding?: number }) {
  return (
    <div style={{ background: "#161616", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding }}>
      {children}
    </div>
  );
}

// ---------------- ENROLMENTS TAB ----------------

type EnrolmentUpdate =
  | { type: "status"; id: string; status: Status }
  | { type: "delete"; id: string };

function EnrolmentsTab({
  rows,
  update,
}: {
  rows: Enrolment[];
  update: (action: EnrolmentUpdate) => void;
}) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [loc, setLoc] = useState("all");
  const [session, setSession] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (q) {
        const hay = `${r.full_name} ${r.business_name} ${r.whatsapp} ${r.gmail_account}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      if (status !== "all" && r.status !== status) return false;
      if (loc !== "all" && locationOf(r) !== loc) return false;
      if (session !== "all" && !(r.sessions_selected || []).includes(session)) return false;
      return true;
    });
  }, [rows, q, status, loc, session]);

  const perPage = 10;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const curPage = Math.min(page, pages);
  const slice = filtered.slice((curPage - 1) * perPage, curPage * perPage);

  function setStatusFor(id: string, s: Status) {
    update({ type: "status", id, status: s });
  }

  function del(id: string) {
    if (!window.confirm("Delete this enrolment? This cannot be undone.")) return;
    update({ type: "delete", id });
  }


  function copyWhatsApp(r: Enrolment) {
    const msg = `👤 ${r.full_name}
🏢 ${r.business_name}${r.business_description ? " — " + r.business_description : ""}
📍 Based: ${r.location}
📱 ${r.whatsapp}

✅ Readiness
Laptop: ${r.laptop_access}
Gmail: ${r.gmail_account}
Comfort: ${r.computer_comfort}
AI Tools: ${r.ai_tools_used}${r.ai_tools_list ? " — " + r.ai_tools_list : ""}

📚 Sessions: ${(r.sessions_selected || []).join(", ")}
📍 Preferred location: ${locationOf(r)}
🗓 Preferred day: ${preferredDayOf(r) || "—"}
💰 Investment: R${(r.total_price || 0).toLocaleString("en-ZA")}
📆 Submitted: ${formatDate(r.submitted_at)}
Status: ${r.status}`;
    navigator.clipboard?.writeText(msg);
  }

  const inputStyle: React.CSSProperties = {
    padding: "10px 12px",
    background: "#0d0d0d",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    color: "#fff",
    fontSize: 14,
  };

  return (
    <>
    <CohortTracker rows={rows} />
    <Card padding={16}>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <input
          placeholder="Search name, business or WhatsApp…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          style={{ ...inputStyle, flex: "1 1 220px", minWidth: 200 }}
        />
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} style={inputStyle}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select value={loc} onChange={(e) => { setLoc(e.target.value); setPage(1); }} style={inputStyle}>
          <option value="all">All Locations</option>
          <option value="Gauteng">Gauteng</option>
          <option value="Pretoria">Pretoria (historic)</option>
          <option value="Midrand">Midrand (historic)</option>
        </select>
        <select value={session} onChange={(e) => { setSession(e.target.value); setPage(1); }} style={inputStyle}>
          <option value="all">All Sessions</option>
          <option value="Session 1">Session 1</option>
          <option value="Session 2">Session 2</option>
          <option value="Session 3">Session 3</option>
          <option value="Full Programme">Full Programme</option>
        </select>
      </div>

      <div style={{ overflowX: "auto", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 10 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
          <thead>
            <tr style={{ background: "#0d0d0d" }}>
              {["Name", "Business", "WhatsApp", "Email", "Sessions", "Location", "Preferred Day", "Price", "Submitted", "Status", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 14px", color: "#999", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 && (
              <tr><td colSpan={11} style={{ padding: 40, textAlign: "center", color: "#777", fontSize: 14 }}>No enrolments match these filters.</td></tr>
            )}
            {slice.map((r) => (
              <tr key={r.id} style={{ background: "#161616", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1e1e1e")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#161616")}>
                <td style={td}>{r.full_name}</td>
                <td style={td}>
                  <div>{r.business_name}</div>
                  {r.business_description && <div style={{ color: "#999", fontSize: 12, marginTop: 2 }}>{r.business_description}</div>}
                </td>
                <td style={td}>
                  {r.whatsapp ? (
                    <a href={`https://wa.me/${r.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ color: EMERALD, textDecoration: "none" }}>{r.whatsapp}</a>
                  ) : (
                    <span style={{ color: "#666" }}>—</span>
                  )}
                </td>
                <td style={td}>
                  {r.gmail_account ? (
                    <a href={`mailto:${r.gmail_account}`} style={{ color: EMERALD, textDecoration: "none" }}>{r.gmail_account}</a>
                  ) : (
                    <span style={{ color: "#666" }}>—</span>
                  )}
                </td>
                <td style={td}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {(r.sessions_selected || []).map((s, i) => (
                      <span key={i} style={{ background: "rgba(0,168,107,0.15)", color: EMERALD, border: `1px solid rgba(0,168,107,0.4)`, borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </td>
                <td style={td}>{locationOf(r)}</td>
                <td style={td}>
                  {preferredDayOf(r) || <span style={{ color: "#666" }}>—</span>}
                </td>
                <td style={td}>{formatR(r.total_price)}</td>
                <td style={td}>{formatDate(r.submitted_at)}</td>
                <td style={td}>
                  <select
                    value={r.status}
                    onChange={(e) => setStatusFor(r.id, e.target.value as Status)}
                    style={{ background: "#0d0d0d", color: STATUS_COLOR[r.status], border: `1px solid ${STATUS_COLOR[r.status]}`, borderRadius: 6, padding: "4px 8px", fontSize: 12, fontWeight: 600, textTransform: "capitalize" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="paid">Paid</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => copyWhatsApp(r)} title="Copy WhatsApp message" style={iconBtn}>📋</button>
                    <button onClick={() => del(r.id)} title="Delete" style={{ ...iconBtn, color: "#FF6B6B" }}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length > perPage && (
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, marginTop: 16 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={curPage === 1} style={pagerBtn}>Previous</button>
          <span style={{ color: "#999", fontSize: 13 }}>Page {curPage} of {pages}</span>
          <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={curPage === pages} style={pagerBtn}>Next</button>
        </div>
      )}
    </Card>
    </>
  );
}

function CohortTracker({ rows }: { rows: Enrolment[] }) {
  const pending = rows.filter((r) => r.status === "pending");

  type Group = {
    session: string;
    location: string;
    unique: Set<string>;
    byDay: Map<string, number>;
  };
  const groups = new Map<string, Group>();

  for (const r of pending) {
    const location = locationOf(r);
    const preferredDay = preferredDayOf(r);
    for (const session of sessionsOf(r)) {
      const key = `${session}||${location}`;
      let g = groups.get(key);
      if (!g) {
        g = { session, location, unique: new Set(), byDay: new Map() };
        groups.set(key, g);
      }
      g.unique.add(r.id);
      if (preferredDay) g.byDay.set(preferredDay, (g.byDay.get(preferredDay) ?? 0) + 1);
    }
  }

  const list = [...groups.values()].sort(
    (a, b) =>
      a.session.localeCompare(b.session) || a.location.localeCompare(b.location),
  );

  function styleFor(n: number) {
    if (n >= 8)
      return { bg: "rgba(0,200,150,0.12)", border: "#00C896", label: "READY TO CONFIRM", labelColor: "#00C896" };
    return { bg: "rgba(245,158,11,0.10)", border: "#F59E0B", label: "FORMING", labelColor: "#F59E0B" };
  }

  return (
    <Card padding={16}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
        <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#fff" }}>
          Class Tracker · Session · Location · Day
        </h2>
        <div style={{ color: "#888", fontSize: 12 }}>Pending only · up to 8 learners per class</div>
      </div>
      <div style={{ color: "#888", fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}>
        Each learner chooses one preferred day. Counts show demand for each session, location and day.
      </div>

      {list.length === 0 ? (
        <div style={{ padding: 20, textAlign: "center", color: "#777", fontSize: 13 }}>
          No pending enrolments yet.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {list.map((g) => (
            <div key={`${g.session}-${g.location}`} style={{ background: "#0d0d0d", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                  {g.session} · {g.location}
                </div>
                <div style={{ color: "#ccc", fontSize: 12 }}>
                  {g.unique.size} unique {g.unique.size === 1 ? "learner" : "learners"} pending
                </div>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {DAY_ORDER.filter((d) => (g.byDay.get(d) ?? 0) > 0).map((d) => {
                  const n = g.byDay.get(d) ?? 0;
                  const st = styleFor(n);
                  return (
                    <div key={d} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                      padding: "10px 12px", background: st.bg, border: `1px solid ${st.border}`, borderRadius: 8,
                    }}>
                      <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{d}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                        <div style={{ color: "#ccc", fontSize: 13 }}>
                          {n} {n === 1 ? "learner" : "learners"}{n >= 8 ? " · class at capacity" : ""}
                        </div>
                        <div style={{ color: st.labelColor, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
                          ● {st.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {DAY_ORDER.every((d) => (g.byDay.get(d) ?? 0) === 0) && (
                  <div style={{ color: "#777", fontSize: 12 }}>No preferred day captured.</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}


const td: React.CSSProperties = { padding: "14px", fontSize: 14, color: "#fff", verticalAlign: "top" };
const iconBtn: React.CSSProperties = { background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "4px 8px", color: "#ccc", cursor: "pointer", fontSize: 13 };
const pagerBtn: React.CSSProperties = { background: "#161616", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer" };

// ---------------- SESSIONS TAB ----------------

function SessionsTab({ rows }: { rows: Enrolment[] }) {
  const sessionNames = ["Session 1", "Session 2", "Session 3", "Full Programme"];
  const counts: Record<string, number> = {};
  for (const n of sessionNames) counts[n] = 0;
  for (const r of rows) for (const s of r.sessions_selected || []) if (counts[s] !== undefined) counts[s]++;
  const max = Math.max(1, ...Object.values(counts));

  const locationCounts: Record<string, number> = { Gauteng: 0 };
  for (const r of rows) {
    const l = locationOf(r);
    locationCounts[l] = (locationCounts[l] ?? 0) + 1;
  }
  const dayCounts: Record<string, number> = {};
  for (const d of DAY_ORDER) dayCounts[d] = 0;
  for (const r of rows) {
    const day = preferredDayOf(r);
    if (day) dayCounts[day]++;
  }


  function pct(field: keyof Enrolment, options: string[]) {
    const total = rows.length || 1;
    return options.map((o) => ({
      label: o,
      pct: Math.round((rows.filter((r) => String(r[field]).toLowerCase().includes(o.toLowerCase())).length / total) * 100),
    }));
  }

  const laptop = pct("laptop_access", ["I own", "I can borrow", "I do not have"]);
  const gmail = pct("gmail_account", ["regularly", "barely", "do not have"]);
  const comfort = pct("computer_comfort", ["Very comfortable", "manage fine", "struggle"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card>
        <h3 style={h3}>Session Popularity</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {sessionNames.map((name) => (
            <div key={name} style={{ background: "#0d0d0d", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 16 }}>
              <div style={{ color: "#ccc", fontSize: 13, fontWeight: 500 }}>{name}</div>
              <div style={{ color: EMERALD, fontSize: 24, fontWeight: 700, margin: "6px 0" }}>{counts[name]}</div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${(counts[name] / max) * 100}%`, height: "100%", background: EMERALD }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 style={h3}>Preferred Location</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {Object.entries(locationCounts).map(([k, v]) => (
            <div key={k} style={{ background: "#0d0d0d", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 16 }}>
              <div style={{ color: "#999", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
              <div style={{ color: EMERALD, fontSize: 24, fontWeight: 700, marginTop: 6 }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 style={h3}>Preferred Day</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
          {DAY_ORDER.map((k) => (
            <div key={k} style={{ background: "#0d0d0d", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 16 }}>
              <div style={{ color: "#999", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
              <div style={{ color: EMERALD, fontSize: 24, fontWeight: 700, marginTop: 6 }}>{dayCounts[k]}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        <ReadinessCard title="Laptop Access" items={laptop} />
        <ReadinessCard title="Gmail Account" items={gmail} />
        <ReadinessCard title="Computer Comfort" items={comfort} />
      </div>
    </div>
  );
}

function ReadinessCard({ title, items }: { title: string; items: { label: string; pct: number }[] }) {
  return (
    <Card>
      <h3 style={h3}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((i) => (
          <div key={i.label}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#ccc", marginBottom: 4 }}>
              <span>{i.label}</span>
              <span style={{ color: EMERALD, fontWeight: 600 }}>{i.pct}%</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${i.pct}%`, height: "100%", background: EMERALD }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

const h3: React.CSSProperties = { color: "#fff", fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 };

// ---------------- REVENUE TAB ----------------

function RevenueTab({ rows }: { rows: Enrolment[] }) {
  const total = rows.reduce((s, r) => s + (r.total_price || 0), 0);
  const confirmed = rows.filter((r) => r.status === "confirmed" || r.status === "paid").reduce((s, r) => s + r.total_price, 0);
  const pending = rows.filter((r) => r.status === "pending").reduce((s, r) => s + r.total_price, 0);

  function categorize(r: Enrolment) {
    const s = [...(r.sessions_selected || [])].sort().join("|");
    if (s === "Full Programme") return "Full Programme";
    if (s === "Session 1") return "Session 1 only";
    if (s === "Session 1|Session 2") return "Sessions 1 + 2";
    if (s === "Session 1|Session 2|Session 3") return "Sessions 1 + 2 + 3";
    return "Custom combination";
  }

  const buckets: Record<string, { count: number; value: number }> = {};
  for (const r of rows) {
    const k = categorize(r);
    if (!buckets[k]) buckets[k] = { count: 0, value: 0 };
    buckets[k].count++;
    buckets[k].value += r.total_price;
  }

  const weekBuckets: Record<string, { count: number; value: number }> = {};
  for (const r of rows) {
    const k = locationOf(r);
    if (!weekBuckets[k]) weekBuckets[k] = { count: 0, value: 0 };
    weekBuckets[k].count++;
    weekBuckets[k].value += r.total_price;
  }

  function exportAll() {
    const json = JSON.stringify(rows, null, 2);
    navigator.clipboard?.writeText(json);
    alert("All enrolment data copied to clipboard as JSON.");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <Metric label="Total Revenue" value={formatR(total)} />
        <Metric label="Confirmed Revenue" value={formatR(confirmed)} />
        <Metric label="Pending Revenue" value={formatR(pending)} />
      </div>

      <Card>
        <h3 style={h3}>Revenue by Session Selection</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Object.keys(buckets).length === 0 && <div style={{ color: "#777", fontSize: 14 }}>No data yet.</div>}
          {Object.entries(buckets).map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", background: "#0d0d0d", borderRadius: 8, fontSize: 14 }}>
              <span style={{ color: "#ccc" }}>{k} <span style={{ color: "#777" }}>· {v.count} {v.count === 1 ? "person" : "people"}</span></span>
              <span style={{ color: EMERALD, fontWeight: 600 }}>{formatR(v.value)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 style={h3}>Revenue by Preferred Location</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>Location</th>
              <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>Enrolments</th>
              <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, textAlign: "right" }}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(weekBuckets).map(([k, v]) => (
              <tr key={k} style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
                <td style={td}>{k}</td>
                <td style={td}>{v.count}</td>
                <td style={{ ...td, textAlign: "right", color: EMERALD, fontWeight: 600 }}>{formatR(v.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <button onClick={exportAll} style={{ alignSelf: "flex-start", background: GOLD, color: "#0a0a0a", border: "none", borderRadius: 10, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        Export All Data
      </button>
    </div>
  );
}

// ---------------- DIAGNOSTICS TAB ----------------

export function DiagnosticsTab() {
  const list = useServerFn(listDiagnosticSubmissions);
  const [rows, setRows] = useState<DiagnosticSubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await list();
        if (active) setRows(data);
      } catch (e) {
        console.error(e);
        if (active) setErr("Could not load diagnostics.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [list]);

  if (loading) return <div style={{ color: "#999", padding: 20 }}>Loading diagnostics…</div>;
  if (err) return <div style={{ color: "#FF6B6B", padding: 20 }}>{err}</div>;

  const total = rows.length;
  const withContact = rows.filter((r) => !!r.email || !!r.whatsapp_number).length;
  const enrolled = rows.filter((r) => r.enrolled).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        <Metric label="Total Diagnostics" value={String(total)} />
        <Metric label="With Contact" value={String(withContact)} />
        <Metric label="Converted to Enrol" value={String(enrolled)} />
      </div>

      <Card>
        <h3 style={h3}>Submissions</h3>
        {rows.length === 0 && <div style={{ color: "#777", fontSize: 14 }}>No submissions yet.</div>}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Date</th>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Name</th>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Business</th>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Contact</th>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Stage</th>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Scores</th>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Downloaded</th>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Enrolled</th>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Report</th>
                <th style={{ ...td, color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                return (
                <React.Fragment key={r.id}>
                  <tr key={r.id} style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
                    <td style={td}>{formatDate(r.created_at)}</td>
                    <td style={td}>{r.name || <span style={{ color: "#666" }}>—</span>}</td>
                    <td style={td}>{r.business_name || <span style={{ color: "#666" }}>—</span>}</td>
                    <td style={td}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {r.email ? (
                          <a href={`mailto:${r.email}`} style={{ color: EMERALD, textDecoration: "none" }}>{r.email}</a>
                        ) : (
                          <span style={{ color: "#666" }}>No email</span>
                        )}
                        {r.whatsapp_number ? (
                          <a
                            href={`https://wa.me/${r.whatsapp_number.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: EMERALD, textDecoration: "none", fontSize: 12 }}
                          >
                            📱 {r.whatsapp_number}
                          </a>
                        ) : (
                          <span style={{ color: "#666", fontSize: 12 }}>No WhatsApp</span>
                        )}
                      </div>
                    </td>
                    <td style={td}><span style={{ color: EMERALD }}>{r.stage}</span></td>
                    <td style={td}>C{r.capacity_score}/M{r.customer_money_score}/G{r.growth_score}</td>
                    <td style={td}>{r.report_downloaded ? <span style={{ color: EMERALD }}>Yes</span> : <span style={{ color: "#666" }}>No</span>}</td>
                    <td style={td}>{r.enrolled ? <span style={{ color: EMERALD }}>Yes</span> : <span style={{ color: "#666" }}>No</span>}</td>
                    <td style={td}>
                      <a
                        href={`/admin/diagnostics/${r.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: EMERALD, textDecoration: "none" }}
                      >
                        View & print →
                      </a>
                    </td>
                    <td style={td}>
                      <button
                        style={iconBtn}
                        onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                      >
                        {expanded === r.id ? "Hide" : "Answers"}
                      </button>
                    </td>
                  </tr>
                  {expanded === r.id && (
                    <tr key={r.id + "-x"}>
                      <td colSpan={10} style={{ ...td, background: "#0d0d0d" }}>

                        <pre style={{ margin: 0, color: "#ccc", fontSize: 12, whiteSpace: "pre-wrap" }}>
{JSON.stringify(r.answers, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
