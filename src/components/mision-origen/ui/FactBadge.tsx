type FactBadgeProps = {
  children: React.ReactNode;
  /** Optional leading icon (e.g. a Lucide icon element). */
  icon?: React.ReactNode;
};

/**
 * Small pill framing a single event fact (date, format, price).
 * Thin cyan border on a translucent dark surface — tech, precise.
 *
 * The pill sizes to its content: min-h instead of a fixed height, and the
 * label wraps instead of truncating. An earlier fixed-width version clipped
 * the longest label ("26 de julio · 19:00") once the text grew to 18px —
 * showing the full fact matters more than perfectly equal boxes.
 *
 * Motion: a light beam travels the border continuously on every breakpoint —
 * see .beam-badge in globals.css, applied by the parent <li>. Hover adds the
 * scan-line shimmer and a glow on top of it.
 */
export function FactBadge({ children, icon }: FactBadgeProps) {
  return (
    <span className="group relative flex min-h-12 items-center gap-2 overflow-hidden rounded-sm border border-cyan/25 bg-surface/50 px-3 py-2 text-sm tracking-wide text-foreground/90 backdrop-blur-sm transition-all duration-500 sm:px-4 lg:text-lg hover:border-cyan/60 hover:shadow-[0_0_14px_rgba(40,191,241,0.2)]">
      {/* Scan-line sweep — slides left→right on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-cyan/15 to-transparent transition-[left] duration-700 ease-out group-hover:left-full"
      />
      {icon && <span className="relative shrink-0 text-cyan">{icon}</span>}
      <span className="relative font-sans font-light">{children}</span>
    </span>
  );
}
