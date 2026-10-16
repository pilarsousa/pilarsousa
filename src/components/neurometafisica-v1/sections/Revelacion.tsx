import { Contenedor } from "@/components/neurometafisica-v1/ui/Contenedor";
import { Encabezado } from "@/components/neurometafisica-v1/ui/Encabezado";
import { Anotacion } from "@/components/neurometafisica-v1/ui/Anotacion";
import { LaminasRevelacion } from "@/components/neurometafisica-v1/ui/LaminasRevelacion";
import { Reveal } from "@/components/neurometafisica-v1/ui/Reveal";
import { REVELACION } from "@/components/neurometafisica-v1/content";

/**
 * Bloque 3 · La revelación. Los tres puntos son láminas de vidrio que se
 * apilan con el scroll, cada una con su diagrama, sobre una red neuronal
 * desenfocada (ui/LaminasRevelacion.tsx). Al final, la frase escrita con
 * tiza en la pizarra: se va descubriendo como si se escribiera en el momento
 * y una tiza amarilla la subraya y vuelve a la repisa.
 */
export function Revelacion() {
  return (
    <section aria-labelledby="revelacion-titulo" className="cv2-halos-bordes relative py-20 sm:py-28">
      <Contenedor>
        <LaminasRevelacion
          cabecera={<Encabezado id="revelacion-titulo" antetitulo={REVELACION.antetitulo} titulo={REVELACION.titulo} />}
          puntos={REVELACION.puntos}
        />

        {/* La frase destacada, en la pizarra. */}
        <Reveal className="mt-16 sm:mt-20">
          <figure className="cv2-pizarra mx-auto max-w-[920px] px-6 pb-12 pt-8 sm:px-14 sm:pb-16 sm:pt-10">
            <figcaption className="cv2-tiza text-[1.35rem] opacity-70 sm:text-2xl">Apunta esto:</figcaption>
            <Anotacion umbral={0.6}>
              <blockquote className="cv2-tiza cv2-trazo-texto mt-3 text-balance text-center text-[2.1rem] leading-[1.15] [--dur:2.2s] [--retraso:0.2s] sm:text-[3.1rem] lg:text-[3.6rem]">
                {REVELACION.pizarra}
              </blockquote>
              {/* El subrayado y la tiza que lo escribe. La tiza descansa en la
                  repisa, sube, subraya a la par del trazo y vuelve a la
                  repisa (.cv2-tiza-barra). Su caída hasta la repisa depende
                  del pb de la figura: si cambia, cambiar --caida. */}
              <div className="relative mx-auto mt-4 h-4 w-[60%]">
                <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
                  {/* Sin non-scaling-stroke: con él, Chrome deja el trazo a
                      medias cuando el SVG mide más que su viewBox. */}
                  <path
                    pathLength={1}
                    className="cv2-trazo cv2-trazo--brillo [--dur:0.8s] [--retraso:2.3s]"
                    stroke="#e9c46a"
                    strokeWidth={3}
                    d="M6 12 C110 5 230 15 394 8"
                  />
                </svg>
                <span aria-hidden className="cv2-tiza-barra" />
              </div>
            </Anotacion>
          </figure>
        </Reveal>
      </Contenedor>
    </section>
  );
}
