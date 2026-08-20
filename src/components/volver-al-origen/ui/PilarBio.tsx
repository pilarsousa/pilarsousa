import { PILAR } from "@/components/volver-al-origen/content";

/*
  Bio de Pilar, completa en todos los tamaños.

  Antes esto era un desplegable: en móvil mostraba los dos primeros párrafos y
  escondía el resto tras un botón "Leer más". Se retiró a petición — la historia
  es corta y el clic extra sólo ponía una puerta delante de algo que ya cabía.

  Tres bloques y no uno: los párrafos de antes, la frase destacada y los de
  después. En el copy original esa frase —"Saber no es suficiente. Hay que
  encarnarlo."— está aislada entre párrafos, y esa separación es lo que le da el
  peso; metida en el hilo del texto se lee como una más.

  Al no tener estado no necesita "use client": se renderiza en el servidor y no
  manda nada de JavaScript al navegador.
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

      {/* Filete a la izquierda y fuente de titular: los dos recursos que usa la
          página para sacar una frase del hilo del texto sin gritarla. */}
      <p className="border-l-2 border-accent/40 py-1 pl-5 font-display text-lg uppercase leading-snug tracking-[0.03em] text-accent sm:text-xl">
        {PILAR.destacado}
      </p>

      {PILAR.paragraphsPost.map((text) => (
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
