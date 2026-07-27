import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { PilarBio } from "@/components/mision-origen/ui/PilarBio";
import pilarFoto from "@/../public/mision-origen/foto-pilar.jpg";

/*
  Sección "¿Quién es Pilar Sousa?".

  Reutiliza la foto y la bio (PilarBio) de la landing de registro, pero en un
  layout de dos columnas (foto + texto) en vez del hero a sangre, que encaja
  mejor como sección intermedia de una landing de ventas.
*/
export function Pilar() {
  return (
    <section id="pilar" className="bg-background py-section">
      <Container>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* Foto */}
          <Reveal className="w-full max-w-sm lg:w-2/5">
            <div className="overflow-hidden rounded-2xl border border-violet/30 shadow-[0_0_40px_rgba(135,36,120,0.25)]">
              <Image
                src={pilarFoto}
                alt="Pilar Sousa"
                quality={85}
                sizes="(min-width: 1024px) 24rem, 90vw"
                placeholder="blur"
                className="h-auto w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Bio */}
          <div className="w-full lg:w-3/5">
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                ¿Quién es{" "}
                <NeonText variant="violet">Pilar Sousa</NeonText>?
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-6 block">
              <PilarBio />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
