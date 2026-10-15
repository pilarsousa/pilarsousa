import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { Destacado } from "@/components/cientifico-v2/ui/Destacado";
import { Llamado } from "@/components/cientifico-v2/ui/Llamado";
import { Firma } from "@/components/cientifico-v2/ui/Firma";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { QUE_ES } from "@/components/cientifico-v2/content";

/**
 * Bloque 4 · Qué es la Neurometafísica. Una entrada de diccionario de la
 * materia: arriba la palabra separada en sílabas, como en un glosario de
 * cátedra, y el panel de pizarra la define. Debajo asoman dos
 * hojas más, como un cuaderno de apuntes. Después de este bloque va el botón.
 */
export function QueEs() {
  return (
    <section aria-labelledby="que-es-titulo" className="relative py-20 sm:py-28">
      <Contenedor>
        <div className="relative mx-auto max-w-[820px]">
          {/* Hojas apiladas debajo del panel, cada una más angosta y oscura. */}
          <div aria-hidden className="absolute inset-x-[8%] -bottom-[30px] h-32 rounded-b-[12px] bg-[#0f231a]" />
          <div aria-hidden className="absolute inset-x-[4%] -bottom-[16px] h-32 rounded-b-[12px] bg-[#173226]" />

          <Reveal className="relative">
            <div className="cv2-pestana cv2-modulo relative px-6 pb-24 pt-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:px-16 sm:pb-20 sm:pt-[4.5rem]">
              {/* La entrada del glosario: la palabra en sílabas y su género. */}
              <p className="font-display text-[1rem] font-bold tracking-[0.14em] text-(--cv2-oro) sm:text-[1.15rem]">
                {QUE_ES.entrada} <span className="font-sans text-[0.85em] font-medium italic tracking-normal text-foreground/70">(f.)</span>
              </p>
              <span aria-hidden className="mx-auto mt-4 block h-px w-16 bg-(--cv2-oro)/60" />
              <h2 id="que-es-titulo" className="cv2-titulo mx-auto mt-6 max-w-[620px] text-[1.75rem] sm:text-[2.4rem]">
                {QUE_ES.titulo}
              </h2>
              <p className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-foreground/90 sm:text-xl">
                <Destacado texto={QUE_ES.texto} />
              </p>
              <Llamado className="mt-9" />
              <Firma className="absolute bottom-5 right-6 text-[1.9rem] sm:bottom-7 sm:right-8 sm:text-[2.4rem]" />
            </div>
          </Reveal>
        </div>
      </Contenedor>
    </section>
  );
}
