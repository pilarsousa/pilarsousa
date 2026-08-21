import { PILAR } from "@/components/volver-al-origen/content";

/*
  Bio de Pilar, completa en todos los tamaños.

  Antes esto era un desplegable: en móvil mostraba los dos primeros párrafos y
  escondía el resto tras un botón "Leer más". Se retiró a petición — la historia
  es corta y el clic extra sólo ponía una puerta delante de algo que ya cabía.

  Al quedarse sin estado deja de necesitar "use client": ahora se renderiza en el
  servidor y no manda nada de JavaScript al navegador.
*/
export function PilarBio() {
  return (
    <div className="flex flex-col gap-4">
      {PILAR.paragraphs.map((text) => (
        <p
          key={text}
          className="font-sans text-base leading-relaxed text-foreground/85 sm:text-lg"
        >
          {text}
        </p>
      ))}
    </div>
  );
}
