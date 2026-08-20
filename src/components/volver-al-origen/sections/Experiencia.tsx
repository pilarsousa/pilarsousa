import Image from "next/image";
import { Check, Coins, Compass, Users, type LucideIcon } from "lucide-react";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { WaitlistCta } from "@/components/volver-al-origen/ui/WaitlistCta";
import { EXPERIENCIA } from "@/components/volver-al-origen/content";
import imgSeccion from "@/../public/volver-origen/public/img/hero/img-seccion.png";

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
      className="relative isolate py-[clamp(5rem,3rem+8vh,10rem)] text-foreground"
    >
      <VoContainer>
        <ScrollIn>
          <SectionTitle id="experiencia-title" accent={EXPERIENCIA.titleAccent}>
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
        style={{
          maskImage: "linear-gradient(to top, transparent 0%, #000 45%)",
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, #000 45%)",
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
        <div className="grid grid-cols-1 items-center gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-[68px]">
          {/* ── Imagen, sólo escritorio ── */}
          <ScrollIn from="left" className="hidden lg:block">
            <figure className="relative">
              {/* Halo verde detrás, el mismo recurso de "luz encendida" que usan
                  el logo y los CTA. Va desenfocado y con -z-10 para que se lea
                  como resplandor y no como un borde. */}
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_50%,rgba(180,226,54,0.18),transparent_70%)] blur-xl"
              />
              <Image
                src={imgSeccion}
                alt="Volver al Origen"
                quality={90}
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                className="h-auto w-full rounded-2xl"
              />
            </figure>
          </ScrollIn>

          {/* ── Los nueve puntos ── */}
          {/* Una sola columna aunque haya sitio para dos: cuatro de los nueve
              llevan una línea de detalle debajo, y en dos columnas las tarjetas
              con detalle y las de una línea dejan las filas descuadradas. */}
          <ul className="flex flex-col gap-3">
            {EXPERIENCIA.items.map((item, i) => (
              /* Paso corto, 0,05 s: son nueve y con un retardo mayor el último
                 llegaría mucho después de que el bloque esté a la vista. */
              <ScrollIn key={item.text} delay={i * 0.05}>
                <li className="flex items-start gap-3 rounded-xl border border-accent/20 bg-vo-forest/40 p-4 backdrop-blur-sm">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                    <Check
                      size={14}
                      strokeWidth={2.4}
                      className="text-accent"
                      aria-hidden
                    />
                  </span>

                  <div>
                    <p className="font-sans text-sm leading-relaxed text-foreground/90 sm:text-[0.95rem]">
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
