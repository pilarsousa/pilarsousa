import { Plus } from "lucide-react";
import { Contenedor } from "@/components/neurometafisica-v1/ui/Contenedor";
import { Encabezado } from "@/components/neurometafisica-v1/ui/Encabezado";
import { TablaHorarios } from "@/components/neurometafisica-v1/ui/TablaHorarios";
import { Reveal } from "@/components/neurometafisica-v1/ui/Reveal";
import { FAQ } from "@/components/neurometafisica-v1/content";

/**
 * Bloque 11 · Preguntas frecuentes. <details> nativos: se abren sin JS, con
 * teclado y con el lector de pantalla, y la búsqueda del navegador encuentra
 * el texto aunque esté cerrado. La de los horarios responde con la tabla de
 * países.
 */
export function Faq() {
  return (
    <section aria-labelledby="faq-titulo" className="relative py-20 sm:py-28">
      <Contenedor>
        <Encabezado id="faq-titulo" antetitulo="Dudas" titulo="Preguntas frecuentes" centrado />

        <Reveal className="mx-auto mt-12 max-w-[760px] border-t border-(--cv2-oro)/25">
          {FAQ.map(({ pregunta, respuesta }) => (
            <details key={pregunta} className="cv2-faq group border-b border-(--cv2-oro)/25">
              <summary className="flex items-center justify-between gap-6 py-6 text-lg font-bold text-foreground sm:text-xl">
                {pregunta}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-(--cv2-oro)/50 text-(--cv2-oro)">
                  <Plus aria-hidden size={18} strokeWidth={2.4} className="cv2-faq__signo" />
                </span>
              </summary>
              <div className="pb-7 pr-12 text-lg leading-relaxed text-(--cv2-gris)">
                {respuesta === "horarios" ? <TablaHorarios className="max-w-[380px] text-foreground" /> : respuesta}
              </div>
            </details>
          ))}
        </Reveal>
      </Contenedor>
    </section>
  );
}
