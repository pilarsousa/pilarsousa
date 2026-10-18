import type { Metadata } from "next";
import { ReservaModalProvider } from "@/components/neurometafisica-v1/ui/ReservaModal";
import { ScrollSuave } from "@/components/neurometafisica-v1/ui/ScrollSuave";
import { Hidratado } from "@/components/neurometafisica-v1/ui/Hidratado";
import "./neurometafisica-v1.css";

/*
  Seminario de Neurometafísica (neurometafisica-v1). Arrancó como copia de
  metafisica-v2 (la publicada en /registro) y se rehízo sobre el brief de
  Pilar: doce bloques, la estética del aula (no del laboratorio), la paleta
  verde pizarra y oro, y titulares en Cinzel. El copy vive en
  components/neurometafisica-v1/content.ts.

  Componentes e imágenes propios (components/neurometafisica-v1/ y
  public/neurometafisica-v1/): nada se importa de v3, así los cambios de una versión
  no se filtran a la otra. SOURCE ("neurometafisica-v1") separa sus leads en el CRM.

  .cv2-scope repinta los tokens de Tailwind para este subárbol (ver
  neurometafisica-v1.css). overflow-x-clip: las entradas flotantes, el marquee y el
  carrusel sangran a propósito fuera de la columna, y sin esto la página
  tendría scroll horizontal.
*/

export const metadata: Metadata = {
  title: "[Neurometafísica v1] Seminario de Neurometafísica — Pilar Sousa",
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

export default function NeurometafisicaV1Layout({
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
      <Hidratado />
      <ReservaModalProvider>{children}</ReservaModalProvider>
    </div>
  );
}
