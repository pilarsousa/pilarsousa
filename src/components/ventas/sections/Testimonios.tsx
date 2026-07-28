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
    <section id="testimonios" className="bg-background pb-section pt-10 sm:pt-14">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center text-center">
            <Reveal delay={0.1}>
              <p className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                Lo que dicen quienes{" "}
                <NeonText variant="pink">ya dieron el salto</NeonText>
              </p>
            </Reveal>
          </div>

          <div className="flex w-full min-w-0 flex-col gap-8 overflow-x-clip">
            <Reveal delay={0.16} className="flex justify-center">
              <TrustScoreCard className="max-w-xl border-cyan/25 shadow-[0_24px_70px_-32px_rgba(40,191,241,0.75),0_0_0_1px_rgba(174,240,254,0.06),inset_0_1px_0_rgba(255,255,255,0.08)]" />
            </Reveal>

            <Reveal delay={0.22} className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center">
              <div
                aria-hidden
                className="h-px w-full bg-[linear-gradient(to_right,transparent,rgba(40,191,241,0.55),rgba(249,2,129,0.45),transparent)]"
              />
              <h2 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                Validado por quienes{" "}
                <NeonText variant="cyan">ya lo vivieron</NeonText>
              </h2>
            </Reveal>

            <TestimonialCarousel />
          </div>
        </div>
      </Container>
    </section>
  );
}
