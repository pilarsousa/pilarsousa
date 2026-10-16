import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { Encabezado } from "@/components/cientifico-v2/ui/Encabezado";
import { Destacado } from "@/components/cientifico-v2/ui/Destacado";
import { ReviewCarousel } from "@/components/cientifico-v2/ui/ReviewCarousel";
import { Llamado } from "@/components/cientifico-v2/ui/Llamado";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { PRUEBA } from "@/components/cientifico-v2/content";
import { FEATURED_TESTIMONIALS } from "@/components/lista-de-espera/content";

/**
 * Bloque 9 · Prueba social. Las reseñas de Volver al Origen, las mismas de
 * /bootcamp-v2, en un carrusel a sangre con los bordes fundidos (dentro del
 * contenedor se leería como una lista cerrada, no como un carrusel con más).
 * Siembra que existe un sistema para sostener el cambio, sin venderlo.
 */
export function PruebaSocial() {
  return (
    <section aria-labelledby="prueba-titulo" className="cv2-cuadricula relative py-24 sm:py-32">
      <Contenedor>
        <Encabezado id="prueba-titulo" antetitulo={PRUEBA.antetitulo} titulo={PRUEBA.titulo} centrado />
        <Reveal>
          <p className="mx-auto mt-6 max-w-[680px] text-balance text-center text-lg leading-relaxed text-foreground/90 sm:text-xl">
            <Destacado texto={PRUEBA.intro} />
          </p>
        </Reveal>
      </Contenedor>

      <div className="mt-12">
        <ReviewCarousel items={FEATURED_TESTIMONIALS} />
      </div>

      <Contenedor>
        <Reveal>
          <Llamado className="mt-12" />
        </Reveal>
      </Contenedor>
    </section>
  );
}
