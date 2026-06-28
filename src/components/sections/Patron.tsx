import { Container } from "@/components/ui/Container";

/**
 * Section 3 — Problem / Unconscious pattern.
 * Goal: show why the person keeps repeating patterns despite wanting change.
 * Placeholder — to be developed together.
 */
export function Patron() {
  return (
    <section id="patron" className="bg-background py-section">
      <Container>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
          Sección 3 — El patrón inconsciente
        </p>
        <h2 className="mt-6 font-display text-3xl text-foreground sm:text-4xl">
          Quieres una realidad nueva, pero una parte de ti todavía protege la
          anterior.
        </h2>
      </Container>
    </section>
  );
}
