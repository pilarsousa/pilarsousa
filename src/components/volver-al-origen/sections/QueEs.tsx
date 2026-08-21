import Image from "next/image";
import { Check } from "lucide-react";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { WaitlistCta } from "@/components/volver-al-origen/ui/WaitlistCta";
import { QUE_ES } from "@/components/volver-al-origen/content";
import imgSeccion from "@/../public/volver-origen/public/img/hero/img-seccion.png";

/*
  Sección 3 — Qué es Volver al Origen.

  Explica el programa: hasta aquí el visitante sabe por qué le conviene entrar en
  la lista, pero no qué es exactamente aquello a lo que se apunta.

  El tinte de fondo repite el recurso de Testimonios: un degradado vertical que
  entra y sale por los bordes, de modo que la sección se insinúa sin dibujar un
  rectángulo. Al alternar con el negro de las secciones vecinas, la página gana
  ritmo — oscuro, tinte, oscuro, tinte, oscuro.

  Layout: imagen a la izquierda y los seis puntos a la derecha, en dos columnas
  de tres. En móvil se apilan, con la imagen arriba.
*/

/* El mismo tinte que usa Testimonios. Literal y no var(--color-vo-sage) porque
   va dentro de un linear-gradient() en un style inline. */
const TINT = "#1f310c";

export function QueEs() {
  return (
    <section
      aria-labelledby="que-es-title"
      className="relative isolate bg-background py-[clamp(5rem,3rem+8vh,10rem)] text-foreground"
    >
      {/* Difuminado del tinte, de dentro hacia fuera.

          Lineal vertical y no radial: en un radial los radios se miden sobre el
          tamaño de la caja, pero del centro al borde sólo hay la MITAD del alto,
          así que el color no llega a transparente dentro de la sección y en la
          juntura aparece un escalón. En un lineal, el 0% y el 100% caen justo en
          los bordes y el desvanecido completo está garantizado sea cual sea el
          alto que acabe teniendo la sección.

          Las paradas en 35% y 65% dejan el tinte pleno sólo en el tercio central
          y dedican un 35% del alto a entrar y otro tanto a salir: esa transición
          larga es lo que se lee como difuminación y no como cambio de bloque. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 0%, ${TINT} 35%, ${TINT} 65%, transparent 100%)`,
        }}
      />

      <VoContainer>
        <ScrollIn>
          <SectionTitle id="que-es-title" accent={QUE_ES.titleAccent} after="?">
            {QUE_ES.title}
          </SectionTitle>
        </ScrollIn>
      </VoContainer>

      {/* ══ MÓVIL: imagen a sangre con fundido inferior ══

          Mismo patrón que el retrato de Pilar: la imagen ocupa todo el ancho,
          sin margen del contenedor ni esquinas redondeadas, y se funde con el
          fondo por abajo. El fundido es lo que cose la imagen con las cards que
          vienen debajo, en lugar de cortarla con un borde.

          Va fuera del VoContainer a propósito: dentro se quedaría con los 24 px
          de margen a cada lado y no llegaría a sangrar.

          EL FUNDIDO ES UNA MÁSCARA, no un degradado de color encima.

          Con un degradado había que elegir hacia qué color desvanecer, y aquí no
          hay uno solo: la sección lleva el tinte verde por encima del fondo, así
          que su color cambia con la altura. Al fundir hacia #0b1502 se pintaba
          una banda más oscura que lo que tenía al lado y aparecía una línea
          horizontal justo donde terminaba.

          La máscara no pinta nada: vuelve transparente la propia imagen, y por
          debajo asoma el fondo real de la sección, sea el que sea. Así no hay
          color que acertar y la costura desaparece. */}
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

      {/* -mt-14 en móvil: recupera el hueco que deja la cola de la imagen.

          La máscara la vuelve transparente por abajo, pero esa parte invisible
          sigue ocupando su altura en el flujo, así que entre la imagen y la
          primera card quedaba un vacío que no lo parecía. El margen negativo
          sube las cards hasta donde la imagen ya casi no se ve.

          En escritorio se anula: allí la imagen va dentro de la rejilla, sin
          máscara ni cola que compensar. */}
      <VoContainer className="-mt-14 lg:mt-0">
        {/* La imagen pesa más que las cards en el reparto (1,15 frente a 0,85):
            es lo que muestra el producto y aguanta el detalle, mientras que las
            cards son seis frases cortas y se leen igual en menos ancho. */}
        {/* lg:gap-x-[68px]: 20 px más de separación entre la imagen y el bloque
            de cards, para que no se lean como una sola masa. */}
        <div className="grid grid-cols-1 items-center gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-x-[68px]">
          {/* ── Imagen, sólo escritorio ── */}
          <ScrollIn from="left" className="hidden lg:block">
            <figure className="relative">
              {/* Halo verde detrás, el mismo recurso de "luz encendida" que usan
                  el logo y los CTA. Va por detrás con -z-10 y desenfocado, para
                  que se lea como resplandor y no como un borde.

                  Sin borde en la imagen: el marco verde competía con el halo y
                  encajonaba un montaje que ya trae sus propios límites. */}
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_50%,rgba(180,226,54,0.18),transparent_70%)] blur-xl"
              />
              <Image
                src={imgSeccion}
                alt="Volver al Origen"
                quality={90}
                sizes="(min-width: 1024px) 55vw, 100vw"
                placeholder="blur"
                className="h-auto w-full rounded-2xl"
              />
            </figure>
          </ScrollIn>

          {/* ── Puntos ── */}
          {/* lg:gap-y-8 separa las filas 16 px más que las columnas. En
              escritorio las cards se leen por filas, y con el mismo hueco en
              los dos ejes la rejilla se percibe como un bloque continuo. */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-y-8">
            {QUE_ES.items.map((item, i) => (
              /* El retardo escalona la entrada; el 0.06 por card es corto a
                 propósito, porque son seis y con un paso mayor la última
                 llegaría tarde. */
              <ScrollIn key={item} delay={i * 0.06} className="h-full">
                {/* El neón recorre las cards de una en una: todas comparten la
                    misma animación de 9 s y lo que las encadena es el retardo,
                    repartido en pasos de 1,5 s (9 entre 6). Cada una se
                    enciende sólo en su tramo, así que nunca hay dos a la vez.

                    El retardo va en línea porque depende del índice: una clase
                    de Tailwind no puede generar seis valores distintos. */}
                <div
                  className="vo-neon-cycle flex h-full items-start gap-3 rounded-xl border border-accent/20 bg-vo-forest/40 p-4 backdrop-blur-sm"
                  style={{ animationDelay: `${i * 1.5}s` }}
                >
                  {/* shrink-0 para que el disco del icono no se aplaste cuando
                      el texto ocupa varias líneas. */}
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                    <Check size={14} strokeWidth={2.4} className="text-accent" aria-hidden />
                  </span>
                  <p className="font-sans text-sm leading-relaxed text-foreground/90">
                    {item}
                  </p>
                </div>
              </ScrollIn>
            ))}
          </div>
        </div>

        <ScrollIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <WaitlistCta className="max-w-md">{QUE_ES.cta}</WaitlistCta>
          </div>
        </ScrollIn>
      </VoContainer>
    </section>
  );
}
