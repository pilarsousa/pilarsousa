import { CalendarDays, Radio, FlaskConical, Gift } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/cientifico-v1/ui/Reveal";
import { FactBadge } from "@/components/cientifico-v1/ui/FactBadge";
import { NeonText } from "@/components/cientifico-v1/ui/NeonText";
import { CtaButton } from "@/components/cientifico-v1/ui/CtaButton";
import { ImagenTemporal } from "@/components/cientifico-v1/ui/ImagenTemporal";

/* La fecha debe coincidir con el countdown de AnnouncementBar (TARGET): si
   cambia uno, actualizar el otro. */
const FACTS = [
  { label: "17 de octubre · 19:00", icon: <CalendarDays size={15} /> },
  { label: "Online en vivo", icon: <Radio size={15} /> },
  { label: "Dato temporal", icon: <FlaskConical size={15} /> },
  { label: "Acceso gratuito", icon: <Gift size={15} /> },
];

/**
 * Section 1 — Hero / Offer.
 *
 * Misma estructura que mision-origen: la foto ocupa un lado (derecha en
 * desktop, arriba en mobile) y el contenido se apila sobre el hueco libre,
 * con un velo del color del fondo para que el texto se lea. Mientras no hay
 * foto, ImagenTemporal marca su lugar.
 *
 * ⚠️ COPY E IMAGEN TEMPORALES.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="cv1-fondo-bruma relative isolate flex min-h-[100svh] items-start overflow-hidden bg-background lg:h-[750px] lg:min-h-0"
    >
      {/* ── Imagen ──
          Mobile: franja de arriba (46% de la pantalla); el contenido cae
          debajo. Desktop: mitad derecha a toda altura. Al llegar la foto
          real, reemplazar por <picture> con los dos encuadres. */}
      <ImagenTemporal
        nota="Foto principal de Pilar. En desktop, ella a la derecha y aire a la izquierda para el texto."
        medidas="Desktop 1920 × 900 · Mobile 1080 × 1350"
        /* La máscara desvanece la imagen hacia el contenido (abajo en mobile,
           a la izquierda en desktop). Es máscara y no un velo de color: así
           deja ver las manchas del fondo sin costura, y sirve igual si la
           sección pasa a verde o cuando llegue la foto real. */
        className="absolute inset-x-0 top-0 -z-20 h-[46svh] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:inset-y-0 lg:left-auto lg:h-full lg:w-1/2 lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]"
      />

      <Container className="pb-14 pt-[42svh] lg:py-0 lg:pt-14">
        <div className="lg:max-w-[50%]">
          <div className="flex flex-col">

            <Reveal>
              <p className="whitespace-nowrap font-display text-2xl leading-tight tracking-tight sm:text-3xl lg:text-[1.75rem]">
                <NeonText variant="multi">Volver al Origen</NeonText>
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h1
                id="hero-title"
                className="mt-4 font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl lg:text-[2rem] lg:leading-[1.25]"
              >
                Convierte lo que sabes sobre manifestación en un{" "}
                <NeonText variant="salvia">método que puedes comprobar</NeonText>{" "}
                y da tu próximo Salto Cuántico.
              </h1>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-foreground/70 lg:text-lg">
                Texto temporal. Aquí va la bajada del titular: una o dos frases
                que expliquen qué va a vivir la persona en el evento y por qué es
                distinto a lo que ya probó.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <ul
                className="mt-6 flex max-w-lg flex-wrap gap-3"
                aria-label="Detalles del programa"
              >
                {FACTS.map((fact) => (
                  <li key={fact.label}>
                    <FactBadge icon={fact.icon}>{fact.label}</FactBadge>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.45} className="mt-8 w-full max-w-md">
              <CtaButton variant="pill" block>
                Quiero dar mi Salto Cuántico
              </CtaButton>
            </Reveal>

          </div>
        </div>
      </Container>
    </section>
  );
}
