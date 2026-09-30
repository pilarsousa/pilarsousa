"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/bootcamp-v2/ui/SectionTitle";
import { GoldText } from "@/components/bootcamp-v2/ui/GoldText";
import { ReviewCarousel } from "@/components/bootcamp-v2/ui/ReviewCarousel";
import { TrustScoreCard } from "@/components/bootcamp-v2/ui/TrustScoreCard";
import { FEATURED_TESTIMONIALS } from "@/components/lista-de-espera/content";

/**
 * Section 6 — Testimonials and social proof.
 *
 * Trustpilot summary + validation copy, then a carousel of written reviews —
 * the same ones the waitlist landing shows, as text cards instead of the old
 * screenshots, so they can be read at any size and opened in full.
 *
 * The carousel sits OUTSIDE the Container, full-bleed with faded edges, as on
 * the waitlist: inside the grid the row would end on a clean edge and read as
 * a list of four, not as a carousel with more to come.
 *
 * Every paragraph here is full cream at 16px minimum: at 70% opacity the copy
 * of this section was the hardest text on the page to read.
 */
export function Cierre() {
  return (
    <section id="cierre" className="bg-surface py-[clamp(4rem,2rem+8vh,7rem)]">
      <Container>
        <SectionTitle
          tone="dark"
          className="max-w-4xl text-[1.45rem] leading-snug sm:text-4xl lg:text-5xl"
        >
          Historias de transformación
        </SectionTitle>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-8 max-w-2xl text-center text-base leading-[1.8] text-foreground sm:text-lg"
        >
          Hace meses fundé el entrenamiento{" "}
          <span className="bc2-realce">Volver al Origen</span> y quiero que
          leas algunas de las historias de transformación.
        </motion.p>

        {/* TrustScore as the lead proof, centered; the validation copy follows
            below as supporting text (not a competing card). */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-12 flex flex-col items-center"
        >
          <TrustScoreCard />

          <div className="mt-10 max-w-xl text-center">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">
              Validado por quienes ya lo vivieron
            </p>
            <p className="mt-4 text-xl font-normal leading-snug text-foreground sm:text-2xl">
              <GoldText className="font-display font-semibold">4,9 / 5</GoldText>{" "}
              media de valoración entre nuestros alumnos.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              Después de 2 ediciones de Volver al Origen y más de 350 alumnos,
              cientos de personas ya han vivido esta experiencia y comenzado a
              transformar y manifestar una mejor realidad.
            </p>
            <p className="mt-4 text-balance text-base font-semibold leading-relaxed text-foreground">
              Este Bootcamp será la única puerta de entrada para acceder a{" "}
              {/* nowrap: the name must never break as "Volver al / Origen 3.0". */}
              <em className="whitespace-nowrap font-accent text-[1.15em] font-medium italic">
                Volver al Origen 3.0
              </em>
              .
            </p>
          </div>
        </motion.div>
      </Container>

      <div className="mt-8">
        <ReviewCarousel items={FEATURED_TESTIMONIALS} />
      </div>
    </section>
  );
}
