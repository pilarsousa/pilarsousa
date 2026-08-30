"use client";

/*
  El disco con la flecha que marca la juntura entre el hero y la sección 2.

  ES UN BOTÓN DE VERDAD, no un adorno: baja a la sección siguiente. Un disco con
  una flecha hacia abajo en mitad de la página promete esa acción aunque no la
  tenga, así que o la cumple o no debería tener forma de flecha.

  Va con `scrollIntoView` y no con un `<a href="#...">` porque un ancla deja la
  URL con el hash pegado, y esto no es un destino al que se enlace desde fuera:
  es un gesto de la página consigo misma.

  Respeta `prefers-reduced-motion`: quien pidió no ver animaciones llega igual,
  pero de golpe. Un desplazamiento suave de una pantalla entera es justo lo que
  provoca mareo a quien activó ese ajuste.

  ── EL DIBUJO VA EN LÍNEA, Y ANTES NO ──

  Se veía pixelado por los bordes, y la causa no era el archivo sino cómo se
  servía: flecha-separadora.svg pasaba por next/image, que RASTERIZA el vector a
  un bitmap del tamaño declarado en el archivo —45x45 px— y ese bitmap se estiraba
  después por CSS hasta 2rem o más. Un mapa de bits agrandado se pixela; da igual
  que el original fuese vectorial.

  Además el archivo traía un defecto propio: su <filter> declaraba una región de
  45x52 empezando en y=-3 sobre un viewBox de 45x45, o sea que el efecto se salía
  del lienzo por abajo y quedaba cortado en seco, sin suavizado. Ese corte era el
  canto duro que se veía alrededor del disco.

  Dibujado en línea el navegador lo rasteriza a la resolución real de pantalla,
  sea la que sea, y escala sin límite. De paso desaparece la petición de red y no
  hay que arrastrar el archivo.

  SE RESPETA EL TAMAÑO DEL MONTAJE: el disco mide 45 px de diámetro a 1920 —el
  del archivo original— y la flecha conserva su trazo de 2 y sus mismas
  coordenadas. Lo único que cambia es cómo llega a la pantalla.

  El resplandor interior del original —dos sombras internas, una oscura abajo y
  una clara arriba— se repone con dos degradados radiales en vez de con filtros:
  un feGaussianBlur se recalcula en cada repintado y esta pieza está animada
  (.le-baja la mueve en bucle). Los degradados los resuelve el compositor.
*/
export function FlechaBajar({
  destino,
  className,
}: {
  destino: string;
  className?: string;
}) {
  const bajar = () => {
    const el = document.getElementById(destino);
    if (!el) return;
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: sinMovimiento ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={bajar}
      aria-label="Ir a la sección siguiente"
      className={className}
    >
      <svg
        viewBox="0 0 45 45"
        fill="none"
        aria-hidden
        /* El viewBox es cuadrado y la clase de fuera fija el ancho, así que el
           alto sale solo. block quita el hueco de línea base que el navegador
           deja bajo los elementos en línea y que descentraba el disco. */
        className="le-baja block w-full transition-transform duration-200"
      >
        <defs>
          {/* Verde de marca. Se conserva el degradado vertical del original
              aunque sus dos paradas sean del mismo tono: así, cambiar el remate
              es tocar una parada y no rehacer la pieza. */}
          <linearGradient id="le-flecha-disco" x1="22.5" y1="0" x2="22.5" y2="45">
            <stop stopColor="#b4dc35" />
            <stop offset="1" stopColor="#8fb61c" />
          </linearGradient>

          {/* La luz de arriba: el reflejo que el original conseguía con una
              sombra interna clara desplazada hacia arriba. */}
          <radialGradient
            id="le-flecha-luz"
            cx="0.5"
            cy="0.08"
            r="0.75"
          >
            <stop stopColor="#f0eed5" stopOpacity="0.85" />
            <stop offset="0.55" stopColor="#f0eed5" stopOpacity="0.12" />
            <stop offset="1" stopColor="#f0eed5" stopOpacity="0" />
          </radialGradient>

          {/* Y la sombra de abajo, que es lo que le da volumen de pastilla. */}
          <radialGradient
            id="le-flecha-sombra"
            cx="0.5"
            cy="1"
            r="0.8"
          >
            <stop stopColor="#000501" stopOpacity="0.5" />
            <stop offset="0.6" stopColor="#000501" stopOpacity="0.1" />
            <stop offset="1" stopColor="#000501" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* EL RADIO ES 22 Y NO 22,5: medio píxel de margen dentro del viewBox.
            Con el círculo tocando exactamente el borde, el suavizado del canto
            no tiene dónde caer y el contorno sale duro — que es la mitad de lo
            que se veía como "pixelado". */}
        <circle cx="22.5" cy="22.5" r="22" fill="url(#le-flecha-disco)" />
        <circle cx="22.5" cy="22.5" r="22" fill="url(#le-flecha-luz)" />
        <circle cx="22.5" cy="22.5" r="22" fill="url(#le-flecha-sombra)" />

        {/* La flecha, con las coordenadas y el grosor del montaje original. */}
        <path
          d="M23 16V30"
          stroke="#000501"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 23L23 30L16 23"
          stroke="#000501"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
