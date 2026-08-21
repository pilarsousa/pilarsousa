"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";

/*
  Sistema de raíces del fondo de "…es para vos si": entran por los cantos de la
  pantalla, se ramifican y cada tronco termina tocando una card.

  DE DÓNDE VIENE ESTO. Empezó siendo una flecha entre card y card, luego un
  camino punteado, luego una raíz por hueco. Los tres compartían el mismo
  problema: eran un ENLACE, una pieza que iba de A a B, y por muy orgánico que
  se dibujara se leía como un conector colocado. Una raíz no une dos cosas —
  nace en un sitio y se extiende.

  Y SE TOCAN ENTRE SÍ. Seis raíces paralelas, por muy ramificadas que estén, se
  leen como seis dibujos; con puentes cruzando de una a otra, como una sola
  planta. Ver PUENTES.

  TRES NIVELES, Y ES LO QUE LAS HACE PARECER RAÍCES. Un tronco con ramas ya se
  lee como una curva con adornos; en cuanto las ramas tienen ramitas, el ojo
  reconoce el patrón, porque así crece todo lo que crece de verdad. El grosor y
  la opacidad bajan en cada nivel —1,7 / 0,9 / 0,55— y esa jerarquía es lo que
  cuenta quién sale de quién.

  CADA TRONCO TIENE DESTINO. Termina en el borde de una card concreta, y por eso
  las coordenadas de abajo no son decorativas: salen de dónde cae cada card en
  el zigzag. Las cards ocupan el 58% del ancho y se alternan, así que las de
  índice par llegan hasta x≈58 y las impares arrancan en x≈42; en vertical se
  reparten de y≈14 a y≈100. Si se cambia el ancho de las cards o su separación,
  estos remates dejan de tocar donde deben.

  SÓLO EN MÓVIL, por lo mismo: en escritorio las cards van en una rejilla de dos
  columnas y estos destinos no significan nada. Allí queda la espina vertical
  de la propia sección.

  CÓMO CRECEN. Con stroke-dashoffset, no con recorte: la raya discontinua se
  hace tan larga como el trazo entero y se va corriendo hasta descubrirlo, así
  que el dibujo aparece por su punta y en el sentido en que se recorre — que es
  crecer. Un recorte lo descubriría en vertical o en horizontal, da igual cómo
  vaya el trazo.

  Y el largo no hay que medirlo: pathLength="1" le dice al navegador que trate
  el recorrido como si midiera 1, sea cual sea su forma real, así que el
  dasharray y el offset son 1 y 0 para todos por igual. Sin eso habría que leer
  getTotalLength de cada path y recalcularlo en cada cambio de ancho.

  Los tiempos van encadenados por niveles: la rama empieza cuando el tronco ya
  lleva recorrido y la ramita cuando la rama ya está, porque salen de ellos y no
  pueden existir antes. Todo a la vez delataría que es una animación.

  Es decoración pura: aria-hidden y pointer-events-none.
*/

type Rama = { d: string; ramitas: string[] };
type Raiz = { tronco: string; ramas: Rama[]; retardo: number };

/* Seis raíces, una por card. Entran alternando lado y a alturas desiguales a
   propósito: repartidas por igual, el patrón se ve. El comentario de cada una
   dice en qué card muere. */
const RAICES: Raiz[] = [
  /* → card 1 (izquierda), por su canto superior */
  {
    tronco: "M0 3 C 7 7, 11 6, 15 11 C 18 14, 19 13, 22 15",
    ramas: [
      { d: "M11 6 C 14 3, 18 4, 20 1", ramitas: ["M18 4 C 19 2, 21 2, 22 0"] },
      {
        d: "M15 11 C 13 14, 9 15, 7 19",
        ramitas: ["M9 15 C 8 18, 5 19, 4 22", "M11 13 C 10 16, 11 18, 9 20"],
      },
    ],
    retardo: 0,
  },
  /* → card 2 (derecha), por su canto superior */
  {
    tronco: "M100 8 C 92 12, 86 16, 80 22 C 76 25, 74 26, 71 29",
    ramas: [
      {
        d: "M86 16 C 88 20, 92 22, 93 26",
        ramitas: ["M92 22 C 94 25, 97 26, 98 29"],
      },
      {
        d: "M80 22 C 79 26, 81 30, 79 33",
        ramitas: ["M81 30 C 83 32, 84 35, 83 38"],
      },
    ],
    retardo: 0.3,
  },
  /* → card 3 (izquierda), por su canto derecho */
  {
    tronco: "M0 33 C 8 34, 14 38, 20 42 C 26 45, 32 45, 38 47",
    ramas: [
      {
        d: "M14 38 C 15 42, 13 46, 15 50",
        ramitas: ["M13 46 C 11 49, 11 53, 9 56"],
      },
      { d: "M26 44 C 28 41, 31 40, 33 37", ramitas: ["M31 40 C 33 38, 34 35, 36 34"] },
    ],
    retardo: 0.6,
  },
  /* → card 4 (derecha), por su canto superior */
  {
    tronco: "M100 48 C 92 51, 86 54, 80 58 C 76 60, 74 61, 71 62",
    ramas: [
      {
        d: "M86 54 C 87 58, 90 61, 90 65",
        ramitas: ["M90 61 C 92 64, 95 65, 96 68"],
      },
      { d: "M80 58 C 79 62, 80 65, 78 68", ramitas: [] },
    ],
    retardo: 0.9,
  },
  /* → card 5 (izquierda), por su canto derecho */
  {
    tronco: "M0 66 C 9 68, 16 71, 23 74 C 29 76, 34 76, 40 77",
    ramas: [
      {
        d: "M16 71 C 17 75, 15 79, 17 83",
        ramitas: ["M15 79 C 13 82, 13 86, 11 89"],
      },
      { d: "M29 75 C 31 72, 34 71, 36 68", ramitas: ["M34 71 C 36 69, 37 66, 39 65"] },
    ],
    retardo: 1.2,
  },
  /* → card 6 (derecha), por su canto superior */
  {
    tronco: "M100 82 C 93 84, 88 86, 82 88 C 78 89, 76 89, 73 90",
    ramas: [
      {
        d: "M88 86 C 89 90, 92 93, 92 97",
        ramitas: ["M92 93 C 94 95, 96 96, 97 99"],
      },
    ],
    retardo: 1.5,
  },
];

