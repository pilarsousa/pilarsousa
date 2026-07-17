"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import GradualBlur from "@/components/mision-origen/ui/GradualBlur";

/*
  Target: 23 July 2026, 19:00 in Europe/Madrid.

  In late July, Madrid observes CEST (UTC+2). Rather than hardcode the offset,
  we resolve it from the IANA zone so the value stays correct even if the date
  or DST rules ever change. getZonedOffsetMs() reads what "Europe/Madrid" shows
  for a given instant and derives the offset, which we apply to build the exact
  UTC instant the local wall-clock target corresponds to.
*/
const TARGET = { year: 2026, month: 7, day: 23, hour: 19, minute: 0 };
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
        className={cn(
          "font-display text-sm tabular-nums text-[#0a1a2e] sm:text-base",
          pulse && "inline-block animate-tick-pulse",
        )}
      >
        {pad(value)}
      </span>
      <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-[#0a1a2e]/70">
        {label}
      </span>
    </div>
  );
}

// Split into two logical parts so mobile can break between them on its own line,
// while desktop keeps everything inline with the "·" separator.
const MESSAGE_MAIN = "EVENTO ONLINE GRATUITO - MISIÓN ORIGEN";
const MESSAGE_DETAIL = "23 DE JULIO / 19:00PM (ESPAÑA)";

export function AnnouncementBar() {
  // Resolve the target once; it never changes across renders.
  const [targetMs] = useState(resolveTargetMs);
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    // Set immediately, then tick every second. Starting in the effect keeps
    // SSR and first client render identical (avoids a hydration mismatch).
    setRemaining(computeRemaining(targetMs));
    const id = setInterval(() => {
      setRemaining(computeRemaining(targetMs));
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <div
      role="region"
      aria-label="Anuncio del evento"
      className="fixed inset-x-0 top-0 z-100"
    >
      {/* GradualBlur bajo el borde inferior de la barra: difumina el contenido
          de la página que pasa por debajo al scrollear. Sobresale hacia abajo
          desde la costura, por eso vive fuera del overflow-hidden de la barra.
          Alto y con muchos divs para que el desenfoque se desvanezca en degradé,
          sin corte duro. El wrapper NO limita la altura (deja fluir el blur). */}
      <div className="pointer-events-none absolute inset-x-0 top-full">
        {/* position="top": el blur es fuerte pegado a la barra (arriba) y se
            desvanece en degradé hacia abajo, sin línea de corte.
            Franja de ~25px por debajo del announcement. */}
        <GradualBlur
          target="parent"
          position="top"
          height="1.5625rem"
          strength={2}
          divCount={6}
          curve="ease-out"
          opacity={1}
        />
      </div>

      {/* Barra visual — su overflow-hidden recorta shimmer y degradés internos */}
      <div className="relative overflow-hidden bg-[#28BFF1]">
      {/* Degradé negro en los bordes izquierdo y derecho (viñeteado lateral).
          Más angosto en mobile para no comerse el ancho del texto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black/55 to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black/55 to-transparent sm:w-24"
      />

      {/* Shimmer — destello que recorre la barra */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 animate-bar-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-1.5 px-3 py-2 text-center sm:flex-row sm:gap-4 sm:px-4 sm:text-left">
        <p className="w-full min-w-0 whitespace-normal px-2 font-sans text-[0.7rem] font-semibold leading-tight tracking-wide text-wrap text-[#0a1a2e] [overflow-wrap:anywhere] sm:w-auto sm:px-0 sm:text-[0.68rem] md:text-xs lg:text-sm">
          <span className="block sm:inline">{MESSAGE_MAIN}</span>
          {/* Separador solo en desktop (en mobile el salto de línea lo separa) */}
          <span aria-hidden className="hidden sm:inline">{" · "}</span>
          <span className="block sm:inline">{MESSAGE_DETAIL}</span>
        </p>

        {/* Countdown — hidden numbers until mounted to avoid layout shift */}
        <div
          className="flex items-center gap-2 sm:shrink-0 sm:gap-4"
          aria-live="off"
        >
          {remaining && !remaining.done ? (
            <>
              <TimeCell value={remaining.days} label="días" pulse />
              <span aria-hidden className="font-display text-sm text-[#0a1a2e]/40">:</span>
              <TimeCell value={remaining.hours} label="hs" pulse />
              <span aria-hidden className="font-display text-sm text-[#0a1a2e]/40">:</span>
              <TimeCell value={remaining.minutes} label="min" pulse />
              <span aria-hidden className="font-display text-sm text-[#0a1a2e]/40">:</span>
              <TimeCell value={remaining.seconds} label="seg" pulse />
            </>
          ) : remaining?.done ? (
            <span className="font-display text-sm font-semibold text-[#0a1a2e]">
              ¡El evento ha comenzado!
            </span>
          ) : (
            // Reserve height during SSR / first paint so nothing jumps.
            <span className="h-8" aria-hidden />
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
