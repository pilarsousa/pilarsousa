"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { KeyRound, Download, Lock, CheckCircle2 } from "lucide-react";
import {
  isValidCode,
  UNLOCK_CONTENT,
  CONTENT_PDF,
} from "@/components/game/game-config";

/*
  Modal del botón "Canjear código".

  Dos pasos:
   1. "input"    — el visitante escribe el código. La validación es en el cliente
                   (isValidCode, ver game-config.ts). Código incorrecto → mensaje
                   de error + sacudida del panel (framer-motion).
   2. "unlocked" — código correcto: se muestra el contenido como vista previa
                   (UNLOCK_CONTENT) y un botón que descarga el PDF (CONTENT_PDF).

  Reutiliza el patrón de accesibilidad del modal de Misión Origen: role/dialog,
  cierre por backdrop / botón X / Escape, y bloqueo del scroll del body mientras
  está abierto. Al abrir se resetea siempre al paso 1.
*/

type CodeModalProps = {
  onClose: () => void;
};

type Step = "input" | "unlocked";

/* Se monta sólo mientras está abierta (ver GameActions): por eso el estado
   arranca limpio en cada apertura y el efecto no necesita resetear nada. */
export function CodeModal({ onClose }: CodeModalProps) {
  const [step, setStep] = useState<Step>("input");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shake = useAnimationControls();

  // Foco en el input al montar, cierre por Escape y bloqueo de scroll del body.
  useEffect(() => {
    // Foco tras el primer frame, cuando el input ya está montado.
    const focus = requestAnimationFrame(() => inputRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(focus);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isValidCode(code)) {
      setError(false);
      setStep("unlocked");
      return;
    }
    // Código inválido: marcar error y sacudir el panel.
    setError(true);
    shake.start({
      x: [0, -10, 10, -7, 7, -3, 0],
      transition: { duration: 0.45 },
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Canjear código"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      />

      {/* Panel */}
      <motion.div
        animate={shake}
        className="relative w-full max-w-md animate-[fadeIn_0.25s_ease-out]"
      >
        {/* Botón de cierre (X) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute -top-3 -right-3 z-10 flex size-9 items-center justify-center rounded-full border border-cyan/40 bg-black/90 text-white transition-colors duration-300 hover:border-cyan hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden
            className="size-4"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* beam-card: el haz de luz cian que recorre el borde, el mismo efecto
            que las cards de "La Proyección" en Misión Origen. El haz vive DETRÁS
            del fondo (::before en z-index -1), por eso el panel usa un fondo
            translúcido y NO lleva overflow-hidden; el recorte de las esquinas del
            contenido lo hace el wrapper interno. */}
        <div className="beam-card rounded-2xl border border-cyan/25 bg-surface/70 shadow-[0_0_40px_rgba(40,191,241,0.15)] backdrop-blur-md">
          <div className="overflow-hidden rounded-2xl">
            {step === "input" ? (
            /* ─────────────── Paso 1 — ingresar código ─────────────── */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7">
              <div className="flex flex-col items-center text-center">
                <span className="mb-4 flex size-14 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan shadow-[0_0_20px_rgba(40,191,241,0.3)]">
                  <Lock size={26} aria-hidden />
                </span>
                <h2 className="font-display text-xl tracking-tight text-white">
                  Ingresá el código
                </h2>
                <p className="mt-2 font-sans text-sm font-light text-white/60">
                  Escribí el código que te dieron para desbloquear el contenido.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="game-code" className="sr-only">
                  Código de acceso
                </label>
                <input
                  ref={inputRef}
                  id="game-code"
                  type="text"
                  name="code"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="XXXX-XXXX"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (error) setError(false);
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "game-code-error" : undefined}
                  className={[
                    "h-12 w-full rounded-sm border bg-white/3 px-4 text-center font-display text-lg uppercase tracking-[0.2em] text-white outline-none transition-all duration-300 placeholder:tracking-[0.15em] placeholder:text-white/30",
                    error
                      ? "border-hot-pink/70 focus:border-hot-pink focus:shadow-[0_0_18px_rgba(249,2,129,0.3)]"
                      : "border-cyan/25 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(40,191,241,0.25)]",
                  ].join(" ")}
                />
                {error && (
                  <p
                    id="game-code-error"
                    role="alert"
                    className="text-center font-sans text-xs font-light text-hot-pink"
                  >
                    Código incorrecto. Revisalo e intentá de nuevo.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="neon-btn neon-btn--soft inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-6 text-base font-bold uppercase tracking-[0.06em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <KeyRound size={20} aria-hidden />
                <span>Desbloquear</span>
              </button>
            </form>
          ) : (
            /* ─────────────── Paso 2 — contenido desbloqueado ─────────────── */
            <div className="flex flex-col">
              {/* Encabezado de éxito */}
              <div className="flex items-center gap-3 border-b border-cyan/15 bg-cyan/5 px-7 py-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#22c55e]/50 bg-[#15803d]/30 text-[#4ade80] shadow-[0_0_18px_rgba(34,197,94,0.4)]">
                  <CheckCircle2 size={22} aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-lg tracking-tight text-white">
                    {UNLOCK_CONTENT.title}
                  </h2>
                  <p className="font-sans text-xs font-light text-white/60">
                    {UNLOCK_CONTENT.intro}
                  </p>
                </div>
              </div>

              {/* Vista previa del contenido — scrollea sólo este bloque, la
                  pantalla de fondo sigue sin scroll. */}
              <div className="max-h-[45vh] overflow-y-auto px-7 py-5">
                <div className="flex flex-col gap-5">
                  {UNLOCK_CONTENT.sections.map((section, i) => (
                    <section key={i}>
                      <h3 className="font-display text-sm uppercase tracking-[0.12em] text-cyan">
                        {section.heading}
                      </h3>
                      <p className="mt-2 font-sans text-sm font-light leading-relaxed text-white/75">
                        {section.body}
                      </p>
                      {section.bullets && (
                        <ul className="mt-2 flex flex-col gap-1.5">
                          {section.bullets.map((bullet, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 font-sans text-sm font-light text-white/70"
                            >
                              <span
                                aria-hidden
                                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-hot-pink shadow-[0_0_8px_rgba(249,2,129,0.7)]"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              </div>

              {/* Descarga del PDF */}
              <div className="border-t border-cyan/15 px-7 py-5">
                <a
                  href={CONTENT_PDF}
                  download
                  className="neon-btn inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full px-6 text-base font-bold uppercase tracking-[0.06em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <Download size={20} aria-hidden />
                  <span>Descargar PDF</span>
                </a>
              </div>
            </div>
          )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
