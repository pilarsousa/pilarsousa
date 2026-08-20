"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

/*
  Luz que recorre el perímetro de un elemento.

  Cómo funciona: se dibuja un <rect> invisible del tamaño del contenedor y, en
  cada frame, se calcula el punto de su contorno que corresponde al tiempo
  transcurrido. Ese punto mueve un div con un degradado radial. Al ir el rect a
  ancho y alto completos, la luz sigue el borde exacto de la caja sea cual sea
  su tamaño, sin tener que calcular esquinas a mano.

  getTotalLength y getPointAtLength son métodos de SVGGeometryElement, del que
  <rect> forma parte, así que no hace falta convertirlo a <path>.

  Adaptado del componente original: allí el color salía de var(--sky-500), que
  existe porque un plugin de Tailwind 3 volcaba toda la paleta a variables CSS.
  Este proyecto usa Tailwind 4 y no tiene ese plugin, así que el color se pasa
  por prop y por defecto es el verde de la marca.
*/

type MovingBorderProps = {
  children: React.ReactNode;
  /** Duración de una vuelta completa, en milisegundos. */
  duration?: number;
  /** Radio de las esquinas del recorrido. */
  rx?: string;
  ry?: string;
  /** Desfase en el recorrido, de 0 a 1. Con 0.5 la luz sale por el lado
      opuesto, lo que permite montar varias sin que se solapen. */
  offset?: number;
};

export function MovingBorder({
  children,
  duration = 4000,
  rx,
  ry,
  offset = 0,
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  /* Quien pida menos movimiento no gasta frames en esto.

     Va en una ref y no en estado a propósito: cambiar estado desde un efecto
     provoca un render en cascada —y el lint del proyecto lo prohíbe—, mientras
     que aquí sólo hace falta que el bucle de animación consulte el valor. De
     ocultar la luz se encarga el CSS, con motion-reduce en quien la monta. */
  const stillRef = useRef(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    stillRef.current = query.matches;
    const onChange = (e: MediaQueryListEvent) => {
      stillRef.current = e.matches;
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useAnimationFrame((time) => {
    if (stillRef.current) return;
    const length = pathRef.current?.getTotalLength();
    if (!length) return;
    progress.set((time * (length / duration) + offset * length) % length);
  });

  /* Punto del recorrido, A PRUEBA DE ELEMENTOS SIN LAYOUT.

     getPointAtLength lanza InvalidStateError —"the element's path is empty"—
     cuando el rect no tiene trazado, y eso ocurre siempre que el componente
     está montado pero no dibujado: dentro de un bloque con display:none, que es
     exactamente lo que pasa cuando una sección tiene una maquetación de móvil y
     otra de escritorio y una de las dos está oculta por su breakpoint.

     El bucle de animación ya se protegía comprobando el largo, pero useTransform
     evalúa su función también en el primer render —con el progreso a 0— y ahí no
     había guarda: bastaba con que el componente naciera oculto para tumbar la
     página antes de pintar nada.

     La comprobación del largo cubre el caso normal (0 en un rect sin tamaño) y
     el try/catch, los motores que prefieren lanzar en getTotalLength en vez de
     devolver 0. Devolver 0 es el reposo correcto: la luz se queda en la esquina
     de un elemento que, por definición, no se está viendo.

     La guarda va repetida en las dos funciones en vez de extraída a un ayudante
     compartido, y no por descuido: la regla react-hooks/refs prohíbe pasar por
     ahí funciones que lean una ref, y sacarla a una fábrica la hacía saltar.
     Dentro del callback de useTransform sí está permitido, porque es donde se
     evalúa. */
  const x = useTransform(progress, (value) => {
    const rect = pathRef.current;
    if (!rect) return 0;

    try {
      if (!rect.getTotalLength()) return 0;
      return rect.getPointAtLength(value).x;
    } catch {
      return 0;
    }
  });

  const y = useTransform(progress, (value) => {
    const rect = pathRef.current;
    if (!rect) return 0;

    try {
      if (!rect.getTotalLength()) return 0;
      return rect.getPointAtLength(value).y;
    } catch {
      return 0;
    }
  });

  /* Los dos translate del -50% centran la luz sobre el punto del recorrido; sin
     ellos quedaría colgando de su esquina superior izquierda. */
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute size-full"
        width="100%"
        height="100%"
        aria-hidden
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        aria-hidden
        style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}
      >
        {children}
      </motion.div>
    </>
  );
}
