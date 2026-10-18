"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Retraso en segundos, para encadenar apariciones dentro de una sección. */
  delay?: number;
  /** Desde dónde entra. Por defecto, desde abajo. */
  from?: "up" | "down" | "none";
};

const OFFSET = 24;

/**
 * Aparición al hacer scroll (fade + desplazamiento), una sola vez.
 *
 * El bloque llega VISIBLE del servidor y sólo se oculta para animarse cuando
 * React ya arrancó: si el JS no corre (iOS viejo, el navegador interno de
 * Instagram que falla, un bloqueador, una conexión que no termina de bajar
 * el bundle), el contenido igual se lee. Antes era framer-motion con
 * initial="hidden", que escribía opacity:0 en el HTML: sin JS, la página
 * quedaba en blanco debajo de la foto.
 *
 * Lo que ya está a la vista al arrancar no se toca (no parpadea); lo de más
 * abajo se oculta y aparece al entrar (.cv2-reveal en el CSS).
 */
export function Reveal({ children, className, delay = 0, from = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const caja = el.getBoundingClientRect();
    if (caja.top < window.innerHeight && caja.bottom > 0) return;

    setOculto(true);
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setOculto(false);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const y = from === "up" ? OFFSET : from === "down" ? -OFFSET : 0;

  return (
    <div
      ref={ref}
      className={cn("cv2-reveal", oculto && "is-oculto", className)}
      style={{ "--reveal-y": `${y}px`, "--reveal-retraso": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
