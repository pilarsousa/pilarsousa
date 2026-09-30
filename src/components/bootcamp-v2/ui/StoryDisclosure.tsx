"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type StoryDisclosureProps = {
  /** Always visible — the opening of the story. */
  intro: React.ReactNode;
  /** Collapsed behind the toggle below xl; always open from xl up. */
  more: React.ReactNode;
  className?: string;
};

/**
 * Long-form story that folds below xl.
 *
 * ── SE PLIEGA POR DEBAJO DE xl (1280px) ──
 *
 * Desde 1280px la historia entera cabe junto a la foto y se lee de un tirón.
 * En móvil son cinco párrafos seguidos debajo de la imagen y el scroll hasta
 * la sección siguiente se vuelve largo; entre 1024 y 1280 la foto es tan baja
 * que la historia completa duplicaba su altura. Ahí se muestra el arranque y
 * el resto se abre con el botón.
 *
 * El pliegue es CSS —filas de rejilla de 0fr a 1fr— y no un height animado con
 * JS: la transición sale suave sin medir nada, y desde xl una sola clase lo
 * deja abierto sin depender del estado.
 *
 * El texto plegado sigue en el DOM: los lectores de pantalla y los buscadores
 * leen la historia completa aunque visualmente esté recogida.
 */
export function StoryDisclosure({ intro, more, className }: StoryDisclosureProps) {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  return (
    <div className={className}>
      {intro}

      <div
        id={regionId}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:grid-rows-[1fr]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">{more}</div>
      </div>

      {/*
        El botón. Contorno fino en el verde de marca sobre un velo blanco
        translúcido: se ve sobre el blanco roto del fondo sin competir con el
        CTA de compra, que es la única pieza sólida y llamativa de la página.
      */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={regionId}
        className="group mt-6 inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-forest-900/25 bg-white/70 py-2.5 pl-5 pr-4 text-sm font-semibold tracking-wide text-forest-900 shadow-[0_6px_18px_-10px_rgba(0,47,1,0.45)] backdrop-blur-sm transition-colors duration-300 hover:border-forest-900/45 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-900 xl:hidden"
      >
        {open ? "Ver menos" : "Leer mi historia completa"}
        <span className="flex size-6 items-center justify-center rounded-full bg-forest-900 text-cream">
          <ChevronDown
            size={14}
            strokeWidth={2}
            aria-hidden
            className={cn("transition-transform duration-300", open && "rotate-180")}
          />
        </span>
      </button>
    </div>
  );
}
