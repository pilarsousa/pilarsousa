import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { Encabezado } from "@/components/cientifico-v2/ui/Encabezado";
import { Destacado } from "@/components/cientifico-v2/ui/Destacado";
import { ModulosTemario } from "@/components/cientifico-v2/ui/ModulosTemario";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { TEMARIO } from "@/components/cientifico-v2/content";

/**
 * Bloque 5 · Temario. Objetivo del brief: que se vea el programa de una
 * asignatura seria. Fondo de pizarra con cuadrícula (cuando llegue la imagen
 * "Pizarra Verde con Campo Energético", va de fondo de esta sección) y los
 * tres módulos como paneles que se despliegan con el scroll, con su numeral
 * romano (I, II, III) y su fase: ver ui/ModulosTemario.tsx.
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

        <div className="mt-14">
          <ModulosTemario modulos={TEMARIO.modulos} />
        </div>
      </Contenedor>
    </section>
  );
}
