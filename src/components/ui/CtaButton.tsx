import { cn } from "@/lib/cn";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Full-width on its container (useful in stacked mobile layouts). */
  block?: boolean;
};

/**
 * Primary call-to-action. Solid gold face for maximum authority: the gold
 * IS the button, not just a border. A slow gradient sheen drifts across on
 * hover (background-position) and the dark label keeps it premium and
 * readable. Click presses in slightly.
 *
 * Tailwind-only so it stays a Server Component — no CSS-in-JS runtime.
 */
export function CtaButton({ href, children, className, block }: CtaButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl px-12",
        "font-display text-sm font-semibold uppercase tracking-[0.25em] text-ink",
        // Solid gold gradient face, slightly oversized so it can drift on hover.
        "bg-[length:200%_100%] bg-[position:left_center]",
        "bg-[linear-gradient(110deg,#c8a45a_0%,#f3e2b0_45%,#e2c27a_55%,#c8a45a_100%)]",
        "shadow-[0_10px_30px_-10px_rgba(200,164,90,0.7)]",
        "transition-[background-position,transform,box-shadow] duration-700 ease-out",
        "hover:bg-[position:right_center] hover:shadow-[0_14px_40px_-10px_rgba(226,194,122,0.85)]",
        "active:scale-95",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        block ? "flex w-full" : "inline-flex",
        className,
      )}
    >
      {children}
    </a>
  );
}
