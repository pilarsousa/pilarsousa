import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ImagenTemporalProps = {
  /** Qué foto va acá, para quien la tenga que producir. */
  nota: string;
  /** Medidas sugeridas, p. ej. "1920 × 900". */
  medidas?: string;
  className?: string;
  /** Dónde se ubica la etiqueta dentro del área. */
  etiqueta?: "centro" | "arriba";
};

/**
 * Marca el lugar de una imagen que todavía no llegó. Ocupa el área que le dé
 * el padre (posicionarla con className) y muestra una etiqueta con lo que va
 * ahí y sus medidas. Reemplazar por <Image> cuando esté la foto real.
 */
export function ImagenTemporal({ nota, medidas, className, etiqueta = "centro" }: ImagenTemporalProps) {
  return (
    <div
      role="img"
      aria-label={`Imagen temporal: ${nota}`}
      className={cn(
        "cv1-placeholder flex justify-center p-6",
        etiqueta === "centro" ? "items-center" : "items-start pt-[12%]",
        className,
      )}
    >
      <div className="cv1-vidrio flex max-w-xs flex-col items-center gap-2 rounded-2xl px-6 py-5 text-center">
        <ImageIcon aria-hidden size={26} strokeWidth={1.5} className="text-accent" />
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Imagen temporal
        </p>
        <p className="font-sans text-sm leading-snug text-foreground/75">{nota}</p>
        {medidas && (
          <p className="font-sans text-xs tabular-nums text-foreground/50">{medidas}</p>
        )}
      </div>
    </div>
  );
}
