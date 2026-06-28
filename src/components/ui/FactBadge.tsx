type FactBadgeProps = {
  children: React.ReactNode;
  /** Optional leading icon (e.g. a Lucide icon element). */
  icon?: React.ReactNode;
};

/**
 * Small pill that frames a single offer fact (date, format, price).
 * Thin gold border on a translucent dark face — sober, premium. On hover a
 * soft gold reflection sweeps across the pill (a thin diagonal highlight
 * that slides left→right), plus a faint lift. All badges share one look.
 */
export function FactBadge({ children, icon }: FactBadgeProps) {
  return (
    <span className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-accent/30 bg-ink/30 px-4 py-2 text-sm tracking-wide text-foreground/90 backdrop-blur-sm transition-colors duration-500 hover:border-accent/60">
      {/* Reflection sweep — sits off to the left, slides across on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-cream-gold/25 to-transparent transition-[left] duration-700 ease-out group-hover:left-full"
      />
      {icon && <span className="relative text-accent">{icon}</span>}
      <span className="relative">{children}</span>
    </span>
  );
}
