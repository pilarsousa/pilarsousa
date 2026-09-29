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
type MatrixRainProps = {
  /**
   * Opacity of the per-frame ink veil that creates the fading trail. On solid
   * dark backgrounds (cards) keep the default; over a photo use a low value
   * (e.g. 0.04) so glyphs leave a short trail without darkening the image.
   */
  fade?: number;
  /** Overall canvas opacity (Tailwind-independent, applied inline). */
  opacity?: number;
};

export function MatrixRain({ fade = 0.08, opacity = 0.25 }: MatrixRainProps = {}) {
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

      if (fade > 0) {
        // Solid-dark mode: an ink veil builds the fading trail.
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(10, 9, 8, ${fade})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Over-photo mode: fade old glyphs toward transparent (not toward ink)
        // so the trail still forms but the artwork behind stays fully visible.
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#2a6b3c"; // deeper, darker green so it reads as texture
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
  }, [fade]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ opacity }}
      className="absolute inset-0 size-full"
    />
  );
}
