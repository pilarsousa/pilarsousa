"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Reflejos } from "@/components/cientifico-v2/ui/Reflejos";

/*
  Marco de la hoja de inscripción del modal de registro, armado con los
  bordes de la página:
  - pestaña en ángulo arriba al centro (el panel de "Qué es"), con la ✦ del
    separador adentro;
  - esquinas en chaflán (la barra superior);
  - una regla de oro entre la cabecera y el formulario, como el renglón de
    un cuaderno, y al pie el membrete del seminario: la hoja de asistencia
    que pidió Pilar (su firma va en el botón), no una entrada de cine;
  - filo oro claro → oro con los reflejos de la barra superior.

  Todo es un SVG medido en píxeles (ResizeObserver): el alto cambia cuando
  aparecen los errores del formulario, y así la forma y los reflejos siguen
  al contenido. useLayoutEffect: se mide antes de pintar, para que el panel
  nunca se vea un cuadro sin fondo.
*/

/* Pestaña: alto y ancho (fracción del ancho total). */
const PESTANA_ALTO = 18;
const PESTANA_ANCHO = 0.36;
/* Chaflán de las esquinas. */
const CHAFLAN = 14;
/* Medio trazo: el contorno se dibuja hacia adentro para no recortarse. */
const S = 0.75;

type Medidas = { w: number; h: number; regla: number };

/** Contorno cerrado, en sentido horario desde la esquina superior izquierda. */
function contorno({ w, h }: Medidas) {
  const t = PESTANA_ALTO + S;
  const c = CHAFLAN;
  const tw = (w * PESTANA_ANCHO) / 2;
  const cx = w / 2;
  const x0 = S;
  const x1 = w - S;
  const y1 = h - S;
  return [
    `M${x0} ${t + c}`,
    `L${x0 + c} ${t}`,
    `L${cx - tw - PESTANA_ALTO} ${t}`,
    `L${cx - tw} ${S}`,
    `L${cx + tw} ${S}`,
    `L${cx + tw + PESTANA_ALTO} ${t}`,
    `L${x1 - c} ${t}`,
    `L${x1} ${t + c}`,
    `L${x1} ${y1 - c}`,
    `L${x1 - c} ${y1}`,
    `L${x0 + c} ${y1}`,
    `L${x0} ${y1 - c}`,
    "Z",
  ].join(" ");
}

export function MarcoInscripcion({
  cabecera,
  children,
  className,
}: {
  /** Lo que va arriba de la regla (marca, título, fecha). */
  cabecera: React.ReactNode;
  /** Lo que va debajo (el formulario). */
  children: React.ReactNode;
  className?: string;
}) {
  const marcoRef = useRef<HTMLDivElement>(null);
  const reglaRef = useRef<HTMLDivElement>(null);
  const [m, setM] = useState<Medidas | null>(null);

  useLayoutEffect(() => {
    const marco = marcoRef.current;
    const regla = reglaRef.current;
    if (!marco || !regla) return;
    const medir = () =>
      setM({
        w: marco.offsetWidth,
        h: marco.offsetHeight,
        regla: regla.offsetTop + regla.offsetHeight / 2,
      });
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(marco);
    return () => ro.disconnect();
  }, []);

  const d = m ? contorno(m) : null;

  return (
    <div ref={marcoRef} className={cn("relative", className)}>
      {m && d && (
        <svg
          aria-hidden
          viewBox={`0 0 ${m.w} ${m.h}`}
          className="pointer-events-none absolute inset-0 size-full overflow-visible drop-shadow-[0_30px_50px_rgba(233,196,106,0.5)]"
        >
          <defs>
            <linearGradient id="cv2-marco-filo" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#f3d98c" />
              <stop offset="1" stopColor="#e9c46a" />
            </linearGradient>
            <radialGradient id="cv2-marco-brillo" cx="0.5" cy="0" r="0.75">
              <stop offset="0" stopColor="#1e3b2e" stopOpacity="0.55" />
              <stop offset="1" stopColor="#1e3b2e" stopOpacity="0" />
            </radialGradient>
            {/* La regla se desvanece en las puntas. userSpaceOnUse: una línea
                horizontal tiene caja de alto 0 y el degradado por defecto
                (objectBoundingBox) no se pinta. */}
            <linearGradient id="cv2-marco-regla" gradientUnits="userSpaceOnUse" x1={24} x2={m.w - 24} y1={0} y2={0}>
              <stop offset="0" stopColor="#e9c46a" stopOpacity="0" />
              <stop offset="0.5" stopColor="#e9c46a" stopOpacity="0.9" />
              <stop offset="1" stopColor="#e9c46a" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={d} fill="#173226" />
          <path d={d} fill="url(#cv2-marco-brillo)" />

          <line x1={24} x2={m.w - 24} y1={m.regla} y2={m.regla} stroke="url(#cv2-marco-regla)" strokeWidth={1} />

          <path d={d} fill="none" stroke="url(#cv2-marco-filo)" strokeWidth={1.5} />
          <Reflejos d={d} />

          {/* ✦ dentro de la pestaña. La traslación va en el <g>: el latido
              anima `transform` en el path y pisaría el atributo. */}
          <g transform={`translate(${m.w / 2 - 66} ${PESTANA_ALTO / 2 - 9 + 1})`}>
            <path
              className="cv2-separador__destello"
              d="M66 2 C66.9 6.6 68.4 8.1 73 9 C68.4 9.9 66.9 11.4 66 16 C65.1 11.4 63.6 9.9 59 9 C63.6 8.1 65.1 6.6 66 2 Z"
              fill="#e9c46a"
            />
          </g>
        </svg>
      )}

      <div className="relative px-6 pb-6 sm:px-8 sm:pb-7" style={{ paddingTop: PESTANA_ALTO + 26 }}>
        {cabecera}
        {/* Altura de la regla (la línea la dibuja el SVG). */}
        <div ref={reglaRef} aria-hidden className="my-5 h-px" />
        {children}

        {/* Al pie, el membrete del seminario (la firma ya está en el botón). */}
        <p
          aria-hidden
          className="mt-6 text-center font-display text-[0.65rem] font-bold uppercase tracking-[0.22em] text-foreground/45"
        >
          ✦ Seminario oficial · MMXXVI ✦
        </p>
      </div>
    </div>
  );
}
