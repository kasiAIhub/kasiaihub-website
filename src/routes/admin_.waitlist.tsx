import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { checkAdminSession } from "@/lib/admin-gate.functions";
import { AdminNav } from "@/components/AdminNav";
import { listKasiMoveWaitlist } from "@/lib/kasi-move.functions";

export const Route = createFileRoute("/admin_/waitlist")({
  head: () => ({
    meta: [
      { title: "Waitlist · Admin · kasiAIhub" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  ssr: false,
  loader: async () => {
    const s = await checkAdminSession();
    if (!s.unlocked) throw redirect({ to: "/admin" });
    return s;
  },
  component: WaitlistAdmin,
});

const cell = { padding: "10px 12px", borderBottom: "0.5px solid rgba(255,255,255,0.08)", textAlign: "left" as const };

function WaitlistAdmin() {
  const fetchFn = useServerFn(listKasiMoveWaitlist);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-kasi-move-waitlist"],
    queryFn: () => fetchFn(),
    refetchInterval: 10_000,
  });
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <AdminNav />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Kasi Move waitlist</h1>
        <p style={{ color: "#aaa", marginTop: 4 }}>
          Total signups: <strong style={{ color: "#00A86B" }}>{data?.total ?? 0}</strong> · updates every 10 seconds
        </p>
        {isLoading && <p style={{ marginTop: 16 }}>Loading…</p>}
        {error && <p style={{ marginTop: 16, color: "#f87171" }}>Could not load the waitlist.</p>}
        {data && (
          <div style={{ overflowX: "auto", marginTop: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ color: "#aaa" }}>
                  {["Date", "Name", "Stall name", "WhatsApp", "Area", "Biggest headache"].map((h) => (
                    <th key={h} style={cell}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((r) => (
                  <tr key={r.id}>
                    <td style={cell}>{new Date(r.created_at).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                    <td style={cell}>{r.name}</td>
                    <td style={cell}>{r.stall_name}</td>
                    <td style={cell}>
                      <a href={`https://wa.me/${r.whatsapp_number.replace("+", "")}`} target="_blank" rel="noopener noreferrer" style={{ color: "#00A86B" }}>
                        {r.whatsapp_number}
                      </a>
                    </td>
                    <td style={cell}>{r.area}</td>
                    <td style={cell}>{r.biggest_headache || "-"}</td>
                  </tr>
                ))}
                {data.rows.length === 0 && (
                  <tr><td colSpan={6} style={{ ...cell, color: "#aaa" }}>No signups yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
