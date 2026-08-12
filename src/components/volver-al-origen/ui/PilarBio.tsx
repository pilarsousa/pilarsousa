"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { PILAR } from "@/components/volver-al-origen/content";

/*
  Bio de Pilar con "Leer más" en móvil.

  Replica el comportamiento del PilarBio de Misión Origen, repintado a esta
  paleta: en móvil se muestran los dos primeros párrafos y el resto se despliega;
  en escritorio la bio va entera y el botón desaparece, porque ahí hay sitio de
  sobra y un desplegable sólo añadiría un clic inútil.

  El colapso usa grid-template-rows 0fr→1fr en vez de height. Es la única forma
  de animar hacia "alto automático" sin medir el contenido en JS: display:none
  no es animable y una altura fija exigiría conocer de antemano cuánto ocupa el
  texto.
*/

const VISIBLE = 2;

export function PilarBio() {
  const [expanded, setExpanded] = useState(false);

  const visible = PILAR.paragraphs.slice(0, VISIBLE);
  const extra = PILAR.paragraphs.slice(VISIBLE);
  const hasHidden = extra.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {visible.map((text) => (
        <p
          key={text}
          className="font-sans text-base leading-relaxed text-foreground/85 sm:text-lg"
        >
          {text}
        </p>
      ))}

      {hasHidden && (
        <div
          id="vo-pilar-bio-extra"
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none lg:grid-rows-[1fr] lg:opacity-100",
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          {/* El hijo directo del grid necesita overflow-hidden y min-h-0 para
              que el colapso recorte de verdad en lugar de desbordar. */}
          <div className="flex min-h-0 flex-col gap-4 overflow-hidden">
            {extra.map((text) => (
              <p
                key={text}
                className="font-sans text-base leading-relaxed text-foreground/85 sm:text-lg"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      )}

      {hasHidden && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="vo-pilar-bio-extra"
          className="group mt-1 inline-flex w-fit items-center gap-2 self-center rounded-full border border-accent/30 bg-accent/5 px-5 py-2.5 font-sans text-sm font-medium uppercase tracking-[0.15em] text-accent transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
        >
          {expanded ? "Leer menos" : "Leer más"}
          <ChevronDown
            size={16}
            aria-hidden
            className={cn(
              "transition-transform duration-500 ease-in-out motion-reduce:transition-none",
              expanded && "rotate-180",
            )}
          />
        </button>
      )}
    </div>
  );
}
