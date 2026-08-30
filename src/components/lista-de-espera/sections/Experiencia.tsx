import Image from "next/image";
import {
  CalendarDays,
  CalendarHeart,
  ClipboardCheck,
  Globe2,
  KeyRound,
  Map,
  Sparkles,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { CtaLista } from "@/components/lista-de-espera/ui/CtaLista";
import {
  CardBonus,
  ZonaBento,
} from "@/components/lista-de-espera/ui/RejillaBonus";
import { LluviaCodigo } from "@/components/lista-de-espera/ui/LluviaCodigo";
import { FlechaBajar } from "@/components/lista-de-espera/ui/FlechaBajar";
import { EXPERIENCIA } from "@/components/lista-de-espera/content";
import { cn } from "@/lib/cn";
import banner from "@/../public/volver-origen/public/Recursos/generales/banner-3-web.webp";
import mockup1 from "@/../public/volver-origen/public/Recursos/generales/mockup1.webp";
import mockup2 from "@/../public/volver-origen/public/Recursos/generales/mockup2.webp";
import mockup3 from "@/../public/volver-origen/public/Recursos/generales/mockup3.webp";
import cardRelaciones from "@/../public/volver-origen/public/Recursos/generales/card-relaciones.webp";
import cardProposito from "@/../public/volver-origen/public/Recursos/generales/card-proposito.webp";
import cardDinero from "@/../public/volver-origen/public/Recursos/generales/card-dinero.webp";

const MOCKUPS = [mockup1, mockup2, mockup3];
const PRIMER_ITEM_CON_AIRE_EXTRA = 4;

/*
  UN DIBUJO POR PUNTO DEL LISTADO, elegido por lo que promete cada uno.

  Los nueve llevaban el mismo tilde, y un tilde repetido nueve veces sólo dice
  "incluido" — que es lo que ya anuncia el titular de la sección. Con un icono
  propio cada línea se reconoce sin leerla: se ve de un vistazo cuál habla de
  encuentros, cuál de material y cuál de tiempo.

  · calendario ....... las 6 semanas: el bloque de tiempo del programa
  · personas ......... las mentorías en vivo, que son encuentros de grupo
  · llave ............ los Códigos Originales; un código abre algo
  · portapapeles ..... el material de integración y sus checkpoints
  · persona con tilde. las intervenciones 1 a 1, atención individual
  · mapa ............. el roadmap de 90 días
  · calendario-corazón los 90 días de acompañamiento: tiempo sostenido, no un plan
  · globo ............ los encuentros presenciales por el mundo
  · destellos ........ la comunidad y el contexto que impulsa

  EL MAPA VIVE AQUÍ Y NO EN content.ts a propósito: aquél es un archivo de datos
  que no importa nada de React, y meterle componentes lo ataría al framework. Allí
  viaja sólo la clave; la traducción a dibujo es cosa de quien pinta.

  Satisfies en vez de una anotación de tipo: comprueba que cada clave del content
  tiene su icono —si mañana se añade un punto con una clave nueva, esto falla al
  compilar en vez de renderizar un hueco— y a la vez conserva las claves
  literales para que el acceso siga estando tipado.
*/
const ICONOS_ITEM = {
  semanas: CalendarDays,
  mentorias: Users,
  codigos: KeyRound,
  material: ClipboardCheck,
  unoAUno: UserRoundCheck,
  roadmap: Map,
  acompanamiento: CalendarHeart,
  presenciales: Globe2,
  comunidad: Sparkles,
} satisfies Record<string, LucideIcon>;

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
        className="pointer-events-none absolute top-[12.4%] left-0 hidden h-[38.5%] w-[17%] md:block le-halo-a -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,228,72,0.55)_0%,rgba(126,198,52,0.24)_42%,transparent_74%)] mix-blend-screen blur-[1.4vw]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[10%] right-0 hidden h-[37.3%] w-[18%] md:block le-halo-b translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,228,72,0.5)_0%,rgba(126,198,52,0.22)_42%,transparent_74%)] mix-blend-screen blur-[1.4vw]"
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
      {/* LA COLUMNA SE ESTRECHA AL 22,5%. A 1920 pasa de 484 a 432 px.

          El montaje marca 483 en su selección, pero ahí el titular ocupa TRES
          líneas y en 484 px entra en dos: la caja del diseño mide más que el
          texto que contiene. Se ajusta al texto, que es lo que se ve.

          Hay sitio de sobra: la columna arranca al 11,6% del alto del banner y
          la banda de las tres áreas no empieza hasta el 63,5%, así que las
          líneas de más que añade el estrechamiento caben sin acercarse. */}
      <div className="relative md:absolute md:top-[11.6%] md:left-[20.1%] md:w-[22.5%]">
        <h2
          id="experiencia-titulo"
          className="aparece-abajo font-display text-[6.4vw] leading-[1.22] text-[#f4f1e4] md:text-[clamp(0.9rem,1.55vw,2rem)] md:leading-[1.3]"
        >
          {EXPERIENCIA.title}{" "}
          {/* El acento va además en bold: es la promesa concreta —"lo lleves a tu
              vida real"— frente al enunciado general que la precede. */}
          <span className="font-bold text-[#e3e63a]">
            {EXPERIENCIA.titleAccent}
          </span>
        </h2>

        <p className="mt-[5vw] font-sans text-[3.9vw] leading-[1.5] text-[#cfd3c6] md:mt-[1.1vw] md:text-[clamp(0.5rem,0.88vw,1.1rem)] md:leading-[1.45]">
          Esto es parte de lo que vas a encontrar dentro de{" "}
          <strong className="font-bold text-white">Volver al Origen.</strong>
        </p>

        {/* Los filetes van como borde SUPERIOR de cada punto y no como separador
            entre ellos: así el primero también lleva raya —que es lo que hace el
            montaje— sin tener que meter un elemento suelto que no dice nada. */}
        <ul className="mt-[7vw] md:mt-[1.5vw]">
          {EXPERIENCIA.items.map((item, i) => {
            const Icono = ICONOS_ITEM[item.icono];

            return (
            <li
              key={item.text}
              className={cn(
                      /* El filete va como borde SUPERIOR de cada punto, y el ÚLTIMO añade
         además el suyo inferior. Así el bloque queda cerrado por arriba y por
         abajo sin meter un elemento suelto que no dice nada. */
      "border-t border-[#a3ca23] py-[3.4vw] pl-[3.5vw] last:border-b last:border-b-[#a3ca23] md:border-t-[max(0.05vw,1px)] md:py-[0.6vw] md:pl-[1.1vw] md:last:border-b-[max(0.05vw,1px)]",
                i >= PRIMER_ITEM_CON_AIRE_EXTRA &&
                  "py-[calc(3.4vw+5px)] md:py-[calc(0.6vw+5px)]",
              )}
            >
              {/* EL ICONO VA CENTRADO CONTRA EL BLOQUE ENTERO, no alineado al
                  primer renglón.

                  Era `items-start` con un `mt` de compensación, que lo clavaba a
                  la altura del título: en los cuatro puntos que llevan detalle,
                  el icono quedaba arriba del todo y el bloque se veía descolgado
                  hacia abajo. Con `items-center` el dibujo se sitúa en el medio
                  de lo que acompañe —una línea o tres— y ya no hace falta
                  compensar nada a mano.

                  ── EL ICONO VA DENTRO DE UN DISCO ──

                  Suelto sobre el fondo se veía crudo: un dibujo de trazo fino
                  flotando contra la lluvia de código, sin nada que lo asiente.
                  Y en el primer intento se fue de tamaño —1,45vw, el doble que
                  el tilde— buscando presencia por volumen, que es justo lo que
                  lo volvía pesado en una lista de nueve.

                  El disco lo resuelve al revés: el DIBUJO se achica (a 0,82vw)
                  y lo que le da presencia es la montura —fondo oscuro, filete
                  verde tenue y un halo—. La pieza ocupa más pero pesa menos,
                  porque el peso lo lleva un contorno y no la tinta.

                  Es además la misma montura que ya usan los tildes de "es para
                  vos si…" y las cards de BONUS: tres sitios distintos con el
                  mismo recurso, que es lo que hace que la landing parezca de
                  una pieza. */}
              <div className="flex items-center gap-[3vw] md:gap-[0.75vw]">
                <span
                  aria-hidden
                  className="flex size-[9vw] shrink-0 items-center justify-center rounded-full border border-[#a3ca23]/35 bg-[#0d1505]/70 text-[#a3ca23] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_0_14px_-4px_rgba(163,202,35,0.55)] md:size-[clamp(1.35rem,1.85vw,2.4rem)]"
                >
                  <Icono
                    strokeWidth={1.7}
                    className="size-[4.6vw] md:size-[clamp(0.62rem,0.82vw,1.05rem)]"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-[3.9vw] leading-[1.35] font-semibold text-[#f4f1e4] md:text-[clamp(0.48rem,0.86vw,1.05rem)]">
                    {item.text}
                  </p>
                  {item.detalle && (
                    <p className="mt-[1.4vw] font-sans text-[3.6vw] leading-[1.45] text-[#a9b09b] md:mt-[0.2vw] md:text-[clamp(0.45rem,0.82vw,1rem)] md:leading-[1.4]">
                      {item.detalle}
                    </p>
                  )}
                </div>
              </div>
            </li>
            );
          })}
        </ul>
      </div>

      {/* ── Derecha: los mockups del programa ── */}
      {/* Los mockups entran DESDE LA DERECHA y el listado de la izquierda desde
          abajo: son las dos columnas de la misma sección, y darles direcciones
          distintas hace que se lean como dos bloques que se encuentran en vez de
          como una sola cosa subiendo. */}
      <div className="aparece-derecha relative mt-[9vw] space-y-[4vw] md:absolute md:top-[11.6%] md:left-[54.3%] md:mt-0 md:w-[25.3%] md:space-y-[1.5vw]">
        {/* ── LOS MOCKUPS RESPONDEN AL CURSOR, PERO COMO LÁMINAS ──

            Son lo único que ENSEÑA el producto por dentro, así que merecen que
            se los mire de cerca. Ahora al pasar el ratón la lámina se inclina
            hacia el cursor, se acerca un punto y un destello la cruza en
            diagonal, como la luz sobre una pantalla real.

            NO VUELVE LA SOMBRA DE CAJA, que es el motivo por el que se retiró el
            efecto anterior: estos archivos tienen fondo transparente, así que
            una `box-shadow` dibuja el rectángulo del ARCHIVO y no la silueta del
            aparato — se veía un halo rectangular alrededor de algo que no lo es.
            La sensación de relieve la da aquí la inclinación, que no dibuja
            ninguna forma.

            EL GIRO ES MÍNIMO —2 grados— Y SIEMPRE EL MISMO. No sigue al cursor:
            estas piezas van con aria-hidden y no son controles, así que un
            seguimiento fino prometería una interacción que no existe. Dos grados
            bastan para que la lámina se sienta física.

            El destello vive en .le-mockup (globals.css) porque necesita un
            pseudo-elemento con máscara, y eso no se declara desde una utilidad.

            El envoltorio existe para recortar el destello: sin él la banda de
            luz se saldría de la lámina. */}
        {MOCKUPS.map((src) => (
          <div
            key={src.src}
            className="le-mockup group/mock relative overflow-hidden rounded-[2.1vw] md:rounded-[0.78vw]"
          >
            <Image
              src={src}
              alt=""
              aria-hidden
              quality={90}
              sizes="(min-width: 768px) 26vw, 87vw"
              className="h-auto w-full transition-transform duration-500 ease-out md:group-hover/mock:scale-[1.03]"
            />
          </div>
        ))}
      </div>
      {/* ── Abajo: las tres áreas ── */}
      {/* En escritorio la separación la da el `top` contra el alto del banner; en
          móvil, donde no hay banner, hacen falta los 75-100 px a mano. 22vw a
          390 son 86, dentro de ese rango.

          ⚠️ EL AIRE CONTRA EL LISTADO DE ARRIBA SE REGULA AQUÍ, EN EL `top`, y no
          con margen ni padding en el titular: los dos se intentaron y ninguno
          separa un bloque anclado en absoluto (ver el comentario del h3).

          Sube de 63,5 a 65,8%: son 2,3 puntos del alto del banner, unos 50 px a
          1920, que es la separación que pide el diseño. */}
      <div className="relative mt-[22vw] md:absolute md:top-[65.8%] md:left-[20.5%] md:mt-0 md:w-[59%]">
        {/* ⚠️ EN ESCRITORIO ESTE TITULAR NO SE SEPARA CON MARGEN NI CON PADDING.
            NINGUNO DE LOS DOS FUNCIONA, y conviene entender por qué antes de
            volver a intentarlo:

            · CON MARGEN se produce un colapso: el h3 es el primer hijo de un
              contenedor sin borde ni relleno, así que su margen superior no
              separa por dentro — se escapa y pasa a ser margen del contenedor.
            · CON PADDING sí se aplica, pero tampoco separa: el contenedor está
              anclado por `md:top-[63.5%]`, que fija su BORDE SUPERIOR. El
              padding empuja al h3 hacia abajo DENTRO de una caja que no se
              mueve, así que el titular se acerca a las cards en vez de alejarse
              del listado. El hueco se abre por encima, donde no se ve.

            La separación real de un bloque en `absolute` se cambia moviendo su
            ancla, y por eso el aire vive ahora en el `top` del contenedor
            —65,8% en vez de 63,5%—: 2,3 puntos porcentuales del alto del banner,
            que a 1920 son unos 50 px.

            EN MÓVIL SÍ VALE EL PADDING, porque allí el contenedor está en el
            flujo y no anclado. De ahí que el pt- siga puesto sin prefijo y se
            anule con md:pt-0. */}
        <h3 className="aparece-abajo pt-[50px] text-center font-display text-[5.6vw] leading-[1.3] text-[#f4f1e4] md:pt-0 md:text-[clamp(0.8rem,1.35vw,1.75rem)] md:leading-[1.35]">
          {EXPERIENCIA.areasTitle.lead}{" "}
          <span className="text-[#a3ca23]">{EXPERIENCIA.areasTitle.acento}</span>{" "}
          {EXPERIENCIA.areasTitle.resto}
        </h3>

        {/* LAS TRES ÁREAS LLEVAN LOS MISMOS EFECTOS DE CURSOR QUE LOS BONUS: se
            inclinan, se imantan, sueltan partículas y devuelven una onda al
            pulsarlas, y un foco compartido enciende el borde de la más cercana.

            Es el mismo recurso en las dos secciones a propósito. Son las dos
            rejillas de tres cards de la landing y comparten papel —tres piezas
            que se miran en paralelo—, así que responder igual las emparenta.

            .le-bento-card va en el <li> y no dentro: necesita ser el elemento
            que tiene el radio, porque su ::after hereda el border-radius para
            recortar el borde encendido. */}
        <ZonaBento>
        <ul className="mt-[7vw] grid grid-cols-1 gap-[4.5vw] md:mt-[1.6vw] md:grid-cols-3 md:gap-[1.55vw]">
          {EXPERIENCIA.areas.map((area, i) => (
            <CardBonus
              key={area.nombre}
              etiqueta="li"
              className={`aparece-abajo aparece-${i + 1} le-bento-card relative rounded-[2vw] md:rounded-[0.61vw]`}
            >
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

              {/* EL TEXTO SE ACHICA EN ESCRITORIO, y no es una preferencia de
                  tamaño: es legibilidad. El bloque se apoya sobre la franja
                  oscura que la ilustración reserva arriba, y a la medida
                  anterior —1,25vw el título, 0,94 el cuerpo— desbordaba esa
                  franja y las últimas líneas caían sobre la parte dibujada, con
                  destellos verdes y siluetas por detrás. Ahí no se leía.

                  Bajando a 1,05 y 0,8 el bloque entero cabe dentro de la zona
                  reservada. En móvil se queda como estaba: allí la card es
                  vertical y hay sitio de sobra.

                  El velo de refuerzo hace el resto: un degradado oscuro que
                  cubre el tercio superior de la card y se desvanece. Aunque una
                  línea llegue al borde de la ilustración, sigue teniendo fondo
                  contra el que recortarse. Va DEBAJO del texto —el texto lleva
                  `relative`— y por encima de la imagen. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[42%] rounded-t-[2vw] bg-[linear-gradient(180deg,rgba(4,8,2,0.72)_0%,rgba(4,8,2,0.45)_55%,transparent_100%)] md:rounded-t-[0.61vw]"
              />

              <div className="absolute top-[9%] left-[7%] w-[86%] text-center md:top-[10%]">
                <p className="relative font-display text-[5vw] leading-[1.2] text-[#e3e63a] md:text-[clamp(0.72rem,1.05vw,1.35rem)]">
                  {area.nombre}
                </p>
                <p className="relative font-display text-[5.2vw] leading-[1.25] text-[#f4f1e4] md:text-[clamp(0.75rem,1.05vw,1.35rem)] md:font-bold">
                  {area.lema}
                </p>
                <p className="relative mt-[3.5vw] font-sans text-[3.5vw] leading-[1.45] text-[#dfe3d6] md:mt-[0.6vw] md:text-[clamp(0.6rem,0.8vw,1rem)] md:leading-[1.45] md:font-medium">
                  {area.text}
                </p>
              </div>
            </CardBonus>
          ))}
        </ul>
        </ZonaBento>

        <div className="mx-auto mt-[9vw] w-full md:mt-[1.7vw] md:w-fit">
          <CtaLista>{EXPERIENCIA.cta}</CtaLista>
        </div>
      </div>
    </section>
  );
}
