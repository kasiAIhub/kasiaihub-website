import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAdminSession } from "@/lib/admin-gate.functions";
import { AdminNav } from "@/components/AdminNav";
import { DiagnosticsTab } from "./admin";

export const Route = createFileRoute("/admin_/diagnostics/")({
  head: () => ({
    meta: [
      { title: "Diagnostics · Admin · kasiAIhub" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  ssr: false,
  loader: async () => {
    const s = await checkAdminSession();
    if (!s.unlocked) throw redirect({ to: "/admin" });
    return s;
  },
  component: AdminDiagnosticsIndex,
});

function AdminDiagnosticsIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <AdminNav />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>Diagnostic Submissions</h1>
        <DiagnosticsTab />
      </main>
    </div>
  );
}
