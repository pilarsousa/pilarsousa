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

/* Velocidad del descifrado. 28 ms por letra: a 50 (el valor por defecto de la
   librería) un titular largo tardaba más de dos segundos en resolverse y el
   visitante llegaba a pasarlo de largo antes de poder leerlo. */
const SPEED = 28;

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
        <span className={accentClassName}>
          {" "}
          <DecryptedText
            text={accent}
            speed={SPEED}
            characters={CHARS}
            sequential
            revealDirection="start"
            animateOn="view"
          />
        </span>
      )}
      {after}
    </h2>
  );
}
