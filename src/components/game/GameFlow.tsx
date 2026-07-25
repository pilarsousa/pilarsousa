"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Download, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { QUIZ_QUESTIONS, REWARD_PDF } from "@/components/game/game-config";

/*
  Flujo de /game/form, en una card centrada tipo "inicio de sesión".

  Paso 1 (login): pide el Gmail. "Continuar" queda deshabilitado hasta que el
  correo sea válido. Arriba a la izquierda hay un botón para volver a /game/home.

  Paso 2 (quiz): las 6 preguntas de QUIZ_QUESTIONS (game-config.ts), de a una,
  con barra de progreso. Al terminar envía { email, answers } a /api/game-quiz
  (hoy un stub, listo para conectar la base de datos).

  Paso 3 (done): confirmación.

  NOTA: validamos un correo con formato válido (no forzamos @gmail.com). Si querés
  restringirlo sólo a Gmail, cambiá EMAIL_RE por /@gmail\.com$/i.
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Stage = "login" | "quiz" | "existing" | "done";
type Status = "idle" | "submitting" | "error";
/* Fila devuelta por /api/game-quiz/lookup (columnas respuesta_1 … respuesta_6). */
type ExistingRow = Record<string, string | null>;

const FIELD_CLASS =
  "h-11 w-full rounded-sm border bg-white/3 px-4 font-sans text-sm font-light text-white placeholder:text-white/70 outline-none transition-all duration-300";

