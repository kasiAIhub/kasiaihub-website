import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitTownshipStudy } from "@/lib/township-study.functions";

const CANONICAL = "https://kasiaihub.com/township-study";
const TITLE = "The Community Business Study | kasiAIhub";
const DESCRIPTION =
  "An ongoing look at what South African community businesses actually need — built from real answers, not assumptions.";

export const Route = createFileRoute("/township-study")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: TownshipStudyPage,
});

type Q1 = "" | "handled" | "learn" | "depends";

function TownshipStudyPage() {
  const submit = useServerFn(submitTownshipStudy);
  const [q1, setQ1] = useState<Q1>("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const answers: Record<string, string> = {};
    if (q1) answers.q1_handle_or_learn = q1;
    if (q2.trim()) answers.q2_yesterday_wish = q2.trim();
    if (q3.trim()) answers.q3_recurring_problem = q3.trim();
    if (q4.trim()) answers.q4_hardest_area = q4.trim();
    if (q5.trim()) answers.q5_magic_wand = q5.trim();

    if (Object.keys(answers).length === 0) {
      setError("Please answer at least one question before submitting.");
      return;
    }
    if (!businessName.trim()) {
      setError("Please share your business name so we can credit your input.");
      return;
    }
    if (whatsappNumber.trim().length < 6) {
      setError("Please share a WhatsApp number we can reach you on.");
      return;
    }

    setSubmitting(true);
    try {
      await submit({
        data: {
          business_name: businessName.trim(),
          whatsapp_number: whatsappNumber.trim(),
          contact_email: contactEmail.trim(),
          answers,
        },
      });
      setDone(true);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Back to kasiAIhub
          </Link>
        </nav>

        <header>
          <p className="text-xs uppercase tracking-widest text-primary">
            An ongoing research initiative
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            The Community Business Study
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            An ongoing look at what South African community businesses actually need — built
            from real answers, not assumptions.
          </p>
        </header>

        <section className="mt-10 space-y-5 text-foreground/90 leading-relaxed">
          <p>
            Most research about community entrepreneurship is done <em>about</em> community
            entrepreneurs, not <em>with</em> them. We're trying to do it differently. Every
            few questions you answer here adds to a real, growing picture of what's actually
            happening in businesses like yours — and what we learn, we share back.
          </p>
          <p>
            This isn't a sales pitch. It's a handful of questions, it's optional, and it
            directly shapes what kasiAIhub builds next.
          </p>
          <p className="text-sm text-muted-foreground">
            Want to know why we're doing this?{" "}
            <Link
              to="/blog/township-business-study-south-africa"
              className="text-primary hover:underline"
            >
              Read the thinking behind the study →
            </Link>
          </p>
        </section>

        {done ? (
          <div className="mt-12 rounded-2xl border border-primary/40 bg-primary/5 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Thank you — this genuinely helps shape what we build next.
            </h2>
            <p className="mt-3 text-muted-foreground">
              No prize, no catch, just real input from a real business.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/blog/township-business-hub"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Explore the Community Business Hub →
              </Link>
              <Link
                to="/"
                className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                Back to home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 space-y-10" noValidate>
            {/* Q1 */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-foreground">
                1. If part of your business could be handled for you completely, without you
                needing to learn how — would you want that, or would you rather learn to do
                it yourself?
              </legend>
              <div className="grid gap-3">
                {[
                  { v: "handled" as const, label: "I'd want it handled for me" },
                  { v: "learn" as const, label: "I'd rather learn to do it myself" },
                  { v: "depends" as const, label: "Depends on the task" },
                ].map((opt) => (
                  <label
                    key={opt.v}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm transition ${
                      q1 === opt.v
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="q1"
                      value={opt.v}
                      checked={q1 === opt.v}
                      onChange={() => setQ1(opt.v)}
                      className="accent-primary"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <OpenTextField
              legend="2. Think about yesterday. What's the one thing you did in your business that you wish someone else had just done for you?"
              value={q2}
              onChange={setQ2}
              placeholder="e.g. Following up with three customers who asked about prices last week and never heard back from me"
            />

            <OpenTextField
              legend="3. What's something you've tried to fix more than once, but it keeps coming back?"
              value={q3}
              onChange={setQ3}
              placeholder="e.g. I keep trying to track my expenses properly but I always fall behind after a few weeks"
            />

            <OpenTextField
              legend="4. Pick the part of your business you find hardest — compliance, pricing, or admin — and tell us exactly what you actually do about it right now. Even if the honest answer is 'I ignore it.'"
              value={q4}
              onChange={setQ4}
              placeholder="e.g. I have a folder of papers in a drawer and I deal with it right before deadlines when I panic"
            />

            <OpenTextField
              legend="5. If you could wave a wand and one part of running your business disappeared completely — handled, done, never had to think about it again — what would you choose, and why that one?"
              value={q5}
              onChange={setQ5}
              placeholder="e.g. Chasing people who owe me money — because it makes me feel awkward every single time"
            />

            <div className="grid gap-4 sm:grid-cols-2 border-t border-border pt-8">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Business name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  maxLength={200}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">
                  WhatsApp number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  maxLength={40}
                  placeholder="e.g. 081 890 5861"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                  Email <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  maxLength={200}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
              >
                {submitting ? "Sharing…" : "Share your answers"}
              </button>
              <p className="text-xs text-muted-foreground">
                Answers may be used anonymously in aggregate findings or future articles.
                Never shared individually, never sold.
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

function OpenTextField({
  legend,
  value,
  onChange,
  placeholder,
}: {
  legend: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const max = 300;
  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-semibold text-foreground">{legend}</legend>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        placeholder={placeholder}
        maxLength={max}
        rows={4}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 placeholder:italic focus:border-primary focus:outline-none"
      />
      <div className="text-right text-xs text-muted-foreground">
        {value.length}/{max}
      </div>
    </fieldset>
  );
}
