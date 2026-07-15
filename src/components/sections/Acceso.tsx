import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { NeonText } from "@/components/ui/NeonText";
import { Reveal } from "@/components/ui/Reveal";

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

          {/* ── Testimonials ── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Reveal>
                <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-hot-pink">
                  Las que ya activaron
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
                <h3 className="font-display text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
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
