import type { Metadata } from "next";
import { SmoothScroll } from "@/components/volver-al-origen/ui/SmoothScroll";
import { GradualBlur } from "@/components/volver-al-origen/ui/GradualBlur";

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
     el de la marca. */
  icons: {
    icon: "/volver-origen/public/img/favicon/favicon-vovler.png",
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
    /* overflow-x-clip: los halos y resplandores sangran fuera de sus secciones
       a propósito; esto evita que eso genere scroll horizontal en mobile. */
    <div className="vo-scope min-h-full overflow-x-clip bg-background text-foreground">
      {/* No pinta nada: sólo activa el scroll suave mientras se está en esta
          landing y lo apaga al salir. */}
      <SmoothScroll />
      {children}

      {/* Desenfoque progresivo en el borde inferior de la ventana: el contenido
          se difumina justo antes de salir de pantalla, en vez de cortarse.

          target="page" y no "parent" porque debe seguir a la ventana mientras se
          hace scroll, no quedarse anclado al final del documento.

          z-index 40: por encima del contenido y por debajo tanto del modal de
          reseñas (200) como de la textura de puntos (9999), que debe seguir
          leyéndose nítida por encima de todo. */}
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
    </div>
  );
}
