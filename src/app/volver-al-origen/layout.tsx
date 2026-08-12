import type { Metadata } from "next";

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
      {children}
    </div>
  );
}
