"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

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
          "font-display text-sm tabular-nums text-white sm:text-base",
          pulse && "inline-block animate-tick-pulse",
        )}
      >
        {pad(value)}
      </span>
      <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-white/70">
        {label}
      </span>
    </div>
  );
}

// Split into two logical parts so desktop keeps everything inline with the "·"
// separator. Mobile instead scrolls the full single-line phrase as a marquee.
const MESSAGE_MAIN = "EVENTO ONLINE GRATUITO - MISIÓN ORIGEN";
const MESSAGE_DETAIL = "23 DE JULIO / 19:00PM (ESPAÑA)";
const MESSAGE_FULL = `${MESSAGE_MAIN} · ${MESSAGE_DETAIL}`;

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
      {/* Barra visual — fondo glass (semitransparente + backdrop-blur).
          Su overflow-hidden recorta shimmer y degradés internos. */}
      <div className="relative overflow-hidden border-b border-white/10 bg-[#28BFF1]/38 backdrop-blur-md">
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
        {/* Mobile: marquee — la frase completa se desplaza en loop. El track
            lleva dos copias idénticas; al moverse -50% el corte es invisible.
            aria-hidden en las copias visibles + texto accesible aparte. */}
        <div className="w-full min-w-0 overflow-hidden sm:hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
            <span
              aria-hidden
              className="px-4 font-sans text-[0.7rem] font-semibold tracking-wide text-white"
            >
              {MESSAGE_FULL}
            </span>
            <span
              aria-hidden
              className="px-4 font-sans text-[0.7rem] font-semibold tracking-wide text-white"
            >
              {MESSAGE_FULL}
            </span>
          </div>
          <span className="sr-only">{MESSAGE_FULL}</span>
        </div>

        {/* Desktop: frase inline, estática, con separador "·" */}
        <p className="hidden min-w-0 font-sans font-semibold leading-tight tracking-wide text-white sm:block sm:w-auto sm:text-[0.68rem] md:text-xs lg:text-sm">
          <span>{MESSAGE_MAIN}</span>
          <span aria-hidden>{" · "}</span>
          <span>{MESSAGE_DETAIL}</span>
        </p>

        {/* Countdown — hidden numbers until mounted to avoid layout shift */}
        <div
          className="flex items-center gap-2 sm:shrink-0 sm:gap-4"
          aria-live="off"
        >
          {remaining && !remaining.done ? (
            <>
              <TimeCell value={remaining.days} label="días" pulse />
              <span aria-hidden className="font-display text-sm text-white/40">:</span>
              <TimeCell value={remaining.hours} label="hs" pulse />
              <span aria-hidden className="font-display text-sm text-white/40">:</span>
              <TimeCell value={remaining.minutes} label="min" pulse />
              <span aria-hidden className="font-display text-sm text-white/40">:</span>
              <TimeCell value={remaining.seconds} label="seg" pulse />
            </>
          ) : remaining?.done ? (
            <span className="font-display text-sm font-semibold text-white">
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
