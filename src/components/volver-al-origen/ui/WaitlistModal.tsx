"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MatrixRain } from "@/components/bootcamp/ui/MatrixRain";
import { ModalLaser } from "@/components/volver-al-origen/ui/ModalLaser";
import { LogoVao } from "@/components/volver-al-origen/ui/LogoVao";
import { SparkDivider } from "@/components/volver-al-origen/ui/SparkDivider";
import { WaitlistForm } from "@/components/volver-al-origen/ui/WaitlistForm";
import { HERO, MODAL } from "@/components/volver-al-origen/content";

/*
  Modal de la lista de espera. El formulario vive aquí y en ningún otro sitio:
  todos los CTA de la landing lo abren, en lugar de llevar de vuelta al hero.

  Se monta una sola vez, en el layout, y se abre desde cualquier CTA con
  useWaitlistModal(). Así el estado no depende de qué sección lo pidió y no hay
  un formulario por CTA.

  Cierra con la X, con clic en el fondo y con Escape. Las tres salidas son
  necesarias: la X es la evidente, el fondo es lo que la gente intenta primero
  en móvil, y Escape es lo que espera quien navega con teclado.
*/

type WaitlistModalContextValue = {
  open: () => void;
  close: () => void;
};

const WaitlistModalContext = createContext<WaitlistModalContextValue | null>(
  null,
);

/** Abre el modal desde cualquier componente cliente de la landing. */
export function useWaitlistModal() {
  const ctx = useContext(WaitlistModalContext);
  if (!ctx) {
    throw new Error(
      "useWaitlistModal debe usarse dentro de <WaitlistModalProvider>",
    );
  }
  return ctx;
}

/* Debe coincidir con la duración de las animaciones de salida
   (.vo-modal-closing en globals.css). Si se cambia allí, se cambia aquí. */
const CLOSE_MS = 200;

