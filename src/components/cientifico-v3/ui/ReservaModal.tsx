"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Wordmark } from "@/components/cientifico-v3/ui/Wordmark";
import { ReservaForm } from "@/components/cientifico-v3/ui/ReservaForm";

type ReservaModalContextValue = {
  open: () => void;
  close: () => void;
};

const ReservaModalContext = createContext<ReservaModalContextValue | null>(null);

/** Abre el modal de registro desde cualquier componente de la landing. */
export function useReservaModal() {
  const ctx = useContext(ReservaModalContext);
  if (!ctx) {
    throw new Error("useReservaModal must be used within <ReservaModalProvider>");
  }
  return ctx;
}

/**
 * Modal de registro de /cientifico-v3 (misma mecánica que v1: se cierra con el
 * fondo, la X o Escape, y bloquea el scroll mientras está abierto). Todos los
 * BotonEntrada lo abren.
 */
export function ReservaModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <ReservaModalContext.Provider value={{ open, close }}>
      {children}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv3-modal-titulo"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={close}
            className="absolute inset-0 cursor-default bg-[#07060b]/75 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          />

          <div className="relative w-full max-w-md animate-[fadeIn_0.25s_ease-out]">
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute -right-3 -top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/15 bg-[#1e1a28] text-foreground transition-colors duration-300 hover:border-[#7da89a] hover:text-[#94c7b6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7da89a]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden className="size-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative overflow-hidden rounded-[14px] border border-white/10 bg-[#17141f] p-6 shadow-[0_30px_80px_-20px_rgba(75,58,107,0.6)] sm:p-8">
              {/* Filo superior con el degradado de marca */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#a391b8,#7da89a)]" />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(75,58,107,0.45),transparent)]"
              />

              <div className="relative flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Wordmark className="text-xl" />
                  <h2 id="cv3-modal-titulo" className="text-2xl font-extrabold leading-tight text-foreground">
                    Asegura tu <span className="cv3-grad-texto">entrada gratuita</span>
                  </h2>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    Completa tus datos y te enviamos el acceso al laboratorio.
                  </p>
                </div>

                <ReservaForm onSuccess={close} />
              </div>
            </div>
          </div>
        </div>
      )}
    </ReservaModalContext.Provider>
  );
}
