import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import fondoForm from "@/../public/game/game-img/fondo-form.jpg";
import { GameFlow } from "@/components/game/GameFlow";
import { GameGate } from "@/components/game/GameGate";

/*
  /game/form — destino al tocar cualquiera de las dos cards de /game/home.

  Card centrada tipo "inicio de sesión" sobre fondo-form.jpg: un fondo ya oscuro
  en el centro (para que el contenido resalte) y decorado con enredaderas neón en
  los bordes. Por eso el overlay es suave (no lo tapa) y sumamos la viñeta de
  bordes (.game-edge-shadow) para enmarcar, igual que el resto de /game.

  El parámetro ?nivel decide qué flujo se muestra:
    - nivel=2  → GameGate: registro (nombre/correo/teléfono → GHL+Supabase) que
                 desbloquea el material de la 2ª card ("Archivo Oculto").
    - resto    → GameFlow: el cuestionario de 6 preguntas (flujo original).

  Arriba a la izquierda hay un botón para volver a /game/home.

  min-h-[100dvh] permite crecer si el teclado móvil o el contenido empujan; la
  card queda centrada mientras entra.
*/
export default async function GameFormPage({
  searchParams,
}: {
  searchParams: Promise<{ nivel?: string }>;
}) {
  const { nivel } = await searchParams;
  const isNivel2 = nivel === "2";

  return (
    <main className="relative isolate flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-12">
      {/* Fondo a sangre */}
      <Image
        src={fondoForm}
        alt=""
        aria-hidden
        fill
        priority
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover object-center"
      />
      {/* Oscurecido suave — deja ver las enredaderas de los bordes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-black/30"
      />

      {!isNivel2 && (
        /* Volver a /game/home — arriba a la izquierda para el flujo original.
           En nivel 2, el botón vive dentro de la card única ornamental. */
        <Link
          href="/game/home"
          aria-label="Volver a inicio"
          className="absolute left-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full border border-cyan/70 bg-cyan/10 text-cyan shadow-[0_0_16px_rgba(40,191,241,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-cyan hover:bg-cyan/20 hover:shadow-[0_0_24px_rgba(40,191,241,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <ArrowLeft size={20} aria-hidden />
        </Link>
      )}

      {isNivel2 ? <GameGate /> : <GameFlow />}

      {/* Viñeta/sombra en los bordes */}
      <div
        aria-hidden
        className="game-edge-shadow pointer-events-none absolute inset-0 z-20"
      />
    </main>
  );
}
