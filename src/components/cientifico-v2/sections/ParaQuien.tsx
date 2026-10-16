import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { Encabezado } from "@/components/cientifico-v2/ui/Encabezado";
import { Marquee } from "@/components/cientifico-v2/ui/Marquee";
import { TuboDispuesta } from "@/components/cientifico-v2/ui/TuboDispuesta";
import { Anotacion } from "@/components/cientifico-v2/ui/Anotacion";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { NO_ES_PARA_TI, PARA_QUIEN } from "@/components/cientifico-v2/content";

/** Cruz de tiza roja para el "no es para ti": dos trazos a mano, en el rojo
    del punto de "en directo" del hero. */
function CruzTiza({ retraso }: { retraso: number }) {
  return (
    <Anotacion className="mt-0.5 size-7 shrink-0" umbral={0.9}>
      <svg
        viewBox="0 0 28 28"
        className="size-full overflow-visible drop-shadow-[0_0_6px_rgb(229_72_77/0.45)]"
        aria-hidden
      >
        <path
          pathLength={1}
          className="cv2-trazo [--dur:0.35s]"
          style={{ "--retraso": `${retraso}s` } as React.CSSProperties}
          stroke="#e5484d"
          strokeWidth={3}
          d="M5 5 C11 11 17 17 23 24"
        />
        <path
          pathLength={1}
          className="cv2-trazo [--dur:0.35s]"
          style={{ "--retraso": `${retraso + 0.3}s` } as React.CSSProperties}
          stroke="#e5484d"
          strokeWidth={3}
          d="M23 4 C17 11 11 17 5 23"
        />
      </svg>
    </Anotacion>
  );
}

/**
 * Bloque 7 · Para quién es / para quién no es. El "es para ti si" va en la
 * pócima (ui/TuboDispuesta.tsx): a Pilar le gustó y es el único guiño de
 * laboratorio que admite el brief. Debajo, el "no es para ti" en una ficha
 * más apagada, con cruces de tiza: filtra sin dramatismo.
 */
export function ParaQuien() {
  return (
    <section aria-labelledby="para-quien-titulo" className="cv2-halos-bordes relative overflow-x-clip py-16 sm:py-24">
      <Contenedor>
        <Encabezado id="para-quien-titulo" antetitulo={PARA_QUIEN.antetitulo} titulo={PARA_QUIEN.titulo} centrado />
      </Contenedor>

      <div className="relative mt-6 lg:mt-4 lg:pt-[70px]">
        <Marquee className="text-[3.4rem] sm:text-[5.5rem] lg:absolute lg:inset-x-0 lg:top-0 lg:text-[8.5rem]" />
        <Contenedor className="relative mt-10 lg:mt-0">
          <TuboDispuesta />
        </Contenedor>
      </div>

      <Contenedor>
        <Reveal className="mx-auto mt-16 max-w-[680px] rounded-[10px] border border-dashed border-(--cv2-tiza)/25 bg-[#0f231a]/70 px-6 py-7 sm:px-9 sm:py-8">
          <h3 className="cv2-titulo text-[1.35rem] text-foreground/85 sm:text-[1.6rem]">{PARA_QUIEN.noEsTitulo}</h3>
          <ul className="mt-5 flex flex-col gap-4">
            {NO_ES_PARA_TI.map((texto, i) => (
              <li key={texto} className="flex items-start gap-4 text-lg leading-relaxed text-foreground/80 sm:text-xl">
                <CruzTiza retraso={0.2 + 0.5 * i} />
                {texto}
              </li>
            ))}
          </ul>
        </Reveal>
      </Contenedor>
    </section>
  );
}
