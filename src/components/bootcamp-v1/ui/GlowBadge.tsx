import { cn } from "@/lib/cn";

type GlowBadgeProps = {
  children: React.ReactNode;
  /** Optional leading icon (e.g. a Lucide element). */
  icon?: React.ReactNode;
  className?: string;
};

/**
 * A premium pill badge with two continuous effects:
 *  1. A gold beam that travels around the border (rotating conic-gradient,
 *     driven by the animated --border-angle property).
 *  2. A light sheen that sweeps across the face.
 *
 * The rotating border is built as a slightly larger gradient layer sitting
 * behind an inset dark face, so only a thin ring of the moving gradient
 * shows through as the border. Reused for every "call-out" pill (limited
 * time, bonus ribbon) so they all share one look.
 */
export function GlowBadge({ children, icon, className }: GlowBadgeProps) {
  return (
    <span
      className={cn(
        "relative inline-flex overflow-hidden rounded-full p-px",
        // The rotating gold beam lives on the background of this wrapper.
        "bg-[conic-gradient(from_var(--border-angle),transparent_0%,var(--color-gold)_15%,var(--color-gold-soft)_25%,transparent_40%,transparent_100%)]",
        "animate-border-spin",
        className,
      )}
    >
      {/* Inner face — dark pill that leaves only a hairline of the beam. */}
      <span className="relative flex items-center gap-2 rounded-full bg-ink/85 px-4 py-1.5 font-display text-[0.7rem] uppercase tracking-[0.25em] text-cream-gold backdrop-blur-sm">
        {/* Light sheen sweeping across the face. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/45 to-transparent animate-sheen"
        />
        {icon && <span className="relative text-accent">{icon}</span>}
        <span className="relative">{children}</span>
      </span>
    </span>
  );
}
