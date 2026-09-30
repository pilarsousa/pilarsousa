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
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/bootcamp-v2/ui/SectionTitle";
import { cn } from "@/lib/cn";

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

        {/* Las tarjetas CONTRASTAN con su sección: la sección es crema, así que
            la cara va en verde. El relieve y la rejilla los pone .bc2-carta-verde.

            ── BENTO: 3 ARRIBA, 2 ABAJO, MISMO ANCHO TOTAL ──

            En escritorio la rejilla es de 6 columnas: las tres primeras ocupan
            2 cada una y las dos últimas 3 cada una, así la segunda fila llena
            el mismo ancho que la primera en vez de dejar un hueco a la derecha.

            A 2 columnas (tablet) la quinta quedaría sola a media fila: ahí
            ocupa las dos. */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6"
        >
          {PATTERNS.map(({ icon: Icon, text }, i) => (
            <motion.li
              key={text}
              variants={card}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "bc2-carta-verde group relative flex items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:brightness-115 active:brightness-125",
                i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                i === PATTERNS.length - 1 && "sm:col-span-2 lg:col-span-3",
              )}
            >
              {/* El medallón se invierte con la tarjeta: sobre la cara verde pasa a
                  ser un disco crema con el icono en verde. Es la única pieza
                  clara de la tarjeta, así que marca dónde empieza a leerse. */}
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream text-forest-900 shadow-[inset_0_-4px_8px_-6px_rgba(0,47,1,0.5),0_2px_8px_-2px_rgba(0,0,0,0.45)] transition-transform duration-300 group-active:scale-95">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <p className="text-base leading-relaxed text-foreground/90">
                {text}
              </p>
            </motion.li>
          ))}
        </motion.ul>

      </Container>
    </section>
  );
}
