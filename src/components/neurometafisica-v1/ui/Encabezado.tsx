import { cn } from "@/lib/cn";
import { Destacado } from "@/components/neurometafisica-v1/ui/Destacado";
import { Reveal } from "@/components/neurometafisica-v1/ui/Reveal";

/**
 * Encabezado de sección del aula: antetítulo de asignatura (raya + rótulo en
 * Cinzel) y titular de inscripción en oro. Las partes [marcadas] del titular
 * van con el degradado de luz de tarde.
 */
export function Encabezado({
  id,
  antetitulo,
  titulo,
  centrado,
  className,
  claseTitulo,
}: {
  id: string;
  antetitulo?: string;
  titulo: string;
  centrado?: boolean;
  className?: string;
  claseTitulo?: string;
}) {
  return (
    <Reveal className={cn(centrado && "flex flex-col items-center text-center", className)}>
      {antetitulo && (
        <p className={cn("cv2-antetitulo", centrado && "cv2-antetitulo--centro")}>{antetitulo}</p>
      )}
      <h2
        id={id}
        className={cn(
          "cv2-titulo mt-4 max-w-[860px] text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem]",
          claseTitulo,
        )}
      >
        <Destacado texto={titulo} claseDestacado="cv2-grad-texto" />
      </h2>
    </Reveal>
  );
}
