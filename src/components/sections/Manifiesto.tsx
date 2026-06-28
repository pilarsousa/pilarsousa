import { Container } from "@/components/ui/Container";

/**
 * Section 2 — Central phrase / Reframe.
 * Goal: install the core idea. Brief, visual, powerful.
 * Placeholder — to be developed together.
 */
export function Manifiesto() {
  return (
    <section id="manifiesto" className="bg-surface py-section">
      <Container narrow>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
          Sección 2 — Frase central
        </p>
        <p className="mt-6 font-display text-3xl leading-snug text-foreground sm:text-4xl">
          No manifiestas lo que deseas. Manifiestas quien eres.
        </p>
      </Container>
    </section>
  );
}
