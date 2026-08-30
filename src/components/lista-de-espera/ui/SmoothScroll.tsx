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

  ES UNA COPIA DE LA DE /volver-al-origen, no un import de aquélla. Las dos
  landings están deliberadamente separadas —una en producción y ésta como
  rediseño— y compartir el componente ataría el comportamiento de la publicada a
  los cambios de ésta. Es el mismo criterio con que se duplicaron el resto de
  las piezas de ui/.

  OJO CON LOS CONTENEDORES QUE SCROLLEAN POR DENTRO. Lenis se queda con la rueda
  de toda la ventana, así que un carrusel o un panel con scroll propio deja de
  responder: hay que marcarlo con data-lenis-prevent. En esta landing ya lo
  llevan el carrusel de reseñas y el cuerpo de sus dos diálogos.

  anchors: true es lo que mantiene vivos los enlaces internos. Con Lenis activo,
  el salto nativo de un href a un ancla pelea con el suavizado y el resultado es
  un tirón; con esta opción es la propia librería la que lleva la página hasta el
  ancla, con la misma inercia que el resto.

  Quien pida menos movimiento no recibe nada de esto: se queda con el scroll
  nativo del sistema, que es lo que ha pedido.
*/
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 2, anchors: true });

    /* SE AVISA EN CADA FRAME PARA QUE ScrollTrigger PUEDA SEGUIR EL RITMO.

       Lenis desplaza la página desde este bucle, y ScrollTrigger —que escucha el
       evento `scroll` del navegador— se entera tarde: sus disparos quedan
       desfasados respecto de lo que se ve en pantalla. Con este aviso los dos
       van al mismo reloj.

       Va por un evento del documento y no pasando la instancia a nadie porque
       quien la necesita (EntradaScroll) es un componente HERMANO montado en el
       mismo layout, no un descendiente: no hay forma de pasársela por props sin
       inventar un contexto para un solo dato. Y si algún día se retira el
       suavizado, quien escucha simplemente deja de recibir avisos y sigue
       funcionando con el scroll nativo. */
    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      document.dispatchEvent(new CustomEvent("le:lenis-frame"));
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
