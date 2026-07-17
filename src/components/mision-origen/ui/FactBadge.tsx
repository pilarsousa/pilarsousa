type FactBadgeProps = {
  children: React.ReactNode;
  /** Optional leading icon (e.g. a Lucide icon element). */
  icon?: React.ReactNode;
};

/**
 * Small pill framing a single event fact (date, format, price).
 * Thin cyan border on a translucent dark surface — tech, precise.
 *
 * Fixed size: the pill fills its grid cell (w-full) and has a fixed height,
 * so every badge is identical regardless of text length. Text truncates
 * rather than stretching the box.
 *
 * Motion: desktop reveals a scan-line shimmer + glow on hover. Mobile has no
 * hover, so a soft border/glow pulse (animate-badge-pulse) keeps it alive;
 * that pulse is disabled from `sm` up, where hover takes over.
 */
export function FactBadge({ children, icon }: FactBadgeProps) {
  return (
    <span className="group relative flex h-11 w-full items-center gap-2 overflow-hidden rounded-sm border border-cyan/25 bg-surface/50 px-4 text-sm tracking-wide text-foreground/90 backdrop-blur-sm transition-all duration-500 animate-badge-pulse sm:animate-none hover:border-cyan/60 hover:shadow-[0_0_14px_rgba(40,191,241,0.2)]">
      {/* Scan-line sweep — slides left→right on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-cyan/15 to-transparent transition-[left] duration-700 ease-out group-hover:left-full"
      />
      {icon && <span className="relative shrink-0 text-cyan">{icon}</span>}
      <span className="relative truncate font-sans font-light">{children}</span>
    </span>
  );
}
