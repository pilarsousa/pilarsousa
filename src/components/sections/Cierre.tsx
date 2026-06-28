import { Container } from "@/components/ui/Container";

/**
 * Section 6 — Testimonials + opening of 100 spaces + final CTA.
 * Optional section (testimonials). Integrates social proof and final CTA
 * to avoid making the landing too long.
 * Placeholder — to be developed together.
 */
export function Cierre() {
  return (
    <section id="cierre" className="bg-surface py-section">
      <Container>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
          Sección 6 — Testimonios y cierre
        </p>
        <h2 className="mt-6 font-display text-3xl text-foreground sm:text-4xl">
          Al terminar el bootcamp, abriré 100 espacios.
        </h2>
      </Container>
    </section>
  );
}
