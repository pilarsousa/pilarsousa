import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { TestimonialCarousel } from "@/components/mision-origen/ui/TestimonialCarousel";
import { TrustScoreCard } from "@/components/mision-origen/ui/TrustScoreCard";

/*
  Sección de testimonios. Reutiliza los mismos componentes de la landing de
  registro (TrustScoreCard + TestimonialCarousel + los testimonios reales de
  mision-origen/ui/testimonials.ts), así la prueba social es idéntica y no se
  duplica el contenido.
*/
export function Testimonios() {
  return (
    <section id="testimonios" className="bg-background py-section">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Reveal>
              <p className="font-sans section-eyebrow text-hot-pink">
                Testimonios
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                Lo que dicen quienes{" "}
                <NeonText variant="pink">ya dieron el salto</NeonText>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="flex flex-col items-center">
            <TrustScoreCard />

            <div className="mt-10 max-w-xl text-center">
              <p className="font-sans section-eyebrow text-cyan">
                Validado por quienes ya lo vivieron
              </p>
              <p className="mt-4 font-sans text-xl font-light leading-snug text-foreground sm:text-2xl">
                <NeonText variant="cyan" className="font-display font-semibold">
                  4,8 / 5
                </NeonText>{" "}
                media de valoración entre nuestros alumnos.
              </p>
            </div>
          </Reveal>

          <div className="w-full min-w-0 overflow-x-clip">
            <TestimonialCarousel />
          </div>
        </div>
      </Container>
    </section>
  );
}
