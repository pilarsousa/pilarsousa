import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import fotoPilar from "@/../public/mision-origen/foto-pilar.jpg";

const BULLETS = [
  "+500.000 personas impactadas.",
  "Referente en Metafísica Práctica y Manifestación.",
  "Fundadora de Volver al Origen.",
  "Cientos de alumnos han pasado por sus procesos de transformación.",
  "(Falta completar)",
];

/**
 * Section 5 — La guía / Soy Pilar Sousa.
 * Goal: present authority, trust, and personal connection.
 * Two-column layout: image placeholder left, bio copy right.
 * Placeholder — to be developed together. Real bio and photo pending.
 */
export function Pilar() {
  return (
    <section id="pilar" className="relative bg-background py-section">
      {/* Degradé de transición superior: funde el azul noche de la sección
          anterior (Protocolo) con el negro de esta, suavizando el corte. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_top,transparent,#170f22)]"
      />
      {/* Degradé de transición inferior: funde el negro con el azul noche de la
          sección siguiente (Acceso). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_bottom,transparent,#170f22)]"
      />
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* Retrato de Pilar */}
          <Reveal className="lg:w-5/12">
            {/* mx-auto centra el retrato en mobile, donde la columna es más
                ancha que el max-w-sm de la tarjeta. */}
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-sm border border-electric-blue/20 bg-surface/60 lg:mx-0">
              {/* La foto es 3:5 y la caja 3:4: object-cover recorta arriba y
                  abajo por igual, que es donde no hay nada — el encuadre está
                  centrado en la cara. */}
              <Image
                src={fotoPilar}
                alt="Pilar Sousa"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 24rem, 100vw"
                placeholder="blur"
                className="aspect-[3/4] w-full object-cover object-top"
              />
              {/* Neon corner accents */}
              <span aria-hidden className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-cyan to-transparent" />
              <span aria-hidden className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
              <span aria-hidden className="absolute bottom-0 right-0 h-8 w-px bg-gradient-to-t from-neon-pink to-transparent" />
              <span aria-hidden className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-neon-pink to-transparent" />
            </div>
          </Reveal>

          {/* Bio copy */}
          <div className="flex flex-col gap-6 lg:w-7/12">
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                ¿Quién es{" "}
                <NeonText variant="violet">Pilar Sousa</NeonText>?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="flex flex-col gap-4">
                {BULLETS.map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 font-display text-lg text-neon-pink"
                    >
                      ✦
                    </span>
                    <span className="font-sans text-lg font-light leading-relaxed text-foreground/75 sm:text-xl">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
