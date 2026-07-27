"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, LifeBuoy } from "lucide-react";
import { Badge } from "@/components/ventas/ui/Badge";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { WHATSAPP_SUPPORT_URL } from "@/lib/links";
import { cn } from "@/lib/cn";

// Glifo oficial de WhatsApp (lucide no trae logos de marca). Hereda currentColor.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.748-.983v.376zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

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
        <div className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <Badge icon={LifeBuoy}>Soporte</Badge>
          </Reveal>
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

        {/* Soporte por WhatsApp — línea directa para consultas antes de comprar */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="font-sans text-sm font-light text-foreground/60">
              ¿Tienes otra pregunta? Habla con nuestro equipo de soporte.
            </p>
            <a
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#25D366_0%,#128C7E_100%)] px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_40px_-8px_rgba(37,211,102,0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
            >
              <WhatsAppIcon className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              Consultar por WhatsApp
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
