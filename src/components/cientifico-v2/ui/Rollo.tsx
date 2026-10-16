"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Estado = "abierto" | "enrollado" | "desenrollando";

/**
 * Envuelve la ficha de inscripción en un pergamino: un rodillo de papel fijo
 * arriba y otro abajo. Llega enrollada (sólo se ven los dos rodillos juntos)
 * y, cuando entra en pantalla, el rodillo de abajo baja despacio y va
 * desenrollando el papel (ver .cv2-rollo en cientifico-v2.css).
 *
 * Arranca abierta: el servidor la manda así y sólo se enrolla si al cargar
 * todavía está por debajo de la pantalla. Sin JS, con "reducir movimiento"
 * o si se recarga con la ficha a la vista, se ve entera de entrada.
 */
export function Rollo({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<Estado>("abierto");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.65) return;

    const cuadro = requestAnimationFrame(() => setEstado("enrollado"));
    /* Se desenrolla cuando su borde de arriba pasa el 65% de la pantalla:
       así el rodillo baja a la vista y no por debajo del borde. */
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        io.disconnect();
        setEstado("desenrollando");
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(cuadro);
      io.disconnect();
    };
  }, []);

  /* Al terminar, suelta el recorte (se ve la sombra de la ficha). Sólo el
     clip-path del propio papel: las transiciones de adentro (el sello)
     también burbujean hasta acá. */
  const alTerminar = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.propertyName === "clip-path") setEstado("abierto");
  };

  return (
    <div ref={ref} data-rollo={estado} className={cn("cv2-rollo relative", className)}>
      <span aria-hidden className="cv2-rollo__rodillo cv2-rollo__rodillo--arriba" />
      <div className="cv2-rollo__papel" onTransitionEnd={alTerminar}>
        {children}
      </div>
      <span aria-hidden className="cv2-rollo__rodillo cv2-rollo__rodillo--abajo" />
    </div>
  );
}
