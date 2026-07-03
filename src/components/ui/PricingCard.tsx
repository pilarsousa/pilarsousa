import { Sparkles } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { GoldText } from "@/components/ui/GoldText";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { Countdown } from "@/components/ui/Countdown";
import { ScheduleReferenceCard } from "@/components/ui/ScheduleReferenceCard";
import { CHECKOUT_URL, BOOTCAMP_START } from "@/lib/links";

/**
 * PricingCard — the offer, framed as a ritual object.
 *
 * Not a generic SaaS pricing box. It speaks the landing's own language:
 * gold hairlines (border-image), a radial gold halo behind the price,
 * GoldText shimmer on the number, FactBadges for the concrete facts, and
 * the primary CtaButton. Corner accents and a limited-time pill push the
 * brand vocabulary one notch further than it appears anywhere else on the
 * page — breaking the pattern WITHOUT breaking the coherence.
 *
 * Server Component: no client hooks, pure CSS motion inherited from children.
 */
export function PricingCard() {
  return (
    <div className="relative mx-auto max-w-md">
      {/* Ambient gold glow behind the card — now a soft breathing halo
          (swells + fades, never fully off) so the offer feels alive. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-4xl bg-[radial-gradient(circle_at_50%_30%,color-mix(in_srgb,var(--color-gold)_20%,transparent),transparent_70%)] blur-2xl animate-glow-pulse"
      />

      {/* Volume simulated by stacked radial lights (forest/gold tint) instead
          of a flat shadow — gives the card real depth on its top-left. */}
      <div className="relative isolate overflow-hidden rounded-3xl border border-accent/20 bg-[radial-gradient(105%_80%_at_50%_140%,color-mix(in_oklab,var(--color-forest-700)_55%,transparent)_0%,transparent_100%),radial-gradient(71%_56%_at_40%_8%,color-mix(in_oklab,var(--color-forest-700)_35%,transparent)_0%,transparent_100%),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-cream-gold)_10%,transparent)_0%,var(--color-ink)_70%)] px-8 py-10 backdrop-blur-sm">
        {/* Corner accents — thin gold brackets on all four corners. */}
        <span aria-hidden className="pointer-events-none absolute left-4 top-4 h-6 w-6 rounded-tl-lg border-l border-t border-accent/50" />
        <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-6 w-6 rounded-tr-lg border-r border-t border-accent/50" />
        <span aria-hidden className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 rounded-bl-lg border-b border-l border-accent/50" />
        <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-br-lg border-b border-r border-accent/50" />

        {/* Limited-time pill — glowing rotating border + sheen. */}
        <div className="flex justify-center">
          <GlowBadge icon={<Sparkles size={13} />}>Por tiempo limitado</GlowBadge>
        </div>

        {/* Price — the visual peak. Radial halo behind a large GoldText number.
            Anchor (397 €) sits beside the hero price, struck through and clearly
            visible, so 44 € reads as a real discount against a real reference. */}
        <div className="relative mt-8 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-gold)_22%,transparent),transparent_70%)] blur-xl"
          />

          <div className="flex flex-col items-center">
            {/* Struck-through anchor above the hero price, centered, brighter so
                it reads clearly (no dim gray). */}
            <span className="font-display text-2xl font-medium text-foreground/85 line-through decoration-accent decoration-2 sm:text-3xl">
              397 €
            </span>
            <span className="mt-1 font-display text-[clamp(3.75rem,2rem+9vw,5.5rem)] font-bold leading-none">
              <GoldText>44</GoldText>
              <span className="ml-1 align-top font-sans text-xl font-medium tracking-wide text-foreground">
                €
              </span>
            </span>
          </div>

          <p className="mt-4 font-display text-xs uppercase tracking-[0.3em] text-accent">
            Precio especial de lanzamiento
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <ScheduleReferenceCard />
        </div>

        {/* Countdown to the bootcamp start — drives urgency. Given its own
            padded box so the unit tiles breathe instead of hugging the edges. */}
        <div className="mt-9 rounded-2xl border border-accent/15 bg-ink/30 px-4 py-6 sm:px-6">
          <p className="mb-5 text-center font-display text-[0.7rem] uppercase tracking-[0.3em] text-foreground/85">
            La experiencia comienza en
          </p>
          <Countdown target={BOOTCAMP_START} />
        </div>

        {/* Primary CTA — forced to a single line. */}
        <div className="mt-9 flex justify-center">
          <CtaButton href={CHECKOUT_URL} external block>
            Resetear mi identidad
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
