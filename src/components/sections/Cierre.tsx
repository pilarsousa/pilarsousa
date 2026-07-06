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
 * Section 6 — Testimonials and social proof.
 *
 * A Trustpilot proof block followed by a horizontal carousel of real review
 * screenshots. The invitation to Volver al Origen is kept in the proof copy so
 * it does not repeat below the carousel.
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
          className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-foreground/70"
        >
          Hace tres meses fundé mi academia{" "}
          <em className="font-accent text-[1.12em] italic text-accent-soft">
            Volver al Origen
          </em>{" "}
          y estas son algunas de las historias de transformación.
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
              <GoldText className="font-display font-semibold">4,8 / 5</GoldText>{" "}
              media de valoración entre nuestros alumnos.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/70">
              En la primera edición solo dejamos entrar{" "}
              <span className="font-semibold text-foreground">150 personas</span>.
              Este será el único espacio donde abriré plazas para acceder a{" "}
              <em className="font-accent text-[1.12em] italic text-accent-soft">
                Volver al Origen
              </em>
              .
            </p>
          </div>
        </motion.div>

        {/* Real Trustpilot review screenshots in a horizontal carousel. */}
        <div className="mt-8">
          <TestimonialCarousel items={TESTIMONIALS} />
        </div>
      </Container>
    </section>
  );
}
