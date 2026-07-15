import { cn } from "@/lib/cn";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Full-width on its container (useful in stacked mobile layouts). */
  block?: boolean;
  /**
   * Visual style:
   *  "primary" — hot-pink neon (#F90281), shimmer sweep on hover.
   *  "ghost"   — outlined cyan, glow on hover.
   *  "pill"    — deep-purple pill with expanding neon glow on hover.
   *              Use for the main registration CTA.
   */
  variant?: "primary" | "ghost" | "pill";
};

/**
 * Multi-variant call-to-action anchor.
 * Tailwind-only — stays a Server Component, no runtime CSS-in-JS.
 */
export function CtaButton({
  href,
  children,
  className,
  block,
  variant = "primary",
}: CtaButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden",
        "font-sans font-medium uppercase",
        "transition-all duration-500 ease-out",
        "active:scale-95",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",

        /* ── Primary — hot-pink gradient drift ── */
        variant === "primary" &&
          "h-14 rounded-sm px-10 text-sm tracking-[0.22em] text-white bg-[length:200%_100%] bg-[position:left_center] bg-[linear-gradient(110deg,#f90281_0%,#f00eb8_45%,#f90281_55%,#f90281_100%)] shadow-[0_0_24px_rgba(249,2,129,0.5)] hover:bg-[position:right_center] hover:shadow-[0_0_48px_rgba(249,2,129,0.85),0_0_80px_rgba(249,2,129,0.3)]",

        /* ── Ghost — outlined cyan ── */
        variant === "ghost" &&
          "h-14 rounded-sm px-10 text-sm tracking-[0.22em] border border-cyan/50 text-cyan shadow-[0_0_10px_rgba(40,191,241,0.15)] hover:border-cyan hover:shadow-[0_0_24px_rgba(40,191,241,0.4)]",

        /*
         * ── Pill — deep-purple registration button ──
         *
         * Default:  #6d28d9 → #4c1d95 gradient, moderate outer glow,
         *           thin white top-edge highlight (inset shadow).
         * Hover:    the inner <span> overlay (lighter gradient) fades in
         *           at opacity-100, AND the outer glow expands dramatically.
         *           Together they recreate the luminosity jump visible in the
         *           reference screenshots.
         * Transition: 400ms on shadow, 350ms on the overlay opacity.
         */
        variant === "pill" &&
          "h-14 rounded-full px-8 text-xs tracking-[0.12em] text-white bg-[linear-gradient(180deg,#8b5cf6_0%,#6d28d9_45%,#4c1d95_100%)] shadow-[0_0_22px_rgba(109,40,217,0.6),0_4px_18px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] hover:shadow-[0_0_55px_rgba(139,92,246,0.95),0_0_100px_rgba(109,40,217,0.45),0_8px_22px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.28)]",

        block ? "flex w-full" : "inline-flex",
        className,
      )}
    >
      {variant === "primary" && (
        /* Shimmer sweep — slides left→right on hover */
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-[left] duration-700 ease-out group-hover:left-full"
        />
      )}

      {variant === "pill" && (
        /*
         * Lighter-purple overlay — fades in on hover to simulate the
         * gradient brightening that CSS cannot interpolate natively.
         * Kept inside overflow-hidden so it is clipped to the pill shape.
         */
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-350 ease-out group-hover:opacity-100 bg-[linear-gradient(180deg,#a78bfa_0%,#8b5cf6_45%,#6d28d9_100%)]"
        />
      )}

      <span className="relative">{children}</span>
    </a>
  );
}
