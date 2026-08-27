"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ } from "@/components/lista-de-espera/content";
import { cn } from "@/lib/cn";

/*
  Preguntas frecuentes.

  ES EL ACORDEÓN QUE YA HABÍA EN ESTA LANDING, repintado a la paleta nueva. Se
  conserva el comportamiento —un Plus que gira 45° hasta volverse aspa y la
  altura animada— y se rehace el envoltorio, porque el anterior colgaba de
  ScrollIn y SectionTitle, que se retiraron con el diseño viejo.

  EL ESTADO VIVE EN CADA FILA Y NO EN LA SECCIÓN: así abrir una no cierra las
  demás y se pueden comparar dos respuestas a la vez. Es deliberado, no una
  simplificación — el acordeón de una sola fila abierta obliga a recordar lo que
  decía la anterior.

  UN SOLO ICONO PARA LOS DOS ESTADOS. El Plus girado 45° ya es un aspa, así que
  no hace falta intercambiar dos SVG: intercambiarlos produce un salto en el
  cambio, y girar uno se puede animar.

  VA DESPUÉS DEL BLOQUE DE BONUS, y el orden importa. Quien ya se registró no
  necesita estas preguntas; están para quien llegó al final y dudó. Ponerlas
  antes sembraría objeciones en quien no las tenía.

  ── SOBRE BLANCO, Y ESO OBLIGA A CAMBIAR EL VERDE ──

  Nació sobre fondo oscuro y ahora va sobre blanco, así que no basta con invertir
  la letra. El lima de la marca (#A3CA23) sobre blanco da un contraste de 2,3:1
  —por debajo del mínimo legible— así que el acento del titular usa un verde más
  cerrado (#5F8A12), que conserva la familia y sí se lee.

  El lima sigue estando, pero sólo donde no tiene que leerse: los filetes y el
  aro del icono, que son señal y no texto. Ahí un color flojo no estorba.

  Se retiró también el halo verde que llevaba en la versión oscura: iba con
  mix-blend-screen, y "screen" sobre blanco da blanco. Habría sido una capa
  invisible gastando pintura.
*/

function Fila({ q, a, indice }: { q: string; a: string; indice: number }) {
  const [abierta, setAbierta] = useState(false);

  return (
    <li className="border-b border-[#a3ca23]/55 last:border-none md:border-b-[max(0.05vw,1px)]">
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        className="flex w-full cursor-pointer items-center justify-between gap-[5vw] py-[4.5vw] text-left md:gap-[1.5vw] md:py-[1.15vw]"
      >
        <span className="font-display text-[4.4vw] leading-snug text-[#141b0a] md:text-[clamp(0.6rem,0.95vw,1.2rem)]">
          {q}
        </span>

        <span
          aria-hidden
          className={cn(
            "flex size-[9vw] shrink-0 items-center justify-center rounded-full md:size-[2.1vw] md:min-h-[26px] md:min-w-[26px]",
            "border-[max(0.05vw,1px)] border-[#a3ca23] text-[#5f8a12]",
            "transition-transform duration-300",
            abierta && "rotate-45",
          )}
        >
          <Plus size={16} strokeWidth={2} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {abierta && (
          <motion.div
            key={`faq-${indice}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            /* overflow-hidden es lo que hace que la animación de altura recorte
               el texto mientras se abre en vez de desbordarlo. */
            className="overflow-hidden"
          >
            <p className="pr-[12vw] pb-[4.5vw] font-sans text-[3.8vw] leading-[1.6] text-[#4a5340] md:pr-[3.6vw] md:pb-[1.15vw] md:text-[clamp(0.45rem,0.8vw,1rem)]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-titulo"
      className="relative isolate bg-white py-[14vw] md:py-[4.5vw]"
    >
      <div className="relative mx-auto w-[87%] md:w-[59%]">
        <h2
          id="faq-titulo"
          className="text-center font-display text-[6.4vw] leading-[1.25] text-[#141b0a] md:text-[clamp(0.95rem,1.4583vw,1.9rem)] md:leading-[1.3] md:font-bold"
        >
          {FAQ.title} <span className="text-[#5f8a12]">{FAQ.titleAccent}</span>
        </h2>

        <ul className="mt-[8vw] md:mt-[2.2vw]">
          {FAQ.items.map((item, i) => (
            <Fila key={item.q} q={item.q} a={item.a} indice={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
