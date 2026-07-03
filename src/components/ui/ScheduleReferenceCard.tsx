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
        "bg-[conic-gradient(from_var(--border-angle),transparent_0%,transparent_18%,var(--color-gold)_32%,var(--color-cream-gold)_38%,transparent_52%,transparent_100%)]",
        "shadow-[0_14px_36px_rgba(0,0,0,0.45),0_0_34px_color-mix(in_srgb,var(--color-gold)_12%,transparent)] animate-border-spin",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[calc(1rem-1px)] border border-white/5 bg-[radial-gradient(70%_75%_at_50%_-10%,color-mix(in_srgb,var(--color-gold)_12%,transparent),transparent_70%),linear-gradient(180deg,rgba(14,13,11,0.98),rgba(5,5,5,0.96))] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_24px_rgba(200,164,90,0.06)]">
        <div className="relative flex max-w-[21rem] flex-wrap items-center justify-center gap-2">
          <span className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-accent/35 bg-ink/45 px-3 py-1.5 text-center text-xs font-semibold text-foreground/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <CalendarDays size={13} className="shrink-0 text-accent" />
            10 · 11 · 12 de julio
          </span>
          <span className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-accent/35 bg-ink/45 px-3 py-1.5 text-center text-xs font-semibold text-foreground/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Radio size={13} className="shrink-0 text-accent" />
            3 días en vivo
          </span>
          <span className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-accent/35 bg-ink/45 px-3 py-1.5 text-center text-xs font-semibold text-foreground/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Compass size={13} className="shrink-0 text-accent" />
            Metafísica práctica
          </span>
        </div>

        <div className="relative my-3 h-px w-full bg-[linear-gradient(to_right,transparent,var(--color-accent),transparent)] opacity-55" />

        <div className="relative flex items-center justify-center gap-3">
          <div className="relative size-[54px] shrink-0 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-gold)_45%,transparent),transparent_68%)] p-0.5 shadow-[0_0_22px_color-mix(in_srgb,var(--color-gold)_28%,transparent)]">
            <div className="relative size-full overflow-hidden rounded-full border-2 border-foreground shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
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
            <p className="font-display text-[0.62rem] font-semibold uppercase leading-none tracking-[0.22em] text-accent">
              Horario de referencia
            </p>
            <p className="mt-1 font-display text-[clamp(1.35rem,1.05rem+1vw,1.7rem)] uppercase leading-none tracking-[0.08em] text-foreground drop-shadow-[0_0_10px_rgba(243,226,176,0.18)]">
              19:00 · España
            </p>
          </div>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-[linear-gradient(to_right,transparent,var(--color-cream-gold),transparent)] opacity-35"
        />
      </div>
    </div>
  );
}
