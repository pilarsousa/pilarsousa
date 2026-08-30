import { LogoVao } from "@/components/lista-de-espera/ui/LogoVao";
import { RejillaOndas } from "@/components/lista-de-espera/ui/RejillaOndas";
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

  ── LA REJILLA DE ONDAS ──

  El fondo es una retícula en WebGL que ondula desde el centro y responde al
  cursor (RejillaOndas.tsx). Va aquí y en ninguna otra sección porque es el único
  sitio donde cabe: las demás traen su fondo dibujado en el banner, con la lluvia
  de código incluida, y superponerles una retícula animada sería ruido sobre
  ruido. El pie era negro liso.

  Y EL PIE CRECIÓ PARA DARLE SITIO. Con el relleno anterior —3vw arriba y 2,4
  abajo— medía poco más que su contenido, y una onda que nace en el centro
  necesita superficie para leerse: en una banda estrecha sólo se ve su tramo
  plano. Al subir el relleno, el efecto se despliega y el pie gana el peso de
  remate que le faltaba.
*/
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#050803] pt-[16vw] pb-[14vw] text-center md:pt-[6vw] md:pb-[5vw]">
      {/* LA REJILLA VA LA PRIMERA Y SIN z-index PROPIO: al ser el primer hijo
          en posición absoluta queda por debajo de todo lo que venga después con
          `relative`, que es el resto del pie. */}
      <RejillaOndas
        color="#a3ca23"
        /* Los valores no son los de fábrica del componente. La retícula es un
           FONDO y su trabajo es dar profundidad sin llamar la atención:

           · opacidad 0,42 — a 1 la rejilla compite con el logo y el copyright.
           · tamaño 14 sobre 10 — una malla más fina se lee como textura; una
             gruesa, como un dibujo que hay que mirar.
           · brillo 0,16 — lo justo para que el verde tenga cuerpo sobre el
             negro casi puro del pie.
           · viñeta 2,4 — apaga los cantos y evita que la retícula choque en
             seco contra el borde de la ventana.
           · onda 0,045 — el movimiento tiene que ser casi imperceptible: es un
             remate, no una animación de entrada. */
        opacidad={0.42}
        tamano={14}
        grosor={16}
        intensidadBrillo={0.16}
        fuerzaVineta={2.4}
        distanciaFundido={1.4}
        intensidadOnda={0.045}
        radioInteraccion={1.1}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[max(0.05vw,1px)] bg-[linear-gradient(90deg,transparent_0%,#a3ca23_50%,transparent_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-[6%] left-1/2 z-10 h-[60%] w-[38%] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,228,72,0.22)_0%,transparent_72%)] blur-[2vw]"
      />

      {/* z-10 y pointer-events-none en el bloque de contenido: tiene que verse
          por encima de la rejilla, pero dejar que el ratón la alcance para que
          las ondas respondan. El texto no es interactivo —no hay enlaces— así
          que no se pierde nada; el día que se añadan los legales, ese enlace
          necesitará su propio `pointer-events-auto`. */}
      <div className="relative z-10 mx-auto w-[87%] pointer-events-none md:w-[59%]">
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
