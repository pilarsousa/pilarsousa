"use client";

import { useEffect, useState } from "react";
import { instanteEvento } from "@/components/cientifico-v2/horario";

/*
  Cuenta atrás al seminario. El instante sale de horario.ts, el mismo que usan
  la tabla de horarios por país y el bajo botón del hero.
*/

function restante(objetivo: number) {
  const diff = Math.max(0, objetivo - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    minutos: Math.floor((s % 3600) / 60),
    segundos: s % 60,
  };
}

const dos = (n: number) => String(n).padStart(2, "0");

/** Cuatro cajas DÍAS · HRS · MIN · SEG, como la referencia. */
export function Contador() {
  const [objetivo] = useState(instanteEvento);
  const [t, setT] = useState(() => restante(objetivo));

  useEffect(() => {
    const id = setInterval(() => setT(restante(objetivo)), 1000);
    return () => clearInterval(id);
  }, [objetivo]);

  const cajas = [
    { valor: t.dias, etiqueta: "Días" },
    { valor: t.horas, etiqueta: "Hrs" },
    { valor: t.minutos, etiqueta: "Min" },
    { valor: t.segundos, etiqueta: "Seg" },
  ];

  return (
    /* Mobile en vw: tiene que entrar al lado de la marca desde 320px. */
    <div className="flex shrink-0 gap-[clamp(3px,1.2vw,6px)] sm:gap-2.5" role="timer" aria-label="Tiempo hasta el seminario">
      {cajas.map(({ valor, etiqueta }) => (
        <div key={etiqueta} className="cv2-contador__caja">
          {/* El servidor y el navegador calculan en instantes distintos: el
              número nunca coincide al hidratar y el intervalo lo corrige. */}
          <span
            suppressHydrationWarning
            className="text-[clamp(0.9rem,4.4vw,1.1rem)] font-extrabold tabular-nums text-foreground sm:text-[1.75rem]"
          >
            {dos(valor)}
          </span>
          <span className="mt-0.5 text-[clamp(0.42rem,2vw,0.5rem)] font-bold uppercase tracking-[0.12em] text-foreground/75 sm:mt-1 sm:text-[0.65rem] sm:tracking-[0.14em]">
            {etiqueta}
          </span>
        </div>
      ))}
    </div>
  );
}
