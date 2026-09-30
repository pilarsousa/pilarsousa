import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { CursorGrid } from "@/components/bootcamp-v2/ui/CursorGrid";
import logotipo from "@/../public/diagnostico/contenido/logo/logo2.png";

/**
 * Site footer — the Volver al Origen logotype + copyright, over a grid that
 * lights up around the cursor.
 *
 * El logotipo es el mismo que abre el hero del Diagnóstico (logo2.png, blanco
 * y apaisado): el footer firma con la marca de la academia, no con el nombre
 * del evento. Se dimensiona por el ALTO por el mismo motivo que allí —el
 * archivo es casi 3:1 y fijando el ancho el alto bailaría entre pantallas—.
 *
 * La rejilla (CursorGrid) va en el verde de la del precio (#5b9800), así que
 * la página abre y cierra con el mismo motivo. Sólo aparece con el puntero
 * encima o al tocar: en reposo el footer es el de siempre.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-accent/10 bg-ink py-14 sm:py-16">
      <CursorGrid
        className="-z-10"
        cellSize={56}
        color="#5b9800"
        radius={130}
        maxOpacity={0.9}
        fillOpacity={0.12}
        cellRadius={4}
      />

      <Container className="flex flex-col items-center gap-5 text-center">
        <Image
          src={logotipo}
          alt="Volver al Origen — Pilar Sousa"
          sizes="(min-width: 640px) 175px, 125px"
          className="h-10 w-auto opacity-90 sm:h-14"
        />
        <p className="text-xs text-foreground/50">
          © {year} Pilar Sousa. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
