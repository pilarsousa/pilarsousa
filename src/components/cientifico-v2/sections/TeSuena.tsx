import { cn } from "@/lib/cn";
import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { Encabezado } from "@/components/cientifico-v2/ui/Encabezado";
import { Destacado } from "@/components/cientifico-v2/ui/Destacado";
import { Anotacion } from "@/components/cientifico-v2/ui/Anotacion";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { TE_SUENA } from "@/components/cientifico-v2/content";

/* Desktop: tres arriba y dos abajo, centradas (grilla de 6 columnas). */
const SPANS = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

/**
 * Bloque 2 · ¿Te suena? Que se reconozca: frases de los alumnos del Bootcamp
 * en tarjetas con la barrita dorada que se redibuja en cascada, y el cierre
 * subrayado a mano con tiza.
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
          <p className="text-balance text-[1.375rem] font-semibold leading-snug text-foreground sm:text-[1.75rem]">
            <Destacado texto={TE_SUENA.cierre} />
          </p>
          {/* Subrayado de tiza bajo el cierre. */}
          <Anotacion className="mx-auto mt-3 h-4 w-[min(80%,520px)]" umbral={0.9}>
            <svg viewBox="0 0 400 16" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
              <path
                pathLength={1}
                className="cv2-trazo cv2-trazo--brillo [--dur:1s]"
                stroke="#f3eedc"
                strokeWidth={2.5}
                vectorEffect="non-scaling-stroke"
                d="M4 10 C80 4 170 12 250 7 C320 3 370 9 396 6"
              />
            </svg>
          </Anotacion>
        </Reveal>
      </Contenedor>
    </section>
  );
}
