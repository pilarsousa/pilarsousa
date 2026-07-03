import Image from "next/image";
import { Container } from "@/components/ui/Container";
import logo from "@/../public/LOGO.png";

/**
 * Minimal site footer — logo + program name + copyright. Sober, on a deep
 * ink base. The logo sits above the copyright, centered on mobile.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-accent/10 bg-ink py-10">
      <Container className="flex flex-col items-center gap-4 text-center">
        <Image
          src={logo}
          alt="Volver al Origen — Pilar Sousa"
          className="h-9 w-auto opacity-90 sm:h-14"
          priority={false}
        />
        <p className="text-xs text-foreground/50">
          © {year} Pilar Sousa. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
