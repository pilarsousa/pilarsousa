import { Container } from "@/components/ui/Container";

/**
 * Footer — wordmark + copyright.
 * The "Misión Origen" wordmark uses a pulsing neon glow (animate-neon-glow)
 * for a sign-like effect, distinct from the drifting gradient used elsewhere.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background py-16">
      {/* Faint ambient glow behind the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 50% 40%, rgba(135,36,120,0.15) 0%, transparent 70%)",
        }}
      />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-1">
          <p className="animate-neon-glow font-display text-3xl tracking-tight text-white sm:text-4xl">
            Misión Origen
          </p>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.4em] text-cyan/70">
            Activa tu misión
          </p>
        </div>

        <p className="font-sans text-xs font-light text-foreground/40">
          © {new Date().getFullYear()} Pilar Sousa. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
