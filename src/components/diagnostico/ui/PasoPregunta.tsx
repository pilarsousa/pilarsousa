"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { Pregunta } from "@/components/diagnostico/contenido";

/*
  ═══════════════════════════════════════════════════════════════════════════
  UNA PREGUNTA DEL TEST
  ═══════════════════════════════════════════════════════════════════════════

  El montaje, de arriba abajo:

      enunciado centrado, ENCIMA de la ilustración
      ilustración, que se disuelve por su borde inferior
      las cuatro respuestas, subidas dentro de esa disolución
      "pregunta N de 7", centrado, al final de todo

  ── LA PANTALLA SE ARMA EN TRES TIEMPOS ──

  Primero se asienta la ilustración, después sube el enunciado y luego las
  cuatro respuestas una detrás de otra. Con todo entrando a la vez, el ojo no
  sabe dónde mirar y las respuestas se leen como un bloque de texto; en
  cascada, la mirada las recorre en el orden en que hay que leerlas para
  elegir.

  Los tiempos están apretados a propósito —la última respuesta ha terminado
  antes de los 900 ms— porque esto se repite SIETE VECES seguidas. Lo que en
  una pantalla es elegante, repetido siete veces es una espera.

  ── LOS RETARDOS VAN EN ESTILO EN LÍNEA ──

  Y no como clases de Tailwind. Un `delay-[${i * 60}ms]` construido en tiempo
  de ejecución se escribe en el HTML pero NO genera ninguna regla: el escáner
  de Tailwind sólo ve el código fuente, no lo que produce. Falla en silencio,
  que es la peor forma de fallar.

  ── ANTES ERA DOS COLUMNAS Y AHORA ES UNA SOLA ──

  La ilustración iba a un lado y el texto al otro, y así quedaba como un
  adorno lateral: se miraba una vez y no volvía a mirarse. Apilada bajo el
  enunciado pasa a ser la escena de la pregunta, que es lo que cuenta.

  El enunciado llegó a ir montado DENTRO de la ilustración, sobre un velo que
  lo hacía legible. Salió de ahí por el feedback de la primera entrega —"subir
  el título más arriba"— y ahora va antes, en el flujo normal, con el hueco
  reservado para que la imagen no se mueva entre preguntas.

  Se aplica igual en móvil y en escritorio: es una composición vertical y
  escala sola. Mantener además la de dos columnas significaría sostener dos
  diseños distintos de la misma pantalla.

  ── LAS OPCIONES SON <button>, NO RADIOS ──

  Un grupo de radios necesita marcar y DESPUÉS pulsar "siguiente": dos gestos
  por pregunta, catorce en total. Aquí elegir ES avanzar, así que cada opción
  es un botón que hace una cosa. El `aria-pressed` de cada uno dice cuál quedó
  elegida al volver atrás.

  ── role="group" EN VEZ DE <fieldset>/<legend> ──

  Un <legend> se incrusta en el borde del fieldset y se comporta distinto en
  cada navegador al colocarlo sobre una imagen. `role="group"` con
  `aria-labelledby` apuntando al enunciado da la misma información al lector de
  pantalla sin ninguna de esas rarezas.
*/

/* El compás de la entrada, en milisegundos. Cambiando estos cuatro números se
   cambia el ritmo entero sin tocar el montaje. */
const RITMO = {
  enunciado: 70,
  primeraOpcion: 140,
  entreOpciones: 60,
  contador: 390,
} as const;

