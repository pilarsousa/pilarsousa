"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Quote } from "lucide-react";
import type { Testimonial } from "@/components/mision-origen/ui/testimonials";

/*
  Carrusel de reseñas del Bootcamp.

  ── LA MISMA MECÁNICA QUE EL DE LA LISTA DE ESPERA, OTRA PIEL ──

  El comportamiento es el de lista-de-espera/ui/TestimonialCarousel: una pista
  que avanza sola, se detiene al tocarla o al enfocarla, se pausa fuera de
  pantalla y abre la reseña completa en un diálogo. Las reseñas son las mismas
  (FEATURED_TESTIMONIALS).

  No se importa aquel componente porque su aspecto está atado a esa landing
  —verde lima, negro vo-black— y aquí se vería como una pieza de otra página.
  Las tarjetas siguen la regla de esta: CONTRASTAN con su sección, así que
  sobre el verde van en la cara clara (.bc2-carta-clara).

  Las estrellas van en el verde de Trustpilot, como en la TrustScoreCard: son
  reseñas de allí y ese color es lo que las hace reconocibles.
*/

const SPEED = 45; // px per second
const TRUST_GREEN = "#00b67a";

export function ReviewCarousel({ items }: { items: Testimonial[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState<Testimonial | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let onScreen = true;
    let carry = 0;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      // The list is rendered twice; jumping back by half keeps it seamless.
      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;

      if (still || pausedRef.current || !onScreen) {
        carry = 0;
        return;
      }

      // scrollLeft only takes whole pixels: accumulate the fraction.
      carry += SPEED * dt;
      const whole = Math.floor(carry);
      if (whole > 0) {
        el.scrollLeft += whole;
        carry -= whole;
      }
    };
    raf = requestAnimationFrame(step);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        last = performance.now();
      },
      { threshold: 0 },
    );
    io.observe(el);

    const release = () => {
      pausedRef.current = false;
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <div className="relative w-full">
      <div
        ref={scrollerRef}
        onPointerDown={() => (pausedRef.current = true)}
        onFocusCapture={() => (pausedRef.current = true)}
        onBlurCapture={() => (pausedRef.current = false)}
        className="overflow-x-auto overscroll-x-contain py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:py-8 sm:mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <ul className="flex w-max">
          {[...items, ...items].map((t, i) => {
            const isClone = i >= items.length;
            return (
              <li
                key={`${t.name}-${i}`}
                aria-hidden={isClone || undefined}
                className="bc2-carta-clara mr-4 flex h-76 w-[72vw] max-w-85 shrink-0 flex-col rounded-2xl p-5 text-left sm:mr-6 sm:h-80 sm:w-80"
              >
                <div className="flex items-center gap-3">
                  <Avatar t={t} size={42} />
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-forest-900">
                      {t.name}
                    </p>
                    {t.date && (
                      <p className="text-xs text-forest-900/55">{t.date}</p>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <Stars value={t.stars} size={18} />
                </div>

                {/* The fade at the bottom is the panel colour, so the text
                    dissolves into the card instead of being cut. */}
                <div className="relative mt-3 min-h-0 flex-1 overflow-hidden">
                  <p className="text-base leading-relaxed text-forest-900/85">
                    {t.text}
                  </p>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-(--bc2-panel) to-transparent" />
                </div>

                <button
                  type="button"
                  onClick={() => setActive(t)}
                  tabIndex={isClone ? -1 : undefined}
                  className="group/more mt-3 inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-forest-900/20 bg-forest-900/5 py-1.5 pr-3.5 pl-1.5 text-xs font-semibold uppercase tracking-wide text-forest-900 transition-colors duration-300 hover:border-forest-900/40 hover:bg-forest-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-900"
                >
                  <span
                    aria-hidden
                    className="flex size-5 items-center justify-center rounded-full bg-forest-900 text-cream transition-transform duration-300 group-hover/more:rotate-90"
                  >
                    <Plus size={12} strokeWidth={3} />
                  </span>
                  Ver más
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The full review. Glass panel over the page, tinted with the brand
          green instead of the waitlist's lime; closes on Escape, on the
          backdrop and on the ✕. No motion with prefers-reduced-motion. */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Reseña de ${active.name}`}
            className="fixed inset-0 z-200 flex items-center justify-center p-4"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setActive(null)}
              className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-md"
            />

            <motion.div
              className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/6 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.2, ease: "easeIn" } }
              }
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_12%_0%,rgba(8,74,44,0.55),transparent_60%)]"
              />

              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Cerrar"
                className="absolute top-4 right-4 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-sm transition-[background-color,transform] duration-300 hover:rotate-90 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  aria-hidden
                  className="size-4"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="relative overflow-y-auto p-8 sm:p-9">
                <div className="flex items-center gap-3.5">
                  <Avatar t={active} size={52} />
                  <div className="min-w-0">
                    <p className="font-semibold text-white">{active.name}</p>
                    {active.date && (
                      <p className="text-xs text-white/60">{active.date}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Stars value={active.stars} size={20} />
                </div>

                <div className="relative mt-6">
                  <Quote
                    aria-hidden
                    className="pointer-events-none absolute -top-3 -left-1 size-10 text-white/10"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                  <p className="relative whitespace-pre-line text-base leading-relaxed text-white sm:text-lg">
                    {active.text}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stars({ value, size }: { value: number; size: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-flex items-center justify-center rounded-[3px]"
          style={{
            width: size,
            height: size,
            backgroundColor: i < value ? TRUST_GREEN : "rgba(0,47,1,0.12)",
          }}
        >
          <svg viewBox="0 0 24 24" width={size * 0.72} height={size * 0.72} fill="#ffffff" aria-hidden>
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function Avatar({ t, size }: { t: Testimonial; size: number }) {
  if (t.photo) {
    return (
      <Image
        src={t.photo}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--bc2-verde),var(--bc2-verde-2))] font-semibold text-cream"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {t.name.charAt(0).toUpperCase()}
    </span>
  );
}
