import { cn } from "@/lib/cn";
import { BotonEntrada } from "@/components/neurometafisica-v1/ui/BotonEntrada";

/**
 * El botón único de la página ("Quiero mi plaza") con su línea de apoyo
 * debajo. El brief lo repite después de los bloques 1, 4, 6 y 9, en la plaza
 * y en el cierre: siempre el mismo botón y la misma acción.
 */
export function Llamado({
  nota = "Plaza gratuita · Plazas limitadas",
  className,
  alineado = "centro",
}: {
  nota?: React.ReactNode;
  className?: string;
  alineado?: "centro" | "izquierda";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        alineado === "centro" ? "items-center text-center" : "items-stretch sm:items-start",
        className,
      )}
    >
      <BotonEntrada bloque className="sm:w-auto" />
      {nota && <p className="text-[0.8125rem] font-semibold tracking-[0.04em] text-foreground/70">{nota}</p>}
    </div>
  );
}
