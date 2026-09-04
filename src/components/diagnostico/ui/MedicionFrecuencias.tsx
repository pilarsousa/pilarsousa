import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import {
  FICHA_FRECUENCIA,
  FRECUENCIAS,
  type Frecuencia,
} from "@/components/diagnostico/contenido";

/*
  ═══════════════════════════════════════════════════════════════════════════
  LA MEDICIÓN — cuatro barras que se llenan hasta su porcentaje
  ═══════════════════════════════════════════════════════════════════════════

  Una barra por frecuencia, ordenadas de mayor a menor, cada una llenándose
  desde cero hasta su cifra.

  ── LA ESCALA ES DE 0 A 100 DE VERDAD ──

  Y eso es lo que arregla el planteamiento anterior. Esto empezó siendo un
  embudo de trapecios, y un embudo obliga a normalizar contra el mayor: la
  banda de arriba ocupaba siempre el ancho completo fuera cual fuera su valor,
  así que la FORMA no decía nada y había que leer el número igualmente. Encima
  hacía falta un ancho mínimo inventado para que una frecuencia con 0 no
  desapareciera del dibujo — una licencia con los datos.

  Con la barra sobre 100, el relleno ES el porcentaje. Un 43% ocupa el 43% y un
  0% se queda vacío, que es exactamente lo que hay que entender. No queda nada
  que normalizar ni que disculpar.

  ── SE LLENAN, NO APARECEN ──

  Cada barra crece desde cero con un retardo respecto de la anterior. Es lo que
  convierte cuatro cifras impresas en una medición: algo que se ha calculado
  delante de ti. Los detalles del cómo, en .dg-carga (analisis.css).

  ── EL RETARDO VA EN ESTILO EN LÍNEA ──

  Tailwind no genera clases con valores calculados en ejecución: un
  `delay-[${i * 120}ms]` se escribe en el HTML pero NO produce ninguna regla, y
  falla en silencio.
*/

/* El tono baja con la posición. La dominante va en el acento vivo y las demás
   se apagan progresivamente: el orden se lee de un vistazo, antes de leer
   ningún número.

   Se usa opacidad y no cuatro colores distintos a propósito. Cuatro tonos
   inventados obligarían a explicar qué significa cada uno; una sola tinta que
   se apaga sólo dice "más" y "menos", que es lo que hay que decir. */
const OPACIDADES = [1, 0.66, 0.46, 0.32];

export function MedicionFrecuencias({
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
    frecuencias empatadas se quedaría arriba la que viniera antes en
    FRECUENCIAS — que no tiene por qué ser la que ganó. La medición enseñaría a
    una en lo alto mientras el titular de al lado nombra a otra.
  */
  const filas = FRECUENCIAS.map((f) => ({ f, pct: porcentajes[f] ?? 0 })).sort(
    (a, b) =>
      b.pct - a.pct || (a.f === dominante ? -1 : b.f === dominante ? 1 : 0),
  );

  return (
    <figure className={cn("w-full", className)}>
      <figcaption className="mb-5 text-[0.7rem] tracking-[0.16em] text-[var(--dg-texto-tenue)] uppercase">
        Cómo se repartieron tus 7 respuestas
      </figcaption>

      {/* Una lista ORDENADA porque el orden es la información: la primera es la
          dominante. Un <ul> diría que da igual cuál va antes. */}
      <ol className="flex flex-col gap-4">
        {filas.map(({ f, pct }, i) => {
          const esDominante = f === dominante;
          return (
            <li key={f}>
              {/* El nombre y la cifra van ENCIMA de la barra, no dentro: dentro
                  sólo caben mientras la barra sea larga, y la última puede
                  estar vacía — el texto se saldría justo en la fila que más
                  necesita explicarse. */}
              <div className="mb-2 flex items-baseline justify-between gap-3">
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
                {/* tabular-nums iguala el ancho de las cifras, así que los
                    cuatro porcentajes quedan alineados por la derecha aunque
                    unos tengan dos dígitos y otros uno. */}
                <span
                  className={cn(
                    "text-[0.85rem] tabular-nums",
                    esDominante
                      ? "font-semibold text-[var(--dg-acento-vivo)]"
                      : "text-[var(--dg-texto-tenue)]",
                  )}
                >
                  {pct}%
                </span>
              </div>

              {/* LA PISTA es el 100%. Se ve siempre entera, así que el hueco que
                  queda a la derecha del relleno dice cuánto FALTA — que es la
                  mitad de la información y lo que un embudo no podía dar.

                  aria-hidden: el nombre y la cifra de arriba ya lo cuentan
                  todo en texto; la barra es la versión visual de lo mismo y
                  repetirla en voz alta sólo alarga la lectura. */}
              <div
                aria-hidden
                className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--dg-borde)]/60"
              >
                <div
                  style={
                    {
                      width: `${pct}%`,
                      opacity: OPACIDADES[i] ?? 0.32,
                      animationDelay: `${140 + i * 120}ms`,
                    } as CSSProperties
                  }
                  className={cn(
                    "dg-carga h-full rounded-full bg-[linear-gradient(90deg,var(--dg-acento)_0%,var(--dg-acento-vivo)_100%)]",
                    /* Sólo la dominante lleva resplandor. Puesto en las cuatro
                       dejaría de señalar nada. */
                    esDominante &&
                      "shadow-[0_0_16px_-2px_rgba(163,202,35,0.85)]",
                  )}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
