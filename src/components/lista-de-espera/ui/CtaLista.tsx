"use client";

import Image from "next/image";
import { useWaitlistModal } from "@/components/lista-de-espera/ui/WaitlistModal";
import { cn } from "@/lib/cn";
import flecha from "@/../public/volver-origen/public/Recursos/generales/flecha-button.svg";

/*
  Botón de la landing. Abre el modal del formulario; no navega a ninguna parte.

  ES UN <button> Y NO UN <a>, y la diferencia importa: lo que hace es abrir un
  diálogo en la misma página. Un enlace prometería una navegación que no ocurre
  —el navegador ofrecería "abrir en pestaña nueva", el lector de pantalla lo
  anunciaría como enlace— y ninguna de las dos cosas sería cierta.

  LA FLECHA ES EL SVG DEL DISEÑO, no un icono de librería: viene con su propio
  degradado y su sombra interior, que es lo que la hace parecer un disco
  embutido en el botón en vez de un icono pegado encima.

  El degradado del fondo va de un verde claro arriba a uno más saturado abajo,
  con una línea de luz de 1 px en el canto superior: el mismo recurso de "pieza
  iluminada desde arriba" que usa el resto del montaje.

  EL RÓTULO VA EN SANS BLANCA, NO EN LA DISPLAY. Es la única pieza de la landing
  que no usa Trajan, y en el montaje se ve claro: las versalitas de Trajan son
  estrechas y de trazo modulado, y a este tamaño dentro de un botón se leen
  frágiles. La sans en negrita aguanta el fondo verde. Va en blanco con una
  sombra mínima, porque el tramo alto del degradado es lo bastante claro como
  para comerse un blanco puro sin ella.

  EL BOTÓN LLENA EL ANCHO QUE LE DEN. Lo fija quien lo coloca: el hero y la
  sección 2 le dan su columna entera, y las secciones 4, 5 y bonus lo envuelven
  en un `w-fit` para que se ajuste al rótulo. Así el mismo componente sirve para
  los dos usos sin una variante.

  SU TAMAÑO LO MANDA EL `font-size` DEL CONTENEDOR. Dentro todo va en em —relleno,
  radio, hueco del anillo, disco de la flecha— así que escalar el texto escala la
  pieza entera sin descuadrar sus proporciones. En móvil el rótulo es largo para
  el ancho disponible, así que ahí el relleno horizontal y el tracking se aprietan
  un poco; el resto se hereda.

  El tracking añade espacio DESPUÉS de la última letra, así que sin compensarlo
  el rótulo queda descentrado respecto de la flecha. De ahí el margen negativo.

  SON DOS PIEZAS, NO UNA: un anillo exterior de filete lima y dentro el cuerpo
  verde, separados por un hueco con cristal verde oscuro (ver más abajo).

  El anillo tiene que ser el ELEMENTO EXTERIOR y no una capa superpuesta: siendo
  el <button>, ese hueco forma parte del área pulsable y el foco del teclado
  dibuja su anillo alrededor de la pieza entera. Con una capa encima habría que
  devolverle los eventos con pointer-events y el foco saldría por debajo.

  LOS DOS RADIOS SON IGUALES, NO CONCÉNTRICOS. Lo concéntrico sería restarle al
  radio exterior el borde y el hueco, y con 0,85em de separación eso dejaría las
  esquinas interiores casi en ángulo recto. El diseño pide el mismo radio en las
  dos piezas, así que van los dos a 0,9em.

  EL DEGRADADO DEL CUERPO VA EN HORIZONTAL —lima #A3CA23 a la izquierda, verde
  bosque #3A5E04 a la derecha—, no en vertical. Eso deja el extremo derecho tan
  oscuro que sobre la lluvia de código se disolvería contra el fondo; quien
  sostiene la silueta ahí es el anillo lima, y por eso ya no hace falta el
  contorno negro que llevaba antes.

  El volumen son tres sombras interiores y ninguna exterior: una línea de luz de
  1 px arriba, un oscurecido en el canto de abajo y un filete oscuro perimetral
  muy tenue. La única sombra exterior es el resplandor verde, y va difuminada al
  máximo para que se lea como luz y no como relieve.
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
        "group inline-flex w-full cursor-pointer rounded-[0.9em] p-[0.62em] md:p-[0.85em]",
        /* EL HUECO ENTRE EL FILETE Y EL CUERPO NO VA VACÍO, LLEVA CRISTAL, y ese
           cristal es VERDE OSCURO, no blanco. Llegó a ser un blanco al 10% y
           salía grisáceo: un blanco diluido sobre fondo oscuro no tiñe, sólo
           aclara, así que la franja se leía como humo gris entre dos piezas
           verdes.

           Con un verde cerrado al 60% la franja pertenece a la pieza: separa el
           filete lima del cuerpo sin introducir un color que no está en el
           diseño. Sigue siendo traslúcida, así que la lluvia de código y la foto
           del hero se siguen intuyendo por debajo. */
        "border-[0.13em] border-[#a3ca23] bg-[#2b4a0d]/60",
        "shadow-[0_0_1.8em_-0.5em_rgba(163,202,35,0.6)]",
        "transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99]",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex w-full items-center justify-center gap-[0.9em]",
          "rounded-[0.9em] px-[1em] py-[1.25em] md:px-[1.8em] md:py-[1.4em]",
          /* El fondo son DOS capas —la lámina de cristal encima y el degradado
             lima→bosque debajo— y por eso vive en globals.css y no aquí: la coma
             que separa las dos capas rompe el parseo del valor arbitrario de
             Tailwind, que escribe la clase en el HTML pero no genera la regla.
             Se comprobó en la hoja servida: cero apariciones. */
          "le-cta-cuerpo",
          /* El oscurecido del canto inferior baja de 0,45 a 0,26 de alfa: la
             lámina de cristal oscurece la MITAD DE ARRIBA, así que una sombra
             fuerte abajo iguala los dos lados y borra justo el contraste que
             hace visible la lámina. */
          "shadow-[inset_0_0.11em_0_0_rgba(255,255,255,0.34),inset_0_-0.13em_0.45em_0_rgba(18,28,4,0.26),inset_0_0_0_0.06em_rgba(18,28,4,0.28)]",
        )}
      >
        <span className="-mr-[0.08em] text-center font-sans text-[1em] leading-none font-extrabold tracking-[0.05em] text-white uppercase md:tracking-[0.08em]">
          {children}
        </span>

        <Image
          src={flecha}
          alt=""
          aria-hidden
          className="w-[1.9em] shrink-0 drop-shadow-[0_0.1em_0.22em_rgba(10,18,2,0.45)] transition-transform duration-200 group-hover:translate-x-[0.15em]"
        />
      </span>
    </button>
  );
}
