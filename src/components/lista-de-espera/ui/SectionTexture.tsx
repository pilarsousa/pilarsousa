import Image from "next/image";
import { cn } from "@/lib/cn";
import claroPc from "@/../public/volver-origen/public/img/fondo/fondo-text-pc-1.png";
import oscuroPc from "@/../public/volver-origen/public/img/fondo/fondo-text-pc-2.png";
import claroCel from "@/../public/volver-origen/public/img/fondo/fondo-text-cel-1.png.png";
import oscuroCel from "@/../public/volver-origen/public/img/fondo/fondo-text-cel-2.png";

/*
  Fondo texturado de una sección, con sus bordes difuminados.

  Sustituye a los degradados de color planos que llevaban las secciones. Mantiene
  el mismo esquema que había: alternancia oscuro / claro / oscuro y transiciones
  desvanecidas entre secciones, sólo que ahora el color lo pone una imagen con
  grano en vez de un tinte liso.

  EL DESVANECIDO ES UNA MÁSCARA, no un degradado encima.

  Con un degradado habría que elegir hacia qué color fundir, y eso ya nos costó
  una línea visible en otra sección: el fondo real cambia según lo que haya
  detrás. La máscara vuelve transparente la propia textura y deja ver el fondo
  de la página, sea el que sea. Las paradas en 35% y 65% son las mismas que
  usaba el tinte al que sustituye, para que la transición se lea igual.

  Cada tamaño tiene su propio recorte —1920x900 en escritorio, 971x1619 en
  móvil— y ninguno lleva `priority`: son decoración, no deben competir con el
  contenido por el ancho de banda inicial.
*/

const DESVANECIDO =
  "linear-gradient(to bottom, transparent 0%, #000 35%, #000 65%, transparent 100%)";

type SectionTextureProps = {
  /** "oscuro" para el fondo continuo de la página, "claro" para la sección que alterna. */
  variant: "oscuro" | "claro";
  /* fija la capa a la ventana en vez de a su contenedor. La usa el fondo
     continuo: al no moverse con el scroll, es una única imagen para toda la
     página y no hay costuras entre secciones. */
  fixed?: boolean;
  /* Sin desvanecido para el fondo continuo, que debe cubrir de punta a punta. */
  fade?: boolean;
  className?: string;
};

export function SectionTexture({
  variant,
  fixed = false,
  fade = true,
  className,
}: SectionTextureProps) {
  const claro = variant === "claro";

  return (
    <div
      aria-hidden
      /* La capa fija NO usa inset-0, y es justo lo que hay que respetar aquí.

         inset-0 la ata al alto de la ventana, y en un móvil ese alto CAMBIA
         mientras se scrollea: al esconderse la barra de direcciones la caja
         crece unos 60 px. Como la textura se pinta con object-cover, cualquier
         cambio de caja vuelve a calcular el recorte y la imagen se desplaza. El
         fondo no se movía con la página —es fixed—, se re-encuadraba, que a la
         vista es lo mismo, y se notaba sobre todo en la sección anclada, donde
         el contenido está quieto y el fondo es lo único que puede delatarse.

         100lvh es el alto de la ventana CON la barra retraída, o sea el máximo:
         no crece más, así que ya no hay recorte que recalcular. */
      className={cn(
        "pointer-events-none -z-10",
        fixed ? "fixed inset-x-0 top-0 h-[100lvh]" : "absolute inset-0",
        className,
      )}
      style={
        fade
          ? { maskImage: DESVANECIDO, WebkitMaskImage: DESVANECIDO }
          : undefined
      }
    >
      {/* La capa fija ancla el recorte ARRIBA en vez de al centro. Si algún día
          la caja cambia de alto de todos modos —un navegador con otra idea de
          lo que es la ventana—, con el anclaje al centro se desplazaría la
          imagen entera; anclada arriba, lo único que varía es cuánto se ve por
          abajo, que no se nota. */}
      <Image
        src={claro ? claroCel : oscuroCel}
        alt=""
        fill
        quality={90}
        sizes="100vw"
        className={cn("object-cover lg:hidden", fixed && "object-top")}
      />
      <Image
        src={claro ? claroPc : oscuroPc}
        alt=""
        fill
        quality={90}
        sizes="100vw"
        className={cn("hidden object-cover lg:block", fixed && "object-top")}
      />
    </div>
  );
}
