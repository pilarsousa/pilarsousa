import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";

// Display font for titles — ritual, ancient, authoritative.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body font — modern, refined, highly readable.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bootcamp RESET IDENTIDAD — Pilar Sousa",
  description:
    "No manifiestas lo que deseas. Manifiestas quien eres. Un campamento de metafísica práctica para resetear tu identidad y volver al origen.",
  openGraph: {
    title: "Bootcamp RESET IDENTIDAD — Pilar Sousa",
    description:
      "No manifiestas lo que deseas. Manifiestas quien eres. Un campamento de metafísica práctica para resetear tu identidad.",
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
    <html
      lang="es"
      className={`${cinzel.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
