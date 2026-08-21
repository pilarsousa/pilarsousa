"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PILAR } from "@/components/lista-de-espera/content";
import { cn } from "@/lib/cn";

/*
  Bio de Pilar, con la segunda mitad plegada tras un botón.

  POR QUÉ PLEGADA Y NO ENTERA. El retrato ocupa el fondo de toda la sección, así
  que el alto de esta columna es el alto de la foto: con la historia completa a
  la vista, el retrato se estiraba hasta deformar la sección. Plegada, el alto
  por defecto es el de la primera mitad y quien quiera lo demás lo pide.

  DÓNDE SE CORTA, que no es indiferente: la primera mitad termina en "Pero
  durante esos años entendí algo fundamental:", que es una frase que ANUNCIA
  algo. Cortar justo ahí convierte el botón en la respuesta a una pregunta que
  el texto acaba de abrir, en vez de en un "hay más" genérico. Si algún día se
  reordenan los párrafos, hay que mantener el corte en una frase que deje al
  lector esperando.

  La animación es la misma que el acordeón de las preguntas frecuentes: altura
  de 0 a auto con framer-motion y overflow oculto, que es lo que hace que el
  texto se descubra en vez de aparecer de golpe empujando la página.

  aria-expanded y aria-controls: el botón anuncia si está abierto y a qué región
  gobierna. Sin ellos, un lector de pantalla oye "Ver más" y no sabe qué pasó al
  pulsarlo.

  Estuvo sin plegar dos veces —primero entera aquí, luego con la segunda mitad
  mudada a la sección de la lista de espera— antes de llegar a esto.
*/
export function PilarBio() {
  const [abierta, setAbierta] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {PILAR.paragraphs.map((text) => (
        <p
          key={text}
          className="font-sans text-base leading-relaxed text-foreground/85 sm:text-lg"
        >
          {text}
        </p>
      ))}

      <AnimatePresence initial={false}>
        {abierta && (
          <motion.div
            key="bio-resto"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            /* overflow-hidden es lo que hace que la animación de altura recorte
               el texto mientras se abre en lugar de desbordarlo. */
            className="overflow-hidden"
            id="pilar-bio-resto"
          >
            {/* pt-4 y no un margen: un margen del hijo se saldría del recorte y
                daría un salto al empezar la animación. */}
            <div className="flex flex-col gap-4 pt-4">
              {/* Filete a la izquierda y fuente de titular: los dos recursos que
                  usa la página para sacar una frase del hilo del texto sin
                  gritarla. Es la conclusión que anuncia el párrafo anterior. */}
              <p className="border-l-2 border-accent/40 py-1 pl-5 font-display text-lg uppercase leading-snug tracking-[0.03em] text-accent sm:text-xl">
                {PILAR.destacado}
              </p>

              {PILAR.paragraphsPost.map((text) => (
                <p
                  key={text}
                  className="font-sans text-base leading-relaxed text-foreground/85 sm:text-lg"
                >
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centrado en los dos tamaños, y no alineado al texto como estuvo: justo
          debajo tiene el CTA de la sección, que va centrado y ocupa el ancho de
          la columna. Con "Ver más" pegado a la izquierda, los dos botones
          quedaban en ejes distintos y el conjunto se leía descuadrado. */}
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        aria-controls="pilar-bio-resto"
        className="mt-1 inline-flex cursor-pointer items-center gap-2 self-center font-display text-sm uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-75"
      >
        {abierta ? PILAR.verMenos : PILAR.verMas}
        <ChevronDown
          size={16}
          strokeWidth={2}
          aria-hidden
          className={cn("transition-transform duration-300", abierta && "rotate-180")}
        />
      </button>
    </div>
  );
}
