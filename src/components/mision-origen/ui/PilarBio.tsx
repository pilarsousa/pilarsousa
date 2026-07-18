"use client";

import { useState } from "react";

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

  const shown = expanded ? PARAGRAPHS : PARAGRAPHS.slice(0, VISIBLE);
  const hasHidden = PARAGRAPHS.length > VISIBLE;

  return (
    <div className="flex flex-col gap-4">
      {shown.map((text, i) => (
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

      {/* Toggle — después del 2º párrafo (o del último al expandir). */}
      {hasHidden && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="self-start font-sans text-sm font-medium uppercase tracking-[0.15em] text-cyan transition-colors duration-300 hover:text-ice-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          {expanded ? "Leer menos" : "Leer más…"}
        </button>
      )}
    </div>
  );
}
