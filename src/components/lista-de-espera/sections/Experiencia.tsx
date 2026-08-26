import Image from "next/image";
import { CtaLista } from "@/components/lista-de-espera/ui/CtaLista";
import { LluviaCodigo } from "@/components/lista-de-espera/ui/LluviaCodigo";
import { FlechaBajar } from "@/components/lista-de-espera/ui/FlechaBajar";
import { EXPERIENCIA } from "@/components/lista-de-espera/content";
import banner from "@/../public/volver-origen/public/Recursos/generales/banner-3-web.webp";
import mockup1 from "@/../public/volver-origen/public/Recursos/generales/mockup1.webp";
import mockup2 from "@/../public/volver-origen/public/Recursos/generales/mockup2.webp";
import mockup3 from "@/../public/volver-origen/public/Recursos/generales/mockup3.webp";
import cardRelaciones from "@/../public/volver-origen/public/Recursos/generales/card-relaciones.webp";
import cardProposito from "@/../public/volver-origen/public/Recursos/generales/card-proposito.webp";
import cardDinero from "@/../public/volver-origen/public/Recursos/generales/card-dinero.webp";

const MOCKUPS = [mockup1, mockup2, mockup3];

/*
  Los tres fondos, y uno no es como los otros dos.

  card-relaciones llegó después y con otras características: 1283x1226 en vez
  de 366x350 —más resolución, que viene bien— pero SIN canal alfa y SIN el
  borde. Sus dos hermanas traen horneadas las esquinas redondeadas (radio de
  12 px sobre 366, el 3,3% del ancho) y un filete de 1 px en degradado vertical
  que va de #bfdb74 arriba a casi negro abajo.

  Puesta tal cual, esa card se vería con las esquinas en pico y sin filete al
  lado de las otras dos. Así que se le reponen por CSS, y sólo a ella: aplicarlo
  a las tres duplicaría el borde ya dibujado de las hermanas.

  Lo limpio sería reexportarla con las mismas características y quitar esta
  compensación. Mientras tanto, `compensar` marca exactamente qué es un apaño.
*/
const FONDOS_AREA = [
  { src: cardRelaciones, compensar: true },
  { src: cardProposito, compensar: false },
  { src: cardDinero, compensar: false },
];

