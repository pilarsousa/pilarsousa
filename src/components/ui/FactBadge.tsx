type FactBadgeProps = {
  children: React.ReactNode;
  /** Optional leading icon (e.g. a Lucide icon element). */
  icon?: React.ReactNode;
};

/**
 * Small pill framing a single event fact (date, format, price).
 * Thin cyan border on a translucent dark surface — tech, precise.
 * A scan-line shimmer sweeps across on hover, plus a faint glow.
 */
export function FactBadge({ children, icon }: FactBadgeProps) {
  return (
    <span className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm border border-cyan/25 bg-surface/50 px-4 py-2 text-sm tracking-wide text-foreground/90 backdrop-blur-sm transition-all duration-500 hover:border-cyan/60 hover:shadow-[0_0_14px_rgba(40,191,241,0.2)]">
      {/* Scan-line sweep — slides left→right on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-cyan/15 to-transparent transition-[left] duration-700 ease-out group-hover:left-full"
      />
      {icon && <span className="relative text-cyan">{icon}</span>}
      <span className="relative font-sans font-light">{children}</span>
    </span>
  );
}
