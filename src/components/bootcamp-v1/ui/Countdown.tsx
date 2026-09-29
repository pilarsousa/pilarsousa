"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type CountdownProps = {
  /** ISO date string of the target moment (e.g. bootcamp start). */
  target: string;
  className?: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function computeTimeLeft(targetMs: number): TimeLeft {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: false,
  };
}

const UNITS: Array<{ key: keyof Omit<TimeLeft, "done">; label: string }> = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
];

/**
 * Live countdown to a target date, styled in the brand's gold-on-dark
 * language. Purely urgency-driving.
 *
 * Hydration-safe: the server and first client render show nothing (null),
 * and the ticking values appear only after mount — so the server HTML never
 * disagrees with the client (no hydration mismatch from Date.now()).
 *
 * Past-target safe: once the target passes, it renders a calm "ya comenzó"
 * state instead of zeros or negative numbers — a dead 00:00:00 clock on a
 * sales page reads as "this is over", which kills conversion.
 */
export function Countdown({ target, className }: CountdownProps) {
  const targetMs = new Date(target).getTime();
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(computeTimeLeft(targetMs));
    const id = setInterval(() => setTime(computeTimeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  // Pre-mount: render nothing to keep SSR and first client render identical.
  if (time === null) return null;

  if (time.done) {
    return (
      <p
        className={cn(
          "text-center font-display text-sm uppercase tracking-[0.25em] text-accent-soft",
          className,
        )}
      >
        El bootcamp ha comenzado
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-2 sm:gap-3",
        className,
      )}
      role="timer"
      aria-live="off"
    >
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center rounded-xl border border-accent/20 bg-ink/40 py-3 backdrop-blur-sm"
        >
          <span className="font-display text-2xl font-semibold leading-none text-foreground tabular-nums sm:text-3xl">
            {String(time[key]).padStart(2, "0")}
          </span>
          <span className="mt-1.5 text-[0.6rem] uppercase tracking-[0.15em] text-accent/80">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
