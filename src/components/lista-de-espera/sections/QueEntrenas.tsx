import type { CSSProperties } from "react";
import { CtaLista } from "@/components/lista-de-espera/ui/CtaLista";
import { PilaCards } from "@/components/lista-de-espera/ui/PilaCards";
import { HERO, QUE_ENTRENAS } from "@/components/lista-de-espera/content";
import card1 from "@/../public/volver-origen/public/Recursos/generales/card1-web.webp";
import card2 from "@/../public/volver-origen/public/Recursos/generales/card2-web.webp";
import card3 from "@/../public/volver-origen/public/Recursos/generales/card3-web.webp";
import card4 from "@/../public/volver-origen/public/Recursos/generales/card4-web.webp";
import card5 from "@/../public/volver-origen/public/Recursos/generales/card5-web.webp";
import card1m from "@/../public/volver-origen/public/Recursos/mobile/card1-mobile.webp";
import card2m from "@/../public/volver-origen/public/Recursos/mobile/card2-mobile.webp";
import card3m from "@/../public/volver-origen/public/Recursos/mobile/card3-mobile.webp";
import card4m from "@/../public/volver-origen/public/Recursos/mobile/card4-mobile.webp";
import card5m from "@/../public/volver-origen/public/Recursos/mobile/card5-mobile.webp";

const FONDOS = [card1, card2, card3, card4, card5];

/* Los de móvil no son los mismos reencuadrados: miden 674x720 —casi cuadrados—
   frente a los 754x300 apaisados del escritorio. La ilustración está recompuesta
   para dejar sitio al texto abajo en vez de a la izquierda. */
const FONDOS_MOVIL = [card1m, card2m, card3m, card4m, card5m];

/*
  Sección 4 — ¿Qué vas a entrenar durante el proceso?

  EL APILADO VIVE EN PilaCards, que es cliente: necesita un IntersectionObserver
  para recortar a un renglón los títulos de dos renglones antes de que la card
  siguiente se los coma por la mitad. El resto de la sección es servidor.

  El apilado en sí es `position: sticky` y nada más —sin escuchar el scroll—, que
  es justo lo que pedía el encargo de que no rompa en móvil: un apilado guiado por
  JS recalcula en cada evento y ahí pelea con el scroll inercial y con la barra de
  direcciones, que cambia el alto del viewport a media animación. Los detalles,
  en el propio componente.

  UNA CONDICIÓN QUE HAY QUE RESPETAR: `sticky` deja de funcionar, en silencio, si
  cualquier ancestro tiene `overflow` distinto de `visible`. Si algún día la pila
  deja de pegarse, el culpable es un `overflow-hidden` nuevo por encima.

  ── LAS CARDS ──

  El archivo trae YA DIBUJADO el panel negro de la izquierda y las esquinas
  redondeadas, así que el texto va superpuesto sobre ese panel y no hace falta ni
  velo ni `border-radius`: la mitad derecha es ilustración y la izquierda está
  reservada para la letra.

  ── LAS MEDIDAS ──

  La columna mide el 39,27% del ancho de la ventana, y no es un número redondeado
  a ojo: a 1920 px eso da 754, que es el ancho nativo exacto de los archivos. La
  card se ve a tamaño real y no se interpola.
*/
export function QueEntrenas() {
  return (
    <section
      aria-labelledby="que-entrenas-titulo"
      className="relative bg-white pt-[14vw] pb-[16vw] md:pt-[6vw] md:pb-[10vw]"
    >
      <h2
        id="que-entrenas-titulo"
        className="px-[6.5vw] text-center font-display text-[6.4vw] leading-[1.2] text-[#141b0a] md:px-0 md:text-[clamp(0.85rem,1.45vw,1.9rem)] md:leading-[1.25]"
      >
        {QUE_ENTRENAS.title}
        <br />
        {QUE_ENTRENAS.titleAccent}?
      </h2>

      {/* El subtítulo va en un tarjetón verde, el mismo recurso que la sección 3:
          sobre blanco el verde de marca no aguanta como tinta, así que se usa
          como fondo y la letra va oscura encima. Se ajusta a su contenido. */}
      <p className="mx-auto mt-[6vw] w-fit max-w-[86%] rounded-[2vw] border border-[#4a6b12] bg-[linear-gradient(180deg,#a8cf3c_0%,#93c02c_45%,#7cae1f_100%)] px-[4.5vw] py-[3vw] text-center font-sans text-[3.7vw] leading-[1.4] text-[#16210a] md:mt-[1.65vw] md:max-w-none md:rounded-[0.45vw] md:border-[max(0.06vw,1px)] md:px-[1.1vw] md:py-[0.7vw] md:text-[clamp(0.45rem,0.79vw,1rem)] md:leading-none shadow-[inset_0_0.06vw_0_0_rgba(255,255,255,0.4),0_0.3vw_1vw_-0.35vw_rgba(124,181,24,0.5)]">
        <strong className="font-bold">Una nueva forma</strong>
        {QUE_ENTRENAS.subtitle.replace("Una nueva forma", "")}
      </p>

      <div className="mt-[9vw] md:mt-[3.5vw]">
        <PilaCards
          items={QUE_ENTRENAS.items}
          fondos={FONDOS}
          fondosMovil={FONDOS_MOVIL}
        />
      </div>

      {/* El CTA tiene su propia pista sticky en escritorio. Como es el último
          elemento de la sección, pegarlo directamente no le daba recorrido real:
          al scrollear seguía subiendo sobre la pila. Esta pista lo mantiene
          abajo, separado de las cards, hasta que la sección siguiente entra. */}
      <div className="mt-[7vw] md:mt-[2vw] md:h-[28vw]">
        <div
          /* EL DESPLAZAMIENTO VIAJA COMO VARIABLE Y SÓLO SE APLICA DE md: HACIA
             ARRIBA. Iba como `top` en estilo en línea, y un estilo en línea no
             entiende de puntos de ruptura: en móvil el elemento se queda en
             `relative` —porque el sticky es md:— y ahí `top` deja de ser un
             anclaje y pasa a ser un empujón. Bajaba el botón unos 250 px desde
             su sitio y lo dejaba encima de la sección siguiente. */
          className="relative z-30 mx-auto w-[87%] md:sticky md:top-[var(--le-cta-top)] md:w-fit"
          style={
            {
              "--le-cta-top": "min(calc(12vh + 36vw), calc(100svh - 5.2em))",
            } as CSSProperties
          }
        >
          <CtaLista>{HERO.cta}</CtaLista>
        </div>
      </div>
    </section>
  );
}
