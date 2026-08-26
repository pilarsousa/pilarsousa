import Image from "next/image";
import { Diagnostico } from "@/components/lista-de-espera/sections/Diagnostico";
import { ParaVos } from "@/components/lista-de-espera/sections/ParaVos";
import { FlechaBajar } from "@/components/lista-de-espera/ui/FlechaBajar";
import banner from "@/../public/volver-origen/public/Recursos/generales/banner-2-web.webp";

/*
  El fondo que comparten las secciones 2 y 3.

  EXISTE PORQUE LAS DOS SECCIONES SON UNA SOLA IMAGEN. banner-2 mide 1922x1500 y
  trae dibujadas la diagonal, la cuña y la lluvia de código: su mitad superior es
  el diagnóstico y la inferior la banda de "es para vos si…". Partirlo en dos
  archivos obligaría a hacer casar el corte al píxel en cada ancho de ventana, así
  que va entero y cada sección se coloca encima en absoluto.

  Va como BLOQUE con alto automático, no con `fill`: así es la imagen la que fija
  el alto y las diagonales caen donde el diseño las puso en cualquier ancho.

  EL BLOQUE SUBE 4,05% Y SE MONTA SOBRE EL PIE DEL HERO. No es un ajuste a ojo:
  banner-1 termina en un trapecio que baja a y=799 en el centro pero se corta a
  y=722 en los extremos, dejando una muesca transparente de 78 px en las esquinas
  de abajo; banner-2 llega a y=0 justo desde x=78,8%, que es exactamente donde el
  hero abre su muesca. Las dos piezas están dibujadas para engranar ahí. Puestas
  a tope, los dos huecos se suman y dejan una franja blanca cruzando de lado a
  lado; solapadas 78 px —el 4,05% del ancho— el vértice cierra sin hueco y sin
  pisarse.

  z-10 para que el banner que sube quede POR ENCIMA del hero y no debajo: sin él,
  el solape lo taparía justo el elemento que tiene que asomar.

  ── EN MÓVIL NO HAY BANNER ──

  Ni banner, ni aureola, ni disco de flecha: todo eso vive de md: hacia arriba.
  banner-2 es una panorámica de 1922x1500 con las dos secciones repartidas a
  izquierda y derecha; en 390 px de ancho ese reparto no cabe, y encogerla
  dejaría el texto ilegible.

  Así que en móvil este contenedor no pinta nada y sus dos secciones dejan de ir
  en absoluto para apilarse en flujo, cada una con su propio fondo: la 2 en
  blanco y la 3 en negro con la lluvia de código encima. Es lo que pedía el
  diseño, y de paso las dos recuperan el alto que necesita su texto en vez de
  heredar el de una imagen pensada para otro formato.

  ── ESTA SECCIÓN NO PINTA FONDO, Y ES IMPRESCINDIBLE ──

  Llevaba `bg-white` y había que quitarlo. Un fondo opaco aquí tapa los 78 px del
  hero que quedan debajo del solape, y ahí es justo donde está su cuña: banner-1
  baja hasta y=799 en el centro y se corta en y=722 en los extremos. Con el
  blanco encima, ese remate desaparecía y el hero se veía cortado en recto de
  lado a lado.

  Sin fondo, cada zona transparente del banner enseña lo que de verdad tiene
  detrás: dentro del solape, la cuña del hero; por debajo, el blanco de <main>.
  Es el mismo blanco de antes, así que no cambia nada más.

  OJO: no vale copiar esto a la sección 5. Aquella también sube sobre la
  anterior, pero debajo tiene el botón de "qué vas a entrenar", no una cuña — sin
  su `bg-white` ese botón asomaría por la muesca del banner.
*/
export function PanelCodigo() {
  return (
    <div
      id="diagnostico"
      /* overflow-x-clip Y NO overflow-hidden. La aureola del canto derecho está
         centrada en el borde, así que media elipse cae fuera de la sección y
         ensanchaba la página: aparecía barra de scroll horizontal.

         Se recorta con `clip` porque recorta sin crear un contenedor de scroll.
         `hidden` sí lo crea, y un contenedor de scroll por encima anula en
         silencio cualquier posicionamiento pegajoso que tenga debajo. Aquí
         dentro no hay ninguno, pero la pila de la sección 4 sí depende de eso, y
         conviene que la costumbre en esta landing sea `clip`. */
      className="relative isolate z-10 scroll-mt-0 overflow-x-clip md:-mt-[4.05%]"
    >
      {/* unoptimized: se sirve el archivo tal cual, SIN que Next lo recodifique.

          Medido, no supuesto: comparando el salto de luminancia en los bordes de
          bloque de 16 px contra el salto dentro del bloque, en las zonas oscuras
          del panel, el original da 1,21 y lo que servía Next 1,58. La segunda
          pasada de WebP añadía más de la mitad de la rejilla visible. Un fondo de
          degradados casi negros es el peor caso para un códec con pérdida: en
          negro, un desvío de 29/255 se ve como un escalón.

          El 1,21 que queda viene grabado en el propio archivo —el WebP de origen
          ya es con pérdida— y sólo se quita reexportándolo sin pérdida.

          Sale caro en bytes —550 KB frente a 95— y se acepta porque esta imagen
          va por debajo del pliegue y se carga en diferido, así que no entra en el
          LCP. El banner del hero SÍ es el LCP y por eso sigue optimizado. */}
      <Image
        src={banner}
        alt=""
        unoptimized
        sizes="100vw"
        placeholder="blur"
        className="hidden h-auto w-full md:block"
      />

      {/* LA AUREOLA DEL CANTO DERECHO. No viene en el archivo: banner-2 está
          plano de lado a lado —luminancia media entre 6 y 9 en todas sus
          columnas— así que la luz que pide el montaje hay que ponerla aquí.

          Misma receta que los halos de la sección 5, y por el mismo motivo:
          mix-blend-screen no puede oscurecer, así que sobre la lluvia de código
          suma luz y sobre el blanco de la izquierda no hace nada. La media
          elipse que cae fuera de la imagen se vuelve invisible sola, sin
          recortar nada — y no recortar importa, porque un overflow aquí
          rompería en silencio los `position: sticky` de más abajo.

          El `isolate` de la sección es lo que mantiene la mezcla dentro.

          RECORRE LA SECCIÓN DE ARRIBA ABAJO, no respira en el sitio. Por eso
          se ancla en top-0 y mide sólo el 42% del alto: el keyframe la baja un
          138% de su propia altura —el 58% de la sección— así que su canto
          inferior va del 42% al 100%. Barre el panel entero en 24 s.

          Ojo con que en ese keyframe va también el desplazamiento en X, así que
          aquí NO puede llevar translate-x-1/2: `transform` es una sola propiedad
          y una cosa pisaría a la otra. */}
      <div
        aria-hidden
        className="le-aureola pointer-events-none absolute top-0 right-0 hidden h-[42%] w-[19%] md:block bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,228,72,0.5)_0%,rgba(126,198,52,0.22)_42%,transparent_74%)] mix-blend-screen blur-[1.6vw]"
      />
      {/* El disco va montado a caballo sobre la juntura, de ahí el
          desplazamiento negativo. Y el 5,19% no es un ajuste a ojo: la sección
          empieza 78 px POR ENCIMA del pie del hero —es el solape que hace
          engranar los dos banners— así que la juntura que se ve no está en el
          top de esta caja sino esos 78 px más abajo, que sobre su alto son el
          5,19%. Con el disco en top-0 flotaba en mitad de la foto. */}
      <FlechaBajar
        destino="diagnostico"
        className="absolute top-[5.19%] left-1/2 hidden w-[clamp(0.9rem,1.6vw,2rem)] -translate-x-1/2 -translate-y-1/2 cursor-pointer md:block"
      />

      <Diagnostico />
      <ParaVos />
    </div>
  );
}
