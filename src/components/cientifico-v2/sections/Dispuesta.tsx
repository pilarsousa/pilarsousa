import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { Marquee } from "@/components/cientifico-v2/ui/Marquee";
import { TuboDispuesta } from "@/components/cientifico-v2/ui/TuboDispuesta";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { DISPUESTA } from "@/components/cientifico-v2/content";

/**
 * "Pero, para aprovechar esta oportunidad, debes estar dispuesta a:" — el
 * marquee gigante de fondo y, delante, el tubo de ensayo con las cuatro
 * cards (ver ui/TuboDispuesta.tsx).
 */
export function Dispuesta() {
  return (
    <section aria-labelledby="dispuesta-titulo" className="cv2-halos-bordes relative overflow-x-clip py-16 sm:py-24">
      <Contenedor>
        <Reveal>
          <h2 id="dispuesta-titulo" className="text-balance text-xl font-bold leading-snug text-foreground sm:text-center sm:text-[1.375rem]">
            {DISPUESTA.titulo}
          </h2>
        </Reveal>
      </Contenedor>

      <div className="relative mt-6 lg:mt-4 lg:pt-[70px]">
        <Marquee className="text-[3.4rem] sm:text-[5.5rem] lg:absolute lg:inset-x-0 lg:top-0 lg:text-[8.5rem]" />
        <Contenedor className="relative mt-10 lg:mt-0">
          <TuboDispuesta />
        </Contenedor>
      </div>
    </section>
  );
}
