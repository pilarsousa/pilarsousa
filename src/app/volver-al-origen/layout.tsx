import type { Metadata } from "next";
import { SectionTexture } from "@/components/volver-al-origen/ui/SectionTexture";
import { SmoothScroll } from "@/components/volver-al-origen/ui/SmoothScroll";
import { GradualBlur } from "@/components/volver-al-origen/ui/GradualBlur";
import { WaitlistModalProvider } from "@/components/volver-al-origen/ui/WaitlistModal";

/*
  Volver al Origen — lista de espera de la tercera edición, servida en
  /volver-al-origen.

  Ojo con los nombres: la raíz pública (/) también es "Volver al Origen", pero
  es la landing de VENTA del entrenamiento. Esta es la de CAPTACIÓN previa a la
  apertura de la tercera edición. Son dos piezas distintas del mismo funnel.

  No hay tokens que redefinir aquí: la landing usa la paleta de :root
  (tinta, dorados, crema, Cinzel + Manrope) tal cual, que es exactamente su
  identidad. .vo-scope sólo aporta las variables de glow que comparten el CTA y
  los halos; ver el bloque .vo-scope en globals.css.
*/

export const metadata: Metadata = {
  /* Favicon propio de esta landing, aplicado también a /gracias por herencia
     del layout.

     Se declara aquí en vez de usar el archivo icon.png del segmento porque el
     original vive en public/ y así se referencia una sola copia, sin duplicar
     el archivo dentro de app/.

     El layout raíz emite además el favicon.ico del sitio para todas las
     páginas; declarar éste explícitamente es lo que hace que en estas dos gane
     el de la marca.

     Es el mismo archivo que usa LogoVao en el hero y en el modal: una sola
     copia para las dos cosas, así que cambiar el logo cambia también el
     favicon y no hay dos versiones que se desincronicen. */
  icons: {
    icon: "/volver-origen/public/img/Logo-volveralorigen.webp",
  },
  title: "Lista de espera — Tercera edición de Volver al Origen | Pilar Sousa",
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

export default function VolverAlOrigenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* El provider envuelve el scope, no al revés: el modal se renderiza como
       hermano del contenido y queda FUERA del div con overflow-x-clip. En
       WebKit un ancestro que recorta overflow anula el backdrop-filter de sus
       descendientes, así que dentro del div el fondo de cristal del modal no se
       pintaría en iPhone — el mismo motivo por el que GradualBlur va fuera.

       Como el modal cuelga del provider y éste está fuera de .vo-scope, el
       componente no hereda los tokens de la landing; por eso el panel usa las
       clases vo-* de la paleta cruda (vo-black, vo-bone), que sí viven en
       @theme y resuelven en cualquier punto del árbol. */
    <WaitlistModalProvider>
      {/* overflow-x-clip: los halos y resplandores sangran fuera de sus
          secciones a propósito; esto evita que eso genere scroll horizontal en
          mobile. */}
      {/* Fondo texturado continuo de toda la landing.

          Va FIJO a la ventana y en el layout, no por secciones, y ese es el
          arreglo de fondo: mientras cada sección pintaba su propia textura,
          entre dos vecinas quedaba una banda de color plano —donde una ya se
          había desvanecido y la otra aún no entraba—. Siendo una sola imagen
          que no se mueve con el scroll, no hay frontera que disimular.

          Las secciones ya no llevan color de fondo propio: si lo llevaran,
          taparían esta capa. El color base lo aporta aquí el bg-background del
          contenedor, por debajo de la textura. */}
      <div className="fixed inset-0 -z-10 bg-background" aria-hidden>
        <SectionTexture variant="oscuro" fixed fade={false} />
      </div>

      {/* overflow-x-clip: los halos y resplandores sangran fuera de sus
          secciones a propósito; esto evita que eso genere scroll horizontal en
          mobile. */}
      <div className="vo-scope relative min-h-full overflow-x-clip text-foreground">
        {/* No pinta nada: sólo activa el scroll suave mientras se está en esta
            landing y lo apaga al salir. */}
        <SmoothScroll />
        {children}
      </div>

      {/* Sombreado de los dos costados, a lo largo de toda la landing.

          Enmarca el contenido y hace que la página se lea como una pieza y no
          como un fondo infinito: al oscurecer los cantos, el ojo se queda en el
          centro. Es el mismo recurso que ya usa la página de gracias con su
          viñeta, aquí sólo en el eje horizontal.

          VA FUERA DEL DIV DE ARRIBA, como el desenfoque de abajo, y por el mismo
          motivo: ese div tiene overflow-x-clip, y en WebKit un ancestro que
          recorta overflow anula efectos de composición en sus descendientes.

          Fijo a la ventana y no a la página: acompaña al scroll en vez de
          quedarse anclado a una altura concreta del documento.

          Los tramos son estrechos —del 0 al 6% y del 94 al 100%— y el color
          nunca llega a opaco: tiene que leerse como que los bordes se apagan,
          no como dos barras oscuras. Y por eso el degradado va a transparente
          en el centro y no a un color: cualquier tinte central velaría la
          página entera.

          z-30 lo deja por encima del contenido y por debajo del desenfoque
          inferior (40) y del modal (200), que deben poder taparlo.

          pointer-events-none es imprescindible: cubre la pantalla completa y sin
          él se comería los clics de los CTA que caen cerca de los bordes. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(4,9,1,0.55) 0%, rgba(4,9,1,0) 6%, rgba(4,9,1,0) 94%, rgba(4,9,1,0.55) 100%)",
        }}
      />

      {/* Desenfoque progresivo en el borde inferior de la ventana: el contenido
          se difumina justo antes de salir de pantalla, en vez de cortarse.

          VA FUERA DEL DIV DE ARRIBA, Y ES OBLIGATORIO. Ese div tiene
          overflow-x-clip, y en WebKit —Safari de iPhone y iPad— un ancestro que
          recorta overflow anula el backdrop-filter de sus descendientes: el
          efecto simplemente no se pinta. Chrome lo tolera, así que el fallo sólo
          se ve en iOS. Dentro del contenedor el desenfoque no existía en iPhone.

          target="page" y no "parent" porque debe seguir a la ventana mientras se
          hace scroll, no quedarse anclado al final del documento.

          z-index 40: por encima del contenido y por debajo del modal de reseñas,
          que está en 200 y debe poder taparlo. */}
      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2.5}
        divCount={4}
        curve="bezier"
        exponential
        opacity={0.9}
        className="z-40"
      />
    </WaitlistModalProvider>
  );
}
