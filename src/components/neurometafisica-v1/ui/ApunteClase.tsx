import Image from "next/image";
import { cn } from "@/lib/cn";
import { FECHA_CORTA } from "@/components/neurometafisica-v1/content";
import foto from "@/../public/neurometafisica-v1/carpetas/img-pilar-sentada.jpeg";

/**
 * La pieza del cierre: lo que quedaría sobre el pupitre después de clase.
 * Una foto revelada de Pilar en el aula (con su sistema nervioso encendido,
 * como pidió el brief) pegada con cinta y con la leyenda escrita a mano, y
 * encima la ficha de asistencia del seminario, con la firma de Pilar en el
 * primer renglón y el tuyo esperando. Reemplaza a la entrada de cine: Pilar
 * pidió la vibra de clase, no la de un concierto.
 *
 * Decorativa: lo que dice ya está en el resto de la página. El tamaño lo da
 * `className` (w-*); todo lo de adentro se mide en cqw.
 */
export function ApunteClase({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("cv2-apunte pointer-events-none relative select-none", className)}>
      <figure className="cv2-apunte__foto">
        <span className="cv2-apunte__cinta cv2-apunte__cinta--izq" />
        <span className="cv2-apunte__cinta cv2-apunte__cinta--der" />
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={foto} alt="" fill sizes="(min-width: 640px) 300px, 60vw" className="object-cover object-[50%_30%]" />
          {/* Viñeta cálida: la foto "revelada", sin bordes duros. */}
          <span className="absolute inset-0 shadow-[inset_0_0_40px_rgb(60_36_10/0.45)]" />
        </div>
        {/* A la izquierda: la ficha de asistencia tapa la esquina derecha. */}
        <figcaption className="cv2-apunte__leyenda">Neurometafísica</figcaption>
      </figure>

      <div className="cv2-apunte__ficha">
        <p className="cv2-apunte__ficha-titulo">
          Asistencia <span>{FECHA_CORTA}</span>
        </p>
        <ol className="cv2-apunte__renglones">
          <li>
            <span className="cv2-apunte__num">1</span>
            <span className="cv2-apunte__firma">Pilar Sousa</span>
          </li>
          <li>
            <span className="cv2-apunte__num">2</span>
            <span className="cv2-apunte__tu">tu firma aquí</span>
          </li>
          <li>
            <span className="cv2-apunte__num">3</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
