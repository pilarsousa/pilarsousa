"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Contenedor de trazos a mano (.cv3-trazo, .cv3-trazo-texto). Cuando entra en
 * pantalla agrega is-visible y los trazos se dibujan solos, cada uno con su
 * --retraso. Sin JS los trazos quedan ocultos, por eso sólo se usan como
 * adorno: nunca llevan información que no esté también en el texto.
 */
export function Anotacion({
  children,
  className,
  umbral = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  /** Parte del bloque que tiene que verse para arrancar. */
  umbral?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: umbral },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [umbral]);

  return (
    <div ref={ref} className={cn(className, visible && "is-visible")}>
      {children}
    </div>
  );
}
