"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { StarTiles } from "@/components/lista-de-espera/ui/StarTiles";
import type { Testimonial } from "@/components/mision-origen/ui/testimonials";

const SPEED = 45;

type TestimonialCarouselProps = {
  items: Testimonial[];
};

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState<Testimonial | null>(null);

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

      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;

      if (still || pausedRef.current || !onScreen) {
        carry = 0;
        return;
      }

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
        data-lenis-prevent
        onPointerDown={() => (pausedRef.current = true)}
        onFocusCapture={() => (pausedRef.current = true)}
        onBlurCapture={() => (pausedRef.current = false)}
        className="overflow-x-auto overscroll-x-contain scrollbar-none py-6 mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:py-8 sm:mask-[linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
      >
        <ul className="flex w-max">
          {[...items, ...items].map((t, i) => {
            const isClone = i >= items.length;
            return (
              <li
                key={`${t.name}-${i}`}
                aria-hidden={isClone || undefined}
                className="mr-4 flex h-[18.5rem] w-[62vw] max-w-[340px] shrink-0 flex-col sm:mr-8 sm:h-[21rem] sm:w-[74vw] rounded-xl border border-accent/25 bg-[radial-gradient(90%_70%_at_20%_0%,rgba(180,226,54,0.12),transparent_60%),linear-gradient(180deg,#1a2b07,#0b1502)] p-5 text-left shadow-[0_18px_46px_-26px_rgba(180,226,54,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] sm:mr-10 sm:w-[305px]"
              >
                <div className="flex items-center gap-3">
                  <Avatar t={t} size={42} />
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    {t.date && (
                      <p className="font-sans text-xs text-foreground/50">
                        {t.date}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <StarTiles value={t.stars} size={16} />
                </div>

                <div className="relative mt-3 min-h-0 flex-1 overflow-hidden">
                  <p className="font-sans text-sm leading-relaxed text-foreground/85">
                    {t.text}
                  </p>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-vo-black to-transparent" />
                </div>

                <button
                  type="button"
                  onClick={() => setActive(t)}
                  tabIndex={isClone ? -1 : undefined}
                  className="mt-3 cursor-pointer self-start font-sans text-sm font-medium text-accent transition-colors duration-300 hover:text-vo-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {/* El + delante anuncia que hay más texto detrás, no que se
                      navegue a otra parte: es el mismo signo del acordeón de
                      preguntas frecuentes, y las dos cosas hacen lo mismo. */}
                  <Plus size={15} strokeWidth={2.5} aria-hidden />
                  Ver más
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Reseña de ${active.name}`}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setActive(null)}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
          />
          <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-accent/25 bg-surface shadow-[0_0_50px_-10px_rgba(180,226,54,0.35)]">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full border border-accent/40 bg-black/60 text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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

            <div data-lenis-prevent className="overflow-y-auto p-8">
              <div className="flex items-center gap-3">
                <Avatar t={active} size={52} />
                <div className="min-w-0">
                  <p className="font-sans font-medium text-foreground">
                    {active.name}
                  </p>
                  {active.date && (
                    <p className="font-sans text-xs text-foreground/45">
                      {active.date}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <StarTiles value={active.stars} size={20} />
              </div>
              <p className="mt-5 whitespace-pre-line font-sans text-base leading-relaxed text-foreground/85 sm:text-lg">
                {active.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Avatar({ t, size = 44 }: { t: Testimonial; size?: number }) {
  if (t.photo) {
    return (
      <Image
        src={t.photo}
        alt={t.name}
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
      className="flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5c8a1f,#b4e236)] font-display font-semibold text-vo-black"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {t.name.charAt(0).toUpperCase()}
    </span>
  );
}
