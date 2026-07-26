import type { Metadata } from "next";

/*
  Landing de ventas — servida en /ventas.

  Reutiliza la identidad visual de Misión Origen (la landing de registro):
  envolver el árbol en .mo-scope hace que hereden el fondo negro, la paleta neón
  y las fuentes Zen Dots / Jost, sin duplicar tokens. Es el mismo mecanismo que
  usa el layout de (mision-origen); ver el bloque .mo-scope en globals.css.

  A diferencia de Misión Origen, esta landing NO monta el modal de reserva: su
  CTA es un enlace directo al checkout, así que no necesita el
  ReservaModalProvider.
*/

export const metadata: Metadata = {
  title: "Volver al Origen — Accede al entrenamiento nº1 de Metafísica Práctica",
  description:
    "El entrenamiento práctico de metafísica para transformar tu identidad y manifestar una vida extraordinaria en 40 días.",
  openGraph: {
    title: "Volver al Origen — Pilar Sousa",
    description:
      "Transforma tu identidad y manifiesta una nueva realidad en todas las áreas de tu vida, en tan solo 40 días.",
    type: "website",
    locale: "es_ES",
  },
};

export default function VentasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mo-scope min-h-full overflow-x-clip bg-background text-foreground">
      {children}
    </div>
  );
}
