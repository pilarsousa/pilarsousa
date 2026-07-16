import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/ui/NeonText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 2 — La señal / Reframe.
 * Goal: install the core idea. Brief, visual, powerful.
 * One phrase that reframes the audience's current story.
 * Placeholder — to be developed together.
 */
export function Transmision() {
  return (
    <section id="transmision" className="relative bg-surface py-section pb-48">
      {/* Degradé de transición: funde el azul noche con el negro de la sección
          siguiente (Código), suavizando el corte entre secciones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_bottom,transparent,#000000)]"
      />
      <Container narrow>
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-cyan">
            Te entiendo...
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl lg:text-4xl">
            Se que estás hecho para más, pero todo el conocimiento sobre
            manifestación que sabes{" "}
            <NeonText variant="multi">
              no se ve reflejado en tu vida como te gustaría.
            </NeonText>
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}
