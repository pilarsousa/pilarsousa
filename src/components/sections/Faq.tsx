"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "¿Necesito experiencia previa en espiritualidad o metafísica?",
    a: "No. El bootcamp está diseñado para empezar desde cero: cada ejercicio se explica paso a paso, sin lenguaje técnico ni conocimientos previos.",
  },
  {
    q: "¿Las clases quedan grabadas?",
    a: "Sí. Cada encuentro queda grabado y vas a tener el acceso a las grabaciones.",
  },
  {
    q: "¿Cuánto dura cada encuentro?",
    a: "Cada sesión dura entre 1h y 1h 30min.",
  },
  {
    q: "¿Qué pasa si no puedo asistir en vivo?",
    a: "Tranquila/o: al quedar grabado, podés verlo cuando puedas y seguir el ritmo del bootcamp a tu tiempo.",
  },
  {
    q: "¿Voy a recibir ejercicios o material práctico?",
    a: "Sí. Cada clase incluye entregables concretos y un plan diario para pasar de la teoría a la acción real.",
  },
  {
    q: "¿Este bootcamp es lo mismo que Volver al Origen?",
    a: "No. Este bootcamp te da todo lo necesario para resetear tu identidad en 3 días, y al finalizar vas a tener la posibilidad de sumarte al entrenamiento de 40 días de Volver al Origen si quieres seguir evolucionando.",
  },
  {
    q: "¿Qué pasa después de los 3 días?",
    a: "Te habrás convertido en la persona capaz de aplicar lo aprendido y empezar a manifestar otra realidad, con un plan de acción concreto en la mano.",
  },
  {
    q: "¿Puedo hacerlo si estoy en otro país?",
    a: "Sí. El bootcamp es 100% online y en vivo, así que podés participar desde cualquier país — solo necesitás conexión a internet.",
  },
  {
    q: "¿Cómo accedo después de comprar?",
    a: "Al confirmar tu inscripción vas a recibir acceso a un grupo privado de WhatsApp mediante email, (revisa spam o promociones) y mediante WhatsApp donde te compartimos las fechas, los accesos y todo lo que necesitás para el bootcamp.",
  },
  {
    q: "¿Cuánto tiempo tengo para inscribirme?",
    a: "Las inscripciones están abiertas hasta el 9 de julio a las 23:59.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-earth-gold/20 last:border-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-medium text-forest-900 sm:text-lg">
          {q}
        </span>
        <span
          aria-hidden
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full border border-earth-gold/40 text-earth-gold transition-transform duration-300",
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
            <p className="pb-5 pr-11 font-sans text-sm leading-relaxed text-forest-900/70 sm:text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/**
 * Section 7 — FAQ, right after the testimonials close.
 *
 * On the same warm-cream stage as Patron (the only light break in the dark
 * rhythm), so it reads as a calm "let's resolve your doubts" pause before the
 * final push. A simple accordion — one question open at a time per item,
 * gold plus-to-cross icon, no external dependency.
 */
export function Faq() {
  return (
    <section id="faq" className="bg-cream py-[clamp(4rem,2rem+8vh,7rem)]">
      <Container narrow>
        <SectionTitle tone="light">
          Preguntas{" "}
          <em className="font-accent font-medium italic text-earth-gold">
            frecuentes
          </em>
        </SectionTitle>

        <ul className="mx-auto mt-10 max-w-2xl">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
