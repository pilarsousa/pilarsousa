"use client";

import { useEffect, useRef, useState } from "react";

/* "+600.000" → prefijo "+", número 600000. Los puntos son de miles. */
function partir(valor: string) {
  const [, prefijo = "", digitos = "0", sufijo = ""] = valor.match(/^(\D*)([\d.]+)(\D*)$/) ?? [];
  return { prefijo, numero: Number(digitos.replace(/\./g, "")), sufijo };
}

const conPuntos = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/**
 * Un número que cuenta desde 0 hasta su valor cuando entra en pantalla.
 * El HTML trae el valor final (sin JS, o si ya está a la vista al cargar,
 * queda ese); los lectores de pantalla leen siempre el final.
 */
export function Cifra({ valor, className }: { valor: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mostrado, setMostrado] = useState(valor);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const caja = el.getBoundingClientRect();
    if (caja.top < window.innerHeight && caja.bottom > 0) return;

    const { prefijo, numero, sufijo } = partir(valor);
    const pintar = (n: number) => setMostrado(`${prefijo}${conPuntos(n)}${sufijo}`);
    let cuadro = requestAnimationFrame(() => pintar(0));

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        io.disconnect();
        const inicio = performance.now();
        const paso = (ahora: number) => {
          const t = Math.min(1, (ahora - inicio) / 1600);
          pintar(Math.round(numero * (1 - (1 - t) ** 3)));
          if (t < 1) cuadro = requestAnimationFrame(paso);
        };
        cuadro = requestAnimationFrame(paso);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, [valor]);

  return (
    <span className={className}>
      <span className="sr-only">{valor}</span>
      <span ref={ref} aria-hidden>
        {mostrado}
      </span>
    </span>
  );
}
