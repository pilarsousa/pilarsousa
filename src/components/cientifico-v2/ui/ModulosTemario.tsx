"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { TEMARIO } from "@/components/cientifico-v2/content";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { lenisActual } from "@/components/cientifico-v2/ui/ScrollSuave";

/*
  Los módulos del temario como paneles que se despliegan (.cv2-tema).

  Desktop: los tres en fila. El abierto se despliega ancho y muestra todo:
  el numeral romano crece en oro con su brillo, un campo de ondas sale de él
  y abajo aparecen el título y el texto. Los otros quedan angostos, con su
  numeral y su fase ("El porqué", "Lo que te ata"…), que alcanzan para leer
  el programa de un vistazo.

  Mobile: acordeón, uno abierto a la vez.

  Los abre el scroll: el bloque queda fijo en el medio de la pantalla
  (sticky) dentro de una "pista" más alta, y al bajar por la pista se abre
  el I, después el II y después el III; la barrita de abajo del abierto
  marca cuánto falta para el siguiente. Un clic en un módulo lleva el scroll
  hasta su tramo, así scroll y módulo abierto nunca se contradicen.

  Si el bloque no entra en la pantalla (celulares bajos, ventanas chicas),
  no se fija: queda como lista y se abre con un clic. Lo mismo sin JS.

  El contenido de los cerrados sigue en el HTML (sólo se oculta a la vista),
  así que se lee entero sin JS y con lector de pantalla.
*/

/** Scroll que lleva cada módulo, en altos de pantalla. */
const PASO = 0.45;

/** Cuánto crece el abierto frente a un cerrado (desktop). ⚠️ El ancho del texto
    (lg:w-[…0.63…]) sale de acá: 3,6 / 5,6 ≈ 0,64. */
const CRECE = 3.6;

function useAvanceConScroll(n: number, setActiva: (i: number) => void) {
  const pistaRef = useRef<HTMLDivElement>(null);
  const fijoRef = useRef<HTMLDivElement>(null);
  const [conScroll, setConScroll] = useState(false);
  const irA = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const pista = pistaRef.current;
    const fijo = fijoRef.current;
    const lista = fijo?.querySelector<HTMLElement>(".cv2-temas");
    if (!pista || !fijo || !lista) return;
    const escritorio = window.matchMedia("(min-width: 1024px)");
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activo = -1;
    let tope = 0;
    let recorrido = 0;
    let fijado = false;
    let cuadro = 0;

    /* El alto más grande que puede tener el bloque. Desktop: el de la fila,
       que es fijo. Mobile: el acordeón con el módulo de texto más largo
       abierto (cabeceras + huecos + ese contenido). */
    const altoMaximo = () => {
      if (escritorio.matches) return lista.offsetHeight;
      const items = Array.from(lista.children) as HTMLElement[];
      let cabeceras = 0;
      let contenido = 0;
      for (const li of items) {
        const caja = li.querySelector<HTMLElement>("[data-contenido]");
        if (!caja) continue;
        cabeceras += li.offsetHeight - (caja.parentElement?.offsetHeight ?? 0);
        contenido = Math.max(contenido, caja.scrollHeight);
      }
      return cabeceras + contenido + parseFloat(getComputedStyle(lista).rowGap || "0") * (items.length - 1);
    };

    const pintar = () => {
      cuadro = 0;
      if (!fijado) return;
      const p = Math.min(1, Math.max(0, (tope - pista.getBoundingClientRect().top) / recorrido));
      const i = Math.min(n - 1, Math.floor(p * n));
      lista.style.setProperty("--avance", (p * n - i).toFixed(3));
      if (i !== activo) {
        activo = i;
        setActiva(i);
      }
    };

    const medir = () => {
      const vh = window.innerHeight;
      const alto = altoMaximo();
      fijado = alto + 32 <= vh;
      setConScroll(fijado);
      if (!fijado) {
        pista.style.height = "";
        return;
      }
      tope = Math.max(16, (vh - alto) / 2);
      recorrido = n * PASO * vh;
      pista.style.height = `${alto + recorrido}px`;
      fijo.style.top = `${tope}px`;
      pintar();
    };

    irA.current = (i) => {
      const actual = tope - pista.getBoundingClientRect().top;
      const delta = ((i + 0.5) / n) * recorrido - actual;
      /* Con el scroll suave activo, lo mueve Lenis: un scrollBy nativo
         pelearía con su inercia. */
      const lenis = lenisActual();
      if (lenis) lenis.scrollTo(window.scrollY + delta, { duration: 1.4 });
      else window.scrollBy({ top: delta, behavior: sinMovimiento.matches ? "auto" : "smooth" });
    };

    const pedir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(pintar);
    };
    const primero = requestAnimationFrame(medir);
    document.fonts?.ready.then(medir);
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      cancelAnimationFrame(primero);
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", medir);
    };
  }, [n, setActiva]);

  return { pistaRef, fijoRef, conScroll, irA };
}

