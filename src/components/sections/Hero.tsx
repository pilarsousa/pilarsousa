import Image from "next/image";
import { CalendarDays, Radio, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { FactBadge } from "@/components/ui/FactBadge";
import { GoldText } from "@/components/ui/GoldText";
import { SideRays } from "@/components/ui/SideRays";
import { CHECKOUT_URL } from "@/lib/links";
import bgDesktop from "@/../public/bg-pilarsousa.jpg";
import bgMobile from "@/../public/bg-pilarsousa-mobile.jpg";
import logo from "@/../public/LOGO.png";

// Key offer facts — real text (SEO + a11y), each with a sober icon.
const FACTS = [
  { label: "10 · 11 · 12 de julio", icon: <CalendarDays size={16} /> },
  { label: "3 días en vivo", icon: <Radio size={16} /> },
  { label: "Metafísica práctica", icon: <Compass size={16} /> },
];

/**
 * Section 1 — Hero / Offer.
 *
 * Full-bleed background photo (Pilar on the right, looking left toward the
 * light). The photo is kept clean — no full overlay covering Pilar. A soft
 * gradient sits ONLY behind the left text column and fades all the way to
 * transparent before reaching her. Two responsive sources via <picture>.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden lg:max-h-200 lg:min-h-200 lg:items-center"
    >
      {/* Background photo as its own layer. Pilar stays uncovered. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <picture>
          <source media="(min-width: 1024px)" srcSet={bgDesktop.src} />
          <Image
            src={bgMobile}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top lg:object-center"
            placeholder="blur"
          />
        </picture>

        {/* Readability gradient — eases fully to transparent (no visible
            mid-point cut). Bottom variant on mobile, left on desktop. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_55%,transparent)_30%,transparent_65%)] lg:bg-[linear-gradient(to_right,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_50%,transparent)_28%,transparent_55%)]" />

        {/* Gold light rays sweeping in from the top-right ("the other side"),
            crossing toward the copy. Sits over the photo, under the content.
            On mobile the canvas is confined to the upper area (top ~45%) so the
            rays stay near Pilar's head and don't run down to the text; on lg+
            they fill the whole hero. The canvas itself is masked to fade at its
            lower edge so the cropped bottom isn't a hard line. */}
        <div className="absolute inset-x-0 top-0 z-1 h-[45%] opacity-20 mask-[linear-gradient(to_bottom,black_70%,transparent)] lg:bottom-0 lg:h-auto lg:opacity-100 lg:mask-none">
          <SideRays
            origin="top-right"
            rayColor1="#c8a45a"
            rayColor2="#f3e2b0"
            intensity={1.6}
            spread={2}
            speed={2.2}
            blend={0.4}
            saturation={1.2}
            opacity={0.85}
          />
        </div>

        {/* Bottom fade into the next section (#0A0908) so the cut isn't abrupt. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,#0A0908)]" />
      </div>

      {/* Mobile pushes content down ~200px so Pilar's photo breathes at the
          top; desktop uses a fluid vertical padding that stays compact on
          short laptops (e.g. 1366×768) and only grows on tall screens. */}
      <Container className="pb-16 pt-[200px] lg:py-[clamp(2.5rem,1rem+5vh,7rem)]">
        <div className="max-w-2xl">
          {/* Program logotype + format badge. */}
          <Reveal>
            <div className="mb-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
              <Image
                src={logo}
                alt="Volver al Origen — Bootcamp"
                priority
                sizes="(min-width: 1024px) 240px, 180px"
                className="h-auto w-45 lg:w-60"
              />
              <span className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-accent/60 bg-accent/20 px-3.5 py-2 font-display text-xs font-bold uppercase tracking-[0.15em] text-foreground shadow-[0_6px_24px_-4px_rgba(0,0,0,0.7)] backdrop-blur-md">
                {/* Continuous light sheen sweeping across the badge. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-cream-gold/40 to-transparent animate-sheen"
                />
                {/* Live "on air" dot: a pulsing core with an expanding ring. */}
                <span aria-hidden className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" />
                </span>
                <span className="relative">
                  Bootcamp <span className="text-white">Online</span>
                </span>
              </span>
            </div>
          </Reveal>

          {/* Hook as the headline promise (>=32px). Light-gold animated
              shimmer on the key phrase; body font for the lead-in. */}
          <Reveal delay={0.1}>
            <h1
              id="hero-title"
              className="text-foreground text-[clamp(1.6rem,1rem+2.2vw,2.75rem)] leading-[1.15]"
            >
              <span className="font-sans font-normal text-foreground">
                Sabes lo que quieres y tienes el potencial.
              </span>{" "}
              <GoldText glow className="font-display font-bold">
                Entonces, ¿por qué sigues repitiendo los mismos patrones?
              </GoldText>
            </h1>
          </Reveal>

          {/* Description — fluid 16→18px, brighter. */}
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl leading-relaxed text-foreground/95 text-[clamp(1rem,0.95rem+0.3vw,1.125rem)] sm:mt-5">
              Un entrenamiento práctico de tres días para ir al origen de la
              identidad que está creando tu realidad actual, eliminar el bloqueo
              invisible que te mantiene estancado y salir con un plan de acción
              concreto para manifestar resultados tangibles.
            </p>
          </Reveal>

          {/* Offer facts as authoritative badges with icons. */}
          <Reveal delay={0.3}>
            <ul className="mt-4 flex flex-wrap gap-3 sm:mt-8">
              {FACTS.map((fact, i) => (
                <li key={fact.label}>
                  <FactBadge icon={fact.icon} index={i}>
                    {fact.label}
                  </FactBadge>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            {/* Full-width on mobile so the CTA fills the column; on sm+ it
                shrinks to its content. Width is driven from the wrapper so it
                beats the button's own inline-flex without fighting .block. */}
            <div className="mt-4 w-full sm:mt-8 sm:w-fit [&>a]:flex [&>a]:w-full sm:[&>a]:w-fit">
              <CtaButton href={CHECKOUT_URL} external>
                Resetear mi identidad
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
