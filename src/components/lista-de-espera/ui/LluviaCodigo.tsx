"use client";

import { useEffect, useRef } from "react";

/*
  Lluvia de ceros y unos, en canvas, para el fondo de la sección de bonus.

  ES LA MISMA IDEA QUE LA DEL BOOTCAMP, reescrita para esta landing: allí caen
  letras y símbolos en un verde apagado, y aquí sólo CEROS Y UNOS en el verde de
  la marca, que es el mismo alfabeto que traen dibujados los banners 2 y 3. La
  sección de bonus queda así emparentada con ellos aunque su fondo sea otro.

  ── LO QUE HACE QUE NO PESE ──

  · Se para cuando la sección no está en pantalla. Un fondo animado que sigue
    corriendo mientras nadie lo ve es batería regalada, y esta sección está al
    final de una página larga.
  · Corre a ~20 fps, no a 60. Es una textura: a esa cadencia se lee igual y
    cuesta un tercio.
  · No se dibuja si el visitante pidió menos movimiento. No hay versión estática
    de respaldo porque debajo ya está el banner: sin lluvia, la sección se ve
    exactamente como antes.

  ── EL RASTRO, Y POR QUÉ NO SE PINTA ENCIMA UN VELO NEGRO ──

  El desvanecido de cada columna se hace borrando con `destination-out` en vez de
  cubrir con un velo oscuro. Cubrir es lo habitual y es más simple, pero aquí el
  canvas va SOBRE el banner de la sección: un velo negro por frame lo iría
  ensuciando hasta apagarlo. Borrando, lo que se desvanece son los glifos y el
  fondo se queda intacto.

  El canvas se dimensiona en píxeles reales desde su contenedor y se redibuja al
  cambiar de tamaño; sin eso, al redimensionar la ventana los glifos salen
  estirados.
*/
export function LluviaCodigo({ opacidad = 0.5 }: { opacidad?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const padre = canvas?.parentElement;
    if (!canvas || !padre) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CUERPO = 14;
    let columnas = 0;
    let gotas: number[] = [];

    const medir = () => {
      canvas.width = padre.clientWidth;
      canvas.height = padre.clientHeight;
      const nuevas = Math.max(1, Math.floor(canvas.width / CUERPO));
      /* Al ensanchar se añaden columnas arrancando a alturas distintas: si
         todas empezaran en cero, la lluvia nueva caería en bloque. */
      gotas =
        nuevas > columnas
          ? [
              ...gotas,
              ...Array.from({ length: nuevas - columnas }, (_, i) =>
                Math.floor(((i * 37) % 100) * 0.4),
              ),
            ]
          : gotas.slice(0, nuevas);
      columnas = nuevas;
    };
    medir();

    let raf = 0;
    let ultimo = 0;
    let corriendo = false;

    const frame = (t: number) => {
      if (!corriendo) return;
      raf = requestAnimationFrame(frame);
      if (t - ultimo < 50) return;
      ultimo = t;

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.14)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";
      ctx.font = `${CUERPO}px ui-monospace, monospace`;

      for (let i = 0; i < gotas.length; i++) {
        /* La cabeza de cada columna va más clara que el resto: es lo que hace
           que se lea como algo que cae y no como una tira encendida. */
        ctx.fillStyle = Math.random() > 0.88 ? "#9fe04a" : "#3f8f22";
        ctx.fillText(
          Math.random() > 0.5 ? "1" : "0",
          i * CUERPO,
          gotas[i] * CUERPO,
        );
        if (gotas[i] * CUERPO > canvas.height && Math.random() > 0.97) {
          gotas[i] = 0;
        }
        gotas[i]++;
      }
    };

    const arrancar = () => {
      if (corriendo) return;
      corriendo = true;
      raf = requestAnimationFrame(frame);
    };
    const parar = () => {
      corriendo = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? arrancar() : parar()),
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(medir);
    ro.observe(padre);

    return () => {
      parar();
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ opacity: opacidad }}
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
