import { Contenedor } from "@/components/metafisica-v2/ui/Contenedor";
import { CarruselEsperar } from "@/components/metafisica-v2/ui/CarruselEsperar";

/** ¿Qué puedes esperar de este evento? — título a la izquierda, carrusel a la derecha. */
export function QueEsperar() {
  return (
    <section aria-label="Qué puedes esperar de este evento" className="relative py-12 sm:py-20">
      <Contenedor>
        <CarruselEsperar />
      </Contenedor>
    </section>
  );
}
