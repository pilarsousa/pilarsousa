import Image from "next/image";
import { MatrixRain } from "@/components/bootcamp/ui/MatrixRain";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { LogoVao } from "@/components/volver-al-origen/ui/LogoVao";
import { WaitlistForm } from "@/components/volver-al-origen/ui/WaitlistForm";
import { HERO } from "@/components/volver-al-origen/content";
import heroBg from "@/../public/volver-origen/public/img/hero/hero-seccion.png";
import heroBgMovil from "@/../public/volver-origen/public/img/hero/heroseccion-mobile.jpg";

/*
  Sección 1 — Hero a sangre: la imagen de marca ocupa el fondo completo y el
  panel del formulario flota sobre ella, a la izquierda.

  El encuadre manda: en la imagen Pilar está a la derecha y el bosque al
  atardecer a la izquierda, así que el panel se coloca sobre la zona despejada y
  no le tapa la cara. object-position acompaña ese criterio en cada tamaño.

  El panel es casi transparente a propósito. Eso implica que todo su texto va en
  claro: sobre una foto oscura vista a través del panel, el texto oscuro que
  tenía antes sería ilegible. El backdrop-blur no es decorativo — es lo que
  impide que el detalle de las ramas atraviese las letras.

  El velo (scrim) que va bajo el panel no es un tinte de marca sino una capa de
  legibilidad: oscurece el lado donde vive el texto y se desvanece antes de
  llegar a Pilar.
*/
export function Hero() {
  return (
    <section
      /* El ancla #registro vive en el <h1>, no en la sección ni en el <form>.

         En la sección llevaba al principio del hero y en móvil el formulario
         quedaba fuera de pantalla. En el formulario dejaba los campos a la
         vista pero sin el título, y el visitante aterrizaba sin contexto de a
         qué se estaba apuntando. En el título se ven las dos cosas: el nombre
         del programa arriba y los campos justo debajo. */
      aria-labelledby="registro"
      className="relative isolate flex min-h-svh items-start overflow-hidden lg:items-center lg:py-20"
    >
      {/* ══ MÓVIL: imagen a sangre desde arriba ══
          Mismo patrón que la sección de Pilar: el retrato ocupa la parte alta,
          se funde con el fondo y el contenido arranca en esa costura.

          El fundido es opaco a partir del 77% de la imagen (23% contado desde
          abajo) y empieza a insinuarse sobre el 35%. Así la cara de Pilar, que
          está sobre el 45% del alto, queda siempre limpia.

          Ese 77% no es redondo por capricho: bajarlo desde el 74% anterior
          desplaza la costura unos 20 px hacia abajo en una pantalla de móvil
          típica, que era lo que hacía falta para que el sombreado no empezara
          tan arriba.

          El bloque mide 86svh y no menos: es lo que deja sitio para que el panel
          arranque por debajo de la figura completa en lugar de partirla por la
          cintura. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-[86svh] lg:hidden"
      >
        <Image
          src={heroBgMovil}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0">
          <MatrixRain fade={0} opacity={0.22} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0b1502_0%,#0b1502_23%,rgba(11,21,2,0.55)_41%,transparent_65%)]" />
      </div>

      {/* ══ ESCRITORIO: imagen de fondo a pantalla completa ══
          Encuadre apaisado, con Pilar a la derecha y el panel sobre la zona
          despejada de la izquierda.

          Ninguna de las dos imágenes lleva `priority` a propósito. Con él, el
          navegador precarga la imagen aunque su contenedor esté en display:none,
          y cada visitante se descargaría también el encuadre que no va a ver.
          Al ser lazy, sólo se pide la del breakpoint activo — y como están en lo
          alto de la página, entran en el viewport de inmediato igualmente. */}
      <div aria-hidden className="absolute inset-0 -z-20 hidden lg:block">
        <Image
          src={heroBg}
          alt=""
          fill
          /* 90 y no otro valor: next.config.ts sólo declara qualities [75, 90] y
             Next 16 descarta los que no estén en la lista. */
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />

        {/* Velo de legibilidad horizontal: oscurece el lado del texto sin
            cubrir a Pilar. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,21,2,0.86)_0%,rgba(11,21,2,0.58)_38%,transparent_68%)]" />

        <div className="pointer-events-none absolute inset-0">
          <MatrixRain fade={0} opacity={0.3} />
        </div>

        {/* Difuminado hacia la sección siguiente. El velo de arriba no sirve
            para esto: al ser horizontal deja el pie de la foto a plena
            intensidad y la imagen chocaba en seco contra el verde de abajo. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,#0b1502,transparent)]" />
      </div>

      {/* pt-[68svh] en móvil.

          El valor es geométrico y va atado al fundido: la imagen mide 86svh y
          se vuelve opaca en el 77% de ese alto, o sea a 66,2svh. Arrancar aquí
          deja el panel 1,8svh por debajo de esa marca: justo donde el fondo ya
          es negro plano, sin hueco de sobra.

          Los 78svh anteriores dejaban 12svh de aire negro entre la foto y el
          panel. Los 52svh iniciales caían por encima de la costura y le partían
          la figura por la cintura. Este valor es el punto medio real: pegado al
          negro, pero sin invadir la imagen.

          Si se cambia el fundido, hay que mover este número con él — son las
          dos mitades del mismo ajuste.

          En escritorio se anula, porque allí el centrado lo resuelve
          items-center de la sección. */}
      <VoContainer className="pb-16 pt-[68svh] lg:py-0">
        {/* 570 px: la mitad exacta del ancho de contenido (1140 px), que es la
            referencia del diseño. */}
        <div className="mx-auto w-full max-w-[570px] rounded-lg border border-vo-bone/15 bg-vo-bone/8 px-7 py-10 text-center text-foreground shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:px-10 lg:mx-0">
          <LogoVao className="mx-auto size-32 text-accent sm:size-36" />

          <p className="mt-6 font-display text-xs uppercase tracking-[0.32em] text-accent sm:text-sm">
            {HERO.eyebrow}
          </p>

          {/* scroll-mt-8: sin margen el título queda pegado al borde superior
              de la pantalla y parece cortado. */}
          <h1
            id="registro"
            className="mt-3 scroll-mt-8 font-display uppercase leading-[1.08]"
          >
            <span className="block text-xl tracking-[0.14em] text-foreground/85 sm:text-2xl">
              {HERO.titleTop}
            </span>
            <span className="mt-1 block text-4xl tracking-[0.05em] sm:text-[3.1rem]">
              {HERO.titleMain[0]}
            </span>
            <span className="block text-5xl tracking-[0.03em] sm:text-[4rem]">
              {HERO.titleMain[1]}
            </span>
          </h1>

          {/* Separador con destello */}
          <div aria-hidden className="mt-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-vo-bone/20" />
            <span className="text-xs text-accent">✦</span>
            <span className="h-px flex-1 bg-vo-bone/20" />
          </div>

          {/* Es el subtitular que explica la oferta, así que va por encima del
              cuerpo de texto normal: 18 px y peso normal, no light.

              El peso importa tanto como el tamaño. Sobre fondo oscuro los
              trazos finos se pierden contra el negro, así que light a 14 px era
              lo menos legible de la página. Se queda en 18 y no más arriba
              porque la frase es larga (240 caracteres) y dentro del panel de
              570 px cada punto extra le suma una línea. */}
          <p className="mt-5 font-sans text-base leading-relaxed text-foreground/90 sm:text-lg">
            {HERO.intro.map((part) =>
              part.strong ? (
                <strong key={part.text} className="font-semibold text-foreground">
                  {part.text}
                </strong>
              ) : (
                <span key={part.text}>{part.text}</span>
              ),
            )}
          </p>

          <div className="mt-6">
            <WaitlistForm />
          </div>

          <p className="mt-4 font-sans text-xs font-light text-foreground/60">
            {HERO.privacy}
          </p>
        </div>
      </VoContainer>
    </section>
  );
}
