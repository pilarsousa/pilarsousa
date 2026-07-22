import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/mision-origen/ui/CtaButton";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { PlazasBar } from "@/components/mision-origen/ui/PlazasBar";
import { TestimonialCarousel } from "@/components/mision-origen/ui/TestimonialCarousel";
import { TrustScoreCard } from "@/components/mision-origen/ui/TrustScoreCard";
import { Radar } from "@/components/mision-origen/ui/Radar";

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
        <div className="flex flex-col gap-24 sm:gap-28">

          {/* ── Qué es Volver al Origen + Plazas vendidas ── */}
          <Reveal className="w-full">
            <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-0">
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

              {/* Right — Plazas vendidas + progress bar, en card propia.
                  El borde degradado + fondo oscuro la separan del bloque de
                  texto de la izquierda y le dan peso de dato destacado. pb
                  extra: el contador de la barra cuelga por debajo del track. */}
              <div className="lg:w-1/2 lg:pl-12">
                <div className="rounded-sm border border-cyan/20 p-px bg-[linear-gradient(135deg,rgba(73,92,196,0.15),rgba(40,191,241,0.06))]">
                  <div className="flex flex-col gap-5 rounded-sm bg-background/85 px-6 pb-14 pt-8 sm:px-8">
                    <h3 className="text-center font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                      <NeonText variant="cyan">Plazas vendidas</NeonText>
                    </h3>

                    {/* Progress bar — animates from 0 to SOLD when it scrolls into
                        view (see PlazasBar). sold/total drive fill, ✦ head, value. */}
                    <PlazasBar sold={SOLD} total={TOTAL} />
                  </div>
                </div>
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
                  Lo que dicen quienes{" "}
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
            <div className="w-full min-w-0 overflow-x-clip">
              <TestimonialCarousel />
            </div>
          </div>

          {/* ── Closing CTA block ──
              Radar WebGL de fondo. El orden de capas importa: radar (z-0) →
              velo radial que oscurece el centro (z-10) → contenido (z-20). El
              velo es lo que mantiene legibles el titular y el botón sin bajarle
              el brillo al radar, que se sigue viendo entero por los bordes. */}
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-sm border border-cyan/20 p-px bg-[linear-gradient(135deg,rgba(73,92,196,0.15),rgba(40,191,241,0.06))]">
              <div className="relative overflow-hidden rounded-sm bg-background">
                {/* Radar. brightness bajo y falloff alto para que quede de
                    fondo: sin eso los anillos compiten con el texto. La
                    interacción con el mouse va apagada porque el canvas está
                    debajo del contenido y no recibe eventos. */}
                <Radar
                  className="absolute inset-0 z-0 h-full w-full"
                  color="#28bff1"
                  backgroundColor="#000000"
                  scale={0.62}
                  ringCount={9}
                  spokeCount={12}
                  ringThickness={0.035}
                  spokeThickness={0.008}
                  speed={0.5}
                  sweepSpeed={0.7}
                  sweepWidth={3.0}
                  falloff={2.4}
                  brightness={0.85}
                  enableMouseInteraction={false}
                />

                {/* Velo de legibilidad: oscuro y opaco en el centro (donde va
                    el copy), transparente hacia los bordes (donde el radar
                    tiene que respirar). */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.75)_45%,rgba(0,0,0,0.35)_75%,transparent_100%)]"
                />

                <div className="relative z-20 flex flex-col items-center gap-6 px-8 py-16 text-center sm:px-16 sm:py-20">
                  <p className="font-sans section-eyebrow text-cyan">
                    El acceso
                  </p>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                    Las puertas se abren.
                    {/* En mobile parte tras el punto; en desktop fluye con espacio */}
                    <br className="sm:hidden" />{" "}
                    {/* Neutro a propósito: evita "listo/a" y las variantes con
                        barra o arroba, que los lectores de pantalla leen mal. */}
                    <NeonText variant="cyan">¿Te animas?</NeonText>
                  </h3>
                  <div className="flex w-full items-center justify-center">
                    <CtaButton variant="pill">Reservar mi plaza ahora</CtaButton>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
