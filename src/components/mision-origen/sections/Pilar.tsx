import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import pilarDesktop from "@/../public/mision-origen/Fondo-PilarSousaPC.jpg";
import pilarMobile from "@/../public/mision-origen/foto-pilar.jpg";

const BULLETS = [
  "+500.000 personas impactadas.",
  "Referente en Metafísica Práctica y Manifestación.",
  "Fundadora de Volver al Origen.",
  "Cientos de alumnos han pasado por sus procesos de transformación.",
];

/**
 * Section 5 — La guía / Soy Pilar Sousa.
 *
 * Mismo patrón que el Hero pero ESPEJADO: la foto de Pilar va a sangre como
 * fondo, con ella a la izquierda y el texto sobre el hueco de la derecha. En
 * mobile se comporta igual que el Hero (foto arriba, contenido debajo sobre
 * negro). <picture> elige el encuadre: panorámico en desktop, vertical en
 * mobile — solo se descarga uno.
 */
export function Pilar() {
  return (
    <section
      id="pilar"
      aria-labelledby="pilar-title"
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-background lg:items-center"
    >
      {/* Degradé de costura superior: funde el violeta de la sección anterior
          (Protocolo, #170f22) con el borde de arriba de la foto, para que la
          imagen no corte en seco contra la sección. Va por encima de la foto
          (-z-10) pero debajo del contenido. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-[linear-gradient(to_bottom,#170f22,transparent)]"
      />

      {/* ── Foto de fondo a sangre ──
          Desktop: panorámica, Pilar a la izquierda, hueco a la derecha para el
          texto (object-left). Mobile: vertical, Pilar arriba, se funde abajo. */}
      <picture aria-hidden className="absolute inset-x-0 top-0 -z-20 block h-[78svh] md:h-[84svh] lg:h-full">
        <source
          media="(min-width: 1024px)"
          srcSet={pilarDesktop.src}
          width={pilarDesktop.width}
          height={pilarDesktop.height}
        />
        <Image
          src={pilarMobile}
          alt="Pilar Sousa"
          fill
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-top lg:object-[38%_center] xl:object-[30%_center]"
        />
      </picture>

      {/* ── Capa de legibilidad ── (espejada respecto al Hero)
          Mobile: funde el pie de la foto con el negro de abajo.
          Desktop: fuerte a la DERECHA (donde va el texto), desvaneciendo antes
          de llegar a Pilar (izquierda). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[78svh] md:h-[84svh] bg-[linear-gradient(to_top,#000000_0%,#000000_28%,rgba(0,0,0,0.55)_40%,transparent_58%)] lg:inset-0 lg:h-full lg:bg-[linear-gradient(to_left,#000000_0%,rgba(0,0,0,0.85)_30%,rgba(0,0,0,0.45)_55%,transparent_80%)]"
      />

      {/* Cyberpunk grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(174,240,254,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(174,240,254,1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Bottom vignette — funde con el fondo de la sección siguiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-t from-background to-transparent"
      />

      {/* Mobile: el contenido arranca en la costura donde la figura se funde a
          negro (pt-[52svh]). Desktop: centrado vertical, alineado a la derecha. */}
      <Container className="pb-12 pt-[62svh] md:pt-[76svh] lg:py-16 lg:pt-16">
        {/* Contenido sobre el hueco de la derecha en desktop (ml-auto); ancho
            completo en mobile. */}
        <div className="lg:ml-auto lg:max-w-[52%]">
          <div className="flex flex-col gap-6 [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
            <Reveal delay={0.1}>
              <h2
                id="pilar-title"
                className="font-display text-3xl font-semibold text-foreground sm:text-4xl"
              >
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
