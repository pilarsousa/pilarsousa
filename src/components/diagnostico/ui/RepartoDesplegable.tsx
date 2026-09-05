"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { MedicionFrecuencias } from "@/components/diagnostico/ui/MedicionFrecuencias";
import type { Frecuencia } from "@/components/diagnostico/contenido";

/*
  ═══════════════════════════════════════════════════════════════════════════
  EL REPARTO, PLEGADO
  ═══════════════════════════════════════════════════════════════════════════

  Las cuatro barras dejan de estar a la vista y pasan a vivir detrás de un
  título con una flecha.

  ── POR QUÉ PLEGADO ──

  La página de resultado tiene una sola cosa que decir —tu frecuencia es X— y
  el reparto es el detalle: cuántas respuestas cayeron en cada una. Abierto,
  compite con el titular a dos palmos de él; plegado, se convierte en lo que
  es, algo que se consulta si se quiere.

  Y ojo con lo que NO se hace: el título del acordeón dice que ahí dentro hay
  el reparto de las 7 respuestas. Un desplegable que no cuenta qué esconde no
  se abre nunca.

  ── LO IMPORTANTE: LAS BARRAS SE VUELVEN A LLENAR CADA VEZ ──

  El contenido se monta y se desmonta con la `key`, que cambia en cada
  apertura. Sin eso, la animación de llenado —que es lo que convierte cuatro
  cifras en una medición— sólo se vería la primera vez: en la segunda el
  navegador encuentra los mismos nodos con la animación ya consumida y no la
  reinicia.

  ⚠️ Y NO SE PUEDE DESMONTAR AL CERRAR. El contenido tiene que seguir en el
  árbol mientras el panel se cierra, o el deslizamiento no tiene nada que
  recortar y la caja colapsa de golpe. Por eso lo que hay es un contador que
  sube al abrir, no un `{abierto && …}`.

  ── EL DESLIZAMIENTO ES CSS, NO JS ──

  Ver .dg-acordeon en diagnostico.css: se anima `grid-template-rows` de 0fr a 1fr,
  que es la única forma de interpolar hacia una altura que no se conoce. Aquí
  sólo se conmuta el atributo.
*/
export function RepartoDesplegable({
  porcentajes,
  dominante,
  titulo,
  className,
}: {
  porcentajes: Record<string, number>;
  dominante: Frecuencia;
  titulo: string;
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  /* Sube en cada apertura y sirve de `key` del contenido: es lo que reinicia el
     llenado de las barras. Ver la nota de arriba. */
  const [aperturas, setAperturas] = useState(0);
  /* useId y no una cadena fija: si algún día hay dos repartos en la misma
     pantalla, dos `aria-controls` iguales apuntarían al mismo panel. */
  const idPanel = useId();

  return (
    <section
      className={cn(
        "dg-claro dg-relieve-claro overflow-hidden rounded-3xl",
        className,
      )}
    >
      {/* EL BOTÓN ES LA CABECERA ENTERA y no sólo la flecha: una zona de toque
          de 44 px de alto que cruza la tarjeta es lo que hace que esto se pueda
          usar con el pulgar. Una flecha de 20 px en una esquina, no.

          `aria-expanded` es lo que convierte esto en un desplegable para un
          lector de pantalla; sin él es un botón que no dice qué hace. */}
      <button
        type="button"
        onClick={() => {
          if (!abierto) setAperturas((n) => n + 1);
          setAbierto((v) => !v);
        }}
        aria-expanded={abierto}
        aria-controls={idPanel}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-[var(--dg-superficie)] sm:px-6 sm:py-5"
      >
        <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-[var(--dg-texto-suave)] uppercase">
          {titulo}
        </span>

        {/* El disco gira 180° al abrir. Va en su propio elemento y no en el
            <svg> suelto para que el fondo y el giro sean la misma pieza. */}
        <span
          aria-hidden
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--dg-borde)] bg-[var(--dg-superficie)] text-[var(--dg-acento)] transition-transform duration-500 ease-out",
            abierto && "rotate-180",
          )}
        >
          <ChevronDown className="size-4" strokeWidth={2.2} />
        </span>
      </button>

      {/* EL PANEL. `role="region"` con su nombre tomado del botón: al abrirlo,
          un lector de pantalla puede saltar aquí y sabe a qué ha llegado.

          `inert` mientras está cerrado, y esto no es un adorno: sin él, el
          contenido recortado sigue siendo alcanzable con el tabulador y el foco
          se va a una barra que nadie ve. */}
      <div
        id={idPanel}
        className="dg-acordeon"
        data-abierto={abierto}
        /* React 19 ya pasa `inert` como booleano; en versiones anteriores hay
           que darle una cadena. Se escribe así para que valga en las dos. */
        {...(!abierto && { inert: "" as unknown as boolean })}
      >
        <div>
          <div className="dg-acordeon-cuerpo px-5 pb-6 sm:px-6">
            <MedicionFrecuencias
              key={aperturas}
              porcentajes={porcentajes}
              dominante={dominante}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
