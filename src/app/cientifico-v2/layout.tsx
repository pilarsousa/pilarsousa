import type { Metadata } from "next";
import { ReservaModalProvider } from "@/components/cientifico-v2/ui/ReservaModal";
import "./cientifico-v2.css";

/*
  Científico V2 — copia de cientifico-v3 (la publicada en /registro) para
  rediseñarla entera sin tocar la que está en campaña. Arrancó idéntica; el
  spec de origen es docs/superpowers/specs/2026-10-13-cientifico-v3-design.md.

  Componentes e imágenes propios (components/cientifico-v2/ y
  public/cientifico-v2/): nada se importa de v3, así los cambios de una versión
  no se filtran a la otra. SOURCE ("cientifico-v2") separa sus leads en el CRM.

  .cv2-scope repinta los tokens de Tailwind para este subárbol (ver
  cientifico-v2.css). overflow-x-clip: las entradas flotantes, el marquee y el
  carrusel sangran a propósito fuera de la columna, y sin esto la página
  tendría scroll horizontal.
*/

export const metadata: Metadata = {
  title: "[V2 Científico] Volver al Origen — Masterclass gratuita con Pilar Sousa",
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

export default function CientificoV2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* min-h-svh y no min-h-full: <body> sólo tiene min-height, así que un
       100% no resuelve y en páginas cortas (la gracias) asomaba el fondo del
       body debajo. */
    <div className="cv2-scope min-h-svh overflow-x-clip bg-background text-foreground antialiased">
      <ReservaModalProvider>{children}</ReservaModalProvider>
    </div>
  );
}