/* Puentes entre troncos.

   Es lo que convierte seis raíces sueltas en UN SISTEMA. Las raíces de verdad
   se tocan: se cruzan, se apoyan unas en otras y a veces se funden. Sin estos
   enlaces el dibujo es un conjunto de líneas paralelas por muy ramificadas que
   estén; con ellos, el ojo entiende que todo es la misma planta.

   Cada puente arranca y muere SOBRE el recorrido de dos troncos distintos —los
   puntos de abajo están tomados de sus curvas, no puestos a ojo—, porque un
   enlace que no llega a tocar se ve como una raya suelta cruzando por detrás.

   Van más finos y más apagados que cualquier otro nivel (0,5 y 0,15): son lo
   último que debe verse. Y crecen los últimos, cuando los dos troncos que unen
   ya están: un puente no puede existir antes que sus extremos. */
const PUENTES: { d: string; retardo: number }[] = [
  /* tronco 1 → tronco 3, por el costado izquierdo */
  { d: "M22 15 C 25 23, 18 30, 14 38", retardo: 2.2 },
  /* tronco 2 → tronco 4, por el derecho */
  { d: "M71 29 C 67 39, 75 49, 80 58", retardo: 2.5 },
  /* tronco 3 → tronco 5 */
  { d: "M38 47 C 43 57, 35 69, 40 77", retardo: 2.8 },
  /* tronco 4 → tronco 6 */
  { d: "M71 62 C 67 72, 77 83, 73 90", retardo: 3.1 },
  /* uno que cruza de lado a lado, para que el sistema no se lea como dos
     columnas independientes */
  { d: "M20 42 C 36 39, 56 36, 71 29", retardo: 3.4 },
];

/* Un trazo que crece. Los tres niveles son el mismo elemento con distinto
   grosor, opacidad y momento de arranque. */
function Trazo({
  d,
  grosor,
  opacidad,
  duracion,
  retardo,
  crece,
}: {
  d: string;
  grosor: number;
  opacidad: number;
  duracion: number;
  retardo: number;
  crece: boolean;
}) {
  return (
    <path
      d={d}
      stroke="currentColor"
      strokeWidth={grosor}
      strokeLinecap="round"
      /* Sin esto, la caja —mucho más alta que ancha— estiraría el sistema de
         coordenadas de forma desigual y con él el grosor del trazo: las raíces
         saldrían aplastadas en un eje. */
      vectorEffect="non-scaling-stroke"
      opacity={opacidad}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={crece ? 0 : 1}
      style={{
        transition: `stroke-dashoffset ${duracion}s ease-out ${retardo}s`,
      }}
    />
  );
}

export function RaicesFondo({ className }: { className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const enPantalla = useInView(caja, { once: true, amount: 0.15 });

  return (
    <div ref={caja} aria-hidden className={cn("pointer-events-none", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
        className="h-full w-full text-accent"
      >
        {/* Los puentes van PRIMERO en el orden de pintado, así que quedan por
            debajo de los troncos: donde se tocan, es el tronco el que se ve
            entero y el puente el que parece nacer de él. */}
        {PUENTES.map((puente) => (
          <Trazo
            key={puente.d}
            d={puente.d}
            grosor={0.5}
            opacidad={0.15}
            duracion={1.4}
            retardo={puente.retardo}
            crece={enPantalla}
          />
        ))}

        {RAICES.map((raiz) => (
          <g key={raiz.tronco}>
            <Trazo
              d={raiz.tronco}
              grosor={1.7}
              opacidad={0.42}
              duracion={1.8}
              retardo={raiz.retardo}
              crece={enPantalla}
            />

            {raiz.ramas.map((rama, i) => (
              <g key={rama.d}>
                <Trazo
                  d={rama.d}
                  grosor={0.9}
                  opacidad={0.28}
                  duracion={1}
                  retardo={raiz.retardo + 0.9 + i * 0.2}
                  crece={enPantalla}
                />

                {rama.ramitas.map((ramita, j) => (
                  <Trazo
                    key={ramita}
                    d={ramita}
                    grosor={0.55}
                    opacidad={0.2}
                    duracion={0.7}
                    retardo={raiz.retardo + 1.7 + i * 0.2 + j * 0.15}
                    crece={enPantalla}
                  />
                ))}
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
