import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { TestimonialCarousel } from "@/components/mision-origen/ui/TestimonialCarousel";
import { TrustScoreCard } from "@/components/mision-origen/ui/TrustScoreCard";
import { Badge } from "@/components/ventas/ui/Badge";
import { Quote } from "lucide-react";

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
          <div className="flex flex-col items-center gap-5 text-center">
            <Reveal>
              <Badge icon={Quote}>Testimonios</Badge>
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
              {/* Título de este bloque de validación */}
              <h3 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                Validado por quienes{" "}
                <NeonText variant="cyan">ya lo vivieron</NeonText>
              </h3>
              {/* Nota de apoyo — 4,8/5 conserva su tamaño; el resto en párrafo 18px */}
              <p className="mt-4 font-sans text-base font-light leading-relaxed text-foreground/80 sm:text-lg">
                <NeonText
                  variant="cyan"
                  className="font-display text-xl font-semibold sm:text-2xl"
                >
                  4,8 / 5
                </NeonText>{" "}
                media de valoración entre nuestros alumnos.
              </p>
            </div>
          </Reveal>

          {/* -mt para acercar el carrusel al bloque de valoración (el carrusel
              trae su propio pt interno, que este margen compensa). */}
          <div className="-mt-4 w-full min-w-0 overflow-x-clip">
            <TestimonialCarousel />
          </div>
        </div>
      </Container>
    </section>
  );
}
