"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { FAQ } from "@/components/volver-al-origen/content";
import { cn } from "@/lib/cn";

/*
  Preguntas frecuentes.

  Es el acordeón que ya usan la landing de ventas y la del bootcamp —mismo
  patrón de interacción: un Plus que gira 45° hasta volverse aspa y la altura
  animada con framer-motion— repintado a la paleta de esta landing. Se copia el
  comportamiento y no el componente porque aquel vive en la paleta neón cian y
  usa su propio Container y sus tipografías; compartirlo obligaría a
  parametrizar media hoja de estilos para ahorrar treinta líneas.

  Las preguntas son las de la lista de espera, no las del programa: aquí nadie
  está comprando todavía, y lo que frena a alguien en este punto es si
  registrarse cuesta algo o le compromete a algo.

  Va después del formulario a propósito. Quien ya se ha registrado no las
  necesita; están para el que ha llegado al final y ha dudado. Ponerlas antes
  sembraría objeciones en quien no las tenía.

  Sin textura propia: se queda con el fondo oscuro continuo de la página, que es
  el que alterna con la textura clara de la sección del formulario.

  El estado vive en cada fila y no en la sección: así abrir una no cierra las
  demás y se pueden comparar dos respuestas a la vez.
*/

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [abierta, setAbierta] = useState(false);

  return (
    <li className="border-b border-accent/15 last:border-none">
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base uppercase leading-snug tracking-[0.03em] text-foreground sm:text-lg">
          {q}
        </span>

        {/* El mismo Plus girado 45° hace de aspa al abrirse: un solo icono para
            los dos estados evita el salto que produce intercambiar dos SVG. */}
        <span
          aria-hidden
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-transform duration-300",
            abierta && "rotate-45",
          )}
        >
          <Plus size={16} strokeWidth={2} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {abierta && (
          <motion.div
            key={`faq-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            /* overflow-hidden es lo que hace que la animación de altura recorte
               el texto en lugar de desbordarlo mientras se abre. */
            className="overflow-hidden"
          >
            <p className="pr-11 pb-5 font-sans text-sm leading-relaxed text-foreground/75 sm:text-base">
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
      aria-labelledby="faq-title"
      className="relative isolate py-[clamp(4rem,2.5rem+7vh,8rem)] text-foreground"
    >
      <VoContainer>
        <ScrollIn>
          <SectionTitle id="faq-title" accent={FAQ.titleAccent}>
            {FAQ.title}
          </SectionTitle>
        </ScrollIn>

        <ScrollIn delay={0.1}>
          <ul className="mx-auto mt-10 max-w-2xl">
            {FAQ.items.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </ul>
        </ScrollIn>
      </VoContainer>
    </section>
  );
}
