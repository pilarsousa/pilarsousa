import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";

/**
 * Footer — wordmark + copyright.
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
          <NeonText
            variant="multi"
            className="font-display text-3xl tracking-tight sm:text-4xl"
          >
            Misión Origen
          </NeonText>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.4em] text-cyan/70">
            Da tu salto cuántico
          </p>
        </div>

        <p className="font-sans text-xs font-light text-foreground/40">
          © {new Date().getFullYear()} Pilar Sousa. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
