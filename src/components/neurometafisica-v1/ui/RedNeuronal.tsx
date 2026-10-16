import { cn } from "@/lib/cn";

/*
  Red neuronal de fondo: nodos dorados unidos por dendritas, con algunas
  sinapsis que se encienden. Decorativa.

  - "columna" va detrás de las láminas de vidrio de "La revelación", que la
    desenfocan: es lo que hace que el vidrio se lea como vidrio.
  - "apaisada" es el fondo de pantalla completa de la gracias; con
    `impulsos`, además, viajan destellos de luz por las dendritas, como
    impulsos nerviosos (el mismo de la foto del hero).

  Los nodos salen de una grilla con desorden (un nodo por celda, corrido al
  azar) para que cubran parejo, y el azar es una semilla fija: el servidor y
  el navegador dibujan la misma red.
*/

/** mulberry32: números "al azar" repetibles a partir de una semilla. */
function azar(semilla: number) {
  return () => {
    semilla = (semilla + 0x6d2b79f5) | 0;
    let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const red = (n: number) => Math.round(n * 10) / 10;

function armarRed({
  ancho,
  alto,
  columnas,
  filas,
  alcance,
  semilla,
}: {
  ancho: number;
  alto: number;
  columnas: number;
  filas: number;
  /** Distancia máxima entre dos nodos unidos. */
  alcance: number;
  semilla: number;
}) {
  const r = azar(semilla);
  const celdaX = ancho / columnas;
  const celdaY = alto / filas;

  const nodos = Array.from({ length: columnas * filas }, (_, i) => ({
    x: red((i % columnas) * celdaX + celdaX * (0.15 + r() * 0.7)),
    y: red(Math.floor(i / columnas) * celdaY + celdaY * (0.15 + r() * 0.7)),
  }));

  /* Dendritas: cada nodo con sus vecinos cercanos, curvadas un poco para
     que no parezca una malla. */
  const dendritas = nodos.flatMap((a, i) =>
    nodos.slice(i + 1).flatMap((b) => {
      if (Math.hypot(a.x - b.x, a.y - b.y) > alcance) return [];
      const cx = red((a.x + b.x) / 2 + (r() - 0.5) * 60);
      const cy = red((a.y + b.y) / 2 + (r() - 0.5) * 60);
      return [`M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`];
    }),
  );

  /* Una de cada tres se enciende, cada una a su tiempo. */
  const sinapsis = nodos.filter((_, i) => i % 3 === 1).map((n, i) => ({ ...n, retraso: red((i * 0.73) % 4.8) }));

  /* Una de cada cinco dendritas lleva un impulso, con su ritmo propio. Van
     después de todo lo demás: sumar azar acá no mueve la red. */
  const impulsos = dendritas
    .filter((_, i) => i % 5 === 2)
    .map((d) => ({ d, dur: red(3 + r() * 3), retraso: red(r() * 7) }));

  return { ancho, alto, nodos, dendritas, sinapsis, impulsos };
}

const REDES = {
  columna: armarRed({ ancho: 600, alto: 1400, columnas: 4, filas: 9, alcance: 250, semilla: 11 }),
  apaisada: armarRed({ ancho: 1600, alto: 1000, columnas: 8, filas: 5, alcance: 300, semilla: 23 }),
};

export function RedNeuronal({
  variante = "columna",
  impulsos = false,
  className,
}: {
  variante?: keyof typeof REDES;
  impulsos?: boolean;
  className?: string;
}) {
  const { ancho, alto, nodos, dendritas, sinapsis, impulsos: recorridos } = REDES[variante];
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${ancho} ${alto}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none", className)}
    >
      <path d={dendritas.join(" ")} fill="none" stroke="#e9c46a" strokeOpacity={0.22} strokeWidth={1.2} />
      {nodos.map(({ x, y }) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={3} fill="#e9c46a" fillOpacity={0.55} />
      ))}
      {sinapsis.map(({ x, y, retraso }) => (
        <circle
          key={`s-${x}-${y}`}
          cx={x}
          cy={y}
          r={9}
          fill="#f3d98c"
          className="cv2-red__sinapsis"
          style={{ "--retraso": `${retraso}s` } as React.CSSProperties}
        />
      ))}
      {/* El impulso: un halo ancho y tenue y el destello encima. Sin filtros:
          un drop-shadow sobre la red entera se recalcularía en cada cuadro. */}
      {impulsos &&
        recorridos.map(({ d, dur, retraso }) => {
          const ritmo = { "--dur": `${dur}s`, "--retraso": `${retraso}s` } as React.CSSProperties;
          return (
            <g key={d} style={ritmo}>
              <path d={d} pathLength={1} className="cv2-red__impulso" stroke="#f3d98c" strokeOpacity={0.3} strokeWidth={7} />
              <path d={d} pathLength={1} className="cv2-red__impulso" stroke="#fff3d6" strokeWidth={2.2} />
            </g>
          );
        })}
    </svg>
  );
}
