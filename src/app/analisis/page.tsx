import Image from "next/image";
import { ArranqueDiagnostico } from "@/components/diagnostico/ArranqueDiagnostico";
import { VistaPreviaVideo } from "@/components/diagnostico/ui/VistaPreviaVideo";
import { LANDING } from "@/components/diagnostico/contenido";

/*
  ═══════════════════════════════════════════════════════════════════════════
  LANDING DE PROMESA — /analisis
  ═══════════════════════════════════════════════════════════════════════════

    nav → hero (imagen + promesa) → FORMULARIO → vista previa del video → pie

  ── EL HERO: LA IMAGEN A LA IZQUIERDA Y EL TEXTO ENCIMA DE SU MITAD DERECHA ──

  Se monta con una rejilla de 12 columnas en la que los dos bloques ocupan la
  MISMA FILA y se solapan:

      imagen   columnas 1 → 8    (66,7% del ancho)
      texto    columnas 5 → 12   (empieza en el 33,3%)

  El 33,3% es exactamente la mitad de la imagen, que es donde tiene que
  arrancar el titular. No se usa `absolute` para la imagen —que sería lo
  primero que uno prueba— porque entonces habría que darle `object-cover` para
  llenar el alto, y recortar esta imagen le comería las esquinas redondeadas
  que trae quemadas, dejando tiras blancas en los bordes. En rejilla conserva
  su proporción y las esquinas quedan donde las espera el redondeo.

  ⚠️ EL REDONDEO NO ES DECORATIVO: TAPA UN DEFECTO DEL ARCHIVO.

  img-hero.png viene con las esquinas redondeadas dibujadas SOBRE BLANCO, con
  un radio de 42 px sobre 1672 de ancho (2,51%). Sin redondear, se ven cuatro
  triángulos blancos en las esquinas.

  `rounded-3xl` son 24 px fijos, así que sólo tapa el defecto mientras la
  imagen se dibuje por debajo de unos 955 px de ancho (24 ÷ 0,0251). Con la
  rejilla actual son 683 px a 1024 de contenedor, o sea que sobra margen — pero
  SI ALGUIEN ENSANCHA EL HERO, hay que subir el redondeo con él o volverán a
  asomar las esquinas.

  ── EL FORMULARIO ESTÁ EN LA PÁGINA, NO DETRÁS DE UN BOTÓN ──

  Justo debajo de la promesa, sin bajar. Un CTA que navega a otra página mete
  dos puertas entre el titular y la conversión: pulsar y esperar.

  ── SIGUE SIENDO UN COMPONENTE DE SERVIDOR ──

  Sólo se hidratan la caja del formulario y la vista previa del video. El
  titular, la imagen y el pie se sirven como HTML.

  ── LA PRUEBA SOCIAL ESTÁ BLOQUEADA A PROPÓSITO ──

  `LANDING.testimonios` está vacío y por eso el bloque no se pinta. El
  documento prohíbe explícitamente inventar autoridad ("avalado por X mil
  personas") o bonos que no existen. Cuando Ismael confirme si hay reseñas
  reales, se rellena el array y la sección aparece sola.
*/

