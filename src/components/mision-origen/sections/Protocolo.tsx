import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";

const ITEMS = [
  {
    number: "01",
    /* Static class strings so Tailwind v4 includes them in the build */
    wrapperClass:
      "border-cyan/20 hover:border-cyan/55 hover:shadow-[0_0_32px_rgba(40,191,241,0.14)]",
    numberClass: "text-cyan/70",
    text: "Sientes que llevas años trabajando en ti, pero todavía no vives la vida que deseas.",
  },
  {
    number: "02",
    wrapperClass:
      "border-neon-pink/20 hover:border-neon-pink/55 hover:shadow-[0_0_32px_rgba(240,14,184,0.14)]",
    numberClass: "text-neon-pink/70",
    text: "Tienes mucho potencial dentro de ti, pero todavía no te has convertido en la persona que sabes que puedes llegar a ser.",
  },
  {
    number: "03",
    wrapperClass:
      "border-electric-blue/25 hover:border-electric-blue/60 hover:shadow-[0_0_32px_rgba(73,92,196,0.16)]",
    numberClass: "text-electric-blue/70",
    text: "Manifiestas cambios en algunas áreas de tu vida, pero siempre terminas volviendo al mismo punto de partida.",
  },
  {
    number: "04",
    wrapperClass:
      "border-violet/25 hover:border-violet/60 hover:shadow-[0_0_32px_rgba(135,36,120,0.18)]",
    numberClass: "text-violet/70",
    /* text with a highlighted phrase — rendered separately below */
    text: null,
  },
] as const;

/**
 * Section 4 — ¿Este evento es para ti?
 * Goal: qualify the audience with relatable pain-point statements,
 * each in its own neon-accented card.
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
                La Proyección
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
                Este evento es{" "}
                <NeonText variant="multi">para ti</NeonText> si...
              </h2>
            </Reveal>
          </div>

          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {ITEMS.map((item, i) => (
              <Reveal key={item.number} delay={0.1 + i * 0.1}>
                <article
                  className={`flex h-full flex-col gap-4 rounded-sm border bg-background/40 p-6 transition-all duration-500 ${item.wrapperClass}`}
                >
                  <span
                    className={`font-display text-4xl font-semibold tabular-nums ${item.numberClass}`}
                  >
                    {item.number}
                  </span>
                  <p className="font-sans text-base font-light leading-relaxed text-foreground/80 sm:text-lg">
                    {item.number === "04" ? (
                      <>
                        Sabes que ha llegado el momento de dejar de prepararte y
                        empezar a dar un verdadero{" "}
                        <NeonText variant="multi">Salto Cuántico</NeonText> en tu
                        vida.
                      </>
                    ) : (
                      item.text
                    )}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
