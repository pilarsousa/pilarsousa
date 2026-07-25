import Image from "next/image";
import Link from "next/link";
import fondoLanding from "@/../public/game/game-img/fondo-landing.jpg";
import { NeonText } from "@/components/mision-origen/ui/NeonText";

/*
  /game — landing de entrada, una sola pantalla, sin scroll.

  Estructura simple: la imagen fondo-landing.jpg a sangre (object-cover llena la
  pantalla) y, encima, un rectángulo negro al 70% de opacidad que cubre todo el
  ancho y alto para oscurecer el fondo y que resalte el texto.

  Sobre esas dos capas, centrado, el mensaje y el botón "Dar mi salto cuántico",
  que navega a /game/home. El botón reusa la clase .neon-btn (mismo tratamiento
  de color/glow que los botones anteriores de /game).

  h-[100dvh] + overflow-hidden garantizan el "sin scroll" incluso en móviles.
*/
export default function GamePage() {
  return (
    <main className="relative isolate flex h-[100dvh] w-full items-center justify-center overflow-hidden">
      {/* Fondo a sangre */}
      <Image
        src={fondoLanding}
        alt=""
        aria-hidden
        fill
        priority
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover object-center"
      />

      {/* Rectángulo negro al 70% — oscurece el fondo en todo el ancho y alto */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/70" />

      {/* Contenido centrado */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-6 text-center [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
        <h1 className="font-[family-name:var(--font-press-start)] text-base leading-relaxed tracking-tight text-white sm:text-lg lg:text-xl">
          Estás a un salto de acceder a herramientas que van a{" "}
          <NeonText variant="multi">evolucionar tu personaje</NeonText>
        </h1>

        <Link
          href="/game/home"
          className="neon-btn mt-10 inline-flex h-14 items-center justify-center rounded-full px-8 text-center font-[family-name:var(--font-pixelify)] text-sm font-bold uppercase tracking-[0.05em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-base"
        >
          Dar mi salto cuántico
        </Link>
      </div>
    </main>
  );
}
