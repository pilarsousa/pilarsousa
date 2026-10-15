import { Check } from "lucide-react";
import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { BotonEntrada } from "@/components/cientifico-v2/ui/BotonEntrada";
import { TablaHorarios } from "@/components/cientifico-v2/ui/TablaHorarios";
import { Sello } from "@/components/cientifico-v2/ui/Sello";
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
 * botón. Es una ficha de inscripción en papel crema con el borde troquelado:
 * la única superficie clara de la página, la que hay que mirar.
 */
export function Plaza() {
  return (
    <section id="plaza" aria-labelledby="plaza-titulo" className="relative py-20 sm:py-28">
      <Contenedor>
        <Reveal className="mx-auto max-w-[680px]">
          <p className="cv2-antetitulo cv2-antetitulo--centro mx-auto flex w-fit">{PLAZA.antetitulo}</p>

          <div className="cv2-matricula-sombra mt-8">
            <article className="cv2-matricula relative px-6 pb-10 pt-12 sm:px-12 sm:pb-12 sm:pt-14">
              <Sello tono="claro" className="absolute right-5 top-6 w-[72px] sm:right-9 sm:top-9 sm:w-[92px]" />

              <p className="font-display text-[0.8rem] font-bold uppercase tracking-[0.22em] text-[#b65a26]">
                Seminario de Neurometafísica
              </p>
              <h2
                id="plaza-titulo"
                className="mt-2 max-w-[70%] font-display text-[1.75rem] font-bold leading-tight text-[#12291f] sm:text-[2.2rem]"
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
                  <span className="font-display text-[2.4rem] font-bold leading-none text-[#12291f]">{PLAZA.precio}</span>
                  <span className="mt-2 block text-base font-bold uppercase tracking-[0.14em] text-[#b65a26]">
                    {PLAZA.precioNota}
                  </span>
                </Fila>
              </dl>

              <div className="mt-6 flex justify-center">
                <BotonEntrada bloque className="sm:w-auto" />
              </div>
            </article>
          </div>
        </Reveal>
      </Contenedor>
    </section>
  );
}
