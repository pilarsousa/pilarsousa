"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/shared/Container";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Section 2 — Central phrase / Reframe.
 *
 * A cinematic beat. On a near-black stage the manifesto reveals itself as a
 * compact headline, with the outcome framed like a viewfinder. Driven by GSAP
 * ScrollTrigger + SplitText.
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

      // Split both headline parts into words for a staggered reveal.
      const splitOne = new SplitText(lineOne, { type: "words", wordsClass: "mf-word" });
      const splitTwo = new SplitText(lineTwo, { type: "words", wordsClass: "mf-word" });

      // Start hidden + blurred (BlurText-style). Covers the reduced-motion
      // fallback too, which returns before this runs so text stays visible.
      gsap.set([splitOne.words, splitTwo.words], {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
      });

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
            duration: 0.55,
            ease: "power4.out",
            stagger: 0.05,
          },
          "-=0.12",
        );

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
      className="relative flex items-center overflow-visible bg-[var(--color-ink)] pb-[clamp(7rem,4rem+12vh,12rem)] pt-[clamp(3rem,2rem+6vh,12rem)]"
    >
      <Container className="text-center">
        {/* No overflow clip here: the blur halo needs room to breathe as each
            word rises and de-blurs into place. */}
        <h2
          className="mx-auto max-w-6xl font-sans text-[1.15rem] font-normal leading-tight text-foreground sm:text-[clamp(1.55rem,1rem+2.3vw,2.65rem)]"
        >
          {/* ── UNA SOLA LÍNEA DESDE TABLET ──

              La frase mide 25,8em de ancho natural. Con el tamaño del h2
              (2.65rem) medía 1093px en una caja de 1088: "podcasts…" caía
              sola a la segunda línea en todos los anchos de escritorio.

              Desde sm va en nowrap y con un tamaño atado al viewport (3.3vw)
              que siempre deja la frase por debajo del ancho de la caja, con
              tope en 2.55rem. En móvil entrar en una línea exigiría ~12px, que
              ya no es un titular: ahí se queda en dos, equilibradas. */}
          <span
            data-line="1"
            className="block text-balance sm:whitespace-nowrap sm:text-[clamp(1.1rem,3.3vw,2.55rem)]"
          >
            Has leído libros, visto vídeos y escuchado podcasts…
          </span>

          <span className="mt-4 flex justify-center sm:mt-5">
            <span className="relative inline-flex max-w-[21rem] border border-white/30 px-4 py-3 sm:max-w-full sm:px-5 sm:py-3">
              <span aria-hidden className="pointer-events-none absolute -left-px -top-px size-3 border-l-2 border-t-2 border-accent sm:size-4" />
              <span aria-hidden className="pointer-events-none absolute -right-px -top-px size-3 border-r-2 border-t-2 border-accent sm:size-4" />
              <span aria-hidden className="pointer-events-none absolute -bottom-px -left-px size-3 border-b-2 border-l-2 border-accent sm:size-4" />
              <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px size-3 border-b-2 border-r-2 border-accent sm:size-4" />

              <span
                data-line="2"
                className="moving-gold-title whitespace-normal font-display text-[clamp(1.35rem,6vw,1.7rem)] font-semibold leading-tight tracking-[-0.03em] text-accent sm:whitespace-nowrap sm:text-[clamp(1rem,2.6vw,2.25rem)] sm:tracking-normal"
              >
                pero no consigues manifestar resultados.
              </span>
            </span>
          </span>
        </h2>
      </Container>

      {/*
        La flecha de paso a la sección siguiente.

        ── VA A CABALLO ENTRE DOS FONDOS ──

        Está centrada sobre el corte: la mitad de arriba cae en el verde casi
        negro de esta sección y la de abajo en el crema del Patrón. El PNG de
        antes era un disco crema, que sobre el crema de abajo desaparecía.

        Ahora es disco VERDE con aro crema: el aro la despega del fondo oscuro
        y el disco verde la despega del crema. Se lee entera en los dos lados.

        La flecha es un trazo de 1.5 —la de la imagen era casi el doble— y el
        conjunto baja de 64 a 48px: es una señal de paso, no un botón.
      */}
      <a
        href="#patron"
        aria-label="Continuar hacia la siguiente sección"
        className="group absolute bottom-0 left-1/2 z-20 block size-11 -translate-x-1/2 translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-(--color-ink) sm:size-12"
      >
        <span className="flex size-full animate-scroll-cue items-center justify-center rounded-full border-[1.5px] border-cream bg-(--bc2-verde) text-cream shadow-[0_8px_20px_-6px_rgba(0,47,1,0.55)] transition-transform duration-300 group-hover:scale-105">
          <ArrowDown size={18} strokeWidth={1.5} aria-hidden />
        </span>
      </a>
    </section>
  );
}
