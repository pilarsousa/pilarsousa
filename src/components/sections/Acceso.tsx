import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { NeonText } from "@/components/ui/NeonText";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { TrustScoreCard } from "@/components/ui/TrustScoreCard";
import img5250 from "@/../public/Testimonios/IMG_5250.png";
import img5243 from "@/../public/Testimonios/IMG_5243.png";
import img5244 from "@/../public/Testimonios/IMG_5244.png";
import img5245 from "@/../public/Testimonios/IMG_5245.png";
import img5246 from "@/../public/Testimonios/IMG_5246.png";
import img5247 from "@/../public/Testimonios/IMG_5247.png";
import img5248 from "@/../public/Testimonios/IMG_5248.png";
import img5249 from "@/../public/Testimonios/IMG_5249.png";
import t0 from "@/../public/Testimonios/testimonio.png";
import t1 from "@/../public/Testimonios/testimonio1.png";
import t2 from "@/../public/Testimonios/testimonio2.png";
import t3 from "@/../public/Testimonios/testimonio3.png";
import t4 from "@/../public/Testimonios/testimonio4.png";
import t5 from "@/../public/Testimonios/testimonio5.png";
import t6 from "@/../public/Testimonios/testimonio6.png";
import t7 from "@/../public/Testimonios/testimonio7.png";
import t8 from "@/../public/Testimonios/testimonio8.png";
import t9 from "@/../public/Testimonios/testimonio9.png";
import t10 from "@/../public/Testimonios/testimonio10.png";

/* Plazas vendidas — edit these to update the progress bar and its labels. */
const SOLD = 150;
const TOTAL = 250;

// Capturas reales de reseñas de Trustpilot — prueba social verificable.
// IMG_5250 abre, luego el resto del lote nuevo, después las originales.
const TESTIMONIALS = [
  img5250,
  img5243,
  img5244,
  img5245,
  img5246,
  img5247,
  img5248,
  img5249,
  t0,
  t1,
  t2,
  t3,
  t4,
  t5,
  t6,
  t7,
  t8,
  t9,
  t10,
];

/**
 * Section 6 — Acceso / Testimonios + CTA de cierre.
 * Goal: social proof and final emotional push.
 * The registration form now lives in the Hero section (#inscripcion).
 * CTAs here deep-link back up to the hero form.
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

                {/* Progress bar with 0 / total markers, a ✦ head at the fill
                    end, and the current value below it. sold/total drive both
                    the width and the labels. */}
                <div className="mt-3 flex items-center gap-3">
                  {/* Left marker — start (0) */}
                  <span className="font-display text-sm text-foreground/50">0</span>

                  {/* Track */}
                  <div className="relative h-3 flex-1 rounded-full bg-white/5">
                    {/* Fill */}
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#f90281,#28bff1)]"
                      style={{ width: `${(SOLD / TOTAL) * 100}%` }}
                      role="progressbar"
                      aria-valuenow={SOLD}
                      aria-valuemin={0}
                      aria-valuemax={TOTAL}
                      aria-label="Plazas vendidas"
                    />
                    {/* ✦ head at the fill end */}
                    <span
                      aria-hidden
                      className="absolute top-1/2 z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-lg text-ice-blue filter-[drop-shadow(0_0_8px_rgba(40,191,241,0.9))]"
                      style={{ left: `${(SOLD / TOTAL) * 100}%` }}
                    >
                      ✦
                    </span>
                    {/* Current value below the fill end */}
                    <span
                      className="absolute top-full mt-3 -translate-x-1/2 font-display text-sm text-cyan"
                      style={{ left: `${(SOLD / TOTAL) * 100}%` }}
                    >
                      {SOLD}
                    </span>
                  </div>

                  {/* Right marker — total */}
                  <span className="font-display text-sm text-foreground/50">
                    {TOTAL}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Testimonials ── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <Reveal>
                <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-hot-pink">
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
                <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-cyan">
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

            {/* Capturas reales de reseñas de Trustpilot en carrusel horizontal. */}
            <div className="mt-8">
              <TestimonialCarousel items={TESTIMONIALS} />
            </div>
          </div>

          {/* ── Closing CTA block ── */}
          <Reveal>
            <div className="rounded-sm border border-cyan/20 p-px bg-[linear-gradient(135deg,rgba(73,92,196,0.15),rgba(40,191,241,0.06))]">
              <div className="flex flex-col items-center gap-6 rounded-sm bg-background/85 px-8 py-14 text-center sm:px-16">
                <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-cyan">
                  El acceso
                </p>
                <h3 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  Las puertas se abren.{" "}
                  <NeonText variant="cyan">¿Estás lista?</NeonText>
                </h3>
                <p className="max-w-lg font-sans text-base font-light leading-relaxed text-foreground/55">
                  [Texto de cierre — provisional. Llamada emocional final, urgencia
                  o escasez según la estrategia de ventas. Será reemplazado con el
                  copy definitivo.]
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <CtaButton href="#inscripcion" variant="pill">
                    ✦ Reservar mi plaza ahora ✦
                  </CtaButton>
                  <CtaButton href="#protocolo" variant="ghost">
                    Ver el protocolo
                  </CtaButton>
                </div>
                <p className="font-sans text-xs text-foreground/30">
                  [Garantía, política de devolución o nota de confianza — texto
                  provisional]
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
