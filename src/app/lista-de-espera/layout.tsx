import type { Metadata } from "next";
import { SmoothScroll } from "@/components/lista-de-espera/ui/SmoothScroll";
import { WaitlistModalProvider } from "@/components/lista-de-espera/ui/WaitlistModal";

/*
  Volver al Origen — lista de espera de la tercera edición, servida en
  /lista-de-espera.

  Ojo con los nombres: la raíz pública (/) también es "Volver al Origen", pero es
  la landing de VENTA del entrenamiento. Ésta es la de CAPTACIÓN previa a la
  apertura de la tercera edición. Son dos piezas distintas del mismo funnel.

  LAYOUT CASI DESNUDO A PROPÓSITO. Tenía encima el cromo visual del diseño
  anterior —una textura de fondo fija a la ventana, un desenfoque progresivo en
  el borde inferior, el scroll suave de Lenis y un sombreado en los costados— y
  todo eso se retiró con el resto de aquel diseño. El montaje nuevo trae sus
  propios fondos dentro de cada sección, así que un fondo global estorbaría.

  DE AQUELLO VUELVE EL SCROLL SUAVE, y sólo eso: no es cromo del diseño viejo
  sino cómo se recorre la página, y el montaje nuevo es un recorrido largo de
  ocho secciones encadenadas donde el salto seco del navegador rompe la
  continuidad. La textura sí volvió, pero como malla y por CSS (.le-scope::before
  en globals.css), no como capa en el árbol.

  Se monta AQUÍ y no en el layout raíz porque Lenis toma el scroll de la
  ventana, que es único para todo el sitio: montarlo arriba se lo impondría a
  las otras cinco landings del proyecto.

  Lo que queda es lo imprescindible: los metadatos, el ámbito de la paleta, el
  scroll y el provider del modal.

  DOS ÁMBITOS EN EL MISMO DIV, y no es redundancia:
  · .vo-scope trae la paleta y las variables de glow. Lo COMPARTE con la landing
    publicada de /volver-al-origen.
  · .le-scope pisa sólo lo que este rediseño cambia — hoy, la tipografía de
    titulares (Trajan Pro). Existe precisamente para no tocar .vo-scope, porque
    eso le cambiaría el aspecto a la landing que está en producción.
*/

export const metadata: Metadata = {
  /* Favicon propio de esta landing, aplicado también a /gracias por herencia del
     layout.

     Se declara aquí en vez de usar el archivo icon.png del segmento porque el
     original vive en public/ y así se referencia una sola copia.

     El layout raíz emite además el favicon.ico del sitio para todas las páginas;
     declarar éste explícitamente es lo que hace que en estas dos gane el de la
     marca. */
  icons: {
    icon: "/volver-origen/public/img/Logo-volveralorigen.webp",
  },
  /* noindex: esta ruta es el BORRADOR de la próxima versión de la landing,
     mientras la publicada sigue viviendo en /volver-al-origen. Sin esto Google
     indexaría ambas con el mismo título y descripción, competirían entre sí por
     las mismas búsquedas y algún visitante aterrizaría en una versión todavía en
     construcción. Se retira el día que ésta pase a ser la definitiva. */
  robots: { index: false, follow: false },
  title:
    "Lista de espera (borrador) — Tercera edición de Volver al Origen | Pilar Sousa",
  description:
    "Apúntate a la lista de espera de la tercera edición de Volver al Origen y accede antes que nadie, con precio especial y bonos exclusivos.",
  openGraph: {
    title: "Lista de espera — Tercera edición de Volver al Origen",
    description:
      "Recuerda y encarna tu misión de vida. Acceso anticipado, mejor precio y bonos exclusivos para quienes entren en la lista.",
    type: "website",
    locale: "es_ES",
  },
};

export default function ListaDeEsperaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* El provider envuelve al scope, no al revés: así el modal se renderiza como
       hermano del contenido y queda FUERA de cualquier contenedor que recorte
       overflow. En WebKit un ancestro que recorta anula el backdrop-filter de
       sus descendientes, y el panel del modal es de cristal: dentro, en iPhone,
       se quedaría sin su fondo.

       Como el modal cuelga del provider y éste está fuera del scope, no hereda
       los tokens de la landing; por eso su panel usa las clases vo-* de la
       paleta cruda, que viven en @theme y resuelven en cualquier punto. */
    <WaitlistModalProvider>
      <SmoothScroll />
      <div className="vo-scope le-scope relative min-h-full text-foreground">
        {children}
      </div>
    </WaitlistModalProvider>
  );
}
