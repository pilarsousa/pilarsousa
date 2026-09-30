"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/shared/Container";
import { useCountdown, type TimeLeft } from "@/components/bootcamp-v2/ui/useCountdown";
import { cn } from "@/lib/cn";

const UNITS: Array<{ key: keyof Omit<TimeLeft, "done">; suffix: string }> = [
  { key: "days", suffix: "d" },
  { key: "hours", suffix: "h" },
  { key: "minutes", suffix: "m" },
  { key: "seconds", suffix: "s" },
];

/** Below this scroll depth the bar stays hidden — the hero has its own CTA. */
const SHOW_AFTER = 160;
/** Scroll delta (px) ignored as jitter, so trackpads don't make it flicker. */
const JITTER = 6;

/**
 * Barra fija con la cuenta atrás hasta el inicio del bootcamp.
 *
 * ── APARECE AL BAJAR Y SE ESCONDE AL SUBIR ──
 *
 * Es lo que pidió el cliente, y es el inverso del patrón habitual de las
 * cabeceras (que se esconden al bajar para dejar sitio a la lectura). Aquí
 * tiene sentido: la barra no es navegación, es urgencia. Acompaña mientras
 * la persona avanza por la oferta y se aparta cuando vuelve atrás a releer.
 *
 * Arriba del todo no se muestra nunca: el hero ya lleva su CTA y la barra
 * taparía el sello y la promesa.
 *
 * ── NO OCUPA SITIO EN EL FLUJO ──
 *
 * Es fija y se desliza con transform, así que aparecer o desaparecer no
 * mueve nada de la página ni provoca saltos de maquetación.
 */
export function CountdownHeader({ target }: { target: string }) {
  const time = useCountdown(target);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y < SHOW_AFTER) {
        setVisible(false);
      } else if (y > lastY + JITTER) {
        setVisible(true);
      } else if (y < lastY - JITTER) {
        setVisible(false);
      } else {
        return; // inside the jitter band: keep state, keep the old anchor
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-accent/15 bg-ink/85 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <Container className="flex items-center justify-center gap-2.5 py-2.5 sm:gap-4">
        {time?.done ? (
          <p className="text-[0.8rem] font-semibold text-foreground sm:text-sm">
            El bootcamp ha comenzado
          </p>
        ) : (
          <>
            <p className="text-[0.72rem] font-semibold text-foreground sm:text-sm">
              La experiencia comienza en
            </p>
            <div role="timer" aria-live="off" className="flex items-center gap-1 sm:gap-1.5">
              {UNITS.map(({ key, suffix }) => (
                <span
                  key={key}
                  className="inline-flex items-baseline rounded-md bg-cream px-1.5 py-0.5 text-forest-900 shadow-[inset_0_-2px_4px_-2px_rgba(0,47,1,0.35)] sm:px-2"
                >
                  {/* "--" until the first tick, so the bar keeps its width
                      instead of growing when the numbers arrive. */}
                  <span className="text-[0.72rem] font-bold tabular-nums sm:text-sm">
                    {time ? String(time[key]).padStart(2, "0") : "--"}
                  </span>
                  <span className="ml-px text-[0.6rem] font-semibold text-forest-700 sm:text-[0.7rem]">
                    {suffix}
                  </span>
                </span>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
