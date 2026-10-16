"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

/*
  Scroll más lento y con inercia en toda /cientifico-v2 (landing y gracias),
  con Lenis. Copia del patrón de /diagnostico y /lista-de-espera, no un
  import: cada landing lleva sus piezas.

  - duration 2: el mismo tacto que las otras landings.
  - wheelMultiplier 0,8: cada golpe de rueda avanza un poco menos, que es lo
    que hace que la página "vaya más lenta". La landing es larga (unas diez
    pantallas): más bajo obligaría a rodar de más para llegar al final.
  - Táctil: Lenis no lo toca (syncTouch apagado). En el celular el scroll
    sigue siendo el nativo: frenar el dedo se siente roto, no lento.

  Se monta en el layout de esta ruta: Lenis se queda con el scroll de la
  ventana, y montarlo más arriba se lo impondría a las otras landings.

  ⚠️ Lo que scrollea por dentro (el modal de registro, el diálogo de una
  reseña) lleva data-lenis-prevent, o deja de responder a la rueda. El modal,
  además, detiene a Lenis mientras está abierto (lenisActual()?.stop()).

  ScrollTrigger (la pócima) escucha el scroll del navegador y se enteraría
  tarde: se le avisa en cada desplazamiento de Lenis.

  Quien pida menos movimiento se queda con el scroll nativo.
*/

let actual: Lenis | null = null;

/** La instancia activa, para quien necesite frenarla o mover la página. */
export function lenisActual() {
  return actual;
}

export function ScrollSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 2, wheelMultiplier: 0.8, anchors: true });
    actual = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      actual = null;
    };
  }, []);

  return null;
}
