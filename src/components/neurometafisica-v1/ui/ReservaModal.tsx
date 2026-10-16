"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, Radio } from "lucide-react";
import { Wordmark } from "@/components/neurometafisica-v1/ui/Wordmark";
import { ReservaForm } from "@/components/neurometafisica-v1/ui/ReservaForm";
import { MarcoInscripcion } from "@/components/neurometafisica-v1/ui/MarcoInscripcion";
import { ConfirmacionPlaza } from "@/components/neurometafisica-v1/ui/ConfirmacionPlaza";
import { lenisActual } from "@/components/neurometafisica-v1/ui/ScrollSuave";
import { FECHA_CORTA, MODAL, ZONA_HORARIA } from "@/components/neurometafisica-v1/content";
import { horaEn } from "@/components/neurometafisica-v1/horario";

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

const GRACIAS = "/neurometafisica-v1/gracias";

/** Lo que se ve "Plaza confirmada" antes de ir a la gracias. */
const ESPERA_CONFIRMACION = 2900;

/**
 * Modal de registro de /neurometafisica-v1 (misma mecánica que v1: se cierra con el
 * fondo, la X o Escape, y bloquea el scroll mientras está abierto). Todos los
 * BotonEntrada lo abren.
 *
 * Al registrarse, el modal deja lugar a "Plaza confirmada"
 * (ConfirmacionPlaza.tsx) y después se navega a la gracias. El provider vive
 * en el layout, así que sigue montado al cambiar de página: la pantalla tapa
 * la carga y se desvanece recién cuando la gracias ya está.
 */
export function ReservaModalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmada, setConfirmada] = useState<{ nombre: string; saliendo: boolean } | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const confirmar = useCallback(
    (nombre: string) => {
      setIsOpen(false);
      setConfirmada({ nombre, saliendo: false });
      router.prefetch(GRACIAS);
      setTimeout(() => router.push(GRACIAS), ESPERA_CONFIRMACION);
    },
    [router],
  );

  /* Ya en la gracias: se desvanece (0,7s, .cv2-confirmacion) y se desmonta. */
  const enGracias = pathname === GRACIAS;
  useEffect(() => {
    if (!enGracias) return;
    const salir = setTimeout(() => setConfirmada((c) => c && { ...c, saliendo: true }), 150);
    const quitar = setTimeout(() => setConfirmada(null), 900);
    return () => {
      clearTimeout(salir);
      clearTimeout(quitar);
    };
  }, [enGracias]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    /* Con el scroll suave, la página de atrás la mueve Lenis: hay que
       frenarlo también (overflow: hidden no lo para). */
    lenisActual()?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenisActual()?.start();
    };
  }, [isOpen]);

  return (
    <ReservaModalContext.Provider value={{ open, close }}>
      {children}

      {isOpen && (
        <div
          data-lenis-prevent
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
            className="fixed inset-0 cursor-default bg-[#06120d]/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          />

          <div className="relative m-auto w-full max-w-md animate-[fadeIn_0.25s_ease-out]">
            <MarcoInscripcion
              cabecera={
                <div className="flex flex-col gap-2 pr-8">
                  <Wordmark className="text-xl" />
                  <h2 id="cv2-modal-titulo" className="text-[1.6rem] font-extrabold leading-tight text-foreground">
                    {MODAL.titulo} <span className="cv2-grad-texto">{MODAL.tituloDestacado}</span>
                  </h2>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-foreground/80">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays aria-hidden size={15} className="text-(--cv2-oro-claro)" />
                      {FECHA_CORTA} · {horaEn(ZONA_HORARIA)} (España)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Radio aria-hidden size={15} className="text-(--cv2-oro-claro)" />
                      {MODAL.formato}
                    </span>
                  </p>
                </div>
              }
            >
              <ReservaForm onSuccess={confirmar} />
            </MarcoInscripcion>

            {/* Cerrar: dentro del marco, arriba a la derecha bajo la pestaña. */}
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-[34px] z-10 flex size-8 items-center justify-center rounded-md text-foreground/60 transition-colors duration-300 hover:bg-white/5 hover:text-[#f0cf7a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9c46a]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden className="size-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {confirmada && <ConfirmacionPlaza nombre={confirmada.nombre} saliendo={confirmada.saliendo} />}
    </ReservaModalContext.Provider>
  );
}
