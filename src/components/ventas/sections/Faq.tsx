"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { cn } from "@/lib/cn";

/*
  Sección "Soporte y FAQ". Acordeón de preguntas frecuentes + una nota de
  soporte. Copy PLACEHOLDER — editá preguntas y respuestas con lo real.

  El colapso usa grid-template-rows 0fr→1fr (animable, a diferencia de
  display:none), el mismo patrón que la bio de Pilar.
*/

const FAQS = [
  {
    q: "¿Cuánto dura el entrenamiento?",
    a: "El programa se desarrolla a lo largo de 40 días, con acceso completo al material desde el primer momento.",
  },
  {
    q: "¿Necesito experiencia previa en metafísica?",
    a: "No. El entrenamiento está diseñado para llevarte paso a paso, tengas o no conocimientos previos.",
  },
  {
    q: "¿Cómo accedo al contenido?",
    a: "Tras completar tu compra recibirás los accesos a la plataforma y a la comunidad privada por correo.",
  },
  {
    q: "¿Hay acompañamiento o quedo sola?",
    a: "Cuentas con sesiones en vivo y una comunidad privada donde acompañamos tu proceso durante todo el camino.",
  },
  {
    q: "¿Qué pasa si tengo dudas antes de comprar?",
    a: "Escríbenos por los canales de soporte y te ayudamos a resolver cualquier duda antes de decidir.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface py-section">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Reveal>
              <p className="font-sans section-eyebrow text-cyan">Soporte</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                Preguntas{" "}
                <NeonText variant="cyan">frecuentes</NeonText>
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={i} delay={0.05 * i}>
                  <div className="overflow-hidden rounded-xl border border-cyan/20 bg-background/40">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-base font-medium text-foreground transition-colors duration-300 hover:text-cyan sm:text-lg"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={20}
                        aria-hidden
                        className={cn(
                          "shrink-0 text-cyan transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="px-5 pb-4 font-sans text-sm font-light leading-relaxed text-foreground/70 sm:text-base">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Nota de soporte */}
          <Reveal delay={0.2}>
            <p className="text-center font-sans text-sm font-light text-foreground/60">
              ¿Tienes otra pregunta? Escríbenos y te ayudamos antes de decidir.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
