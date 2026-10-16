import { cn } from "@/lib/cn";

/**
 * "Volver al Origen" con la construcción de *Leads***Mastery**: la primera
 * parte fina y en blanco, la segunda gruesa y con el degradado de marca.
 * El tamaño lo pone quien lo usa (text-*).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline whitespace-nowrap leading-none tracking-[-0.03em]", className)}>
      <span className="font-light text-foreground">Volver al&nbsp;</span>
      {/* pb: como ítem flex la caja mide 1em y la "g" queda fuera del fondo
          recortado al texto, o sea, sin pintar. */}
      <span className="cv2-grad-texto pb-[0.16em] font-extrabold">Origen</span>
    </span>
  );
}
