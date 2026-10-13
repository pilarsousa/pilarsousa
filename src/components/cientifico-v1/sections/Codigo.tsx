import { Container } from "@/components/shared/Container";
import { CtaButton } from "@/components/cientifico-v1/ui/CtaButton";
import { NeonText } from "@/components/cientifico-v1/ui/NeonText";
import { Reveal } from "@/components/cientifico-v1/ui/Reveal";
import { Hallazgos } from "@/components/cientifico-v1/ui/Hallazgos";

/**
 * Section 3 — Lo que vas a comprobar (ex "¿Qué vas a llevarte?").
 *
 * Cards de vidrio sobre manchas pastel, con un tubo de ensayo al costado que
 * se llena con el scroll y enciende cada card al llegar a su marca (ver
 * ui/Hallazgos.tsx). Mismo mecanismo que el camino de registro-v3.
 *
 * ⚠️ COPY TEMPORAL en toda la sección.
 */
export function Codigo() {
  return (
    <section id="codigo" className="cv1-fondo-vidrio relative bg-background py-20 sm:py-section">
      <Container>
        <div className="flex flex-col gap-12 sm:gap-16">

          <div className="flex flex-col items-center gap-5 text-center">
            <Reveal>
              <p className="font-sans section-eyebrow text-accent">
                El experimento
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="max-w-3xl font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
                Lo que vas a{" "}
                <NeonText variant="multi">comprobar</NeonText> en esta
                masterclass
              </h2>
            </Reveal>
          </div>

          <Hallazgos />

          <Reveal>
            <div className="flex justify-center">
              <CtaButton variant="pill">Quiero acceder al evento</CtaButton>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
