import Image from "next/image";
import { CalendarDays, Compass, Radio } from "lucide-react";
import { cn } from "@/lib/cn";

type ScheduleReferenceCardProps = {
  className?: string;
};

const PILLS = [
  { icon: CalendarDays, label: "9, 10 y 11 de octubre" },
  { icon: Radio, label: "3 días en vivo" },
  { icon: Compass, label: "Metafísica práctica" },
];

/**
 * Compact schedule card used anywhere the landing needs to show the reference
 * time without making the event feel Spain-only.
 *
 * ── PASTILLAS VERDES SOBRE CARA CLARA ──
 *
 * La tarjeta invierte el tono de su sección y las pastillas vuelven a
 * invertirlo: verde pleno con tinta crema. Es el tercer escalón de la misma
 * idea, y es lo que hace que los tres datos del formato se lean como etiquetas
 * y no como texto suelto dentro de un recuadro.
 *
 * ── EL ANCHO LO MANDA QUIEN LA USA ──
 *
 * En el hero se le pasan los 500px de la columna y las tres entran en una
 * fila; dentro del PricingCard el hueco es de ~384px y se reparten solas. Por
 * eso aquí dentro no hay ningún ancho: un max-w obligaría a elegir un único
 * comportamiento para los dos sitios.
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
      <div className="bc2-carta-clara relative overflow-hidden rounded-[calc(1rem-1px)] px-3.5 py-3.5">
        {/* Fila 1 — los tres datos del formato. */}
        <div className="relative flex flex-wrap items-center justify-center gap-1.5">
          {PILLS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full bg-forest-700 px-2.5 py-1.5 text-[0.72rem] font-semibold text-cream shadow-[inset_0_1px_0_rgba(255,248,240,0.16),0_2px_5px_-2px_rgba(0,47,1,0.5)]"
            >
              <Icon size={12} strokeWidth={2.2} className="shrink-0 text-cream/80" />
              {label}
            </span>
          ))}
        </div>

        {/*
          Fila 2 — el horario.

          Vuelve a la composición de antes —disco de bandera a la izquierda y
          el horario al lado— porque funcionaba: el disco ancla la fila y da
          un punto de entrada, y partirla en dos bloques separados por un
          filete dejaba los elementos sueltos sin eje común.

          Entre las dos filas ya no hay filete: el que había sumaba casi 30px
          de aire que no separaba nada que las pastillas no separasen solas.

          Lo que sí se mantiene de la revisión es la JERARQUÍA: el rótulo va
          arriba, pequeño y espaciado, como etiqueta; y la hora debajo, que es
          el dato, grande y tabular.

          El recorte circular NO se come las franjas de la bandera: la
          rojigualda es 3:2 y al cubrir un cuadrado se escala por la altura, así
          que se recorta a los lados y las tres franjas se ven enteras.
        */}
        <div className="relative mt-3 flex items-center justify-center gap-3.5">
          <div className="relative size-[52px] shrink-0 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--bc2-verde-2)_32%,transparent),transparent_70%)] p-0.5">
            <div className="relative size-full overflow-hidden rounded-full shadow-[0_2px_8px_rgba(0,47,1,0.4),inset_0_0_0_2px_rgba(0,47,1,0.22)]">
              <Image
                src="/espana.svg"
                alt="Bandera de España"
                fill
                sizes="52px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/45 to-transparent animate-sheen"
              />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[0.58rem] font-bold uppercase leading-none tracking-[0.2em] text-forest-700/85">
              Horario de referencia
            </p>
            <p className="mt-1.5 font-semibold leading-none text-forest-900">
              <span className="text-[1.6rem] tabular-nums tracking-tight">
                18:00
              </span>
              <span className="ml-1.5 text-[1.05rem] tracking-tight">
                · España
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
