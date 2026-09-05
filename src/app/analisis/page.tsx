import { ArranqueDiagnostico } from "@/components/diagnostico/ArranqueDiagnostico";
import { MagicRings } from "@/components/diagnostico/ui/MagicRings";
import { PruebaSocialDg } from "@/components/diagnostico/ui/PruebaSocialDg";
import { SeparadorDg } from "@/components/diagnostico/ui/SeparadorDg";
import { VistaPreviaVideo } from "@/components/diagnostico/ui/VistaPreviaVideo";
import { LANDING } from "@/components/diagnostico/contenido";

/*
  ═══════════════════════════════════════════════════════════════════════════
  LANDING DE PROMESA — /analisis
  ═══════════════════════════════════════════════════════════════════════════

    hero (anillos + promesa) → FORMULARIO → vista previa del video → pie

  ── EL HERO: ANILLOS DE FONDO Y LA PROMESA CENTRADA ENCIMA ──

  Llevaba una fotografía a la izquierda y el titular montado sobre su mitad
  derecha, en una rejilla de doce columnas. Se retiró: la foto tenía un motivo
  —una mujer frente a un arco— que obligaba a reservarle su mitad, y de ahí la
  rejilla.

  Los anillos no tienen sujeto. Son atmósfera y salen del centro, así que el
  montaje que piden es el contrario: texto en medio y animación alrededor. Con
  eso se va también la rejilla, y con ella el apaño del redondeo que tapaba las
  esquinas blancas quemadas en aquel archivo.

  ── NO HAY LOGO EN NINGUNA DE LAS TRES PANTALLAS ──

  Estaba superpuesto sobre la foto del hero, y en /encuesta y /resultado en una
  franja propia. Se retiró por decisión de diseño mientras no esté cerrado el
  branding. La pieza sigue en el proyecto (ui/Marca.tsx) y volver a montarla es
  una línea en cada página.

  ── EL FORMULARIO ESTÁ EN LA PÁGINA, NO DETRÁS DE UN BOTÓN ──

  Justo debajo de la promesa, sin bajar. Un CTA que navega a otra página mete
  dos puertas entre el titular y la conversión: pulsar y esperar.

  ── SIGUE SIENDO UN COMPONENTE DE SERVIDOR ──

  Se hidratan tres piezas: los anillos del hero, la caja del formulario y la
  vista previa del video. El titular, el texto y el pie se sirven como HTML.

  ── LA PRUEBA SOCIAL ESTÁ BLOQUEADA A PROPÓSITO ──

  `LANDING.testimonios` está vacío y por eso el bloque no se pinta. El
  documento prohíbe explícitamente inventar autoridad ("avalado por X mil
  personas") o bonos que no existen. Cuando Ismael confirme si hay reseñas
  reales, se rellena el array y la sección aparece sola.
*/

