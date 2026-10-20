import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { checkAdminSession } from "@/lib/admin-gate.functions";
import { AdminNav } from "@/components/AdminNav";
import {
  listKasiMoveVendorForms,
  setKasiMoveVendorBuilt,
  type VendorIntakeRow,
} from "@/lib/kasi-move-vendor.functions";

export const Route = createFileRoute("/admin_/vendor-forms")({
  head: () => ({
    meta: [
      { title: "Vendor forms · Admin · kasiAIhub" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  ssr: false,
  loader: async () => {
    const s = await checkAdminSession();
    if (!s.unlocked) throw redirect({ to: "/admin" });
    return s;
  },
  component: VendorFormsAdmin,
});

const EMERALD = "#00A86B";

const card = {
  background: "#111",
  border: "0.5px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  padding: "16px",
  marginTop: 16,
} as const;

const label = { color: "#aaa", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: 0.5 };
const value = { color: "#fff", fontSize: 15, marginTop: 2, whiteSpace: "pre-wrap" as const, wordBreak: "break-word" as const };

function Field({ l, children }: { l: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={label}>{l}</div>
      <div style={value}>{children}</div>
    </div>
  );
}

function waLink(num: string) {
  return `https://wa.me/${num.replace("+", "")}`;
}

function payments(r: VendorIntakeRow) {
  const p: string[] = [];
  if (r.pay_cash) p.push("Cash");
  if (r.pay_card) p.push("Card machine");
  if (r.pay_eft) p.push("Bank transfer (EFT)");
  return p.join(" · ") || "-";
}

function VendorCard({ r }: { r: VendorIntakeRow }) {
  const queryClient = useQueryClient();
  const toggle = useServerFn(setKasiMoveVendorBuilt);
  const mut = useMutation({
    mutationFn: (built: boolean) => toggle({ data: { id: r.id, built } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-kasi-move-vendor-forms"] }),
  });
  return (
    <article style={{ ...card, opacity: r.built ? 0.6 : 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{r.business_name}</h2>
          <p style={{ color: "#aaa", fontSize: 13, margin: "4px 0 0" }}>
            {new Date(r.created_at).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            {r.built && <span style={{ color: EMERALD, marginLeft: 8, fontWeight: 700 }}>BUILT</span>}
          </p>
        </div>
        <button
          onClick={() => mut.mutate(!r.built)}
          disabled={mut.isPending}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: `1px solid ${r.built ? "rgba(255,255,255,0.25)" : "rgba(0,168,107,0.5)"}`,
            background: r.built ? "transparent" : "rgba(0,168,107,0.15)",
            color: r.built ? "#ccc" : EMERALD,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {mut.isPending ? "Saving…" : r.built ? "Mark not built" : "Mark built"}
        </button>
      </div>
      <Field l="Owner">{r.owner_name}</Field>
      <Field l="WhatsApp">
        <a href={waLink(r.whatsapp_number)} target="_blank" rel="noopener noreferrer" style={{ color: EMERALD }}>
          {r.whatsapp_number}
        </a>
      </Field>
      <Field l="Where">{r.street_area}, {r.town}</Field>
      <Field l="Opening times">
        {r.opening_hours.map((h) => `${h.day} ${h.from}-${h.to}`).join(" · ") || "-"}
      </Field>
      <Field l="Menu">{r.menu_text}</Field>
      <Field l="Delivery">
        {r.delivers ? (
          <>
            Yes - rider {r.rider_name}
            {r.rider_whatsapp && (
              <> (<a href={waLink(r.rider_whatsapp)} target="_blank" rel="noopener noreferrer" style={{ color: EMERALD }}>{r.rider_whatsapp}</a>)</>
            )}
            {r.delivery_areas && <> - {r.delivery_areas}</>}
          </>
        ) : (
          "No"
        )}
      </Field>
      <Field l="Collection">{r.collects ? "Yes" : "No"}</Field>
      <Field l="Payment">{payments(r)}</Field>
      {r.first_special && <Field l="First special">{r.first_special}</Field>}
    </article>
  );
}

function VendorFormsAdmin() {
  const fetchFn = useServerFn(listKasiMoveVendorForms);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-kasi-move-vendor-forms"],
    queryFn: () => fetchFn(),
    refetchInterval: 10_000,
  });
  const open = data?.rows.filter((r) => !r.built) ?? [];
  const done = data?.rows.filter((r) => r.built) ?? [];
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <AdminNav />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "24px 20px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Kasi Move vendor forms</h1>
        <p style={{ color: "#aaa", marginTop: 4 }}>
          To build: <strong style={{ color: EMERALD }}>{open.length}</strong> · updates every 10 seconds
        </p>
        {isLoading && <p style={{ marginTop: 16 }}>Loading…</p>}
        {error && <p style={{ marginTop: 16, color: "#f87171" }}>Could not load vendor forms.</p>}
        {data && open.length === 0 && done.length === 0 && (
          <p style={{ marginTop: 16, color: "#aaa" }}>No vendor forms yet.</p>
        )}
        {open.map((r) => <VendorCard key={r.id} r={r} />)}
        {done.length > 0 && (
          <>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 32, color: "#aaa" }}>Built</h2>
            {done.map((r) => <VendorCard key={r.id} r={r} />)}
          </>
        )}
      </main>
    </div>
  );
}
