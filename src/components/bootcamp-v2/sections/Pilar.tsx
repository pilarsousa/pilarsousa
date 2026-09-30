import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/bootcamp-v2/ui/Reveal";
import { StoryDisclosure } from "@/components/bootcamp-v2/ui/StoryDisclosure";
import bgDesktop from "@/../public/bootcamp-v2/pilar-sousa-2.png";
import bgMobile from "@/../public/bootcamp-v2/pilar-sousa-mobile2.png";

/**
 * Section 5 — Soy Pilar Sousa (authority).
 *
 * ── UNA SECCIÓN CLARA ──
 *
 * Las fotos nuevas son claras —pared celeste en escritorio, blanco roto en
 * móvil—, así que ésta pasa a ser una de las secciones claras de la página:
 * tinta verde de marca sobre fondo luminoso, sin velo ni sombra de texto.
 *
 * ── LA FRANJA DE ARRIBA ES TRANSPARENTE, Y ES A PROPÓSITO ──
 *
 * Las dos imágenes traen arriba una franja con alfa 0 que el pelo de Pilar
 * invade: la cabeza sobresale del panel sobre el verde de la sección anterior
 * (ver .bc2-pilar). Por eso la foto NUNCA se recorta por arriba —va a su
 * proporción natural, anclada arriba— y el texto empieza debajo de la franja.
 *
 * ── SI EL TEXTO ES MÁS ALTO QUE LA FOTO ──
 *
 * La foto no se estira (object-cover desplazaría a Pilar debajo del texto).
 * La sección sigue con el color del borde inferior de la imagen, y en
 * escritorio un degradado funde el corte. En móvil no hace falta: la imagen
 * ya termina en ese mismo blanco roto.
 *
 * Copy is Pilar's own first-person story — authentic voice. Keep it verbatim;
 * only the client should edit how she presents herself.
 */
export function Pilar() {
  return (
    <section
      id="pilar"
      aria-labelledby="pilar-title"
      className="bc2-pilar relative isolate overflow-hidden text-forest-900 lg:min-h-[36.46vw]"
    >
      {/* Móvil: la foto a su proporción natural (960x1988). La parte de abajo
          es blanco roto liso, que es el fondo sobre el que va el texto. */}
      <Image
        src={bgMobile}
        alt=""
        aria-hidden
        sizes="100vw"
        className="absolute inset-x-0 top-0 -z-10 h-auto w-full lg:hidden"
        placeholder="blur"
      />

      {/* Escritorio: la foto a su proporción natural (1920x700) — el
          min-h-[36.46vw] de la sección es esa misma proporción —, con un
          degradado abajo por si el texto la sobrepasa. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 hidden aspect-[1920/700] lg:block"
      >
        <Image
          src={bgDesktop}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(to_bottom,transparent,var(--bc2-pilar-cielo))]" />
      </div>

      {/* pt en vw porque la foto escala con el ancho: en móvil el texto arranca
          donde la foto se funde con el blanco (~60% del ancho); en escritorio,
          justo debajo de la franja blanca (5,2% del ancho). */}
      <Container className="pb-16 pt-[58vw] lg:pb-[clamp(3rem,1rem+4vw,5rem)] lg:pt-[calc(5.2vw+clamp(2rem,1rem+2vw,3.5rem))]">
        {/* La columna no pasa del 44% del ancho en escritorio: Pilar empieza
            en el 52% de la foto y el texto no puede pisarla. */}
        <div className="max-w-xl lg:max-w-[min(36rem,44vw)]">
          {/* Same pairing as every SectionTitle: sans at 400 for the lead-in,
              the name in the Cormorant italic accent, bumped to 1.25em because
              its x-height is lower than the sans. */}
          <Reveal>
            <h2
              id="pilar-title"
              className="font-sans text-3xl font-normal leading-tight text-forest-900 sm:text-4xl lg:text-5xl"
            >
              Soy{" "}
              <em className="font-accent text-[1.25em] font-medium italic text-forest-700">
                Pilar Sousa
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <StoryDisclosure
              className="mt-3 text-base leading-relaxed text-forest-900/85"
              intro={
                <div className="space-y-4">
                  <p>
                    Hubo un tiempo en el que me sentía perdida, sin un rumbo ni
                    un objetivo claro en la vida.
                  </p>
                  <p>
                    No encontraba sentido a lo que hacía y sentía que algo
                    importante me faltaba. Fue al adentrarme en el mundo de la
                    espiritualidad cuando todo empezó a cambiar. Comprendí que
                    la transformación que buscaba fuera tenía que empezar dentro
                    de mí.
                  </p>
                </div>
              }
              more={
                <div className="space-y-4 pt-4">
                  <p>
                    Ese camino me trajo una plenitud que no conocía: en lo
                    personal y también en lo económico. Aprendí a confiar, a
                    cuidar mi energía y a alinear mi vida con lo que de verdad
                    quería.
                  </p>
                  <p>
                    Hoy vivo viajando por el mundo, dedicándome a lo que amo y
                    acompañando a otras personas en su propio proceso. Ese es,
                    para mí, el mayor regalo de todo este camino: poder devolver
                    lo que aprendí.
                  </p>
                  <p>
                    De esa experiencia nace{" "}
                    <em className="font-accent text-[1.15em] font-medium italic text-forest-700">
                      Volver al Origen
                    </em>
                    , la formación en la que comparto, paso a paso, las
                    herramientas que me ayudaron a reencontrarme y a manifestar
                    la realidad de mis sueños.
                  </p>
                </div>
              }
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
