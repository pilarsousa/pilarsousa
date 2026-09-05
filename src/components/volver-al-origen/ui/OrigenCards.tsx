"use client";

import {
  CardMagica,
  FocoBento,
  useEsMovil,
} from "@/components/lista-de-espera/ui/BentoMagico";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { ORIGEN } from "@/components/volver-al-origen/content";

/*
  Las cards de la historia, con los efectos de cursor montados.

  ── POR QUÉ EXISTE ESTE ARCHIVO ──

  La sección Origen es un componente de SERVIDOR y los efectos necesitan hooks.
  Sin esta capa habría que marcar la sección entera como cliente, y con ella se
  irían al navegador el título, las costuras y la paleta — que son HTML y no
  tienen por qué viajar como JavaScript. Es el mismo reparto que hace
  RejillaBonus en la landing borrador.

  ── SE REUTILIZA BentoMagico DE /lista-de-espera, NO SE COPIA ──

  Son casi 500 líneas de GSAP: partículas, imán, inclinación y foco de grupo.
  Duplicarlas para cambiar un color habría dejado dos copias que se separan a la
  primera corrección.

  Lo único que estaba atado a la otra landing era el verde, y se parametrizó
  allí con `--le-bento-rgb` (respaldo: el lima de siempre, así que el borrador
  no cambia). Esta sección la define en su paleta con el verde 2 del embudo del
  diagnóstico, que es el que se ve sobre crema.

  ⚠️ SI ALGÚN DÍA /lista-de-espera SE BORRA, este import se rompe. La pieza
  tendría que mudarse a un sitio común antes — no copiarse aquí.

  ── LOS EFECTOS SE APAGAN EN MÓVIL ──

  `useEsMovil` los desactiva por debajo de 768 px, igual que en el borrador: no
  hay cursor que seguir, y las partículas serían trabajo de GPU a cambio de
  nada. La card se queda quieta y perfectamente legible.
*/

/* Estilo compartido por las cinco cards. Va en una constante y no repetido en
   cada una porque son cinco y la diferencia entre ellas es el contenido, no la
   superficie: si alguna se desvía, es un error, no una decisión. */
const CARD =
  "le-bento-card relative overflow-hidden rounded-2xl bg-white p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),inset_0_-1px_0_0_rgba(8,74,44,0.12),0_18px_50px_-32px_rgba(0,47,1,0.35)] sm:p-8";

/* La medida de lectura. ~62 caracteres por renglón es la horquilla en la que el
   ojo salta de línea sin buscar dónde empieza la siguiente; a lo ancho del
   contenedor (1140 px) serían más de 120 y el texto se volvería incómodo justo
   en la sección más larga de la página. */
const TEXTO =
  "space-y-4 text-[1.0625rem] leading-[1.75] text-[var(--vo-origen-tinta-suave)] sm:text-lg";

