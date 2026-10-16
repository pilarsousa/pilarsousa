import type { Metadata } from "next";
import { ReservaModalProvider } from "@/components/cientifico-v2/ui/ReservaModal";
import { ScrollSuave } from "@/components/cientifico-v2/ui/ScrollSuave";
import "./cientifico-v2.css";

/*
  Seminario de Neurometafísica (cientifico-v2). Arrancó como copia de
  cientifico-v3 (la publicada en /registro) y se rehízo sobre el brief de
  Pilar: doce bloques, la estética del aula (no del laboratorio), la paleta
  verde pizarra y oro, y titulares en Cinzel. El copy vive en
  components/cientifico-v2/content.ts.

  Componentes e imágenes propios (components/cientifico-v2/ y
  public/cientifico-v2/): nada se importa de v3, así los cambios de una versión
  no se filtran a la otra. SOURCE ("cientifico-v2") separa sus leads en el CRM.

  .cv2-scope repinta los tokens de Tailwind para este subárbol (ver
  cientifico-v2.css). overflow-x-clip: las entradas flotantes, el marquee y el
  carrusel sangran a propósito fuera de la columna, y sin esto la página
  tendría scroll horizontal.
*/

export const metadata: Metadata = {
  title: "[V2] Seminario de Neurometafísica — Pilar Sousa",
  // Variante en desarrollo: fuera del índice.
  robots: { index: false },
  description:
    "Seminario en directo con Pilar Sousa: la ciencia de reprogramar tu identidad, tu cerebro y tu sistema nervioso para manifestar una realidad diferente.",
  openGraph: {
    title: "Seminario de Neurometafísica — Pilar Sousa",
    description:
      "No puedes crear una realidad nueva siendo la misma persona. Seminario en directo con Pilar Sousa. Plazas limitadas.",
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
      <ScrollSuave />
      <ReservaModalProvider>{children}</ReservaModalProvider>
    </div>
  );
}
