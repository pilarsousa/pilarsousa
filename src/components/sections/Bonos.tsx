"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck2,
  ClipboardCheck,
  Layers,
  Route,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaButton } from "@/components/ui/CtaButton";
import { CHECKOUT_URL } from "@/lib/links";
import banner from "@/../public/banner-web-bonos.jpg";
import bannerMobile from "@/../public/banner-web-bonos-mobile.jpg";

const BONUSES: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Entregables diarios",
    description:
      "Ejercicios por clase para pasar la teoría a acciones concretas.",
    icon: CalendarCheck2,
  },
  {
    title: "Sistema paso a paso",
    description:
      "Una guía para identificar el patrón que hoy limita tus manifestaciones.",
    icon: Layers,
  },
  {
    title: "Plan de ejecución",
    description:
      "Acciones diarias para ordenar lo aprendido y avanzar sin perderte.",
    icon: ClipboardCheck,
  },
  {
    title: "Roadmap final",
    description:
      "Una ruta clara para sostener el proceso después del bootcamp.",
    icon: Route,
  },
];

/**
 * Section 5 — Bonuses, reframed as practical takeaways.
 *
 * The artwork keeps the premium product feel, while the copy now explains what
 * each deliverable contains and how it helps the user act from day one.
 */
export function Bonos() {
  return (
    <section
      id="bonos"
      className="bg-background pt-2 pb-[clamp(4rem,2rem+8vh,7rem)]"
    >
      <Container>
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
          <div
            aria-hidden
            style={{ backgroundImage: `url(${bannerMobile.src})` }}
            className="absolute inset-0 bg-cover bg-top bg-no-repeat sm:hidden"
          />
          <div
            aria-hidden
            style={{ backgroundImage: `url(${banner.src})` }}
            className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat sm:block"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute -right-13 top-8 z-20 rotate-45"
          >
            <div className="relative flex w-52 items-center justify-center overflow-hidden border-y border-accent/40 bg-ink/90 py-1.5 text-center shadow-[0_6px_16px_-6px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-cream-gold/60 to-transparent animate-sheen" />
              <span className="relative font-display text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream-gold">
                Bonus extras
              </span>
            </div>
          </div>

          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_86%,transparent)_58%,transparent_100%)]"
          />

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 py-7 text-center sm:px-10 sm:py-9">
            <p className="mx-auto max-w-3xl font-sans text-base font-medium leading-relaxed text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] sm:text-lg">
              En cada clase recibirás ejercicios concretos y un plan diario
              para identificar el patrón que te limita, decidir desde tu nueva
              identidad y sostenerla en el siguiente paso.
            </p>
          </div>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 grid max-w-285 gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BONUSES.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="relative rounded-2xl p-px bg-[conic-gradient(from_var(--border-angle),transparent_0%,transparent_8%,var(--color-gold)_13%,var(--color-gold-soft)_17%,transparent_24%,transparent_100%)] shadow-[0_18px_45px_-32px_rgba(0,0,0,0.9)] animate-border-spin"
            >
              {/* Opaque face — must fully hide the conic gradient behind it so
                  only the 1px ring at the edge reads as a moving gold border,
                  not a glow bleeding through the card's center. */}
              <div className="relative h-full overflow-hidden rounded-[calc(1rem-1px)] bg-ink p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-px rounded-[calc(1rem-2px)] border border-white/8"
                />
                <div className="relative mb-2 flex items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-sm font-semibold text-foreground sm:text-base">
                    {title}
                  </h3>
                </div>
                <p className="relative font-sans text-[0.82rem] leading-relaxed text-foreground/68">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </motion.ul>

        {/* CTA below the bonus cards — keeps momentum going into the offer. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex justify-center"
        >
          <CtaButton href={CHECKOUT_URL} external>
            Quiero acceder al bootcamp
          </CtaButton>
        </motion.div>
      </Container>
    </section>
  );
}
