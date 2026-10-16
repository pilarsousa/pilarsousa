import { useId } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

/*
  Los diagramas de las láminas de "La revelación", uno por punto: el plano
  químico, el circuito y el sistema nervioso. Son ilustraciones: lo que dicen
  ya está en el texto de cada lámina, por eso van aria-hidden.

  Rótulos en Caveat (tiza de apunte), coordenadas en el viewBox de cada SVG.
  Sin non-scaling-stroke: con el escalado parejo de preserveAspectRatio por
  defecto, los trazos animados con pathLength se dibujan enteros.
*/

const ROTULO = { fontFamily: "var(--font-caveat), cursive", fontSize: 15 } as const;

/* 01 · Química: lo que el cuerpo te da al volver a lo conocido, y la fórmula
   de la dopamina dibujada como en un apunte. */
export function DiagramaQuimica() {
  const moleculas = [
    { nombre: "Cortisol", baja: true },
    { nombre: "Dopamina", baja: false },
    { nombre: "Oxitocina", baja: false },
  ];
  return (
    <div aria-hidden className="flex h-full items-center justify-between gap-3 px-3 sm:px-5">
      <ul className="flex flex-col gap-2">
        {moleculas.map(({ nombre, baja }) => {
          const Flecha = baja ? ArrowDown : ArrowUp;
          return (
            <li
              key={nombre}
              className="flex items-center gap-1.5 rounded-full border border-[rgb(243_238_220/0.12)] bg-[rgb(243_238_220/0.06)] py-1 pr-2.5 pl-2 text-xs font-semibold text-foreground/90 sm:text-[0.8rem]"
            >
              <Flecha className="size-3.5 text-(--cv2-oro)" strokeWidth={2.5} />
              {nombre}
            </li>
          );
        })}
      </ul>

      {/* Dopamina: anillo de benceno, los dos OH (catecol) y la cadena hasta
          el NH₂. */}
      <svg viewBox="-14 0 166 96" className="h-full max-h-[150px] w-auto min-w-0 shrink overflow-visible">
        <g
          className="cv2-molecula"
          fill="none"
          stroke="#e9c46a"
          strokeWidth={1.8}
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <polygon points="72,50 61,69.05 39,69.05 28,50 39,30.95 61,30.95" />
          <circle cx="50" cy="50" r="11.5" strokeOpacity={0.7} />
          <path d="M72 50 L91 39 L110 50 L125 41.3" />
          <path d="M39 30.95 L30 15.4" />
          <path d="M28 50 L10 50" />
        </g>
        <g fill="#f3eedc" style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, fontWeight: 700 }}>
          <text x="127" y="45">
            NH₂
          </text>
          <text x="29" y="11" textAnchor="middle">
            HO
          </text>
          <text x="8" y="53.6" textAnchor="end">
            HO
          </text>
        </g>
        <text x="50" y="91" textAnchor="middle" fill="#f3eedc" fillOpacity={0.75} style={ROTULO}>
          dopamina
        </text>
      </svg>
    </div>
  );
}

/* 02 · Circuito: el impulso sale cada mañana y va siempre por el camino
   gastado; la rama nueva queda punteada, sin recorrer. */
