"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StarTiles } from "@/components/volver-al-origen/ui/StarTiles";
import type { Testimonial } from "@/components/mision-origen/ui/testimonials";

/*
  Cinta de reseñas en movimiento continuo, arrastrable.

  Por qué no es una animación CSS: una animación no se puede "agarrar". Para que
  el visitante mueva la cinta con el dedo hace falta que lo que se desplace sea
  el scroll real del contenedor, así que el movimiento automático se hace
  empujando scrollLeft en cada frame. A cambio se obtiene gratis el arrastre
  táctil nativo, con su inercia y su rebote, que es justo lo que se pedía.

  El bucle sin costura: la lista se renderiza DOS veces, y en cuanto el scroll
  pasa de la mitad del ancho se le resta esa mitad. Como la segunda copia es
  idéntica a la primera, el reinicio es invisible. La resta se aplica también
  mientras está en pausa, para que arrastrando a mano también dé la vuelta.

  Pausa: SÓLO al mantener pulsado (dedo o ratón) y al enfocar con el teclado.
  Pasar el ratón por encima no la detiene — es deliberado, no un olvido: no
  añadir aquí un onMouseEnter/onMouseLeave.

  Eso tiene un coste que conviene tener presente: el botón "Ver más" es un
  objetivo en movimiento para quien use ratón. Sigue siendo alcanzable porque
  pulsar para hacer clic ya frena la cinta, pero exige más puntería.
*/

/** Velocidad del desplazamiento automático, en píxeles por segundo. */
const SPEED = 45;

