import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/mision-origen/ui/CtaButton";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import paso1Icon from "@/components/mision-origen/regalo-mision/1.png";
import paso2Icon from "@/components/mision-origen/regalo-mision/2.png";
import paso3Icon from "@/components/mision-origen/regalo-mision/3.png";
import regaloIcon from "@/components/mision-origen/regalo-mision/regalo-icon.png";

/* Cada card lleva un ícono 3D como título y su párrafo como descripción.
   Cuatro cards → grid 2×2. */
const CARDS = [
  {
    icon: paso1Icon,
    alt: "Paso 1",
    text: "Descubrirás los 3 pasos de mi Sistema Práctico de Manifestación para dar un nuevo salto cuántico cada 90 días.",
  },
  {
    icon: paso2Icon,
    alt: "Paso 2",
    text: "Desbloquea el patrón que te mantiene en estancamiento y que por más que intentas avanzar te mantiene en el mismo lugar.",
  },
  {
    icon: paso3Icon,
    alt: "Paso 3",
    text: "Aprenderás cómo reprogramar tu identidad para poder vencer los miedos y caminar con propósito, coherencia y facilidad.",
  },
  {
    icon: regaloIcon,
    alt: "Regalo",
    text: "Recibirás el Certificado Digital de Participación del Evento Misión Origen con Pilar Sousa.",
  },
];

/**
 * Section 3 — Recompensa / What you'll get.
 * Goal: list the concrete takeaways of the masterclass.
 * Two-column layout: headline left, numbered benefit cards right,
 * plus a gift card highlighting the participation certificate.
 */
export function Codigo() {
  return (
    <section id="codigo" className="relative bg-background py-section">
      {/* Degradé de transición: funde el negro con el azul noche de la sección
          siguiente (Protocolo), suavizando el corte entre secciones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_bottom,transparent,#170f22)]"
      />
      <Container>
        <div className="flex flex-col gap-12">

          {/* Header — headline centrado arriba, ancho completo */}
          <div className="flex flex-col items-center gap-6 text-center">
            <Reveal>
              <p className="font-sans section-eyebrow text-neon-pink">
                Recompensa
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
                ¿Qué vas a llevarte en esta{" "}
                <NeonText variant="pink">Masterclass?</NeonText>
              </h2>
            </Reveal>
          </div>

          {/* Cards — grid 2×2 con buen espacio. El número (o el ícono de regalo)
              hace de título; el párrafo es la descripción. */}
          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {CARDS.map((card, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <div className="fancy-card group flex h-full flex-col gap-3 p-7">
                  {/* Título — ícono 3D del paso (o el regalo en la última) */}
                  <Image
                    src={card.icon}
                    alt={card.alt}
                    width={44}
                    height={44}
                    className="h-11 w-11 object-contain"
                  />
                  {/* Descripción */}
                  <p className="font-sans text-base font-light leading-relaxed text-zinc-300">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA — centrado al final */}
          <Reveal delay={0.1 + CARDS.length * 0.1}>
            <div className="flex justify-center">
              <CtaButton variant="pill">
                ✦ Quiero acceder al evento ✦
              </CtaButton>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
