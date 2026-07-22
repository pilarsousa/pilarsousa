"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/* Bio de Pilar como historia continua: párrafos con punto y aparte, no ítems.
   Los primeros 2 se muestran siempre; el resto se revela con "Leer más". */
const PARAGRAPHS = [
  "Hace más de 10 años tuve mi despertar espiritual. Desde entonces comenzó una búsqueda insaciable por comprender cómo funciona realmente la realidad, la consciencia y las leyes universales que gobiernan nuestra vida.",
  "Ese camino me llevó a construir una comunidad de más de 600.000 personas, publicar mi primer libro y acompañar a cientos de alumnos en sus propios procesos de transformación.",
  "Pero hubo un momento en el que me sentí estancada. Comprendí que no bastaba con conocer las leyes universales, era necesario aprender a vivirlas, sostenerlas y aplicarlas en la vida real.",
  "Fue entonces cuando decidí convertir mi vida en mi mayor laboratorio. Hoy vivo viajando por el mundo, dedicándome a mi propósito y ayudando a otras personas a dar su propio salto cuántico.",
  "De esa experiencia nace Volver al Origen, una formación práctica en la que comparto, paso a paso, las herramientas y principios que me permitieron manifestar la realidad que durante años soñé.",
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
          className="font-sans text-base font-light leading-relaxed text-foreground/85"
        >
          {/* El ✦ sólo abre el primer párrafo, marcando el inicio de la historia. */}
          {i === 0 && (
            <span aria-hidden className="mr-2 font-display text-lg text-neon-pink">
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
                className="font-sans text-base font-light leading-relaxed text-foreground/85"
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
          className="group mt-1 inline-flex w-fit items-center gap-2 self-start rounded-full border border-cyan/25 bg-cyan/5 px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.15em] text-cyan/90 transition-all duration-300 hover:border-cyan/50 hover:bg-cyan/10 hover:text-ice-blue hover:shadow-[0_0_16px_rgba(40,191,241,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan lg:hidden"
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
