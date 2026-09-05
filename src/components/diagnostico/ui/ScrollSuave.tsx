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

    /*
      ── `duration: 2`, EL MISMO VALOR QUE LAS OTRAS LANDINGS ──

      Estuvo en 1,6 y se notaba poco: con la página midiendo unas dos pantallas,
      cualquier gesto llega casi al final y la inercia no tiene recorrido donde
      lucirse. Medido, el desplazamiento se asentaba en ~200 ms frente a los
      ~700 ms de /lista-de-espera — técnicamente había suavizado, pero a esa
      velocidad se percibe como un salto.

      Igualarlo también evita que el sitio tenga dos tactos distintos según la
      landing en la que caiga el visitante.

      ── EL PROBLEMA DE VERDAD ERA EL ALTO DE LA PÁGINA ──

      Y conviene dejarlo escrito, porque no se ve en el código. Esta landing
      mide unas dos pantallas (≈1900 px); /lista-de-espera mide ocho (≈7900).
      Con `duration: 2` en las dos, tres golpes de rueda dejaban esta página a
      mitad de recorrido y aquélla en el 11%: aquí la inercia se agota enseguida
      porque no queda página por delante, no porque esté mal configurada.

      De ahí `wheelMultiplier`. Es la única palanca que compensa un documento
      corto: acorta lo que avanza CADA golpe, así que hacen falta más gestos
      para recorrer lo mismo y cada uno conserva trayecto que suavizar. A 1 —el
      valor por defecto— un solo golpe se plantaba casi en el pie.

      ⚠️ NO SUBIRLO PARA "QUE VAYA MÁS RÁPIDO". Si algún día esta página crece
      —más secciones, testimonios— hay que devolverlo hacia 1: con documento
      largo, un multiplicador bajo obliga a rodar de más para llegar abajo, que
      es el defecto contrario y se nota igual de mal.
    */
    const lenis = new Lenis({
      duration: 2,
      wheelMultiplier: 0.65,
      anchors: true,
    });

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
