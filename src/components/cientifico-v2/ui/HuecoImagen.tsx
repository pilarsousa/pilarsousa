import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Lugar reservado para una foto que todavía no llegó. Marco de tiza punteado
 * con la descripción de la foto que va: se ve que falta algo a propósito y
 * quien la produzca sabe qué tiene que ser.
 *
 * Cuando llegue la foto, se reemplaza este componente por un <Image> con la
 * misma proporción (className trae el aspect-*).
 */
export function HuecoImagen({ descripcion, className }: { descripcion: string; className?: string }) {
  return (
    <div role="img" aria-label={`Espacio para foto: ${descripcion}`} className={cn("cv2-hueco p-8", className)}>
      <div className="flex max-w-[260px] flex-col items-center gap-3">
        <ImageIcon aria-hidden size={34} strokeWidth={1.4} className="text-(--cv2-oro)" />
        <p className="cv2-tiza text-[1.6rem] leading-tight">{descripcion}</p>
      </div>
    </div>
  );
}
