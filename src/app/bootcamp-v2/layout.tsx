import type { Metadata } from "next";
import "./bootcamp-v2.css";

/*
  Bootcamp Metafísica Práctica (V2) — la versión principal del Bootcamp, servida en
  /bootcamp-v2. page.tsx es /bootcamp-v2 y la gracias vive en
  gracias-k7q2x9/page.tsx, con una ruta que no se deduce (ver su cabecera).

  ⚠️ LA RAÍZ DEL DOMINIO DE PAUTA NO ES ÉSTA. lp.pilarsousa.es/ sigue sirviendo
  la lista de espera, por el rewrite de next.config.ts, y así se queda por
  ahora. /bootcamp-v2 es la única puerta a esta landing: /bootcamp se retiró
  a propósito y ya no lleva a ninguna parte.

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
  /* El favicon NO se declara aquí: es el de Volver al Origen para todas las
     landings y sale de los archivos de la raíz de app/ (favicon.ico, icon*.png,
     apple-icon.png, manifest.ts). Un `icons` en este layout REEMPLAZARÍA los
     de la raíz enteros, también el de iOS y el de Android. */
  title: "Bootcamp Metafísica Práctica | Pilar Sousa",
  description:
    "No manifiestas lo que deseas. Manifiestas quien eres. Un campamento de metafísica práctica para resetear tu identidad y volver al origen.",
  openGraph: {
    title: "Bootcamp Metafísica Práctica | Pilar Sousa",
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
