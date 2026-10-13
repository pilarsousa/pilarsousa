import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/cientifico-v1/ui/NeonText";
import { Reveal } from "@/components/cientifico-v1/ui/Reveal";

/* ⚠️ COPY TEMPORAL. Static class strings so Tailwind v4 includes them. */
const ITEMS = [
  {
    number: "01",
    numberClass: "text-[#4e7a6c]",
    text: "Texto temporal. Primer rasgo de la persona a la que le sirve este evento: algo que ya vive o siente.",
  },
  {
    number: "02",
    numberClass: "text-[#7a6596]",
    text: "Texto temporal. Segundo rasgo: lo que intentó hasta ahora y por qué no le alcanzó.",
  },
  {
    number: "03",
    numberClass: "text-[#4b3a6b]",
    text: "Texto temporal. Tercer rasgo: el patrón que se le repite aunque cambie de estrategia.",
  },
  {
    number: "04",
    numberClass: "text-[#2e4a43]",
    text: "Texto temporal. Cuarto rasgo: la señal de que está lista para dar el paso ahora.",
  },
];

/**
 * Section 4 — ¿Este evento es para ti?
 * Califica a la audiencia con cuatro rasgos, cada uno en una card de vidrio.
 */
export function Protocolo() {
  return (
    <section id="protocolo" className="cv1-fondo-bruma bg-surface py-section">
      <Container>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-4">
            <Reveal>
              <p className="font-sans section-eyebrow text-accent">
                Para quién es
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance font-display text-3xl font-semibold leading-snug text-foreground sm:text-4xl lg:text-5xl">
                {/* En mobile el quiebre va después de "es", para no partir
                    "para ti si..." contra el borde. */}
                Este evento es
                <br className="sm:hidden" />{" "}
                <span className="whitespace-nowrap">
                  <NeonText variant="multi">para ti</NeonText> si...
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {ITEMS.map((item, i) => (
              <Reveal key={item.number} delay={0.1 + i * 0.1}>
                <article className="cv1-vidrio cv1-vidrio--reflejo flex h-full flex-col gap-4 rounded-[22px] p-6 sm:p-7">
                  <span className={`font-display text-4xl font-semibold tabular-nums ${item.numberClass}`}>
                    {item.number}
                  </span>
                  <p className="font-sans text-base leading-relaxed text-foreground/75 sm:text-lg">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
