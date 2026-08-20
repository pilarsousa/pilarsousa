import {
  Anchor,
  Compass,
  Crown,
  Layers,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { SectionTexture } from "@/components/volver-al-origen/ui/SectionTexture";
import { SymbolCloud } from "@/components/volver-al-origen/ui/SymbolCloud";
import { QUE_ENTRENAS } from "@/components/volver-al-origen/content";

/*
  Seccion 4 — Que vas a entrenar durante el proceso.

  Las cinco capacidades, con la nube de simbolos al lado en escritorio. Es la
  respuesta concreta a la seccion anterior: alli el lector se reconocio en seis
  frases, aqui ve que se hace con eso.

  AQUI HUBO UN RECORRIDO ANCLADO —el bloque se quedaba clavado y las capacidades
  se relevaban de una en una— y se retiro. El motivo no fue el efecto en si sino
  su geometria, y conviene dejarlo escrito porque es un callejon conocido:

  · Con el bloque del alto de la ventana, el contenido queda centrado pero le
    sobran unos 200 px por arriba y por abajo, y ese sobrante se ve como un
    hueco en las dos junturas con las secciones vecinas.
  · Ajustando el bloque a su contenido desaparece el hueco, pero entonces el
    fondo de la seccion —una capa del alto de la pista de scroll— se ve
    deslizarse por detras del contenido quieto.
  · Fijando ademas el fondo a la ventana se arregla eso, pero vuelve el hueco.

  Las tres cosas no pueden darse a la vez mientras el contenido ocupe bastante
  menos que la pantalla, que es el caso de esta seccion. Con las cinco
  capacidades a la vista no hace falta ninguna.

  La nube solo en escritorio: necesita ancho para que los simbolos se separen y
  se lean, y en movil ese ancho lo necesita el texto. Es decorativa —va con
  aria-hidden desde el propio componente—, asi que no verla en movil no cuesta
  informacion.

  Fondo texturado claro, alternando con las oscuras que la rodean. Ojo si se
  cambia el orden de la pagina: la alternancia es lo que separa una seccion de
  la siguiente sin dibujar una linea, y dos claras seguidas se leen como una.

  El mapa de iconos vive aqui y no en content.ts: ese archivo es data
  serializable y no debe arrastrar componentes de React. Es cerrado a proposito
  — si alguien escribe un nombre que no existe, TypeScript lo marca en
  content.ts en lugar de fallar en tiempo de ejecucion.
*/

const ICONS = {
  crown: Crown,
  compass: Compass,
  trending: TrendingUp,
  layers: Layers,
  anchor: Anchor,
} satisfies Record<string, LucideIcon>;

export type QueEntrenasIcon = keyof typeof ICONS;

export function QueEntrenas() {
  return (
    <section
      aria-labelledby="que-entrenas-title"
      className="relative isolate py-[clamp(5rem,3rem+8vh,10rem)] text-foreground"
    >
      <SectionTexture variant="claro" />

      <VoContainer>
        <ScrollIn>
          <SectionTitle
            id="que-entrenas-title"
            accent={QUE_ENTRENAS.titleAccent}
            after="?"
          >
            {QUE_ENTRENAS.title}
          </SectionTitle>
        </ScrollIn>

        <ScrollIn delay={0.05}>
          <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-base leading-relaxed text-foreground/75 sm:text-lg">
            {QUE_ENTRENAS.subtitle}
          </p>
        </ScrollIn>

        {/* La nube pesa menos que el texto en el reparto (0,9 frente a 1,1):
            son cinco bloques con titulo y parrafo, y la nube se lee igual en
            algo menos de ancho. */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-16">
          <div className="hidden lg:block">
            <SymbolCloud />
          </div>

          <ol className="flex flex-col gap-4">
            {QUE_ENTRENAS.items.map((item, i) => {
              const Icon = ICONS[item.icon];

              return (
                <ScrollIn key={item.title} delay={i * 0.07}>
                  <li className="rounded-xl border border-accent/20 bg-vo-forest/40 p-5 backdrop-blur-sm">
                    {/* Icono y titulo en la misma fila. Apilados, el disco
                        quedaba suelto sobre el texto y la card empezaba con un
                        elemento que no dice nada; al lado, el ojo entra por el
                        icono y sigue de corrido hasta el titular.

                        items-center y no items-start: el titulo ocupa una o dos
                        lineas segun el ancho, y anclado arriba el disco se
                        descolgaba en cuanto partia. */}
                    <div className="flex items-center gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-vo-forest/50 shadow-[0_0_26px_-8px_var(--vo-glow-strong)]">
                        <Icon
                          strokeWidth={1.3}
                          className="size-5 text-accent"
                          aria-hidden
                        />
                      </span>

                      <h3 className="font-display text-base uppercase leading-tight tracking-[0.04em] text-foreground sm:text-lg lg:text-xl">
                        {item.title}
                      </h3>
                    </div>

                    {/* En escritorio el cuerpo sube a 1,05 rem. La columna es
                        ancha y el texto se leia pequeno para el sitio que
                        tiene; en movil se queda como estaba, que ahi el ancho
                        si es escaso. */}
                    <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/80 sm:text-[0.95rem] lg:text-[1.05rem] lg:leading-[1.7]">
                      {item.text}
                    </p>
                  </li>
                </ScrollIn>
              );
            })}
          </ol>
        </div>
      </VoContainer>
    </section>
  );
}
