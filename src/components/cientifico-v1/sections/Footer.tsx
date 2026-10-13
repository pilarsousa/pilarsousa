import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/cientifico-v1/ui/NeonText";

/**
 * Footer — wordmark + copyright.
 */
export function Footer() {
  return (
    <footer className="cv1-fondo-bruma relative border-t border-foreground/5 bg-background py-16">
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-1">
          <NeonText
            variant="multi"
            className="font-display text-3xl tracking-tight sm:text-4xl"
          >
            Volver al Origen
          </NeonText>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.4em] text-accent">
            Da tu salto cuántico
          </p>
        </div>

        <p className="font-sans text-xs text-foreground/50">
          © {new Date().getFullYear()} Pilar Sousa. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
