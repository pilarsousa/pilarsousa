"use client";

import { useId, useState } from "react";
import { ChevronDown, Compass, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { ORIGEN } from "@/components/volver-al-origen/content";

/*
  El contenido de la sección "¿Qué es Volver al Origen?".

  ── QUÉ SE FUE, Y POR QUÉ ESTABA ──

  Estas cards llegaron a usar los efectos de BentoMagico: el foco que sigue al
  cursor, las partículas, el imán y la inclinación. Se retiran a pedido, y el
  motivo de fondo es bueno: es la sección con MÁS TEXTO de la página, y en un
  bloque que se lee de corrido una card que se inclina bajo el cursor mueve
  justo el renglón que se está leyendo.

  Los efectos siguen intactos en /lista-de-espera, que es de donde salían.

  ── LO QUE ENTRA EN SU LUGAR: DOS ACORDEONES ──

  El relato tiene cuatro tramos y dos de ellos son secundarios —cómo llegó al
  método y qué incluye—: se pliegan, con su titular a la vista. Lo que queda
  desplegado es el arco principal, que se lee en menos de un minuto:

    · el problema        (siempre visible)
    · la bisagra         (siempre visible, destacada)
    · el origen          ▸ plegado
    · el sistema         ▸ plegado
    · las cifras         (siempre visible)
    · el cierre          (siempre visible)

  Quien quiere el relato completo lo abre; quien escanea se lleva el argumento
  igual. Antes, esos dos tramos eran seis párrafos que había que atravesar sí o
  sí para llegar a las cifras.

  ── EL DESPLIEGUE ANIMA `grid-template-rows` ──

  Es la única forma de interpolar hacia una altura que no se conoce: `height:
  auto` no es animable, y el apaño del `max-height` grande a ojo o corta el
  contenido o gasta la animación recorriendo un vacío. Ver .vo-acordeon en
  globals.css.
*/

/* Superficie compartida por los bloques. En una constante porque son varios y
   lo que cambia entre ellos es el contenido, no la caja: si alguno se desvía,
   es un error y no una decisión. */
const CARD =
  "rounded-2xl border border-[color-mix(in_srgb,var(--color-vo-bone)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-vo-forest)_55%,transparent)] backdrop-blur-sm";

/* La medida de lectura. ~62 caracteres por renglón es la horquilla en la que el
   ojo salta de línea sin buscar dónde empieza la siguiente. */
const TEXTO =
  "space-y-4 text-[1.0625rem] leading-[1.75] text-[color-mix(in_srgb,var(--color-vo-bone)_82%,transparent)] sm:text-lg";

/*
  Un tramo plegable.

  El titular queda siempre a la vista con su icono, y el cuerpo se despliega.
  `aria-expanded` y `aria-controls` son lo que lo convierte en un desplegable
  para un lector de pantalla; sin ellos es un botón que no dice qué hace.
*/
function Tramo({
  titulo,
  icono: Icono,
  parrafos,
}: {
  titulo: string;
  icono: typeof Compass;
  parrafos: string[];
}) {
  const [abierto, setAbierto] = useState(false);
  /* useId y no una cadena fija: hay dos acordeones en la misma pantalla y dos
     `aria-controls` iguales apuntarían al mismo panel. */
  const idPanel = useId();

  return (
    <div className={cn(CARD, "overflow-hidden")}>
      {/* El botón es la cabecera entera y no sólo la flecha: una zona de toque
          que cruza la card es lo que hace que esto se pueda usar con el pulgar.
          Una flecha de 20 px en una esquina, no. */}
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={idPanel}
        className="flex w-full cursor-pointer items-center gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-vo-bone)_5%,transparent)] sm:px-8"
      >
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] text-accent"
        >
          <Icono className="size-4" strokeWidth={1.9} />
        </span>

        <span className="font-display flex-1 text-[0.95rem] leading-snug tracking-[0.06em] text-foreground uppercase sm:text-[1.05rem]">
          {titulo}
        </span>

        {/* El disco gira 180° al abrir. Va en su propio elemento y no en el
            <svg> suelto para que el fondo y el giro sean la misma pieza. */}
        <span
          aria-hidden
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-vo-bone)_18%,transparent)] text-accent transition-transform duration-500 ease-out",
            abierto && "rotate-180",
          )}
        >
          <ChevronDown className="size-4" strokeWidth={2.2} />
        </span>
      </button>

      {/* `inert` mientras está cerrado, y no es un adorno: sin él el contenido
          recortado sigue siendo alcanzable con el tabulador y el foco se va a un
          párrafo que nadie ve. */}
      <div
        id={idPanel}
        className="vo-acordeon"
        data-abierto={abierto}
        {...(!abierto && { inert: "" as unknown as boolean })}
      >
        <div>
          <div className={cn(TEXTO, "px-6 pb-6 sm:px-8 sm:pb-8")}>
            {parrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrigenCards() {
  return (
    /* Una sola columna y centrada: es un RELATO y se lee de arriba abajo. En
       rejilla habría que decidir cuál se lee antes, y no hay respuesta buena. */
    <div className="mx-auto mt-12 flex max-w-[46rem] flex-col gap-5 sm:mt-14">
      {/* ══ 1 · EL PROBLEMA — siempre visible ══ */}
      <ScrollIn>
        <div className={cn(CARD, "p-6 sm:p-8")}>
          <div className={TEXTO}>
            {ORIGEN.problema.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </ScrollIn>

      {/* ══ 2 · LA BISAGRA ══

          La frase que da la vuelta al argumento. Invertida —fondo de acento y
          texto oscuro— porque en una columna de superficies oscuras, darle la
          vuelta a una es lo que la convierte en un alto en la lectura. */}
      <ScrollIn>
        <p className="rounded-2xl bg-accent px-6 py-7 text-center text-[1.15rem] leading-[1.55] font-medium text-balance text-[var(--color-vo-black)] sm:px-8 sm:text-[1.35rem]">
          {ORIGEN.giro}
        </p>
      </ScrollIn>

      {/* ══ 3 y 4 · LOS DOS TRAMOS PLEGADOS ══

          Los titulares no salen de content.ts: no son copy del cliente sino
          rótulos de navegación, y mezclarlos con su texto invitaría a
          reescribirlos como si lo fueran. */}
      <ScrollIn>
        <Tramo
          titulo="De dónde nace"
          icono={Compass}
          parrafos={ORIGEN.origen}
        />
      </ScrollIn>

      <ScrollIn>
        <Tramo
          titulo="Los 13 Códigos Originales"
          icono={Layers}
          parrafos={ORIGEN.sistema}
        />
      </ScrollIn>

      {/* ══ 5 · LAS CIFRAS Y LA PRUEBA ══

          Las cuatro cifras son lo único verificable del relato y dentro de un
          párrafo no las ve nadie. En fila se leen de un vistazo. */}
      <ScrollIn>
        <div className={cn(CARD, "p-6 sm:p-8")}>
          {/* aria-hidden: las cuatro están dichas en los párrafos de debajo, y
              un lector de pantalla las leería dos veces — la segunda sin
              contexto, como números sueltos. */}
          <ul
            aria-hidden
            className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4"
          >
            {ORIGEN.datos.map((d) => (
              /* Columna en flex: las cuatro cifras arrancan a la misma altura
                 aunque una etiqueta ocupe dos renglones —"Códigos Originales"
                 lo hace— en vez de centrarse cada una en su caja. */
              <li
                key={d.etiqueta}
                className="flex flex-col items-center text-center"
              >
                {/* tabular-nums para que compartan el ancho de dígito y queden
                    ópticamente alineadas. */}
                <p className="font-display text-[1.75rem] leading-none font-semibold text-accent tabular-nums sm:text-[2rem]">
                  {d.cifra}
                </p>
                <p className="mt-1.5 text-[0.72rem] leading-snug tracking-[0.08em] text-[color-mix(in_srgb,var(--color-vo-bone)_55%,transparent)] uppercase">
                  {d.etiqueta}
                </p>
              </li>
            ))}
          </ul>

          <hr className="my-6 border-0 border-t border-[color-mix(in_srgb,var(--color-vo-bone)_12%,transparent)]" />

          <div className={TEXTO}>
            {ORIGEN.prueba.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </ScrollIn>

      {/* ══ 6 · EL CIERRE ══

          Va sin card: es el remate, y una superficie más le quitaría el aire
          que necesita para leerse como final en vez de como un bloque más. */}
      <ScrollIn>
        <div className="mt-4 flex flex-col items-center gap-4 px-2 text-center">
          <span
            aria-hidden
            className="flex size-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] text-accent"
          >
            <Sparkles className="size-4" strokeWidth={1.8} />
          </span>
          <p className="font-display text-[1.1rem] leading-[1.6] text-balance text-accent sm:text-[1.3rem]">
            {ORIGEN.cierre}
          </p>
        </div>
      </ScrollIn>
    </div>
  );
}
