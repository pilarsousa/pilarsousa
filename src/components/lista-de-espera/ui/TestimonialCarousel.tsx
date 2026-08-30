"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Quote } from "lucide-react";
import { StarTiles } from "@/components/lista-de-espera/ui/StarTiles";
import type { Testimonial } from "@/components/mision-origen/ui/testimonials";

const SPEED = 45;

type TestimonialCarouselProps = {
  items: Testimonial[];
};

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState<Testimonial | null>(null);
  const sinMovimiento = useReducedMotion();

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = performance.now();
    let onScreen = true;
    let carry = 0;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
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

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        last = performance.now();
      },
      { threshold: 0 },
    );
    io.observe(el);

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
      <div
        ref={scrollerRef}
        data-lenis-prevent
        onPointerDown={() => (pausedRef.current = true)}
        onFocusCapture={() => (pausedRef.current = true)}
        onBlurCapture={() => (pausedRef.current = false)}
        className="overflow-x-auto overscroll-x-contain scrollbar-none py-6 mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:py-8 sm:mask-[linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
      >
        <ul className="flex w-max">
          {[...items, ...items].map((t, i) => {
            const isClone = i >= items.length;
            return (
              <li
                key={`${t.name}-${i}`}
                aria-hidden={isClone || undefined}
                className="mr-4 flex h-[18.5rem] w-[62vw] max-w-[340px] shrink-0 flex-col sm:mr-8 sm:h-[21rem] sm:w-[74vw] rounded-xl border border-accent/25 bg-[radial-gradient(90%_70%_at_20%_0%,rgba(180,226,54,0.12),transparent_60%),linear-gradient(180deg,#1a2b07,#0b1502)] p-5 text-left shadow-[0_18px_46px_-26px_rgba(180,226,54,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] sm:mr-10 sm:w-[305px]"
              >
                <div className="flex items-center gap-3">
                  <Avatar t={t} size={42} />
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    {t.date && (
                      <p className="font-sans text-xs text-foreground/50">
                        {t.date}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <StarTiles value={t.stars} size={16} />
                </div>

                <div className="relative mt-3 min-h-0 flex-1 overflow-hidden">
                  <p className="font-sans text-sm leading-relaxed text-foreground/85">
                    {t.text}
                  </p>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-vo-black to-transparent" />
                </div>

                {/* ── VER MÁS ──

                    ERA TEXTO SUELTO con un + pegado delante, sin caja ni
                    alineación: el icono y el rótulo quedaban uno encima del otro
                    porque un <button> es `inline-block` y sus hijos fluyen como
                    texto — el + caía en su propia línea. De ahí que se viera roto.

                    Ahora es una PÍLDORA con el signo en su propio disco. Sigue
                    siendo discreta a propósito: es una acción secundaria dentro
                    de una card, y compitiendo con el CTA de la sección estorbaría.

                    El disco del + gira 90° al pasar el ratón. No es un adorno: el
                    mismo signo del acordeón de preguntas frecuentes hace el mismo
                    gesto, así que el visitante ya sabe qué significa —se despliega
                    algo— antes de pulsarlo. */}
                <button
                  type="button"
                  onClick={() => setActive(t)}
                  tabIndex={isClone ? -1 : undefined}
                  className="group/vermas mt-3 inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/8 py-1.5 pr-3.5 pl-1.5 font-sans text-xs font-semibold tracking-wide text-accent uppercase transition-[background-color,border-color,color,box-shadow] duration-300 hover:border-accent/70 hover:bg-accent/15 hover:text-vo-bone hover:shadow-[0_0_18px_-6px_rgba(180,226,54,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span
                    aria-hidden
                    className="flex size-5 items-center justify-center rounded-full bg-accent/20 text-accent transition-[transform,background-color] duration-300 group-hover/vermas:rotate-90 group-hover/vermas:bg-accent group-hover/vermas:text-vo-black"
                  >
                    <Plus size={12} strokeWidth={3} />
                  </span>
                  Ver más
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── EL DIÁLOGO DE LA RESEÑA ──

          ES DE CRISTAL, no un panel opaco. Detrás hay una landing con banners,
          lluvia de código y halos verdes: un rectángulo sólido la tapa y el
          diálogo parece pegado encima, mientras que un panel translúcido deja
          adivinar lo que hay debajo y se lee como una capa POR ENCIMA de la
          página, que es lo que es.

          EL CRISTAL SON TRES COSAS A LA VEZ, y quitar cualquiera lo deshace:
          · backdrop-blur, que desenfoca lo que se ve a través
          · un fondo apenas teñido —blanco al 6%— que da cuerpo al vidrio
          · un filete claro arriba y otro oscuro abajo, que es lo que simula el
            canto de una lámina y la separa del fondo

          Sin el filete el panel flota sin bordes; sin el tinte el desenfoque
          parece un fallo de renderizado.

          EL FONDO NO PUEDE SER MUY OSCURO NI MUY OPACO o el desenfoque no se
          aprecia y volvemos al panel sólido. black/50 con blur medio deja ver el
          movimiento de la lluvia de código detrás sin restarle legibilidad al
          texto.

          ── LA ENTRADA Y LA SALIDA ──

          AnimatePresence es lo que permite animar el CIERRE. Sin él, React
          desmonta el nodo en cuanto `active` pasa a null y la salida no existe:
          el diálogo desaparece de golpe. AnimatePresence lo retiene montado
          mientras dura su animación de salida y luego lo quita.

          El panel entra subiendo un pelo y creciendo desde 0,96, y sale por el
          mismo camino pero más rápido —0,2s contra 0,32—: cerrar tiene que
          sentirse resuelto, no lento. El velo va por separado y con su propio
          ritmo para que el fondo termine de aclararse después de que el panel se
          haya ido.

          Con prefers-reduced-motion no se anima nada: aparece y desaparece. */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Reseña de ${active.name}`}
            className="fixed inset-0 z-200 flex items-center justify-center p-4"
            initial={sinMovimiento ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={sinMovimiento ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setActive(null)}
              className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-md"
            />

            <motion.div
              className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/6 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.9),0_0_60px_-24px_rgba(180,226,54,0.55),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150"
              initial={
                sinMovimiento ? false : { opacity: 0, scale: 0.96, y: 14 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              /* La transición de SALIDA viaja dentro del propio `exit` y no en
                 el `transition` de al lado: ahí sólo se declara la de entrada, y
                 cerrar tiene que sentirse más resuelto que abrir —0,2s contra
                 0,32— o el diálogo parece que se resiste a irse. */
              exit={
                sinMovimiento
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.97,
                      y: 8,
                      transition: { duration: 0.2, ease: "easeIn" },
                    }
              }
              transition={{
                duration: sinMovimiento ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* El resplandor verde del ángulo superior. Ata el cristal a la
                  paleta de la landing: sin él, un panel translúcido y neutro
                  podría ser el de cualquier sitio. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_12%_0%,rgba(180,226,54,0.22),transparent_58%)]"
              />

              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Cerrar"
                className="absolute top-4 right-4 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-foreground/80 backdrop-blur-sm transition-[background-color,border-color,color,transform] duration-300 hover:rotate-90 hover:border-accent/60 hover:bg-accent/20 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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

              {/* data-lenis-prevent: sin esto Lenis se queda con la rueda del
                  ratón y el cuerpo del diálogo no scrollea. */}
              <div
                data-lenis-prevent
                className="relative overflow-y-auto p-8 sm:p-9"
              >
                <div className="flex items-center gap-3.5">
                  <Avatar t={active} size={52} />
                  <div className="min-w-0">
                    <p className="font-sans font-semibold text-white">
                      {active.name}
                    </p>
                    {active.date && (
                      <p className="font-sans text-xs text-white/55">
                        {active.date}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <StarTiles value={active.stars} size={20} />
                </div>

                {/* La comilla marca dónde empieza la voz de otra persona. Va
                    detrás del texto y muy diluida: es una marca de agua, y si
                    compite con la letra estorba justo a lo que acompaña. */}
                <div className="relative mt-6">
                  <Quote
                    aria-hidden
                    className="pointer-events-none absolute -top-3 -left-1 size-10 text-accent/15"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                  {/* EL TEXTO VA EN BLANCO PLENO. Estaba al 85% de opacidad, y
                      sobre un fondo de cristal —que ya deja pasar luz de detrás—
                      cualquier transparencia en la letra le come el contraste. */}
                  <p className="relative font-sans text-base leading-relaxed whitespace-pre-line text-white sm:text-lg">
                    {active.text}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
