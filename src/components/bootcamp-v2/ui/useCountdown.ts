"use client";

import { useEffect, useState } from "react";

export type TimeLeft = {
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

/**
 * Time left until `target` (ISO string), ticking every second.
 *
 * Hydration-safe: returns null on the server and on the first client render,
 * so the server HTML never disagrees with the client over Date.now(). The
 * first real value lands on the next tick — scheduled with setTimeout rather
 * than set synchronously inside the effect, which would force a second render
 * pass right after mount.
 */
export function useCountdown(target: string): TimeLeft | null {
  const targetMs = new Date(target).getTime();
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTime(computeTimeLeft(targetMs));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [targetMs]);

  return time;
}
