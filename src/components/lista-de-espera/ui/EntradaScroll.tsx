"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  Las entradas al hacer scroll de toda la landing.

  Cada elemento marcado con .aparece-abajo / -arriba / -izquierda / -derecha se
  revela cuando entra en pantalla: sube desde su desplazamiento, se enfoca desde
  un desenfoque y pasa de un brillo alto a su color normal. La sensación es la de
  algo que ESTABA ahí y se pone a foco, no la de algo que aparece de la nada — y
  esa diferencia es la que da peso a lo que se lee.

  ── SE MONTA UNA VEZ PARA TODA LA PÁGINA ──

  Un solo componente en el layout registra todos los elementos marcados, en vez
  de que cada sección traiga su propia lógica. Marcar es añadir una clase, así
  que una sección nueva entra en el sistema sin tocar este archivo.

  ── SE REVELA UNA SOLA VEZ, NO EN CADA PASADA ──

  El original del encargo quitaba la clase al salir (onLeave/onLeaveBack), de
  modo que el elemento se volvía a desvanecer y se re-animaba al volver. En una
  landing de venta eso juega en contra: el visitante que sube a releer algo se
  encuentra el texto borroso otra vez, y lo que era una entrada elegante pasa a
  ser un estorbo entre él y la información. Aquí cada elemento se revela una vez
  y se queda.

  ── LA CONEXIÓN CON LENIS ES OBLIGATORIA ──

  Esta landing lleva scroll suavizado (SmoothScroll.tsx). Lenis mueve la página
  con su propio bucle, y ScrollTrigger —que escucha el evento `scroll` del
  navegador— se entera tarde o no se entera: los disparos se quedan desfasados
  respecto de lo que se ve. `ScrollTrigger.update` en cada frame de Lenis es lo
  que los mantiene en el mismo reloj.

  Se conectan a través de un evento del documento y no importando el objeto de
  Lenis, porque son dos componentes hermanos montados en el mismo layout: quien
  crea la instancia avisa cuando está lista, y esto se engancha si existe. Si
  algún día Lenis se retira, esto sigue funcionando con el scroll nativo.

  ── SIN MOVIMIENTO ──

  Con prefers-reduced-motion no se registra nada y una regla de la hoja deja los
  elementos ya visibles. Un contenido que sólo aparece al animarse sería
  contenido perdido para quien pidió no ver animaciones — el fallo más grave que
  puede tener un efecto de entrada.
*/

const MARCADOS =
  ".aparece-abajo, .aparece-arriba, .aparece-izquierda, .aparece-derecha";

export function EntradaScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const elementos = Array.from(
      document.querySelectorAll<HTMLElement>(MARCADOS),
    );

    const disparadores = elementos.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        /* El 88% de la ventana: el elemento se revela justo antes de estar del
           todo a la vista, así que quien scrollea a ritmo normal lo encuentra ya
           enfocado. Con el 80% original la animación terminaba demasiado abajo y
           en secciones cortas ni se llegaba a ver. */
        start: "top 88%",
        once: true,
        onEnter: () => el.classList.add("visible"),
      }),
    );

    /* ── EL PUENTE CON LENIS ──

       Sin esto los disparos van desfasados: Lenis desplaza la página por su
       cuenta y ScrollTrigger no lo percibe hasta que el navegador emite su
       propio evento de scroll, que llega tarde. */
    const alFrame = () => ScrollTrigger.update();
    document.addEventListener("le:lenis-frame", alFrame);

    /* Las imágenes que terminan de cargar cambian el alto del documento y con él
       la posición de todo lo que va debajo. Sin recalcular, los disparadores se
       quedan apuntando a donde estaban las cosas antes. */
    const refrescar = () => ScrollTrigger.refresh();
    window.addEventListener("load", refrescar);

    return () => {
      disparadores.forEach((d) => d.kill());
      document.removeEventListener("le:lenis-frame", alFrame);
      window.removeEventListener("load", refrescar);
    };
  }, []);

  return null;
}
