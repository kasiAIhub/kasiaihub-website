import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinKasiMoveWaitlist } from "@/lib/kasi-move.functions";
import { normaliseSaWhatsApp } from "@/lib/kasi-move-phone";

const DESC =
  "Kasi Move is opening soon for food vendors. Join the waitlist and be first in line. No commission. You keep every rand.";

export const Route = createFileRoute("/kasi-move")({
  head: () => ({
    meta: [
      { title: "Kasi Move: Join the Waitlist for Food Vendors | kasiAIhub" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Kasi Move - Join the waitlist" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kasiaihub.com/kasi-move" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://kasiaihub.com/kasi-move" }],
  }),
  component: KasiMovePage,
});

function Mark({ big = false }: { big?: boolean }) {
  return (
    <Link to="/" className={big ? "move-waitlist-logo" : "move-waitlist-wordmark"} aria-label="Kasi Move - home">
      {big ? <><span className="move-waitlist-k">K</span>
      <span className="move-waitlist-stacked">
        <span>Kasi</span>
        <span>Move</span>
      </span></> : "Kasi Move"}
    </Link>
  );
}

const inputCls =
  "move-waitlist-input";

function KasiMovePage() {
  const join = useServerFn(joinKasiMoveWaitlist);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const data = { name: v("name"), stall_name: v("stall_name"), whatsapp: v("whatsapp"), area: v("area"), biggest_headache: v("biggest_headache"), website: v("website") };
    if (!data.name || !data.stall_name || !data.whatsapp || !data.area) return setErr("Please fill in every field.");
    if (!normaliseSaWhatsApp(data.whatsapp)) return setErr("Please enter a valid WhatsApp number, e.g. 0791234567.");
    setErr(null);
    setBusy(true);
    try {
      await join({ data });
      setDone(true);
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="move-waitlist-page">
      <div className="move-waitlist-content">
        <Link to="/" className="move-waitlist-back"><ArrowLeft size={16} aria-hidden="true" />Back to kasiAIhub</Link>
        <div className="move-waitlist-large-logo"><Mark big /></div>
        <h1 className="move-waitlist-heading">Your stall is almost open.</h1>
        <p className="move-waitlist-description">{DESC}</p>
        <ul className="move-waitlist-points">
          {[
            "Your own online stall - menu, prices, photos, open hours.",
            "Customers order from your link. No app to download.",
            "Your own delivery person, someone your community knows and trusts.",
          ].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <section className="move-waitlist-form-section">
          {done ? (
            <div className="move-waitlist-success">
              <span className="move-waitlist-success-mark" aria-hidden="true">
                <Check size={46} strokeWidth={3} />
              </span>
              <p className="move-waitlist-success-heading">You're on the list. We'll WhatsApp you the moment your stall can open.</p>
              <Mark big />
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <h2 className="text-2xl font-bold">Save my place</h2>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Your name</span>
                <input name="name" required maxLength={120} autoComplete="name" className={inputCls} />
              </label>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Stall name</span>
                <input name="stall_name" required maxLength={120} className={inputCls} />
              </label>
              <label className="block space-y-1">
                <span className="move-waitlist-label">WhatsApp number</span>
                <input name="whatsapp" type="tel" inputMode="tel" required maxLength={20} autoComplete="tel" placeholder="0791234567" className={inputCls} />
              </label>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Area</span>
                <input name="area" required maxLength={160} placeholder="Where is your stall?" className={inputCls} />
              </label>
              <label className="block space-y-1">
                <span className="move-waitlist-label">What's the biggest headache in your business right now?</span>
                <span className="move-waitlist-consent block">One line is fine.</span>
                <input name="biggest_headache" maxLength={300} className={inputCls} />
              </label>
              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {err && <p className="text-sm text-destructive">{err}</p>}
              <Button type="submit" disabled={busy} className="move-waitlist-submit">
                {busy ? "Saving..." : "Join the waitlist"}
              </Button>
              <p className="move-waitlist-consent">By joining, you agree we can WhatsApp you about Kasi Move. Your details stay with us - never shared, never sold. One message and we delete them.</p>
            </form>
          )}
        </section>

        <p className="move-waitlist-footer">
          Questions? <a href="mailto:info@kasiaihub.co.za">info@kasiaihub.co.za</a>
          <br />
          Kasi Move - <a href="https://move.kasiaihub.com">move.kasiaihub.com</a>
        </p>
      </div>
    </main>
  );
}
