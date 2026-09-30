"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/*
  Rejilla que se enciende alrededor del cursor, adaptada de React Bits
  (reactbits.dev, CursorGrid). Canvas 2D, sin dependencias.

  ── QUÉ CAMBIA RESPECTO AL ORIGINAL ──

  · ESCUCHA AL PADRE, NO A SÍ MISMA. El original atiende los eventos del
    puntero en su propio contenedor. Aquí va DE FONDO, detrás del logotipo y
    del copyright: el puntero sobre el contenido no llegaría nunca al lienzo y
    la rejilla quedaría apagada justo en el centro. Por eso los eventos se
    escuchan en el elemento padre, que es la sección entera.

  · prefers-reduced-motion SE RESPETA: quien lo pide no recibe la animación.

  · TypeScript y clases de Tailwind en vez del .css aparte, como el resto de
    componentes del proyecto.

  ── NO GASTA NADA EN REPOSO ──

  El bucle sólo corre mientras hay celdas encendidas o un pulso expandiéndose.
  Sin puntero encima, no hay requestAnimationFrame: es seguro dejarlo en el
  footer sin coste para el resto de la página.
*/

type Falloff = "linear" | "smooth" | "sharp";

const FALLOFF_CURVES: Record<Falloff, (t: number) => number> = {
  linear: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  sharp: (t) => t * t * t,
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(v.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

type CursorGridProps = {
  /** Size of each grid cell in pixels. */
  cellSize?: number;
  /** Color of the cell strokes, fills and pulses (hex). */
  color?: string;
  /** Radius in pixels around the cursor within which cells light up. */
  radius?: number;
  falloff?: Falloff;
  /** How long (ms) a cell stays lit before it starts fading. */
  holdTime?: number;
  /** How long (ms) a fully lit cell takes to fade out. */
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  /** Translucent fill of lit cells; 0 disables the fill. */
  fillOpacity?: number;
  /** Opacity of a faint always-visible lattice; 0 hides it. */
  gridOpacity?: number;
  cellRadius?: number;
  /** Emit an expanding ring of lit cells on click/tap. */
  clickPulse?: boolean;
  /** Expansion speed of the click ring in pixels per second. */
  pulseSpeed?: number;
  className?: string;
};

type Pulse = { x: number; y: number; t0: number };

export function CursorGrid({
  cellSize = 70,
  color = "#5b9800",
  radius = 140,
  falloff = "smooth",
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className,
}: CursorGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
  });

  useEffect(() => {
    propsRef.current = {
      cellSize,
      color,
      radius,
      falloff,
      holdTime,
      fadeDuration,
      lineWidth,
      maxOpacity,
      fillOpacity,
      gridOpacity,
      cellRadius,
      clickPulse,
      pulseSpeed,
    };
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const target = container?.parentElement ?? container;
    if (!container || !canvas || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = propsRef.current.cellSize;

    // Grid state: one alpha + timestamp pair per cell, indexed row-major.
    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    let alphas = new Float32Array(0);
    let touched = new Float64Array(0);
    let w = 0;
    let h = 0;
    const pulses: Pulse[] = [];
    let raf = 0;
    let running = false;
    let lastFrame = 0;

    const rebuild = () => {
      w = container.offsetWidth;
      h = container.offsetHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / size) + 1;
      rows = Math.ceil(h / size) + 1;
      // Center the lattice so edge cells crop evenly on both sides.
      offX = (w - cols * size) / 2;
      offY = (h - rows * size) / 2;
      alphas = new Float32Array(cols * rows);
      touched = new Float64Array(cols * rows);
    };

    const cellCenter = (i: number): [number, number] => [
      offX + (i % cols) * size + size / 2,
      offY + Math.floor(i / cols) * size + size / 2,
    ];

    // Light up every cell whose center falls inside the radius, with the
    // configured falloff curve mapping distance to brightness.
    const energize = (x: number, y: number) => {
      const p = propsRef.current;
      const r = Math.max(p.radius, 1);
      const ease = FALLOFF_CURVES[p.falloff] ?? FALLOFF_CURVES.linear;
      const now = performance.now();
      const minCol = Math.max(0, Math.floor((x - r - offX) / size));
      const maxCol = Math.min(cols - 1, Math.floor((x + r - offX) / size));
      const minRow = Math.max(0, Math.floor((y - r - offY) / size));
      const maxRow = Math.min(rows - 1, Math.floor((y + r - offY) / size));
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const i = row * cols + col;
          const [cx, cy] = cellCenter(i);
          const dist = Math.hypot(cx - x, cy - y);
          if (dist > r) continue;
          const level = ease(1 - dist / r) * p.maxOpacity;
          if (level > alphas[i]) {
            alphas[i] = level;
            touched[i] = now;
          } else if (level > 0) {
            touched[i] = now;
          }
        }
      }
    };

    const draw = (now: number) => {
      const p = propsRef.current;
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      ctx.clearRect(0, 0, w, h);
      const [cr, cg, cb] = hexToRgb(p.color);

      // Optional faint static lattice.
      if (p.gridOpacity > 0) {
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${p.gridOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let col = 0; col <= cols; col++) {
          const x = Math.round(offX + col * size) + 0.5;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (let row = 0; row <= rows; row++) {
          const y = Math.round(offY + row * size) + 0.5;
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();
      }

      // Expanding click pulses hand their energy to cells as they pass.
      for (let pi = pulses.length - 1; pi >= 0; pi--) {
        const pulse = pulses[pi];
        const ringR = ((now - pulse.t0) / 1000) * p.pulseSpeed;
        if (ringR > Math.hypot(w, h)) {
          pulses.splice(pi, 1);
          continue;
        }
        const band = size;
        const minCol = Math.max(0, Math.floor((pulse.x - ringR - band - offX) / size));
        const maxCol = Math.min(cols - 1, Math.floor((pulse.x + ringR + band - offX) / size));
        const minRow = Math.max(0, Math.floor((pulse.y - ringR - band - offY) / size));
        const maxRow = Math.min(rows - 1, Math.floor((pulse.y + ringR + band - offY) / size));
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            const i = row * cols + col;
            const [cx, cy] = cellCenter(i);
            const dist = Math.hypot(cx - pulse.x, cy - pulse.y);
            if (Math.abs(dist - ringR) < band / 2 && p.maxOpacity > alphas[i]) {
              alphas[i] = p.maxOpacity;
              touched[i] = now;
            }
          }
        }
      }

      let anyVisible = pulses.length > 0;
      const fadeStep = dt / Math.max(p.fadeDuration, 16);
      const half = size / 2;

      for (let i = 0; i < alphas.length; i++) {
        let a = alphas[i];
        if (a <= 0) continue;
        if (now - touched[i] > p.holdTime) {
          a = Math.max(0, a - fadeStep);
          alphas[i] = a;
          if (a <= 0) continue;
        }
        anyVisible = true;

        const [cx, cy] = cellCenter(i);
        const gradient = ctx.createRadialGradient(cx, cy, half * 0.1, cx, cy, size);
        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${a})`);
        gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        const x = cx - half + 0.5;
        const y = cy - half + 0.5;
        const s = size - 1;

        ctx.beginPath();
        if (p.cellRadius > 0) {
          ctx.roundRect(x, y, s, s, p.cellRadius);
        } else {
          ctx.rect(x, y, s, s);
        }
        if (p.fillOpacity > 0) {
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${a * p.fillOpacity})`;
          ctx.fill();
        }
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.lineWidth;
        ctx.stroke();
      }

      if (anyVisible) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
        if (p.gridOpacity <= 0) ctx.clearRect(0, 0, w, h);
      }
    };

    const wake = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const toLocal = (e: PointerEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top];
    };

    const onPointerMove = (e: PointerEvent) => {
      const [x, y] = toLocal(e);
      energize(x, y);
      wake();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!propsRef.current.clickPulse) return;
      const [x, y] = toLocal(e);
      pulses.push({ x, y, t0: performance.now() });
      wake();
    };

    const ro = new ResizeObserver(() => {
      rebuild();
      wake();
    });
    ro.observe(container);
    rebuild();
    wake();

    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerdown", onPointerDown);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      target.removeEventListener("pointermove", onPointerMove);
      target.removeEventListener("pointerdown", onPointerDown);
    };
  }, [cellSize]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