export default function DiagnosticoPage() {
  const hayTestimonios = LANDING.testimonios.length > 0;

  return (
    <div className="flex min-h-svh flex-col">
      {/* ⚠️ ESTA PÁGINA NO TIENE CABECERA, y no falta nada: el logo va
          superpuesto sobre la imagen del hero, unas líneas más abajo. Una
          franja propia encima sólo servía para sostener el logo y la frase, y
          la frase se mudó al pie. /test y /resultado sí la llevan (Marca),
          porque allí no hay ninguna imagen sobre la que apoyar el logo. */}
      {/* El relleno superior es MAYOR EN MÓVIL que en escritorio, al revés de lo
          normal, y no es un descuido: en móvil el logo sobresale 24 px por
          encima de la imagen del hero, y sin ese aire tocaría el canto de la
          pantalla. En escritorio el logo va dentro, en la esquina, y no hace
          falta reservar nada.

          El corte va en `md:` y no en `sm:` porque es justo donde el logo
          cambia de sitio. */}
      <main className="flex-1 px-5 pt-12 pb-16 md:pt-8">
        {/* ══════════════ HERO ══════════════ */}
        <section className="mx-auto max-w-5xl md:grid md:grid-cols-12 md:items-center">
          {/* LA IMAGEN.

              alt vacío: es atmósfera, no información. Quien no la ve tiene el
              titular justo al lado diciendo lo mismo que ella sugiere, y
              describirla ("mujer meditando frente a un mandala") sólo añadiría
              ruido antes de la promesa.

              priority: es la imagen más grande por encima del pliegue y la
              candidata a marcar el LCP. Sin esto Next la carga en diferido y
              el hero aparece vacío durante el primer instante.

              quality 90: es un degradado oscuro enorme, justo el material donde
              la compresión deja bandas visibles. next.config sólo admite 75 y
              90 — cualquier otro valor se ignora en silencio. */}
          <div className="relative md:col-start-1 md:col-end-9 md:row-start-1">
            <Image
              src={LANDING.heroImagen}
              alt={LANDING.heroImagenAlt}
              width={1672}
              height={941}
              priority
              quality={90}
              sizes="(min-width: 768px) 44rem, 92vw"
              className="dg-hero-imagen w-full rounded-3xl"
            />

            {/* ── EL LOGO, DENTRO DE LA IMAGEN ──

                Cambia de sitio con el ancho, y las dos posiciones responden a
                dónde está el contenido:

                · En MÓVIL va centrado arriba. La imagen ocupa el ancho entero
                  y el titular viene debajo, así que el eje de la página es el
                  centro y el logo tiene que estar en él.
                · Desde md: va a la esquina superior IZQUIERDA. Ahí el titular
                  arranca a la mitad de la imagen, y un logo centrado caería
                  justo encima de la primera línea.

                `-translate-x-1/2` sólo por debajo de md, y anulado con
                `md:translate-x-0`: el desplazamiento es lo que centra de
                verdad —`left-1/2` solo dejaría el borde izquierdo en el
                centro— y si se quedara puesto en escritorio correría el logo
                media anchura hacia la izquierda, fuera de la imagen.

                Se apoya sobre la zona más oscura de la foto en las dos
                posiciones, así que el nombre en blanco del disco se lee sin
                necesidad de ponerle ningún velo debajo.

                ── EN MÓVIL SOBRESALE POR ARRIBA ──

                `-top-6` lo saca 24 px de los 56 que mide, o sea que casi la
                mitad del disco queda FUERA de la imagen. Deja de leerse como
                un logo pegado dentro de la foto y pasa a ser una chapa apoyada
                sobre ella — que es lo que hace que se despegue del fondo sin
                tener que añadirle ningún halo.

                ⚠️ ESTO DEPENDE DEL RELLENO SUPERIOR DEL <main>, que es de 48 px
                en móvil justamente para dejarle sitio: sin él, el disco tocaría
                el canto de la pantalla. Y de que ningún ancestro recorte —hoy
                ninguno lleva overflow— o el trozo que sobresale desaparecería
                sin aviso. */}
            <Image
              src={LANDING.logo}
              alt="Volver al Origen"
              width={1254}
              height={1254}
              priority
              quality={90}
              sizes="72px"
              className="absolute -top-6 left-1/2 size-14 -translate-x-1/2 sm:size-16 md:top-6 md:left-6 md:translate-x-0"
            />
          </div>

          {/* EL TEXTO.

              En móvil sube con un margen negativo para meterse dentro del
              fundido inferior de la imagen; si no, quedaría por debajo del
              rectángulo con una franja de fondo vacío en medio y el fundido no
              serviría de nada.

              `relative` sin z-index: al venir después en el documento y estar
              posicionado, gana el orden de pintado sobre la imagen. */}
          <div className="relative -mt-6 md:col-start-5 md:col-end-13 md:row-start-1 md:mt-0">
            {/* El titular va en tres tramos porque el del medio —lo que de
                verdad promete— tiene que destacarse del resto. Partirlo en
                tres cadenas permite que el acento cambie de línea sin
                arrastrar el ritmo de la frase. */}
            <h1 className="dg-titulo text-center text-[1.7rem] leading-[1.25] text-balance sm:text-[2.1rem] sm:leading-[1.2] md:text-left md:text-[2.5rem]">
              <span className="text-[var(--dg-texto)]">{LANDING.titulo}</span>{" "}
              <span className="font-bold text-[var(--dg-acento-vivo)]">
                {LANDING.tituloAcento}
              </span>{" "}
              <span className="text-[var(--dg-texto)]">
                {LANDING.tituloCierre}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-center text-[0.98rem] leading-relaxed text-[var(--dg-texto-suave)] sm:text-lg md:mx-0 md:text-left">
              {LANDING.subtitulo}
            </p>
          </div>
        </section>

        {/* ══════════════ EL FORMULARIO ══════════════

            ⚠️ ES MÁS ANCHO QUE EL RESTO DEL CONTENIDO, y por un motivo
            concreto: "¿A qué email te lo envío?" es el más largo de los tres
            titulares y a 48rem se partía en dos renglones. Como los otros dos
            caben en uno, la tarjeta crecía de alto sólo en ese paso y todo lo
            que hay debajo pegaba un salto al pulsar "continuar".

            Se resuelve dando ancho en vez de encogiendo la letra: bajar el
            cuerpo del titular hasta que quepa lo dejaría notablemente más
            pequeño que el del hero, y el titular es lo que sostiene la
            tarjeta.

            La escala queda descendente y ordenada: hero 64rem, formulario
            56rem, el resto 48rem.

            El id es el destino de los enlaces que suben hasta aquí — hoy, el
            del mensaje de la vista previa del video. Va en la sección y no en
            el primer campo: al saltar tiene que quedar a la vista la tarjeta
            entera, no un campo suelto pegado al borde de la ventana.

            La tarjeta —marco, fondo, las dos columnas y la ilustración— la
            dibuja el propio formulario. Ya no lleva cabecera: cada paso trae su
            distintivo ("Aviso por WhatsApp", "Te llega por mail"), que dice lo
            mismo que decía aquel título fijo pero cambiando con lo que se
            está pidiendo. */}
        <section
          id="empezar"
          aria-label="Formulario del diagnóstico"
          className="mx-auto mt-10 max-w-4xl scroll-mt-8 sm:mt-12"
        >
          <ArranqueDiagnostico />
        </section>

        <div className="mx-auto max-w-3xl">
          {/* LAS TRES SEÑALES SON HECHOS DEL TEST, no autoridad prestada:
              cuántas preguntas son, cuánto tarda y cuándo llega el resultado.
              Van DEBAJO del formulario porque ahí responden a la duda que
              aparece justo al ver un campo de email. */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.8rem] text-[var(--dg-texto-tenue)]">
            {LANDING.señales.map((señal) => (
              <li key={señal} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-[var(--dg-acento)]"
                />
                {señal}
              </li>
            ))}
          </ul>

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

              El reproductor va DESPUÉS del texto en el orden del DOM aunque en
              escritorio se vea a la izquierda: quien usa lector de pantalla oye
              primero qué es y después llega al control. El orden visual lo
              invierte `sm:order-first`, que no afecta al de lectura. */}
          <section
            aria-labelledby="regalo-titulo"
            className="mt-14 rounded-3xl border border-[var(--dg-borde)] bg-[var(--dg-fondo-alto)] p-6 sm:mt-16 sm:p-8"
          >
            <div className="grid items-center gap-7 sm:grid-cols-2 sm:gap-9">
              <div>
                <h2
                  id="regalo-titulo"
                  className="dg-titulo text-xl text-[var(--dg-texto)] sm:text-2xl"
                >
                  {LANDING.regaloTitulo}
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--dg-texto-suave)]">
                  {LANDING.regaloTexto}
                </p>
              </div>

              <div className="sm:order-first">
                <VistaPreviaVideo />
              </div>
            </div>
          </section>
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
