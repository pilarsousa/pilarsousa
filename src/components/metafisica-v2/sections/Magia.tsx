import { Contenedor } from "@/components/metafisica-v2/ui/Contenedor";
import { BotonEntrada } from "@/components/metafisica-v2/ui/BotonEntrada";
import { Entrada } from "@/components/metafisica-v2/ui/Entrada";
import { Firma } from "@/components/metafisica-v2/ui/Firma";
import { Reveal } from "@/components/metafisica-v2/ui/Reveal";
import { MAGIA } from "@/components/metafisica-v2/content";

/**
 * "La verdadera magia de este método": panel violeta con pestaña arriba, dos
 * capas apiladas que asoman por debajo y dos entradas flotando.
 */
export function Magia() {
  return (
    <section aria-labelledby="magia-titulo" className="relative py-24 sm:py-32">
      <Contenedor>
        <div className="relative mx-auto max-w-[755px]">
          {/* Hojas apiladas debajo del panel, cada una más angosta y oscura:
              más carpetas detrás. Planas a propósito: con la pestaña abajo
              parecían carpetas dadas vuelta. */}
          <div aria-hidden className="absolute inset-x-[8%] -bottom-[30px] h-32 rounded-b-[12px] bg-[#1d1730]" />
          <div aria-hidden className="absolute inset-x-[4%] -bottom-[16px] h-32 rounded-b-[12px] bg-[#2b2246]" />

          <Reveal className="relative">
            <div className="cv3-pestana relative bg-[linear-gradient(180deg,#6d5a98_0%,#55437a_50%,#3a2d58_100%)] px-6 pb-20 pt-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] sm:px-16 sm:pb-16 sm:pt-[4.5rem]">
              <h2 id="magia-titulo" className="mx-auto max-w-[420px] text-[1.75rem] font-extrabold leading-[1.2] text-foreground sm:text-[2.125rem]">
                {MAGIA.titulo}
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[1.125rem] leading-snug text-[#e4dcf0]/85 sm:text-[1.5rem]">
                {MAGIA.texto}
              </p>
              <div className="mt-7 flex justify-center">
                <BotonEntrada />
              </div>
              <Firma className="absolute bottom-5 right-6 text-[1.9rem] sm:bottom-7 sm:right-8 sm:text-[2.4rem]" />
            </div>
          </Reveal>

          <Entrada
            sizes="300px"
            className="absolute -left-6 -top-20 w-[180px] -rotate-[14deg] sm:-left-[150px] sm:-top-[88px] sm:w-[300px]"
          />
          <Entrada
            sizes="290px"
            className="absolute -right-[250px] top-[150px] hidden w-[290px] rotate-[38deg] lg:flex"
          />
        </div>
      </Contenedor>
    </section>
  );
}