export function DiagramaCircuito() {
  const id = useId();
  const camino = `${id}-camino`;
  return (
    <svg aria-hidden viewBox="0 0 320 120" className="mx-auto h-full w-full max-w-[480px] overflow-visible">
      {/* La rama nueva: sale del circuito y nunca se enciende. */}
      <path
        d="M100 65.75 C140 30 210 20 288 22"
        fill="none"
        stroke="#f3eedc"
        strokeOpacity={0.4}
        strokeWidth={1.6}
        strokeDasharray="3 6"
        strokeLinecap="round"
      />
      <circle cx="296" cy="22" r="6" fill="none" stroke="#f3eedc" strokeOpacity={0.45} strokeDasharray="2 3" />

      {/* El circuito de siempre: halo ancho y trazo dorado encima. */}
      <path
        id={camino}
        d="M24 66 C80 30 120 100 176 70 S260 52 296 66"
        fill="none"
        stroke="#e9c46a"
        strokeOpacity={0.18}
        strokeWidth={12}
        strokeLinecap="round"
      />
      <path
        d="M24 66 C80 30 120 100 176 70 S260 52 296 66"
        fill="none"
        stroke="#e9c46a"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <circle cx="24" cy="66" r="6" fill="#e9c46a" />
      <circle cx="296" cy="66" r="7" fill="#f3d98c">
        <animate attributeName="r" values="7;7;10;7" keyTimes="0;0.84;0.92;1" dur="2.6s" repeatCount="indefinite" />
      </circle>

      {/* El impulso: recorre el camino gastado una y otra vez. */}
      <g className="cv2-impulso">
        <circle r="5" fill="#fff3d6" style={{ filter: "drop-shadow(0 0 6px #f3d98c)" }}>
          <animateMotion dur="2.6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear">
            <mpath href={`#${camino}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.08;0.8;0.86;1" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>

      <g style={ROTULO}>
        <text x="24" y="94" fill="#f3eedc" fillOpacity={0.75}>
          cada mañana
        </text>
        <text x="300" y="96" textAnchor="end" fill="#f3d98c">
          lo de siempre
        </text>
        <text x="282" y="10" textAnchor="end" fill="#f3eedc" fillOpacity={0.5}>
          lo nuevo
        </text>
      </g>
    </svg>
  );
}

/* 03 · Sistema nervioso: una onda que pasa por encima de lo que el cuerpo
   puede sostener (abundancia), dura un instante y cae en alerta. */
export function DiagramaSistema() {
  const id = useId();
  const tinta = `${id}-tinta`;
  const encima = `${id}-encima`;
  const onda =
    "M8 84 C18 78 26 78 36 84 S54 90 64 84 S82 78 92 84 C108 92 116 20 134 20 C152 20 156 70 166 88 " +
    "L172 76 L178 96 L184 74 L190 98 L196 76 L202 96 L208 78 L214 94 L222 80 L230 92 L240 82 L252 90 L266 84 L282 88 L312 86";
  return (
    <svg aria-hidden viewBox="0 0 320 120" className="mx-auto h-full w-full max-w-[480px] overflow-visible">
      <defs>
        <linearGradient id={tinta} gradientUnits="userSpaceOnUse" x1="8" y1="0" x2="312" y2="0">
          <stop offset="0" stopColor="#e9c46a" />
          <stop offset="0.5" stopColor="#f6dc94" />
          <stop offset="0.56" stopColor="#e8a598" />
          <stop offset="1" stopColor="#e8a598" />
        </linearGradient>
        <clipPath id={encima}>
          <rect x="0" y="0" width="320" height="46" />
        </clipPath>
      </defs>

      {/* El umbral: lo que tu sistema nervioso puede sostener. */}
      <line x1="8" y1="46" x2="312" y2="46" stroke="#f3eedc" strokeOpacity={0.4} strokeDasharray="4 5" />

      <path
        d={onda}
        pathLength={1}
        className="cv2-onda"
        fill="none"
        stroke={`url(#${tinta})`}
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Lo que pasa del umbral brilla: es el instante de abundancia. */}
      <path
        d={onda}
        pathLength={1}
        clipPath={`url(#${encima})`}
        className="cv2-onda"
        fill="none"
        stroke="#fff3d6"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 5px #f3d98c)" }}
      />

      <g style={ROTULO}>
        <text x="312" y="40" textAnchor="end" fill="#f3eedc" fillOpacity={0.6}>
          lo que puedes sostener
        </text>
        <text x="134" y="13" textAnchor="middle" fill="#f3d98c">
          abundancia
        </text>
        <text x="236" y="114" textAnchor="middle" fill="#e8a598">
          alerta
        </text>
      </g>
    </svg>
  );
}
