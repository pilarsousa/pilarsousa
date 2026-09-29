type FactBadgeProps = {
  children: React.ReactNode;
  /** Optional leading icon (e.g. a Lucide icon element). */
  icon?: React.ReactNode;
  /**
   * Stagger index — offsets the continuous sheen so a row of badges reflects
   * in a cascade instead of all flashing at once (0, 1, 2 …).
   */
  index?: number;
};

/**
 * Small pill that frames a single offer fact (date, format, price).
 * Thin gold border on a translucent dark face — sober, premium. A soft gold
 * sheen sweeps across continuously (staggered per index so a row cascades),
 * and hover lifts the border. All badges share one look.
 */
export function FactBadge({ children, icon, index = 0 }: FactBadgeProps) {
  return (
    <span className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-accent/30 bg-ink/30 px-4 py-2 text-sm tracking-wide text-foreground/90 backdrop-blur-sm transition-colors duration-500 hover:border-accent/60">
      {/* Continuous gold sheen — staggered per badge via animation-delay so a
          row of them reflects in a cascade, not all at once. */}
      <span
        aria-hidden
        style={{ animationDelay: `${index * 1.2}s` }}
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-cream-gold/30 to-transparent animate-sheen"
      />
      {icon && <span className="relative text-accent">{icon}</span>}
      <span className="relative">{children}</span>
    </span>
  );
}
