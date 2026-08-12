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
    <div className="vo-card flex h-full flex-col px-7 py-8 sm:px-8 sm:py-10">
      {/* Lluvia de código de fondo, la misma del hero. Se pausa sola cuando la
          card sale de pantalla y no se dibuja bajo "reducir movimiento", así
          que tener tres a la vez no penaliza. */}
      <div aria-hidden className="vo-card-rain">
        <MatrixRain fade={0.08} opacity={0.4} />
      </div>

      {/* z-10 sube el contenido por encima de la lluvia. El panel inclinado
          vive en z -1, así que quedan las tres capas en orden. */}
      <div className="relative z-10 flex flex-col">
        {/* Cabecera centrada en los dos tamaños: en móvil icono y título en
            fila, desde sm apilados. Sólo cambia la disposición, no la
            alineación.

            El párrafo de abajo se queda a la izquierda a propósito: en un texto
            de varios renglones el centrado deja los finales de línea
            irregulares y cuesta más seguir dónde empieza el siguiente. La
            cabecera son una o dos palabras y no tiene ese problema. */}
        <div className="flex items-center justify-center gap-2 sm:block">
          {/* Círculo del icono: borde verde tenue y halo luminoso, el mismo
              recurso de "luz encendida" que usan los CTA y el logo.
              shrink-0 para que el título no lo aplaste al ponerse a su lado. */}
          {/* 36 px en móvil, cuatro menos que antes: cada píxel que cede el
              icono es ancho que gana el título, que es lo que permite
              agrandarlo sin que se parta. */}
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-vo-forest/40 shadow-[0_0_26px_-8px_var(--vo-glow-strong)] sm:mx-auto sm:mb-6 sm:size-[86px]">
            <Icon
              strokeWidth={1.2}
              className="size-[17px] text-accent sm:size-[38px]"
              aria-hidden
            />
          </span>

          {/* whitespace-nowrap prohíbe el salto de línea, y el tamaño en vw es
              lo que hace que esa prohibición no rompa nada: el texto encoge con
              la pantalla en vez de desbordar.

              El 3.45vw sale de la restricción más dura, un móvil de 320 px. Ahí
              quedan 172 px libres junto al icono y el título más largo
              —"Regalos y bonos especiales", 26 caracteres— necesita unos 166.
              Con un tamaño fijo, el que cabe a 430 px se parte a 320.

              Para subir de 3.05 a 3.45 hubo que financiarlo: el icono cedió
              4 px, el hueco entre ambos 2 y el espaciado entre letras bajó de
              0.05 a 0.03em. Sin eso, el título no cabía en una línea.

              AQUÍ SE ACABA EL MARGEN. Agrandarlo más obliga a romper la regla
              de la línea única o a acortar el texto en content.ts.

              Desde sm se pasa a tamaño fijo, porque ahí el título ya ocupa su
              propia línea y puede partirse sin problema. */}
          <h3 className="font-display text-[clamp(0.66rem,3.45vw,1.15rem)] uppercase leading-snug tracking-[0.03em] whitespace-nowrap text-foreground sm:text-center sm:text-[1.35rem] sm:tracking-[0.1em] sm:whitespace-normal">
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
        <p className="mx-auto mt-5 max-w-[16.5rem] font-sans text-sm leading-relaxed text-foreground/85 sm:mx-0 sm:mt-4 sm:max-w-none sm:text-[0.95rem]">
          {text}
        </p>
      </div>
    </div>
  );
}
