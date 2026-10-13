"use client";

import { useEffect, useState } from "react";
import { FECHA_EVENTO, ZONA_HORARIA } from "@/components/cientifico-v3/content";

/*
  Cuenta atrás al evento (FECHA_EVENTO, hora de Madrid). Misma resolución de
  zona horaria que la AnnouncementBar de v1: se lee qué hora muestra Madrid en
  ese instante en vez de fijar el desfase, así el cambio de horario de octubre
  no lo rompe.
*/

/** Desfase (ms) de la zona en un instante UTC: hora de la zona − UTC. */
function desfaseZona(fechaUtc: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONA_HORARIA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const partes = dtf.formatToParts(fechaUtc);
  const valor = (t: string) => Number(partes.find((p) => p.type === t)?.value);
  const comoUtc = Date.UTC(
    valor("year"),
    valor("month") - 1,
    valor("day"),
    valor("hour") === 24 ? 0 : valor("hour"),
    valor("minute"),
    valor("second"),
  );
  return comoUtc - fechaUtc.getTime();
}

function instanteEvento(): number {
  const { year, month, day, hour, minute } = FECHA_EVENTO;
  const ingenuo = Date.UTC(year, month - 1, day, hour, minute, 0);
  return ingenuo - desfaseZona(new Date(ingenuo));
}

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
    <div className="flex shrink-0 gap-[clamp(3px,1.2vw,6px)] sm:gap-2.5" role="timer" aria-label="Tiempo hasta el evento">
      {cajas.map(({ valor, etiqueta }) => (
        <div key={etiqueta} className="cv3-contador__caja">
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
