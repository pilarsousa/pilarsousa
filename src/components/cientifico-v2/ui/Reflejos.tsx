/*
  Destellos (Salvia, Arena Dorada, Violeta Alma) que recorren un trazo,
  desfasados un tercio de vuelta (la vuelta dura 7,5s: ver
  .cv2-reflejo__capa). Van DENTRO de un <svg>: reciben el `d` del recorrido.

  Cada destello son capas centradas en el mismo punto: un núcleo corto y
  brillante y encima tramos cada vez más largos y tenues. Sumadas, las puntas
  se desvanecen en vez de cortarse seco. Largos en % del recorrido
  (pathLength=100). En un trazo cerrado el guion pasa por el punto de inicio
  sin corte: el patrón se repite cada 100.

  Lo usan la barra superior y el marco del modal de registro.
*/

const REFLEJOS = [
  { color: "salvia", retraso: 0 },
  { color: "arena", retraso: -2.5 },
  { color: "violeta", retraso: -5 },
] as const;

const CAPAS = [
  { largo: 2.5, opacidad: 1, grosor: 2 },
  { largo: 5, opacidad: 0.5, grosor: 2 },
  { largo: 8.5, opacidad: 0.24, grosor: 2.2 },
  { largo: 13, opacidad: 0.1, grosor: 2.4 },
];

export function Reflejos({ d }: { d: string }) {
  return (
    <g className="cv2-reflejos">
      {REFLEJOS.map(({ color, retraso }) => (
        <g key={color} className={`cv2-reflejo cv2-reflejo--${color}`}>
          {CAPAS.map(({ largo, opacidad, grosor }) => (
            <path
              key={largo}
              d={d}
              pathLength={100}
              className="cv2-reflejo__capa"
              strokeDasharray={`${largo} ${100 - largo}`}
              strokeWidth={grosor}
              opacity={opacidad}
              /* El guion arranca centrado en el inicio del recorrido
                 (desfase = largo/2) y avanza una vuelta entera. */
              style={
                {
                  "--desde": largo / 2,
                  "--hasta": largo / 2 - 100,
                  animationDelay: `${retraso}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </g>
      ))}
    </g>
  );
}
