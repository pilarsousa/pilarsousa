"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/* Bio de Pilar como historia continua: párrafos con punto y aparte, no ítems.
   Los primeros 2 se muestran siempre; el resto se revela con "Leer más".
   ⚠️ COPY TEMPORAL — cada párrafo describe qué debería contar el definitivo. */
const PARAGRAPHS = [
  "Texto temporal. Primer párrafo de la presentación: quién es Pilar y cómo empezó su camino.",
  "Texto temporal. Segundo párrafo: lo que construyó desde entonces (comunidad, libro, alumnos), con los datos reales.",
  "Texto temporal. Tercer párrafo: el momento de quiebre que la llevó a buscar un método práctico.",
  "Texto temporal. Cuarto párrafo: cómo convirtió su vida en su propio laboratorio y qué cambió.",
  "Texto temporal. Quinto párrafo: de dónde nace este evento y qué comparte en él.",
];

const VISIBLE = 2;

export function PilarBio() {
  const [expanded, setExpanded] = useState(false);

  const hasHidden = PARAGRAPHS.length > VISIBLE;

  const visible = PARAGRAPHS.slice(0, VISIBLE);
  const extra = PARAGRAPHS.slice(VISIBLE);

  return (
    <div className="flex flex-col gap-4">
      {visible.map((text, i) => (
        <p
          key={text}
          className="font-sans text-base leading-relaxed text-foreground/80"
        >
          {/* El ✦ sólo abre el primer párrafo, marcando el inicio de la historia. */}
          {i === 0 && (
            <span aria-hidden className="mr-2 font-display text-lg text-accent">
              ✦
            </span>
          )}
          {text}
        </p>
      ))}

      {/* Párrafos extra. El colapso usa grid-template-rows 0fr→1fr en vez de
          height/display: es la única forma de animar hacia "alto automático"
          sin medir el contenido en JS. display:none no es animable, por eso no
          se usa aquí. En desktop (lg) queda siempre abierto. */}
      {hasHidden && (
        <div
          id="pilar-bio-extra"
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
                className="font-sans text-base leading-relaxed text-foreground/80"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Toggle — sólo mobile/tablet: en desktop la bio se muestra entera y el
          botón no tiene función, así que se oculta (lg:hidden).
          Botón discreto: pill de borde tenue, sin relleno sólido, con un
          chevron que rota 180° al abrir. */}
      {hasHidden && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="pilar-bio-extra"
          className="group mt-1 inline-flex w-fit items-center gap-2 self-start rounded-full border border-cyan/25 bg-cyan/5 px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.15em] text-cyan/90 transition-all duration-300 hover:border-cyan/50 hover:bg-cyan/10 hover:text-ice-blue hover:shadow-[0_0_16px_rgba(125,168,154,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan lg:hidden"
        >
          {expanded ? "Leer menos" : "Leer más"}
          <ChevronDown
            size={14}
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