/*
  Sección 5 — Una experiencia diseñada para que lo lleves a tu vida real.

  ENGRANA CON LA SECCIÓN ANTERIOR IGUAL QUE EL HERO CON LA 2, y las medidas salen
  del alfa de los archivos, no de la vista: banner-2 termina en y=1433 de 1500 en
  los bordes y banner-3 arranca en y=0, así que se solapan 67 px —el 3,49% del
  ancho— y el canto cierra sin hueco ni pisarse.

  La muesca de 122 px que banner-3 trae en el centro de su borde superior no es un
  defecto: es la cuña blanca por la que asoma el disco de la flecha, y por eso el
  disco va al 6,4% del alto y no pegado al canto como el de la sección 2.

  SE SIRVE SIN OPTIMIZAR. Aquí no es por calidad sino porque no hay nada que
  ganar: el archivo pesa 39 KB y lo que devuelve el optimizador pesa 38: un
  kilobyte de diferencia a cambio de una segunda pasada de WebP con pérdida sobre
  un fondo de degradados oscuros, que es justo donde se nota (ver PanelCodigo).

  LAS DOS COLUMNAS VAN EN PORCENTAJES DEL ANCHO DE LA VENTANA, como el resto de la
  landing: la de texto al 20,1% y la de mockups al 54,3%. Los mockups miden 483 px
  de ancho nativo y la columna el 25,3%, que a 1920 da 486: se ven a tamaño real.

  LA SECCIÓN VA EN DOS MITADES sobre el mismo banner: arriba el listado con los
  mockups, y del 63,5% hacia abajo la banda de las tres áreas con su propio
  titular y su botón. Todo colocado en absoluto sobre la imagen, que es la que
  fija el alto.
*/
export function Experiencia() {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-titulo"
      className="relative isolate z-20 overflow-x-clip bg-black px-[6.5vw] py-[14vw] md:-mt-[3.49%] md:bg-white md:p-0"
    >
      {/* SE RECORTA UN 1,05% POR CADA LADO, y hace falta: el archivo trae un
          triángulo transparente en el canto izquierdo —de (0, 1839) a (20, 0),
          20 columnas de 1945— por el que se colaba una tira blanca de arriba
          abajo. Es un residuo de la exportación, no una forma del diseño.

          El recorte va SIMÉTRICO a propósito. Desplazar la imagen sólo hacia la
          izquierda bastaría para tapar la tira, pero correría su centro medio
          punto porcentual, y justo en el centro está la muesca por la que asoma
          el disco de la flecha: se vería descentrado unos 10 px sobre un disco
          de 31. Quitando lo mismo por los dos lados el centro se queda en el
          50%, y lo que se pierde por la derecha es fondo liso.

          max-w-none es imprescindible: el preflight de Tailwind pone un
          max-width del 100% a las imágenes, que anularía el 102,1% sin avisar. */}
      <Image
        src={banner}
        alt=""
        unoptimized
        sizes="100vw"
        placeholder="blur"
        className="hidden h-auto max-w-none md:-ml-[1.05%] md:block md:w-[102.1%]"
      />

      {/* LOS DOS HALOS DE LOS CANTOS.

          Van como capa aparte porque en el archivo apenas vienen insinuados, y
          el montaje los quiere bien presentes.

          mix-blend-screen y no una capa verde con transparencia: "screen" no
          puede oscurecer: sobre el negro del fondo suma luz, y sobre el blanco
          da blanco. Cada halo está centrado en el canto, así que la mitad de su
          elipse cae fuera de la imagen. La sección recorta sólo el eje X para que
          esas cajas luminosas no ensanchen el documento; no es ancestro del
          apilado sticky de la sección anterior, así que no interfiere con él.

          El `isolate` de la sección es lo que mantiene la mezcla aquí dentro y no
          deja que se aplique contra lo que haya debajo en la página. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[12.4%] left-0 hidden h-[38.5%] w-[17%] md:block -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,228,72,0.55)_0%,rgba(126,198,52,0.24)_42%,transparent_74%)] mix-blend-screen blur-[1.4vw]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[10%] right-0 hidden h-[37.3%] w-[18%] md:block translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,228,72,0.5)_0%,rgba(126,198,52,0.22)_42%,transparent_74%)] mix-blend-screen blur-[1.4vw]"
      />
      {/* Sin banner en móvil el fondo negro se queda liso, así que la lluvia
          pasa a ser el fondo. En escritorio no hace falta: viene dibujada. */}
      <div aria-hidden className="absolute inset-0 md:hidden">
        <LluviaCodigo opacidad={0.4} />
      </div>

      <FlechaBajar
        destino="experiencia"
        className="absolute top-[6.4%] left-1/2 hidden w-[clamp(0.9rem,1.6vw,2rem)] -translate-x-1/2 -translate-y-1/2 cursor-pointer md:block"
      />

      {/* ── Izquierda: el titular y el listado ── */}
      <div className="relative md:absolute md:top-[11.6%] md:left-[20.1%] md:w-[25.2%]">
        <h2
          id="experiencia-titulo"
          className="font-display text-[6.4vw] leading-[1.22] text-[#f4f1e4] md:text-[clamp(0.9rem,1.55vw,2rem)] md:leading-[1.3]"
        >
          {EXPERIENCIA.title}{" "}
          <span className="text-[#e3e63a]">{EXPERIENCIA.titleAccent}</span>
        </h2>

        <p className="mt-[5vw] font-sans text-[3.9vw] leading-[1.5] text-[#cfd3c6] md:mt-[1.1vw] md:text-[clamp(0.5rem,0.88vw,1.1rem)] md:leading-[1.45]">
          Esto es parte de lo que vas a encontrar dentro de{" "}
          <strong className="font-bold text-white">Volver al Origen.</strong>
        </p>

        {/* Los filetes van como borde SUPERIOR de cada punto y no como separador
            entre ellos: así el primero también lleva raya —que es lo que hace el
            montaje— sin tener que meter un elemento suelto que no dice nada. */}
        <ul className="mt-[7vw] md:mt-[1.5vw]">
          {EXPERIENCIA.items.map((item) => (
            <li
              key={item.text}
              className="border-t border-[#a3ca23] py-[3.4vw] pl-[3.5vw] md:border-t-[max(0.05vw,1px)] md:py-[0.6vw] md:pl-[1.1vw]"
            >
              <p className="font-sans text-[3.9vw] leading-[1.35] font-semibold text-[#f4f1e4] md:text-[clamp(0.48rem,0.86vw,1.05rem)]">
                {item.text}
              </p>
              {item.detalle && (
                <p className="mt-[1.4vw] font-sans text-[3.6vw] leading-[1.45] text-[#a9b09b] md:mt-[0.2vw] md:text-[clamp(0.45rem,0.82vw,1rem)] md:leading-[1.4]">
                  {item.detalle}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Derecha: los mockups del programa ── */}
      <div className="relative mt-[9vw] space-y-[4vw] md:absolute md:top-[11.6%] md:left-[54.3%] md:mt-0 md:w-[25.3%] md:space-y-[1.5vw]">
        {MOCKUPS.map((src) => (
          <Image
            key={src.src}
            src={src}
            alt=""
            aria-hidden
            quality={90}
            sizes="(min-width: 768px) 26vw, 87vw"
            className="h-auto w-full"
          />
        ))}
      </div>
      {/* ── Abajo: las tres áreas ── */}
      <div className="relative mt-[13vw] md:absolute md:top-[63.5%] md:left-[20.5%] md:mt-0 md:w-[59%]">
        <h3 className="text-center font-display text-[5.6vw] leading-[1.3] text-[#f4f1e4] md:text-[clamp(0.8rem,1.35vw,1.75rem)] md:leading-[1.35]">
          {EXPERIENCIA.areasTitle.lead}{" "}
          <span className="text-[#a3ca23]">{EXPERIENCIA.areasTitle.acento}</span>{" "}
          {EXPERIENCIA.areasTitle.resto}
        </h3>

        <ul className="mt-[7vw] grid grid-cols-1 gap-[4.5vw] md:mt-[1.6vw] md:grid-cols-3 md:gap-[1.55vw]">
          {EXPERIENCIA.areas.map((area, i) => (
            <li key={area.nombre} className="relative">
              {/* Los archivos reservan oscura la franja de arriba, así que el
                  texto va encima sin necesidad de velo. */}
              {/* El filete en degradado se hace con un envoltorio de 1 px: un
                  `border` liso no puede degradar, y `border-image` sí puede pero
                  ignora el redondeo de las esquinas. Con el fondo en el
                  envoltorio y la imagen encima, el degradado sólo asoma por el
                  milímetro que la imagen no tapa, y respeta el radio. */}
              {FONDOS_AREA[i].compensar ? (
                <div className="rounded-[0.61vw] bg-[linear-gradient(180deg,#bfdb74_0%,#647239_45%,#080a09_100%)] p-[max(0.055vw,1px)]">
                  <Image
                    src={FONDOS_AREA[i].src}
                    alt=""
                    aria-hidden
                    quality={90}
                    sizes="(min-width: 768px) 20vw, 87vw"
                    className="h-auto w-full rounded-[calc(0.61vw-1px)]"
                  />
                </div>
              ) : (
                <Image
                  src={FONDOS_AREA[i].src}
                  alt=""
                  aria-hidden
                  quality={90}
                  sizes="(min-width: 768px) 20vw, 87vw"
                  className="h-auto w-full"
                />
              )}

              <div className="absolute top-[9%] left-[7%] w-[86%] text-center md:top-[11.5%]">
                <p className="font-display text-[5vw] leading-[1.2] text-[#e3e63a] md:text-[clamp(0.55rem,1vw,1.3rem)]">
                  {area.nombre}
                </p>
                <p className="font-display text-[5.2vw] leading-[1.25] text-[#f4f1e4] md:text-[clamp(0.58rem,1.05vw,1.35rem)]">
                  {area.lema}
                </p>
                <p className="mt-[3.5vw] font-sans text-[3.5vw] leading-[1.45] text-[#dfe3d6] md:mt-[0.75vw] md:text-[clamp(0.4rem,0.7vw,0.9rem)]">
                  {area.text}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-[9vw] w-full text-[3.35vw] md:mt-[1.7vw] md:w-fit md:text-[clamp(0.45rem,0.78vw,0.98rem)]">
          <CtaLista>{EXPERIENCIA.cta}</CtaLista>
        </div>
      </div>
    </section>
  );
}
