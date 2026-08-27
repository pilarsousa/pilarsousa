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
        "group inline-flex w-full max-w-[470px] cursor-pointer rounded-[0.9em] p-[0.3em]",
        "text-[clamp(0.875rem,0.9375vw,1.125rem)]",
        /* El hueco entre el filete y el cuerpo lleva cristal VERDE OSCURO, no
           blanco: un blanco diluido sobre fondo oscuro no tiñe, sólo aclara, y
           la franja se leía como humo gris entre dos piezas verdes. */
        "border-[0.11em] border-[#a3ca23] bg-[#2b4a0d]/60",
        "shadow-[0_0_1.8em_-0.5em_rgba(163,202,35,0.6)]",
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
        <span className="-mr-[0.08em] font-sans text-[1em] leading-none font-extrabold tracking-[0.06em] whitespace-nowrap text-white uppercase">
          {children}
        </span>

        <ArrowRight
          aria-hidden
          strokeWidth={2.5}
          className="size-[1.15em] shrink-0 text-white transition-transform duration-200 group-hover:translate-x-[0.15em]"
        />
      </span>
    </button>
  );
}
