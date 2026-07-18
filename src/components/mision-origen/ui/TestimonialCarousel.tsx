"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { StarRating } from "@/components/mision-origen/ui/StarRating";
import { TESTIMONIALS, type Testimonial } from "@/components/mision-origen/ui/testimonials";

/** Avatar: profile photo, or the name's initial on a neon-tinted disc. */
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
      className="flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#28bff1,#f90281)] font-display font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {t.name.charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * Testimonial carousel built from data (not screenshots). Uniform fixed-height
 * cards with a fade-out on overflowing text and a "Ver más" that opens a modal
 * with the full review. Native scroll-snap + neon arrow controls.
 */
export function TestimonialCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<Testimonial | null>(null);
  // Index of the card currently centered in the track (desktop enlarges it).
  const [centered, setCentered] = useState(0);

  // Detect the centered card via IntersectionObserver against a narrow band in
  // the middle of the track (rootMargin collapses the observed area to the
  // center strip). Cheaper and smoother than listening to every scroll event.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll("li"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = cards.indexOf(e.target as HTMLLIElement);
            if (idx !== -1) setCentered(idx);
          }
        }
      },
      { root: track, rootMargin: "0px -45% 0px -45%", threshold: 0 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = card ? card.clientWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  // Close modal on Escape + lock body scroll while open.
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
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto overscroll-x-contain scroll-smooth scrollbar-none pb-4 pt-6 sm:mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        {TESTIMONIALS.map((t, i) => (
          <li
            key={i}
            className={cn(
              "flex h-80 w-[80vw] max-w-[360px] shrink-0 snap-center flex-col rounded-2xl border border-cyan/15 bg-background/40 p-6 text-left shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-[transform,opacity] duration-500 ease-out sm:w-[340px]",
              // En desktop, la card centrada se agranda y las demás se atenúan.
              i === centered
                ? "lg:scale-105 lg:opacity-100"
                : "lg:scale-90 lg:opacity-60",
            )}
          >
            {/* Header — avatar + name + date */}
            <div className="flex items-center gap-3">
              <Avatar t={t} />
              <div className="min-w-0">
                <p className="truncate font-sans text-sm font-medium text-foreground">
                  {t.name}
                </p>
                {t.date && (
                  <p className="text-xs text-foreground/45">{t.date}</p>
                )}
              </div>
            </div>

            {/* Stars */}
            <div className="mt-3">
              <StarRating value={t.stars} />
            </div>

            {/* Text — fills remaining height, overflow fades out */}
            <div className="relative mt-3 min-h-0 flex-1 overflow-hidden">
              <p className="font-sans text-sm font-light leading-relaxed text-foreground/80">
                {t.text}
              </p>
              {/* Fade so the cut text dissolves instead of hard-cropping.
                  Matches the card's translucent dark fill. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-background/90 to-transparent" />
            </div>

            {/* Ver más */}
            <button
              type="button"
              onClick={() => setActive(t)}
              className="mt-3 self-start font-sans text-sm font-medium text-cyan transition-colors duration-300 hover:text-ice-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Ver más
            </button>
          </li>
        ))}
      </ul>

      {/* Arrow controls */}
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Testimonio anterior"
          className="group relative flex size-11 cursor-pointer rounded-full p-px bg-[conic-gradient(from_var(--border-angle),transparent_0%,var(--color-cyan)_15%,var(--color-neon-pink)_25%,transparent_40%,transparent_100%)] animate-border-spin focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <span className="flex size-full items-center justify-center rounded-full bg-background text-cyan transition-colors group-hover:bg-surface">
            <ChevronLeft size={20} />
          </span>
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Testimonio siguiente"
          className="group relative flex size-11 cursor-pointer rounded-full p-px bg-[conic-gradient(from_var(--border-angle),transparent_0%,var(--color-cyan)_15%,var(--color-neon-pink)_25%,transparent_40%,transparent_100%)] animate-border-spin focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <span className="flex size-full items-center justify-center rounded-full bg-background text-cyan transition-colors group-hover:bg-surface">
            <ChevronRight size={20} />
          </span>
        </button>
      </div>

      {/* Modal — full review */}
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
            className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          />
          <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-cyan/25 bg-surface shadow-[0_0_40px_-8px_rgba(40,191,241,0.3)] animate-[fadeIn_0.25s_ease-out]">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full border border-cyan/40 bg-black/60 text-white transition-colors hover:border-cyan hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden className="size-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="overflow-y-auto p-8">
              <div className="flex items-center gap-3">
                <Avatar t={active} size={52} />
                <div className="min-w-0">
                  <p className="font-sans font-medium text-foreground">{active.name}</p>
                  {active.date && (
                    <p className="text-xs text-foreground/45">{active.date}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <StarRating value={active.stars} size={20} />
              </div>
              <p className="mt-5 whitespace-pre-line font-sans text-base font-light leading-relaxed text-foreground/85">
                {active.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
