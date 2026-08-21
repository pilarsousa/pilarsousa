import Image from "next/image";
import { Check, Coins, Compass, Users, type LucideIcon } from "lucide-react";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { WaitlistCta } from "@/components/volver-al-origen/ui/WaitlistCta";
import {
  ArcosDeFondo,
  CaminoPunteado,
  FlorDeLaVida,
  OrnamentoSol,
} from "@/components/volver-al-origen/ui/Ornamentos";
import { EXPERIENCIA } from "@/components/volver-al-origen/content";
import imgSeccion from "@/../public/volver-origen/public/img/landing/img-mockup-02.png";

/*
  Sección 5 — Una experiencia diseñada para que lo lleves a tu vida real.

  Es la sección de contenido: qué incluye exactamente el programa. Sustituye a
  la antigua "¿Qué es Volver al Origen?", de la que hereda la maquetación de
  imagen + puntos y a la que amplía con las tres áreas del cierre.

  Dos bloques, y el orden importa: primero QUÉ recibe (nueve puntos, concretos y
  contables) y después SOBRE QUÉ trabaja (tres áreas de vida). Lo tangible
  primero, porque es lo que responde a "¿qué me llevo?"; lo transformador
  después, porque es lo que se recuerda.

  Sin textura propia: se queda con el fondo oscuro continuo de la página, que es
  el que alterna con las claras de las secciones vecinas.

  El mapa de iconos vive aquí y no en content.ts: ese archivo es data
  serializable y no debe arrastrar componentes de React.
*/

const ICONS = {
  users: Users,
  compass: Compass,
  coins: Coins,
} satisfies Record<string, LucideIcon>;

export type AreaIcon = keyof typeof ICONS;

