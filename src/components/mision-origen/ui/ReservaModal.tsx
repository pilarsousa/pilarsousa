"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ReservaPanel } from "@/components/mision-origen/ui/ReservaPanel";

type ReservaModalContextValue = {
  open: () => void;
  close: () => void;
};

const ReservaModalContext = createContext<ReservaModalContextValue | null>(null);

/** Open the reservation modal from any client component in the landing. */
export function useReservaModal() {
  const ctx = useContext(ReservaModalContext);
  if (!ctx) {
    throw new Error("useReservaModal must be used within <ReservaModalProvider>");
  }
  return ctx;
}

/**
 * Provides the reservation modal to the whole Misión Origen landing. Wraps the
 * app subtree once (in the layout); any CTA calls useReservaModal().open() to
 * pop the "Reserva tu plaza" panel over the page. Closes on backdrop click,
 * the X button, or Escape, and locks body scroll while open.
 */
export function ReservaModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Close on Escape + lock scroll while the modal is open.
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
          aria-label="Reserva tu plaza"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop — click para cerrar */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          />

          {/* Panel — se detiene la propagación para que el click adentro no cierre */}
          <div className="relative w-full max-w-md animate-[fadeIn_0.25s_ease-out]">
            {/* Botón de cierre (X) */}
            <button
              type="button"
              onClick={close}
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

            <ReservaPanel submitLabel="Dar mi salto" onSuccess={close} />
          </div>
        </div>
      )}
    </ReservaModalContext.Provider>
  );
}
