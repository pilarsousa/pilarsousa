import type { Metadata } from "next";
import "./bootcamp-v2.css";

/*
  Bootcamp Reset Identidad V2 — la versión principal del Bootcamp, servida en
  /bootcamp. page.tsx es /bootcamp y gracias/page.tsx es /bootcamp/gracias.

  ⚠️ LA RAÍZ DEL DOMINIO DE PAUTA NO ES ÉSTA. lp.pilarsousa.es/ sigue sirviendo
  la lista de espera, por el rewrite de next.config.ts, y así se queda por
  ahora. /bootcamp es la única puerta a esta landing.

  ── QUÉ ES LA V2 ──

  El mismo Bootcamp con la identidad visual del Diagnóstico. Copy, estructura y
  funcionalidad son los de la versión original, que sigue publicada en
  /bootcamp-v1: lo único que cambia son los colores y las dos familias
  tipográficas, y todo eso vive en bootcamp-v2.css.

  ── LAS DOS CLASES DEL ÁMBITO ──

  .bc-scope es la de siempre, y aquí sólo aporta el grano de puntos: está
  declarada en globals.css como pseudoelemento, y un descendiente no puede
  encender el de un ancestro, así que hay que llevarla puesta.

  .bc2-scope va ADEMÁS, no en su lugar, y es la que repinta la paleta. Son dos
  clases y no una porque el grano lo comparten las dos versiones y la paleta
  no: fundirlas obligaría a duplicar el grano o a tocar la V1, que está
  publicada.

  min-h-svh porque .bc2-scope es quien pinta el fondo verde —el <body> queda
  fuera del ámbito y sigue en el negro del :root—, y sin altura mínima el
  verde acabaría donde acaba el contenido.
*/

export const metadata: Metadata = {
  title: "Bootcamp Reset Identidad | Pilar Sousa",
  description:
    "No manifiestas lo que deseas. Manifiestas quien eres. Un campamento de metafísica práctica para resetear tu identidad y volver al origen.",
  openGraph: {
    title: "Bootcamp Reset Identidad | Pilar Sousa",
    description:
      "No manifiestas lo que deseas. Manifiestas quien eres. Un campamento de metafísica práctica para resetear tu identidad.",
    type: "website",
    locale: "es_ES",
  },
};

export default function BootcampLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bc-scope bc2-scope min-h-svh">{children}</div>;
}
