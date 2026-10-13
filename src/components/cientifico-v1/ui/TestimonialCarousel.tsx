"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { StarRating } from "@/components/cientifico-v1/ui/StarRating";
import { TESTIMONIALS, type Testimonial } from "@/components/cientifico-v1/ui/testimonials";

/** Avatar: profile photo, or the name's initial on a pastel disc. */
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
      className="flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7da89a,#a391b8)] font-display font-semibold text-[#1e1730]"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {t.name.charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * Testimonial carousel built from data (not screenshots). Uniform fixed-height
 * cards with a fade-out on overflowing text and a "Ver más" that opens a modal
 * with the full review. Native scroll-snap + glass arrow controls.
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
              "cv1-vidrio flex h-80 w-[80vw] max-w-[360px] shrink-0 snap-center flex-col rounded-[22px] p-6 text-left transition-[transform,opacity] duration-500 ease-out sm:w-[340px]",
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
            {/* Fade so the cut text dissolves instead of hard-cropping. Es una
                máscara y no un degradé encima: la card es de vidrio translúcido,
                y un degradé de color fijo se vería como una franja. */}
            <div className="relative mt-3 min-h-0 flex-1 overflow-hidden mask-[linear-gradient(to_bottom,black_70%,transparent)]">
              <p className="whitespace-pre-line font-sans text-sm leading-relaxed text-foreground/75">
                {t.text}
              </p>
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
          className="cv1-vidrio flex size-11 cursor-pointer items-center justify-center rounded-full text-accent transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Testimonio siguiente"
          className="cv1-vidrio flex size-11 cursor-pointer items-center justify-center rounded-full text-accent transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ChevronRight size={20} />
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
            className="absolute inset-0 cursor-default bg-[#22332e]/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          />
          <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-[24px] border border-white/80 bg-surface shadow-[0_30px_60px_-30px_rgba(34,51,46,0.5)] animate-[fadeIn_0.25s_ease-out]">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full border border-foreground/15 bg-white/80 text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
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
              <p className="mt-5 whitespace-pre-line font-sans text-base font-light leading-relaxed text-foreground/80">
                {active.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
