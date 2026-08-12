import Image from "next/image";
import { MatrixRain } from "@/components/bootcamp/ui/MatrixRain";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { LogoVao } from "@/components/volver-al-origen/ui/LogoVao";
import { SparkDivider } from "@/components/volver-al-origen/ui/SparkDivider";
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

          El fundido es opaco a partir del 73% de la imagen (27% contado desde
          abajo) y empieza a insinuarse sobre el 32%. La cara de Pilar está
          sobre el 45% del alto, así que sigue quedando por encima de la zona
          sólida.

          Ese 73% va ATADO al padding superior del contenido: el panel tiene que
          apoyarse siempre por debajo de esa marca. Cada vez que el panel sube,
          el fundido tiene que adelantarse con él o el texto acaba encima de la
          foto todavía visible. Los dos valores se mueven juntos.

          El bloque mide 80svh. Acortarlo es la palanca para subir el panel sin
          tocar el fundido: como las paradas del degradado son porcentajes del
          bloque, un bloque más corto sitúa la costura más arriba en píxeles
          mientras el reparto de luz sobre la figura queda exactamente igual.

          La alternativa —adelantar el fundido— habría empezado a oscurecer la
          cara de Pilar, que está sobre el 45% del alto. El recorte se lleva
          cuerpo por abajo, que es lo prescindible. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-[80svh] lg:hidden"
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
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0b1502_0%,#0b1502_27%,rgba(11,21,2,0.55)_45%,transparent_68%)]" />
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

      {/* pt-[calc(68svh-160px)] en móvil.

          El panel arranca POR ENCIMA del punto donde la foto acaba de fundirse
          a negro, y es correcto: es un panel de cristal —fondo translúcido más
          backdrop-blur— pensado para flotar sobre la imagen. No necesita fondo
          sólido debajo; el desenfoque que aplica sobre lo que tiene detrás es lo
          que mantiene legible el texto.

          Durante varios ajustes se estuvo forzando que cayera sobre negro pleno.
          Era una restricción inventada, y lo único que conseguía era empujar el
          contenido más abajo de lo que pedía el diseño.

          Los 160 px se restan en píxeles y no en svh: svh depende del alto de
          cada pantalla, así que el mismo ajuste en svh movería el panel más en
          un móvil grande que en uno pequeño. Con medida fija el desplazamiento
          es idéntico en todos.

          Si se cambia el fundido, hay que mover este número con él — son las
          dos mitades del mismo ajuste.

          En escritorio se anula, porque allí el centrado lo resuelve
          items-center de la sección. */}
      <VoContainer className="pb-16 pt-[calc(68svh-160px)] lg:py-0">
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

          <SparkDivider className="mt-5" />

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
