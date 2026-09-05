import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/cn";
import { LANDING } from "@/components/diagnostico/contenido";

/*
  LA FILA DE AVATARES DEL HERO — la prueba social pegada a la promesa.

  Cuatro retratos redondos que se solapan y, al lado, la invitación a sumarse.
  Va justo debajo del subtítulo: el titular dice qué vas a conseguir, el
  subtítulo cómo, y esto que no serías el primero.

  ── LAS CARAS SON REALES Y LA FRASE NO CUENTA A NADIE ──

  Los retratos son las fotos de perfil de reseñas reales de Volver al Origen,
  las mismas que usan los carruseles de las otras landings. Y la frase invita
  en vez de contar: el documento prohíbe inventar autoridad —"avalado por X mil
  personas"— si el dato no se puede respaldar, y no existe ningún recuento de
  quién ha hecho el diagnóstico. Invitando se dice lo mismo sin sostener una
  cifra que nadie ha medido.

  El detalle de qué caras son y qué matiz tiene "como ellos", en contenido.ts.

  Un hueco a `null` pinta una silueta: sirve para ver el montaje antes de
  tener todas las fotos, y para que un archivo que falte no deje un agujero.

  ── SE DESTACA EL QUE SE TOCA, Y LOS DEMÁS SE APAGAN ──

  En reposo los círculos se solapan y cada uno tapa media cara del anterior. Al
  apuntar a uno, ESE se adelanta —crece, sale del apilado y se pone al frente—
  y los otros tres pierden el color y se oscurecen. La pila se queda quieta.

  ── ESTUVO AL REVÉS, Y ERA PEOR ──

  Antes la fila entera se abría al pasar el ratón por cualquier punto: los
  cuatro círculos se separaban a la vez. Movía cuatro elementos para responder a
  un gesto dirigido a uno, y el bloque de al lado —el texto— saltaba de sitio
  cada vez que el cursor rozaba la fila.

  Ahora el gesto es dirigido. Y no mueve a nadie de su sitio: lo que hace el
  destacado es `scale` y `z-index`, que no tocan la disposición. Los márgenes
  negativos se quedan como están, así que la fila mide siempre lo mismo y el
  texto de al lado no se entera.

  ── EL APAGADO ES DEL HERMANO, NO DEL CONTENEDOR ──

  `group-hover/fila:` apagaría también al que está debajo del cursor, porque
  apuntar a un hijo es apuntar al grupo. Por eso el gris se aplica con el grupo
  de la fila Y se cancela en el propio `:hover` del elemento: los tres que no
  reciben el cursor se apagan, el que lo recibe se queda a todo color.

  ── EL ANILLO ES DEL COLOR DEL HERO, NO UN BLANCO ──

  Cada círculo lleva un aro del fondo de la sección para recortarse del que
  tiene detrás. Un aro claro los convertiría en cuatro pegatinas; con el color
  del fondo parecen agujeros por los que se ve gente.

  ⚠️ ESO ATA EL COMPONENTE AL HERO. Montado sobre otro fondo, el aro se vería
  como un cerco oscuro alrededor de cada cara.

  ── LOS RETRATOS SON DECORACIÓN; LA FRASE ES EL DATO ──

  El <ul> va aria-hidden. Cuatro "foto de una persona" seguidas no le dicen
  nada a quien usa un lector de pantalla: lo que informa es el texto de al
  lado, y ése sí se lee.
*/
export function PruebaSocialDg({ className }: { className?: string }) {
  const { texto, avatares } = LANDING.pruebaSocial;

  /* Sin frase no hay nada que afirmar, y una fila de caras sola no dice nada:
     el bloque desaparece entero en vez de dejar media pieza colgando. */
  if (!texto || avatares.length === 0) return null;

  return (
    /* El grupo se NOMBRA (`group/fila`) en vez de usar el `group` anónimo. Con
       el anónimo, cualquier `group-hover:` de dentro se engancharía a éste, y
       aquí hay dos niveles que responden al ratón a la vez: la fila —que apaga
       a los que no reciben el cursor— y cada círculo por su cuenta. Nombrado,
       cada regla dice a cuál de los dos escucha. */
    <div
      className={cn(
        "group/fila flex items-center justify-center gap-3",
        className,
      )}
    >
      <ul aria-hidden className="flex items-center">
        {avatares.map((foto, i) => (
          /* ── LOS CÍRCULOS SE SOLAPAN Y NO SE MUEVEN DE SITIO ──

             Cada uno se monta sobre el anterior y tapa media cara. El margen
             negativo se queda fijo: lo que responde al ratón es la escala y el
             apilado, que no tocan la disposición.

             ── EL DESTACADO SON TRES COSAS A LA VEZ ──

             Crece (`scale-125`), se pone delante de sus vecinos (`z-10`) y
             recupera el color mientras los otros lo pierden. Las tres hacen
             falta: creciendo sin subir de capa, el círculo crece POR DEBAJO del
             siguiente y se ve cortado por la mitad.

             ── EL GRIS SE APLICA POR EL GRUPO Y SE CANCELA EN EL PROPIO HOVER ──

             `group-hover/fila:grayscale` alcanza a los cuatro, incluido el que
             tiene el cursor encima: apuntar a un hijo es apuntar al grupo. El
             `hover:grayscale-0` que va detrás lo devuelve a color sólo en ése.
             Esa pareja es lo que produce "uno vivo, tres apagados".

             `cursor-pointer` porque el elemento responde al ratón. No navega a
             ningún sitio, así que no lleva rol ni foco: es un adorno que
             reacciona, y anunciarlo como un control sería mentir sobre lo que
             hace.

             ⚠️ EL MARGEN VA EN CADA <li> Y NO CON `-space-x-*`. La utilidad de
             Tailwind aplica el margen desde un `:where(... > :not(:last-child))`
             cuya especificidad es cero y cuelga del CONTENEDOR, así que no hay
             forma de matizarlo desde el hijo.

             `first:ml-0` deja el primero pegado al margen para que la fila
             empiece donde tiene que empezar. */
          <li
            key={foto ?? i}
            /* ⚠️ LA TRANSICIÓN ES DE `scale`, NO DE `transform`.

               En Tailwind 4, `scale-125` ya NO emite un `transform: scale(…)`:
               emite la propiedad CSS `scale`, que es independiente. Con
               `transition-[transform,filter]` la variable se calculaba —
               --tw-scale-x llegaba a 125%— pero `transform` seguía valiendo
               `none` y el círculo no crecía ni un píxel. Fallaba en silencio,
               que es lo peor que puede hacer un estilo.

               Se comprueba mirando `getComputedStyle(el).scale`, no `.transform`. */
            className="dg-avatar relative -ml-3 size-9 cursor-pointer overflow-hidden rounded-full border border-[var(--dg-borde-vivo)] ring-2 ring-[var(--dg-hero-fondo)] brightness-100 grayscale-0 transition-[scale,filter] duration-500 ease-out first:ml-0 hover:z-10 hover:scale-125 hover:brightness-100 hover:grayscale-0 group-hover/fila:brightness-[0.65] group-hover/fila:grayscale sm:-ml-4 sm:size-11"
          >
            {foto ? (
              /* 73px ES EL TAMAÑO REAL DEL ARCHIVO, y por eso está escrito así
                 y no al doble del círculo. Declarar 88 no inventa píxeles: sólo
                 haría que el optimizador ampliara una imagen de 73 y la sirviera
                 blanda. A 44 px de caja, 73 da 1,66x — no llega al 2x de una
                 pantalla densa, pero es lo que hay en el archivo. */
              <Image
                src={foto}
                alt=""
                width={73}
                height={73}
                className="size-full object-cover"
              />
            ) : (
              /* LA SILUETA TAPA UN HUECO. Hoy no se usa —las cuatro fotos
                 existen—, pero deja el montaje en pie si mañana falta una en
                 vez de dejar un círculo vacío. */
              <span className="flex size-full items-center justify-center bg-[var(--dg-superficie)] text-[var(--dg-texto-tenue)]">
                <User className="size-4 sm:size-5" strokeWidth={1.5} />
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* A LA IZQUIERDA Y NO CENTRADA, aunque el hero vaya centrado: son dos
          renglones cortos pegados a la fila de caras, y centrarlos dejaría el
          bloque con cuatro cantos distintos. El conjunto sí va centrado. */}
      {/* EN LA TINTA PRINCIPAL, por lo mismo que el subtítulo del hero: sobre
          este verde, el crema rebajado se lee gris en vez de secundario. 17,4:1
          contra los 9,7:1 que medía antes. */}
      <p className="max-w-[12rem] text-left text-[0.8rem] leading-snug text-[var(--dg-texto)] sm:max-w-[14rem] sm:text-[0.85rem]">
        {texto}
      </p>
    </div>
  );
}
