import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { NeonText } from "@/components/ui/NeonText";
import { Reveal } from "@/components/ui/Reveal";

/* Plazas vendidas — edit these to update the progress bar and its labels. */
const SOLD = 150;
const TOTAL = 250;

const TESTIMONIALS = [
  {
    quote:
      "Texto provisional — testimonio 1. Describe la transformación, el resultado concreto o el cambio de perspectiva que experimentó esta persona.",
    name: "Nombre Apellido",
    role: "Profesión o contexto",
  },
  {
    quote:
      "Texto provisional — testimonio 2. Describe la transformación, el resultado concreto o el cambio de perspectiva que experimentó esta persona.",
    name: "Nombre Apellido",
    role: "Profesión o contexto",
  },
  {
    quote:
      "Texto provisional — testimonio 3. Describe la transformación, el resultado concreto o el cambio de perspectiva que experimentó esta persona.",
    name: "Nombre Apellido",
    role: "Profesión o contexto",
  },
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

            <div className="grid gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <blockquote className="flex flex-col gap-4 rounded-sm border border-hot-pink/15 bg-background/50 p-6 transition-all duration-500 hover:border-hot-pink/40 hover:shadow-[0_0_24px_rgba(249,2,129,0.1)]">
                    <Quote
                      className="h-5 w-5 text-hot-pink/45"
                      strokeWidth={1.5}
                    />
                    <p className="font-sans text-sm font-light leading-relaxed text-foreground/65">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="flex flex-col gap-0.5 border-t border-white/10 pt-4">
                      <cite className="not-italic font-sans text-sm font-medium text-foreground">
                        {t.name}
                      </cite>
                      <span className="font-sans text-xs text-foreground/35">
                        {t.role}
                      </span>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
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
