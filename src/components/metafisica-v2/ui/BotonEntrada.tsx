"use client";

import { cn } from "@/lib/cn";
import { CTA } from "@/components/metafisica-v2/content";
import { useReservaModal } from "@/components/metafisica-v2/ui/ReservaModal";

/**
 * El botón principal con forma de entrada (ver .cv3-boton en
 * metafisica-v2.css). Siempre abre el modal de registro.
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
      className={cn("cv3-boton", bloque && "cv3-boton--bloque", className)}
    >
      <span className="cv3-boton__billete">{children}</span>
    </button>
  );
}
