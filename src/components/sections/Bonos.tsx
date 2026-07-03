"use client";

import { motion } from "framer-motion";
import { Layers, Route, ClipboardCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import banner from "@/../public/banner-web-bonos.jpg";
import bannerMobile from "@/../public/banner-web-bonos-mobile.jpg";

// The three takeaway resources the user keeps after the bootcamp, each with
// an icon so they read as concrete, valuable deliverables — not a plain list.
const BONUSES: Array<{ name: string; icon: LucideIcon }> = [
  { name: "Sistema", icon: Layers },
  { name: "Roadmap", icon: Route },
  { name: "Plan de ejecución", icon: ClipboardCheck },
];

/**
 * Section 5 — Bonuses, reframed as a compact banner (not a full section).
 *
 * Per client direction: a single ~1140×500 banner with a background image of
 * the three packaged bonuses (centered, reading toward the top). Copy sits in a
 * gradient strip along the bottom so it stays legible over any artwork. Kept
 * small on purpose so it doesn't outweigh the primary CTA above.
 */
export function Bonos() {
  return (
    <section
      id="bonos"
      className="bg-background pt-2 pb-[clamp(4rem,2rem+8vh,7rem)]"
    >
      <Container>
        {/* Title above the banner (client direction): the bonus framing promoted
            from a small in-image pill to a proper section headline. */}
        <SectionTitle tone="dark" className="mb-6 sm:mb-10">
          Bonus extra por acceder al{" "}
          <em className="font-accent font-medium italic text-accent-soft">
            bootcamp
          </em>
        </SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-115 max-w-285 overflow-hidden rounded-3xl border border-accent/20 bg-surface/30 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(243,226,176,0.08)] sm:h-100"
        >
          {/* Background artwork — responsive: a vertical crop on mobile, the
              wide web banner on sm+. Each layer shows only at its breakpoint. */}
          <div
            aria-hidden
            style={{ backgroundImage: `url(${bannerMobile.src})` }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden"
          />
          <div
            aria-hidden
            style={{ backgroundImage: `url(${banner.src})` }}
            className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat sm:block"
          />

          {/* Diagonal "gift" ribbon across the top-right corner, clipped clean
              by the card's overflow — text centered, gold-on-dark + sheen. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-13 top-8 z-20 rotate-45"
          >
            <div className="relative flex w-52 items-center justify-center overflow-hidden border-y border-accent/40 bg-ink/90 py-1.5 text-center shadow-[0_6px_16px_-6px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              {/* Continuous light sheen sweeping across the ribbon. */}
              <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-cream-gold/60 to-transparent animate-sheen" />
              <span className="relative font-display text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream-gold">
                Bonus extras
              </span>
            </div>
          </div>

          {/* Bottom gradient strip — a deeper, taller fade so the bonus copy
              reads as a solid premium block, not text fighting the artwork. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,var(--color-ink)_0%,var(--color-ink)_30%,color-mix(in_oklab,var(--color-ink)_80%,transparent)_60%,transparent)]"
          />

          {/* Copy, seated in the bottom strip. */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-8 text-center sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Diseñado para generar{" "}
              {/* Force a 2-line break on mobile; single line on sm+. */}
              <br className="sm:hidden" />
              <em className="font-accent font-medium italic text-accent-soft">
                resultados tangibles
              </em>
            </h2>

            {/* The three takeaway resources as premium icon chips with a
                rotating gold border (same beam as the limited-time badge).
                Mobile uses a 2-column grid (never a single stacked column),
                with the third chip centered on its own row; sm+ is a centered
                inline row. */}
            <ul className="mx-auto mt-6 grid max-w-sm grid-cols-2 place-items-center gap-2 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-3 [&>li:last-child]:col-span-2 sm:[&>li:last-child]:col-span-1">
              {BONUSES.map(({ name, icon: Icon }) => (
                <li key={name} className="w-full sm:w-auto">
                  {/* Rotating gold beam wrapper — a thin gradient ring behind
                      the dark chip face. */}
                  <span className="relative flex rounded-full p-px bg-[conic-gradient(from_var(--border-angle),transparent_0%,var(--color-gold)_15%,var(--color-gold-soft)_25%,transparent_40%,transparent_100%)] animate-border-spin sm:inline-flex">
                    <span className="flex w-full items-center justify-center gap-2 rounded-full bg-ink/85 py-2 pl-2 pr-3 backdrop-blur-sm sm:justify-start sm:gap-2.5 sm:pr-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent">
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-sm font-medium tracking-wide text-foreground">
                        {name}
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
