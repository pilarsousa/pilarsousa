import { cn } from "@/lib/cn";

/*
  Ornamentos de la sección "No venís a aprender más".

  Son SVG y no imágenes: se pintan con currentColor, así que heredan el verde de
  la paleta y no hay que mantener un archivo por cada variante de opacidad o
  tamaño. Todos son decorativos y van con aria-hidden desde quien los usa.

  Se dibujan por fórmula donde tiene sentido —los rayos del sol, los círculos de
  la flor— en vez de escribir a mano cada trazo: así cambiar el número de rayos
  o el radio es tocar una constante, no rehacer el path.
*/

/* Sol radiante que corona la sección.

   Los rayos alternan largo y corto, que es lo que le da el aire de grabado en
   vez de rueda dentada. El anillo y el punto centrales van aparte porque
   necesitan grosores distintos. */
export function OrnamentoSol({ className }: { className?: string }) {
  const RAYOS = 16;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={cn("text-accent", className)}
    >
      {Array.from({ length: RAYOS }, (_, i) => {
        const angulo = (i * 360) / RAYOS;
        /* Los pares largos, los impares cortos. */
        const largo = i % 2 === 0;
        const desde = 17;
        const hasta = largo ? 46 : 33;

        return (
          <line
            key={angulo}
            x1="50"
            y1={50 - desde}
            x2="50"
            y2={50 - hasta}
            stroke="currentColor"
            strokeWidth={largo ? 1.4 : 1}
            strokeLinecap="round"
            transform={`rotate(${angulo} 50 50)`}
            opacity={largo ? 0.95 : 0.6}
          />
        );
      })}

      <circle cx="50" cy="50" r="11" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="4.5" fill="currentColor" />
    </svg>
  );
}

/* Flor de la vida: siete círculos, el central y seis a su alrededor a la
   distancia de su propio radio, que es lo que los hace intersecarse en el
   patrón clásico. Se usa como marca de agua, a opacidad muy baja. */
export function FlorDeLaVida({ className }: { className?: string }) {
  const R = 24;
  const centros = [
    [50, 50],
    ...Array.from({ length: 6 }, (_, i) => {
      const a = (i * Math.PI) / 3;
      return [50 + R * Math.cos(a), 50 + R * Math.sin(a)];
    }),
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={cn("text-accent", className)}
    >
      {centros.map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={R}
          stroke="currentColor"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

/* Rombo con dos filetes, para cerrar un bloque. Es el hermano pequeño del
   SparkDivider: mismo lenguaje, menos peso. */
export function OrnamentoRombo({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <span className="h-px w-16 bg-[linear-gradient(to_right,transparent,var(--color-accent))] opacity-50" />
      <svg viewBox="0 0 12 12" fill="none" className="size-2.5 text-accent">
        <path
          d="M6 0.5L11.5 6L6 11.5L0.5 6L6 0.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span className="h-px w-16 bg-[linear-gradient(to_left,transparent,var(--color-accent))] opacity-50" />
    </div>
  );
}

/* Arcos concéntricos del fondo.

   Círculos enormes y descentrados a propósito: sólo entra en el encuadre el
   tramo de arco, que es lo que da la sensación de órbita sin dibujar un
   círculo completo. Van en un contenedor con overflow oculto y opacidad muy
   baja; su trabajo es que el fondo no sea liso, no que se los mire. */
export function ArcosDeFondo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
      className={cn("text-accent", className)}
    >
      <circle cx="330" cy="90" r="200" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="330" cy="90" r="270" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="330" cy="90" r="340" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

/* Emblema circular: anillos concéntricos con un brote dentro.

   Los tres anillos van a opacidades decrecientes hacia fuera, que es lo que da
   la sensación de halo en vez de diana. El icono no va aquí — lo pone quien lo
   usa, para no atar este archivo a lucide. */
export function Emblema({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative shrink-0", className)} aria-hidden>
      {/* Resplandor difuso por detrás de todo. */}
      <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,var(--vo-glow)_0%,transparent_65%)] blur-lg" />

      <span className="absolute inset-0 rounded-full border border-accent/10" />
      <span className="absolute inset-[12%] rounded-full border border-accent/20" />
      <span className="absolute inset-[24%] rounded-full border border-accent/35 bg-vo-forest/40" />

      <span className="relative flex size-full items-center justify-center text-accent">
        {children}
      </span>
    </div>
  );
}

/* Rombo de cuatro puntas dentro de un anillo. Hace de nodo entre dos bloques:
   marca que lo que viene debajo es consecuencia de lo de arriba. */
export function NodoRombo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,var(--vo-glow)_0%,transparent_65%)] blur-md" />
      <span className="absolute inset-0 rounded-full border border-accent/35 bg-vo-forest/40" />

      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="relative size-full p-[28%] text-accent"
      >
        {/* Estrella de cuatro puntas: cada cuadrante es una curva que se hunde
            hacia el centro, y ese hundimiento es lo que afila las puntas. */}
        <path
          d="M12 1C12 7 17 12 23 12C17 12 12 17 12 23C12 17 7 12 1 12C7 12 12 7 12 1Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/* Iconos de las tres condicionales, dibujados aquí porque lucide no tiene
   equivalentes exactos: la nube de pensamiento con sus burbujas y el ojo con
   pestañas radiales son los del montaje entregado, y sustituirlos por los más
   parecidos del set cambiaba el tono. El corazón sí es el de lucide, que coincide.

   Trazo fino y sin relleno, como el resto de la iconografía de la sección. */
