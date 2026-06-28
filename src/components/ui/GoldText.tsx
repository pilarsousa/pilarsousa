import { cn } from "@/lib/cn";

type GoldTextProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Inline text painted with a light-gold gradient that drifts slowly and
 * continuously — a premium shimmer. The gradient is clipped to the glyphs
 * (bg-clip-text + transparent text). Used to highlight key phrases.
 *
 * Lighter gold range than the CTA so it reads bright over dark photography.
 * Respects prefers-reduced-motion via the global reduce rule.
 */
export function GoldText({ children, className }: GoldTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-[length:200%_auto] animate-gold-drift",
        "bg-[linear-gradient(110deg,#e2c27a_0%,#f3e2b0_25%,#fff4d6_50%,#f3e2b0_75%,#e2c27a_100%)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