export function ModulosTemario({ modulos }: { modulos: (typeof TEMARIO)["modulos"] }) {
  const id = useId();
  const [activa, setActiva] = useState(0);
  const n = modulos.length;
  const { pistaRef, fijoRef, conScroll, irA } = useAvanceConScroll(n, setActiva);

  const elegir = (i: number) => {
    if (conScroll) irA.current(i);
    else setActiva(i);
  };

  return (
    <div ref={pistaRef}>
      <div ref={fijoRef} className={cn("relative isolate", conScroll && "sticky")}>
        {/* Luz detrás de los módulos: que la sección no se apague. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[-10%] inset-y-[-25%] -z-10 bg-[radial-gradient(ellipse_at_center,rgb(233_196_106/0.13),transparent_65%)]"
        />
        <Reveal>
          <ul className="cv2-temas flex flex-col gap-3 lg:h-[460px] lg:flex-row lg:gap-4">
            {modulos.map(({ numero, fase, titulo, texto }, i) => {
              const abierta = i === activa;
              const panel = `${id}-modulo-${i}`;
              return (
                <li
                  key={numero}
                  className={cn("cv2-tema relative overflow-hidden rounded-[20px] lg:min-w-0 lg:basis-0", abierta && "is-activa")}
                  style={{ flexGrow: abierta ? CRECE : 1 }}
                >
                  {/* El campo: ondas que salen del numeral del módulo abierto. */}
                  <span aria-hidden className="cv2-tema__campo">
                    {[0, 1.5, 3].map((retraso) => (
                      <span
                        key={retraso}
                        className="cv2-tema__onda"
                        style={{ "--retraso": `${retraso}s` } as React.CSSProperties}
                      />
                    ))}
                  </span>
      
                  {/* Desktop: el botón cubre el panel entero (se elige con un clic
                      en cualquier parte). Mobile: es la fila de arriba. */}
                  <button
                    type="button"
                    aria-expanded={abierta}
                    aria-controls={panel}
                    onClick={() => elegir(i)}
                    className="relative z-10 flex w-full items-center gap-4 px-5 py-5 text-left lg:absolute lg:inset-0 lg:flex-col lg:items-start lg:justify-start lg:gap-5 lg:p-8"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "cv2-tema__numeral cv2-grad-texto min-w-[3.5rem] font-display text-[2.75rem] font-bold leading-none lg:min-w-0",
                        abierta ? "cv2-brillo lg:text-[7rem]" : "lg:text-[5.5rem]",
                      )}
                    >
                      {numero}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-[0.7rem] font-bold uppercase tracking-[0.22em] text-foreground/60">
                        Módulo {numero}
                      </span>
                      <span className="text-base font-bold leading-snug text-(--cv2-oro-claro) sm:text-lg lg:text-base">
                        {fase}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "ml-auto size-5 shrink-0 text-(--cv2-oro) transition-transform duration-300 lg:hidden",
                        abierta && "rotate-180",
                      )}
                    />
                    {/* Desktop: que se note que el panel cerrado se abre. */}
                    <span
                      aria-hidden
                      className={cn(
                        "cv2-tema__abrir absolute bottom-8 left-8 hidden size-10 place-items-center rounded-full border border-[rgb(233_196_106/0.35)] text-(--cv2-oro) transition-opacity duration-300 lg:grid",
                        abierta && "opacity-0",
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
      
                  {/* Mobile: se abre en el lugar (filas de 0fr a 1fr). Desktop: abajo
                      del panel, con el ancho que va a tener el panel ya abierto, así
                      el texto no se reacomoda mientras se abre (el panel lo recorta
                      hasta entonces). Ese ancho: la columna (1140 o la pantalla
                      menos su padding) menos los dos huecos, por la parte que se
                      lleva el abierto (CRECE / (CRECE + 2), con margen por la barra
                      de scroll), menos el padding del panel. */}
                  <div
                    id={panel}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 lg:absolute lg:inset-x-8 lg:bottom-8 lg:block",
                      abierta ? "grid-rows-[1fr] lg:opacity-100 lg:delay-200" : "grid-rows-[0fr] lg:opacity-0 lg:duration-200",
                    )}
                  >
                    <div data-contenido className="min-h-0 overflow-hidden lg:overflow-visible">
                      <div className="px-5 pb-6 lg:w-[min(640px,calc((min(1140px,100vw-4rem)-2rem)*0.63-4rem))] lg:p-0">
                        <h3 className="text-xl font-bold leading-snug text-foreground sm:text-[1.6rem] lg:text-[1.75rem]">{titulo}</h3>
                        <p className="mt-3 text-lg leading-relaxed text-foreground/85 lg:text-[1.2rem]">{texto}</p>
                      </div>
                    </div>
                  </div>
      
                  {/* Cuánto scroll falta para el siguiente (--avance, del script). */}
                  {abierta && conScroll && <span aria-hidden className="cv2-tema__progreso" />}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
