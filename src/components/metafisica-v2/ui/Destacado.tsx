import { cn } from "@/lib/cn";

/**
 * Pinta en salvia las partes del copy marcadas con [corchetes] (content.ts).
 * Así los textos siguen siendo cadenas planas y el destacado se mueve
 * editando el copy, no el JSX.
 */
export function Destacado({
  texto,
  className,
  claseDestacado = "cv3-destacado",
}: {
  texto: string;
  className?: string;
  /** Clase de las partes marcadas. Por defecto, salvia. */
  claseDestacado?: string;
}) {
  const partes = texto.split(/(\[[^\]]+\])/g).filter(Boolean);

  return (
    <span className={className}>
      {partes.map((parte, i) =>
        parte.startsWith("[") ? (
          <span key={i} className={cn(claseDestacado)}>
            {parte.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{parte}</span>
        ),
      )}
    </span>
  );
}
