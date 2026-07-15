import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/ui/NeonText";
import { Reveal } from "@/components/ui/Reveal";

const PATTERNS = [
  "Texto provisional — patrón 1. Descripción del primer bucle inconsciente que mantiene a la audiencia estancada en los mismos resultados.",
  "Texto provisional — patrón 2. Descripción del segundo mecanismo que se activa automáticamente y sabotea el avance.",
  "Texto provisional — patrón 3. Descripción del tercer código que opera en silencio y define la identidad actual.",
];

/**
 * Section 3 — El código / El patrón.
 * Goal: name the problem. Make the audience see the invisible pattern.
 * Two-column layout: headline left, numbered pattern cards right.
 * Placeholder — to be developed together.
 */
export function Codigo() {
  return (
    <section id="codigo" className="bg-background py-section">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* Left column — headline and intro */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <Reveal>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-neon-pink">
                El código
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
                Hay un código que te{" "}
                <NeonText variant="pink">repite.</NeonText>{" "}
                Hasta que lo veas, no puedes cambiarlo.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-sans text-base font-light leading-relaxed text-foreground/55 sm:text-lg">
                [Párrafo introductorio — texto provisional. Describe el patrón
                inconsciente que se repite y por qué la audiencia no puede verlo
                desde adentro. Será reemplazado con el copy definitivo.]
              </p>
            </Reveal>
          </div>

          {/* Right column — numbered pattern cards */}
          <div className="flex flex-col gap-4 lg:w-1/2">
            {PATTERNS.map((text, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="group flex items-start gap-4 rounded-sm border border-neon-pink/20 bg-surface/50 p-5 transition-all duration-500 hover:border-neon-pink/50 hover:shadow-[0_0_24px_rgba(240,14,184,0.12)]">
                  <span className="shrink-0 font-display text-2xl font-semibold tabular-nums text-neon-pink/50">
                    0{i + 1}
                  </span>
                  <p className="pt-1 font-sans text-sm font-light leading-relaxed text-foreground/65">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
