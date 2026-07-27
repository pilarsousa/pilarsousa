import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import mockup from "@/../public/mision-origen-venta/mockup.png";
import regaloIcon from "@/components/mision-origen/regalo-mision/regalo-icon.png";
import {
  CalendarClock,
  KeyRound,
  Users,
  MessagesSquare,
  Headphones,
  MessageCircleQuestion,
  Map,
  Check,
} from "lucide-react";

/*
  Sección "Todo lo que recibes" — el desglose completo de la oferta con el
  mockup del packaging arriba y la lista de todo lo incluido. Los bonos se
  destacan aparte, en una card propia con el icono de regalo, porque son el
  gancho de esta edición.
*/

const INCLUYE = [
  {
    icon: CalendarClock,
    text: "13 mentorías en directo con Pilar Sousa (2 por semana).",
  },
  {
    icon: KeyRound,
    text: "El sistema completo de los 13 Códigos Originales para manifestar desde tu nueva identidad.",
  },
  {
    icon: Users,
    text: "Comunidad privada que te sostiene, impulsa y eleva durante todo el proceso.",
  },
  {
    icon: MessagesSquare,
    text: "Canal privado para compartir dudas, procesos y recibir acompañamiento.",
  },
  {
    icon: Headphones,
    text: "Soporte diario con acompañamiento por 3 meses.",
  },
  {
    icon: MessageCircleQuestion,
    text: "Sesión quincenal de preguntas y respuestas en directo, con interacciones 1 a 1.",
  },
  {
    icon: Map,
    text: "Roadmap personalizado para que sepas exactamente qué trabajar en cada etapa.",
  },
] as const;

export function Oferta() {
  return (
    <section id="oferta" className="bg-surface py-section">
      <Container>
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hot-pink/50 bg-hot-pink/15 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white">
                🚨 Plazas abiertas
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                ¿Qué incluye esta 2ª edición de{" "}
                <NeonText variant="cyan">Volver al Origen</NeonText>?
              </h2>
            </Reveal>
          </div>

          {/* Mockup con todo el packaging del programa */}
          <Reveal delay={0.15}>
            <div className="w-full max-w-4xl">
              <Image
                src={mockup}
                alt="Todo lo que incluye el programa: plataforma, sesiones, recursos, libro y certificado"
                priority
                sizes="(min-width: 768px) 56rem, 100vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          {/* Lista de lo incluido */}
          <Reveal delay={0.2}>
            <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
              {INCLUYE.map(({ icon: Icon, text }, i) => (
                <li
                  key={i}
                  className="pricing-item shine-hover flex min-h-[60px] items-center gap-3 px-4 py-2"
                >
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black text-cyan"
                  >
                    <Icon size={18} />
                  </span>
                  <span className="font-sans text-sm font-medium leading-tight text-foreground/90 sm:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ── Bonos destacados ──
              Card diferenciada (borde/gradiente rosa + icono de regalo) para que
              los bonos salten a la vista respecto de la lista de arriba. */}
          <Reveal delay={0.25} className="w-full max-w-3xl">
            <div className="relative overflow-hidden rounded-2xl border border-hot-pink/40 bg-[linear-gradient(135deg,rgba(249,2,129,0.14),rgba(135,36,120,0.1))] p-px shadow-[0_0_40px_rgba(249,2,129,0.18)]">
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-background/85 px-6 py-8 text-center sm:flex-row sm:gap-6 sm:px-10 sm:text-left">
                <Image
                  src={regaloIcon}
                  alt="Bonos de regalo"
                  width={72}
                  height={72}
                  className="size-16 shrink-0 object-contain sm:size-20"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-hot-pink">
                    Solo en esta edición
                  </span>
                  <p className="font-display text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                    <NeonText variant="pink">3 bonos especiales</NeonText> + 1 bono
                    extra
                  </p>
                  <p className="mt-1 font-sans text-sm font-medium text-foreground/75 sm:text-base">
                    Disponibles únicamente para quienes acceden a esta 2ª edición.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
