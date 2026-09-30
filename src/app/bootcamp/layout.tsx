import type { Metadata } from "next";
import "./bootcamp-v2.css";

/*
  Bootcamp Reset Identidad V2 — la versión principal del Bootcamp, servida en
  /bootcamp. page.tsx es /bootcamp y la gracias vive en
  acceso-k7q2x9/page.tsx, con una ruta que no se deduce (ver su cabecera).

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
  /*
    El favicon de Volver al Origen, el mismo que sirve /diagnostico. El layout
    raíz emite el favicon.ico del sitio para todas las páginas; declararlo aquí
    es lo que hace que en /bootcamp gane éste, y que la pestaña diga la misma
    marca que el sello del hero.

    ⚠️ ES UNA COPIA de 128x128, no el logotipo original de 1254x1254. Un favicon
    se pide en cada página y Next NO optimiza lo que se referencia desde
    `metadata.icons`: se sirve tal cual desde /public. Si cambia el logotipo hay
    que regenerarla —igual que la de /diagnostico, que se documenta en su
    layout— porque no se entera sola.

    ── EL DE APPLE VA APARTE ──

    iOS no usa `icon`: busca `apple-touch-icon`, y sin él cae al favicon.ico de
    la raíz, que es el de Vercel. apple-icon.png es 180x180 —el tamaño que pide
    el iPhone— y OPACO: iOS rellena de negro lo transparente, y el logotipo
    tiene las esquinas transparentes. Se generó desde el logotipo recortando su
    filo claro y rellenando con el mismo verde del disco (#013103), para que
    el círculo no deje costura contra el cuadrado.
  */
  icons: {
    icon: "/bootcamp-v2/favicon.png",
    apple: { url: "/bootcamp-v2/apple-icon.png", sizes: "180x180", type: "image/png" },
  },
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
