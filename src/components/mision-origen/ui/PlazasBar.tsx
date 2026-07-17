"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

type PlazasBarProps = {
  /** Seats already sold — the value the bar fills up to. */
  sold: number;
  /** Total seats — the 100% end of the track. */
  total: number;
};

// Timing for the "loading" fill. Starts a beat after the bar scrolls into
// view (DELAY), then eases from 0 to the final value over DURATION.
const DELAY = 0.6;
const DURATION = 3;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Animated "plazas vendidas" progress bar.
 *
 * The fill, the ✦ head and the value all sweep from 0 to their final position
 * in sync when the bar first scrolls into view — like a live load. Isolated as
 * a client component so the Acceso section can stay server-rendered.
 */
export function PlazasBar({ sold, total }: PlazasBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const targetPct = (sold / total) * 100;

  // Drives fill width + head/value position (0 → targetPct).
  const pct = useMotionValue(0);
  const width = useTransform(pct, (v) => `${v}%`);
  const left = useTransform(pct, (v) => `${v}%`);

  // Counter for the sold number (0 → sold), rounded for display.
  const [display, setDisplay] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;

    const fill = animate(pct, targetPct, {
      duration: DURATION,
      delay: DELAY,
      ease: EASE,
    });
    const counter = animate(count, sold, {
      duration: DURATION,
      delay: DELAY,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return () => {
      fill.stop();
      counter.stop();
    };
  }, [inView, pct, count, targetPct, sold]);

  return (
    <div ref={ref} className="mt-3 flex items-center gap-3">
      {/* Left marker — start (0) */}
      <span className="font-display text-sm text-foreground/50">0</span>

      {/* Track */}
      <div className="relative h-3 flex-1 rounded-full bg-white/5">
        {/* Fill */}
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#f90281,#28bff1)]"
          style={{ width }}
          role="progressbar"
          aria-valuenow={sold}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label="Plazas vendidas"
        />
        {/* ✦ head at the fill end */}
        <motion.span
          aria-hidden
          className="absolute top-1/2 z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-lg text-ice-blue filter-[drop-shadow(0_0_8px_rgba(40,191,241,0.9))]"
          style={{ left }}
        >
          ✦
        </motion.span>
        {/* Current value below the fill end */}
        <motion.span
          className="absolute top-full mt-3 -translate-x-1/2 font-display text-sm text-cyan"
          style={{ left }}
        >
          {display}
        </motion.span>
      </div>

      {/* Right marker — total */}
      <span className="font-display text-sm text-foreground/50">{total}</span>
    </div>
  );
}
