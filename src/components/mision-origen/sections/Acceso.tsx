import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/mision-origen/ui/CtaButton";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { PlazasBar } from "@/components/mision-origen/ui/PlazasBar";
import { TestimonialCarousel } from "@/components/mision-origen/ui/TestimonialCarousel";
import { TrustScoreCard } from "@/components/mision-origen/ui/TrustScoreCard";

/* Plazas vendidas — edit these to update the progress bar and its labels. */
const SOLD = 150;
const TOTAL = 250;

/**
 * Section 6 — Acceso / Testimonios + CTA de cierre.
 * Goal: social proof and final emotional push.
 * The registration form lives in a modal (ReservaModal); the CTAs here open it.
 * Placeholder — to be developed together.
 */
export function Acceso() {
  return (
    <section id="acceso" className="bg-surface py-section">
      <Container>
        <div className="flex flex-col gap-20">

          {/* ── Qué es Volver al Origen + Plazas vendidas ── */}
          <Reveal className="w-full">
            <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-0">
              {/* Left — ¿Qué es Volver al Origen? */}
              <div className="flex flex-col gap-5 lg:w-1/2 lg:pr-12">
                <h2 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  ¿Qué es{" "}
                  <NeonText variant="pink">Volver al Origen</NeonText>?
                </h2>
                <p className="font-sans text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
                  El entrenamiento práctico de metafísica en habla hispana diseñado
                  para ayudarte a reescribir tu identidad y manifestar un estilo de
                  vida extraordinario en tan solo 40 días.
                </p>
                <p className="font-sans text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
                  Más del 60% de nuestros alumnos ya se han convertido en grandes
                  casos de éxito.
                </p>
              </div>

              {/* Divider — vertical on desktop, horizontal on mobile */}
              <div
                aria-hidden
                className="h-px w-full shrink-0 bg-white/10 lg:h-auto lg:w-px"
              />

              {/* Right — Plazas vendidas + progress bar (placeholder) */}
              <div className="flex flex-col gap-5 lg:w-1/2 lg:pl-12">
                <h3 className="text-center font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  <NeonText variant="cyan">Plazas vendidas</NeonText>
                </h3>

                {/* Progress bar — animates from 0 to SOLD when it scrolls into
                    view (see PlazasBar). sold/total drive fill, ✦ head, value. */}
                <PlazasBar sold={SOLD} total={TOTAL} />
              </div>
            </div>
          </Reveal>

          {/* ── Testimonials ── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <Reveal>
                <p className="font-sans section-eyebrow text-hot-pink">
                  Testimonios
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                  Lo que dicen las que{" "}
                  <NeonText variant="pink">ya dieron el salto</NeonText>
                </h2>
              </Reveal>
            </div>

            {/* TrustScore como prueba principal, centrado; la validación y la
                nota de primera edición van debajo como copy de apoyo. */}
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

            {/* Reseñas en carrusel horizontal. min-w-0 + overflow-x-clip evitan
                que el track (más ancho que la pantalla) genere scroll de página. */}
            <div className="mt-8 w-full min-w-0 overflow-x-clip">
              <TestimonialCarousel />
            </div>
          </div>

          {/* ── Closing CTA block ── */}
          <Reveal>
            <div className="rounded-sm border border-cyan/20 p-px bg-[linear-gradient(135deg,rgba(73,92,196,0.15),rgba(40,191,241,0.06))]">
              <div className="flex flex-col items-center gap-6 rounded-sm bg-background/85 px-8 py-14 text-center sm:px-16">
                <p className="font-sans section-eyebrow text-cyan">
                  El acceso
                </p>
                <h3 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  Las puertas se abren.
                  {/* En mobile parte tras el punto; en desktop fluye con espacio */}
                  <br className="sm:hidden" />{" "}
                  <NeonText variant="cyan">¿Estás lista?</NeonText>
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <CtaButton variant="pill">
                    ✦ Reservar mi plaza ahora ✦
                  </CtaButton>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
