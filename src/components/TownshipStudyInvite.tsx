import { Link } from "@tanstack/react-router";

export function TownshipStudyInvite() {
  return (
    <aside className="mt-12 rounded-2xl border border-primary/40 bg-black/40 p-6 md:p-8">
      <p className="text-base leading-relaxed text-foreground/90">
        This article is built from real research on community entrepreneurship. If
        you'd like to add your own experience to what we're learning, the
        Community Business Study takes a few minutes — no sales pitch, just
        genuine questions.
      </p>
      <div className="mt-5">
        <Link
          to="/township-study"
          className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-black px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          Contribute to the study →
        </Link>
      </div>
    </aside>
  );
}
