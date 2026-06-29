import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import bgDesktop from "@/../public/banner-pilar.jpg";
import bgMobile from "@/../public/banner-pilar-mobile2.jpg";

/**
 * Section 5 — Soy Pilar Sousa (authority).
 *
 * Same pattern as the Hero: a full-bleed banner carries the presence (Pilar on
 * the right, looking joyful — plenitude). Copy lives on the left over the dark
 * negative space on desktop; on mobile it stacks below where the banner fades
 * to ink. Unlike the Hero, the body copy is long-form (her real story), so the
 * text gets more weight and a slightly stronger gradient for readability.
 *
 * Copy is Pilar's own first-person story — authentic voice. Keep it verbatim;
 * only the client should edit how she presents herself.
 */
export function Pilar() {
  return (
    <section
      id="pilar"
      aria-labelledby="pilar-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden lg:min-h-[750px] lg:items-center"
    >
      {/* Banner as its own layer. Pilar stays uncovered on the right. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <picture>
          <source media="(min-width: 1024px)" srcSet={bgDesktop.src} />
          <Image
            src={bgMobile}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top lg:object-center"
            placeholder="blur"
          />
        </picture>

        {/* Readability gradient — bottom on mobile, left on desktop. Stronger
            than the Hero because the copy here is long and must be read. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_60%,transparent)_35%,transparent_70%)] lg:bg-[linear-gradient(to_right,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_70%,transparent)_38%,transparent_62%)]" />

        {/* Thin gold hairline separating from the previous section. */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,var(--color-accent),transparent)] opacity-50" />
      </div>

      <Container className="pb-16 pt-[55vh] sm:pt-[60vh] lg:py-[clamp(3rem,1rem+6vh,7rem)]">
        {/* text-shadow on the whole column: the copy partly sits over the photo
            transition on mobile, so a soft ink shadow keeps it readable. */}
        <div className="max-w-xl [text-shadow:0_2px_16px_rgba(8,8,8,0.7)]">
          {/* Name + opening line fused as one presentation block. */}
          <Reveal>
            <h2
              id="pilar-title"
              className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Soy <span className="text-accent">Pilar Sousa</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-2 space-y-4 text-base leading-relaxed text-foreground/85">
              <p>
                Hubo un tiempo en el que me sentía perdida, sin un rumbo ni un
                objetivo claro en la vida.
              </p>
              <p>
                No encontraba sentido a lo que hacía y sentía que algo importante
                me faltaba. Fue al adentrarme en el mundo de la espiritualidad
                cuando todo empezó a cambiar. Comprendí que la transformación que
                buscaba fuera tenía que empezar dentro de mí.
              </p>
              <p>
                Ese camino me trajo una plenitud que no conocía: en lo personal y
                también en lo económico. Aprendí a confiar, a cuidar mi energía y
                a alinear mi vida con lo que de verdad quería.
              </p>
              <p>
                Hoy vivo viajando por el mundo, dedicándome a lo que amo y
                acompañando a otras personas en su propio proceso. Ese es, para
                mí, el mayor regalo de todo este camino: poder devolver lo que
                aprendí.
              </p>
              <p>
                De esa experiencia nace{" "}
                <em className="font-accent text-[1.15em] italic text-accent-soft">
                  Volver al Origen
                </em>
                , la formación en la que comparto, paso a paso, las herramientas
                que me ayudaron a reencontrarme.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
