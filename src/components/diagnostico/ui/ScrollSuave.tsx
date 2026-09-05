"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/*
  Suavizado de scroll con Lenis, para la landing del diagnóstico.

  Lenis intercepta la rueda y el gesto táctil y mueve la página con inercia en
  vez de saltar de golpe. El bucle de animación es obligatorio: la librería no
  se mueve sola, hay que darle el reloj en cada frame.

  ── POR QUÉ ES UNA COPIA Y NO UN IMPORT ──

  Es el mismo criterio con el que /volver-al-origen y /lista-de-espera tienen
  cada una la suya: son landings deliberadamente separadas, y compartir el
  componente ataría el comportamiento de una a los cambios de otra.

  Ésta además es MÁS CORTA que aquéllas: no emite el evento por frame que
  necesita ScrollTrigger, porque en esta ruta no hay GSAP. Añadirlo sería
  despachar un evento en cada fotograma que no escucha nadie.

  ── DÓNDE SE MONTA, Y DÓNDE NO ──

  Sólo en la landing (/diagnostico), NO en el layout de la ruta. Lenis se queda
  con el scroll de la ventana, y las otras dos pantallas del embudo no lo
  quieren:

    · /diagnostico/encuesta son once pantallas cortas que se sustituyen en el
      sitio, con foco automático en los campos. El scroll inercial pelea con
      ese foco — es la misma razón por la que el layout de esta ruta está
      vacío a propósito (ver layout.tsx).
    · /diagnostico/resultado cabe casi entera en pantalla.

  La landing sí es un recorrido de arriba abajo, que es donde el suavizado
  significa algo.

  ── anchors: true MANTIENE VIVOS LOS ENLACES INTERNOS ──

  Con Lenis activo, el salto nativo a un ancla pelea con el suavizado y sale un
  tirón. Con esta opción es la librería la que lleva la página hasta el ancla,
  con la misma inercia que el resto.

  ⚠️ EL AVISO DEL VIDEO NO PASA POR AQUÍ: usa scrollIntoView, que Lenis
  también intercepta. Ver AvisoFlotante.

  Quien pida menos movimiento no recibe nada de esto: se queda con el scroll
  nativo del sistema, que es lo que ha pedido.
*/
export function ScrollSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.6, anchors: true });

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
