import Image from "next/image";
import { ArranqueDiagnostico } from "@/components/diagnostico/ArranqueDiagnostico";
import { GridScan } from "@/components/diagnostico/ui/GridScan";
import { PruebaSocialDg } from "@/components/diagnostico/ui/PruebaSocialDg";
import { ScrollSuave } from "@/components/diagnostico/ui/ScrollSuave";
import { VistaPreviaVideo } from "@/components/diagnostico/ui/VistaPreviaVideo";
import { LANDING } from "@/components/diagnostico/contenido";

/*
  ═══════════════════════════════════════════════════════════════════════════
  LANDING DE PROMESA — /diagnostico
  ═══════════════════════════════════════════════════════════════════════════

    hero (rejilla + promesa) → FORMULARIO → vista previa del video → pie

  ── EL HERO: LA REJILLA DE FONDO Y LA PROMESA CENTRADA ENCIMA ──

  Llevaba una fotografía a la izquierda y el titular montado sobre su mitad
  derecha, en una retícula de doce columnas. Se retiró: la foto tenía un motivo
  —una mujer frente a un arco— que obligaba a reservarle su mitad, y de ahí la
  retícula.

  Después vinieron los anillos concéntricos (ui/MagicRings.tsx), y ahora está
  GridScan: un túnel de líneas en perspectiva con un haz que lo recorre. Los
  tres montajes comparten el mismo criterio —el fondo no tiene sujeto, así que
  el texto va en medio y la animación alrededor—, y el barrido añade algo que
  los anillos no tenían: esta página es un DIAGNÓSTICO, y un haz recorriendo
  una rejilla dice "esto te está midiendo" sin escribirlo.

  ── EL LOGO VUELVE, Y SÓLO AQUÍ ──

  Estaba superpuesto sobre la foto del hero, y en /encuesta y /resultado en una
  franja propia. Se retiró de las tres mientras el branding no estuviera
  cerrado.

  Ahora vuelve al hero de esta página —encima de la promesa, como primer
  elemento— con el archivo logo2.png. En /encuesta y /resultado sigue sin
  aparecer: allí el visitante ya sabe dónde está, y repetirlo en cada pantalla
  del embudo le quita sitio a lo que sí cambia. La pieza que lo montaba en una
  franja propia sigue en el proyecto (ui/Marca.tsx).

  ── EL FORMULARIO ESTÁ EN LA PÁGINA, NO DETRÁS DE UN BOTÓN ──

  Justo debajo de la promesa, sin bajar. Un CTA que navega a otra página mete
  dos puertas entre el titular y la conversión: pulsar y esperar.

  ── SIGUE SIENDO UN COMPONENTE DE SERVIDOR ──

  Se hidratan cuatro piezas: la rejilla del hero, el suavizado del scroll, la
  caja del formulario y la vista previa del video. El titular, el texto y el pie
  se sirven como HTML.

  ── LA PRUEBA SOCIAL ESTÁ BLOQUEADA A PROPÓSITO ──

  `LANDING.testimonios` está vacío y por eso el bloque no se pinta. El
  documento prohíbe explícitamente inventar autoridad ("avalado por X mil
  personas") o bonos que no existen. Cuando Ismael confirme si hay reseñas
  reales, se rellena el array y la sección aparece sola.
*/

