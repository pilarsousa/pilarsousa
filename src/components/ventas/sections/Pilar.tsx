import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { PilarBio } from "@/components/mision-origen/ui/PilarBio";
import pilarDesktop from "@/../public/mision-origen/Fondo-PilarSousaPC.jpg";
import pilarMobile from "@/../public/mision-origen/foto-pilar.jpg";

/*
  Sección "¿Quién es Pilar Sousa?".

  Reutiliza la foto y la bio (PilarBio) de la landing de registro, pero en un
  layout de dos columnas (foto + texto) en vez del hero a sangre, que encaja
  mejor como sección intermedia de una landing de ventas.
*/
export function Pilar() {
  return (
    <section
      id="pilar"
      aria-labelledby="pilar-title"
      className="relative isolate flex min-h-svh items-start overflow-x-clip bg-background lg:h-[750px] lg:min-h-0 lg:items-center"
    >
      <picture className="absolute inset-x-0 top-0 -z-20 block h-[86svh] md:h-[84svh] lg:h-full">
        <source
          media="(min-width: 1024px)"
          srcSet={pilarDesktop.src}
          width={pilarDesktop.width}
          height={pilarDesktop.height}
        />
        <Image
          src={pilarMobile}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-top lg:object-[38%_center] xl:object-[30%_center]"
        />
      </picture>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[86svh] md:h-[84svh] bg-[linear-gradient(to_top,#000000_0%,#000000_28%,rgba(0,0,0,0.55)_40%,transparent_58%)] lg:inset-0 lg:h-full lg:bg-[linear-gradient(to_left,#000000_0%,rgba(0,0,0,0.88)_30%,rgba(0,0,0,0.48)_55%,transparent_80%)]"
      />

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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-[linear-gradient(to_bottom,#000000,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-[linear-gradient(to_top,#000000,transparent)]"
      />

      <Container className="pb-14 pt-[56svh] md:pt-[76svh] lg:py-0 lg:pt-0">
        <div className="lg:ml-auto lg:max-w-[56%]">
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-white/10 bg-black/58 p-6 shadow-[0_24px_70px_-34px_rgba(40,191,241,0.45)] backdrop-blur-md sm:p-8">
              <h2
                id="pilar-title"
                className="text-center font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
              >
                ¿Quién es <NeonText variant="violet">Pilar Sousa</NeonText>?
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
