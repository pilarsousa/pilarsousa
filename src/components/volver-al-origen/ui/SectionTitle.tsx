"use client";

import { cn } from "@/lib/cn";
import { DecryptedText } from "@/components/volver-al-origen/ui/DecryptedText";

/*
  Título de sección: Cinzel en versalitas con un tramo en verde luminoso.

  El tramo resaltado se pasa como prop y no como <span> dentro de children para
  que content.ts pueda seguir siendo texto plano — el copy no debería contener
  JSX.

  El texto se escribe en minúsculas en content.ts y las versalitas las pone
  uppercase por CSS: así los lectores de pantalla lo leen como una frase y no
  deletrean cada letra.

  Los títulos se descifran al entrar en pantalla (DecryptedText). Es "use client"
  por eso: el efecto necesita IntersectionObserver y estado. Las secciones que lo
  usan siguen siendo de servidor — sólo se hidrata este árbol.

  sequential + revealDirection="start" y no el modo aleatorio por defecto: un
  título es una frase que se lee de izquierda a derecha, y resolverla en ese
  mismo orden acompaña la lectura en lugar de pelearse con ella.
*/

type SectionTitleProps = {
  /** Texto plano: es lo que se descifra. */
  children: string;
  /** Tramo resaltado en verde, al final del título. */
  accent?: string;
  /** Texto tras el tramo resaltado (p. ej. el "?" de "¿…lista de espera?"). */
  after?: string;
  /* Color del tramo resaltado. Por defecto el verde luminoso, que sólo se lee
     sobre fondo oscuro; las secciones de fondo claro pasan un verde más
     profundo para no perder contraste. */
  accentClassName?: string;
  id?: string;
  className?: string;
};

/* Milisegundos por letra. En modo secuencial el total es este número por el
   largo del texto, así que un titular de unas 40 letras tarda ~2,4 s.

   Estuvo en 28 ms (~1,1 s) y era demasiado rápido: sumado a que el efecto
   arrancaba con el título aún asomando por abajo, terminaba antes de que el
   visitante lo tuviera delante. Ahora el disparo es más tardío —el título tiene
   que estar casi entero en pantalla, ver DecryptedText— y el recorrido más
   lento, de modo que el efecto ocurre mientras se está mirando. */
const SPEED = 60;

/* Sólo letras y signos del propio idioma: el juego por defecto incluye símbolos
   como #$%^&* que sobre Cinzel en versalitas se leen como un error de fuente. */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑ";

export function SectionTitle({
  children,
  accent,
  after,
  accentClassName = "text-accent",
  id,
  className,
}: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-center font-display text-2xl uppercase leading-[1.3] tracking-[0.06em] sm:text-3xl md:text-[2.15rem]",
        className,
      )}
    >
      <DecryptedText
        text={children}
        speed={SPEED}
        characters={CHARS}
        sequential
        revealDirection="start"
        animateOn="view"
      />
      {accent && (
        <>
          {/* El espacio va FUERA del nowrap de abajo: es el único punto por
              donde el título debería poder partirse, y meterlo dentro pegaría
              el tramo resaltado a la frase que lo precede. */}
          {" "}
          {/* nowrap para que el "?" no se quede solo en una línea.

              DecryptedText se pinta como inline-block, y entre una caja de ésas
              y el texto que la sigue el navegador puede partir línea aunque no
              haya espacio entre medias. En escritorio, "¿Quién es Pilar Sousa"
              llenaba el ancho de su columna y el signo caía al renglón
              siguiente, él solo.

              No fuerza al tramo resaltado a caber en una línea: eso lo decide
              su propio inline-block, que sigue partiéndose por dentro. Lo único
              que impide es el corte entre la caja y el signo. */}
          <span className="whitespace-nowrap">
            <span className={accentClassName}>
              <DecryptedText
                text={accent}
                speed={SPEED}
                characters={CHARS}
                sequential
                revealDirection="start"
                animateOn="view"
              />
            </span>
            {after}
          </span>
        </>
      )}
      {!accent && after}
    </h2>
  );
}
