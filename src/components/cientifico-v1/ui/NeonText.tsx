import { cn } from "@/lib/cn";

type NeonTextProps = {
  children: React.ReactNode;
  className?: string;
  /** Tono del degradado: Salvia, Arena Dorada, Violeta Alma o los tres. */
  variant?: "salvia" | "arena" | "violeta" | "multi";
};

/*
  Los degradados viven en cientifico-v1.css (.cv1-hl-*) como variables: así la
  sección clara (.cv1-light) puede redefinirlos en tonos oscuros sin que cada
  NeonText tenga que saber sobre qué fondo está.
*/
const GRADIENTS: Record<NonNullable<NeonTextProps["variant"]>, string> = {
  salvia: "cv1-hl-salvia",
  arena: "cv1-hl-arena",
  violeta: "cv1-hl-violeta",
  multi: "cv1-hl-multi",
};

/**
 * Inline text painted with a slowly drifting gradient from the palette,
 * clipped to the glyphs via bg-clip-text + text-transparent.
 * Respects prefers-reduced-motion via the global reduce rule.
 */
export function NeonText({ children, className, variant = "salvia" }: NeonTextProps) {
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
