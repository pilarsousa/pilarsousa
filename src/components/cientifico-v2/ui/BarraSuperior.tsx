"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Reflejos } from "@/components/cientifico-v2/ui/Reflejos";

/*
  Barra con el corte en ángulo de la referencia: una franja rellena arriba que
  ocupa todo el ancho, una línea que llega desde los bordes a la altura de
  --linea, baja en diagonal y enmarca la barra que cuelga en el centro.

  Tres piezas en fila: tramo izquierdo, centro (relleno + diagonales) y tramo
  derecho. Las diagonales son un SVG estirado (preserveAspectRatio none) que
  ocupa sólo la parte de abajo, de --linea a --alto, con vector-effect
  non-scaling-stroke para que el trazo no se engorde al estirarse. Así la
  altura de la línea es libre en cada tamaño (mobile la lleva mucho más abajo).

  Encima, los reflejos (ui/Reflejos.tsx): destellos de la paleta que recorren
  la línea entera. Necesitan el recorrido en píxeles, así que se mide la barra
  (ResizeObserver). Hasta medir, la línea fija ya está: los reflejos sólo se
  suman.
*/

/* ⚠️ Igual que --relleno de .cv2-barra (cientifico-v2.css). */
const RELLENO = "#173226";

function Diagonal({ lado }: { lado: "izq" | "der" }) {
  const izq = lado === "izq";
  return (
    <div aria-hidden className="cv2-barra__diag relative h-(--alto) w-(--diag) shrink-0">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-(--linea) h-[calc(var(--alto)-var(--linea))] w-full overflow-visible"
      >
        <polygon points={izq ? "0,0 100,0 100,100" : "0,0 100,0 0,100"} fill={RELLENO} />
        <path
          d={izq ? "M0 0.75 L100 99.25" : "M0 99.25 L100 0.75"}
          fill="none"
          stroke={izq ? "#f3d98c" : "#e9c46a"}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/** Recorrido de la línea en píxeles de la barra, para los reflejos. */
function useRecorrido() {
  const barraRef = useRef<HTMLDivElement>(null);
  const centroRef = useRef<HTMLDivElement>(null);
  const [recorrido, setRecorrido] = useState<string | null>(null);

  useEffect(() => {
    const barra = barraRef.current;
    const centro = centroRef.current;
    if (!barra || !centro) return;

    const medir = () => {
      const estilo = getComputedStyle(barra);
      const linea = parseFloat(estilo.getPropertyValue("--linea")) + 0.75;
      const alto = parseFloat(estilo.getPropertyValue("--alto")) - 0.75;
      const diag = parseFloat(estilo.getPropertyValue("--diag"));
      const b = barra.getBoundingClientRect();
      const c = centro.getBoundingClientRect();
      const x1 = c.left - b.left;
      const x2 = c.right - b.left;
      setRecorrido(
        `M0 ${linea} H${x1} L${x1 + diag} ${alto} H${x2 - diag} L${x2} ${linea} H${b.width}`,
      );
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(barra);
    ro.observe(centro);
    return () => ro.disconnect();
  }, []);

  return { barraRef, centroRef, recorrido };
}

export function BarraSuperior({
  children,
  alineacion = "izquierda",
  className,
}: {
  children: React.ReactNode;
  /**
   * "izquierda": desde sm, la barra arranca alineada a la columna de
   * contenido (landing). "centro": la barra queda centrada (gracias).
   */
  alineacion?: "izquierda" | "centro";
  className?: string;
}) {
  const { barraRef, centroRef, recorrido } = useRecorrido();

  return (
    <div ref={barraRef} className={cn("cv2-barra flex w-full items-start", className)}>
      {/* Tramo izquierdo. Mobile: un tramo corto, como en desktop pero
          proporcional. Desde sm (landing) mide lo justo para que el contenido
          caiga sobre la columna de 1140px (ver Contenedor): margen de la
          columna, menos 30px de aire, menos la diagonal. */}
      <div
        aria-hidden
        className={cn(
          "cv2-barra__tramo [--c:#f3d98c]",
          alineacion === "izquierda"
            ? "w-[clamp(6px,3.5vw,16px)] shrink-0 sm:w-[max(0px,calc((100cqw-1140px)/2-30px-var(--diag)))]"
            : "min-w-[clamp(6px,3.5vw,16px)] flex-1",
        )}
      />

      <div
        ref={centroRef}
        className={cn("flex min-w-0", alineacion === "izquierda" ? "flex-1 sm:flex-none" : "shrink-0")}
      >
        <Diagonal lado="izq" />
        <div className="cv2-barra__centro flex min-w-0 flex-1 items-center">{children}</div>
        <Diagonal lado="der" />
      </div>

      <div
        aria-hidden
        className={cn(
          "cv2-barra__tramo min-w-0 [--c:#e9c46a]",
          alineacion === "izquierda" ? "w-[clamp(6px,3.5vw,16px)] shrink-0 sm:w-auto sm:flex-1" : "min-w-[clamp(6px,3.5vw,16px)] flex-1",
        )}
      />

      {recorrido && (
        <svg aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-(--alto) w-full overflow-visible">
          <Reflejos d={recorrido} />
        </svg>
      )}
    </div>
  );
}
