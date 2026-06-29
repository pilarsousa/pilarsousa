"use client";

import { motion, type Variants } from "framer-motion";
import {
  BookOpen,
  Flame,
  Compass,
  Lightbulb,
  RotateCcw,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

// The six recognizable symptoms of the invisible block — written for
// identification ("this happens to you"), not deep diagnosis. Icons are
// abstract: each suggests the symptom without illustrating it literally.
const PATTERNS: Array<{ icon: LucideIcon; text: string }> = [
  { icon: BookOpen, text: "Consumes mucha información, pero no ves resultados." },
  { icon: Flame, text: "Tienes motivación un día, pero no logras sostenerla." },
  { icon: Compass, text: "Te falta claridad sobre cómo dar los siguientes pasos." },
  { icon: Lightbulb, text: "Sabes mucho, pero te cuesta aplicarlo en el día a día." },
  { icon: RotateCcw, text: "Empiezas con todo, pero a las semanas vuelves a lo de siempre." },
  { icon: Lock, text: "Sientes que algo invisible te frena, aunque no sabes qué es." },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Section 3 — Problem / Unconscious pattern.
 *
 * The emotional core, on a warm-cream stage (a deliberate light break between
 * dark sections). A gold divider opens it. Emphasis comes from Cormorant
 * italic on short phrases — never Cinzel on long copy. Six carved cards name
 * the patterns; the closing truth lands in plain, readable body type.
 */
export function Patron() {
  return (
    <section
      id="patron"
      className="bg-cream text-forest-900 py-[clamp(4rem,2rem+8vh,7rem)]"
    >
      <Container>
        {/* Reframing headline — now leads with the conscious/unconscious split
            (client direction). Emphasis via Cormorant italic, never Cinzel caps. */}
        <SectionTitle tone="light">
          Conscientemente quieres cambiar, pero{" "}
          <em className="font-accent font-medium italic text-earth-gold">
            inconscientemente
          </em>{" "}
          no.
        </SectionTitle>

        {/* Highlighted truth — the invisible block. */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-8 max-w-2xl text-center font-accent text-2xl italic text-earth-gold sm:text-3xl"
        >
          Se crea, en el plano espiritual, un bloqueo invisible.
        </motion.p>

        {/* The old headline, now demoted to a body line after the block. */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-forest-900/70"
        >
          Quieres una nueva realidad, pero una parte de ti todavía protege la
          identidad que sostiene tu vieja realidad.
        </motion.p>

        {/* Re-introduces the list. */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-forest-900/70"
        >
          Y seguramente te pase lo siguiente:
        </motion.p>

        {/* The six patterns as carved cards — inset shadows on a light face. */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PATTERNS.map(({ icon: Icon, text }) => (
            <motion.li
              key={text}
              variants={card}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-start gap-4 rounded-2xl border border-earth-gold/20 bg-white/50 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_0_24px_0_rgba(122,100,66,0.07)] transition-all duration-300 hover:border-earth-gold/45 active:border-earth-gold/60 active:bg-white/70 active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_8px_24px_-12px_rgba(122,100,66,0.5)]"
            >
              {/* Icon medallion beside the text — carved seal that warms on tap. */}
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-earth-gold/30 bg-cream text-earth-gold shadow-[inset_0_0_12px_0_rgba(122,100,66,0.12)] transition-colors duration-300 group-active:border-earth-gold/60 group-active:bg-cream-gold/40">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <p className="text-base leading-relaxed text-forest-900/85">
                {text}
              </p>
            </motion.li>
          ))}
        </motion.ul>

      </Container>
    </section>
  );
}
