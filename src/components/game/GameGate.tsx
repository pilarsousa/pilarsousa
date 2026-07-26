"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameForm } from "@/components/game/GameForm";
import { GameMaterial } from "@/components/game/GameMaterial";
import { UnlockingModal } from "@/components/game/UnlockingModal";

/*
  Puerta de acceso al material de la 2ª card ("Archivo Oculto") de /game.

  Flujo:
    1. Si el visitante YA se registró antes en este navegador (marca en
       localStorage), salta directo al material — no vuelve a pedir datos.
    2. Si no, muestra GameForm (nombre / correo / teléfono → /api/register →
       GHL + Supabase). Al completarlo, deja la marca y muestra el material.

  El "recordar" es por navegador (localStorage), no por IP: es lo más simple y
  respetuoso de la privacidad. Si el usuario cambia de dispositivo o borra sus
  datos, se le vuelve a pedir el registro.

  Card contenedora con el mismo estilo neón que GameFlow.
*/

const ACCESS_KEY = "game_nivel2_unlocked";

/* form:      pidiendo los datos.
   unlocking: secuencia de desbloqueo (barra + candado + confeti), igual que la
              card N1, tras enviar el formulario con éxito.
   material:  el video ya visible. */
type Stage = "form" | "unlocking" | "material";

export function GameGate() {
  /* stage arranca en null = "todavía no sé" (aún no leí localStorage). Evita un
     parpadeo del formulario antes de saber si ya tenía acceso. En SSR y en el
     primer render de cliente vale null, así que no hay mismatch de hidratación:
     el contenido real se decide en el efecto. */
  const [stage, setStage] = useState<Stage | null>(null);

  useEffect(() => {
    try {
      // Si ya se desbloqueó antes en este dispositivo, va directo al material
      // (sin repetir el formulario ni la secuencia de desbloqueo).
      setStage(localStorage.getItem(ACCESS_KEY) === "1" ? "material" : "form");
    } catch {
      // localStorage puede fallar en modo privado — sin recordatorio, se pide.
      setStage("form");
    }
  }, []);

  /* Registro exitoso → guarda la marca y lanza la secuencia de desbloqueo. */
  function handleSuccess() {
    try {
      localStorage.setItem(ACCESS_KEY, "1");
    } catch {
      // best-effort: si no se puede guardar, igual seguimos al material.
    }
    setStage("unlocking");
  }

  /* Estado indeterminado: nada visible hasta saber si ya tenía acceso. */
  if (stage === null) return null;

  if (stage === "material") return <GameMaterial />;

  if (stage === "unlocking") {
    return <UnlockingModal onDone={() => setStage("material")} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-md rounded-2xl border border-cyan/25 bg-surface/90 p-7 shadow-[0_0_40px_rgba(40,191,241,0.15)] backdrop-blur-md sm:p-9"
    >
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl tracking-tight text-white">
          Desbloqueá el Archivo Oculto
        </h1>
        <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
          Completá tus datos para acceder al material. Solo lo pedimos una vez en
          este dispositivo.
        </p>
      </div>

      <GameForm source="game-nivel2" onSuccess={handleSuccess} />
    </motion.div>
  );
}
