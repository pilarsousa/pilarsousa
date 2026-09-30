"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/bootcamp-v2/ui/SectionTitle";
import { cn } from "@/lib/cn";
import styles from "./Experiencia.module.css";
/*
  Las tres fotos son apaisadas (xp-1 16:9, xp-2 y xp-3 4:3) y con el lado
  izquierdo oscuro —la lluvia de código—, que es justo donde va el texto.

  ⚠️ SON PEQUEÑAS: 500-600px de ancho. En una tarjeta de escritorio (~390px) a
  pantalla de densidad 2x harían falta ~800px, así que ahí se ven algo
  blandas. Si llegan versiones mayores, basta con sustituir los archivos.
*/
import img1 from "@/../public/bootcamp-v2/xp-1.jpg";
import img2 from "@/../public/bootcamp-v2/xp-2.jpg";
import img3 from "@/../public/bootcamp-v2/xp-3.jpg";

// The three days. The image is only the background: the day badge and the
// promise are real text over it, so they can be edited and read by screen
// readers and search engines.
const DAYS: Array<{ image: StaticImageData; day: string; text: string }> = [
  {
    image: img1,
    day: "Día 1",
    text: "Identifica por qué tu vieja identidad bloquea tus manifestaciones",
  },
  {
    image: img2,
    day: "Día 2",
    text: "Rompe el viejo patrón que limita todo tu potencial",
  },
  {
    image: img3,
    day: "Día 3",
    text: "Sal con un plan de acción concreto para sostener una nueva identidad capaz de manifestar lo que desees.",
  },
];

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

// 3D entrance: cards swing up and forward from a slight lean, staggered.
const card: Variants = {
  hidden: { opacity: 0, y: 48, rotateX: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Section 4 — What you will experience inside.
 *
 * The three-day journey as three cards: the photo fills the card and the day
 * badge + promise sit at the bottom, left-aligned, over a green scrim that
 * rises from the bottom edge. Cards enter with a sober 3D tilt, staggered.
 * Three columns on desktop, stacked on mobile.
 */
function DayCard({
  image,
  day,
  text,
}: {
  image: StaticImageData;
  day: string;
  text: string;
}) {
  return (
    // 4:3, the images' own shape: a taller card would crop the landscape
    // artwork hard and upscale files that are only 500-600px wide.
    <div className="relative flex aspect-4/3 w-full flex-col justify-end overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
        placeholder="blur"
      />

      {/* Legibility scrim — brand green, not black, rising from the bottom
          and gone by the middle so the photo keeps its top half clean. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--bc2-fondo)_0%,var(--bc2-velo)_28%,transparent_62%)]"
      />

      <div className="p-5 text-left sm:p-6">
        <span className="inline-flex items-center rounded-full bg-cream px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-forest-900 shadow-[inset_0_-2px_4px_-2px_rgba(0,47,1,0.35),0_2px_8px_-2px_rgba(0,0,0,0.4)]">
          {day}
        </span>
        <p className="mt-3 text-pretty text-base font-semibold leading-snug text-foreground sm:text-lg">
          {text}
        </p>
      </div>
    </div>
  );
}

export function Experiencia() {
  return (
    <section
      id="experiencia"
      className="bg-background pt-[clamp(4rem,2rem+8vh,7rem)] pb-[clamp(2rem,1rem+4vh,3.5rem)]"
    >
      <Container>
        <SectionTitle tone="dark">
          Lo que{" "}
          <em className="font-accent font-medium italic text-accent-soft">
            experimentarás
          </em>{" "}
          dentro:
        </SectionTitle>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-4 max-w-2xl text-center text-base leading-[1.8] text-foreground sm:mt-8"
        >
          {/* Same .bc2-realce as the Hero description, on the two ideas that
              carry the promise: the format and the outcome. More than two
              and the highlight stops pointing at anything. */}
          <span className="bc2-realce">Una experiencia práctica de 3 días</span>{" "}
          para identificar por qué tu vieja identidad bloquea tus
          manifestaciones, romper el patrón que limita tu potencial y acceder a{" "}
          <span className="bc2-realce">una nueva identidad</span> capaz de
          manifestar la realidad que deseas.
        </motion.p>

        {/* Clean responsive grid: 1 column on mobile, 3 on desktop. The
            accumulating GSAP stack was dropped — it misbehaved with async
            image sizing on mobile and a solid grid reads premium anyway. */}
        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-6 perspective-distant md:grid-cols-3"
        >
          {DAYS.map(({ image, day, text }) => (
            <motion.li
              key={day}
              variants={card}
              whileHover={{ rotateX: -4, rotateY: 4, y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={cn(
                styles.card,
                "group isolate overflow-hidden rounded-2xl border border-accent/15 bg-surface/30 transform-3d",
              )}
            >
              <DayCard image={image} day={day} text={text} />
            </motion.li>
          ))}
        </motion.ul>

      </Container>
    </section>
  );
}
