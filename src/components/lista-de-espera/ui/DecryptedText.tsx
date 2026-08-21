"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";

/*
  Texto que se "descifra": arranca revuelto y va resolviéndose letra a letra.
  Adaptado de React Bits (reactbits.dev) a TypeScript.

  Dos diferencias con el original, ambas deliberadas:

  · No usa `motion`. Ese paquete es framer-motion renombrado, y el proyecto ya
    tiene framer-motion v12; instalarlo duplicaría la misma librería en el
    bundle. Como aquí sólo envolvía un <span> sin animar ninguna prop, se
    reemplaza por un <span> normal y no se pierde nada.

  · Respeta prefers-reduced-motion. El original no lo contempla, y un texto que
    se sacude durante segundos es justo lo que evita quien pide menos
    movimiento: para ellos el texto aparece ya legible y no se anima nunca.

  El texto real viaja en un <span> para lectores de pantalla y la versión
  revuelta va con aria-hidden. Sin eso, un lector leería el galimatías.
*/

type RevealDirection = "start" | "end" | "center";
type AnimateOn = "view" | "hover" | "inViewHover" | "click";

type DecryptedTextProps = {
  text: string;
  /** Milisegundos entre iteraciones. */
  speed?: number;
  /** Iteraciones máximas en modo no secuencial. */
  maxIterations?: number;
  /** Revela una letra por vez, en orden, en lugar de todo a la vez. */
  sequential?: boolean;
  revealDirection?: RevealDirection;
  /** Revuelve usando sólo las letras del propio texto. */
  useOriginalCharsOnly?: boolean;
  characters?: string;
  /** Clase de las letras ya reveladas. */
  className?: string;
  /** Clase del contenedor. */
  parentClassName?: string;
  /** Clase de las letras aún cifradas. */
  encryptedClassName?: string;
  animateOn?: AnimateOn;
};

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<number | null>(null);

  /* Se resuelve una vez y se guarda: si el visitante pide menos movimiento, el
     componente se comporta como un texto normal de principio a fin. */
  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const availableChars = useMemo(
    () =>
      useOriginalCharsOnly
        ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
        : characters.split(""),
    [useOriginalCharsOnly, text, characters],
  );

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) =>
      originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ];
        })
        .join(""),
    [availableChars],
  );

  const triggerDecrypt = useCallback(() => {
    if (reducedMotion.current) return;
    setRevealedIndices(new Set());
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    let currentIteration = 0;

    /* Siguiente letra a revelar según la dirección pedida. En "center" se
       alterna a un lado y otro del medio, de dentro hacia fuera. */
    const getNextIndex = (revealedSet: Set<number>): number => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedSet.has(nextIndex)
          ) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    intervalRef.current = window.setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        if (sequential) {
          if (prevRevealed.size < text.length) {
            const nextIndex = getNextIndex(prevRevealed);
            const newRevealed = new Set(prevRevealed);
            newRevealed.add(nextIndex);
            setDisplayText(shuffleText(text, newRevealed));
            return newRevealed;
          }
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          setIsAnimating(false);
          return prevRevealed;
        }

        setDisplayText(shuffleText(text, prevRevealed));
        currentIteration++;
        if (currentIteration >= maxIterations) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          setIsAnimating(false);
          setDisplayText(text);
        }
        return prevRevealed;
      });
    }, speed);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [
    isAnimating,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    shuffleText,
  ]);

  /* Dispara cuando el título ya está BIEN dentro de la pantalla, no al asomar.

     Con threshold 0.1 el efecto arrancaba con un 10% del título visible —es
     decir, todavía pegado al borde inferior— y para cuando el visitante llegaba
     a leerlo ya había terminado. Con 0.9 el título tiene que estar
     prácticamente entero en pantalla, que es cuando de verdad se está mirando.

     rootMargin recorta además un 15% por abajo: sin él, en pantallas altas un
     título puede cumplir el 90% estando aún en la franja inferior, que se lee
     de refilón mientras se sigue bajando. */
  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerDecrypt();
            setHasAnimated(true);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -15% 0px", threshold: 0.9 },
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  const hoverProps =
    animateOn === "hover" || animateOn === "inViewHover"
      ? {
          onMouseEnter: () => {
            if (isAnimating) return;
            triggerDecrypt();
          },
        }
      : {};

  return (
    <span
      ref={containerRef}
      className={parentClassName}
      style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
      {...hoverProps}
    >
      {/* El texto real, sólo para lectores de pantalla: lo que se ve está
          revuelto y no debe leerse en voz alta. */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const revealed = revealedIndices.has(index) || !isAnimating;
          return (
            <span
              key={index}
              className={revealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
