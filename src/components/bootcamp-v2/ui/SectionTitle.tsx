"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  children: React.ReactNode;
  /** Color tone for the divider + base text, per section background. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Shared section heading — the ONE place that defines the title pattern used
 * across every section: a gold divider that draws in, then the heading rising
 * into view. Same size and type everywhere (the Hero promise is the only
 * exception). Color adapts to the section background via `tone`.
 *
 * Emphasis inside the heading is done by the caller with <em className="font-accent">
 * (Cormorant italic) — never Cinzel on long copy.
 */
export function SectionTitle({ children, tone = "dark", className }: SectionTitleProps) {
  const text = tone === "light" ? "text-forest-900" : "text-foreground";

  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mx-auto max-w-3xl font-sans text-2xl font-light leading-tight sm:text-3xl lg:text-4xl",
          // Cormorant accents (.font-accent) have a lower x-height than Manrope,
          // so bump them up to read at the same visual size as the body type.
          "[&_.font-accent]:text-[1.25em]",
          text,
          className,
        )}
      >
        {children}
      </motion.h2>
    </div>
  );
}
