/**
 * Canonical kasiAIhub logo lockup.
 *
 * One component, used everywhere the logo appears, so wordmark size, emerald
 * "AI" treatment and tagline spacing are identical site-wide. Never rebuild the
 * lockup inline — import this instead.
 */
type Props = {
  /** Visual size of the lockup. */
  size?: "sm" | "md" | "lg";
  /** Show the "INTELLIGENT BUSINESS SYSTEMS" tagline under the wordmark. */
  tagline?: boolean;
  /** Optional suffix badge, e.g. "Admin". */
  suffix?: string;
  className?: string;
};

export function KasiLogo({ size = "md", tagline = false, suffix, className }: Props) {
  return (
    <span
      className={`kasi-logo kasi-logo--${size}${className ? ` ${className}` : ""}`}
      aria-label="kasiAIhub"
    >
      <span className="kasi-logo-wordmark" aria-hidden="true">
        <span>kasi</span>
        <span className="kasi-logo-ai">AI</span>
        <span>hub</span>
        {suffix ? <span className="kasi-logo-suffix">{suffix}</span> : null}
      </span>
      {tagline ? (
        <span className="kasi-logo-tagline">INTELLIGENT BUSINESS SYSTEMS</span>
      ) : null}
    </span>
  );
}
