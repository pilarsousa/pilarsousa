"use client";

import { useState } from "react";

/* Bio de Pilar en párrafos. Los primeros 4 se muestran siempre; el resto se
   revela con "Leer más". Cada párrafo abre con el símbolo ✦, igual que las
   características anteriores. */
const PARAGRAPHS = [
  "Hace más de 10 años tuve mi despertar espiritual. Desde entonces comenzó una búsqueda insaciable por comprender cómo funciona realmente la realidad, la consciencia y las leyes universales que gobiernan nuestra vida.",
  "Ese camino me llevó a construir una comunidad de más de 600.000 personas, publicar mi primer libro y acompañar a cientos de alumnos en sus propios procesos de transformación.",
  "Pero hubo un momento en el que me sentí estancada. Comprendí que no bastaba con conocer las leyes universales, era necesario aprender a vivirlas, sostenerlas y aplicarlas en la vida real.",
  "Fue entonces cuando decidí convertir mi vida en mi mayor laboratorio. Hoy vivo viajando por el mundo, dedicándome a mi propósito y ayudando a otras personas a dar su propio salto cuántico.",
  "De esa experiencia nace Volver al Origen, una formación práctica en la que comparto, paso a paso, las herramientas y principios que me permitieron manifestar la realidad que durante años soñé.",
];

const VISIBLE = 2;

function Paragraph({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="mt-1 shrink-0 font-display text-lg text-neon-pink"
      >
        ✦
      </span>
      <p className="font-sans text-base font-light leading-relaxed text-foreground/85">
        {text}
      </p>
    </div>
  );
}

export function PilarBio() {
  const [expanded, setExpanded] = useState(false);

  // Una sola grilla con lo que se muestra en cada momento (2 por default, todos
  // al expandir). Así "el último recuadro" es siempre el último visible.
  const shown = expanded ? PARAGRAPHS : PARAGRAPHS.slice(0, VISIBLE);
  const hasHidden = PARAGRAPHS.length > VISIBLE;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {shown.map((text) => (
          <Paragraph key={text} text={text} />
        ))}
      </div>

      {/* Toggle — sólo si hay párrafos ocultos. */}
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
