import { cn } from "@/lib/cn";
import { Contenedor } from "@/components/neurometafisica-v1/ui/Contenedor";
import { Encabezado } from "@/components/neurometafisica-v1/ui/Encabezado";
import { Destacado } from "@/components/neurometafisica-v1/ui/Destacado";
import { Anotacion } from "@/components/neurometafisica-v1/ui/Anotacion";
import { Reveal } from "@/components/neurometafisica-v1/ui/Reveal";
import { TE_SUENA } from "@/components/neurometafisica-v1/content";

/* Desktop: tres arriba y dos abajo, centradas (grilla de 6 columnas). */
const SPANS = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

/**
 * Bloque 2 · ¿Te suena? Que se reconozca: frases de los alumnos del Bootcamp
 * en tarjetas con la barrita dorada que se redibuja en cascada, y el cierre
 * con su primera frase encerrada en un círculo de tiza a mano.
 */
export function TeSuena() {
  return (
    <section aria-labelledby="te-suena-titulo" className="relative py-20 sm:py-28">
      <Contenedor>
        <Encabezado id="te-suena-titulo" antetitulo={TE_SUENA.antetitulo} titulo={TE_SUENA.titulo} centrado />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {TE_SUENA.items.map((texto, i) => (
            <li key={texto} className={cn(SPANS[i], i === 4 && "sm:col-span-2 lg:col-span-3")}>
              <Reveal delay={0.06 * i} className="h-full">
                <div className="cv2-card relative h-full rounded-[8px] px-6 pb-6 pt-7 text-lg leading-[1.5] text-foreground">
                  <span
                    aria-hidden
                    className="cv2-barrita cv2-barrita--viva"
                    style={{ "--retraso": `${i * 0.45}s` } as React.CSSProperties}
                  />
                  <Destacado texto={texto} />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mx-auto mt-14 max-w-[820px] text-center">
          {/* Mobile en vw: "No es falta de fuerza de voluntad." entra en un
              solo renglón desde 320px, con el círculo alrededor. */}
          <div className="text-[clamp(0.95rem,4.7vw,1.375rem)] font-semibold leading-snug text-foreground sm:text-[1.75rem]">
            <span className="relative inline-block whitespace-nowrap">
              {TE_SUENA.cierreMarcado}
              {/* Círculo de tiza a mano alrededor de la primera frase. No es
                  una elipse: con una frase larga y baja, la elipse corta las
                  puntas del texto. Es un óvalo de lados casi rectos y puntas
                  redondas que arranca arriba, da la vuelta hacia la izquierda
                  y se pasa un poco del comienzo, como hecho a mano.
                  Sin non-scaling-stroke: con él, Chrome mide el trazo en
                  pantalla y, si el SVG se estira más que su viewBox, el
                  dibujo queda a medias. Por eso el viewBox tiene casi la
                  proporción de la frase (≈6,5:1): se escala parejo y el
                  grosor no se deforma. */}
              <Anotacion className="pointer-events-none absolute -inset-x-4 -inset-y-3 sm:-inset-x-7 sm:-inset-y-4" umbral={0.8}>
                <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
                  <path
                    pathLength={1}
                    className="cv2-trazo cv2-trazo--brillo [--dur:1.1s] [--retraso:0.3s]"
                    stroke="#f3eedc"
                    strokeWidth={3}
                    d="M273 4.5 C200 1.5 93 2.3 40 5.3 C11 7.5 0 20 2.7 31 C5.3 44 21 55 53 56 C133 59 280 58.5 357 55 C389 52.5 399 42 397 30 C396 16.5 381 7.5 349 5.3 C320 3 267 3.8 224 7.5"
                  />
                </svg>
              </Anotacion>
            </span>
            <span className="mt-5 block text-balance sm:mt-6">
              <Destacado texto={TE_SUENA.cierreResto} />
            </span>
          </div>
        </Reveal>
      </Contenedor>
    </section>
  );
}
