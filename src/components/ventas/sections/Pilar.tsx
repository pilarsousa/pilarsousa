import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { PilarBio } from "@/components/mision-origen/ui/PilarBio";
import pilarDesktop from "@/../public/mision-origen/Fondo-PilarSousaPC.jpg";
import pilarMobile from "@/../public/mision-origen/foto-pilar.jpg";

/*
  Sección "¿Quién es Pilar Sousa?".

  Reutiliza la foto y la bio (PilarBio) de la landing de registro, con texto
  trabajando directamente sobre la imagen como en el Hero de ventas.
*/
export function Pilar() {
  return (
    <section
      id="pilar"
      aria-labelledby="pilar-title"
      className="relative isolate flex min-h-svh items-start overflow-x-clip bg-background lg:h-[750px] lg:min-h-0 lg:items-end"
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
          className="object-cover object-top lg:object-[62%_center] xl:object-[58%_center]"
        />
      </picture>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[86svh] md:h-[84svh] bg-[linear-gradient(to_top,#000000_0%,rgba(0,0,0,0.9)_24%,rgba(0,0,0,0.5)_42%,transparent_66%)] lg:inset-0 lg:h-full lg:bg-[linear-gradient(to_left,#000000_0%,rgba(0,0,0,0.9)_34%,rgba(0,0,0,0.52)_56%,transparent_78%)]"
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
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-[linear-gradient(to_top,#000000,transparent)] lg:h-28"
      />

      {/* Desde lg el contenedor se ensancha más que el max-w-6xl por defecto y el
          bloque pasa a un ancho fijo: así el texto se corre hacia la derecha en
          vez de solo estirarse, y deja despejada la cara (que cae a la izquierda). */}
      <Container className="pb-14 pt-[72svh] md:pt-[82svh] lg:max-w-[88rem] lg:pb-10 lg:pt-0 xl:pb-8">
        <div className="max-w-2xl text-left [text-shadow:0_2px_20px_rgba(0,0,0,0.72)] lg:ml-auto lg:max-w-[34rem] xl:max-w-[36rem]">
          <Reveal delay={0.1}>
            <div>
              <h2 id="pilar-title" className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                ¿Quién es{" "}
                <span className="bg-clip-text text-transparent bg-[length:200%_auto] animate-neon-drift bg-[linear-gradient(110deg,#ffffff_0%,#fff6d8_28%,#f9db84_52%,#ffffff_72%,#f6b34b_100%)] [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.5))_drop-shadow(0_0_30px_rgba(249,219,132,0.35))]">
                  Pilar Sousa
                </span>
                ?
              </h2>
              <div className="mt-6 max-w-xl">
                <PilarBio />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
