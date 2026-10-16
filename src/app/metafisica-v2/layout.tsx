import type { Metadata } from "next";
import { ReservaModalProvider } from "@/components/metafisica-v2/ui/ReservaModal";
import "./metafisica-v2.css";

/*
  Metafísica v2 — la landing del evento sobre la estructura de LeadsMastery
  (Jhonny Lubo), con la paleta de Pilar en oscuro y el tubo de ensayo de v1.
  Spec: docs/superpowers/specs/2026-10-13-cientifico-v3-design.md

  Componentes propios en components/metafisica-v2/: nada se importa de v1, así
  los cambios de una versión no se filtran a la otra.

  .cv3-scope repinta los tokens de Tailwind para este subárbol (ver
  metafisica-v2.css). overflow-x-clip: las entradas flotantes, el marquee y el
  carrusel sangran a propósito fuera de la columna, y sin esto la página
  tendría scroll horizontal.
*/

export const metadata: Metadata = {
  title: "[Metafísica v2] Volver al Origen — Masterclass gratuita con Pilar Sousa",
  // Variante en desarrollo: fuera del índice.
  robots: { index: false },
  description:
    "Una masterclass gratuita con Pilar Sousa para convertir lo que sabes de manifestación en resultados que puedes comprobar en tu propia vida.",
  openGraph: {
    title: "Volver al Origen — Pilar Sousa",
    description:
      "El método que convirtió su vida en un laboratorio: manifestar resultados que puedes comprobar. Masterclass online gratuita.",
    type: "website",
    locale: "es_ES",
  },
};

export default function MetafisicaV2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* min-h-svh y no min-h-full: <body> sólo tiene min-height, así que un
       100% no resuelve y en páginas cortas (la gracias) asomaba el fondo del
       body debajo. */
    <div className="cv3-scope min-h-svh overflow-x-clip bg-background text-foreground antialiased">
      <ReservaModalProvider>{children}</ReservaModalProvider>
    </div>
  );
}
