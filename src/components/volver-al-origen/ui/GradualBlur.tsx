/*
  Desenfoque progresivo en un borde.

  Reimplementación del GradualBlur de React Bits, con su misma API. No se instaló
  el paquete original porque su receta pasa por `npx shadcn add`, y este proyecto
  no usa shadcn: no tiene components.json y su cn() es un unificador de strings,
  no un merge de Tailwind. Ese comando habría intentado inicializar shadcn y
  reescribir configuración. El efecto son unas pocas capas de CSS, así que sale
  más barato escribirlo que arrastrar la dependencia.

  Cómo funciona: se apilan varias capas que desenfocan lo que tienen detrás con
  backdrop-filter, cada una con más desenfoque que la anterior y recortada a una
  franja más estrecha pegada al borde. Al superponerse, el desenfoque total crece
  de forma continua hacia ese borde en lugar de aparecer de golpe.

  Un solo div con un backdrop-filter no sirve: el desenfoque sería uniforme y se
  vería el canto donde empieza. La progresión es justamente lo que lo hace
  invisible.

  CUIDADO AL TOCAR EL CONTENEDOR. backdrop-filter desenfoca lo que hay detrás,
  pero deja de ver la página en cuanto un ancestro crea un "backdrop root":
  entonces sólo puede desenfocar lo que haya dentro de ese ancestro, que aquí no
  es nada, y el efecto desaparece sin dar ningún aviso.

  Lo crean, entre otras, estas propiedades en el contenedor: isolation: isolate,
  opacity menor que 1, filter, mask y mix-blend-mode. Las dos primeras estuvieron
  puestas aquí y dejaban el efecto invisible pese a estar todo en el DOM.

  Por eso la opacidad no se aplica al contenedor sino al alfa de la máscara de
  cada capa: se consigue lo mismo sin romper nada.
*/

type GradualBlurProps = {
  /** "parent" se ancla al contenedor (que debe ser relative); "page" a la ventana. */
  target?: "parent" | "page";
  position?: "top" | "bottom" | "left" | "right";
  /** Grosor de la banda desenfocada, en unidades CSS. */
  height?: string;
  /** Desenfoque de la primera capa, en píxeles. Las siguientes lo multiplican. */
  strength?: number;
  /** Número de capas. Más capas = transición más fina y más coste de pintado. */
  divCount?: number;
  /** Reparto de las franjas: "bezier" concentra el efecto junto al borde. */
  curve?: "linear" | "bezier";
  /** Crecimiento del desenfoque: exponencial (x2 por capa) o lineal. */
  exponential?: boolean;
  /** Opacidad global del conjunto. */
  opacity?: number;
  className?: string;
};

export function GradualBlur({
  target = "parent",
  position = "bottom",
  height = "6rem",
  strength = 2.5,
  divCount = 2,
  curve = "bezier",
  exponential = true,
  opacity = 1,
  className,
}: GradualBlurProps) {
  const vertical = position === "top" || position === "bottom";

  /* La máscara se desvanece SIEMPRE alejándose del borde elegido, así que su
     dirección es la contraria a la posición. */
  const away =
    position === "bottom"
      ? "to top"
      : position === "top"
        ? "to bottom"
        : position === "left"
          ? "to right"
          : "to left";

  const layers = Array.from({ length: divCount }, (_, i) => {
    const blur = exponential ? strength * 2 ** i : strength * (i + 1);

    /* Cuanto más desenfoca una capa, más estrecha es su franja: la última
       queda pegada al borde. Con bezier el reparto se curva y concentra más
       aún el efecto ahí. */
    const linear = (divCount - i) / divCount;
    const reach = curve === "bezier" ? linear ** 1.6 : linear;

    return { blur, reach };
  });

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: target === "page" ? "fixed" : "absolute",
        [position]: 0,
        ...(vertical
          ? { left: 0, right: 0, height }
          : { top: 0, bottom: 0, width: height }),
        pointerEvents: "none",
      }}
    >
      {layers.map(({ blur, reach }, i) => {
        /* La opacidad viaja en el alfa del negro de la máscara. Aplicarla como
           propiedad opacity del contenedor anularía el desenfoque; ver la nota
           de arriba. */
        const mask = `linear-gradient(${away}, rgb(0 0 0 / ${opacity}) 0%, transparent ${reach * 100}%)`;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
