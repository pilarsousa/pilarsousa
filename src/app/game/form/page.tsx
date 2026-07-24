import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import heroGame from "@/../public/game/game-img/hero-game.jpg";
import { GameForm } from "@/components/game/GameForm";

/*
  /game/form — página interna del segundo botón de /game.

  Mismo fondo que la landing (hero-game.jpg) pero fuertemente oscurecido, para
  que el formulario, montado en una tarjeta neón, tenga todo el protagonismo.
  A diferencia de /game, esta página sí puede crecer y hacer scroll si el
  teclado móvil o los mensajes de error empujan el contenido (min-h-[100dvh]).
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

      {/* Volver a /game */}
      <Link
        href="/game"
        className="absolute left-5 top-5 inline-flex items-center gap-1.5 font-sans text-sm font-light text-white/70 transition-colors duration-300 hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
      >
        <ArrowLeft size={18} aria-hidden />
        <span>Volver</span>
      </Link>

      {/* Tarjeta del formulario */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-cyan/25 bg-surface/90 p-7 shadow-[0_0_40px_rgba(40,191,241,0.15)] backdrop-blur-md sm:p-9">
        <div className="mb-6 text-center">
          <p className="section-eyebrow text-cyan">Último paso</p>
          <h1 className="mt-3 font-display text-2xl tracking-tight text-white sm:text-3xl">
            Completá tus datos
          </h1>
          <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
            Dejanos tus datos y desbloqueá tu recompensa al instante.
          </p>
        </div>

        <GameForm />
      </div>
    </main>
  );
}
