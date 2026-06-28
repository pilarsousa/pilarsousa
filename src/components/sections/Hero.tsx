import Image from "next/image";
import { CalendarDays, Radio, Compass, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { FactBadge } from "@/components/ui/FactBadge";
import { GoldText } from "@/components/ui/GoldText";
import bgDesktop from "@/../public/bg-pilarsousa.jpg";
import bgMobile from "@/../public/bg-pilarsousa-mobile.jpg";
import logo from "@/../public/LOGO.png";

// Key offer facts — real text (SEO + a11y), each with a sober icon.
const FACTS = [
  { label: "10 · 11 · 12 de julio", icon: <CalendarDays size={16} /> },
  { label: "3 días en vivo", icon: <Radio size={16} /> },
  { label: "Metafísica práctica", icon: <Compass size={16} /> },
  { label: "44 €", icon: <Tag size={16} /> },
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
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden lg:items-center"
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
      </div>

      {/* Mobile pushes content down ~200px so Pilar's photo breathes at the
          top; desktop uses the normal vertical rhythm. */}
      <Container className="pb-16 pt-[200px] lg:py-section">
        <div className="max-w-2xl [text-shadow:0_2px_18px_rgba(8,8,8,0.5)]">
          {/* Program logotype. */}
          <Reveal>
            <Image
              src={logo}
              alt="Volver al Origen — Bootcamp"
              priority
              sizes="(min-width: 1024px) 240px, 180px"
              className="h-auto w-[180px] lg:w-[240px]"
            />
          </Reveal>

          {/* Hook as the headline promise (>=32px). Light-gold animated
              shimmer on the key phrase; body font for the lead-in. */}
          <Reveal delay={0.1}>
            <h1
              id="hero-title"
              className="mt-5 text-3xl leading-[1.2] text-foreground sm:text-4xl lg:text-5xl"
            >
              <span className="font-sans font-light text-foreground">
                Sabes lo que quieres y tienes el potencial.
              </span>{" "}
              <GoldText className="font-display font-semibold">
                Entonces, ¿por qué sigues repitiendo los mismos patrones?
              </GoldText>
            </h1>
          </Reveal>

          {/* Description — larger body copy (~18px), brighter. */}
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/95">
              Un entrenamiento práctico de tres días para ir al origen de la
              identidad que está creando tu realidad actual, eliminar el bloqueo
              invisible que te mantiene estancada y salir con un plan de acción
              concreto para manifestar resultados tangibles.
            </p>
          </Reveal>

          {/* Offer facts as authoritative badges with icons. */}
          <Reveal delay={0.3}>
            <ul className="mt-8 flex flex-wrap gap-3">
              {FACTS.map((fact) => (
                <li key={fact.label}>
                  <FactBadge icon={fact.icon}>{fact.label}</FactBadge>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            <CtaButton href="#inscripcion" className="mt-8">
              Resetear mi identidad
            </CtaButton>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
