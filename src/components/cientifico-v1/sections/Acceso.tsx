import { Container } from "@/components/shared/Container";
import { CtaButton } from "@/components/cientifico-v1/ui/CtaButton";
import { NeonText } from "@/components/cientifico-v1/ui/NeonText";
import { Reveal } from "@/components/cientifico-v1/ui/Reveal";
import { PlazasBar } from "@/components/cientifico-v1/ui/PlazasBar";
import { TestimonialCarousel } from "@/components/cientifico-v1/ui/TestimonialCarousel";
import { TrustScoreCard } from "@/components/cientifico-v1/ui/TrustScoreCard";
import { Radar } from "@/components/cientifico-v1/ui/Radar";

/* Plazas vendidas — edit these to update the progress bar and its labels. */
const SOLD = 150;
const TOTAL = 250;

/**
 * Section 6 — Acceso / Testimonios + CTA de cierre.
 * El formulario vive en un modal (ReservaModal); los CTA de acá lo abren.
 *
 * El bloque de cierre va en verde (.cv1-verde), como el cierre oscuro de
 * registro-v3: corta el claro justo antes del último llamado.
 *
 * ⚠️ COPY TEMPORAL (el puntaje de Trustpilot es el real).
 */
export function Acceso() {
  return (
    <section id="acceso" className="cv1-fondo-alba bg-surface py-section">
      <Container>
        <div className="flex flex-col gap-24 sm:gap-28">

          {/* ── Qué es Volver al Origen + Plazas vendidas ── */}
          <Reveal className="w-full">
            <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-0">
              <div className="flex flex-col gap-5 lg:w-1/2 lg:pr-12">
                <h2 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  ¿Qué es{" "}
                  <NeonText variant="arena">Volver al Origen</NeonText>?
                </h2>
                <p className="font-sans text-base leading-relaxed text-foreground/70 sm:text-lg">
                  Texto temporal. Explica en dos o tres líneas qué es el
                  programa, a quién acompaña y en cuánto tiempo.
                </p>
                <p className="font-sans text-base leading-relaxed text-foreground/70 sm:text-lg">
                  Texto temporal. Un dato de resultados real que respalde lo
                  anterior.
                </p>
              </div>

              <div className="lg:w-1/2 lg:pl-12">
                <div className="cv1-vidrio flex flex-col gap-5 rounded-[24px] px-6 pb-14 pt-8 sm:px-8">
                  <h3 className="text-center font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                    <NeonText variant="salvia">Plazas vendidas</NeonText>
                  </h3>
                  <PlazasBar sold={SOLD} total={TOTAL} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Testimonials ── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <Reveal>
                <p className="font-sans section-eyebrow text-accent">
                  Testimonios
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                  Resultados de quienes{" "}
                  <NeonText variant="arena">ya hicieron el experimento</NeonText>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="flex flex-col items-center">
              <TrustScoreCard />

              <div className="mt-10 max-w-xl text-center">
                <p className="font-sans section-eyebrow text-accent">
                  Validado por quienes ya lo vivieron
                </p>
                <p className="mt-4 font-sans text-xl leading-snug text-foreground sm:text-2xl">
                  <NeonText variant="salvia" className="font-display font-semibold">
                    4,8 / 5
                  </NeonText>{" "}
                  media de valoración entre nuestros alumnos.
                </p>
              </div>
            </Reveal>

            {/* min-w-0 + overflow-x-clip evitan que el track (más ancho que la
                pantalla) genere scroll de página. */}
            <div className="w-full min-w-0 overflow-x-clip">
              <TestimonialCarousel />
            </div>
          </div>

          {/* ── Closing CTA block — verde ──
              Radar (z-0) → velo radial que despeja el centro (z-10) →
              contenido (z-20). */}
          <Reveal>
            <div className="cv1-verde relative isolate overflow-hidden rounded-[28px] bg-background shadow-[0_40px_80px_-40px_rgba(34,51,46,0.6)]">
              <Radar
                className="absolute inset-0 z-0 h-full w-full"
                color="#7da89a"
                backgroundColor="#2e4a43"
                scale={0.62}
                ringCount={9}
                spokeCount={12}
                ringThickness={0.035}
                spokeThickness={0.008}
                speed={0.5}
                sweepSpeed={0.7}
                sweepWidth={3.0}
                falloff={2.4}
                brightness={1.1}
                enableMouseInteraction={false}
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgb(var(--cv1-velo)/0.92)_0%,rgb(var(--cv1-velo)/0.7)_45%,rgb(var(--cv1-velo)/0.3)_75%,transparent_100%)]"
              />

              <div className="relative z-20 flex flex-col items-center gap-6 px-8 py-16 text-center sm:px-16 sm:py-20">
                <p className="font-sans section-eyebrow text-accent">
                  El acceso
                </p>
                <h3 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  El laboratorio abre sus puertas.
                  <br className="sm:hidden" />{" "}
                  <NeonText variant="salvia">¿Te sumas?</NeonText>
                </h3>
                <div className="flex w-full items-center justify-center">
                  <CtaButton variant="pill">Reservar mi plaza ahora</CtaButton>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
