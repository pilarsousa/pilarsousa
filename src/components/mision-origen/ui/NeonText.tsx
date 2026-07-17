import { cn } from "@/lib/cn";

type NeonTextProps = {
  children: React.ReactNode;
  className?: string;
  /** Color variant of the neon shimmer. */
  variant?: "cyan" | "pink" | "violet" | "multi";
};

/*
  Gradient strings must be static so Tailwind v4 includes them in the build.
  Each string is a full bg-[...] utility — not interpolated.
*/
const GRADIENTS: Record<NonNullable<NeonTextProps["variant"]>, string> = {
  cyan: "bg-[linear-gradient(110deg,#28bff1_0%,#aef0fe_35%,#ffffff_50%,#aef0fe_65%,#28bff1_100%)]",
  pink: "bg-[linear-gradient(110deg,#f90281_0%,#f00eb8_40%,#ffffff_55%,#f00eb8_70%,#f90281_100%)]",
  violet:
    "bg-[linear-gradient(110deg,#872478_0%,#f00eb8_35%,#495cc4_65%,#872478_100%)]",
  multi:
    "bg-[linear-gradient(110deg,#28bff1_0%,#f00eb8_40%,#495cc4_70%,#28bff1_100%)]",
};

/**
 * Inline text painted with an animated neon gradient that drifts slowly —
 * the cyberpunk equivalent of the gold shimmer. Gradient is clipped to
 * the glyphs via bg-clip-text + text-transparent.
 * Respects prefers-reduced-motion via the global reduce rule.
 */
export function NeonText({ children, className, variant = "cyan" }: NeonTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-[length:200%_auto] animate-neon-drift",
        GRADIENTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
