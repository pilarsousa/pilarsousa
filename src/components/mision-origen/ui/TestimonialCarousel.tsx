"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TestimonialCarouselProps = {
  items: StaticImageData[];
};

/**
 * Horizontal testimonial carousel of real Trustpilot review screenshots.
 *
 * Native horizontal scroll + scroll-snap (accessible: works with touch,
 * trackpad and keyboard out of the box) with neon arrow controls that nudge
 * the scroll. Each card keeps the screenshot's real aspect ratio, so reviews
 * are never cropped — heights vary, cards align to the top.
 */
export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Scroll by ~one card width (first child) including the gap.
    const card = track.querySelector("li");
    const amount = card ? card.clientWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Edge fade: cards dissolve to transparent at both sides via a horizontal
          mask, so off-center reviews blend into the background instead of being
          hard-cut. The mask is on the scroll element (fixed edges) while cards
          pass beneath it. Removed on small screens where it's full-width swipe. */}
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto scroll-smooth scrollbar-none pb-4 sm:mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {items.map((src, i) => (
          <li
            key={i}
            className="w-[85vw] max-w-[420px] shrink-0 snap-center overflow-hidden rounded-2xl border border-cyan/15 bg-surface shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] sm:w-[380px]"
          >
            <Image
              src={src}
              alt={`Reseña de Trustpilot ${i + 1}`}
              sizes="(min-width: 640px) 380px, 85vw"
              className="h-auto w-full"
              placeholder="blur"
            />
          </li>
        ))}
      </ul>

      {/* Arrow controls — shown on all sizes (swipe also works on touch). */}
      <div className="flex justify-center gap-3">
        {/* A thin rotating neon beam travels the border, on a dark round face. */}
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
    </div>
  );
}
