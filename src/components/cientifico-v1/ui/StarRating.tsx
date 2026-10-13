/**
 * Trustpilot-style rating: a rounded square filled with the moving neon
 * gradient (same "multi" shimmer as the main title) with a white star cut into
 * the center. Empty boxes are a faint translucent square with a faint star.
 *
 * The gradient lives on the box background and animates (animate-neon-drift);
 * the star is a white SVG overlaid on top.
 */
export function StarBox({ filled, size }: { filled: boolean; size: number }) {
  return (
    <span
      aria-hidden
      className={
        filled
          ? "relative inline-flex items-center justify-center rounded-[3px] bg-[length:200%_auto] animate-neon-drift bg-[linear-gradient(110deg,#7da89a_0%,#d9c7a7_40%,#a391b8_70%,#7da89a_100%)]"
          : "relative inline-flex items-center justify-center rounded-[3px] bg-white/12"
      }
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.72}
        height={size * 0.72}
        fill={filled ? "#1e1730" : "rgba(244,238,228,0.35)"}
        aria-hidden
      >
        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
      </svg>
    </span>
  );
}

export function StarRating({
  value,
  total = 5,
  size = 20,
}: {
  value: number;
  total?: number;
  size?: number;
}) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${value} de ${total} estrellas`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <StarBox key={i} filled={i < value} size={size} />
      ))}
    </div>
  );
}
