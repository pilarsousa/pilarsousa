"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { cn } from "@/lib/cn";

/*
  Sección "Soporte y FAQ". Acordeón con el mismo patrón que el FAQ del bootcamp
  (icono Plus que rota a X, animación de altura con framer-motion), pero en la
  paleta neón de esta landing y con preguntas del programa Volver al Origen.

  Copy PLACEHOLDER — editá preguntas y respuestas con lo real.
*/

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "¿Cuánto dura Volver al Origen?",
    a: "El entrenamiento se desarrolla a lo largo de 40 días, con acceso completo al material desde el primer momento.",
  },
  {
    q: "¿Necesito experiencia previa en metafísica?",
    a: "No. El programa está diseñado para llevarte paso a paso, tengas o no conocimientos previos.",
  },
  {
    q: "¿Las sesiones quedan grabadas?",
    a: "Sí. Cada sesión en vivo queda grabada, así que podés verla cuando quieras y avanzar a tu ritmo.",
  },
  {
    q: "¿Cómo accedo al contenido después de comprar?",
    a: "Al confirmar tu compra recibirás por correo los accesos a la plataforma y a la comunidad privada (revisá spam o promociones).",
  },
  {
    q: "¿Hay acompañamiento o quedo sola?",
    a: "Cuentas con sesiones en vivo con Pilar y una comunidad privada donde acompañamos tu proceso durante todo el camino.",
  },
  {
    q: "¿Puedo hacerlo desde cualquier país?",
    a: "Sí. Volver al Origen es 100% online, así que podés participar desde donde estés — solo necesitás conexión a internet.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-cyan/15 last:border-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-medium text-foreground sm:text-lg">
          {q}
        </span>
        <span
          aria-hidden
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full border border-cyan/40 text-cyan transition-transform duration-300",
            open && "rotate-45",
          )}
        >
          <Plus size={16} strokeWidth={2} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`faq-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-11 font-sans text-sm font-light leading-relaxed text-foreground/70 sm:text-base">
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
    <section id="faq" className="bg-surface py-section">
      <Container narrow>
        <div className="flex flex-col items-center text-center">
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Preguntas{" "}
              <NeonText variant="cyan">frecuentes</NeonText>
            </h2>
          </Reveal>
        </div>

        <ul className="mx-auto mt-10 max-w-2xl">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
