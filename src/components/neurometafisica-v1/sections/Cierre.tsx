import { CircleAlert } from "lucide-react";
import { Contenedor } from "@/components/neurometafisica-v1/ui/Contenedor";
import { BotonEntrada } from "@/components/neurometafisica-v1/ui/BotonEntrada";
import { ApunteClase } from "@/components/neurometafisica-v1/ui/ApunteClase";
import { Destacado } from "@/components/neurometafisica-v1/ui/Destacado";
import { Anotacion } from "@/components/neurometafisica-v1/ui/Anotacion";
import { Reveal } from "@/components/neurometafisica-v1/ui/Reveal";
import { CIERRE } from "@/components/neurometafisica-v1/content";

/**
 * Bloque 12 · Cierre: el apunte de clase (la foto de Pilar en el aula y la
 * ficha de asistencia, ui/ApunteClase.tsx), el titular del brief con el
 * corchete de tiza, el botón y el aviso de plazas.
 */
export function Cierre() {
  return (
    <section aria-labelledby="cierre-titulo" className="relative py-20 sm:py-28">
      <Contenedor className="flex flex-col items-center text-center">
        <Reveal className="flex justify-center">
          <ApunteClase className="w-[min(80vw,380px)]" />
        </Reveal>

        <div className="relative mt-14 max-w-[900px]">
          {/* Corchete de tiza: raya arriba que baja en gancho a la izquierda. */}
          <Anotacion className="pointer-events-none absolute -left-3 -top-5 h-14 w-[48%] sm:-left-10" umbral={0.9}>
            <svg viewBox="0 0 400 50" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
              <path
                pathLength={1}
                className="cv2-trazo cv2-trazo--brillo [--dur:0.9s]"
                stroke="#f3eedc"
                strokeWidth={2.5}
                vectorEffect="non-scaling-stroke"
                d="M18 48 C12 30 6 14 4 6 C80 2 250 3 398 2"
              />
            </svg>
          </Anotacion>
          <h2 id="cierre-titulo" className="cv2-titulo text-[1.85rem] sm:text-[2.75rem]">
            <Destacado texto={CIERRE.titulo} claseDestacado="cv2-grad-texto" />
          </h2>
        </div>

        <BotonEntrada className="mt-10" />

        <p className="cv2-pastilla mt-8 flex items-center gap-3 px-5 py-3 text-lg font-semibold text-foreground/90">
          <CircleAlert aria-hidden size={22} className="shrink-0 fill-(--cv2-oro) text-[#12291f]" />
          {CIERRE.aviso}
        </p>
      </Contenedor>
    </section>
  );
}
