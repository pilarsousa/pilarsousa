import { cn } from "@/lib/cn";

type PriceTagProps = {
  className?: string;
};

/**
 * "Inversión de la experiencia: 44 €" framed by top and bottom gold hairlines
 * that fade dark→gold→dark, so it reads as a deliberate, premium detail.
 * Reusable wherever the price needs to appear.
 */
export function PriceTag({ className }: PriceTagProps) {
  return (
    <div
      className={cn(
        "py-3 text-center text-sm text-foreground/100",
        // Gradient hairlines on top & bottom (dark → gold → dark). border-image
        // needs a solid border with a width to render.
        "border-y border-solid [border-image:linear-gradient(to_right,transparent,var(--color-accent),transparent)_1]",
        className,
      )}
    >
      Inversión de la experiencia:{" "}
      <span className="text-xl font-display font-semibold text-white">44 €</span>
    </div>
  );
}
