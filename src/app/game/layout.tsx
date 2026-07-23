import type { Metadata } from "next";

/*
  /game — landing independiente, ambientada a los videojuegos.

  Comparte tipografía y paleta con Misión Origen a propósito: envuelve todo en
  .mo-scope, la misma clase que usa Misión Origen para redefinir los tokens
  semánticos (--color-background, --font-display, …) a su versión neón/cyberpunk
  (Zen Dots + Jost). Ver el bloque .mo-scope en globals.css.

  A diferencia de Misión Origen, esta landing NO monta la AnnouncementBar ni el
  ReservaModalProvider: su chrome es propio (fondo a pantalla completa y sus dos
  botones). El layout envuelve tanto /game como /game/form; cada página decide
  su propia altura y si tiene scroll (/, sin scroll; /game/form, formulario).
*/

export const metadata: Metadata = {
  title: "Game — Pilar Sousa",
  description:
    "Canjeá tu código para desbloquear el contenido, o completá el formulario para llevarte tu recompensa.",
  openGraph: {
    title: "Game — Pilar Sousa",
    description:
      "Canjeá tu código para desbloquear el contenido, o completá el formulario para llevarte tu recompensa.",
    type: "website",
    locale: "es_ES",
  },
};

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mo-scope game-scope min-h-full bg-background text-foreground">
      {children}
    </div>
  );
}
