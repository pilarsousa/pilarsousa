"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Texto largo que se pliega: el arranque siempre a la vista y el resto
 * detrás de "Leer más". Lo usa la historia de Pilar, para que la landing no
 * se haga larga.
 *
 * El pliegue es CSS, como el de /bootcamp-v2 (StoryDisclosure): las filas
 * de la rejilla van de 0fr a 1fr, así la altura se anima suave al abrir y al
 * cerrar sin medir nada. Encima, el texto se funde y sube un poco al entrar
 * (y hace lo inverso al salir), con la misma curva.
 *
 * Cerrado, el resto queda `inert`: ni el foco ni el lector de pantalla
 * entran en lo que no se ve. Sigue en el HTML, para los buscadores.
 */
export function Pliegue({
  inicio,
  resto,
  className,
}: {
  /** Siempre visible. */
  inicio: React.ReactNode;
  /** Lo que se abre con el botón. */
  resto: React.ReactNode;
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      {inicio}

      <div
        id={id}
        inert={!abierto}
        className={cn(
          "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              abierto ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
            )}
          >
            {resto}
          </div>
        </div>
      </div>

      {/* Sutil a propósito: el único botón sólido de la página es el de la
          plaza. Texto en oro con un filete debajo que se completa al pasar
          por encima, y la flecha en un círculo fino que gira al abrir. */}
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={id}
        className="group mt-6 inline-flex cursor-pointer items-center gap-3 rounded-full text-sm font-bold uppercase tracking-[0.16em] text-(--cv2-oro-claro) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--cv2-oro)"
      >
        <span className="relative pb-1">
          {abierto ? "Leer menos" : "Leer más"}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-50 bg-(--cv2-oro)/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
          />
        </span>
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-full border border-(--cv2-oro)/45 bg-(--cv2-oro)/[0.06] transition-colors duration-300 group-hover:border-(--cv2-oro) group-hover:bg-(--cv2-oro)/15"
        >
          <ChevronDown
            size={15}
            strokeWidth={2.2}
            className={cn(
              "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              abierto && "rotate-180",
            )}
          />
        </span>
      </button>
    </div>
  );
}
