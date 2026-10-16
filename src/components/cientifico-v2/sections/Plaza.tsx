import { Check } from "lucide-react";
import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { BotonEntrada } from "@/components/cientifico-v2/ui/BotonEntrada";
import { TablaHorarios } from "@/components/cientifico-v2/ui/TablaHorarios";
import { Sello } from "@/components/cientifico-v2/ui/Sello";
import { Rollo } from "@/components/cientifico-v2/ui/Rollo";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { FECHA_CORTA, PLAZA } from "@/components/cientifico-v2/content";

function Fila({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <div className="cv2-matricula__fila grid gap-2 py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
      <dt className="font-display text-[0.8rem] font-bold uppercase tracking-[0.2em] text-[#12291f]/70">{etiqueta}</dt>
      <dd className="text-lg leading-relaxed">{children}</dd>
    </div>
  );
}

/**
 * Bloque 10 · Plaza y precio. Tarjeta única, como pide el brief: fecha y
 * horarios por país, formato, qué incluye, precio y plazas limitadas, con el
 * botón. Es una ficha de inscripción en papel crema, la única superficie
 * clara de la página, la que hay que mirar: llega enrollada como un
 * pergamino y se desenrolla al aparecer (ui/Rollo.tsx). El sello va al lado
 * del precio y se estampa al final.
 */
export function Plaza() {
  return (
    <section id="plaza" aria-labelledby="plaza-titulo" className="relative py-20 sm:py-28">
      <Contenedor>
        <div className="mx-auto max-w-[680px]">
          <Reveal>
            <p className="cv2-antetitulo cv2-antetitulo--centro mx-auto flex w-fit">{PLAZA.antetitulo}</p>
          </Reveal>

          <Rollo className="mt-10">
            <div className="cv2-matricula-sombra">
              <article className="cv2-matricula relative px-6 pb-12 pt-14 sm:px-12 sm:pb-14 sm:pt-16">
                <p className="font-display text-[0.8rem] font-bold uppercase tracking-[0.22em] text-[#b65a26]">
                  Seminario de Neurometafísica
                </p>
                <h2
                  id="plaza-titulo"
                  className="mt-2 font-display text-[1.75rem] font-bold leading-tight text-[#12291f] sm:text-[2.2rem]"
                >
                  {PLAZA.titulo}
                </h2>
  
                <dl className="mt-8">
                  <Fila etiqueta="Fecha">{FECHA_CORTA}</Fila>
                  <Fila etiqueta="Horario">
                    <TablaHorarios />
                  </Fila>
                  <Fila etiqueta="Formato">{PLAZA.formato}</Fila>
                  <Fila etiqueta="Incluye">
                    <ul className="flex flex-col gap-2.5">
                      {PLAZA.incluye.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check aria-hidden size={20} strokeWidth={2.6} className="mt-1 shrink-0 text-[#b65a26]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Fila>
                  <Fila etiqueta="Precio">
                    {/* El sello, a la derecha del precio: se estampa cuando la
                        ficha termina de desenrollarse (.cv2-rollo__sello). */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="font-display text-[2.4rem] font-bold leading-none text-[#12291f]">
                          {PLAZA.precio}
                        </span>
                        <span className="mt-2 block text-base font-bold uppercase tracking-[0.14em] text-[#b65a26]">
                          {PLAZA.precioNota}
                        </span>
                      </div>
                      <Sello tono="claro" className="cv2-rollo__sello w-[78px] shrink-0 -rotate-12 sm:w-[96px]" />
                    </div>
                  </Fila>
                </dl>
  
                <div className="mt-6 flex justify-center">
                  <BotonEntrada bloque className="sm:w-auto" />
                </div>
              </article>
            </div>
          </Rollo>
        </div>
      </Contenedor>
    </section>
  );
}