type TestimonialCarouselProps = {
  items: Testimonial[];
};

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  /* En ref y no en estado: cambia con cada pulsación y no debe provocar
     re-render — el bucle de animación lo lee directamente. */
  const pausedRef = useRef(false);
  const [active, setActive] = useState<Testimonial | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    /* Quien pida menos movimiento no recibe desplazamiento automático. La cinta
       sigue existiendo y se puede recorrer a mano. */
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = performance.now();
    let onScreen = true;
    /* Sobrante sub-píxel acumulado entre frames.

       Hace falta porque a 45 px/s cada frame avanza ~0,7 px, y hay navegadores
       que redondean scrollLeft a enteros: al leerlo de vuelta daría 0 y la
       cinta no arrancaría nunca. Acumulando aquí y aplicando sólo píxeles
       enteros, el avance es correcto redondee el navegador o no. */
    let carry = 0;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      /* dt acotado: si la pestaña estuvo en segundo plano, el primer frame al
         volver traería un delta enorme y la cinta pegaría un salto. */
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;

      if (still || pausedRef.current || !onScreen) {
        carry = 0;
        return;
      }

      carry += SPEED * dt;
      const whole = Math.floor(carry);
      if (whole > 0) {
        el.scrollLeft += whole;
        carry -= whole;
      }
    };
    raf = requestAnimationFrame(step);

    /* Fuera de pantalla no se mueve: no tiene sentido gastar frames animando
       algo que nadie ve. */
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        last = performance.now();
      },
      { threshold: 0 },
    );
    io.observe(el);

    /* El "soltar" se escucha en window y no en el elemento: si el dedo o el
       ratón se levantan fuera de la cinta, sin esto se quedaría pausada para
       siempre. */
    const release = () => {
      pausedRef.current = false;
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, []);

  /* Cierra con Escape y bloquea el scroll del fondo mientras el modal está
     abierto. */
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <div className="relative w-full">
      {/* py-12: el contenedor de scroll recorta también en vertical, y ahí no
          hay degradado que suavice el corte. Las cards proyectan un resplandor
          de unos 30 px, así que sin este colchón el halo se cortaría en seco
          contra el borde.

          El fundido lateral llega al 14%: por debajo de eso la card parece
          cortada con tijera en lugar de desvanecerse.

          overscroll-x-contain: evita que al llegar al extremo el gesto se
          propague y el navegador interprete un "atrás". */}
      <div
        ref={scrollerRef}
        /* data-lenis-prevent: el scroll suave de la página captura la rueda de
           forma global, y sin esta marca se quedaría también con el gesto
           horizontal aquí dentro — la cinta dejaría de poder recorrerse con el
           trackpad. */
        data-lenis-prevent
        onPointerDown={() => (pausedRef.current = true)}
        onFocusCapture={() => (pausedRef.current = true)}
        onBlurCapture={() => (pausedRef.current = false)}
        /* El fundido lateral es del 6% en móvil y del 14% a partir de sm. El
           porcentaje se mide sobre el ancho del contenedor: en escritorio son
           unos 90 px, pero en un móvil de 380 px serían 53 px comiéndose media
           card. Al ser la pista mucho más estrecha, un fundido corto ya se lee
           como transición. */
        className="overflow-x-auto overscroll-x-contain scrollbar-none py-10 mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:py-12 sm:mask-[linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
      >
        {/* Sin `gap`: la separación va como margen derecho de cada card.

            No es capricho. El bucle resta exactamente la mitad del ancho, y eso
            sólo cuadra si las dos mitades miden lo mismo. Con `gap` hay 2N-1
            huecos para 2N cards —falta el que iría al final de la primera
            mitad— así que la mitad se queda corta por medio hueco y el reinicio
            da un salto. Con margen derecho cada card aporta ancho + separación
            siempre, y las dos mitades son idénticas. */}
        <ul className="flex w-max">
          {[...items, ...items].map((t, i) => {
            const isClone = i >= items.length;
            return (
              <li
                key={`${t.name}-${i}`}
                aria-hidden={isClone || undefined}
                className="mr-16 flex h-[23rem] w-[82vw] max-w-[380px] shrink-0 flex-col rounded-2xl border border-accent/25 bg-[radial-gradient(90%_70%_at_20%_0%,rgba(180,226,54,0.12),transparent_60%),linear-gradient(180deg,#1a2b07,#0b1502)] p-7 text-left shadow-[0_24px_60px_-30px_rgba(180,226,54,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] sm:w-[380px]"
              >
                <div className="flex items-center gap-3">
                  <Avatar t={t} size={50} />
                  <div className="min-w-0">
                    <p className="truncate font-sans text-base font-medium text-foreground">
                      {t.name}
                    </p>
                    {t.date && (
                      <p className="font-sans text-sm text-foreground/50">
                        {t.date}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <StarTiles value={t.stars} size={20} />
                </div>

                <div className="relative mt-3 min-h-0 flex-1 overflow-hidden">
                  <p className="font-sans text-base leading-relaxed text-foreground/85">
                    {t.text}
                  </p>
                  {/* Desvanecido del texto sobrante, opaco porque el pie de la
                      card es #0b1502 sólido. */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-vo-black to-transparent" />
                </div>

                <button
                  type="button"
                  onClick={() => setActive(t)}
                  /* El clon queda fuera del recorrido de tabulación: si no, se
                     tabularía dos veces por la misma reseña. */
                  tabIndex={isClone ? -1 : undefined}
                  className="mt-3 self-start font-sans text-base font-medium text-accent transition-colors duration-300 hover:text-vo-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Ver más
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Modal con la reseña completa */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Reseña de ${active.name}`}
          className="fixed inset-0 z-200 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setActive(null)}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
          />
          <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-accent/25 bg-surface shadow-[0_0_50px_-10px_rgba(180,226,54,0.35)]">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full border border-accent/40 bg-black/60 text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden
                className="size-4"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Mismo motivo que en la cinta: una reseña larga necesita poder
                recorrerse dentro del modal. */}
            <div data-lenis-prevent className="overflow-y-auto p-8">
              <div className="flex items-center gap-3">
                <Avatar t={active} size={52} />
                <div className="min-w-0">
                  <p className="font-sans font-medium text-foreground">
                    {active.name}
                  </p>
                  {active.date && (
                    <p className="font-sans text-xs text-foreground/45">
                      {active.date}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <StarTiles value={active.stars} size={20} />
              </div>
              <p className="mt-5 whitespace-pre-line font-sans text-base leading-relaxed text-foreground/85 sm:text-lg">
                {active.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Foto de perfil, o la inicial del nombre sobre un disco verde. */
function Avatar({ t, size = 44 }: { t: Testimonial; size?: number }) {
  if (t.photo) {
    return (
      <Image
        src={t.photo}
        alt={t.name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5c8a1f,#b4e236)] font-display font-semibold text-vo-black"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {t.name.charAt(0).toUpperCase()}
    </span>
  );
}
