import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { checkAdminSession } from "@/lib/admin-gate.functions";
import { generateDiagnosticOpening, getDiagnosticByIdAdmin } from "@/lib/diagnostic.functions";
import { computeScores } from "@/lib/diagnostic-data";
import { DiagnosticReport } from "@/components/DiagnosticReport";
import {
  PrintableDiagnosticReport,
  PreviewReportModal,
} from "@/components/PrintableDiagnosticReport";
import { AdminNav } from "@/components/AdminNav";

export const Route = createFileRoute("/admin_/diagnostics/$id")({
  head: () => ({
    meta: [
      { title: "Diagnostic Report (Admin) — kasiAIhub" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  ssr: false,
  loader: async () => {
    const s = await checkAdminSession();
    if (!s.unlocked) throw redirect({ to: "/admin" });
    return s;
  },
  component: AdminReportPage,
  errorComponent: ({ error }) => (
    <div style={{ padding: 40, color: "#fff", background: "#0A0A0A", minHeight: "100vh" }}>
      <p>Could not load submission.</p>
      <p style={{ color: "#9CA3AF", fontSize: 13 }}>{error instanceof Error ? error.message : String(error)}</p>
      <Link to="/admin" style={{ color: "#00C896" }}>
        ← Back to admin
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div style={{ padding: 40, color: "#fff", background: "#0A0A0A", minHeight: "100vh" }}>
      Submission not found.
    </div>
  ),
});

function AdminReportPage() {
  const { id } = Route.useParams();
  const fetchFn = useServerFn(getDiagnosticByIdAdmin);
  const generateOpeningFn = useServerFn(generateDiagnosticOpening);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [aiOpening, setAiOpening] = useState<string | null>(null);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-diagnostic", id],
    queryFn: () => fetchFn({ data: { id } }),
  });

  const storedOpening = data?.ai_opening?.trim() ? data.ai_opening : null;
  const opening = aiOpening?.trim() ? aiOpening : storedOpening;
  const aiPending = Boolean(data) && !opening && !aiUnavailable;

  useEffect(() => {
    if (!data || opening) return;
    let cancelled = false;
    const attempt = async () => {
      try {
        const result = await generateOpeningFn({
          data: { access_token: data.access_token },
        });
        if (!cancelled && result.unavailable) {
          setAiUnavailable(true);
          return;
        }
        if (!cancelled && result.ai_opening?.trim()) {
          setAiOpening(result.ai_opening);
          return;
        }
      } catch (err) {
        console.error("[diagnostic] admin opening retry failed", err);
      }
      if (!cancelled) window.setTimeout(attempt, 4000);
    };
    void attempt();
    return () => {
      cancelled = true;
    };
  }, [data, opening, generateOpeningFn]);

  if (isLoading) {
    return (
      <div
        style={{
          padding: 60,
          color: "#9CA3AF",
          background: "#0A0A0A",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        Loading submission…
      </div>
    );
  }
  if (error || !data) {
    return (
      <div style={{ padding: 40, color: "#fff", background: "#0A0A0A", minHeight: "100vh" }}>
        <p>Could not load submission.</p>
        <Link to="/admin" style={{ color: "#00C896" }}>
          ← Back to admin
        </Link>
      </div>
    );
  }

  const answers = (data.answers ?? {}) as Record<string, unknown>;
  const scores = computeScores(answers);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <AdminNav />
      <div
        className="site-chrome"
        style={{
          borderBottom: "1px solid #1E1E1E",
          padding: "12px 20px",
          background: "rgba(0,0,0,0.85)",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: "#9CA3AF", fontSize: 12 }}>
            Submission · {data.name || "Unnamed"}
            {data.business_name ? ` · ${data.business_name}` : ""}
          </span>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                style={{
                  background: "#00C896",
                  color: "#03110A",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {aiPending ? "Preview report" : "Save report as PDF"}
              </button>
              <div style={{ color: "#9CA3AF", fontSize: 11, marginTop: 4 }}>
                Preview first, then choose "Save as PDF" in the print dialogue.
              </div>
            </div>
            <Link
              to="/admin/diagnostics"
              style={{ color: "#9CA3AF", textDecoration: "none", fontSize: 14 }}
            >
              ← All submissions
            </Link>
          </div>
        </div>
      </div>

      <DiagnosticReport
        name={data.name}
        businessName={data.business_name}
        answers={answers}
        scores={scores}
        aiOpening={opening}
        aiPending={aiPending}
        aiUnavailable={aiUnavailable}
        showPrintButton={false}
        onEnrol={() => setPreviewOpen(true)}
      />
      <PrintableDiagnosticReport
        name={data.name}
        businessName={data.business_name}
        answers={answers}
        scores={scores}
        aiOpening={opening}
        aiPending={aiPending}
        aiUnavailable={aiUnavailable}
      />
      <PreviewReportModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onDownload={() => window.print()}
        aiPending={aiPending}
        aiUnavailable={aiUnavailable}
        name={data.name}
        businessName={data.business_name}
        answers={answers}
        scores={scores}
        aiOpening={opening}
      />
    </div>
  );
}
