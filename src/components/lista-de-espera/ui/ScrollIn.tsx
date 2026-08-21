"use client";

import { motion, type Variants } from "framer-motion";

/*
  Entrada de contenido ligada al scroll.

  Adaptación de una receta de Elementor que usaba GSAP + ScrollTrigger para
  alternar una clase al entrar en pantalla. Aquí se resuelve con framer-motion,
  que ya está en el bundle porque lo usa el resto del proyecto: traer GSAP sólo
  para esto serían ~70 KB de JavaScript duplicando una capacidad que ya existe.
  De la receta original se conserva lo que le da carácter y el Reveal común no
  tenía — el desenfoque con sobreexposición — y las cuatro direcciones.

  El elemento entra desenfocado y sobreexpuesto, y termina nítido y a exposición
  normal. Sobre fondo oscuro ese exceso de brillo se lee como un destello que se
  asienta, no como un error de color.

  A diferencia de la receta, la animación ocurre UNA vez por defecto. La versión
  de Elementor la deshacía al salir de pantalla, con lo que el contenido volvía a
  desvanecerse cada vez que se pasaba por delante; en una página que se recorre
  de arriba abajo eso distrae más de lo que aporta. Con repeat se recupera ese
  comportamiento.
*/

type Direction = "up" | "down" | "left" | "right" | "none";

type ScrollInProps = {
  children: React.ReactNode;
  className?: string;
  /** Retardo en segundos; encadena entradas dentro de una misma sección. */
  delay?: number;
  /** Desde dónde entra. Por defecto, desde abajo. */
  from?: Direction;
  /** Repite la animación cada vez que el elemento entra en pantalla. */
  repeat?: boolean;
};

const OFFSET = 30;

function buildVariants(from: Direction, delay: number): Variants {
  const x = from === "left" ? -OFFSET : from === "right" ? OFFSET : 0;
  const y = from === "up" ? OFFSET : from === "down" ? -OFFSET : 0;

  return {
    hidden: {
      opacity: 0,
      x,
      y,
      filter: "blur(10px) brightness(200%)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px) brightness(100%)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
}

export function ScrollIn({
  children,
  className,
  delay = 0,
  from = "up",
  repeat = false,
}: ScrollInProps) {
  return (
    <motion.div
      className={className}
      variants={buildVariants(from, delay)}
      initial="hidden"
      whileInView="visible"
      /* amount 0.25: basta con que asome un cuarto del bloque. Con el valor por
         defecto, un bloque más alto que la pantalla no llega a cumplir la
         condición nunca y se quedaría invisible para siempre. */
      viewport={{ once: !repeat, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
