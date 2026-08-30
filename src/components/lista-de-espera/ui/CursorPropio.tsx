"use client";

import { useEffect, useRef, useState } from "react";

/*
  El cursor personalizado de la landing.

  Un disco que sustituye al puntero del sistema y se contrae a un punto verde
  encendido sobre todo lo que se puede pulsar. Los estilos viven en globals.css
  (.le-cursor); aquí sólo está el movimiento y la detección.

  ── SÓLO EN ESCRITORIO, Y SE COMPRUEBA ANTES DE MONTAR ──

  Por debajo de 1025px no se renderiza nada. Sustituir el puntero en un táctil no
  significa nada —no hay puntero— y el `cursor: none` de la hoja dejaría a quien
  tenga un ratón en una pantalla pequeña sin puntero de ningún tipo. La misma
  anchura gobierna el componente y el CSS.

  Empieza en `false` y se corrige tras el primer render, que es lo que evita el
  desajuste de hidratación: en el servidor no hay `window` que medir.

  ── LA POSICIÓN SE ESCRIBE EN UN requestAnimationFrame, NO EN EL EVENTO ──

  `mousemove` puede dispararse varias veces entre dos repintados, y escribir el
  `transform` en cada uno obliga al navegador a recalcular estilo más veces de
  las que va a dibujar. Guardando la última posición y aplicándola una vez por
  frame se escribe exactamente lo que se ve.

  El bucle se detiene cuando el ratón sale de la ventana y arranca al volver: sin
  eso seguiría girando en vacío mientras el visitante está en otra pestaña.

  ── LO PULSABLE SE DETECTA POR DELEGACIÓN, NO ELEMENTO POR ELEMENTO ──

  El encargo original recorría los elementos y les colgaba a cada uno sus dos
  escuchas. Eso tiene dos problemas: son cientos de escuchas en una página de
  este tamaño, y lo que se monte DESPUÉS —el modal del formulario, el diálogo de
  la reseña— no queda registrado y el cursor deja de responder dentro de ellos.

  Aquí se mira el destino del propio `mousemove` con `closest()`, que sube por
  los ancestros hasta encontrar algo pulsable. Una escucha para toda la página, y
  funciona con lo que aparezca más tarde.

  ── NO SE APAGA CON prefers-reduced-motion ──

  A propósito. Esto no es una animación: es el puntero, y ocultarlo dejaría al
  visitante sin saber dónde está el ratón, porque el `cursor: none` de la hoja
  sigue en pie. Lo que sí se retira bajo esa preferencia es la transición de
  tamaño, y eso se hace desde el CSS.
*/

const MINIMO_ESCRITORIO = 1025;

/* Lo que hace que el disco se contraiga. Cubre los controles nativos y las dos
   marcas que usa la landing para piezas pulsables que no son ni <a> ni
   <button> — las cards con onda al pulsar, por ejemplo. */
const PULSABLE =
  'a, button, input, select, textarea, label, summary, [role="button"], [onclick], .le-bento-card, .cursor-activo';

export function CursorPropio() {
  const [esEscritorio, setEsEscritorio] = useState(false);
  const cursor = useRef<HTMLDivElement>(null);
  const disco = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mirar = () =>
      setEsEscritorio(window.innerWidth >= MINIMO_ESCRITORIO);
    mirar();
    window.addEventListener("resize", mirar);
    return () => window.removeEventListener("resize", mirar);
  }, []);

  useEffect(() => {
    if (!esEscritorio) return;
    const caja = cursor.current;
    const punto = disco.current;
    if (!caja || !punto) return;

    /* Fuera de la pantalla hasta el primer movimiento: si arrancara en 0,0
       aparecería un disco en la esquina antes de que el visitante mueva el
       ratón. */
    const raton = { x: -100, y: -100 };
    const ultimo = { x: -100, y: -100 };
    let frame: number | null = null;
    let activo = false;

    const pintar = () => {
      if (raton.x !== ultimo.x || raton.y !== ultimo.y) {
        caja.style.transform = `translate3d(${raton.x}px, ${raton.y}px, 0)`;
        ultimo.x = raton.x;
        ultimo.y = raton.y;
      }
      frame = requestAnimationFrame(pintar);
    };

    const arrancar = () => {
      if (frame === null) frame = requestAnimationFrame(pintar);
    };

    const parar = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    const mover = (e: MouseEvent) => {
      raton.x = e.clientX;
      raton.y = e.clientY;

      /* closest() sube por los ancestros, así que pasar el ratón por el texto de
         dentro de un botón también cuenta como estar sobre el botón. */
      const sobrePulsable = !!(e.target as Element | null)?.closest?.(PULSABLE);
      if (sobrePulsable !== activo) {
        activo = sobrePulsable;
        punto.classList.toggle("activo", activo);
      }

      arrancar();
    };

    /* Con el ratón fuera de la ventana el disco se esconde: si no, se queda
       clavado en el último punto como si el puntero siguiera ahí. */
    const salir = () => {
      parar();
      caja.style.opacity = "0";
    };
    const entrar = () => {
      caja.style.opacity = "1";
      arrancar();
    };

    window.addEventListener("mousemove", mover);
    window.addEventListener("mouseleave", salir);
    window.addEventListener("mouseenter", entrar);

    return () => {
      parar();
      window.removeEventListener("mousemove", mover);
      window.removeEventListener("mouseleave", salir);
      window.removeEventListener("mouseenter", entrar);
    };
  }, [esEscritorio]);

  if (!esEscritorio) return null;

  return (
    <div ref={cursor} aria-hidden className="le-cursor">
      <div ref={disco} className="le-cursor__disco" />
    </div>
  );
}
