import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { Encabezado } from "@/components/cientifico-v2/ui/Encabezado";
import { Destacado } from "@/components/cientifico-v2/ui/Destacado";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { TEMARIO } from "@/components/cientifico-v2/content";

/**
 * Bloque 5 · Temario. Objetivo del brief: que se vea el programa de una
 * asignatura seria. Fondo de pizarra con cuadrícula (cuando llegue la imagen
 * "Pizarra Verde con Campo Energético", va de fondo de esta sección) y cada
 * módulo en una carpeta de asignatura: la pestaña dice "Módulo I, II, III" y
 * el numeral romano gigante queda de fondo, como en la portada del programa.
 */
export function Temario() {
  return (
    <section aria-labelledby="temario-titulo" className="cv2-cuadricula relative py-24 sm:py-32">
      <Contenedor>
        <Encabezado id="temario-titulo" antetitulo={TEMARIO.antetitulo} titulo={TEMARIO.titulo} centrado />
        <Reveal>
          <p className="mx-auto mt-6 max-w-[680px] text-balance text-center text-lg leading-relaxed text-foreground/90 sm:text-xl">
            <Destacado texto={TEMARIO.intro} />
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {TEMARIO.modulos.map(({ numero, titulo, texto }, i) => (
            <li key={numero}>
              <Reveal delay={0.08 * i} className="h-full">
                <article className="cv2-carpeta cv2-modulo flex h-full flex-col px-7 pb-9 pt-5 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)]">
                  {/* El rótulo va en la pestaña de la carpeta (46% del ancho). */}
                  <p className="font-display text-[0.8rem] font-bold uppercase tracking-[0.22em] text-(--cv2-oro)">
                    Módulo {numero}
                  </p>
                  <span aria-hidden className="cv2-modulo__fantasma">
                    {numero}
                  </span>
                  <h3 className="cv2-titulo relative mt-9 text-[1.35rem] leading-snug sm:text-[1.5rem]">{titulo}</h3>
                  <p className="relative mt-4 text-lg leading-relaxed text-(--cv2-gris)">{texto}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Contenedor>
    </section>
  );
}
