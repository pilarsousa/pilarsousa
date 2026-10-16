"use client";

import { Fragment, useEffect, useRef } from "react";
import { Activity, Atom, Waypoints } from "lucide-react";
import { cn } from "@/lib/cn";
import type { REVELACION } from "@/components/cientifico-v2/content";
import { RedNeuronal } from "@/components/cientifico-v2/ui/RedNeuronal";
import { DiagramaCircuito, DiagramaQuimica, DiagramaSistema } from "@/components/cientifico-v2/ui/DiagramasRevelacion";

/*
  "La revelación" en láminas de vidrio que se apilan con el scroll.

  Cada punto es una lámina (vidrio esmerilado, ver .cv2-lamina) con su
  diagrama: la química, el circuito, el sistema nervioso. Las láminas son
  sticky dentro de la misma columna: cada una se queda arriba y la siguiente
  sube y se le apoya encima, unos píxeles más abajo, como hojas de un
  apunte. A través del vidrio se ve, desenfocada, la anterior y, detrás de
  todas, la red neuronal (ui/RedNeuronal.tsx).

  Lo que hace el script (sin él, las láminas se apilan igual, sólo que sin
  achicarse):
  - --cubierta (0 → 1) en cada lámina mientras la siguiente sube a taparla:
    la de abajo se achica un poco y se oscurece (.cv2-lamina__velo).
  - Iguala el alto de las láminas al de la más alta: si no, la de abajo
    asomaría por debajo de una más corta.
  - Desktop: enciende en el índice de la columna izquierda la lámina que
    está arriba.
  - Si una lámina no entra entera en la pantalla (celulares bajos, ventanas
    chicas), una sticky nunca mostraría su final: la raíz pasa a .is-suelta
    y las láminas van una debajo de la otra, sin apilarse.

  La posición "natural" de cada lámina se mide en una marca vacía que va
  justo antes (data-marca): la lámina, al ser sticky, deja de moverse y no
  sirve para medir.
*/

const PLANOS = [
  { Diagrama: DiagramaQuimica, Icono: Atom },
  { Diagrama: DiagramaCircuito, Icono: Waypoints },
  { Diagrama: DiagramaSistema, Icono: Activity },
];

const dos = (n: number) => String(n).padStart(2, "0");

function useApilado() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;
    const laminas = Array.from(raiz.querySelectorAll<HTMLElement>(".cv2-lamina"));
    const marcas = Array.from(raiz.querySelectorAll<HTMLElement>("[data-marca]"));
    const indice = Array.from(raiz.querySelectorAll<HTMLElement>("[data-indice]"));
    const n = laminas.length;
    let pegados: number[] = [];
    let suelta = false;
    let cuadro = 0;

    const igualar = () => {
      /* Se mide apilada: suelta, el top vale 0. Todo pasa en el mismo cuadro,
         así que el cambio de clase no llega a pintarse. */
      raiz.classList.remove("is-suelta");
      laminas.forEach((l) => (l.style.minHeight = ""));
      const alto = Math.max(...laminas.map((l) => l.offsetHeight));
      laminas.forEach((l) => (l.style.minHeight = `${alto}px`));
      /* El `top` sticky de cada lámina, ya resuelto en píxeles. */
      pegados = laminas.map((l) => parseFloat(getComputedStyle(l).top) || 0);
      suelta = Math.max(...pegados) + alto > window.innerHeight;
      raiz.classList.toggle("is-suelta", suelta);
    };

    /* 0 cuando la lámina i asoma por abajo de la pantalla, 1 cuando llega a
       su lugar en la pila. */
    const llegada = (i: number) => {
      const vh = window.innerHeight;
      const top = marcas[i].getBoundingClientRect().top;
      return Math.min(1, Math.max(0, (vh - top) / Math.max(1, vh - pegados[i])));
    };

    const pintar = () => {
      cuadro = 0;
      let activa = 0;
      for (let i = 0; i < n; i++) {
        const cubierta = !suelta && i + 1 < n ? llegada(i + 1) : 0;
        laminas[i].style.setProperty("--cubierta", cubierta.toFixed(3));
        if (i > 0 && llegada(i) >= 0.55) activa = i;
      }
      indice.forEach((el, i) => el.classList.toggle("is-activa", i === activa));
    };

    const pedir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(pintar);
    };
    const reacomodar = () => {
      igualar();
      pedir();
    };

    igualar();
    pintar();
    /* Con la tipografía definitiva cambian los altos. */
    document.fonts?.ready.then(reacomodar);
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", reacomodar);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", reacomodar);
    };
  }, []);

  return ref;
}