export function OrigenCards() {
  const esMovil = useEsMovil();

  return (
    /* El foco del grupo: una luz tenue que sigue al cursor por encima de TODA
       la rejilla, no de cada card. Es lo que hace que las cinco se lean como un
       bloque y no como cinco piezas sueltas. */
    <FocoBento desactivar={esMovil} className="mt-12 block w-full sm:mt-14">
      {/* Una sola columna y centrada: es un RELATO, y se lee de arriba abajo.
          En rejilla de dos columnas habría que decidir cuál se lee antes, y no
          hay respuesta buena — el texto tiene un orden. */}
      <div className="mx-auto flex max-w-[46rem] flex-col gap-5">
        {/* ══ 1 · EL PROBLEMA ══ */}
        <ScrollIn>
          <CardMagica className={CARD} desactivar={esMovil}>
            <div className={TEXTO}>
              {ORIGEN.problema.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </CardMagica>
        </ScrollIn>

        {/* ══ 2 · LA BISAGRA ══

            La frase que da la vuelta al argumento. Es la única card en verde
            pleno con el texto en crema: en una columna de cinco superficies
            blancas, invertirla es lo que la convierte en un alto en la lectura.

            Sin partículas ni inclinación (`particulas={0}`, `inclinar={false}`):
            son dos renglones que hay que leer de golpe, y el movimiento
            competiría con ellos. Conserva el imán, que es un desplazamiento
            mínimo y basta para que responda al cursor como sus vecinas. */}
        <ScrollIn>
          <CardMagica
            className="le-bento-card relative overflow-hidden rounded-2xl bg-[var(--vo-origen-verde)] p-6 shadow-[0_18px_50px_-28px_rgba(0,47,1,0.5)] sm:p-8"
            desactivar={esMovil}
            particulas={0}
            inclinar={false}
          >
            <p className="text-center text-[1.15rem] leading-[1.55] font-medium text-balance text-[#fff8ef] sm:text-[1.35rem]">
              {ORIGEN.giro}
            </p>
          </CardMagica>
        </ScrollIn>

        {/* ══ 3 · EL ORIGEN Y EL SISTEMA ══

            Los dos bloques van en la MISMA card: el primero cuenta cómo llegó
            al método y el segundo qué es, y separarlos partía en dos una idea
            que se explica de corrido. Es la card más alta de la columna, y eso
            es correcto — es el núcleo del relato. */}
        <ScrollIn>
          <CardMagica className={CARD} desactivar={esMovil}>
            <div className={TEXTO}>
              {ORIGEN.origen.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {/* El filete separa los dos bloques dentro de la card sin abrir un
                hueco: con sólo aire, la card parecería dos cards mal pegadas. */}
            <hr className="my-6 border-0 border-t border-[color-mix(in_srgb,var(--vo-origen-verde)_18%,transparent)]" />

            <div className={TEXTO}>
              {ORIGEN.sistema.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </CardMagica>
        </ScrollIn>

        {/* ══ 4 · LAS CIFRAS Y LA PRUEBA ══

            Las cuatro cifras son lo único verificable del relato —10 años, 13
            códigos, 2 ediciones, 350 alumnos— y dentro de un párrafo no las ve
            nadie. En una fila se leen de un vistazo, y los párrafos que las
            sostienen van debajo. */}
        <ScrollIn>
          <CardMagica className={CARD} desactivar={esMovil}>
            {/* La lista va aria-hidden: las cuatro cifras están dichas en los
                párrafos de debajo, y un lector de pantalla las leería dos veces
                —la segunda sin contexto, como números sueltos. */}
            <ul
              aria-hidden
              className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4"
            >
              {ORIGEN.datos.map((d) => (
                /* `items-start` con la columna en flex: las cuatro cifras
                   arrancan a la misma altura aunque una etiqueta ocupe dos
                   renglones —"Códigos Originales" lo hace— en vez de centrarse
                   cada una en su caja y quedar desalineadas entre sí. */
                <li
                  key={d.etiqueta}
                  className="flex flex-col items-center text-center"
                >
                  {/* tabular-nums para que las cuatro compartan el ancho de
                      dígito y queden ópticamente alineadas aunque unas tengan
                      dos caracteres y otras cuatro. */}
                  <p className="font-display text-[1.75rem] leading-none font-semibold tabular-nums text-[var(--vo-origen-verde)] sm:text-[2rem]">
                    {d.cifra}
                  </p>
                  <p className="mt-1.5 text-[0.72rem] leading-snug tracking-[0.08em] text-[color-mix(in_srgb,var(--vo-origen-tinta)_55%,transparent)] uppercase">
                    {d.etiqueta}
                  </p>
                </li>
              ))}
            </ul>

            <hr className="my-6 border-0 border-t border-[color-mix(in_srgb,var(--vo-origen-verde)_18%,transparent)]" />

            <div className={TEXTO}>
              {ORIGEN.prueba.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </CardMagica>
        </ScrollIn>

        {/* ══ 5 · EL CIERRE ══

            La frase con la que termina el cliente. Va sin card: es el remate, y
            una quinta superficie le quitaría el aire que necesita para leerse
            como final en vez de como un bloque más de la lista. */}
        <ScrollIn>
          <p className="font-display mt-4 px-2 text-center text-[1.1rem] leading-[1.6] text-balance text-[var(--vo-origen-verde)] sm:text-[1.3rem]">
            {ORIGEN.cierre}
          </p>
        </ScrollIn>
      </div>
    </FocoBento>
  );
}
