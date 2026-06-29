"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle "matrix rain" backdrop on a <canvas>, recolored to deep brand green.
 * Optimized for use as a decorative card background:
 *  - pauses when off-screen (IntersectionObserver) to save CPU/battery,
 *  - skips entirely under prefers-reduced-motion,
 *  - low frame rate + low opacity so it stays a texture, not a distraction.
 * Fills its positioned parent; parent should clip overflow.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%&*+-/".split(
        "",
      );
    const fontSize = 12;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement!;
      canvas.width = w;
      canvas.height = h;
      const newColumns = Math.floor(w / fontSize);
      if (newColumns > columns) {
        drops = [...drops, ...Array(newColumns - columns).fill(1)];
      } else {
        drops = drops.slice(0, newColumns);
      }
      columns = newColumns;
    };
    resize();

    let raf = 0;
    let last = 0;
    let running = false;

    // ~20fps is plenty for a background texture (and far lighter than 60).
    const frame = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (t - last < 50) return;
      last = t;

      ctx.fillStyle = "rgba(10, 9, 8, 0.08)"; // fade trail toward ink
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#41a75c"; // brighter, more vivid green glyphs
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 size-full opacity-25"
    />
  );
}
