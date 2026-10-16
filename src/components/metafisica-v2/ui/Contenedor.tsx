import { cn } from "@/lib/cn";

/**
 * Ancho de contenido de /metafisica-v2. La referencia alinea todo a una
 * columna de 1140px; con el padding lateral queda en 1204. La barra superior
 * calcula su tramo izquierdo con este mismo número (ver BarraSuperior).
 */
export function Contenedor({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1204px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
