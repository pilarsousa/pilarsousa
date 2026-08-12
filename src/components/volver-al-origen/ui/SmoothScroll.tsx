"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/*
  Suavizado de scroll con Lenis.

  Lenis intercepta la rueda y el gesto táctil y mueve la página con inercia, en
  vez de saltar de golpe como hace el navegador. El bucle de animación es
  obligatorio: la librería no se mueve sola, hay que darle el reloj en cada
  frame.

  Se monta desde el layout de esta landing y no desde el raíz. Lenis afecta al
  scroll de la ventana, que es único para todo el sitio, así que montarlo arriba
  se lo impondría también a las otras landings. Aquí vive mientras el visitante
  está en estas páginas y se desmonta al salir.

  anchors: true es lo que mantiene vivos los enlaces internos. Con Lenis activo,
  el salto nativo de un href="#registro" pelea con el suavizado y el resultado es
  un tirón; con esta opción es la propia librería la que lleva la página hasta el
  ancla, con la misma inercia que el resto.

  Quien pida menos movimiento no recibe nada de esto: se queda con el scroll
  nativo del sistema, que es lo que ha pedido.
*/
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 2, anchors: true });

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
