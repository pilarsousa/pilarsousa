"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Section 2 — Central phrase / Reframe.
 *
 * A cinematic beat. On a near-black stage the manifesto reveals itself as you
 * scroll in: line one rises word by word, a hairline of gold draws across,
 * then the reframe ("Manifiestas quien eres.") lands in gold Cinzel — the
 * truth that stays. Driven by GSAP ScrollTrigger + SplitText.
 */
export function Manifiesto() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // If the user prefers reduced motion, leave the text fully visible
      // (it renders opaque by default) and skip the animation entirely.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lineOne = root.current!.querySelector<HTMLElement>("[data-line='1']")!;
      const lineTwo = root.current!.querySelector<HTMLElement>("[data-line='2']")!;

      // Split both lines into words for staggered reveals.
      const splitOne = new SplitText(lineOne, { type: "words", wordsClass: "mf-word" });
      const splitTwo = new SplitText(lineTwo, { type: "words", wordsClass: "mf-word" });

      // Start hidden + blurred (BlurText-style). Covers the reduced-motion
      // fallback too, which returns before this runs so text stays visible.
      gsap.set([splitOne.words, splitTwo.words], {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
      });
      const body = root.current!.querySelector<HTMLElement>("[data-body]")!;
      gsap.set(body, { opacity: 0, y: 16 });

      // Fire the reveal as soon as the section enters view (no scrub) so the
      // text appears quickly — the user shouldn't have to scroll it into place.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(splitOne.words, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
      })
        .to(
          splitTwo.words,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power4.out",
            stagger: 0.08,
          },
          "-=0.2",
        )
        .to(body, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.1");

      return () => {
        splitOne.revert();
        splitTwo.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      id="manifiesto"
      ref={root}
      className="flex items-center bg-[#0A0908] pb-[clamp(7rem,4rem+12vh,12rem)] pt-[clamp(3rem,2rem+6vh,12rem)]"
    >
      <Container narrow className="text-center">
        {/* No overflow clip here: the blur halo needs room to breathe as each
            word rises and de-blurs into place. */}
        <p
          data-line="1"
          className="font-sans text-3xl font-light leading-tight text-foreground lg:text-4xl"
        >
          No manifiestas lo que deseas.
        </p>

        {/* "Selector frame" around line 2 — a thin white hairline box with the
            four corners picked out in brand gold, like a camera viewfinder /
            target. The frame wraps the <p>; the <p data-line="2"> itself stays
            intact so GSAP's SplitText still finds and animates it. */}
        <div className="mt-6 flex justify-center">
          <div className="relative inline-flex border border-white/30 px-6 py-4 sm:px-8 sm:py-5">
            {/* Four gold corner brackets. */}
            <span aria-hidden className="pointer-events-none absolute -left-px -top-px size-3.5 border-l-2 border-t-2 border-accent sm:size-4" />
            <span aria-hidden className="pointer-events-none absolute -right-px -top-px size-3.5 border-r-2 border-t-2 border-accent sm:size-4" />
            <span aria-hidden className="pointer-events-none absolute -bottom-px -left-px size-3.5 border-b-2 border-l-2 border-accent sm:size-4" />
            <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px size-3.5 border-b-2 border-r-2 border-accent sm:size-4" />

            <p
              data-line="2"
              className="moving-gold-title font-display text-4xl font-semibold leading-tight text-accent sm:text-5xl lg:text-5xl"
            >
              Manifiestas quien eres.
            </p>
          </div>
        </div>

        {/* Bridging body copy — appears last with the same timeline. */}
        <p
          data-body
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg"
        >
          Tu realidad no responde solo a lo que quieres. Responde a la identidad
          desde la que eliges, decides y sostienes tu vida.
        </p>
      </Container>
    </section>
  );
}
