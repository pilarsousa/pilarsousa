import { LogoVao } from "@/components/lista-de-espera/ui/LogoVao";
import { FOOTER, HERO } from "@/components/lista-de-espera/content";

/*
  El pie de la landing.

  EL COLOR NO ES `bg-background`, y el cambio es a propósito. Ese token vale
  #0b1502 —un negro con mucho verde dentro— y funcionaba cuando toda la página
  era oscura. Ahora el pie viene detrás de una sucesión de banners casi negros y
  ese verde se leía como un escalón de color justo en el remate. Aquí va un negro
  más neutro y el verde se reserva para el filete y el halo, que es donde se
  quiere ver.

  EL FILETE SUPERIOR ES UN DEGRADADO, no una línea plana: encendido en el centro
  y apagándose hacia los cantos. Una línea de un solo tono cruzando 1920 px de
  lado a lado subraya el ancho de la ventana; ésta se apaga antes de llegar y
  deja el remate abierto.

  SIN ENLACES LEGALES, y no por olvido: en el proyecto no existen las rutas de
  privacidad ni de términos. Un pie con enlaces que llevan a 404 es peor que un
  pie sin ellos. Cuando esas páginas existan, este es su sitio.

  El logo va aquí y no en una cabecera porque esta landing no tiene cabecera: la
  marca aparece al abrir, dentro del hero, y se cierra con ella.
*/
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#050803] pt-[12vw] pb-[10vw] text-center md:pt-[3vw] md:pb-[2.4vw]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[max(0.05vw,1px)] bg-[linear-gradient(90deg,transparent_0%,#a3ca23_50%,transparent_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-[6%] left-1/2 h-[60%] w-[38%] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,228,72,0.22)_0%,transparent_72%)] blur-[2vw]"
      />

      <div className="relative mx-auto w-[87%] md:w-[59%]">
        <LogoVao className="mx-auto w-[22vw] md:w-[5.2vw] md:min-w-[64px]" />

        <p className="mt-[5vw] font-display text-[4.4vw] leading-[1.35] text-[#f6f6e5] md:mt-[1.1vw] md:text-[clamp(0.6rem,1.02vw,1.3rem)]">
          {HERO.eyebrow}
        </p>

        <div
          aria-hidden
          className="mx-auto mt-[8vw] h-px w-[60%] md:mt-[2vw] md:h-[max(0.05vw,1px)] md:w-[42%] bg-[linear-gradient(90deg,transparent_0%,rgba(163,202,35,0.35)_50%,transparent_100%)]"
        />

        <p className="mt-[6vw] font-sans text-[3.1vw] leading-none text-[#6d7563] md:mt-[1.4vw] md:text-[clamp(0.38rem,0.64vw,0.8rem)]">
          {FOOTER.copyright}
        </p>
      </div>
    </footer>
  );
}
