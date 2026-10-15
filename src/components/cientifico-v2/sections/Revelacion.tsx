import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { Encabezado } from "@/components/cientifico-v2/ui/Encabezado";
import { Anotacion } from "@/components/cientifico-v2/ui/Anotacion";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { REVELACION } from "@/components/cientifico-v2/content";

/**
 * Bloque 3 · La revelación. Tres puntos numerados como los de una lección
 * (numeral en Cinzel, regla dorada entre uno y otro) y, al final, la frase
 * escrita con tiza en la pizarra, que se va descubriendo como si se
 * escribiera en el momento.
 */
export function Revelacion() {
  return (
    <section aria-labelledby="revelacion-titulo" className="cv2-halos-bordes relative py-20 sm:py-28">
      <Contenedor>
        <Encabezado id="revelacion-titulo" antetitulo={REVELACION.antetitulo} titulo={REVELACION.titulo} />

        <ol className="mt-12 max-w-[920px] divide-y divide-(--cv2-oro)/25 border-y border-(--cv2-oro)/25">
          {REVELACION.puntos.map(({ titulo, texto }, i) => (
            <li key={titulo}>
              <Reveal delay={0.06 * i} className="grid grid-cols-[3.25rem_1fr] gap-x-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-x-8">
                <span aria-hidden className="cv2-titulo text-[2.5rem] font-bold leading-none sm:text-[3.5rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-bold leading-snug text-foreground sm:text-[1.5rem]">{titulo}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-(--cv2-gris)">{texto}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* La frase destacada, en la pizarra. */}
        <Reveal className="mt-16 sm:mt-20">
          <figure className="cv2-pizarra mx-auto max-w-[920px] px-6 pb-12 pt-8 sm:px-14 sm:pb-16 sm:pt-10">
            <figcaption className="cv2-tiza text-[1.35rem] opacity-70 sm:text-2xl">Apunta esto:</figcaption>
            <Anotacion umbral={0.6}>
              <blockquote className="cv2-tiza cv2-trazo-texto mt-3 text-balance text-center text-[2.1rem] leading-[1.15] [--dur:2.2s] [--retraso:0.2s] sm:text-[3.1rem] lg:text-[3.6rem]">
                {REVELACION.pizarra}
              </blockquote>
              <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="mx-auto mt-4 h-4 w-[60%] overflow-visible" aria-hidden>
                <path
                  pathLength={1}
                  className="cv2-trazo cv2-trazo--brillo [--dur:0.8s] [--retraso:2.3s]"
                  stroke="#e9c46a"
                  strokeWidth={3}
                  vectorEffect="non-scaling-stroke"
                  d="M6 12 C110 5 230 15 394 8"
                />
              </svg>
            </Anotacion>
          </figure>
        </Reveal>
      </Contenedor>
    </section>
  );
}
