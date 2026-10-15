"use client";

import { cn } from "@/lib/cn";
import { CTA } from "@/components/cientifico-v2/content";
import { useReservaModal } from "@/components/cientifico-v2/ui/ReservaModal";

/**
 * El botón principal con forma de entrada (ver .cv2-boton en
 * cientifico-v2.css). Siempre abre el modal de registro.
 */
export function BotonEntrada({
  children = CTA,
  bloque,
  className,
}: {
  children?: React.ReactNode;
  /** Ocupa todo el ancho del contenedor (mobile). */
  bloque?: boolean;
  className?: string;
}) {
  const { open } = useReservaModal();

  return (
    <button
      type="button"
      onClick={open}
      className={cn("cv2-boton", bloque && "cv2-boton--bloque", className)}
    >
      <span className="cv2-boton__billete">{children}</span>
    </button>
  );
}
