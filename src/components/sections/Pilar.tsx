import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/ui/NeonText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 5 — La guía / Soy Pilar Sousa.
 * Goal: present authority, trust, and personal connection.
 * Two-column layout: image placeholder left, bio copy right.
 * Placeholder — to be developed together. Real bio and photo pending.
 */
export function Pilar() {
  return (
    <section id="pilar" className="bg-background py-section">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* Image placeholder */}
          <Reveal className="lg:w-5/12">
            <div className="relative w-full max-w-sm rounded-sm border border-electric-blue/20 bg-surface/60">
              {/* Aspect ratio box for the future photo */}
              <div className="aspect-[3/4] w-full" />
              {/* Neon corner accents */}
              <span aria-hidden className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-cyan to-transparent" />
              <span aria-hidden className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
              <span aria-hidden className="absolute bottom-0 right-0 h-8 w-px bg-gradient-to-t from-neon-pink to-transparent" />
              <span aria-hidden className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-neon-pink to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-foreground/25">
                  Foto de Pilar
                </span>
              </div>
            </div>
          </Reveal>

          {/* Bio copy */}
          <div className="flex flex-col gap-6 lg:w-7/12">
            <Reveal>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-electric-blue">
                La guía
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                Soy{" "}
                <NeonText variant="violet">Pilar Sousa</NeonText>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-sans text-base font-light leading-relaxed text-foreground/60">
                [Párrafo 1 — Introducción de Pilar. Texto provisional que será
                reemplazado con la bio definitiva. Quién es, su historia y la
                misión que la mueve.]
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-sans text-base font-light leading-relaxed text-foreground/60">
                [Párrafo 2 — Credenciales y metodología. Años de experiencia,
                formaciones, número de personas acompañadas, resultados obtenidos.
                Texto provisional — será reemplazado con datos reales.]
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="font-sans text-base font-light leading-relaxed text-foreground/60">
                [Párrafo 3 — Conexión personal con la audiencia. Por qué creó
                Misión Origen y cuál es su promesa para quienes se unan.
                Texto provisional — será reemplazado con copy definitivo.]
              </p>
            </Reveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
