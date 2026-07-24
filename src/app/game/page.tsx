import Image from "next/image";
import heroDesktop from "@/../public/game/game-img/hero-game.jpg";
import heroMobile from "@/../public/game/game-img/hero-game-movil.jpg";
import { GameActions } from "@/components/game/GameActions";

/*
  /game — una sola pantalla, sin scroll.

  Fondo a sangre con dos encuadres (como el Hero de Misión Origen): el <picture>
  sirve hero-game-movil.jpg en móvil y hero-game.jpg en ≥768px, así el navegador
  descarga sólo el que corresponde. object-cover llena la pantalla en ambos.

  El contenido (título + botones, en <GameActions>) se ancla a la IZQUIERDA
  sobre el hueco de la imagen (justify-start), no centrado sobre la figura.

  Capas de encima, todas -z-10 (por encima de la imagen en -z-20):
   1. Degradé de legibilidad de izquierda a derecha (oscurece la zona del texto).
   2. Viñeta: difuminado negro en los cuatro bordes de la pantalla.
   3. Grilla cyberpunk sutil.

  h-[100dvh] + overflow-hidden garantizan el "sin scroll" incluso en móviles.
*/
export default function GamePage() {
  return (
    <main className="relative isolate flex h-[100dvh] w-full items-end justify-start overflow-hidden md:items-center">
      {/* Fondo a sangre — móvil vs desktop */}
      <picture aria-hidden className="absolute inset-0 -z-20 block">
        <source
          media="(min-width: 768px)"
          srcSet={heroDesktop.src}
          width={heroDesktop.width}
          height={heroDesktop.height}
        />
        <Image
          src={heroMobile}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
      </picture>

      {/* 1 — Legibilidad: más oscuro a la izquierda, donde cae el contenido */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#000000_0%,rgba(0,0,0,0.82)_22%,rgba(0,0,0,0.45)_50%,rgba(0,0,0,0.15)_75%,transparent_100%)]"
      />

      {/* 2 — Viñeta: difuminado negro en los cuatro bordes. Dos degradés
             (horizontal + vertical) que son negros en los extremos y
             transparentes en el centro, así se oscurecen todos los bordes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            linear-gradient(to right, #000 0%, transparent 14%, transparent 86%, #000 100%),
            linear-gradient(to bottom, #000 0%, transparent 14%, transparent 86%, #000 100%)
          `,
        }}
      />

      {/* 3 — Sólo mobile: degradé negro desde abajo, para que el contenido
             (que en móvil baja hacia la mitad inferior) se lea sobre la foto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent md:hidden"
      />

      <GameActions />
    </main>
  );
}
