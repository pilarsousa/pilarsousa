import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import { Bandera } from "@/components/neurometafisica-v1/ui/Bandera";
import { horarios } from "@/components/neurometafisica-v1/horario";

function Fila({ oculta = false }: { oculta?: boolean }) {
  return (
    <ul
      aria-hidden={oculta || undefined}
      className={cn(
        "flex shrink-0 gap-2.5 pr-2.5 motion-reduce:shrink motion-reduce:flex-wrap",
        oculta && "motion-reduce:hidden",
      )}
    >
      {horarios().map(({ pais, hora }) => (
        <li
          key={pais}
          className="flex items-center gap-2 rounded-md border border-(--cv2-borde) bg-[rgb(23_50_38/0.75)] py-1.5 pr-3 pl-2"
        >
          <Bandera pais={pais} className="w-[22px]" />
          <span className="text-sm font-semibold text-foreground/80">{pais}</span>
          <span className="text-sm font-extrabold tabular-nums text-(--cv2-oro)">{hora}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * La hora del directo en cada país del público, en una cinta que corre sola
 * (cada uno busca su bandera). Dos filas idénticas: la pista se corre -50% y
 * el corte no se ve; la segunda va oculta para lectores de pantalla. Se
 * detiene al pasar el mouse y, sin movimiento, queda quieta y se recorta.
 */
export function CintaHorarios({ rotulo, className }: { rotulo: string; className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-foreground/70">
        <Clock aria-hidden className="size-3.5 text-(--cv2-oro)" />
        {rotulo}
      </p>
      <div className="cv2-cinta mt-2.5 overflow-hidden">
        <div className="cv2-cinta__pista motion-reduce:w-auto">
          <Fila />
          <Fila oculta />
        </div>
      </div>
    </div>
  );
}
