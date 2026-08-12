import { cn } from "@/lib/cn";

/*
  Filete con destello. Nació dentro del panel del hero, separando el titular del
  texto, y se extrajo aquí al reutilizarse como separador entre secciones.

  El destello es un carácter (✦) y no un SVG: a este tamaño una figura vectorial
  no aporta nada y el glifo hereda el color y el tamaño de fuente sin más.

  aria-hidden porque no aporta información: es una pausa visual. Un lector de
  pantalla que lo anunciara sólo añadiría ruido entre dos bloques de contenido.
*/

type SparkDividerProps = {
  /* Con `fade` los extremos se desvanecen en lugar de cortarse en seco. Es lo
     que quiere el separador entre secciones: a lo ancho de la página, una línea
     de extremos definidos se lee como un borde y no como una pausa. Dentro de
     una caja estrecha, en cambio, el corte no molesta. */
  fade?: boolean;
  className?: string;
};

export function SparkDivider({ fade, className }: SparkDividerProps) {
  const line = fade
    ? "h-px flex-1 bg-linear-to-r from-transparent to-vo-bone/25"
    : "h-px flex-1 bg-vo-bone/20";

  return (
    <div aria-hidden className={cn("flex items-center gap-3", className)}>
      <span className={line} />
      <span className="text-xs text-accent">✦</span>
      {/* La segunda mitad invierte el degradado para que el desvanecido sea
          simétrico y el destello quede en el punto más luminoso. */}
      <span className={fade ? `${line} rotate-180` : line} />
    </div>
  );
}
