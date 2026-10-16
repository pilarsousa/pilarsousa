import { CircleAlert } from "lucide-react";
import { Contenedor } from "@/components/metafisica-v2/ui/Contenedor";
import { BotonEntrada } from "@/components/metafisica-v2/ui/BotonEntrada";
import { Entrada, TalonSuelto } from "@/components/metafisica-v2/ui/Entrada";
import { Destacado } from "@/components/metafisica-v2/ui/Destacado";
import { Anotacion } from "@/components/metafisica-v2/ui/Anotacion";
import { Reveal } from "@/components/metafisica-v2/ui/Reveal";
import { CIERRE } from "@/components/metafisica-v2/content";

/**
 * Cierre: la entrada grande con el talón suelto, el titular con el corchete a
 * mano, el botón y la pastilla de cupos.
 */
export function Cierre() {
  return (
    <section aria-labelledby="cierre-titulo" className="relative py-20 sm:py-28">
      <Contenedor className="flex flex-col items-center text-center">
        <Reveal className="flex items-center justify-center">
          <Entrada talon="sin" sizes="340px" className="w-[min(64vw,340px)] -rotate-[16deg]" />
          <TalonSuelto className="-ml-1 mt-12 w-[min(22vw,118px)] rotate-[22deg] sm:ml-6" />
        </Reveal>

        <div className="relative mt-12 max-w-[900px]">
          {/* Corchete a mano: raya arriba que baja en gancho a la izquierda. */}
          <Anotacion className="pointer-events-none absolute -left-3 -top-4 h-14 w-[48%] sm:-left-10" umbral={0.9}>
            <svg viewBox="0 0 400 50" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
              <path
                pathLength={1}
                className="cv3-trazo [--dur:0.9s]"
                stroke="#f4eee4"
                strokeWidth={2.5}
                vectorEffect="non-scaling-stroke"
                d="M18 48 C12 30 6 14 4 6 C80 2 250 3 398 2"
              />
            </svg>
          </Anotacion>
          <h2 id="cierre-titulo" className="text-[1.375rem] font-extrabold leading-[1.32] text-foreground sm:text-[1.75rem]">
            <Destacado texto={CIERRE.titulo} claseDestacado="cv3-grad-texto" />
          </h2>
        </div>

        <BotonEntrada className="mt-8" />

        <p className="cv3-pastilla mt-7 flex items-center gap-3 px-5 py-3 text-base font-semibold text-foreground/85 sm:text-lg">
          <CircleAlert aria-hidden size={22} className="shrink-0 fill-foreground/75 text-[#0c0a12]" />
          {CIERRE.aviso}
        </p>
      </Contenedor>
    </section>
  );
}
