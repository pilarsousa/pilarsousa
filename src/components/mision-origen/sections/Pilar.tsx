import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { PilarBio } from "@/components/mision-origen/ui/PilarBio";
import pilarDesktop from "@/../public/mision-origen/Fondo-PilarSousaPC.jpg";
import pilarMobile from "@/../public/mision-origen/foto-pilar.jpg";

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
      className="relative isolate flex min-h-svh items-start bg-background lg:h-svh"
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
      <picture aria-hidden className="absolute inset-x-0 top-0 -z-20 block h-[86svh] md:h-[84svh] lg:h-full">
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
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[86svh] md:h-[84svh] bg-[linear-gradient(to_top,#000000_0%,#000000_28%,rgba(0,0,0,0.55)_40%,transparent_58%)] lg:inset-0 lg:h-full lg:bg-[linear-gradient(to_left,#000000_0%,rgba(0,0,0,0.85)_30%,rgba(0,0,0,0.45)_55%,transparent_80%)]"
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

      {/* Degradé de costura inferior: espejo del superior. Funde el borde de
          abajo con el violeta de la sección siguiente (Acceso, #170f22), para
          que la sección no corte en seco. Misma altura y color que el de arriba. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 -z-10 bg-[linear-gradient(to_top,#170f22,transparent)]"
      />

      {/* Mobile: el contenido arranca en la costura donde la figura se funde a
          negro. Desktop: alineado arriba (items-start en la sección) con un pt
          que lo baja a media altura; así el panel crece hacia ABAJO al expandir
          y el título nunca se corta contra el borde superior. */}
      <Container className="pb-14 pt-[56svh] md:pt-[76svh] lg:py-0 lg:pt-32">
        {/* Contenido pegado al borde derecho (ml-auto) y corrido ~150px más a
            la derecha (translate) sobre el espacio libre de la foto. Ancho
            suficiente para que el título entre en una línea. Ancho completo en
            mobile (sin translate). */}
        <div className="lg:ml-auto lg:max-w-[58%] lg:translate-x-[150px]">
          {/* Panel glass oscuro: deja ver la foto detrás pero da contraste para
              leer la bio larga sobre la imagen. */}
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-white/10 bg-black/55 p-6 backdrop-blur-md sm:p-8">
              <h2
                id="pilar-title"
                className="text-center font-display text-xl font-semibold text-foreground sm:text-4xl"
              >
                ¿Quién es{" "}
                <NeonText variant="violet">Pilar Sousa</NeonText>?
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