export function PasoPregunta({
  pregunta,
  elegida,
  onElegir,
  numero,
  totalPreguntas,
}: {
  pregunta: Pregunta;
  /* Id de la opción ya elegida, si se está volviendo atrás. */
  elegida?: string;
  onElegir: (idOpcion: string) => void;
  numero: number;
  totalPreguntas: number;
}) {
  const idEnunciado = `enunciado-${pregunta.id}`;

  return (
    <div className="mx-auto max-w-2xl">
      {/* ── EL ENUNCIADO, ENCIMA DE LA ILUSTRACIÓN ──

          Estaba montado DENTRO de la escena, en absoluto y pegado al borde
          superior de la imagen, sobre un velo que lo hacía legible. Sale de ahí
          por el feedback —"subir el título más arriba"— y pasa al flujo normal,
          antes de la ilustración.

          ── EL HUECO ESTÁ RESERVADO A TRES RENGLONES ──

          Los enunciados van de 33 a 84 caracteres: el más corto ocupa un
          renglón y el más largo tres en móvil. En flujo normal eso movería la
          ilustración de sitio en cada pregunta, y el test daría un salto en
          cada pantalla — que es justo lo que evitaba el absoluto de antes.

          El `min-h` reserva el alto del más largo y `items-end` pega el texto
          al borde de abajo: la distancia entre el enunciado y la ilustración es
          siempre la misma, y lo que crece lo hace hacia arriba, sobre el aire
          que ya había debajo de la barra de progreso.

          ⚠️ SI UN ENUNCIADO FUTURO PIDE UN CUARTO RENGLÓN hay que subir estos
          dos números, o la ilustración volverá a saltar entre preguntas.

          text-balance reparte las palabras entre los renglones en vez de dejar
          el último cojo. */}
      <div className="flex min-h-[4.75rem] items-end justify-center px-2 pb-5 sm:min-h-[6rem] sm:px-8 sm:pb-6">
        <p
          id={idEnunciado}
          style={{ animationDelay: `${RITMO.enunciado}ms` }}
          className="dg-titulo dg-sube text-center text-[1.15rem] leading-snug text-balance text-[var(--dg-texto)] sm:text-[1.45rem]"
        >
          {pregunta.enunciado}
        </p>
      </div>

      {/* ── LA ESCENA: la ilustración y su atmósfera ── */}
      <div className="relative">
        {/* EL HALO QUE RESPIRA.

            Se desborda de la ilustración por los cuatro lados —de ahí los
            valores negativos— porque la imagen es opaca y si quedara justo
            debajo no se vería nada. Lo que se percibe es un aura alrededor del
            dibujo, y por el borde inferior, donde la imagen se disuelve, se
            cuela hacia dentro.

            mix-blend-screen no puede oscurecer: sobre el verde oscuro del
            fondo suma luz y sobre la propia ilustración no hace nada, así que
            por mucho que crezca no ensucia el dibujo.

            Va ANTES que la imagen en el documento y la imagen lleva
            `relative`: así el orden de pintado deja el halo detrás sin
            necesidad de z-index negativos, que se comportan de forma rara en
            cuanto algún ancestro crea un contexto de apilado. */}
        <div
          aria-hidden
          className="dg-respira pointer-events-none absolute -inset-x-[7%] -inset-y-[11%] bg-[radial-gradient(50%_50%_at_50%_50%,var(--dg-brillo-medio)_0%,var(--dg-brillo-suave)_45%,transparent_72%)] blur-[2.5vw] mix-blend-screen"
        />

        {/* ── LA ILUSTRACIÓN ──

            NO SE RECORTA EN NINGÚN ANCHO: `aspect-video` es exactamente la
            proporción del archivo (1672x941), así que se ve entera siempre. El
            motivo está repartido en horizontal —en la primera, la burbuja de
            chat y el reloj están a la derecha del todo— y recortar los lados se
            come justo lo que cuenta la situación.

            No lleva `priority`: sólo la primera pregunta se ve nada más entrar,
            y marcarlas todas como prioritarias descargaría las siete de golpe.

            quality 90: son ilustraciones de líneas finas y degradados sobre
            negro, el material donde más se notan las bandas de compresión.
            next.config sólo admite 75 y 90 — cualquier otro valor se ignora en
            silencio y sirve 75. */}
        <Image
          src={pregunta.imagen}
          alt={pregunta.imagenAlt}
          width={1672}
          height={941}
          quality={90}
          sizes="(min-width: 768px) 42rem, 92vw"
          className="dg-imagen-fundida dg-asienta relative aspect-video w-full rounded-2xl"
        />

        {/* EL VELO SUPERIOR — YA NO HACE FALTA PARA LEER, Y SE QUEDA IGUAL.

            Estaba para que el enunciado se leyera encima de cualquier dibujo:
            las ilustraciones son oscuras arriba, pero bastaba con que una
            futura tuviera una zona clara en esa franja para que el texto
            desapareciera. Con el enunciado fuera de la imagen, ese trabajo ya
            no existe.

            SE MANTIENE porque el feedback dice que la imagen está bien
            integrada y que no se toca, y este degradado es parte de cómo se ve
            hoy: quitarlo cambiaría el aspecto que aprobaron. Ahora su único
            papel es atmósfera.

            ⚠️ Si alguna vez piden la ilustración más luminosa, ESTE es el
            primer sitio donde mirar — y ahora se puede aclarar o retirar sin
            romper nada, que antes no.

            pointer-events-none: está por encima de la imagen, pero no puede
            interceptar ningún clic. */}
        <div
          aria-hidden
          className="dg-asienta pointer-events-none absolute inset-x-0 top-0 h-[62%] rounded-t-2xl bg-[linear-gradient(180deg,var(--dg-velo)_0%,var(--dg-velo-medio)_42%,var(--dg-velo-nulo)_100%)]"
        />

      </div>

      {/* ── LAS RESPUESTAS ──

          El margen negativo las mete DENTRO de la zona donde la ilustración ya
          se está apagando. Sin él quedarían debajo del rectángulo, con una
          franja de fondo vacío en medio, y el fundido no serviría de nada.

          `relative` sin z-index basta para que queden por encima del resto de
          la imagen: al estar posicionadas y venir después en el documento,
          ganan el orden de pintado. */}
      <div
        role="group"
        aria-labelledby={idEnunciado}
        className="relative -mt-10 flex flex-col gap-2.5 sm:-mt-14"
      >
        {pregunta.opciones.map((opcion, i) => {
          const activa = elegida === opcion.id;
          return (
            <button
              key={opcion.id}
              type="button"
              aria-pressed={activa}
              onClick={() => onElegir(opcion.id)}
              style={
                {
                  animationDelay: `${RITMO.primeraOpcion + i * RITMO.entreOpciones}ms`,
                } as CSSProperties
              }
              className={cn(
                "dg-opcion dg-sube flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-[0.92rem] leading-snug transition-[background-color,border-color,color,box-shadow] duration-200 sm:text-[0.98rem]",
                activa
                  ? /* El resplandor confirma la elección durante los 260 ms que
                       tarda en pasar a la siguiente. Sin él, el único aviso es
                       un cambio de borde que se pierde en el movimiento. */
                    "border-[var(--dg-acento)] bg-[var(--dg-superficie-viva)] text-[var(--dg-texto)] shadow-[0_0_26px_-8px_var(--dg-brillo-fuerte)]"
                  : "border-[var(--dg-borde)] bg-[var(--dg-superficie)] text-[var(--dg-texto-suave)] hover:border-[var(--dg-borde-vivo)] hover:text-[var(--dg-texto)]",
              )}
            >
              {/* La letra de la opción. aria-hidden porque no aporta nada leída
                  en voz alta: sirve para señalar con el dedo, no para entender
                  la respuesta. */}
              <span
                aria-hidden
                className={cn(
                  "mt-px flex size-6 shrink-0 items-center justify-center rounded-md border text-[0.7rem] font-semibold transition-colors duration-150",
                  activa
                    ? "border-[var(--dg-acento)] bg-[var(--dg-acento)] text-[var(--dg-acento-oscuro)]"
                    : "border-[var(--dg-borde)] text-[var(--dg-texto-tenue)]",
                )}
              >
                {String.fromCharCode(97 + i)}
              </span>
              <span className="min-w-0">{opcion.texto}</span>
            </button>
          );
        })}
      </div>

      {/* ── EL CONTADOR, AL FINAL ──

          Estaba encima del enunciado y ahí competía con él: lo primero que se
          leía en cada pantalla era un número de expediente, no la pregunta. Al
          final es lo que tiene que ser — una referencia para saber cuánto
          queda, que se consulta después de responder. Entra el último, por lo
          mismo. */}
      <p
        style={{ animationDelay: `${RITMO.contador}ms` }}
        className="dg-sube mt-7 text-center text-[0.72rem] tracking-[0.16em] text-[var(--dg-texto-tenue)] uppercase"
      >
        Pregunta {numero} de {totalPreguntas}
      </p>
    </div>
  );
}
