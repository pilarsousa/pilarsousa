"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/*
  EL BOTÓN DE LA LANDING — sólo su aspecto.

  Se separó de CtaLista porque el aspecto y el comportamiento eran una sola
  pieza, y el formulario del modal necesita EL MISMO botón haciendo otra cosa:
  CtaLista abre el diálogo, y dentro de ese diálogo el botón envía el formulario.
  Un `type="submit"` no puede salir de un componente cuyo onClick está fijado a
  "abrir modal".

  Así que aquí vive la apariencia y nada más. CtaLista lo envuelve para abrir el
  modal; WaitlistForm lo usa directamente como submit.

  ── UN SOLO TAMAÑO PARA TODA LA LANDING: 470 x 65 A 1920 ──

  Antes cada sección le daba el suyo a través del `font-size` del contenedor, y
  el resultado eran seis botones de seis tamaños. Ahora la medida vive aquí.

  EL ANCHO ES UN TOPE, NO UNA MEDIDA FIJA. `w-full max-w-[470px]`: llena lo que
  le den y no pasa de 470. Un ancho fijo reventaría en cuanto la ventana bajase
  de 1920 — la columna del hero mide el 25,5% del ancho, o sea 326 px a 1280.

  EL RÓTULO NO PARTE NUNCA. Con `whitespace-nowrap` un copy demasiado largo
  desborda en vez de romper en dos líneas, y desbordar se ve — romperse, no: un
  botón de dos líneas parece correcto hasta que lo mirás junto a los demás.

  ── SON DOS PIEZAS ENCAJADAS ──

  Un anillo exterior de filete lima y dentro el cuerpo verde. El anillo tiene que
  ser el ELEMENTO EXTERIOR y no una capa superpuesta: siendo el <button>, ese
  hueco forma parte del área pulsable y el foco del teclado rodea la pieza
  entera.

  EL ANILLO ESTÁ ANIMADO: un filete de luz le da la vuelta al perímetro sin parar
  y el halo respira con él. Vive en .le-cta-anillo (globals.css) porque un
  conic-gradient girando necesita una custom property registrada con @property
  —si no, el navegador no la interpola— y eso no se declara desde una utilidad.

  ── LA FLECHA ES OPCIONAL ──

  En la landing anuncia que el botón lleva a alguna parte. Dentro del formulario
  no: ahí el botón envía, y el estado de la petición —enviando, enviado— ocupa su
  sitio con su propio icono. De ahí `flecha={false}`.
*/
export function BotonVo({
  children,
  className,
  type = "button",
  onClick,
  disabled,
  flecha = true,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  flecha?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group inline-flex w-full max-w-[470px] cursor-pointer rounded-[0.9em]",
        /* DOS TAMAÑOS FIJOS: 16px en móvil y 18 de md en adelante.
           Antes era un clamp(14, 0.9375vw, 18) que sólo alcanzaba los 18 a
           partir de 1920: por debajo encogía —15px a 1600, 12 a 1280— y el
           rótulo se leía pequeño en la mayoría de las pantallas.

           En móvil baja a 16 porque el botón ocupa casi todo el ancho de la
           columna y a 18 el rótulo llegaba al borde: `whitespace-nowrap` no
           permite que parta, así que un copy algo más largo desbordaría.

           Toda la pieza se dimensiona contra este valor, porque lo de dentro va
           en em: fijarlo fija también el alto y el relleno. */
        "text-[16px] md:text-[18px]",
        "le-cta-anillo p-[0.17em]",
        "transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99]",
        /* Deshabilitado se apaga y deja de responder al cursor. El anillo sigue
           girando: el botón está inactivo, no roto. */
        "disabled:cursor-default disabled:opacity-60 disabled:hover:brightness-100 disabled:active:scale-100",
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
        {/* EL TRACKING ES CASI NULO. Empezó en 0,06em positivo —las versalitas
            quedaban tan abiertas que el rótulo se leía como letras sueltas—,
            pasó por -1px —donde las mayúsculas se rozaban entre sí— y se quedó
            en -0,3: la frase se lee de un golpe sin que las letras se toquen.
            En caja alta el defecto de rozarse se nota antes que el de separarse. */}
        <span className="font-sans text-[1em] leading-none font-extrabold tracking-[-0.3px] whitespace-nowrap text-white uppercase">
          {children}
        </span>

        {/* LA FLECHA SE MUEVE SOLA MIENTRAS EL CURSOR ESTÁ ENCIMA: un vaivén
            corto y continuo, no un único desplazamiento. Un empujón que ocurre
            una vez y se queda quieto no invita a nada; el ciclo repetido sí.
            Vive en .le-cta-flecha (globals.css). */}
        {flecha && (
          <ArrowRight
            aria-hidden
            strokeWidth={2.5}
            className="le-cta-flecha size-[1.15em] shrink-0 text-white"
          />
        )}
      </span>
    </button>
  );
}
