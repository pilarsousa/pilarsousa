"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import styles from "./Experiencia.module.css";
import img1 from "@/../public/img1-pilar.jpg";
import img2 from "@/../public/img2-pilar.jpg";
import img3 from "@/../public/img3-pilar.jpg";

// The three day covers — each 600×450 (4:3) image already carries its own
// title and copy, so the card is just the artwork, no overlay.
const DAYS: StaticImageData[] = [img1, img2, img3];

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
 * The three-day journey as three portal cards. Each shows a sacred-geometry
 * image with the day number in gold over it; a dark bottom inset shadow grounds
 * the image into the card and carries the copy. Cards enter with a sober 3D
 * tilt, staggered. Three columns on desktop, stacked on mobile.
 */
/** One card's inner content — just the cover artwork. */
function CardMedia({ image }: { image: StaticImageData }) {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        placeholder="blur"
      />
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
          className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-foreground/60 sm:mt-8"
        >
          Una experiencia práctica de 3 días para identificar por qué tu vieja
          identidad bloquea tus manifestaciones, romper el patrón que limita tu
          potencial y acceder a una nueva identidad capaz de manifestar la
          realidad que deseas.
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
          {DAYS.map((image, i) => (
            <motion.li
              key={i}
              variants={card}
              whileHover={{ rotateX: -4, rotateY: 4, y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={cn(
                styles.card,
                "group overflow-hidden rounded-2xl border border-accent/15 bg-surface/30 transform-3d",
              )}
            >
              <CardMedia image={image} />
            </motion.li>
          ))}
        </motion.ul>

      </Container>
    </section>
  );
}
