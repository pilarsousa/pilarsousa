import Image from "next/image";
import { CalendarDays, Clock, Compass, Radio } from "lucide-react";
import { cn } from "@/lib/cn";

type ScheduleReferenceCardProps = {
  className?: string;
};

const PILLS = [
  { icon: CalendarDays, label: "10, 11 y 12 de octubre" },
  { icon: Radio, label: "3 días en vivo" },
  { icon: Compass, label: "Metafísica práctica" },
];

/**
 * Compact schedule card used anywhere the landing needs to show the reference
 * time without making the event feel Spain-only.
 *
 * ── DOS FILAS, Y LA DE ARRIBA NO SE PARTE SI CABE ──
 *
 * Las tres pastillas van en una sola fila cuando hay sitio. El ancho lo manda
 * QUIEN LA USA, no la tarjeta: en el hero se le pasan 540px y entran las tres;
 * dentro del PricingCard el hueco es de ~384px y se reparten en dos filas
 * solas. Por eso el contenedor lleva flex-wrap y ningún ancho propio — un
 * max-w aquí dentro obligaría a elegir un único comportamiento para los dos
 * sitios.
 */
export function ScheduleReferenceCard({
  className,
}: ScheduleReferenceCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-px",
        /* El anillo que gira pasa al VERDE. En crema era invisible: la cara de
           la tarjeta ahora es clara y un filo crema sobre crema no existe. */
        "bg-[conic-gradient(from_var(--border-angle),transparent_0%,transparent_18%,var(--bc2-verde-2)_32%,var(--bc2-verde)_38%,transparent_52%,transparent_100%)]",
        "shadow-[0_14px_36px_var(--bc2-velo-leve)] animate-border-spin",
        className,
      )}
    >
      <div className="bc2-carta-clara relative overflow-hidden rounded-[calc(1rem-1px)] px-4 py-4">
        {/* Fila 1 — los tres datos del formato. */}
        <div className="relative flex flex-wrap items-center justify-center gap-1.5">
          {PILLS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-forest-900/15 bg-forest-900/5 px-2.5 py-1.5 text-[0.76rem] font-medium text-forest-900/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
            >
              <Icon size={13} strokeWidth={2} className="shrink-0 text-forest-700" />
              {label}
            </span>
          ))}
        </div>

        <div className="relative my-3.5 h-px w-full bg-[linear-gradient(to_right,transparent,var(--bc2-verde-2),transparent)] opacity-25" />

        {/*
          Fila 2 — el horario.

          Antes era un disco con bandera y dos líneas de texto flotando al
          lado, sin eje común: la hora, el rótulo y la bandera se alineaban
          cada uno por su cuenta y el bloque se leía flojo.

          Ahora hay una jerarquía explícita. La HORA manda —es el dato— y va
          grande y tabular; el rótulo va encima, pequeño y espaciado, como
          etiqueta; y la bandera con "España" se separan a la derecha, que es
          la aclaración, no el dato. El filete vertical marca ese corte.
        */}
        <div className="relative flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.6rem] font-semibold uppercase leading-none tracking-[0.18em] text-forest-700/80">
              Horario de referencia
            </p>
            <p className="mt-1.5 flex items-baseline gap-1.5 font-semibold leading-none text-forest-900">
              <Clock
                size={17}
                strokeWidth={2.2}
                className="shrink-0 translate-y-px text-forest-700"
              />
              <span className="text-[clamp(1.5rem,1.2rem+1vw,1.9rem)] tabular-nums tracking-tight">
                19:00
              </span>
              <span className="text-[0.82rem] font-medium text-forest-900/60">
                h
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span aria-hidden className="h-9 w-px bg-forest-900/12" />
            <div className="flex items-center gap-2">
              {/* La bandera va en un óvalo con el aspecto real 3:2 y no
                  recortada en un círculo: la rojigualda son tres franjas
                  horizontales y un recorte circular se come las de los
                  extremos, que es lo que la hace reconocible. */}
              <span className="relative block h-[15px] w-[22px] shrink-0 overflow-hidden rounded-[3px] shadow-[0_1px_3px_rgba(0,47,1,0.35),inset_0_0_0_1px_rgba(0,47,1,0.12)]">
                <Image
                  src="/espana.svg"
                  alt=""
                  fill
                  sizes="22px"
                  className="object-cover"
                  unoptimized
                />
              </span>
              <span className="text-[0.82rem] font-semibold text-forest-900/85">
                España
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
