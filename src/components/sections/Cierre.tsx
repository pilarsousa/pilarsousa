"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GoldText } from "@/components/ui/GoldText";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { TrustScoreCard } from "@/components/ui/TrustScoreCard";
// New testimonials — IMG_5250 leads, then the rest, ahead of the originals.
import img5250 from "@/../public/Testimonios/IMG_5250.png";
import img5243 from "@/../public/Testimonios/IMG_5243.png";
import img5244 from "@/../public/Testimonios/IMG_5244.png";
import img5245 from "@/../public/Testimonios/IMG_5245.png";
import img5246 from "@/../public/Testimonios/IMG_5246.png";
import img5247 from "@/../public/Testimonios/IMG_5247.png";
import img5248 from "@/../public/Testimonios/IMG_5248.png";
import img5249 from "@/../public/Testimonios/IMG_5249.png";
import t0 from "@/../public/Testimonios/testimonio.png";
import t1 from "@/../public/Testimonios/testimonio1.png";
import t2 from "@/../public/Testimonios/testimonio2.png";
import t3 from "@/../public/Testimonios/testimonio3.png";
import t4 from "@/../public/Testimonios/testimonio4.png";
import t5 from "@/../public/Testimonios/testimonio5.png";
import t6 from "@/../public/Testimonios/testimonio6.png";
import t7 from "@/../public/Testimonios/testimonio7.png";
import t8 from "@/../public/Testimonios/testimonio8.png";
import t9 from "@/../public/Testimonios/testimonio9.png";
import t10 from "@/../public/Testimonios/testimonio10.png";

// Real Trustpilot review screenshots — verifiable social proof. IMG_5250 leads,
// followed by the rest of the new batch, then the original screenshots.
const TESTIMONIALS = [
  img5250,
  img5243,
  img5244,
  img5245,
  img5246,
  img5247,
  img5248,
  img5249,
  t0,
  t1,
  t2,
  t3,
  t4,
  t5,
  t6,
  t7,
  t8,
  t9,
  t10,
];

/**
 * Section 6 — Testimonials + opening of 100 spaces + final CTA.
 *
 * The close. A horizontal carousel of real Trustpilot review screenshots, then
 * the emotional peak: a dark panel announcing the 100 spaces with the number
 * "100" in living gold, framed as an invitation — not aggressive scarcity.
 */
export function Cierre() {
  return (
    <section id="cierre" className="bg-surface py-[clamp(4rem,2rem+8vh,7rem)]">
      <Container>
        {/* Personal, larger opening title (client direction). Size override
            here only — SectionTitle stays the shared default everywhere else. */}
        {/* Single opening title (client direction): the founding line and the
            "transformation stories" framing merged into one. Size override
            here only — SectionTitle stays the shared default everywhere else. */}
        <SectionTitle
          tone="dark"
          className="max-w-4xl text-[1.45rem] leading-snug sm:text-4xl lg:text-5xl"
        >
          Hace tres meses fundé mi academia{" "}
          <em className="font-accent font-medium italic text-accent-soft">
            Volver al Origen
          </em>{" "}
          y son algunas de las historias de transformación
        </SectionTitle>

        {/* Intro body — distilled from the client's notes. The "+60%" metric and
            Trustpilot integration are intentionally left out until verified. */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-foreground/70"
        >
          Volver al Origen nació para bajar la espiritualidad a lo práctico: un
          sistema para reprogramar tu identidad y usarlo en la vida real. Y no lo
          decimos nosotros — lo dicen las personas que ya hicieron el proceso.
        </motion.p>

        {/* TrustScore as the lead proof, centered; the validation + first-edition
            note follows below as supporting copy (not a competing card). */}
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
            <p className="mt-4 text-xl font-light leading-snug text-foreground sm:text-2xl">
              <GoldText className="font-display font-semibold">4,8</GoldText> de
              valoración media entre nuestros alumnos.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/70">
              En la primera edición solo dejamos entrar{" "}
              <span className="font-semibold text-foreground">150 personas</span>.
              Esta es tu oportunidad de formar parte desde el origen.
            </p>
          </div>
        </motion.div>

        {/* Real Trustpilot review screenshots in a horizontal carousel. */}
        <div className="mt-16">
          <TestimonialCarousel items={TESTIMONIALS} />
        </div>

        {/* Closing invitation — no frame, flowing as a natural continuation.
            Reframed per client: no fixed number of spots, the bootcamp as the
            only place plazas open and the filter for the most committed. */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 text-center"
        >
          <p className="mx-auto max-w-3xl font-sans text-2xl font-light leading-snug text-foreground sm:text-3xl lg:text-4xl">
            Al terminar el tercer día, abriré plazas para{" "}
            <GoldText className="font-display font-semibold">
              trabajar conmigo
            </GoldText>
            .
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-foreground/70">
            Este será el único espacio donde abriré plazas para acceder a{" "}
            <em className="font-accent text-[1.15em] italic text-accent-soft">
              Volver al Origen
            </em>{" "}
            — el filtro para elegir a las personas más comprometidas con su
            proceso de transformación y con la excelencia.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
