import Image from "next/image";
import { MatrixRain } from "@/components/bootcamp/ui/MatrixRain";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { LogoVao } from "@/components/volver-al-origen/ui/LogoVao";
import { SparkDivider } from "@/components/volver-al-origen/ui/SparkDivider";
import { MovingBorder } from "@/components/volver-al-origen/ui/MovingBorder";
import { WaitlistCta } from "@/components/volver-al-origen/ui/WaitlistCta";
import { HeroLaser } from "@/components/volver-al-origen/ui/HeroLaser";
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
      /* El id "registro" del <h1> ya no es destino de navegación —los CTA
         abren el modal—, pero se mantiene porque es lo que nombra a esta
         sección para los lectores de pantalla. */
      aria-labelledby="registro"
      /* lg:min-h-[800px] y no lg:h-[800px]: la sección lleva overflow-hidden,
         así que una altura FIJA recortaría el formulario si el contenido se
         pasara aunque fuera por unos píxeles. Con un mínimo se queda en 800
         cuando cabe y crece si hace falta, sin cortar nada nunca.

         Los 800 px son los de hero-seccion.png, que mide 1920x800. Antes la
         sección llegaba a ~1100 por culpa del alto del panel: la proporción
         caía a 1,74:1 frente a los 2,4:1 de la imagen y object-cover compensaba
         recortando los laterales, con lo que se perdía composición a izquierda
         y derecha. */
      className="relative isolate flex min-h-svh items-start overflow-hidden lg:min-h-[800px] lg:items-center lg:py-6"
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

      {/* ══ Haz de luz que baja desde arriba hasta el CTA (sólo móvil) ══

          Cubre la SECCIÓN entera, no la card. Estuvo anclado al contenedor de
          la card con bottom-full, y era un error: la sección lleva
          overflow-hidden, así que casi todo el canvas caía fuera del recorte y
          el haz no llegaba a verse. Cubriendo la sección, todo el recorrido
          queda dentro.

          El punto de impacto se apunta con verticalBeamOffset del shader, no
          moviendo el canvas: el haz nace arriba del todo y muere a la altura
          del CTA.

          El propio HeroLaser decide no renderizarse en escritorio; ver el
          porqué allí.

          mix-blend-screen es OBLIGATORIO, no decorativo: el renderer va con
          alpha:false y pinta fondo negro opaco, así que sin mezclar por luz
          taparía la foto con un rectángulo negro. Con screen el negro es
          neutro y sólo se suma lo que el haz ilumina.

          -z-10 lo deja por encima de la foto (-z-20) y POR DETRÁS del panel.

          Se probó a subirlo por delante del cristal, en z-20, para que el
          backdrop-blur no le difuminara el tramo que cruza la card. Se revirtió:
          el haz se mezcla con screen, que SUMA luz sobre todo lo que tiene
          debajo, así que aun quedando el contenido en una capa superior el
          resplandor lavaba el CTA y le comía el contraste que se acababa de
          ganar apagando su verde. Detrás del cristal el haz se ve más tenue,
          pero el botón se lee. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen"
      >
        <HeroLaser />
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

          Los 220 px se restan en píxeles y no en svh: svh depende del alto de
          cada pantalla, así que el mismo ajuste en svh movería el panel más en
          un móvil grande que en uno pequeño. Con medida fija el desplazamiento
          es idéntico en todos.

          Subió de 160 a 220 px: el panel se acortó al reducir el titular y los
          espaciados, y con el valor anterior quedaba una franja muerta entre él
          y el pie de la pantalla. Sesenta píxeles más arriba recuperan el
          equilibrio con la foto.

          Si se cambia el fundido, hay que mover este número con él — son las
          dos mitades del mismo ajuste.

          En escritorio se anula, porque allí el centrado lo resuelve
          items-center de la sección. */}
      <VoContainer className="pb-16 pt-[calc(68svh-220px)] lg:py-0">
      {/* 570 px: la mitad exacta del ancho de contenido (1140 px), que es la
          referencia del diseño. */}
      {/* El margen negativo que subía la card se retira en móvil.

          Estaba en -mt-16 para ganar alto, pero el panel se acortó al pasar sus
          medidas a vw y con esa subida acababa montándose sobre la cara de
          Pilar, que está sobre el 45% del alto de la foto. El sitio que hacía
          falta ya lo da el escalado del contenido, así que la card puede volver
          a apoyarse donde la deja el padding del contenedor y dejar el retrato
          despejado.

          En sm se mantiene: ahí la foto es más alta y no hay conflicto. */}
      <div className="relative mx-auto w-full max-w-[570px] sm:-mt-20 lg:mx-0 lg:mt-0">
        {/* Capa de luz. Va como HERMANA del panel, no envolviéndolo, y es
            deliberado: necesita overflow-hidden para recortar la luz a la forma
            de la card, y en WebKit un ancestro que recorta overflow anula el
            backdrop-filter de sus descendientes. Envolviendo el panel se
            quedaría sin su efecto de cristal en iPhone.

            Sobresale 2 px por cada lado: esa rendija es por donde asoma la luz
            que recorre el borde. El resto queda detrás del panel, que al ser
            translúcido deja intuir la esfera que lo cruza. */}
        {/* vo-edge-only recorta esta capa a su marco de 2 px. Es lo que
            convierte cada disco de luz en un tramo encendido del contorno en
            vez de un pompón atravesando el panel. */}
        <div
          aria-hidden
          className="vo-edge-only pointer-events-none absolute -inset-[2px] overflow-hidden rounded-lg"
        >
          {/* El "largo" del trazo es el tamaño de esta luz: el componente sólo
              la desplaza por el contorno, y lo que se ve encendido es su huella.
              Un disco de 112 px (size-28) dejaba tramos demasiado cortos en una
              card tan alta, así que pasa a una elipse de 288x112: estirada en el
              eje horizontal, la huella se lee como un trazo largo recorriendo el
              borde en lugar de un punto de luz.

              rounded-full sobre una caja rectangular da la elipse; el degradado
              pasa a ellipse para acompañar la forma y no recortarse en seco. */}
          <MovingBorder duration={7000} rx="10px" ry="10px">
            <span className="block h-28 w-72 rounded-full bg-[radial-gradient(ellipse,#ffffff_0%,var(--color-vo-lumen)_32%,transparent_70%)] opacity-70 blur-[3px]" />
          </MovingBorder>
          {/* Segunda luz a media vuelta: con una sola, la mitad del contorno
              está siempre apagada y en una card tan alta se nota. */}
          <MovingBorder duration={7000} rx="10px" ry="10px" offset={0.5}>
            <span className="block h-28 w-72 rounded-full bg-[radial-gradient(ellipse,#ffffff_0%,var(--color-vo-lumen)_32%,transparent_70%)] opacity-70 blur-[3px]" />
          </MovingBorder>
        </div>

        {/* La esfera va en su propia capa, SIN recortar al borde: su gracia es
            justamente cruzar la card por dentro. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
        >
          <span className="vo-orb" />
        </div>

        {/* lg:py-7 recorta 24 px del panel. Todos los "lg:" que aparecen de aquí
            hacia abajo tienen el mismo origen: encajar el panel dentro de los
            800 px de la sección. Sumados ahorran unos 190 px. */}
        {/* Los tamaños de dentro se expresan en vw con clamp: el panel tiene que
            caber ENTERO —con el botón visible— en una pantalla de 320 px de alto
            útil y también en un móvil grande, y una escala fija sólo acierta en
            uno de los dos. El clamp acota los extremos para que ni se
            microscopice ni se desborde.

            Desde sm se vuelve a medidas fijas: ahí ya sobra alto y el vw sólo
            introduciría variación sin motivo. */}
        <div className="relative rounded-lg border border-vo-bone/15 bg-vo-bone/8 px-[clamp(1rem,4.5vw,1.75rem)] py-[clamp(1rem,4vw,2rem)] text-center text-foreground shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:px-10 sm:py-10 lg:py-7">
          {/* Margen superior negativo: el logo sube hasta desbordar el borde del
              panel y queda flotando sobre él, a caballo entre la card y la foto.
              Es lo que lo saca de la fila de contenido y lo convierte en el
              remate de la pieza, además de recuperar el alto que ocupaba dentro.

              En escritorio asoma menos (-72 px sobre 96 px de ancho) que en
              móvil (-95 px sobre 112 px): allí el panel tiene que caber en los
              800 px de la sección y un logo demasiado alto se despega de la
              card en lugar de rematarla. */}
          {/* El logo queda a caballo del borde: la mitad fuera del panel y la
              mitad dentro.

              Eso es exactamente lo que consigue un margen superior negativo
              igual a LA MITAD de su alto, y como la imagen es cuadrada, la
              mitad de su ancho. Por eso el tamaño se declara una sola vez en
              --logo y el margen se calcula a partir de él con calc(): antes
              eran dos clamps independientes —ancho 20vw, margen 22vw— y en
              móvil el margen superaba al propio logo, que acababa saliéndose
              del panel por completo. Escritos así no pueden desincronizarse.

              Al no ocupar más que la mitad de su alto dentro de la caja, puede
              ser más grande sin costarle espacio al contenido. */}
          <LogoVao
            className="mx-auto mt-[calc(var(--logo)/-2)] w-(--logo)"
            style={
              {
                "--logo": "clamp(5.5rem,24vw,8rem)",
              } as React.CSSProperties
            }
          />

          {/* Badge. inline-flex y no block: así la píldora mide lo que el texto
              y queda centrada por el text-center del panel, en lugar de ocupar
              todo el ancho. */}
          <p className="mt-[clamp(0.6rem,2.5vw,1rem)] inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-[clamp(0.7rem,3vw,1rem)] py-[clamp(0.25rem,1.2vw,0.375rem)] font-display text-[clamp(0.6rem,2.6vw,0.75rem)] uppercase tracking-[0.32em] text-accent sm:mt-5 sm:text-sm lg:mt-4 lg:py-1">
            {/* El tracking añade espacio DESPUÉS de la última letra, incluida la
                final. Sin compensarlo, la píldora tiene 0.32em de más a la
                derecha y el texto se ve descentrado dentro de ella. */}
            <span className="-mr-[0.32em]">{HERO.eyebrow}</span>
          </p>

          {/* scroll-mt-8: sin margen el título queda pegado al borde superior
              de la pantalla y parece cortado.

              Los cuerpos bajan un escalón respecto de la primera versión: en
              móvil el conjunto no entraba de una vez en pantalla y el CTA
              quedaba por debajo del pliegue, que es justo lo que no puede pasar
              en la pieza que tiene que convertir. */}
          <h1
            id="registro"
            className="mt-[clamp(0.4rem,1.8vw,0.625rem)] scroll-mt-8 font-display uppercase leading-[1.08]"
          >
            <span className="block text-[clamp(0.85rem,3.8vw,1.125rem)] tracking-[0.14em] text-foreground/85 sm:text-xl">
              {HERO.titleTop}
            </span>
            <span className="mt-1 block text-[clamp(1.4rem,7vw,1.9rem)] tracking-[0.05em] sm:text-[2.6rem] lg:text-[2.4rem]">
              {HERO.titleMain[0]}
            </span>
            <span className="block text-[clamp(1.85rem,9.2vw,2.5rem)] tracking-[0.03em] sm:text-[3.4rem] lg:text-[3rem]">
              {HERO.titleMain[1]}
            </span>
          </h1>

          <SparkDivider className="mt-[clamp(0.6rem,2.5vw,1rem)] lg:mt-4" />

          {/* Es el subtitular que explica la oferta, así que va por encima del
              cuerpo de texto normal: 18 px y peso normal, no light.

              El peso importa tanto como el tamaño. Sobre fondo oscuro los
              trazos finos se pierden contra el negro, así que light a 14 px era
              lo menos legible de la página. Se queda en 18 y no más arriba
              porque la frase es larga (240 caracteres) y dentro del panel de
              570 px cada punto extra le suma una línea. */}
          <p className="mt-[clamp(0.6rem,2.5vw,1rem)] font-sans text-[clamp(0.78rem,3.4vw,0.95rem)] leading-snug text-foreground/90 sm:mt-5 sm:text-lg sm:leading-relaxed lg:mt-4 lg:text-base">
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

          {/* El formulario ya no vive aquí: lo sirve el modal, que abren todos
              los CTA de la landing. El panel se queda con la presentación y un
              único punto de entrada. */}
          {/* El aviso de privacidad ya no va aquí: acompaña a los campos, y
              los campos viven en el modal. Repetirlo junto a un botón que sólo
              abre un diálogo no aportaba nada. */}
          <div className="mt-[clamp(0.75rem,3vw,1.25rem)] lg:mt-5">
            <WaitlistCta>{HERO.cta}</WaitlistCta>
          </div>
        </div>

        {/* Lluvia de código, POR DELANTE del panel y no por detrás.

            Detrás no se veía, y no por estar mal montada: el panel lleva
            backdrop-blur-md, que difumina justo lo que tiene debajo. La textura
            quedaba emborronada hasta desaparecer.

            Meterla DENTRO del panel tampoco servía: recortarla a la forma de la
            card exige overflow-hidden, y en WebKit un ancestro que recorta
            overflow anula el backdrop-filter de sus descendientes — el panel se
            quedaría sin cristal en iPhone.

            Delante resuelve las dos cosas: el blur no la toca y el panel
            conserva su efecto. Va a opacidad baja y con pointer-events
            desactivados para que sea textura sobre el cristal y no una capa que
            compita con el texto. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
        >
          <MatrixRain fade={0.08} opacity={0.22} />
        </div>
      </div>
      </VoContainer>
    </section>
  );
}
