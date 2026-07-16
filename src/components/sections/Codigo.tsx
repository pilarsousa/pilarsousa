import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { NeonText } from "@/components/ui/NeonText";
import { Reveal } from "@/components/ui/Reveal";
import regaloIcon from "@/components/regalo-mision/regalo-icon.png";

const BENEFITS = [
  "Descubrirás los 3 pasos de mi Sistema Práctico de Manifestación para dar un nuevo salto cuántico cada 90 días.",
  "Desbloquea el patrón que te mantiene en estancamiento y que por más que intentas avanzar te mantiene en el mismo lugar.",
  "Aprenderás cómo reprogramar tu identidad para poder vencer los miedos y caminar con propósito, coherencia y facilidad.",
];

/**
 * Section 3 — Recompensa / What you'll get.
 * Goal: list the concrete takeaways of the masterclass.
 * Two-column layout: headline left, numbered benefit cards right,
 * plus a gift card highlighting the participation certificate.
 */
export function Codigo() {
  return (
    <section id="codigo" className="relative bg-background py-section">
      {/* Degradé de transición: funde el negro con el azul noche de la sección
          siguiente (Protocolo), suavizando el corte entre secciones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_bottom,transparent,#212646)]"
      />
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* Left column — headline and intro */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <Reveal>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-neon-pink">
                Recompensa
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
                ¿Qué vas a llevarte en esta{" "}
                <NeonText variant="pink">Masterclass?</NeonText>
              </h2>
            </Reveal>
            {/* Botón bajo el título — solo desktop. En mobile aparece al final,
                debajo de las cards (ver instancia lg:hidden más abajo). */}
            <Reveal delay={0.2}>
              <div className="mt-6 hidden lg:block">
                <CtaButton href="#inscripcion" variant="pill">
                  ✦ Quiero acceder al evento ✦
                </CtaButton>
              </div>
            </Reveal>
          </div>

          {/* Right column — numbered benefit cards + gift card */}
          <div className="flex flex-col gap-4 lg:w-1/2">
            {BENEFITS.map((text, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="group flex items-start gap-4 rounded-sm border border-neon-pink/20 bg-surface/50 p-5 transition-all duration-500 hover:border-neon-pink/50 hover:shadow-[0_0_24px_rgba(240,14,184,0.12)]">
                  <span className="shrink-0 font-display text-2xl font-semibold tabular-nums text-neon-pink/50">
                    0{i + 1}
                  </span>
                  <p className="pt-1 font-sans text-sm font-light leading-relaxed text-foreground/65">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Gift card — same layout, but the gift icon replaces the number */}
            <Reveal delay={0.2 + BENEFITS.length * 0.1}>
              <div className="group flex items-start gap-4 rounded-sm border border-neon-pink/20 bg-surface/50 p-5 transition-all duration-500 hover:border-neon-pink/50 hover:shadow-[0_0_24px_rgba(240,14,184,0.12)]">
                <Image
                  src={regaloIcon}
                  alt="Regalo"
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 object-contain"
                />
                <p className="pt-1 font-sans text-sm font-light leading-relaxed text-foreground/65">
                  Recibirás el Certificado Digital de Participación del Evento
                  Misión Origen con Pilar Sousa.
                </p>
              </div>
            </Reveal>

            {/* Botón — solo mobile, al final debajo de todas las cards */}
            <Reveal delay={0.2 + (BENEFITS.length + 1) * 0.1}>
              <div className="mt-2 lg:hidden">
                <CtaButton href="#inscripcion" variant="pill" block>
                  ✦ Quiero acceder al evento ✦
                </CtaButton>
              </div>
            </Reveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
