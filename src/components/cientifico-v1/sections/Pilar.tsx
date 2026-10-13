import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/cientifico-v1/ui/NeonText";
import { Reveal } from "@/components/cientifico-v1/ui/Reveal";
import { PilarBio } from "@/components/cientifico-v1/ui/PilarBio";
import { ImagenTemporal } from "@/components/cientifico-v1/ui/ImagenTemporal";

/**
 * Section 5 — La guía / ¿Quién es Pilar Sousa?
 *
 * Mismo patrón que el Hero pero ESPEJADO: la foto va a la izquierda en
 * desktop y el texto, en un panel de vidrio, sobre el hueco de la derecha.
 * En mobile, foto arriba y contenido debajo. Mientras no hay foto,
 * ImagenTemporal marca su lugar.
 *
 * ⚠️ COPY E IMAGEN TEMPORALES (salvo el nombre).
 */
export function Pilar() {
  return (
    <section
      id="pilar"
      aria-labelledby="pilar-title"
      className="relative isolate flex min-h-svh items-start overflow-x-clip bg-background lg:h-[750px] lg:min-h-0 lg:items-center"
    >
      <ImagenTemporal
        nota="Foto de Pilar para su presentación. En desktop, ella a la izquierda y aire a la derecha para el texto."
        medidas="Desktop 2000 × 830 · Mobile 1080 × 1350"
        etiqueta="arriba"
        /* Máscara espejada respecto al Hero: se desvanece abajo en mobile y
           hacia la derecha (donde va el texto) en desktop. */
        className="absolute inset-x-0 top-0 -z-20 h-[56svh] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:inset-y-0 lg:right-auto lg:h-full lg:w-[55%] lg:[mask-image:linear-gradient(to_left,transparent,black_35%)]"
      />

      <Container className="pb-14 pt-[48svh] lg:py-0">
        <div className="lg:ml-auto lg:max-w-[52%]">
          <Reveal delay={0.1}>
            <div className="cv1-vidrio rounded-[24px] p-6 sm:p-8">
              <h2
                id="pilar-title"
                className="text-center font-display text-xl font-semibold text-foreground sm:text-4xl"
              >
                ¿Quién es{" "}
                <NeonText variant="violeta">Pilar Sousa</NeonText>?
              </h2>
              <div className="mt-6">
                <PilarBio />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
