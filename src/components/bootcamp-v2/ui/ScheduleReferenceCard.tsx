import Image from "next/image";
import { CalendarDays, Compass, Radio } from "lucide-react";
import { cn } from "@/lib/cn";

type ScheduleReferenceCardProps = {
  className?: string;
};

/**
 * Compact schedule card used anywhere the landing needs to show the reference
 * time without making the event feel Spain-only.
 */
export function ScheduleReferenceCard({
  className,
}: ScheduleReferenceCardProps) {
  return (
    <div
      className={cn(
        "group relative w-fit max-w-full overflow-hidden rounded-2xl p-px",
        /* El anillo que gira pasa al VERDE. En crema era invisible: la cara de
           la tarjeta ahora es clara y un filo crema sobre crema no existe. */
        "bg-[conic-gradient(from_var(--border-angle),transparent_0%,transparent_18%,var(--bc2-verde-2)_32%,var(--bc2-verde)_38%,transparent_52%,transparent_100%)]",
        "shadow-[0_14px_36px_var(--bc2-velo-leve)] animate-border-spin",
        className,
      )}
    >
      <div className="bc2-carta-clara relative overflow-hidden rounded-[calc(1rem-1px)] px-3.5 py-3">
        <div className="relative flex max-w-[21rem] flex-wrap items-center justify-center gap-2">
          <span className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-forest-900/18 bg-forest-900/6 px-3 py-1.5 text-center text-xs font-semibold text-forest-900/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <CalendarDays size={13} className="shrink-0 text-forest-700" />
            10 · 11 · 12 de julio
          </span>
          <span className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-forest-900/18 bg-forest-900/6 px-3 py-1.5 text-center text-xs font-semibold text-forest-900/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <Radio size={13} className="shrink-0 text-forest-700" />
            3 días en vivo
          </span>
          <span className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-forest-900/18 bg-forest-900/6 px-3 py-1.5 text-center text-xs font-semibold text-forest-900/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <Compass size={13} className="shrink-0 text-forest-700" />
            Metafísica práctica
          </span>
        </div>

        <div className="relative my-3 h-px w-full bg-[linear-gradient(to_right,transparent,var(--bc2-verde-2),transparent)] opacity-30" />

        <div className="relative flex items-center justify-center gap-3">
          <div className="relative size-[54px] shrink-0 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--bc2-verde-2)_35%,transparent),transparent_68%)] p-0.5 shadow-[0_0_22px_color-mix(in_srgb,var(--bc2-verde-2)_22%,transparent)]">
            <div className="relative size-full overflow-hidden rounded-full border-2 border-forest-900/35 shadow-[0_4px_12px_var(--bc2-velo-leve)]">
              <Image
                src="/espana.svg"
                alt="España"
                fill
                sizes="54px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/55 to-transparent animate-sheen"
              />
            </div>
          </div>

          <div className="min-w-0 text-left">
            <p className="font-display text-[0.62rem] font-semibold uppercase leading-none tracking-[0.22em] text-forest-700">
              Horario de referencia
            </p>
            <p className="mt-1 font-display text-[clamp(1.35rem,1.05rem+1vw,1.7rem)] uppercase leading-none tracking-[0.08em] text-forest-900">
              19:00 · España
            </p>
          </div>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-[linear-gradient(to_right,transparent,var(--bc2-verde-2),transparent)] opacity-20"
        />
      </div>
    </div>
  );
}
