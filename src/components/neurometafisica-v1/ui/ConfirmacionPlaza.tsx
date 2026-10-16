"use client";

import { cn } from "@/lib/cn";
import { Sello } from "@/components/neurometafisica-v1/ui/Sello";
import { CONFIRMACION } from "@/components/neurometafisica-v1/content";

/**
 * Pantalla de "Plaza confirmada" entre el registro y la gracias (la monta
 * ReservaModalProvider). El sello oficial se estampa con una onda de luz,
 * aparece "Plaza confirmada" con el nombre de quien se registró y una línea
 * de oro se llena mientras se carga la gracias. Al llegar a la gracias se
 * desvanece (`saliendo`) y deja ver la página nueva.
 */
export function ConfirmacionPlaza({ nombre, saliendo }: { nombre: string; saliendo: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("cv2-confirmacion fixed inset-0 z-[300] grid place-items-center p-6 text-center", saliendo && "is-saliendo")}
    >
      <div className="flex flex-col items-center">
        <div className="relative grid place-items-center">
          <span aria-hidden className="cv2-confirmacion__onda" />
          <span aria-hidden className="cv2-confirmacion__onda [animation-delay:1.05s]" />
          <Sello className="cv2-confirmacion__sello w-[132px] sm:w-[156px]" />
        </div>

        <p className="cv2-confirmacion__texto cv2-titulo mt-9 text-[2rem] font-bold leading-tight sm:text-[2.75rem]">
          <span className="cv2-grad-texto cv2-brillo">{CONFIRMACION.titulo}</span>
        </p>
        <p className="cv2-confirmacion__texto mt-3 text-lg text-foreground/85 [animation-delay:1.25s] sm:text-xl">
          {nombre ? `${nombre}, ${CONFIRMACION.saludo}` : CONFIRMACION.saludoSinNombre}
        </p>

        <div className="cv2-confirmacion__texto mt-10 w-[290px] max-w-full [animation-delay:1.4s]">
          <span aria-hidden className="block h-px w-full overflow-hidden bg-(--cv2-oro)/20">
            <span className="cv2-confirmacion__carga block h-full w-full" />
          </span>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground/55">{CONFIRMACION.carga}</p>
        </div>
      </div>
    </div>
  );
}
