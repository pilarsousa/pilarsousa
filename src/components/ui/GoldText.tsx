import { cn } from "@/lib/cn";

type GoldTextProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * "Lava" variant — a warmer, more saturated gold that flows faster, plus a
   * gold glow around the glyphs (via drop-shadow, which works on clipped text
   * where text-shadow would not). Use to make a title really stand out.
   */
  glow?: boolean;
};

/**
 * Inline text painted with a light-gold gradient that drifts slowly and
 * continuously — a premium shimmer. The gradient is clipped to the glyphs
 * (bg-clip-text + transparent text). Used to highlight key phrases.
 *
 * Lighter gold range than the CTA so it reads bright over dark photography.
 * Respects prefers-reduced-motion via the global reduce rule.
 */
export function GoldText({ children, className, glow = false }: GoldTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-[length:200%_auto] animate-gold-drift",
        glow
          ? // Warmer, richer gold with a flowing gold glow around the letters.
            "bg-[linear-gradient(110deg,#c8912f_0%,#f3e2b0_25%,#fff4d6_50%,#e2c27a_75%,#c8912f_100%)] drop-shadow-[0_0_10px_rgba(226,194,122,0.45)]"
          : "bg-[linear-gradient(110deg,#e2c27a_0%,#f3e2b0_25%,#fff4d6_50%,#f3e2b0_75%,#e2c27a_100%)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
