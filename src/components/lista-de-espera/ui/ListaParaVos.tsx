"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/*
  Las seis afirmaciones de "es para vos si…", con su entrada.

  ── QUÉ HACE ──

  Cada píldora se revela de izquierda a derecha, con un filo de luz recorriendo
  el frente del barrido, y el tilde entra después de que su card haya terminado.
  Van escalonadas 90 ms en orden de lectura.

  La idea es que parezcan ENCENDERSE, no aparecer: en una landing cuyo fondo es
  una lluvia de código, un barrido con un filo luminoso pertenece al mismo
  mundo que la línea que se estira en la sección 4 y la aureola que respira en
  el panel. Un desvanecido genérico habría servido igual de bien en cualquier
  otra página, y ese es justamente el problema.

  ── CÓMO ──

  El barrido es `clip-path: inset()`, no un ancho animado. Animar el ancho
  obligaría al navegador a rehacer la maquetación en cada frame —y con ella el
  salto de línea del texto, que iría recolocándose mientras se revela—. El
  recorte no toca la maquetación: el texto ya está en su sitio desde el primer
  frame y sólo se va destapando.

  El recorte es rectangular y las esquinas redondeadas siguen viéndose, porque
  `border-radius` se aplica al pintar y `clip-path` recorta encima: durante el
  barrido, el único canto recto es el frente que avanza, que es lo que se
  quiere.

  El escalonado se declara en el padre con `staggerChildren` en vez de calcular
  un retardo por índice. Así el orden lo marca el DOM: si mañana se reordenan
  las afirmaciones, la cascada las sigue sin tocar nada.

  ── SIN MOVIMIENTO ──

  Con `prefers-reduced-motion` no se anima nada: las cards se pintan ya puestas.
  Es un efecto de entrada, y un efecto de entrada que no se puede ver no deja
  ningún hueco que rellenar.
*/

const PASO = 0.09;

const grupo: Variants = {
  oculta: {},
  visible: { transition: { staggerChildren: PASO } },
};

const pildora: Variants = {
  oculta: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* El filo viaja de un canto al otro y se apaga al llegar: es el frente del
   barrido, así que muere con él. */
const filo: Variants = {
  oculta: { left: "0%", opacity: 0 },
  visible: {
    left: "100%",
    opacity: [0, 1, 1, 0],
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* El tilde entra con un rebote corto y tarde: si sale a la vez que su card,
   compite con el barrido y se pierden los dos. */
const tilde: Variants = {
  oculta: { scale: 0.3, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, delay: 0.32, ease: [0.34, 1.56, 0.64, 1] },
  },
};

type Tramo = { text: string; clave?: boolean };

export function ListaParaVos({ items }: { items: readonly Tramo[][] }) {
  const sinMovimiento = useReducedMotion();

  return (
    <motion.ul
      className="relative mt-[7vw] grid grid-cols-1 gap-[3.2vw] md:mt-[1.5vw] md:grid-cols-2 md:gap-[0.78vw]"
      variants={grupo}
      initial={sinMovimiento ? false : "oculta"}
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {items.map((item, i) => (
        <motion.li
          key={item[0].text}
          variants={sinMovimiento ? undefined : pildora}
          className={[
            "group relative flex items-start gap-[2.6vw] overflow-hidden md:gap-[0.6vw]",
            "rounded-[2vw] border border-[#4a6b12] md:rounded-[0.6vw] md:border-[max(0.06vw,1px)]",
            "transition-[transform,box-shadow] duration-300 md:hover:-translate-y-[0.18vw]",
            "bg-[linear-gradient(180deg,#a8cf3c_0%,#93c02c_45%,#7cae1f_100%)]",
            "px-[4vw] py-[3.4vw] md:px-[0.85vw] md:py-[0.7vw]",
            "shadow-[inset_0_0.06vw_0_0_rgba(255,255,255,0.4),0_0.3vw_1vw_-0.35vw_rgba(124,181,24,0.5)]",
            "md:hover:shadow-[inset_0_0.06vw_0_0_rgba(255,255,255,0.55),0_0.7vw_1.8vw_-0.4vw_rgba(150,220,40,0.75)]",
            "font-sans text-[3.7vw] leading-[1.45] text-[#16210a] md:text-[clamp(0.45rem,0.79vw,1rem)]",
          ].join(" ")}
        >
          {/* EL DESTELLO EN REPOSO. Cruza en 1,3 s y descansa casi seis; el
              retardo lo pone el índice, así que las seis cruzan por turnos y no
              a la vez. Arranca a los 1,8 s para no pisarse con la entrada.

              overflow-hidden en la card es lo que lo recorta: la banda mide más
              que la píldora a propósito, para entrar y salir por fuera. */}
          {!sinMovimiento && (
            <span
              aria-hidden
              className="le-destello pointer-events-none absolute inset-y-0 -left-[15%] w-[40%]"
              style={{ animationDelay: `${1.8 + i * 0.9}s` }}
            />
          )}

          {!sinMovimiento && (
            <motion.span
              aria-hidden
              variants={filo}
              className="pointer-events-none absolute inset-y-0 w-[2px] md:w-[0.14vw] md:min-w-[2px] bg-[#f2ffcc] shadow-[0_0_0.9vw_0.12vw_rgba(214,255,140,0.95)]"
            />
          )}

          {/* UN TILDE Y NO UNA CRUZ. La sección se titula "es para vos si…", así
              que cada punto es algo en lo que el lector SE RECONOCE: el tilde lo
              lee como "sí, este soy yo". Una cruz diría lo contrario —algo que
              falla o que hay que evitar— y volvería la lista un reproche.

              Va marcado como decorativo: lo que dice ya lo dice el titular de la
              sección, y un lector de pantalla anunciando "marca de verificación"
              seis veces sólo añade ruido.

              El dibujo va como SVG en vez de un icono de librería porque esos se
              miden en píxeles fijos: dentro de un disco que mide vw, el tilde se
              quedaría pequeño en pantallas grandes. Aquí ocupa un porcentaje del
              disco y los dos escalan juntos. */}
          <motion.span
            aria-hidden
            variants={sinMovimiento ? undefined : tilde}
            /* AL PASAR EL RATÓN EL DISCO SE INVIERTE: se llena de lima y el
               tilde se vuelve oscuro. La sección se titula "es para vos si…", así
               que cada punto es algo en lo que el lector se reconoce; invertir la
               marca hace que pasar por encima se sienta como ir tildando una
               casilla. Es la razón de que la animación sea ésta y no un adorno
               cualquiera. */
            className="relative z-10 mt-[0.6vw] flex size-[5.6vw] shrink-0 items-center justify-center rounded-full bg-[#16210a] text-[#b8ea3c] transition-colors duration-300 md:mt-[0.14vw] md:size-[1.3vw] md:max-h-[26px] md:min-h-[15px] md:max-w-[26px] md:min-w-[15px] md:group-hover:bg-[#b8ea3c] md:group-hover:text-[#16210a]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[58%]"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </motion.span>

          {/* El concepto clave va SÓLO EN NEGRITA. Llevó subrayado y se retiró:
              seis píldoras con un trazo bajo cada frase clave llenaban el bloque
              de rayas y competían con los filetes de las propias cards. El peso
              basta para marcar el concepto sin ensuciar la lectura. */}
          <span className="relative z-10">
            {item.map((t) =>
              t.clave ? (
                <strong key={t.text} className="font-bold">
                  {t.text}
                </strong>
              ) : (
                <span key={t.text}>{t.text}</span>
              ),
            )}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
