import { Container } from "@/components/ui/Container";

/**
 * Section 4 — What you will experience inside.
 * Goal: explain the three-day journey without overextending.
 * Placeholder — to be developed together.
 */
export function Experiencia() {
  return (
    <section id="experiencia" className="bg-surface py-section">
      <Container>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
          Sección 4 — Lo que experimentarás dentro
        </p>
        <h2 className="mt-6 font-display text-3xl text-foreground sm:text-4xl">
          Tres días. Tres etapas de iniciación.
        </h2>
      </Container>
    </section>
  );
}