/**
 * Desktop: el encabezado y el índice quedan fijos a la izquierda mientras
 * las láminas se apilan a la derecha. Mobile: encabezado arriba y la pila
 * debajo, a todo el ancho; el índice no va (la pila ya dice en cuál estás).
 */
export function LaminasRevelacion({
  cabecera,
  puntos,
}: {
  cabecera: React.ReactNode;
  puntos: (typeof REVELACION)["puntos"];
}) {
  const ref = useApilado();
  const n = puntos.length;

  return (
    <div ref={ref} className="group lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        {cabecera}
        <ol aria-hidden className="mt-10 hidden lg:block">
          {puntos.map(({ etiqueta }, i) => (
            <li
              key={etiqueta}
              data-indice
              className={cn("cv2-indice flex items-center gap-4 py-2.5", i === 0 && "is-activa")}
            >
              <span className="cv2-indice__linea" />
              <span className="font-display text-sm font-bold tracking-[0.1em]">{dos(i + 1)}</span>
              <span className="text-lg font-semibold">{etiqueta}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative isolate mt-12 pb-[10vh] lg:mt-0">
        {/* Detrás del vidrio: halos de color y la red neuronal. En mobile va
            de borde a borde de la pantalla; en desktop es una columna, así
            que se ensancha y se funde también a los costados (ver
            .cv2-laminas__fondo). */}
        <div
          aria-hidden
          className="cv2-laminas__fondo absolute -inset-x-5 -inset-y-12 -z-10 overflow-hidden sm:-inset-x-8 lg:-inset-x-36"
        >
          <div className="absolute top-[4%] left-[-25%] aspect-square w-[85%] rounded-full bg-[radial-gradient(circle,rgb(233_196_106/0.22),transparent_62%)]" />
          <div className="absolute top-[36%] right-[-30%] aspect-square w-[90%] rounded-full bg-[radial-gradient(circle,rgb(76_150_115/0.32),transparent_62%)]" />
          <div className="absolute bottom-[3%] left-[-10%] aspect-square w-[80%] rounded-full bg-[radial-gradient(circle,rgb(240_138_75/0.16),transparent_62%)]" />
          <RedNeuronal className="absolute inset-0 size-full" />
        </div>

        {puntos.map(({ etiqueta, titulo, texto }, i) => {
          const { Diagrama, Icono } = PLANOS[i];
          return (
            <Fragment key={titulo}>
              <div data-marca aria-hidden />
              <article
                className={cn(
                  "cv2-lamina sticky top-[calc(1rem+var(--i)*14px)] p-5 group-[.is-suelta]:relative group-[.is-suelta]:top-0 sm:p-7 lg:top-[calc(8rem+var(--i)*1.5rem)] lg:group-[.is-suelta]:top-0",
                  i < n - 1 && "group-[.is-suelta]:mb-5",
                )}
                style={{ "--i": i } as React.CSSProperties}
              >
                <div aria-hidden className="cv2-lamina__velo" />

                <header className="relative flex items-center gap-3">
                  <span aria-hidden className="cv2-titulo text-[2rem] font-bold leading-none">
                    {dos(i + 1)}
                  </span>
                  <span aria-hidden className="h-6 w-px bg-(--cv2-oro)/40" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-(--cv2-oro-claro)">{etiqueta}</span>
                  <span
                    aria-hidden
                    className="ml-auto grid size-9 place-items-center rounded-full border border-[rgb(243_238_220/0.14)] bg-[rgb(243_238_220/0.06)]"
                  >
                    <Icono className="size-4 text-(--cv2-oro)" />
                  </span>
                </header>

                <div className="cv2-lamina__diagrama relative mt-5 h-[150px] p-3 lg:h-[190px]">
                  <Diagrama />
                </div>

                <h3 className="relative mt-6 text-xl font-bold leading-snug text-foreground sm:text-[1.5rem]">{titulo}</h3>
                <p className="relative mt-3 text-lg leading-relaxed text-(--cv2-gris)">{texto}</p>
              </article>
              {/* El recorrido hasta que sube la siguiente. Va aparte y no
                  como margen de la lámina: una sticky se suelta cuando su
                  caja con margen toca el fondo de la columna, y con margen
                  se soltaban antes que la última y asomaban por arriba. */}
              {i < n - 1 && <div aria-hidden className="h-[28vh] group-[.is-suelta]:hidden" />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
