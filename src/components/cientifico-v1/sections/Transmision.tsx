import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/cientifico-v1/ui/NeonText";
import { Reveal } from "@/components/cientifico-v1/ui/Reveal";

/**
 * Section 2 — La señal / Reframe.
 * Una sola frase que reencuadra la historia de la persona.
 *
 * ⚠️ COPY TEMPORAL.
 */
export function Transmision() {
  return (
    <section id="transmision" className="cv1-fondo-alba relative bg-surface py-section pb-24 sm:pb-40">
      <Container narrow>
        <Reveal>
          <p className="font-sans section-eyebrow text-accent lg:text-center">
            La hipótesis
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl lg:text-center lg:text-4xl">
            Sabes mucho sobre manifestación, pero{" "}
            <NeonText variant="multi">
              todavía no lo has puesto a prueba en tu vida.
            </NeonText>
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}
