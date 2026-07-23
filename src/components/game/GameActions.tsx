"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { KeyRound, Gamepad2 } from "lucide-react";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { CodeModal } from "@/components/game/CodeModal";

/*
  Contenido interactivo de /game: título + dos botones + la modal del código.

  Botón 1 ("Canjear código") abre <CodeModal> sin salir de la pantalla.
  Botón 2 ("Completar formulario") navega a la página interna /game/form.

  Las animaciones de entrada usan framer-motion (ya es dependencia del proyecto,
  igual que en Reveal). Al ser pantalla única sin scroll, animamos on-mount con
  `animate` en vez de `whileInView`.
*/

/* Variantes de entrada escalonada para el título y los botones. */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function GameActions() {
  const [codeOpen, setCodeOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-3xl flex-col items-start px-6 pb-16 text-left sm:pl-12 md:px-0 md:pb-0 md:pr-8 md:ml-44 lg:ml-[331px] [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="section-eyebrow text-cyan"
        >
          Nivel desbloqueado
        </motion.p>

        {/* Título */}
        <motion.h1
          variants={item}
          className="mt-4 font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          <NeonText variant="multi">Elegí tu jugada</NeonText>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={item}
          className="mt-4 max-w-md font-sans text-base font-light leading-relaxed text-white/70"
        >
          Ingresá tu código para desbloquear el contenido, o completá el
          formulario para llevarte tu recompensa.
        </motion.p>

        {/* Botones — apilados a la izquierda, ancho parejo para textos largos */}
        <motion.div
          variants={item}
          className="mt-9 flex w-full max-w-sm flex-col items-stretch gap-4"
        >
          {/* Botón 1 — Las 33 Leyes Universales (abre la modal del código) */}
          <button
            type="button"
            onClick={() => setCodeOpen(true)}
            className="neon-btn group inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-6 text-center text-sm font-bold uppercase tracking-[0.05em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-base"
          >
            <KeyRound size={20} className="shrink-0" aria-hidden />
            <span>Las 33 Leyes Universales</span>
          </button>

          {/* Botón 2 — Archivo Oculto (navega a /game/form) */}
          <Link
            href="/game/form"
            className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-cyan/50 px-6 text-center text-sm font-bold uppercase tracking-[0.05em] text-cyan shadow-[0_0_12px_rgba(40,191,241,0.18)] transition-all duration-300 ease-out active:scale-95 hover:border-cyan hover:bg-cyan/5 hover:shadow-[0_0_28px_rgba(40,191,241,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan sm:text-base"
          >
            <Gamepad2 size={20} className="shrink-0" aria-hidden />
            <span>Archivo Oculto</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Montamos la modal sólo cuando está abierta: así su estado (paso, código,
          error) nace limpio cada vez, sin necesidad de resetearlo en un efecto. */}
      {codeOpen && <CodeModal onClose={() => setCodeOpen(false)} />}
    </>
  );
}
