import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitKasiMoveVendorForm } from "@/lib/kasi-move-vendor.functions";
import { normaliseSaWhatsApp } from "@/lib/kasi-move-phone";

const DESC =
  "Fill in this form and we set it up for you. No commission. You keep every rand.";

export const Route = createFileRoute("/kasi-move")({
  head: () => ({
    meta: [
      { title: "Kasi Move: Open Your Stall | kasiAIhub" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Kasi Move - Open your stall" },
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

const inputCls = "move-waitlist-input";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type Day = (typeof DAYS)[number];
type Hours = Record<Day, { open: boolean; from: string; to: string }>;

const defaultHours = (): Hours =>
  Object.fromEntries(
    DAYS.map((d) => [d, { open: false, from: "08:00", to: "17:00" }]),
  ) as Hours;

function KasiMovePage() {
  const submit = useServerFn(submitKasiMoveVendorForm);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [hours, setHours] = useState<Hours>(defaultHours);
  const [delivers, setDelivers] = useState<"yes" | "no" | null>(null);
  const [collects, setCollects] = useState<"yes" | "no" | null>("yes");
  const [waLink, setWaLink] = useState("https://wa.me/27792376578");

  function setDay(day: Day, patch: Partial<Hours[Day]>) {
    setHours((h) => ({ ...h, [day]: { ...h[day], ...patch } }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const opening_hours = DAYS.filter((d) => hours[d].open).map((d) => ({
      day: d,
      from: hours[d].from,
      to: hours[d].to,
    }));
    const owner = v("owner_name");
    const stall = v("business_name");
    const data = {
      business_name: stall,
      owner_name: owner,
      whatsapp: v("whatsapp"),
      street_area: v("street_area"),
      town: v("town"),
      opening_hours,
      menu_text: v("menu_text"),
      delivers: delivers === "yes",
      rider_name: v("rider_name"),
      rider_whatsapp: v("rider_whatsapp"),
      delivery_areas: v("delivery_areas"),
      collects: collects === "yes",
      pay_cash: f.get("pay_cash") !== null,
      pay_card: f.get("pay_card") !== null,
      pay_eft: f.get("pay_eft") !== null,
      first_special: v("first_special"),
      consent: f.get("consent") !== null,
      website: v("website"),
    };
    if (!stall || !owner || !data.whatsapp || !data.street_area || !data.town)
      return setErr("Please fill in every field about your business.");
    if (!normaliseSaWhatsApp(data.whatsapp))
      return setErr("Please enter a valid WhatsApp number, e.g. 0791234567.");
    if (opening_hours.length === 0)
      return setErr("Please tick at least one opening day.");
    if (!data.menu_text)
      return setErr("Please add your menu - one dish per line with the price.");
    if (delivers === null) return setErr("Do you deliver? Please choose Yes or No.");
    if (data.delivers) {
      if (!data.rider_name) return setErr("Please add your rider's name, or choose No for delivery.");
      if (!normaliseSaWhatsApp(data.rider_whatsapp))
        return setErr("Please enter a valid rider WhatsApp number, e.g. 0791234567.");
      if (!data.delivery_areas) return setErr("Please add the areas you deliver to, or choose No for delivery.");
    }
    if (!data.pay_cash && !data.pay_card && !data.pay_eft)
      return setErr("Please tick at least one way you take payment.");
    if (!data.consent)
      return setErr("Please tick the agreement line so we can build your stall.");
    setErr(null);
    setBusy(true);
    try {
      await submit({ data });
      const msg = encodeURIComponent(`Hi, I'm ${owner} from ${stall}. Here are my menu photos and logo.`);
      setWaLink(`https://wa.me/27792376578?text=${msg}`);
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        <h1 className="move-waitlist-heading">Your online stall is ready to open.</h1>
        <p className="move-waitlist-description">{DESC}</p>

        <section className="move-waitlist-form-section">
          {done ? (
            <div className="move-waitlist-success">
              <span className="move-waitlist-success-mark" aria-hidden="true">
                <Check size={46} strokeWidth={3} />
              </span>
              <p className="move-waitlist-success-heading">Thank you! Last step: send us your photos.</p>
              <p className="move-waitlist-success-sub">
                Send a photo of each dish, and your logo or a photo of your stall if you have one.
              </p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="move-wa-button">
                Send photos on WhatsApp
              </a>
              <p className="move-waitlist-consent">
                Then we build your stall and WhatsApp you the link.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <h2 className="text-2xl font-bold">Your business</h2>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Stall or business name</span>
                <input name="business_name" required maxLength={120} className={inputCls} />
              </label>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Your name</span>
                <input name="owner_name" required maxLength={120} autoComplete="name" className={inputCls} />
              </label>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Your WhatsApp number</span>
                <input name="whatsapp" type="tel" inputMode="tel" required maxLength={20} autoComplete="tel" placeholder="0791234567" className={inputCls} />
                <span className="move-waitlist-hint">We send your stall link here. This is also how you log in.</span>
              </label>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Where is your stall? Street and area</span>
                <input name="street_area" required maxLength={200} placeholder="e.g. Main Road, Ennerdale Ext 9" className={inputCls} />
              </label>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Town</span>
                <input name="town" required maxLength={120} className={inputCls} />
              </label>

              <h2 className="text-2xl font-bold move-waitlist-section">Opening times</h2>
              <p className="move-waitlist-consent">Tick the days you are open.</p>
              <div className="space-y-2">
                {DAYS.map((d) => (
                  <div key={d} className="move-hours-row">
                    <label className="move-hours-day">
                      <input
                        type="checkbox"
                        checked={hours[d].open}
                        onChange={(e) => setDay(d, { open: e.target.checked })}
                      />
                      <span>{d}</span>
                    </label>
                    {hours[d].open ? (
                      <span className="move-hours-times">
                        <input
                          type="time"
                          aria-label={`${d} from`}
                          value={hours[d].from}
                          onChange={(e) => setDay(d, { from: e.target.value })}
                          className="move-waitlist-input move-hours-time"
                        />
                        <span className="move-hours-to">to</span>
                        <input
                          type="time"
                          aria-label={`${d} to`}
                          value={hours[d].to}
                          onChange={(e) => setDay(d, { to: e.target.value })}
                          className="move-waitlist-input move-hours-time"
                        />
                      </span>
                    ) : (
                      <span className="move-hours-closed">Closed</span>
                    )}
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold move-waitlist-section">Your menu</h2>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Dishes and prices</span>
                <span className="move-waitlist-hint">One dish per line with the price, like:</span>
                <span className="move-waitlist-hint">Chicken plate - R60</span>
                <span className="move-waitlist-hint">Pap and wors - R45</span>
                <textarea name="menu_text" required rows={6} maxLength={4000} className="move-waitlist-input move-waitlist-textarea" />
                <span className="move-waitlist-hint">Photos come at the end - after you send this form.</span>
              </label>

              <h2 className="text-2xl font-bold move-waitlist-section">Getting food to customers</h2>
              <div className="space-y-1">
                <span className="move-waitlist-label">Do you deliver?</span>
                <div className="move-choice-row">
                  <label className="move-choice">
                    <input type="radio" name="delivers" checked={delivers === "yes"} onChange={() => setDelivers("yes")} />
                    <span>Yes</span>
                  </label>
                  <label className="move-choice">
                    <input type="radio" name="delivers" checked={delivers === "no"} onChange={() => setDelivers("no")} />
                    <span>No</span>
                  </label>
                </div>
              </div>
              {delivers === "yes" && (
                <div className="space-y-4">
                  <label className="block space-y-1">
                    <span className="move-waitlist-label">Rider's name</span>
                    <input name="rider_name" maxLength={120} className={inputCls} />
                  </label>
                  <label className="block space-y-1">
                    <span className="move-waitlist-label">Rider's WhatsApp number</span>
                    <input name="rider_whatsapp" type="tel" inputMode="tel" maxLength={20} placeholder="0791234567" className={inputCls} />
                  </label>
                  <label className="block space-y-1">
                    <span className="move-waitlist-label">Areas you deliver to</span>
                    <input name="delivery_areas" maxLength={300} placeholder="e.g. Ennerdale, Finetown, Lawley" className={inputCls} />
                  </label>
                </div>
              )}
              <div className="space-y-1">
                <span className="move-waitlist-label">Can customers collect from you?</span>
                <div className="move-choice-row">
                  <label className="move-choice">
                    <input type="radio" name="collects" checked={collects === "yes"} onChange={() => setCollects("yes")} />
                    <span>Yes</span>
                  </label>
                  <label className="move-choice">
                    <input type="radio" name="collects" checked={collects === "no"} onChange={() => setCollects("no")} />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <h2 className="text-2xl font-bold move-waitlist-section">Getting paid</h2>
              <div className="space-y-1">
                <span className="move-waitlist-label">How do you take payment?</span>
                <div className="move-choice-col">
                  <label className="move-choice">
                    <input type="checkbox" name="pay_cash" defaultChecked />
                    <span>Cash</span>
                  </label>
                  <label className="move-choice">
                    <input type="checkbox" name="pay_card" />
                    <span>Card machine</span>
                  </label>
                  <label className="move-choice">
                    <input type="checkbox" name="pay_eft" />
                    <span>Bank transfer (EFT)</span>
                  </label>
                </div>
              </div>

              <h2 className="text-2xl font-bold move-waitlist-section">Something special (optional)</h2>
              <label className="block space-y-1">
                <span className="move-waitlist-label">Your first special</span>
                <input name="first_special" maxLength={300} placeholder="e.g. Free cooldrink with every plate this Friday" className={inputCls} />
              </label>

              <label className="move-choice move-consent-row">
                <input type="checkbox" name="consent" />
                <span>You agree we may use your menu, photos and business details to build and run your Kasi Move stall page. Your details stay with us - never shared, never sold.</span>
              </label>

              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {err && <p className="text-sm text-destructive">{err}</p>}
              <Button type="submit" disabled={busy} className="move-waitlist-submit">
                {busy ? "Sending..." : "Send my details"}
              </Button>
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