export function IconoDuda({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("text-accent", className)}>
      <path
        d="M11 9.5a4.5 4.5 0 0 1 8.4-2.2 3.8 3.8 0 0 1 5 3.6 3.8 3.8 0 0 1-1 2.6 3.6 3.6 0 0 1-2.2 5.6A4.4 4.4 0 0 1 13 20a4.6 4.6 0 0 1-6.4-3.4A4.2 4.2 0 0 1 8 12.4a4.4 4.4 0 0 1 3-2.9Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="23.5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="27.5" r="1.1" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function IconoOjo({ className }: { className?: string }) {
  const PESTANAS = 7;

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("text-accent", className)}>
      <path
        d="M4 16s4.6-6 12-6 12 6 12 6-4.6 6-12 6-12-6-12-6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.3" />

      {/* Pestañas: se reparten en abanico bajo el ojo, que es lo que le da el
          aire de grabado del montaje. */}
      {Array.from({ length: PESTANAS }, (_, i) => {
        const angulo = -55 + (i * 110) / (PESTANAS - 1);
        return (
          <line
            key={angulo}
            x1="16"
            y1="23.5"
            x2="16"
            y2="27"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            transform={`rotate(${angulo} 16 16)`}
            opacity="0.75"
          />
        );
      })}
    </svg>
  );
}

/* Loto que corona el panel de conclusión: tres pétalos y dos hojas. */
export function Loto({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" fill="none" aria-hidden className={cn("text-accent", className)}>
      <path
        d="M20 2c3.4 3 5 7 5 11.5 0 3-1.8 5.6-5 8-3.2-2.4-5-5-5-8C15 9 16.6 5 20 2Z"
        fill="currentColor"
      />
      <path
        d="M13.5 7.5c1.4 3.4 1.4 7 0 10.4-1 2.4-3.2 4-6.5 4.6-1.4-3-1.4-5.8 0-8.4 1.4-2.6 3.6-4.8 6.5-6.6Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M26.5 7.5c2.9 1.8 5.1 4 6.5 6.6 1.4 2.6 1.4 5.4 0 8.4-3.3-.6-5.5-2.2-6.5-4.6-1.4-3.4-1.4-7 0-10.4Z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

/* Camino de puntos, compartido por las secciones que lo usan.

   El recorrido llega como prop porque cada sección tiene el suyo: aquí sólo
   vive cómo se dibuja, que es lo que tienen en común.

   preserveAspectRatio="none" a propósito: no es un dibujo que deba mantener su
   forma sino una guía que se estira con la caja que recorre. Y por eso mismo
   vector-effect="non-scaling-stroke" es obligatorio — sin él, la caja estira el
   sistema de coordenadas de forma desigual y con él el grosor del trazo y la
   longitud de los guiones, que en una pantalla ancha se convierten en un zigzag
   de guiones enormes.

   El viewBox es 0-100 en los dos ejes, así que los recorridos se escriben en
   porcentaje de la caja y no en píxeles. */
export function CaminoPunteado({
  d,
  className,
  opacidad = 0.35,
}: {
  d: string;
  className?: string;
  opacidad?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
    >
      <path
        d={d}
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeDasharray="4 10"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={opacidad}
      />
    </svg>
  );
}