export function Experiencia() {
  return (
    <section
      aria-labelledby="experiencia-title"
      /* overflow-x-clip: la imagen del producto sangra 10vw por la izquierda
         para llegar al canto de la pantalla, y sin recortar aquí ese exceso se
         convierte en scroll horizontal en toda la página. */
      className="relative isolate overflow-x-clip py-[clamp(5rem,3rem+8vh,10rem)] text-foreground"
    >
      {/* Arcos de fondo, abajo a la izquierda — al revés que en la sección de
          la reflexión, que los tiene arriba a la derecha. Alternando la esquina,
          las dos secciones comparten recurso sin parecer la misma pantalla
          repetida. El overflow-x-clip de la sección los recorta. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-52 -z-10 w-[42rem] opacity-[0.12]"
      >
        <ArcosDeFondo />
      </div>

      {/* Flor de la vida tras el bloque de puntos, muy apagada: da grano al
          fondo justo donde sólo hay cards apiladas. */}
      <FlorDeLaVida className="pointer-events-none absolute top-1/3 -right-24 -z-10 hidden size-[26rem] opacity-[0.06] lg:block" />

      {/* El camino cruza la sección por detrás: es el mismo hilo que recorre la
          reflexión, y verlo reaparecer aquí es lo que hace que las dos se lean
          como partes de un recorrido.

          ENTRA Y SALE POR LOS COSTADOS, no empieza ni acaba en el aire. Antes
          arrancaba en (12,6) —dentro del encuadre y a un 6% del techo— y el
          trazo aparecía de la nada en mitad del fondo, que es lo que se veía
          como un cabo suelto. Ahora nace en x=0, o sea pegado al borde
          izquierdo, y muere en x=100: el ojo lo lee como un hilo que viene de
          fuera y se va fuera, no como una línea que empieza y termina aquí.

          El borde es literal, no aproximado: el <svg> recorta por defecto lo que
          se sale del viewBox, así que coordenadas negativas no servirían — hay
          que tocar el canto justo. */}
      <CaminoPunteado
        d="M0 3 C 16 5, 14 18, 16 28 C 18 44, 48 36, 50 50 C 52 66, 8 62, 10 78 C 12 92, 74 88, 100 94"
        opacidad={0.28}
        className="pointer-events-none absolute inset-x-[6%] inset-y-0 -z-10 hidden h-full lg:block"
      />

      <VoContainer>
        {/* El sol corona la sección, igual que en la de la reflexión: es lo que
            hermana las dos y marca que empieza un bloque, no un apartado.
            Pequeño y flanqueado por dos filetes que se desvanecen. */}
        <ScrollIn>
          <div className="flex items-center justify-center gap-4">
            <span
              aria-hidden
              className="h-px w-full max-w-[5rem] bg-[linear-gradient(to_right,transparent,var(--color-accent))] opacity-50"
            />
            <span className="relative shrink-0">
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,var(--vo-glow)_0%,transparent_65%)] blur-md"
              />
              <OrnamentoSol className="size-9" />
            </span>
            <span
              aria-hidden
              className="h-px w-full max-w-[5rem] bg-[linear-gradient(to_left,transparent,var(--color-accent))] opacity-50"
            />
          </div>
        </ScrollIn>

        <ScrollIn delay={0.05}>
          <SectionTitle
            id="experiencia-title"
            accent={EXPERIENCIA.titleAccent}
            className="mt-6 text-[clamp(1.6rem,6vw,2.2rem)] leading-[1.12] lg:text-[3rem]"
          >
            {EXPERIENCIA.title}
          </SectionTitle>
        </ScrollIn>

        <ScrollIn delay={0.05}>
          <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-base leading-relaxed text-foreground/75 sm:text-lg">
            {EXPERIENCIA.subtitle}
          </p>
        </ScrollIn>
      </VoContainer>

      {/* ══ MÓVIL: imagen a sangre con fundido inferior ══

          Mismo patrón que el retrato de Pilar: ocupa todo el ancho, sin margen
          del contenedor ni esquinas redondeadas, y se funde con el fondo por
          abajo. El fundido es lo que cose la imagen con los puntos que vienen
          debajo, en lugar de cortarla con un borde.

          Va fuera del VoContainer a propósito: dentro se quedaría con los 24 px
          de margen a cada lado y no llegaría a sangrar.

          EL FUNDIDO ES UNA MÁSCARA, no un degradado de color encima. Con un
          degradado habría que elegir hacia qué color desvanecer, y el fondo real
          es una textura que cambia con la altura: cualquier color que se
          eligiera dibujaría una banda plana con su canto marcado. La máscara
          vuelve transparente la propia imagen y deja pasar lo que haya
          detrás. */}
      <div
        aria-hidden
        className="relative mt-9 lg:hidden"
        /* Se desvanece por los CUATRO lados, y el vertical va en los dos
           sentidos y no sólo hacia abajo.

           El lineal era "to top", así que sólo apagaba el pie: por arriba la
           imagen empezaba con un canto recto que se leía como un rectángulo
           pegado sobre la textura, justo donde la sección acaba de terminar su
           encabezado. Ahora entra desde transparente en el 0%, es opaco entre
           el 14% y el 80%, y vuelve a transparente al final — funde por los dos
           extremos.

           El radial se ocupa de los costados. mask-composite los cruza: sólo se
           ve la imagen donde AMBOS la dejan pasar. Safari llama "source-in" a
           lo que el estándar llama "intersect". */
        style={{
          maskImage:
            "radial-gradient(80% 80% at 50% 48%, #000 28%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(80% 80% at 50% 48%, #000 28%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <Image
          src={imgSeccion}
          alt=""
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="h-auto w-full"
        />
      </div>

      {/* -mt-14 en móvil: recupera el hueco que deja la cola de la imagen. La
          máscara la vuelve transparente por abajo, pero esa parte invisible
          sigue ocupando su altura en el flujo. En escritorio se anula, porque
          allí la imagen va dentro de la rejilla y no tiene cola que
          compensar. */}
      <VoContainer className="-mt-14 lg:mt-0">
        {/* Mitad y mitad, como el montaje. La imagen dejó de ser un apoyo del
            texto —era 1,05 contra 0,95— para pesar lo mismo que él: es el
            producto, y en el montaje ocupa medio ancho a sangre por la
            izquierda. */}
        <div className="grid grid-cols-1 items-center gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-x-12">
          {/* ── Imagen, sólo escritorio ── */}
          {/* SIN MARCO NI ESQUINAS REDONDEADAS, al revés que antes. En el
              montaje el producto no está dentro de una card: flota sobre el
              fondo y se disuelve por los bordes, y ése es el motivo de que se
              lea como un escaparate y no como una captura pegada.

              El desbordamiento hacia la izquierda —el ancho de la columna más
              10vw— es lo que la lleva hasta el canto de la pantalla. El
              overflow-x-clip de la sección impide que genere scroll lateral.

              La máscara radial la apaga por los cuatro lados: intacta hasta el
              60% del radio y transparente en el 100%. Es máscara y no degradado
              por el motivo de siempre — un degradado tendría que fundir hacia un
              color y el fondo es una textura que cambia con la posición, así que
              cualquier color dibujaría un halo. */}
          <ScrollIn from="left" className="hidden lg:block">
            <figure className="relative -ml-[10vw] w-[calc(100%+10vw)]">
              {/* Halo verde detrás, el mismo recurso de "luz encendida" que usan
                  el logo y los CTA. Va desenfocado y con -z-10 para que se lea
                  como resplandor y no como un borde. */}
              <div
                aria-hidden
                className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,var(--vo-glow)_0%,transparent_72%)] blur-3xl"
              />
              <Image
                src={imgSeccion}
                alt="Volver al Origen"
                quality={90}
                sizes="(min-width: 1024px) 60vw, 100vw"
                placeholder="blur"
                className="h-auto w-full"
                /* DOS MÁSCARAS CRUZADAS, porque con una no bastaba.

                   La imagen trae su propio fondo oscuro, así que su rectángulo
                   se recortaba contra la textura de la página por mucho que se
                   apagaran las esquinas: un radial que empieza a desvanecer en
                   el 60% deja el 60% central intacto, bordes rectos incluidos.

                   · el radial ahora arranca en el 25% del radio, así que tres
                     cuartas partes del recorrido son desvanecido y no queda
                     canto que localizar;
                   · el lineal vertical remata el techo y el suelo, que son los
                     dos bordes que más se notaban por ser los más rectos.

                   mask-composite las cruza: sólo se ve la imagen donde AMBAS la
                   dejan pasar. Safari llama "source-in" a lo que el estándar
                   llama "intersect". */
                style={{
                  maskImage:
                    "radial-gradient(62% 62% at 50% 48%, #000 25%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 16%, #000 82%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(62% 62% at 50% 48%, #000 25%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 16%, #000 82%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              />
            </figure>
          </ScrollIn>

          {/* ── Los nueve puntos ── */}
          {/* Una sola columna aunque haya sitio para dos: cuatro de los nueve
              llevan una línea de detalle debajo, y en dos columnas las tarjetas
              con detalle y las de una línea dejan las filas descuadradas. */}
          <ul className="flex flex-col gap-3.5">
            {EXPERIENCIA.items.map((item, i) => (
              /* Paso corto, 0,05 s: son nueve y con un retardo mayor el último
                 llegaría mucho después de que el bloque esté a la vista. */
              <ScrollIn key={item.text} delay={i * 0.05}>
                {/* Cards con borde visible y resplandor, no el contorno al 20%
                    que había: sobre la textura, un canto tan tenue desaparece y
                    la card se lee como una mancha. Mismo tratamiento que el
                    resto de paneles de la página — luz de 1 px en el canto
                    superior y halo verde difuso por fuera. */}
                <li className="flex items-start gap-4 rounded-2xl border border-accent/30 bg-vo-forest/45 px-5 py-4 shadow-[inset_0_1px_0_0_rgba(180,226,54,0.2),0_18px_46px_-32px_var(--vo-glow-strong)] backdrop-blur-sm">
                  {/* El disco del check crece de 24 a 32 px y va perfilado, como
                      en el montaje: es la marca que se repite nueve veces y a
                      tamaño pequeño se leía como un bullet. */}
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/45 bg-accent/10">
                    <Check
                      size={16}
                      strokeWidth={2.2}
                      className="text-accent"
                      aria-hidden
                    />
                  </span>

                  <div>
                    <p className="font-sans text-[0.95rem] leading-relaxed text-foreground sm:text-base">
                      {item.text}
                    </p>
                    {/* El detalle baja de tamaño y de contraste: es una
                        aclaración del punto, no otro punto. */}
                    {item.detalle && (
                      <p className="mt-1 font-sans text-[0.8rem] leading-relaxed text-foreground/60">
                        {item.detalle}
                      </p>
                    )}
                  </div>
                </li>
              </ScrollIn>
            ))}
          </ul>
        </div>

        {/* ── Las tres áreas ── */}
        {/* Cambian de forma respecto de los puntos de arriba: icono grande
            arriba y texto centrado, en tres columnas. Es a propósito — son otro
            nivel de la oferta (sobre qué se trabaja, no qué se recibe) y si se
            maquetaran igual se leerían como doce puntos seguidos. */}
        <ScrollIn delay={0.05}>
          <h3 className="mt-16 text-center font-display text-lg uppercase leading-snug tracking-[0.05em] text-foreground sm:text-xl">
            {EXPERIENCIA.areasTitle}
          </h3>
        </ScrollIn>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {EXPERIENCIA.areas.map((area, i) => {
            const Icon = ICONS[area.icon];

            return (
              <ScrollIn key={area.nombre} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col items-center rounded-2xl border border-accent/25 bg-vo-forest/40 p-6 text-center backdrop-blur-sm">
                  <span className="flex size-14 items-center justify-center rounded-full border border-accent/35 bg-vo-forest/50 shadow-[0_0_26px_-8px_var(--vo-glow-strong)]">
                    <Icon
                      strokeWidth={1.2}
                      className="size-6 text-accent"
                      aria-hidden
                    />
                  </span>

                  <h4 className="mt-5 font-display text-lg uppercase tracking-[0.08em] text-accent">
                    {area.nombre}
                  </h4>
                  {/* El lema en versalitas pequeñas bajo el nombre: es el título
                      interno del módulo y funciona como subtítulo, no como
                      frase del párrafo. */}
                  <p className="mt-1 font-display text-[0.8rem] uppercase leading-snug tracking-[0.12em] text-foreground/70">
                    {area.lema}
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/80">
                    {area.text}
                  </p>
                </div>
              </ScrollIn>
            );
          })}
        </div>

        <ScrollIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <WaitlistCta className="max-w-md">{EXPERIENCIA.cta}</WaitlistCta>
          </div>
        </ScrollIn>
      </VoContainer>
    </section>
  );
}
