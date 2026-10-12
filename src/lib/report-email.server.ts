import { sendTemplateEmail } from "@/lib/email-templates/send-email";

const STAGE_LABELS: Record<string, string> = {
  growth_ready: "Growth ready",
  stabilisation: "Stabilisation",
  crisis: "Firefighting",
};

/**
 * Emails the entrepreneur their permanent report link. Never throws —
 * the diagnostic flow must never break because of email delivery.
 */
export async function sendDiagnosticReportEmail(args: {
  email: string;
  name?: string | null;
  accessToken: string;
  stage?: string | null;
  submissionId: string;
}) {
  try {
    const reportUrl = `https://kasiaihub.com/diagnostic/results/${args.accessToken}`;
    const result = await sendTemplateEmail("diagnostic-report", args.email, {
      templateData: {
        name: args.name?.split(" ")[0] || undefined,
        reportUrl,
        stageLabel: args.stage ? STAGE_LABELS[args.stage] : undefined,
      },
      idempotencyKey: `diagnostic-report-${args.submissionId}`,
    });
    if (!result.sent) {
      console.warn("[diagnostic] report email skipped", result.reason);
    }
  } catch (e) {
    console.error("[diagnostic] report email failed", e);
  }
}
