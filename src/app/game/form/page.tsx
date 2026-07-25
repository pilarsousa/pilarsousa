import Image from "next/image";
import heroGame from "@/../public/game/game-img/fondo-landing.jpg";
import { GameFlow } from "@/components/game/GameFlow";

/*
  /game/form — destino al tocar una card en /game/home.

  Card centrada tipo "inicio de sesión" sobre el mismo fondo que la landing
  (fondo-landing.jpg), fuertemente oscurecido para que el contenido tenga todo
  el protagonismo. A propósito NO hay botón de volver: el flujo (GameFlow) no
  deja avanzar/salir hasta ingresar el Gmail.

  min-h-[100dvh] permite crecer si el teclado móvil o una pregunta empujan el
  contenido; la card queda centrada mientras entra.
*/
export default function GameFormPage() {
  return (
    <main className="relative isolate flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-12">
      {/* Fondo a sangre, muy oscurecido */}
      <Image
        src={heroGame}
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-black/78 backdrop-blur-[2px]"
      />

      <GameFlow />
    </main>
  );
}
