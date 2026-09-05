"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";

/*
  ═══════════════════════════════════════════════════════════════════════════
  EL AVISO QUE SUBE DESDE ABAJO
  ═══════════════════════════════════════════════════════════════════════════

  Aparece al intentar reproducir el video: explica que el recurso llega después
  del diagnóstico y, pasados unos segundos, lleva al formulario y se va.

  ── POR QUÉ AQUÍ Y NO UN `alert` NI UN MODAL ──

  Un modal bloquea la página y obliga a cerrarlo: para decir una sola frase que
  además termina en una acción automática, es una puerta de más. Esto informa
  sin interrumpir, y el visitante puede seguir leyendo mientras está puesto.

  ── SE DESMONTA DE VERDAD, PERO DESPUÉS DE SALIR ──

  Quitarlo del árbol en cuanto se cierra se lo lleva de golpe, sin animación de
  salida: no hay nada que animar si el nodo ya no existe. Por eso hay dos
  estados —`saliendo` primero, desmontar después— encadenados por el evento
  `animationend`, que es lo que garantiza que el desmontaje ocurre cuando la
  animación termina DE VERDAD y no cuando un temporizador cree que debería.

  ── LOS DOS TEMPORIZADORES VIVEN EN REFS ──

  Uno cuenta hasta el salto y otro es la red del `animationend`. Guardados en
  refs se pueden cancelar al desmontar; en variables sueltas, un cierre rápido
  dejaría un `setState` apuntando a un árbol que ya no existe.
*/

/* Cuánto se queda el aviso antes de llevar al formulario.

   3 s es lo que tarda en leerse la frase con calma. Menos y el desplazamiento
   sorprende a media lectura; más y deja de sentirse como una consecuencia del
   clic. La barra de progreso cuenta exactamente este tiempo, así que el salto
   nunca llega sin avisar. */
const ESPERA_ANTES_DEL_SALTO = 3000;

/* Red por si `animationend` no llega — puede no dispararse si la pestaña pasa a
   segundo plano a mitad de la salida. Va por encima de la duración real de la
   animación de salida (320 ms) para no cortarla nunca. */
const RESPALDO_SALIDA = 600;

export function AvisoFlotante({
  texto,
  destino,
  alCerrar,
}: {
  texto: string;
  /* El id del elemento al que se salta, sin la almohadilla. */
  destino: string;
  alCerrar: () => void;
}) {
  const [saliendo, setSaliendo] = useState(false);
  const temporizadorSalto = useRef<number | null>(null);
  const temporizadorRespaldo = useRef<number | null>(null);

  useEffect(() => {
    temporizadorSalto.current = window.setTimeout(() => {
      /* EL SALTO Y LA SALIDA, A LA VEZ. El aviso se va mientras la página se
         desplaza: si esperara a terminar de bajar, se quedaría flotando sobre
         el formulario justo cuando hay que empezar a escribir en él. */
      document
        .getElementById(destino)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      setSaliendo(true);

      /* Si `animationend` no llegara, esto lo desmonta igual. */
      temporizadorRespaldo.current = window.setTimeout(
        alCerrar,
        RESPALDO_SALIDA,
      );
    }, ESPERA_ANTES_DEL_SALTO);

    return () => {
      if (temporizadorSalto.current !== null) {
        window.clearTimeout(temporizadorSalto.current);
      }
      if (temporizadorRespaldo.current !== null) {
        window.clearTimeout(temporizadorRespaldo.current);
      }
    };
  }, [destino, alCerrar]);

  return (
    /* ── EL CONTENEDOR NO INTERCEPTA EL RATÓN, LA TARJETA SÍ ──

       Ocupa todo el ancho de la ventana para centrar la tarjeta, y con
       `pointer-events-none` esa banda invisible no roba los clics de lo que
       tenga debajo. La tarjeta se los devuelve para sí misma.

       `role="status"` y no `alert`: un lector de pantalla lo anuncia cuando
       termina lo que esté diciendo, sin cortarle. Es información, no una
       emergencia. */
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div
        className="dg-aviso pointer-events-auto w-full max-w-md overflow-hidden rounded-2xl border border-[var(--dg-borde-vivo)] bg-[var(--dg-fondo-alto)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl"
        data-saliendo={saliendo}
        /* El desmontaje va atado al final de la animación de SALIDA. Se
           comprueba `saliendo` porque este mismo manejador se dispara también
           al terminar la de entrada. */
        onAnimationEnd={() => {
          if (saliendo) alCerrar();
        }}
      >
        <div className="flex items-start gap-3.5 p-4">
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--dg-acento)] text-[var(--dg-acento-oscuro)]"
          >
            <Lock className="size-4" strokeWidth={2} />
          </span>
          <p className="min-w-0 text-[0.9rem] leading-snug text-[var(--dg-texto)]">
            {texto}
          </p>
        </div>

        {/* LA BARRA DE CUENTA ATRÁS. Va abajo del todo, a ras del canto, y se
            vacía de izquierda a derecha en el mismo tiempo que espera el
            temporizador: el desplazamiento deja de ser una sorpresa y pasa a
            ser algo que se veía venir.

            La duración se pasa en línea porque tiene que ser EXACTAMENTE la
            misma constante que usa el setTimeout; escrita también en el CSS,
            las dos se desincronizarían al primer retoque.

            Se detiene al salir: la barra ya no cuenta nada mientras el aviso se
            va, y seguir animándola llama la atención sobre la esquina que está
            desapareciendo. */}
        <div aria-hidden className="h-1 w-full bg-[var(--dg-borde)]/50">
          <div
            className="dg-aviso-barra h-full bg-[linear-gradient(90deg,var(--dg-acento)_0%,var(--dg-acento-vivo)_100%)]"
            style={
              {
                animationDuration: `${ESPERA_ANTES_DEL_SALTO}ms`,
                animationPlayState: saliendo ? "paused" : "running",
              } as CSSProperties
            }
          />
        </div>
      </div>
    </div>
  );
}
