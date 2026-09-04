import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import {
  FICHA_FRECUENCIA,
  FRECUENCIAS,
  type Frecuencia,
} from "@/components/diagnostico/contenido";

/*
  ═══════════════════════════════════════════════════════════════════════════
  EL EMBUDO — cómo se repartieron las siete respuestas
  ═══════════════════════════════════════════════════════════════════════════

  Cuatro bandas, una por frecuencia, ordenadas de mayor a menor. Cada una se
  estrecha hacia la siguiente, así que apiladas dibujan un embudo.

  ── LO QUE MIDE EL ANCHO ──

  El ancho de cada banda es su porcentaje RELATIVO AL MAYOR, no sobre 100. La
  dominante ocupa siempre el ancho completo y las demás una fracción de ella.

  Es la normalización habitual de un gráfico de embudo, y aquí hace falta: los
  cuatro porcentajes suman 100 repartidos entre cuatro, así que la mayor rara
  vez pasa del 43% y un embudo dibujado sobre 100 saldría siempre escuálido —
  parecería que el diagnóstico no ha encontrado nada.

  Como el ancho es relativo, LOS NÚMEROS DE VERDAD ESTÁN ESCRITOS. La forma
  ordena; la cifra informa.

  ── EL SUELO DE ANCHO ──

  Una frecuencia puede sacar 0 de 7, y una banda de ancho cero desaparece: la
  fila se quedaría con su rótulo y un hueco, que parece un fallo de dibujo.
  `ANCHO_MINIMO` le deja una punta visible. Es la única licencia que se toma
  con los datos, y por eso el 0% va escrito al lado, donde no se puede
  confundir con "un poquito".

  ── POR QUÉ clip-path Y NO UN SVG ──

  Un SVG obligaría a fijar las proporciones en su viewBox y a meter el texto
  dentro con `<text>`, que no hereda la tipografía de la página ni se ajusta si
  un nombre crece. Con `clip-path` en porcentajes, cada banda se recorta sobre
  su propia caja: el bloque entero es fluido y los rótulos son texto normal.
*/

/* Alto de cada banda y separación entre ellas, en la caja de la fila. */
const ANCHO_MINIMO = 14; // % del ancho disponible

/* Cuánto se cierra la última banda hacia su punta. No llega a cero: un pico
   afilado se lee como un error de dibujo, no como el final del embudo. */
const CIERRE_FINAL = 0.45;

/*
  El tono baja con la posición. La dominante va en el acento vivo y las demás
  se apagan progresivamente: es lo que hace que el orden se lea de un vistazo,
  antes de leer ningún número.

  Se usa opacidad y no cuatro colores distintos a propósito. Cuatro tonos
  inventados obligarían a explicar qué significa cada uno; una sola tinta que
  se apaga sólo dice "más" y "menos", que es exactamente lo que hay que decir.
*/
const OPACIDADES = [1, 0.62, 0.4, 0.26];

export function EmbudoFrecuencias({
  porcentajes,
  dominante,
  className,
}: {
  porcentajes: Record<string, number>;
  dominante: Frecuencia;
  className?: string;
}) {
  /*
    Se ordena de mayor a menor, y en caso de empate manda la dominante.

    El desempate explícito importa: `sort` es estable, así que con dos
    frecuencias empatadas se quedaría la que viniera antes en FRECUENCIAS — que
    no tiene por qué ser la que ganó. El embudo enseñaría a otra en lo alto
    mientras el titular de al lado nombra a la dominante.
  */
  const filas = FRECUENCIAS.map((f) => ({ f, pct: porcentajes[f] ?? 0 })).sort(
    (a, b) =>
      b.pct - a.pct ||
      (a.f === dominante ? -1 : b.f === dominante ? 1 : 0),
  );

  const mayor = filas[0]?.pct ?? 0;

  /* Ancho de cada banda, en % de la caja. Si todas fueran 0 —imposible con el
     test terminado, pero no con respuestas parciales— se reparten iguales en
     vez de dividir por cero. */
  const anchos = filas.map(({ pct }) =>
    mayor > 0
      ? Math.max(ANCHO_MINIMO, (pct / mayor) * 100)
      : ANCHO_MINIMO,
  );

  return (
    <figure className={cn("w-full", className)}>
      <figcaption className="mb-4 text-[0.7rem] tracking-[0.16em] text-[var(--dg-texto-tenue)] uppercase">
        Cómo se repartieron tus 7 respuestas
      </figcaption>

      {/* Una lista ORDENADA porque el orden es la información: la primera es la
          dominante. Un <ul> diría que da igual cuál va antes. */}
      <ol className="flex flex-col gap-3">
        {filas.map(({ f, pct }, i) => {
          const ancho = anchos[i];
          /* La banda se estrecha hasta el ancho de la SIGUIENTE, que es lo que
             encadena las cuatro en una sola figura. La última no tiene
             siguiente y se cierra sobre sí misma. */
          const anchoAbajo =
            i < anchos.length - 1 ? anchos[i + 1] : ancho * CIERRE_FINAL;

          const izqArriba = (100 - ancho) / 2;
          const derArriba = izqArriba + ancho;
          const izqAbajo = (100 - anchoAbajo) / 2;
          const derAbajo = izqAbajo + anchoAbajo;

          const esDominante = f === dominante;

          return (
            <li key={f}>
              {/* El rótulo va ENCIMA de la banda y no dentro. Dentro sólo cabe
                  mientras la banda sea ancha, y la cuarta puede ser una punta:
                  el texto se saldría o habría que encogerlo hasta lo ilegible
                  justo en la fila que más necesita explicarse. */}
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span
                  className={cn(
                    "text-[0.78rem] tracking-[0.1em] uppercase",
                    esDominante
                      ? "font-semibold text-[var(--dg-acento-vivo)]"
                      : "text-[var(--dg-texto-suave)]",
                  )}
                >
                  {FICHA_FRECUENCIA[f].titulo}
                </span>
                <span
                  className={cn(
                    "text-[0.82rem] tabular-nums",
                    esDominante
                      ? "font-semibold text-[var(--dg-acento-vivo)]"
                      : "text-[var(--dg-texto-tenue)]",
                  )}
                >
                  {pct}%
                </span>
              </div>

              {/* LA BANDA.

                  `clip-path` recorta el trapecio sobre la caja completa, así
                  que el degradado de fondo se dibuja siempre igual y lo único
                  que cambia entre filas es por dónde se corta. Con anchos y
                  márgenes habría que calcular también el degradado.

                  El retardo escalonado entra desde arriba, en el mismo orden en
                  que se leen. Va en estilo en línea porque Tailwind no puede
                  generar una clase con un valor calculado en ejecución. */}
              <div
                aria-hidden
                style={
                  {
                    clipPath: `polygon(${izqArriba.toFixed(2)}% 0%, ${derArriba.toFixed(2)}% 0%, ${derAbajo.toFixed(2)}% 100%, ${izqAbajo.toFixed(2)}% 100%)`,
                    opacity: OPACIDADES[i] ?? 0.26,
                    animationDelay: `${120 + i * 70}ms`,
                  } as CSSProperties
                }
                className="dg-sube h-9 w-full bg-[linear-gradient(90deg,var(--dg-acento-oscuro)_0%,var(--dg-acento)_45%,var(--dg-acento-vivo)_100%)] sm:h-10"
              />
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
