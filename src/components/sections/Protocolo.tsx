import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/ui/NeonText";
import { Reveal } from "@/components/ui/Reveal";

const DAYS = [
  {
    number: "01",
    day: "Día uno",
    title: "Diagnóstico",
    description:
      "Texto provisional para el primer día del protocolo. Aquí se describirá qué van a experimentar, trabajar y desbloquear en esta primera jornada de activación.",
    /* Static class strings so Tailwind v4 includes them in the build */
    wrapperClass:
      "border-cyan/20 hover:border-cyan/55 hover:shadow-[0_0_32px_rgba(40,191,241,0.14)]",
    numberClass: "text-cyan/70",
    titleClass: "text-cyan",
  },
  {
    number: "02",
    day: "Día dos",
    title: "Decodificación",
    description:
      "Texto provisional para el segundo día. Aquí se describirá el proceso de decodificación, las herramientas que se utilizarán y la transformación que ocurre en esta etapa.",
    wrapperClass:
      "border-neon-pink/20 hover:border-neon-pink/55 hover:shadow-[0_0_32px_rgba(240,14,184,0.14)]",
    numberClass: "text-neon-pink/70",
    titleClass: "text-neon-pink",
  },
  {
    number: "03",
    day: "Día tres",
    title: "Activación",
    description:
      "Texto provisional para el tercer día. Aquí se describirá la activación final, la integración de todo el proceso y el punto de partida hacia la nueva identidad.",
    wrapperClass:
      "border-electric-blue/25 hover:border-electric-blue/60 hover:shadow-[0_0_32px_rgba(73,92,196,0.16)]",
    numberClass: "text-electric-blue/70",
    titleClass: "text-electric-blue",
  },
] as const;

/**
 * Section 4 — El protocolo / La experiencia.
 * Goal: break down the 3-day journey. Each day is a card with its own
 * neon accent so the progression reads visually.
 * Placeholder — to be developed together.
 */
export function Protocolo() {
  return (
    <section id="protocolo" className="bg-surface py-section">
      <Container>
        <div className="flex flex-col gap-12">

          {/* Header */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-electric-blue">
                El protocolo
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
                Tres días.{" "}
                <NeonText variant="multi">
                  Tres niveles de activación.
                </NeonText>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl font-sans text-base font-light leading-relaxed text-foreground/55">
                [Descripción general del protocolo — texto provisional. Será
                reemplazado con el copy definitivo que explica la estructura.]
              </p>
            </Reveal>
          </div>

          {/* Day cards */}
          <div className="grid gap-6 sm:grid-cols-3">
            {DAYS.map((day, i) => (
              <Reveal key={day.number} delay={0.1 + i * 0.1}>
                <article
                  className={`flex flex-col gap-5 rounded-sm border bg-background/40 p-6 transition-all duration-500 ${day.wrapperClass}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-display text-4xl font-semibold tabular-nums ${day.numberClass}`}>
                      {day.number}
                    </span>
                    <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/30">
                      {day.day}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className={`font-sans text-lg font-medium ${day.titleClass}`}>
                      {day.title}
                    </h3>
                    <p className="font-sans text-sm font-light leading-relaxed text-foreground/55">
                      {day.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