export default function DiagnosticoPage() {
  const hayTestimonios = LANDING.testimonios.length > 0;

  return (
    <div className="dg-landing flex min-h-svh flex-col">
      {/* EL <main> NO LLEVA RELLENO LATERAL. Lo lleva cada bloque por su
          cuenta, porque el hero tiene que sangrar de canto a canto: una banda
          con fondo propio que no llegue a los bordes se lee como una tarjeta
          enorme, no como una sección.

          Tampoco lleva relleno superior: el hero empieza en el borde de la
          ventana. Llegó a tener más en móvil para dejarle sitio al logo, que
          sobresalía por encima de la imagen; sin logo y sin imagen, esa reserva
          no protege nada. */}
      <main className="flex-1 pb-16">
        {/* ══════════════ HERO ══════════════

            ── SE FUE LA FOTOGRAFÍA Y ENTRARON LOS ANILLOS ──

            El hero llevaba una imagen a la izquierda con el titular montado
            sobre su mitad derecha. Ahora el fondo es una animación de anillos
            concéntricos que crecen y se desvanecen, y el titular va CENTRADO
            encima.

            El cambio de composición no es un capricho: la foto tenía un motivo
            —la mujer, el arco— que obligaba a dejarle su mitad libre, y de ahí
            la rejilla de doce columnas. Los anillos no tienen sujeto, son
            atmósfera pura y salen del centro, así que lo que pide el montaje es
            justo lo contrario: texto en medio y animación alrededor.

            ── EL FONDO VA PRIMERO EN EL DOCUMENTO, SIN z-index NEGATIVO ──

            El texto viene después y lleva `relative`, así que gana el orden de
            pintado sin más. Un `-z-10` en el fondo parecería lo natural y es
            frágil: en cuanto un ancestro cree un contexto de apilado, el
            elemento se va DETRÁS del fondo de la página y desaparece sin que se
            entienda por qué.

            ── EL ALTO MÍNIMO ES LO QUE LE DA SITIO A LA ANIMACIÓN ──

            El canvas se dimensiona con el alto de su contenedor, y ese alto lo
            fija el texto. Sin un mínimo, en escritorio quedaría una banda de
            unos 200 px y los anillos saldrían aplastados contra los bordes. */}
        <section className="relative flex w-full items-center justify-center overflow-hidden bg-[var(--dg-hero-fondo)] px-5 pt-16 pb-20 sm:pt-20 sm:pb-24 md:min-h-[34rem] md:pt-24 md:pb-28">
          {/* LOS ANILLOS.

              Se desbordan del bloque de texto por los cuatro lados para que los
              aros más grandes no queden cortados justo donde empieza la
              promesa.

              Los aros van del verde 2 al blanco: los de dentro entran verdes y
              los de fuera se apagan en luz. El verde parece demasiado oscuro
              para verse sobre un fondo casi del mismo tono, y no lo es — el
              shader trabaja en modo "luminance", que normaliza el color a
              brillo pleno y usa el brillo original como opacidad, así que
              #084A2C entra como un verde vivo al 29%: atmósfera, no manchas.

              aria-hidden y pointer-events-none: es decoración, y no puede
              interceptar la selección del texto que tiene encima. */}
          <div
            aria-hidden
            className="dg-anillos-fundidos pointer-events-none absolute inset-0 select-none"
          >
            {/* ── EL MODO DE ALFA ES EL POR DEFECTO ("luminance") ──

                Normaliza el color a brillo pleno y usa el brillo original como
                opacidad. Sobre este fondo oscuro es justo lo que hace falta:
                los anillos entran como luz, no como pintura.

                Llegó a estar en "coverage" mientras el hero fue crema —allí
                hacía falta el color real para que se leyeran como líneas— y se
                retiró al volver al verde. Si alguna vez esta sección vuelve a
                ser clara, hay que devolverlo.

                El lienzo es transparente en los dos modos: se ve el fondo de la
                página a través de él. Lo que cambia es qué se pinta donde hay
                anillo, no si se rellena el vacío. */}
            <MagicRings
              color="#084A2C"
              colorTwo="#ffffff"
              ringCount={6}
              speed={1}
              attenuation={10}
              lineThickness={2}
              baseRadius={0.35}
              radiusStep={0.1}
              scaleRate={0.1}
              opacity={1}
              blur={0}
              noiseAmount={0.1}
              rotation={0}
              ringGap={1.5}
              fadeIn={0.7}
              fadeOut={0.5}
              followMouse={false}
              mouseInfluence={0.2}
              hoverScale={1.2}
              parallax={0.05}
              clickBurst={false}
            />
          </div>

          {/* EL TEXTO, centrado sobre los anillos.

              `relative` sin z-index: al venir después en el documento y estar
              posicionado, gana el orden de pintado sobre el fondo. */}
          <div className="relative mx-auto max-w-2xl text-center">
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

            <p className="mx-auto mt-5 max-w-xl text-center text-[0.98rem] leading-relaxed text-[var(--dg-texto-suave)] sm:text-lg">
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

          {/* ── EL FUNDIDO QUE EMPALMA LAS DOS SECCIONES ──

              El hero está un tono por DEBAJO del resto de la página, y entre
              los dos sólo hay 1,23:1. A esa distancia un canto recto no se lee
              como una decisión sino como una línea sucia o un fallo de recorte.

              Disolviendo el último tramo, el cambio de plano se lee como lo que
              es. Va como ÚLTIMO HIJO para pintar por encima de los anillos.

              ⚠️ MIDE EXACTAMENTE LO QUE EL RELLENO INFERIOR DE LA BANDA —
              h-20/24/28 contra pb-20/24/28— y no es coincidencia: el fundido
              vive dentro del relleno, así que si crece más que él empieza a
              oscurecer la fila de avatares, que es lo último que hay encima.

              Son TRES números que se mueven juntos: este alto, el `pb-*` del
              hero y el `mt-*` del formulario. Los dos últimos son los que
              dejan el filete separador centrado en su propio hueco.

              El color de destino es el fondo de la página, no un negro ni un
              transparente: tiene que llegar exactamente al tono con el que
              empalma o quedaría una franja de un tercer color entre las dos. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent_0%,var(--dg-fondo)_100%)] sm:h-24 md:h-28"
          />
        </section>

        {/* ── EL SEPARADOR ──

            El corte entre el hero y lo que sigue lo marcan cuatro cosas, y cada
            una hace algo que las otras no:

            · el CAMBIO DE TONO — el hero va un escalón por debajo y lo de
              abajo asciende al verde de marca;
            · el FUNDIDO empalma esos dos tonos para que el canto no se lea como
              una línea sucia;
            · los ANILLOS SE DISUELVEN en el 72% de la banda, muy por encima del
              final, para que el arco del aro exterior no cruce la sección como
              una raya clara;
            · y este FILETE pone el punto exacto donde el hero termina.

            El degradado dice "esto se está acabando" y el filete dice "aquí".
            Sin filete el final queda difuso; sin fundido, el filete parece una
            raya puesta encima de dos colores que chocan.

            ── EL MISMO AIRE ARRIBA Y ABAJO ──

            El filete llevaba `-mt-4` para meterse dentro del hero, y así el
            hueco de arriba (todo el relleno inferior de la banda) era más del
            doble que el de abajo. Sin ese tirón la cuenta sale sola: por arriba
            hay `pb-*` del hero y por abajo el `mt-*` del formulario, y con
            los dos iguales el filete queda centrado en su propio espacio.

            ⚠️ SI ALGUIEN VUELVE A SOLAPARLO CON EL HERO —un margen negativo—,
            hace falta `relative` en este contenedor. El fundido inferior del
            hero es un absoluto casi opaco y los absolutos se pintan DESPUÉS del
            contenido normal: taparía el filete sin que nada fallara ni avisara.
            Ya pasó. */}
        <div className="px-5">
          <SeparadorDg className="mx-auto max-w-5xl" />
        </div>

        {/* ══════════════ EL FORMULARIO ══════════════

            ── EL MARGEN SUPERIOR VA EMPAREJADO CON EL `pb-*` DEL HERO ──

            mt-20/24/28 contra pb-20/24/28. Son los dos huecos que rodean al
            filete separador, y tienen que medir lo mismo o la línea se lee
            colgada de este bloque en vez de marcando dónde acaba el hero.

            ⚠️ SI SE TOCA EL RELLENO INFERIOR DEL HERO, hay que tocar esto — y
            también el alto del fundido, que va con ellos. Los tres números son
            el mismo número.

            ── ERA LO MÁS ANCHO DE LA PÁGINA Y AHORA ES LO MÁS ESTRECHO ──

            Medía 56rem, y no por gusto: eran dos columnas —contenido e
            ilustración— y "¿A qué email te lo envío?", el más largo de los tres
            titulares, se partía en dos renglones si la de contenido se
            estrechaba. La tarjeta crecía de alto sólo en ese paso y todo lo de
            debajo pegaba un salto al pulsar "continuar".

            Retirada la ilustración de escritorio, ese ancho no defiende nada: la
            columna de contenido pasa a ser la tarjeta entera, así que el titular
            entra de sobra, y 56rem sólo servían para dejar un campo de nombre de
            casi 900 px. A 36rem vuelve a leerse como un formulario.

            La escala queda: un ancho maestro de 64rem para separador, recurso
            y pie, con hero y formulario más angostos por legibilidad. Todo
            centrado, que es lo que pidió el feedback.

            El id es el destino de los enlaces que suben hasta aquí — hoy, el
            del mensaje de la vista previa del video. Va en la sección y no en
            el primer campo: al saltar tiene que quedar a la vista la tarjeta
            entera, no un campo suelto pegado al borde de la ventana.

            La tarjeta —marco, fondo y, en móvil, la ilustración— la dibuja el
            propio formulario. Ya no lleva cabecera: cada paso trae su distintivo
            ("Aviso por WhatsApp", "Te llega por mail"), que dice lo mismo que
            decía aquel título fijo pero cambiando con lo que se está pidiendo. */}
        <div className="px-5">
          <div className="mx-auto max-w-5xl">
            <section
              id="empezar"
              aria-label="Formulario del diagnóstico"
              className="mx-auto mt-20 max-w-xl scroll-mt-8 sm:mt-24 md:mt-28"
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
      <footer className="border-t border-[var(--dg-borde)] px-5 py-10">
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
