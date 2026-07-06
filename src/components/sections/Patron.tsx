"use client";

import { motion, type Variants } from "framer-motion";
import {
  BrainCircuit,
  CloudFog,
  EyeOff,
  LibraryBig,
  Repeat2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

// Five recognizable pain points for the right-fit audience. Icons stay
// symbolic: each one reinforces the pattern without turning the card into a
// literal illustration.
const PATTERNS: Array<{ icon: LucideIcon; text: string }> = [
  {
    icon: LibraryBig,
    text: "Llevas años consumiendo espiritualidad… pero tu vida sigue sin cambiar.",
  },
  {
    icon: Repeat2,
    text: "Sabes lo que tienes que hacer… pero siempre vuelves al mismo patrón.",
  },
  {
    icon: BrainCircuit,
    text: "Sientes que te autosaboteas, aunque no entiendes por qué.",
  },
  {
    icon: CloudFog,
    text: "Cada vez consumes más información… y cada vez tienes menos claridad.",
  },
  {
    icon: EyeOff,
    text: "Estás cansado de entender la teoría y no verla reflejada en tu realidad.",
  },
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
 * Section 3 — Right-fit audience / Pain points.
 *
 * The emotional core, on a warm-cream stage (a deliberate light break after
 * the dark manifesto). Five carved cards name the pains that qualify the
 * reader for the bootcamp.
 */
export function Patron() {
  return (
    <section
      id="patron"
      className="bg-cream text-forest-900 py-[clamp(4rem,2rem+8vh,7rem)]"
    >
      <Container>
        <SectionTitle tone="light">
          Este bootcamp es para ti{" "}
          <em className="font-accent font-medium italic text-earth-gold">
            si…
          </em>
        </SectionTitle>

        {/* Pain points as carved cards — inset shadows on a light face. */}
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