export function WaitlistModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Tres estados y no un booleano: "closing" es lo que mantiene el modal en el
     DOM mientras corre la animación de salida. Con un booleano el panel
     desaparecería de golpe y la animación de cierre no se vería nunca. */
  const [state, setState] = useState<"closed" | "open" | "closing">("closed");
  const closeTimer = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  /* Elemento que tenía el foco al abrir, para devolvérselo al cerrar: si no,
     quien navega con teclado vuelve al principio del documento. */
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    lastFocused.current = document.activeElement as HTMLElement | null;
    setState("open");
  }, []);

  const close = useCallback(() => {
    setState((current) => (current === "open" ? "closing" : current));
  }, []);

  /* Desmontaje diferido: espera a que la animación de salida termine.
     Bajo prefers-reduced-motion el reset global deja la animación en 0,01 ms,
     así que el timer sigue siendo correcto — sólo se percibe como instantáneo. */
  useEffect(() => {
    if (state !== "closing") return;
    closeTimer.current = window.setTimeout(() => {
      setState("closed");
      closeTimer.current = null;
      lastFocused.current?.focus?.();
    }, CLOSE_MS);
    return () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
    };
  }, [state]);

  /* Escape para cerrar y bloqueo del scroll de fondo mientras está abierto.
     El bloqueo se mantiene también durante "closing": liberarlo antes deja que
     la página salte bajo el panel justo mientras se desvanece. */
  useEffect(() => {
    if (state === "closed") return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [state, close]);

  /* Foco al panel en cuanto abre, para que el lector de pantalla anuncie el
     diálogo y el teclado entre dentro en lugar de seguir en la página. */
  useEffect(() => {
    if (state !== "open") return;
    panelRef.current?.focus();
  }, [state]);

  return (
    <WaitlistModalContext.Provider value={{ open, close }}>
      {children}

      {state !== "closed" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={MODAL.title}
          /* vo-scope: el provider vive FUERA del div con overflow-x-clip para
             que el backdrop-filter funcione en iOS, y eso deja al modal fuera
             del scope de la landing. Repetir la clase aquí le devuelve los
             tokens semánticos (foreground, accent, la fuente) sin volver a
             meterlo bajo un ancestro que recorta overflow.

             z-index 300: por encima del desenfoque inferior del layout (40) y
             del modal de reseñas (200), que si no taparían el formulario. */
          className={`vo-scope fixed inset-0 z-300 flex items-center justify-center p-4 ${
            state === "closing" ? "vo-modal-closing" : ""
          }`}
        >
          {/* Fondo. Es un <button> y no un <div> para que cerrar haciendo clic
              fuera exista también para el teclado y los lectores de pantalla. */}
          <button
            type="button"
            aria-label={MODAL.close}
            onClick={close}
            className="vo-modal-backdrop absolute inset-0 cursor-default"
          />

          {/* data-lenis-prevent: sin esto el scroll suave de la landing se come
              el scroll interno y en pantallas bajas el formulario queda
              inalcanzable.

              El padding se movió al contenido de dentro: la lluvia de código
              tiene que llegar a los bordes del panel, y con el padding aquí se
              habría quedado recortada a la caja interior. */}
          <div
            ref={panelRef}
            tabIndex={-1}
            data-lenis-prevent
            /* overflow-hidden y NO overflow-y-auto: el panel no debe scrollear.
               El contenido de dentro escala con vw para caber entero en la
               pantalla más baja, así que el scroll sólo podía aparecer si algo
               se desbordaba — y en un formulario de tres campos con su botón,
               tener que desplazar para llegar a enviar es perder registros. */
            className="vo-modal-panel relative max-h-[92svh] w-full max-w-[520px] overflow-hidden rounded-lg border border-vo-bone/15 bg-vo-black/80 text-center text-foreground shadow-[0_30px_90px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl outline-none"
          >
            {/* Lluvia de código y haz de luz, en una capa que cubre EXACTAMENTE
                el panel.

                absolute inset-0, y no la capa sticky de alto 92svh que había
                antes. Aquel alto era una fracción de la pantalla, no del panel:
                como el panel mide lo que su contenido, el canvas se extendía muy
                por debajo de él y el haz —que se sitúa respecto al centro de su
                canvas— acababa apuntando fuera. En el emulador del navegador
                coincidían lo suficiente como para que no se notara; en un iPhone
                real, con su barra de direcciones, no.

                El sticky ya no hace falta porque el panel dejó de scrollear. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="relative size-full">
                <MatrixRain fade={0.08} opacity={0.4} />

                {/* Haz de luz que baja hasta el CTA, igual que en el hero.

                    mix-blend-screen es OBLIGATORIO, no decorativo: el renderer
                    va con alpha:false y pinta fondo negro opaco, así que sin
                    mezclar por luz taparía el panel entero con un rectángulo
                    negro. Con screen el negro es neutro y sólo se suma lo que
                    el haz ilumina.

                    Va DESPUÉS de la lluvia para sumarse sobre ella; ambos
                    quedan por debajo del contenido, que lleva su propio
                    relative. */}
                <div className="absolute inset-0 mix-blend-screen">
                  <ModalLaser />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label={MODAL.close}
              /* z-20 y no z-10: tiene que quedar por encima de la lluvia de
                 código, que ahora ocupa todo el fondo del panel. */
              className="absolute right-4 top-4 z-20 flex size-9 cursor-pointer items-center justify-center rounded-full border border-accent/35 bg-vo-black/70 text-foreground/80 transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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

            {/* relative: sube el contenido por encima de la lluvia, que si no
                le pasaría por delante y dejaría el texto entre caracteres.

                Aquí vive el padding que antes estaba en el panel, para que la
                textura llegue a los bordes y el contenido siga con su margen. */}
            {/* Todo escala con vw acotado por clamp, por el mismo motivo que el
                panel del hero: el modal no scrollea, así que tiene que caber
                entero —con el botón de enviar a la vista— tanto en una pantalla
                de móvil pequeño como en escritorio. */}
            <div className="relative px-[clamp(1rem,4.5vw,1.5rem)] py-[clamp(1.1rem,4vw,2.25rem)] sm:px-9">
              <LogoVao className="mx-auto w-[clamp(3.25rem,13vw,5rem)] sm:w-24" />

              {/* El badge y el título repiten los del hero: el modal tapa la
                  página, así que tiene que decir por sí solo a qué se está
                  apuntando el visitante. */}
              <p className="mt-[clamp(0.6rem,2.2vw,1.25rem)] inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-[clamp(0.7rem,3vw,1rem)] py-[clamp(0.25rem,1.2vw,0.375rem)] font-display text-[clamp(0.6rem,2.4vw,0.75rem)] uppercase tracking-[0.32em] text-accent">
                <span className="-mr-[0.32em]">{HERO.eyebrow}</span>
              </p>

              <h2 className="mt-[clamp(0.4rem,1.6vw,0.75rem)] font-display uppercase leading-[1.08]">
                <span className="block text-[clamp(1.25rem,5.4vw,1.5rem)] tracking-[0.05em] sm:text-3xl">
                  {MODAL.title}
                </span>
              </h2>

              <SparkDivider className="mt-[clamp(0.5rem,2vw,1rem)]" />

              <p className="mt-[clamp(0.5rem,2vw,1rem)] font-sans text-[clamp(0.75rem,3.1vw,0.875rem)] leading-snug text-foreground/85 sm:text-base sm:leading-relaxed">
                {MODAL.intro}
              </p>

              {/* El formulario cierra el modal al confirmar, justo antes de
                  navegar a gracias. Sin esto el panel se quedaba montado sobre
                  la página de destino. */}
              {/* El aviso de privacidad que iba aquí debajo se retiró: eran las
                  dos líneas que empujaban el CTA fuera de pantalla y obligaban
                  a scrollear dentro del modal para llegar a él. En un panel que
                  ya es corto, el botón tiene que verse sin desplazar nada. */}
              <div className="mt-6">
                <WaitlistForm onSuccess={close} />
              </div>
            </div>
          </div>
        </div>
      )}
    </WaitlistModalContext.Provider>
  );
}
