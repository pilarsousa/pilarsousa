import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/ui/NeonText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 2 — La señal / Reframe.
 * Goal: install the core idea. Brief, visual, powerful.
 * One phrase that reframes the audience's current story.
 * Placeholder — to be developed together.
 */
export function Transmision() {
  return (
    <section id="transmision" className="bg-surface py-section">
      <Container narrow>
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-cyan">
            La señal
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
            No estás atrasada.{" "}
            <NeonText variant="multi">
              Estás en proceso de decodificación.
            </NeonText>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 font-sans text-base font-light leading-relaxed text-foreground/55 sm:text-lg">
            [Párrafo de apoyo — texto provisional. Desarrolla la idea central de esta
            sección y conecta emocionalmente con la audiencia. Será reemplazado con
            el copy definitivo.]
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
