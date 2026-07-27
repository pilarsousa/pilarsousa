"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Lock, LockOpen } from "lucide-react";

/*
  Secuencia de desbloqueo entre "código correcto" y la CardUnicaModal.

  Dos fases:
    1. "loading"  — una barra progresiva se llena de 0 a 100% (~1.8s) con el
                    candado cerrado y el porcentaje.
    2. "done"     — el candado se abre, aparece "¡Desbloqueado!" y estalla el
                    confeti neón. Tras ~1.5s llama a onDone (el padre abre la card).

  Se monta fresco en cada desbloqueo, así que las partículas se calculan una vez
  por instancia. Bloquea el scroll del body como el resto de los modales de /game.
*/

const FILL_MS = 1800; // duración del llenado de la barra
const CELEBRATE_MS = 1600; // festejo antes de abrir la card

// Paleta neón de Volver al Origen para el confeti.
const CONFETTI_COLORS = ["#28bff1", "#8b5cf6", "#f90281", "#f3e2b0", "#aef0fe"];
const PARTICLE_COUNT = 30;

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  size: number;
  color: string;
  duration: number;
};

export function UnlockingModal({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  // onDone puede cambiar de identidad entre renders del padre; lo guardamos en
  // un ref para dispararlo exactamente una vez al terminar el festejo.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // Partículas del confeti: se calculan una sola vez por instancia.
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.35;
        const dist = 120 + Math.random() * 180;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          rotate: Math.random() * 360,
          size: 6 + Math.random() * 9,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          duration: 1 + Math.random() * 0.6,
        };
      }),
    [],
  );

  // Bloquea el scroll del body mientras la secuencia está en pantalla.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Llenado de la barra con easeOutCubic; al completar, pasa a "done" y agenda
  // la apertura de la card.
  useEffect(() => {
    let raf = 0;
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / FILL_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("done");
        openTimer = setTimeout(() => onDoneRef.current(), CELEBRATE_MS);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (openTimer) clearTimeout(openTimer);
    };
  }, []);

  const done = phase === "done";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={done ? "Contenido desbloqueado" : "Desbloqueando"}
      className="fixed inset-0 z-[210] flex items-center justify-center overflow-hidden bg-black/85 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
    >
      {/* Confeti — estalla desde el centro en la fase "done" */}
      {done && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: 0,
                scale: 0.3,
                rotate: p.rotate,
              }}
              transition={{ duration: p.duration, ease: "easeOut" }}
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 8px ${p.color}`,
              }}
              className="absolute left-1/2 top-1/2 -ml-1 -mt-1 rounded-[2px]"
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 text-center">
        {/* Ícono: candado cerrado (loading) → abierto con glow (done) */}
        <motion.span
          key={done ? "open" : "closed"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: done ? [0.6, 1.25, 1] : 1,
            opacity: 1,
          }}
          transition={{ duration: done ? 0.5 : 0.3, ease: "easeOut" }}
          className={[
            "flex size-20 items-center justify-center rounded-full border",
            done
              ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_40px_rgba(40,191,241,0.6)]"
              : "border-cyan/40 bg-cyan/10 text-cyan shadow-[0_0_24px_rgba(40,191,241,0.3)]",
          ].join(" ")}
        >
          {done ? (
            <LockOpen size={38} aria-hidden />
          ) : (
            <Lock size={38} aria-hidden />
          )}
        </motion.span>

        {/* Título de estado */}
        <div className="flex flex-col items-center gap-2">
          {done ? (
            <motion.h2
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="font-[family-name:var(--font-press-start)] text-[clamp(12px,2.4vh,20px)] leading-relaxed text-white [text-shadow:0_0_18px_rgba(40,191,241,0.7)]"
            >
              ¡Desbloqueado!
            </motion.h2>
          ) : (
            <h2 className="font-[family-name:var(--font-pixelify)] text-xl font-bold uppercase tracking-[0.12em] text-white">
              Desbloqueando…
            </h2>
          )}
        </div>

        {/* Barra progresiva (solo en loading) */}
        {!done && (
          <div className="flex w-full max-w-xs flex-col items-center gap-2">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="h-3 w-full overflow-hidden rounded-full border border-cyan/25 bg-white/5"
            >
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#28bff1_0%,#8b5cf6_100%)] shadow-[0_0_16px_rgba(40,191,241,0.6)] transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-[family-name:var(--font-pixelify)] text-sm font-bold tracking-[0.1em] text-cyan">
              {progress}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
