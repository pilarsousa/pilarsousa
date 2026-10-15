import { cn } from "@/lib/cn";
import { horarios } from "@/components/cientifico-v2/horario";

/**
 * Hora del seminario en los cinco países principales del público, con puntos
 * guía como en un programa impreso. Si en algún país cae otro día que en
 * España (pasa con horarios de noche), se aclara el día.
 *
 * Se calcula en el servidor desde FECHA_EVENTO: cambiar la fecha en
 * content.ts actualiza la tabla sola.
 */
export function TablaHorarios({ className }: { className?: string }) {
  const filas = horarios();
  const diaEspana = filas[0]?.dia;

  return (
    <dl className={cn("flex flex-col gap-2.5 text-lg", className)}>
      {filas.map(({ pais, hora, dia }) => (
        <div key={pais} className="flex items-baseline gap-3">
          <dt className="font-semibold">{pais}</dt>
          <span aria-hidden className="cv2-guia" />
          <dd className="font-bold tabular-nums">
            {hora}
            {dia !== diaEspana && <span className="ml-1.5 text-base font-semibold opacity-75">({dia})</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
