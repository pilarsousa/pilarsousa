"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CalendarDays, Radio } from "lucide-react";
import { Wordmark } from "@/components/cientifico-v2/ui/Wordmark";
import { ReservaForm } from "@/components/cientifico-v2/ui/ReservaForm";
import { MarcoEntrada } from "@/components/cientifico-v2/ui/MarcoEntrada";
import { FECHA_CORTA, HORA } from "@/components/cientifico-v2/content";

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
 * Modal de registro de /cientifico-v2 (misma mecánica que v1: se cierra con el
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
          aria-labelledby="cv2-modal-titulo"
          /* overflow-y-auto + m-auto en el panel: en teléfonos bajos el
             modal puede ser más alto que la pantalla y se scrollea. */
          className="fixed inset-0 z-[200] flex overflow-y-auto p-4"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={close}
            className="fixed inset-0 cursor-default bg-[#07060b]/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          />

          <div className="relative m-auto w-full max-w-md animate-[fadeIn_0.25s_ease-out]">
            <MarcoEntrada
              cabecera={
                <div className="flex flex-col gap-2 pr-8">
                  <Wordmark className="text-xl" />
                  <h2 id="cv2-modal-titulo" className="text-[1.6rem] font-extrabold leading-tight text-foreground">
                    Asegura tu <span className="cv2-grad-texto">entrada gratuita</span>
                  </h2>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-foreground/80">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays aria-hidden size={15} className="text-(--cv2-violeta)" />
                      {FECHA_CORTA} · {HORA}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Radio aria-hidden size={15} className="text-(--cv2-violeta)" />
                      En vivo online
                    </span>
                  </p>
                </div>
              }
            >
              <ReservaForm onSuccess={close} />
            </MarcoEntrada>

            {/* Cerrar: dentro del marco, arriba a la derecha bajo la pestaña. */}
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-[34px] z-10 flex size-8 items-center justify-center rounded-md text-foreground/60 transition-colors duration-300 hover:bg-white/5 hover:text-[#94c7b6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7da89a]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden className="size-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </ReservaModalContext.Provider>
  );
}
