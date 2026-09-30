"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/*
  El fondo animado del hero del Diagnóstico —la rejilla en perspectiva con el
  haz que la recorre—, reutilizado detrás de la tarjeta de precio.

  ── NO SE COPIA EL COMPONENTE, SE IMPORTA ──

  GridScan vive en components/diagnostico/ui y se usa tal cual: un ajuste de
  rendimiento o un arreglo allí llega aquí solo. Lo que cambia son los props
  y la máscara, que van en este envoltorio.

  ── POR QUÉ ESTE ENVOLTORIO Y NO MONTARLO DIRECTAMENTE ──

  En el Diagnóstico la rejilla está en el hero: se ve al entrar y ya. Aquí va a
  mitad de página, y GridScan no se pausa fuera de pantalla — su bucle WebGL
  seguiría pintando mientras el visitante lee el hero o las FAQ. Dos cosas lo
  evitan:

  · CARGA DIFERIDA (next/dynamic, sin SSR). three.js y postprocessing no entran
    en el paquete inicial de /bootcamp; se descargan cuando hace falta.

  · MONTAJE POR VISIBILIDAD. Se monta cuando la sección se acerca a la pantalla
    (200px de margen, para que ya esté pintada al llegar) y se DESMONTA al
    salir. El desmontaje es seguro: GridScan cancela su bucle y libera el
    contexto WebGL con forceContextLoss.
*/
const GridScan = dynamic(
  () => import("@/components/diagnostico/ui/GridScan").then((m) => m.GridScan),
  { ssr: false },
);

type GridScanBackdropProps = {
  className?: string;
};

export function GridScanBackdrop({ className }: GridScanBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "bc2-fondo-rejilla pointer-events-none absolute inset-0 select-none",
        className,
      )}
    >
      {visible && (
        /* Los mismos valores que el hero del Diagnóstico, que ya se afinaron
           allí sobre el mismo verde (ver diagnostico/page.tsx): grosor 1.2,
           aberración cromática a cero y giroscopio en móvil. */
        <GridScan
          linesColor="#5b9800"
          scanColor="#f5f5f5"
          sensitivity={0.55}
          lineThickness={1.2}
          gridScale={0.1}
          scanOpacity={0.5}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0}
          noiseIntensity={0.01}
          enableGyro
        />
      )}
    </div>
  );
}
