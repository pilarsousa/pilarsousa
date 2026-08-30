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

    let disparadores: ScrollTrigger[] = [];

    const registrar = () => {
      const elementos = Array.from(
        document.querySelectorAll<HTMLElement>(MARCADOS),
      ).filter((el) => !el.dataset.leEntrada);

      elementos.forEach((el) => {
        /* La marca evita registrar dos veces el mismo nodo cuando el observador
           vuelve a pasar: un segundo disparador sobre el mismo elemento no rompe
           nada, pero se acumulan sin límite. */
        el.dataset.leEntrada = "1";

        disparadores.push(
          ScrollTrigger.create({
            trigger: el,
            /* El 88% de la ventana: el elemento se revela justo antes de estar
               del todo a la vista, así que quien scrollea a ritmo normal lo
               encuentra ya enfocado. Con el 80% original la animación terminaba
               demasiado abajo y en secciones cortas ni se llegaba a ver. */
            start: "top 88%",
            once: true,
            onEnter: () => el.classList.add("visible"),
          }),
        );

        /* ⚠️ RED DE SEGURIDAD: lo que YA ESTÁ en pantalla al registrarse se
           revela en el acto, sin esperar a que el disparador entre.

           Hace falta porque un ScrollTrigger creado sobre un elemento que ya
           pasó su punto de disparo no se activa solo, y eso ocurre de verdad
           aquí: si el visitante recarga a media página, todo lo de arriba queda
           invisible para siempre. */
        const caja = el.getBoundingClientRect();
        if (caja.top < window.innerHeight * 0.88) el.classList.add("visible");
      });
    };

    registrar();

    /* ⚠️ SE VUELVE A BUSCAR CUANDO EL ÁRBOL CAMBIA, y no es una precaución
       teórica: es el bug por el que las tres cards de "vas a trabajar tres
       áreas" no se veían en móvil.

       Varias piezas de la landing deciden qué renderizar según el ancho de la
       ventana (useEsMovil), que arranca en `false` y se corrige DESPUÉS del
       primer render — en el servidor no hay window que medir. React reemplaza
       entonces esos nodos por otros nuevos, y los nuevos nunca pasaron por el
       querySelectorAll de arriba: se quedaban con la clase de entrada puesta,
       o sea con opacity 0, para siempre.

       Un MutationObserver los recoge en cuanto aparecen. Mira sólo altas y bajas
       de nodos, no atributos, así que añadir la clase `visible` desde aquí no lo
       vuelve a disparar.

       VA CON ESPERA, y es imprescindible: en esta página el DOM muta sin parar
       —la lluvia de código añade y quita glifos, el bento clona partículas en
       cada hover— y volver a recorrer el documento en cada mutación sería un
       querySelectorAll continuo sobre el árbol entero. Con la espera, una
       ráfaga de mutaciones se resuelve en un solo repaso.

       El repaso en sí es barato porque `registrar` descarta lo ya marcado con
       el data-attribute; lo caro sería repetirlo cien veces por segundo. */
    let espera: ReturnType<typeof setTimeout> | null = null;
    const observador = new MutationObserver(() => {
      if (espera !== null) clearTimeout(espera);
      espera = setTimeout(registrar, 200);
    });
    observador.observe(document.body, { childList: true, subtree: true });

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
      observador.disconnect();
      if (espera !== null) clearTimeout(espera);
      disparadores.forEach((d) => d.kill());
      disparadores = [];
      document.removeEventListener("le:lenis-frame", alFrame);
      window.removeEventListener("load", refrescar);
    };
  }, []);

  return null;
}