export default function DiagnosticoPage() {
  const hayTestimonios = LANDING.testimonios.length > 0;

  /* EL ENVOLTORIO PINTA EL VERDE DEL HERO, y no es decoración: el panel crema
     de abajo lleva las esquinas superiores redondeadas y por esos dos picos se
     ve lo que haya detrás. Sin esto se vería el fondo de la página —el verde de
     marca, un tono más claro— y las esquinas quedarían con un cerco alrededor.

     Va como comentario de JS y no como {/* … *&#47;} dentro del return: ahí
     serían dos hijos en la raíz, y un return devuelve una sola expresión. */
  return (
    <div className="dg-landing flex min-h-svh flex-col bg-[var(--dg-hero-fondo)]">
      {/* EL SUAVIZADO DE SCROLL, sólo en esta pantalla.

          Lenis se queda con el scroll de la ventana, así que montarlo en el
          layout de la ruta se lo impondría también a /encuesta —once pantallas
          cortas con foco automático en los campos, donde la inercia pelea con
          ese foco— y a /resultado, que cabe casi entera. Aquí sí hay un
          recorrido de arriba abajo. Ver ScrollSuave. */}
      <ScrollSuave />
      {/* EL <main> NO LLEVA RELLENO LATERAL. Lo lleva cada bloque por su
          cuenta, porque el hero tiene que sangrar de canto a canto: una banda
          con fondo propio que no llegue a los bordes se lee como una tarjeta
          enorme, no como una sección.

          Tampoco lleva relleno superior: el hero empieza en el borde de la
          ventana. Llegó a tener más en móvil para dejarle sitio al logo, que
          sobresalía por encima de la imagen; sin logo y sin imagen, esa reserva
          no protege nada. */}
      {/* COLUMNA FLEX PARA QUE EL PANEL CREZCA. En una pantalla muy alta con
          poco contenido, <main> se estira por el flex-1 y el panel —un bloque
          normal— no: quedaría una franja del verde del envoltorio entre el panel
          y el pie. Con la columna y el grow de abajo, el crema llega siempre. */}
      <main className="flex flex-1 flex-col">
        {/* ══════════════ HERO ══════════════

            ── SE FUE LA FOTOGRAFÍA Y EL FONDO PASÓ A SER UNA ANIMACIÓN ──

            El hero llevaba una imagen a la izquierda con el titular montado
            sobre su mitad derecha. La foto tenía un motivo —la mujer, el arco—
            que obligaba a dejarle su mitad libre, y de ahí la retícula de doce
            columnas.

            El fondo de ahora no tiene sujeto, así que lo que pide el montaje es
            justo lo contrario: texto en medio y animación alrededor. Eso vale
            igual para los anillos que hubo antes y para la rejilla de ahora.

            ── EL FONDO VA PRIMERO EN EL DOCUMENTO, SIN z-index NEGATIVO ──

            El texto viene después y lleva `relative`, así que gana el orden de
            pintado sin más. Un `-z-10` en el fondo parecería lo natural y es
            frágil: en cuanto un ancestro cree un contexto de apilado, el
            elemento se va DETRÁS del fondo de la página y desaparece sin que se
            entienda por qué.

            ── EL ALTO MÍNIMO ES LO QUE LE DA SITIO A LA ANIMACIÓN ──

            El lienzo se dimensiona con el alto de su contenedor, y ese alto lo
            fija el texto. Sin un mínimo, en escritorio quedaría una banda de
            unos 200 px y la rejilla saldría aplastada contra los bordes — con
            un túnel en perspectiva se nota aún más que con los anillos, porque
            la fuga necesita profundidad para leerse. */}
        <section className="relative flex w-full items-center justify-center overflow-hidden bg-[var(--dg-hero-fondo)] px-5 pt-16 pb-20 sm:pt-20 sm:pb-24 md:min-h-[34rem] md:pt-24 md:pb-28">
          {/* ══ LA REJILLA DEL FONDO ══

              ── SUSTITUYE A LOS ANILLOS ──

              El hero llevaba MagicRings: aros concéntricos que crecían y se
              desvanecían desde el centro. Ahora es GridScan, un túnel de líneas
              en perspectiva que se pierde en el fondo, con un haz que lo
              recorre a lo largo cada pocos segundos.

              Va SOLO, sin los anillos detrás: son dos lienzos WebGL a la vez
              —dos contextos, dos bucles de animación— y visualmente dos motivos
              que compiten. El fondo del hero es atmósfera; con dos animaciones
              deja de serlo y pasa a ser el asunto de la sección.

              El componente sigue en ui/MagicRings.tsx y devolverlo es volver a
              montarlo aquí.

              ── EL BARRIDO ES LO QUE HACE QUE ENCAJE ──

              Esta página es un DIAGNÓSTICO: un haz que recorre una rejilla y
              vuelve dice "esto te está midiendo" sin escribirlo en ninguna
              parte. Los anillos eran atmósfera bonita y nada más.

              ── LOS COLORES SON LOS DE LA MARCA ──

              Líneas en verde y el haz en blanco roto. Un cambio de tono en la
              rejilla se nota mucho más que en los anillos, porque son formas
              nítidas y no manchas de luz.

              aria-hidden y pointer-events-none: es decoración y no puede
              interceptar la selección del texto que tiene encima.

              ⚠️ pointer-events-none EN EL ENVOLTORIO NO IMPIDE QUE LA REJILLA
              SIGA AL RATÓN. El componente escucha `mousemove` sobre su propio
              elemento, y ese evento se sigue disparando en la sección: lo que
              se anula es que el lienzo CAPTURE el clic o la selección. */}
          <div
            aria-hidden
            className="dg-fondo-fundido pointer-events-none absolute inset-0 select-none"
          >
            <GridScan
              linesColor="#5b9800"
              scanColor="#f5f5f5"
              sensitivity={0.55}
              /* Grosor 1,4 y no 1: el hero es el plano más oscuro de la página
                 (--dg-hero-fondo, el verde de marca rebajado hacia el negro), y
                 una línea de un píxel en verde medio sobre ese fondo se pierde.
                 Sobre el gris del ejemplo de React Bits, 1 basta. */
              lineThickness={1.4}
              gridScale={0.1}
              /* El barrido sube a 0,55 por lo mismo: es lo único que se mueve
                 de verdad y lo que hace que el fondo se lea como una medición y
                 no como una textura quieta. */
              scanOpacity={0.55}
              enablePost
              bloomIntensity={0.6}
              /* ⚠️ LA ABERRACIÓN CROMÁTICA VA EN CERO, Y NO ES UN DESCUIDO.

                 El ejemplo de React Bits trae 0.002, y sobre esta rejilla eso
                 no se lee como un efecto de lente: se lee como líneas de
                 colores. El efecto separa los canales RGB, y sobre formas
                 NÍTIDAS de un píxel cada canal cae en un píxel distinto — el
                 borde se descompone en magenta y cian.

                 Medido sobre el hero: el 2,9% de los píxeles quedaban con más
                 rojo o azul que verde, y el peor daba rgb(54,56,119), un
                 azul-violeta que no existe en esta paleta. Sobre los anillos
                 —manchas difusas— el mismo valor era invisible; aquí ensucia.

                 El bloom sí se queda: reparte luz sin separar canales, así que
                 el resplandor de las líneas sigue siendo verde. */
              chromaticAberration={0}
              noiseIntensity={0.01}
              /* En móvil no hay ratón: sin esto la rejilla se queda quieta y
                 sólo se ve el barrido. */
              enableGyro
            />
          </div>

          {/* EL TEXTO, centrado sobre la rejilla.

              `relative` sin z-index: al venir después en el documento y estar
              posicionado, gana el orden de pintado sobre el fondo. */}
          <div className="relative mx-auto max-w-2xl text-center">
            {/* ══ EL LOGOTIPO, LO PRIMERO DE LA PÁGINA ══

                ── VUELVE, Y ANTES NO ESTABA EN NINGUNA PANTALLA ──

                Se había retirado de las tres mientras el branding no estuviera
                cerrado (queda la nota en la cabecera de este archivo). Vuelve
                sólo aquí, encima de la promesa: es la primera pieza que se ve y
                lo que dice de quién es esta página antes de leer nada.

                ── SE DIMENSIONA POR EL ALTO, NO POR EL ANCHO ──

                El archivo es 992x322, casi 3:1. Fijando el ancho, el logo mide
                distinto de alto en cada pantalla y el hueco hasta el titular
                baila. Con `h-*` y `w-auto` el alto es el que se controla —que
                es lo que se percibe— y el ancho lo pone la proporción.

                ⚠️ `width` y `height` EN EL COMPONENTE SON LOS DEL ARCHIVO. No
                son el tamaño en pantalla: sirven para reservar el hueco y
                calcular la proporción, y mentir ahí produce un salto de
                maquetación al cargar. El tamaño real lo ponen las clases.

                ── EL HUECO HASTA EL TITULAR ──

                `mb-5` son 20 px, dentro de los 15/20 pedidos. Va en el logo y
                no como `mt` del titular porque es el logo el que se acaba de
                añadir: si mañana se retira, se va con su margen y el titular
                queda donde estaba.

                `priority` porque es lo más alto de la página: sin él, Next lo
                carga en diferido y el primer elemento que ve el visitante
                aparece un instante después que el resto. */}
            <Image
              src="/diagnostico/contenido/logo/logo2.png"
              alt="Volver al Origen"
              width={992}
              height={322}
              priority
              className="mx-auto mb-5 h-10 w-auto sm:h-12 md:h-14"
            />

            {/* El titular va en tres tramos porque el del medio —lo que de
                verdad promete— tiene que destacarse del resto. Partirlo en
                tres cadenas permite que el acento cambie de línea sin
                arrastrar el ritmo de la frase. */}
            <h1 className="dg-titulo text-center text-[1.7rem] leading-[1.25] text-balance sm:text-[2.1rem] sm:leading-[1.2] md:text-[2.6rem]">
              <span className="text-[var(--dg-texto)]">{LANDING.titulo}</span>{" "}
              {/* ⚠️ SIN CLASE DE COLOR, y no es un olvido: .dg-luz-texto pinta
                  estas palabras con un degradado recortado a las letras y el
                  color en transparente. Un `text-[...]` aquí ganaría en la
                  hoja, devolvería el color plano y el barrido desaparecería —
                  sin romper nada y sin que se entienda por qué. */}
              <span className="dg-luz-texto dg-luz-oro font-bold">
                {LANDING.tituloAcento}
              </span>{" "}
              <span className="text-[var(--dg-texto)]">
                {LANDING.tituloCierre}
              </span>
            </h1>

            {/* ── EN LA TINTA PRINCIPAL, NO EN LA SUAVE ──

                Iba en --dg-texto-suave, que es el crema rebajado con el verde
                del fondo: 9,7:1 sobre el hero, de sobra para leerse, pero al
                lado de un titular en crema pleno se lee GRIS. Sobre un fondo
                tan oscuro, "más apagado" acaba pareciendo "descolorido".

                En la tinta principal sube a 17,4:1. No compite con el titular
                porque la jerarquía ya la marcan el cuerpo, la tipografía y las
                versalitas — no hacía falta apagarlo también de color. */}
            <p className="mx-auto mt-5 max-w-xl text-center text-[0.98rem] leading-relaxed text-[var(--dg-texto)] sm:text-lg">
              {LANDING.subtitulo}
            </p>

            {/* ── LA PRUEBA SOCIAL, DEBAJO DE LA PROMESA ──

                Es el sitio que pidió el feedback y es el que le corresponde: el
                titular dice qué vas a conseguir, el subtítulo cómo, y esto —lo
                último antes de bajar al formulario— que no serías el primero.
                Más arriba interrumpiría la promesa antes de haberla hecho.

                Las caras son las de perfil de reseñas reales de Volver al
                Origen, las mismas de los carruseles de las otras landings. La
                frase invita en vez de contar: no hay recuento de quién ha hecho
                el diagnóstico y el documento prohíbe inventarlo. El detalle,
                en contenido.ts. */}
            <PruebaSocialDg className="mt-7" />
          </div>

          {/* ⚠️ AQUÍ IBA EL FUNDIDO QUE EMPALMABA LAS DOS SECCIONES.

              Era un degradado hasta --dg-fondo para que el canto entre el hero y
              lo de abajo —dos verdes a 1,23:1— no se leyera como una raya sucia.
              Ya no hace falta: debajo no hay otro verde, hay el panel crema, y
              el corte lo marca su propio borde redondeado.

              Dejarlo sería peor que quitarlo: un degradado al verde de marca
              metería una franja de un TERCER color entre el hero y el crema. */}
        </section>

        {/* ══════════════ EL PANEL CREMA ══════════════

            La página deja de ser oscura de arriba abajo: el hero se queda en
            verde profundo y de ahí para abajo se levanta un panel crema con las
            esquinas superiores redondeadas. Las tarjetas que van encima siguen
            siendo verde oscuro, así que ningún texto cambia de color — lo que
            cambia es el aire que las rodea.

            ── LO QUE SE FUE CON ESTE CAMBIO ──

            · EL FILETE SEPARADOR (el ✦ entre dos líneas). El corte entre el hero
              y lo que sigue ya no necesita una línea que lo marque: lo marca el
              borde del panel, que además cambia de color. Un filete claro sobre
              el crema no se vería, y uno oscuro sería un adorno que el diseño no
              pide. El componente sigue en ui/SeparadorDg.tsx.
            · EL FUNDIDO INFERIOR DEL HERO, por lo mismo (ver arriba).

            ⚠️ SI ALGUNA VEZ SE VUELVE A UN FONDO OSCURO ABAJO, hay que devolver
            los dos: sin ellos, dos verdes a 1,23:1 chocan en seco.

            ── EL RELLENO ES EL AIRE DE LA CURVA ──

            pt-16/24 es lo que separa el borde redondeado de la primera tarjeta.
            Con menos, la tarjeta se mete dentro de la curva; con más, el panel
            parece vacío por arriba.

            EL REDONDEO VA AQUÍ Y NO EN LA IMAGEN. El archivo de fondo trae el
            suyo, pero es un porcentaje del ancho —9% en escritorio, 14% en
            móvil— y a 2560 px daba una curva enorme. Ver .dg-panel-crema. */}
        <div className="dg-panel-crema relative grow rounded-t-[2.5rem] px-5 pt-16 pb-28 md:rounded-t-[5rem] md:pt-24 md:pb-36">
          {/* ══════════════ EL FORMULARIO ══════════════

              ── YA NO SEPARA NADA POR SU CUENTA ──

              Llevaba un mt-20/24/28 emparejado con el relleno inferior del hero,
              porque entre los dos iba el filete separador y los dos huecos
              tenían que medir lo mismo. Sin filete, ese emparejamiento no
              defiende nada: la distancia hasta el hero la pone ahora el relleno
              superior del panel.

              ── LA TARJETA MIDE LO MISMO QUE LA DEL RECURSO ──

              Las dos a 64rem. Son las dos únicas piezas que hay sobre el panel
              crema, y con anchos distintos el panel se leía descuadrado: una
              caja estrecha flotando encima de una ancha.

              ⚠️ EL ANCHO ES DE LA TARJETA, NO DEL FORMULARIO. Los campos siguen
              a 36rem centrados dentro de ella (ver FormularioContacto): un
              campo de nombre de 960 px no se lee como un formulario, se lee como
              una barra. Lo que crece es el marco y el aire de alrededor.

              Llegó a medir 56rem por otro motivo, ya muerto: eran dos columnas
              —contenido e ilustración— y "¿A qué email te lo envío?" se partía
              en dos renglones si la de contenido se estrechaba, con lo que la
              tarjeta cambiaba de alto en ese paso y todo lo de abajo saltaba.
              Sin ilustración en escritorio, ese riesgo lo cubre ahora el suelo
              de altura de la propia tarjeta.

              El id es el destino de los enlaces que suben hasta aquí — hoy, el
              del mensaje de la vista previa del video. Va en la sección y no en
              el primer campo: al saltar tiene que quedar a la vista la tarjeta
              entera, no un campo suelto pegado al borde de la ventana.

              La tarjeta —marco, fondo y, en móvil, la ilustración— la dibuja el
              propio formulario. Ya no lleva cabecera: cada paso trae su
              distintivo ("Aviso por WhatsApp", "Te llega por mail"), que dice lo
              mismo que decía aquel título fijo pero cambiando con lo que se está
              pidiendo. */}
          <div className="mx-auto max-w-5xl">
            <section
              id="empezar"
              aria-label="Formulario del diagnóstico"
              className="scroll-mt-8"
            >
              <ArranqueDiagnostico />
            </section>

            {/* ⚠️ AQUÍ IBAN LAS TRES PÍLDORAS — "7 preguntas", "Menos de 60
              segundos", "Resultado al instante". Se retiraron por el feedback
              de la primera entrega: "no van por ahora".

              El texto sigue en contenido.ts (`LANDING.señales`) y la animación
              de entrada también (.dg-zoom), así que devolverlas es volver a
              montar la lista. Ver la nota junto al campo. */}

            {/* ── TESTIMONIOS — sólo si son reales. Ver la nota de arriba. ── */}
            {hayTestimonios && (
              <section aria-label="Testimonios" className="mt-14">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {LANDING.testimonios.map((t) => (
                    <li
                      key={t.nombre}
                      className="rounded-2xl border border-[var(--dg-borde)] bg-[var(--dg-fondo-alto)] p-5"
                    >
                      <p className="text-sm leading-relaxed text-[var(--dg-texto)]">
                        {t.texto}
                      </p>
                      <p className="mt-3 text-xs tracking-wide text-[var(--dg-texto-tenue)] uppercase">
                        {t.nombre}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ══════════════ LO QUE VAS A RECIBIR ══════════════

              El componente dibuja la card completa: texto, mockup y bloqueo.
              Tiene que vivir al ancho de la landing para que el recurso pese
              igual que el cierre, no como una tarjeta chica pegada debajo del
              formulario. */}
            <VistaPreviaVideo />
          </div>

          {/* ── EL FUNDIDO QUE DEVUELVE EL PANEL AL VERDE DEL PIE ──

              El panel es crema y el pie vuelve a ser verde oscuro. Sin nada en
              medio, el canto entre los dos es el contraste más duro de la
              página entera —14:1— y se lee como un corte, no como un final.

              Disolviendo el último tramo, el crema se apaga hacia el color con
              el que empalma y el pie aparece en vez de empezar.

              ⚠️ EL COLOR DE DESTINO ES --dg-fondo Y TIENE QUE SER EXACTAMENTE
              EL DEL PIE. No sirve un negro ni el verde del envoltorio (que es
              --dg-hero-fondo, más oscuro): quedaría una franja de un tercer
              color justo en la junta, que es peor que el corte que se está
              arreglando.

              Va como ÚLTIMO HIJO y en absoluto, y el relleno inferior del panel
              (pb-28 y más) le deja su sitio: sin ese aire se comería la tarjeta
              del video.

              El panel no necesita overflow-hidden: el fundido va abajo, donde no
              hay redondeo, y su caja no se sale de la del panel. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent_0%,var(--dg-fondo)_100%)] md:h-28"
          />
        </div>
      </main>

      {/* ── EL PIE ──

          Sin enlaces, por el mismo motivo que la página no lleva menú: cada
          enlace es una salida del embudo.

          AQUÍ VIVE AHORA LA FRASE DE MARCA. Estaba arriba, junto al logo, y
          competía con el titular: los dos prometen lo mismo —encontrar la
          frecuencia y cambiarla— y leerlos seguidos era oír la promesa dos
          veces antes de que la página hubiera dicho nada.

          Al pie hace lo que hace un eslogan: cerrar. Y llega justo después del
          bloque del video, o sea a alguien que ya sabe qué se le está
          ofreciendo — que es cuando una frase así significa algo.

          Va en la tipografía de titulares y en versalitas: es una firma, no un
          párrafo, y necesita distinguirse del aviso de copyright que tiene
          debajo. */}
      {/* ⚠️ EL FONDO VA DECLARADO Y NO HEREDADO, que es lo que hacía antes.

          El pie es verde oscuro como siempre, pero ahora el envoltorio de la
          página pinta --dg-hero-fondo (un tono por debajo) para que se vea por
          las esquinas redondeadas del panel. Heredando, el pie saldría de ese
          verde más oscuro y el fundido de arriba —que termina en --dg-fondo— no
          empalmaría con él: quedaría un escalón justo en la junta.

          Los tokens de texto son los de la página (crema), no los del panel:
          aquí volvemos a estar sobre oscuro.

          ── Y SIN BORDE SUPERIOR ──

          Lo llevaba cuando encima había otra superficie oscura y la línea decía
          dónde empezaba el pie. Ahora encima hay un degradado que disuelve el
          crema en este mismo verde: el borde ponía un canto duro justo en el
          punto que el fundido existe para suavizar. Las dos cosas a la vez, en
          el mismo píxel. */}
      <footer className="bg-[var(--dg-fondo)] px-5 py-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="dg-titulo text-[0.95rem] leading-snug tracking-[0.14em] text-balance text-[var(--dg-texto-suave)] uppercase sm:text-[1.05rem]">
            {LANDING.tagline}
          </p>
          <p className="mt-4 text-xs text-[var(--dg-texto-tenue)]">
            © {new Date().getFullYear()} Volver al Origen · Pilar Sousa
          </p>
        </div>
      </footer>
    </div>
  );
}
