import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Títulos y subtítulos — futurista, tecnológica, cyberpunk */
const zenDots = localFont({
  variable: "--font-zen-dots",
  src: "../../public/fonts/Zen_Dots/ZenDots-Regular.ttf",
  weight: "400",
  display: "swap",
});

/* Textos, párrafos, labels, botones — Futura Light / Book / Medium.
   Variable font: a single file covers the 300–700 range used across the site. */
const jost = localFont({
  variable: "--font-jost",
  src: "../../public/fonts/Jost/Jost-VariableFont_wght.ttf",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Misión Origen — Activa tu misión desde adentro",
  description:
    "Un programa de 3 días con Pilar Sousa para reprogramar tu identidad, activar tu misión y alinearte con la versión de ti que ya existe.",
  openGraph: {
    title: "Misión Origen — Pilar Sousa",
    description:
      "Reprograma tu identidad. Activa tu misión. Un programa de 3 días que cambia el código desde adentro.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${zenDots.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
