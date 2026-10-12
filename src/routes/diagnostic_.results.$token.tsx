import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { getDiagnosticByToken, generateDiagnosticOpening } from "@/lib/diagnostic.functions";
import { computeScores } from "@/lib/diagnostic-data";
import { KasiLogo } from "@/components/KasiLogo";
import { DiagnosticReport } from "@/components/DiagnosticReport";
import {
  PrintableDiagnosticReport,
  PreviewReportModal,
} from "@/components/PrintableDiagnosticReport";

export const Route = createFileRoute("/diagnostic_/results/$token")({
  head: () => ({
    meta: [
      { title: "Your Diagnostic Report — kasiAIhub" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResultsPage,
  errorComponent: ({ error }) => (
    <div style={{ padding: 40, color: "#fff", background: "#0A0A0A", minHeight: "100vh" }}>
      <p>We couldn't find that report.</p>
      <p style={{ color: "#9CA3AF", fontSize: 13 }}>{error instanceof Error ? error.message : String(error)}</p>
      <Link to="/diagnostic" style={{ color: "#00C896" }}>
        Take the diagnostic →
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div style={{ padding: 40, color: "#fff", background: "#0A0A0A", minHeight: "100vh" }}>
      Report not found.
    </div>
  ),
});

function ResultsPage() {
  const { token } = Route.useParams();
  const navigate = useNavigate();
  const fetchFn = useServerFn(getDiagnosticByToken);
  const generateOpeningFn = useServerFn(generateDiagnosticOpening);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [aiOpening, setAiOpening] = useState<string | null>(null);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["diagnostic", token],
    queryFn: () => fetchFn({ data: { access_token: token } }),
  });

  const storedOpening = (data as { ai_opening?: string | null } | undefined)?.ai_opening ?? null;
  const opening = aiOpening?.trim() ? aiOpening : storedOpening?.trim() ? storedOpening : null;
  const aiPending = !opening && !aiUnavailable;

  // If the personal read was never written, generate it now and poll for it.
  useEffect(() => {
    if (!data || opening || aiUnavailable) return;
    let cancelled = false;
    let tries = 0;
    const attempt = async () => {
      tries += 1;
      try {
        const res = await generateOpeningFn({ data: { access_token: token } });
        if (!cancelled && res?.ai_opening?.trim()) {
          setAiOpening(res.ai_opening);
          return;
        }
        if (!cancelled && res?.unavailable) {
          if (res.busy) setAiBusy(true);
          setAiUnavailable(true);
          return;
        }
      } catch (err) {
        console.error("[diagnostic] results opening failed", err);
      }
      if (cancelled) return;
      // Give up after ~1 minute so the report and PDF download stay usable.
      if (tries >= 15) {
        setAiUnavailable(true);
        return;
      }
      window.setTimeout(attempt, 4000);
    };
    void attempt();

    return () => {
      cancelled = true;
    };
  }, [data, opening, aiUnavailable, token, generateOpeningFn]);

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
        Loading your report…
      </div>
    );
  }
  if (error || !data) {
    return (
      <div style={{ padding: 40, color: "#fff", background: "#0A0A0A", minHeight: "100vh" }}>
        <p>We couldn't find that report.</p>
        <Link to="/diagnostic" style={{ color: "#00C896" }}>
          Take the diagnostic →
        </Link>
      </div>
    );
  }

  const answers = (data.answers ?? {}) as Record<string, unknown>;
  const scores = computeScores(answers);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <div
        style={{
          borderBottom: "1px solid #1E1E1E",
          padding: "16px 20px",
          background: "rgba(0,0,0,0.85)",
        }}
        className="site-chrome"
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <KasiLogo size="sm" />
          </Link>
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
            <Link to="/" style={{ color: "#9CA3AF", textDecoration: "none", fontSize: 14 }}>
              ← Home
            </Link>
          </div>
        </div>
      </div>
{aiBusy && (
        <p role="status" className="mx-auto mt-4 max-w-[900px] rounded-xl border border-border px-4 py-3 text-foreground">
          We are very busy right now. Please try again in a little while.
        </p>
      )}
      <DiagnosticReport
        name={data.name}
        businessName={data.business_name}
        answers={answers}
        scores={scores}
        aiOpening={opening}
        aiPending={aiPending}
        aiUnavailable={aiUnavailable}
        showPrintButton={false}
        onEnrol={() => {
          if (typeof window !== "undefined") {
            try {
              sessionStorage.setItem(
                "kasiaihub_enrol_prefill",
                JSON.stringify({
                  token: data.access_token,
                  full_name: data.name ?? "",
                  business: data.business_name ?? "",
                  whatsapp: data.whatsapp_number ?? "",
                  email: data.email ?? "",
                }),
              );
            } catch {
              /* ignore */
            }
          }
          navigate({ to: "/", hash: "enrol" });
        }}
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
