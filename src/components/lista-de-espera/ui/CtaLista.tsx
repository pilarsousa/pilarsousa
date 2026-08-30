"use client";

import { ArrowRight } from "lucide-react";
import { useWaitlistModal } from "@/components/lista-de-espera/ui/WaitlistModal";
import { cn } from "@/lib/cn";

/*
  Botón de la landing. Abre el modal del formulario; no navega a ninguna parte.

  ES UN <button> Y NO UN <a>, y la diferencia importa: lo que hace es abrir un
  diálogo en la misma página. Un enlace prometería una navegación que no ocurre
  —el navegador ofrecería "abrir en pestaña nueva", el lector de pantalla lo
  anunciaría como enlace— y ninguna de las dos cosas sería cierta.

  ── UN SOLO TAMAÑO PARA TODA LA LANDING: 470 x 65 A 1920 ──

  Antes cada sección le daba el suyo a través del `font-size` del contenedor, y
  el resultado eran seis botones de seis tamaños. Ahora la medida vive aquí.

  EL ANCHO ES UN TOPE, NO UNA MEDIDA FIJA. `w-full max-w-[470px]`: llena lo que
  le den y no pasa de 470. Un ancho fijo de 470 px reventaría en cuanto la
  ventana bajase de 1920 — la columna del hero mide el 25,5% del ancho, o sea
  326 px a 1280 y 196 a 768, y el botón se saldría de ella hasta un 240%.

  EL RÓTULO ESCALA CON SUELO Y TECHO: 18 px a 1920 y nunca por debajo de 14. El
  alto sale de ahí, porque todo lo de dentro va en em: 3,61em x 18 px = 65.

  EL RÓTULO NO PARTE NUNCA. Con `whitespace-nowrap` un copy demasiado largo
  desborda en vez de romper en dos líneas, y desbordar se ve — romperse, no: un
  botón de dos líneas parece correcto hasta que lo mirás junto a los demás. Es
  un aviso a la vista de que ese CTA hay que acortarlo.

  ── LA FLECHA ES UN ICONO, NO EL SVG DEL MONTAJE ──

  Se retiró flecha-button.svg, que traía el chevron dentro de un disco claro con
  degradado y sombras. Ese disco competía con el propio botón —dos piezas con
  volumen dentro de una— y obligaba a arrastrar un archivo para dibujar una
  flecha. Ahora es ArrowRight de la biblioteca, que hereda color y grosor.

  ── EL RÓTULO VA EN SANS BLANCA, NO EN LA DISPLAY ──

  Es la única pieza de la landing que no usa Trajan: sus versalitas son estrechas
  y de trazo modulado, y a este tamaño dentro de un botón se leen frágiles.

  El tracking añade espacio DESPUÉS de la última letra, así que sin compensarlo
  el rótulo queda descentrado respecto de la flecha. De ahí el margen negativo.

  ── SON DOS PIEZAS ENCAJADAS ──

  Un anillo exterior de filete lima y dentro el cuerpo verde, separados por un
  hueco con cristal verde oscuro. El anillo tiene que ser el ELEMENTO EXTERIOR y
  no una capa superpuesta: siendo el <button>, ese hueco forma parte del área
  pulsable y el foco del teclado rodea la pieza entera.

  EL ANILLO ESTÁ ANIMADO: un filete de luz le da la vuelta al perímetro sin
  parar y el halo respira con él. Vive en .le-cta-anillo (globals.css) porque un
  conic-gradient girando necesita una custom property registrada con @property
  —si no, el navegador no la interpola— y eso no se declara desde una utilidad.

  LOS DOS RADIOS SON IGUALES, NO CONCÉNTRICOS: es lo que pide el diseño, y con
  este hueco lo concéntrico dejaría las esquinas interiores casi en ángulo recto.

  EL DEGRADADO DEL CUERPO VA EN HORIZONTAL —lima a la izquierda, verde bosque a
  la derecha—. Eso deja el extremo derecho tan oscuro que sobre la lluvia de
  código se disolvería; quien sostiene la silueta ahí es el anillo lima.
*/
export function CtaLista({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useWaitlistModal();

  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "group inline-flex w-full max-w-[470px] cursor-pointer rounded-[0.9em]",
        /* 18px FIJOS, y antes era clamp(14, 0.9375vw, 18). Ese clamp sólo
           alcanzaba los 18 a partir de 1920: por debajo encogía —15px a 1600,
           12 a 1280— y el rótulo se leía pequeño en la mayoría de las pantallas.

           Toda la pieza se dimensiona contra este valor, porque lo de dentro va
           en em: fijarlo fija también el alto y el relleno, que es lo que
           mantiene el botón igual a sí mismo en cualquier ancho. El ancho sigue
           siendo elástico —w-full con tope de 470— así que no desborda su
           columna. */
        "text-[18px]",
        /* EL ANILLO ESTÁ VIVO: un filete de luz recorre el perímetro y el halo
           respira con él (ver .le-cta-anillo en globals.css).

           Se fue el `border` liso: un borde es de un color plano y no puede
           degradar, así que el recorrido tuvo que pasar al FONDO del anillo. El
           cuerpo, que es opaco, lo tapa por dentro y sólo lo deja asomar por el
           reborde — que es justo el borde exterior al relleno.

           EL ANILLO ES FINO: 0,17em, unos 3 px a 18. Llegó a medir 0,41 —para
           reponer el grosor del border que sustituía— y a esa medida el filete
           pasaba de acompañar la pieza a competir con ella: se leía como un
           marco, no como un canto encendido. Afinado, el recorrido de luz se
           sigue viendo y el botón recupera su silueta. */
        "le-cta-anillo p-[0.17em]",
        "transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99]",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex w-full items-center justify-center gap-[0.7em]",
          "rounded-[0.9em] px-[1.2em] py-[0.895em]",
          /* El fondo son DOS capas —lámina de cristal encima y degradado
             lima→bosque debajo— y por eso vive en globals.css: la coma que
             separa las dos capas rompe el parseo del valor arbitrario de
             Tailwind, que escribe la clase pero no genera la regla. */
          "le-cta-cuerpo",
          "shadow-[inset_0_0.11em_0_0_rgba(255,255,255,0.34),inset_0_-0.13em_0.45em_0_rgba(18,28,4,0.26),inset_0_0_0_0.06em_rgba(18,28,4,0.28)]",
        )}
      >
        {/* EL TRACKING ES NEGATIVO Y ANTES ERA POSITIVO. Con 0,06em las
            versalitas quedaban tan abiertas que el rótulo se leía como letras
            sueltas en vez de como una frase; a -1px se juntan y vuelve a leerse
            de un golpe. El margen negativo de la derecha se va con él: sólo
            existía para cancelar el espacio que el tracking positivo añadía
            después de la última letra. */}
        <span className="font-sans text-[1em] leading-none font-extrabold tracking-[-1px] whitespace-nowrap text-white uppercase">
          {children}
        </span>

        {/* LA FLECHA SE MUEVE SOLA MIENTRAS EL CURSOR ESTÁ ENCIMA: un vaivén
            corto y continuo, no un único desplazamiento. Un empujón que ocurre
            una vez y se queda quieto no invita a nada; el ciclo repetido sí, y
            es lo que convierte el hover en "dale, entrá".

            El recorrido es de 3 px en 1,1s, con la ida más rápida que la vuelta:
            así el gesto empuja hacia delante en vez de oscilar como un péndulo.
            Vive en .le-cta-flecha (globals.css) porque una animación con
            keyframes no se declara desde una utilidad. */}
        <ArrowRight
          aria-hidden
          strokeWidth={2.5}
          className="le-cta-flecha size-[1.15em] shrink-0 text-white"
        />
      </span>
    </button>
  );
}
