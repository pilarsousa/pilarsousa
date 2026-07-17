"use client";

import { motion, type Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds — chain reveals within a section. */
  delay?: number;
  /** Direction the element travels in from. Default: "up". */
  from?: "up" | "down" | "none";
};

const OFFSET = 24;

function buildVariants(from: RevealProps["from"], delay: number): Variants {
  const y = from === "up" ? OFFSET : from === "down" ? -OFFSET : 0;
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
}

/**
 * Scroll-reveal wrapper. Fades + slides content into view once, when it
 * enters the viewport. Isolated as a client component so sections can
 * stay server-rendered.
 */
export function Reveal({ children, className, delay = 0, from = "up" }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={buildVariants(from, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
