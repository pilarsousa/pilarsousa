"use client";

import { Container } from "@/components/shared/Container";
import { useCountdown, type TimeLeft } from "@/components/bootcamp-v2/ui/useCountdown";

const UNITS: Array<{ key: keyof Omit<TimeLeft, "done">; suffix: string }> = [
  { key: "days", suffix: "d" },
  { key: "hours", suffix: "h" },
  { key: "minutes", suffix: "m" },
  { key: "seconds", suffix: "s" },
];

/** Live red: the universal "on air" signal, readable on the brand green. */
const LIVE_RED = "#ff4d4d";

/**
 * Barra de cuenta atrás, pegada arriba durante todo el scroll.
 *
 * ── PEGADA, NO FIJA ──
 *
 * Va con position: sticky al principio de la página, no con fixed: ocupa su
 * propio hueco arriba, así que no tapa el hero, y al bajar se queda anclada al
 * borde superior. Siempre visible: a un día del evento la urgencia no puede
 * depender de hacia dónde se mueva el scroll.
 *
 * ── MENOS DE UN DÍA ──
 *
 * Con 0 días la unidad desaparece: "18h 32m 10s" dice "es hoy/mañana" mucho
 * más que "00d 18h 32m 10s".
 *
 * ── HUSOS HORARIOS ──
 *
 * El contador es igual en todo el mundo porque cuenta hasta un instante
 * absoluto. La hora que se escribe es la de España.
 */
export function CountdownHeader({ target }: { target: string }) {
  const time = useCountdown(target);
  const units = time && time.days === 0 ? UNITS.slice(1) : UNITS;

  return (
    <div className="sticky top-0 z-50 border-b border-accent/15 bg-ink/90 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md">
      <Container className="flex items-center justify-center gap-2.5 py-3 sm:gap-4">
        {time?.done ? (
          <p className="text-[0.8rem] font-semibold text-foreground sm:text-sm">
            El bootcamp ha comenzado
          </p>
        ) : (
          <>
            {/* Live dot: steady core + expanding ring. */}
            <span aria-hidden className="relative flex size-2 shrink-0">
              <span
                className="absolute inline-flex size-full animate-ping rounded-full opacity-75 motion-reduce:animate-none"
                style={{ backgroundColor: LIVE_RED }}
              />
              <span
                className="relative inline-flex size-2 rounded-full"
                style={{ backgroundColor: LIVE_RED }}
              />
            </span>

            <p className="text-[0.72rem] font-semibold text-foreground sm:text-sm">
              El evento comienza en
            </p>

            <div role="timer" aria-live="off" className="flex items-center gap-1 sm:gap-1.5">
              {units.map(({ key, suffix }) => (
                <span
                  key={key}
                  className="inline-flex items-baseline rounded-md bg-cream px-1.5 py-0.5 text-forest-900 shadow-[inset_0_-2px_4px_-2px_rgba(0,47,1,0.35)] sm:px-2"
                >
                  {/* "--" until the first tick, so the bar keeps its width. */}
                  <span className="text-[0.72rem] font-bold tabular-nums sm:text-sm">
                    {time ? String(time[key]).padStart(2, "0") : "--"}
                  </span>
                  <span className="ml-px text-[0.6rem] font-semibold text-forest-700 sm:text-[0.7rem]">
                    {suffix}
                  </span>
                </span>
              ))}
            </div>

            {/* Desktop: the Spanish time next to the timer. */}
            <p className="hidden text-sm font-medium text-foreground/75 lg:block">
              18:00 España
            </p>
          </>
        )}
      </Container>
    </div>
  );
}
