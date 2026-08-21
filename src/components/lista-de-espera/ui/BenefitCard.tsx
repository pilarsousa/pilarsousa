import { Clock, Gift, Tag, type LucideIcon } from "lucide-react";
import { MatrixRain } from "@/components/bootcamp/ui/MatrixRain";

/*
  Una de las tres ventajas de apuntarse a la lista.

  El icono llega como string desde content.ts y se traduce aquí: así el archivo
  de copy sigue siendo data serializable, sin importar componentes de React.
  El mapa es cerrado a propósito — si alguien escribe un nombre que no existe,
  TypeScript lo marca en content.ts en lugar de fallar en tiempo de ejecución.

  La caja es .vo-card, la misma pieza que las cards de Recompensa de Misión
  Origen repintada a esta paleta: panel inclinado asomando por detrás que gira
  y se aviva al pasar el puntero.

  Dos maquetaciones:
  · MÓVIL — icono pequeño y título a su lado, en una sola línea; el texto debajo.
  · sm EN ADELANTE — icono grande arriba, título debajo y luego el texto.

  El texto va alineado a la izquierda y no centrado: dentro de una caja con
  borde, el centrado deja los renglones irregulares contra un marco recto y se
  lee peor.

  El padding es menor en móvil (24 px) que a partir de sm (32 px) porque ahí
  cada píxel de relleno es ancho que pierde el título de la cabecera.
*/

const ICONS = {
  clock: Clock,
  tag: Tag,
  gift: Gift,
} satisfies Record<string, LucideIcon>;

export type BenefitIcon = keyof typeof ICONS;

type BenefitCardProps = {
  icon: BenefitIcon;
  title: string;
  text: string;
};

export function BenefitCard({ icon, title, text }: BenefitCardProps) {
  const Icon = ICONS[icon];

  /* El relleno vertical es mayor que el horizontal (32/40 frente a 28/32): es
     lo que da a la card su proporción más alta que ancha. El horizontal no
     puede crecer más sin comerse el ancho del título de la cabecera, que tiene
     prohibido partirse en dos líneas. */
  return (
    <div className="vo-card flex h-full flex-col px-7 py-8 sm:px-8 sm:py-10 lg:px-7 lg:py-7">
      {/* Lluvia de código de fondo, la misma del hero. Se pausa sola cuando la
          card sale de pantalla y no se dibuja bajo "reducir movimiento", así
          que tener tres a la vez no penaliza. */}
      <div aria-hidden className="vo-card-rain">
        <MatrixRain fade={0.08} opacity={0.4} />
      </div>

      {/* z-10 sube el contenido por encima de la lluvia. El panel inclinado
          vive en z -1, así que quedan las tres capas en orden. */}
      <div className="relative z-10 flex flex-col">
        {/* Todo alineado a la izquierda: cabecera y párrafo comparten el mismo
            margen y el ojo encuentra un único borde vertical del que colgar la
            lectura. Lo único que cambia entre tamaños es la disposición —en
            móvil icono y título en fila, desde sm apilados—, no la alineación. */}
        <div className="flex items-center gap-2 sm:block">
          {/* Círculo del icono: borde verde tenue y halo luminoso, el mismo
              recurso de "luz encendida" que usan los CTA y el logo.
              shrink-0 para que el título no lo aplaste al ponerse a su lado. */}
          {/* 40 px en móvil. Estaba en 36 para cederle ancho al título, que
              tenía prohibido partirse; al levantarse esa restricción el icono
              recupera su tamaño y vuelve a equilibrar con el titular, ahora
              más grande. */}
          {/* En lg el círculo baja de 86 a 64 px y su margen inferior de 24 a
              16: apiladas en columna, tres iconos grandes alargaban la pila
              mucho más que el texto que acompañan. */}
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-vo-forest/40 shadow-[0_0_26px_-8px_var(--vo-glow-strong)] sm:mb-6 sm:size-[86px] lg:mb-4 lg:size-16">
            <Icon
              strokeWidth={1.2}
              className="size-[19px] text-accent sm:size-[38px] lg:size-7"
              aria-hidden
            />
          </span>

          {/* El título puede partirse en dos líneas.

              Antes llevaba whitespace-nowrap y un tamaño en vw que encogía con
              la pantalla para que cupiera de una sola línea: en un móvil de
              320 px eso lo dejaba en unos 11 px, ilegible para lo que es el
              titular de la card. El coste de prohibir el salto era demasiado
              alto para lo que se ganaba.

              Al levantar esa prohibición, el tamaño pasa a ser fijo: 18 px en
              móvil, que es el mínimo con el que estos tres títulos se leen como
              titulares. Los que no entren en una línea se parten, y está bien
              —la card tiene alto de sobra para dos—.

              leading-tight y no leading-snug: en dos líneas, el interlineado
              holgado separaba demasiado las mitades de una misma frase. */}
          <h3 className="font-display text-[1.125rem] uppercase leading-tight tracking-[0.03em] text-foreground sm:text-[1.35rem] sm:tracking-[0.1em]">
            {title}
          </h3>
        </div>

        {/* Un escalón por debajo del título, para que se lean como dos niveles
            distintos y no como el mismo texto en dos fuentes.

            En móvil el bloque se limita a 264 px y se centra, para que la card
            no quede como una tira ancha y baja. Se probó en 224 y resultaba
            demasiado encerrado: los renglones quedaban tan cortos que el texto
            parecía apretado contra sí mismo.

            Estrechar aquí no afecta al título: vive en la fila de la cabecera,
            que conserva todo el ancho disponible.

            Desde sm se anula, porque allí la cabecera se alinea a la izquierda
            y un párrafo centrado no cuadraría con ella.

            Peso normal y opacidad 85%, no light al 60%: al bajar de tamaño, esa
            combinación es la que antes cruzaba el umbral de lectura incómoda
            sobre fondo oscuro. El tamaño puede encoger; el peso y el contraste
            no deberían acompañarlo. */}
        <p className="mt-5 max-w-[16.5rem] font-sans text-sm leading-relaxed text-foreground/85 sm:mt-4 sm:max-w-none sm:text-[0.95rem]">
          {text}
        </p>
      </div>
    </div>
  );
}