export function GameFlow() {
  const [stage, setStage] = useState<Stage>("login");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [existing, setExisting] = useState<ExistingRow | null>(null);

  const total = QUIZ_QUESTIONS.length;
  const emailValid = EMAIL_RE.test(email.trim());

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailValid) {
      setEmailError("Ingresá un correo válido, por ejemplo: nombre@gmail.com");
      return;
    }
    setEmailError(null);
    setStatus("submitting");
    try {
      // ¿Este Gmail ya tiene respuestas cargadas? Si es así, las mostramos.
      const res = await fetch("/api/game-quiz/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error(`lookup failed: ${res.status}`);
      const data: { found: boolean; row?: ExistingRow } = await res.json();
      setStatus("idle");
      if (data.found && data.row) {
        setExisting(data.row);
        setStage("existing");
      } else {
        setStage("quiz");
      }
    } catch {
      setStatus("idle");
      setEmailError("No pudimos verificar tu correo. Probá de nuevo.");
    }
  }

  function setAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function submitQuiz() {
    setStatus("submitting");
    try {
      const res = await fetch("/api/game-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), answers }),
      });
      if (!res.ok) throw new Error(`quiz failed: ${res.status}`);
      setStatus("idle");
      setStage("done");
    } catch {
      setStatus("error");
    }
  }

  function handleNext() {
    if (qIndex < total - 1) {
      setQIndex((i) => i + 1);
    } else {
      void submitQuiz();
    }
  }

  /* ───────────────────────────── Paso: login ───────────────────────────── */
  if (stage === "login") {
    return (
      <Card>
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-4 grid size-12 place-items-center rounded-full border border-cyan/40 text-cyan shadow-[0_0_18px_rgba(40,191,241,0.25)]">
            <Mail size={22} aria-hidden />
          </span>
          <h1 className="font-display text-2xl tracking-tight text-white">
            Iniciá tu partida
          </h1>
          <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
            Ingresá tu Gmail para acceder.
            <br />
            No vas a poder continuar sin él.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="game-gmail"
              className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-white"
            >
              Tu Gmail
            </label>
            <input
              id="game-gmail"
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              aria-invalid={emailError ? "true" : undefined}
              aria-describedby={emailError ? "game-gmail-error" : undefined}
              className={cn(
                FIELD_CLASS,
                emailError
                  ? "border-hot-pink/70 focus:border-hot-pink focus:shadow-[0_0_18px_rgba(249,2,129,0.3)]"
                  : "border-cyan/20 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(40,191,241,0.25)]",
              )}
            />
            {emailError && (
              <p
                id="game-gmail-error"
                className="font-sans text-xs font-light text-hot-pink"
              >
                {emailError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!emailValid || status === "submitting"}
            className="neon-btn neon-btn--soft inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-bold uppercase tracking-[0.06em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{status === "submitting" ? "Verificando…" : "Continuar"}</span>
            {status !== "submitting" && <ArrowRight size={20} aria-hidden />}
          </button>
        </form>
      </Card>
    );
  }

  /* ───────────────────────────── Paso: quiz ────────────────────────────── */
  if (stage === "quiz") {
    const q = QUIZ_QUESTIONS[qIndex];
    const answer = answers[q.id] ?? "";
    const answered = answer.trim().length > 0;
    const isLast = qIndex === total - 1;

    return (
      <Card>
        {/* Progreso */}
        <div className="mb-6">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cyan">
            Pregunta {qIndex + 1} de {total}
          </p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan transition-all duration-500"
              style={{ width: `${((qIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-lg leading-snug tracking-tight text-white sm:text-xl">
              {q.question}
            </h2>

            {/* Respuesta de texto libre */}
            <textarea
              value={answer}
              onChange={(e) => setAnswer(q.id, e.target.value)}
              rows={5}
              placeholder="Escribí tu respuesta…"
              className="mt-5 w-full resize-none rounded-lg border border-cyan/25 bg-white/3 px-4 py-3 font-sans text-sm font-light leading-relaxed text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(40,191,241,0.25)]"
            />
          </motion.div>
        </AnimatePresence>

        {status === "error" && (
          <p role="alert" className="mt-4 font-sans text-xs font-light text-hot-pink">
            No pudimos guardar tus respuestas. Probá de nuevo.
          </p>
        )}

        {/* Navegación */}
        <div className="mt-7 flex items-center gap-3">
          {qIndex > 0 && (
            <button
              type="button"
              onClick={() => setQIndex((i) => i - 1)}
              disabled={status === "submitting"}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-white/20 px-5 font-sans text-sm font-medium text-white/80 transition-colors duration-300 hover:border-cyan hover:text-cyan disabled:opacity-60"
            >
              <ArrowLeft size={18} aria-hidden />
              <span>Atrás</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!answered || status === "submitting"}
            className="neon-btn neon-btn--soft inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold uppercase tracking-[0.06em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>
              {status === "submitting"
                ? "Enviando…"
                : isLast
                  ? "Finalizar"
                  : "Siguiente"}
            </span>
            {!isLast && status !== "submitting" && (
              <ArrowRight size={18} aria-hidden />
            )}
          </button>
        </div>
      </Card>
    );
  }

  /* ────────────────── Paso: respuestas previas (Gmail existente) ───────────── */
  if (stage === "existing" && existing) {
    return (
      <Card>
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl tracking-tight text-white">
            Ya completaste el cuestionario
          </h1>
          <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/65">
            Estas son las respuestas que cargaste con{" "}
            <span className="text-cyan">{email.trim()}</span>.
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {QUIZ_QUESTIONS.slice(0, 6).map((q, i) => (
            <li key={q.id} className="flex flex-col gap-1">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-white/50">
                {q.question}
              </p>
              <p className="font-sans text-sm font-light text-white">
                {existing[`respuesta_${i + 1}`] ?? "—"}
              </p>
            </li>
          ))}
        </ul>

        <RewardDownloadButton className="mt-7 w-full" />
      </Card>
    );
  }

  /* ───────────────────────────── Paso: done ────────────────────────────── */
  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="grid size-16 place-items-center rounded-full border-2 border-[#4ade80] text-[#4ade80] shadow-[0_0_24px_rgba(74,222,128,0.5)]"
        >
          <Check size={32} aria-hidden />
        </motion.span>
        <h2 className="mt-6 font-display text-2xl tracking-tight text-white">
          ¡Listo!
        </h2>
        <p className="mt-3 max-w-sm font-sans text-sm font-light leading-relaxed text-white/70">
          Guardamos tus respuestas. Gracias por completar el cuestionario.
        </p>
        <RewardDownloadButton className="mt-7" />
      </div>
    </Card>
  );
}

/* Card contenedora neón, compartida por los tres pasos. */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-md rounded-2xl border border-cyan/25 bg-surface/90 p-7 shadow-[0_0_40px_rgba(40,191,241,0.15)] backdrop-blur-md sm:p-9">
      {children}
    </div>
  );
}

function RewardDownloadButton({ className }: { className?: string }) {
  return (
    <a
      href={REWARD_PDF}
      download="recompensa.pdf"
      className={cn(
        "neon-btn neon-btn--soft inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-7 text-center text-sm font-bold uppercase tracking-[0.06em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-base",
        className,
      )}
    >
      <Download size={20} aria-hidden />
      <span>Descargar recompensa</span>
    </a>
  );
}
