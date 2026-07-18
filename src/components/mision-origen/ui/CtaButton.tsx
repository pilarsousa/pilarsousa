"use client";

import { cn } from "@/lib/cn";
import { useReservaModal } from "@/components/mision-origen/ui/ReservaModal";

type CtaButtonProps = {
  /** If given, the button navigates to this href. If omitted, it opens the
   *  reservation modal instead — the default behavior for the landing CTAs. */
  href?: string;
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
 * Multi-variant call-to-action. By default (no href) it opens the reservation
 * modal; with an href it renders a plain anchor. Client component so the
 * default variant can trigger the modal.
 */
export function CtaButton({
  href,
  children,
  className,
  block,
  variant = "primary",
}: CtaButtonProps) {
  const { open } = useReservaModal();

  const Tag = href ? "a" : "button";

  return (
    <Tag
      {...(href ? { href } : { type: "button" as const, onClick: open })}
      className={cn(
        "group relative inline-flex items-center justify-center",
        "font-sans font-medium uppercase",
        "transition-all duration-500 ease-out",
        "active:scale-95",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        /* overflow-hidden clips the primary shimmer; the pill's neon glow must
           overflow (its ::after "puddle" sits below the button). */
        variant === "primary" && "overflow-hidden",

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
          "neon-btn h-14 rounded-full px-8 text-xs font-bold tracking-[0.12em]",

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


      <span className="relative">{children}</span>
    </Tag>
  );
}
