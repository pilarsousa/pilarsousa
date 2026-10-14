import { Contenedor } from "@/components/cientifico-v3/ui/Contenedor";
import { Destacado } from "@/components/cientifico-v3/ui/Destacado";
import { Anotacion } from "@/components/cientifico-v3/ui/Anotacion";
import { Reveal } from "@/components/cientifico-v3/ui/Reveal";
import { OPORTUNIDAD, PARA_TI } from "@/components/cientifico-v3/content";

/**
 * "Tu oportunidad… empieza aquí" + "Este evento es para ti, si:". El círculo
 * a mano rodea "Tu oportunidad" y un trazo lo cruza, como en la referencia.
 */
export function Oportunidad() {
  return (
    /* isolate: el "Origen" de fondo (-z-10) queda por encima del fondo de la
       sección y por debajo del contenido. */
    <section aria-labelledby="oportunidad-titulo" className="cv3-halos-bordes relative isolate py-20 sm:py-28">
      <Contenedor className="relative">
        {/* "Origen" manuscrito y desenfocado, a la derecha en el hueco entre
            el panel de la magia y el título: el espejo del "Volver" del hero.
            PC: anclado al borde derecho de la pantalla, más arriba e
            inclinado. Acá el bloque de referencia es el Contenedor entero
            (con su padding), cuyo borde está a max(0px, (100vw − 1204px) / 2)
            del de la pantalla. 4vw y no 2vw: la última letra manuscrita sobresale de
            su caja y se cortaba contra el borde. */}
        <span
          aria-hidden
          className="cv3-mano cv3-desenfocado pointer-events-none absolute -top-[7.5rem] right-[3%] -z-10 -rotate-3 text-[5.5rem] font-bold leading-none sm:-top-[11.5rem] sm:right-[6%] sm:text-[10rem] lg:-top-[17rem] lg:right-[calc(4vw-max(0px,(100vw-1204px)/2))] lg:origin-right lg:-rotate-[11deg] lg:text-[clamp(7rem,8.5vw,10rem)]"
        >
          Origen
        </span>

        <Reveal>
          <h2
            id="oportunidad-titulo"
            className="mx-auto max-w-[620px] text-[1.75rem] font-extrabold leading-[1.22] sm:text-center sm:text-[2rem]"
          >
            <span className="relative inline-block">
              {/* El degradado va en el texto: Safari no recorta el fondo del
                  h2 al texto de un descendiente posicionado/inline-block. */}
              <span className="cv3-grad-texto">{OPORTUNIDAD.tituloMarcado}</span>
              <Anotacion className="pointer-events-none absolute -inset-x-3 -inset-y-4 sm:-inset-x-6" umbral={0.8}>
                <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
                  <path
                    pathLength={1}
                    className="cv3-trazo [--dur:1s] [--retraso:0.3s]"
                    stroke="#f4eee4"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    d="M226 20 C170 6 60 8 22 30 C-4 46 18 66 90 70 C170 74 270 66 284 46 C294 30 250 18 200 16"
                  />
                  <path
                    pathLength={1}
                    className="cv3-trazo [--dur:0.5s] [--retraso:1.3s]"
                    stroke="#f4eee4"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    d="M10 2 C90 6 200 14 298 26"
                  />
                </svg>
              </Anotacion>
            </span>
            <span className="cv3-grad-texto">{OPORTUNIDAD.tituloResto}</span>
          </h2>
          <p className="mt-3 text-lg font-bold text-foreground sm:text-center sm:text-[1.375rem]">{OPORTUNIDAD.subtitulo}</p>
        </Reveal>

        <ul className="mt-9 grid gap-x-5 gap-y-9 lg:grid-cols-2">
          {PARA_TI.map((item, i) => (
            <li key={item.frase}>
              <Reveal delay={0.08 * (i % 2)}>
                <p className="rounded-xl bg-(--cv3-card-alto) px-5 py-3.5 text-[1.0625rem] leading-[1.45] text-foreground sm:text-lg">
                  <Destacado texto={item.frase} />
                </p>
                <p className="mt-4 px-5 text-base leading-relaxed text-(--cv3-gris)">{item.detalle}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}
