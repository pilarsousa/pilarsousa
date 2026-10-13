"use client";

import { useEffect, useState } from "react";
import { Atom, CalendarDays, MonitorPlay, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/*
  Target: 17 October 2026, 19:00 in Europe/Madrid.

  ⚠️ Tiene que coincidir con MESSAGE_DATE (abajo) y con la fecha de los badges
  del Hero (FACTS en sections/Hero.tsx).

  On 17 October, Madrid still observes CEST (UTC+2) — DST ends on the last
  Sunday of October. Rather than hardcode the offset,
  we resolve it from the IANA zone so the value stays correct even if the date
  or DST rules ever change. getZonedOffsetMs() reads what "Europe/Madrid" shows
  for a given instant and derives the offset, which we apply to build the exact
  UTC instant the local wall-clock target corresponds to.
*/
const TARGET = { year: 2026, month: 10, day: 17, hour: 19, minute: 0 };
const TIME_ZONE = "Europe/Madrid";

/** Offset (ms) of the given zone at a given UTC instant: zoneWallClock - utc. */
function getZonedOffsetMs(utcDate: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = dtf.formatToParts(utcDate);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  // Wall-clock the zone shows for this instant, read back as if it were UTC.
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") === 24 ? 0 : get("hour"),
    get("minute"),
    get("second"),
  );
  return asUtc - utcDate.getTime();
}

/** The exact UTC timestamp (ms) for the target wall-clock time in Madrid. */
function resolveTargetMs(): number {
  // First approximation: treat the wall-clock as if it were UTC.
  const naiveUtc = Date.UTC(
    TARGET.year,
    TARGET.month - 1,
    TARGET.day,
    TARGET.hour,
    TARGET.minute,
    0,
  );
  // Correct by the zone offset at that instant (stable across DST for a fixed date).
  const offset = getZonedOffsetMs(new Date(naiveUtc));
  return naiveUtc - offset;
}

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function computeRemaining(targetMs: number): Remaining {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: false,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function TimeCell({
  value,
  label,
  pulse,
}: {
  value: number;
  label: string;
  /** When true, the number re-triggers a heartbeat on every value change. */
  pulse?: boolean;
}) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span
        // key forces a remount each tick so the pulse animation replays.
        key={pulse ? value : undefined}
        /* El servidor y el navegador calculan el tiempo restante en instantes
           distintos, así que los números nunca coinciden al hidratar. Es el
           caso de uso previsto de suppressHydrationWarning: el intervalo los
           corrige al segundo siguiente. */
        suppressHydrationWarning
        className={cn(
          "font-display text-sm tabular-nums text-foreground sm:text-base",
          pulse && "inline-block animate-tick-pulse",
        )}
      >
        {pad(value)}
      </span>
      <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-foreground/70">
        {label}
      </span>
    </div>
  );
}

/* Fecha visible del evento — ⚠️ mantener en sincronía con TARGET. */
const MESSAGE_DATE = "17 de octubre · 19:00 (España)";

/* Tres frases, cada una con su ícono. Desktop las muestra en línea; mobile las
   desplaza como marquee. Se escriben en caja normal y el uppercase lo pone el
   CSS: un lector de pantalla deletrea las palabras escritas en mayúsculas. */
const MESSAGES: Array<{ text: string; icon: LucideIcon }> = [
  { text: "Evento online gratuito", icon: MonitorPlay },
  { text: "Volver al Origen", icon: Atom },
  { text: MESSAGE_DATE, icon: CalendarDays },
];

const MESSAGE_FULL = MESSAGES.map((m) => m.text).join(" · ");

/** Las tres frases con sus íconos, separadas por un ✦ en Arena Dorada. */
function MessageItems({ className }: { className?: string }) {
  return (
    <>
      {MESSAGES.map(({ text, icon: Icon }, i) => (
        <span key={text} className={cn("inline-flex items-center", className)}>
          {i > 0 && (
            <span aria-hidden className="mr-3 text-[0.6rem] text-[#d9c7a7]/70 sm:mr-4">
              ✦
            </span>
          )}
          <Icon aria-hidden className="mr-1.5 size-3.5 shrink-0 text-[#d9c7a7] lg:size-4" strokeWidth={1.75} />
          {text}
        </span>
      ))}
    </>
  );
}

export function AnnouncementBar() {
  // Resolve the target once; it never changes across renders.
  const [targetMs] = useState(resolveTargetMs);
  const [remaining, setRemaining] = useState<Remaining>(() => computeRemaining(targetMs));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(computeRemaining(targetMs));
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <div
      role="region"
      aria-label="Anuncio del evento"
      /* cv1-verde: la barra es oscura (Cosmos) sobre una página clara, así
         que lee los tokens de la variante verde (texto claro). */
      className="cv1-verde fixed inset-x-0 top-0 z-100"
    >
      {/* Barra visual — fondo glass (semitransparente + backdrop-blur).
          Su overflow-hidden recorta shimmer y degradés internos. */}
      {/* Cosmos translúcido: se separa del verde noche del Hero y marca la
          barra como aviso del evento. */}
      <div className="relative overflow-hidden border-b border-[#a391b8]/25 bg-[#4b3a6b]/85 backdrop-blur-md">
      {/* Viñeteado lateral en Cosmos hondo.
          Más angosto en mobile para no comerse el ancho del texto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#1e1730]/60 to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#1e1730]/60 to-transparent sm:w-24"
      />

      {/* Shimmer — destello que recorre la barra */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 animate-bar-shimmer bg-gradient-to-r from-transparent via-[#f4eee4]/20 to-transparent"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-1.5 px-3 py-2 text-center sm:flex-row sm:gap-4 sm:px-4 sm:text-left">
        {/* Mobile: marquee — la frase completa se desplaza en loop. El track
            lleva dos copias idénticas; al moverse -50% el corte es invisible.
            aria-hidden en las copias visibles + texto accesible aparte. */}
        <div className="w-full min-w-0 overflow-hidden sm:hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                aria-hidden
                className="flex items-center gap-3 px-4 font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-foreground"
              >
                <MessageItems />
              </span>
            ))}
          </div>
          <span className="sr-only">{MESSAGE_FULL}</span>
        </div>

        {/* Desktop: las tres frases en línea, cada una con su ícono */}
        <p className="hidden min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-sans font-semibold uppercase leading-tight tracking-wide text-foreground sm:flex sm:text-[0.68rem] md:text-xs lg:gap-x-4 lg:text-sm">
          <MessageItems />
        </p>

        {/* Countdown */}
        <div
          className="flex items-center gap-2 sm:shrink-0 sm:gap-4"
          aria-live="off"
        >
          {!remaining.done ? (
            <>
              <TimeCell value={remaining.days} label="días" pulse />
              <span aria-hidden className="font-display text-sm text-foreground/40">:</span>
              <TimeCell value={remaining.hours} label="hs" pulse />
              <span aria-hidden className="font-display text-sm text-foreground/40">:</span>
              <TimeCell value={remaining.minutes} label="min" pulse />
              <span aria-hidden className="font-display text-sm text-foreground/40">:</span>
              <TimeCell value={remaining.seconds} label="seg" pulse />
            </>
          ) : (
            <span className="font-display text-sm font-semibold text-foreground">
              ¡El evento ha comenzado!
            </span>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
