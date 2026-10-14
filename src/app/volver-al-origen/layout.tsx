import type { Metadata } from "next";
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
  /* El favicon NO se declara aquí: es el de Volver al Origen para todas las
     landings y sale de los archivos de la raíz de app/ (favicon.ico, icon*.png,
     apple-icon.png, manifest.ts). Un `icons` en este layout REEMPLAZARÍA los
     de la raíz enteros, también el de iOS y el de Android. */
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
      <div className="vo-scope vo-grano min-h-full overflow-x-clip bg-background text-foreground">
        {/* No pinta nada: sólo activa el scroll suave mientras se está en esta
            landing y lo apaga al salir. */}
        <SmoothScroll />
        {children}
      </div>

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
