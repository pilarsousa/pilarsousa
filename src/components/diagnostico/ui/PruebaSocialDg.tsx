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

  ── LA FILA SE ABRE AL PASAR EL RATÓN ──

  En reposo los círculos se solapan y cada uno tapa media cara del anterior.
  Con el ratón encima se separan y las cuatro quedan enteras. Es la fila
  contando lo mismo de dos maneras: cerrada dice "son varios", abierta dice
  "son éstos".

  Se abre entera y no de a uno: separar sólo el que está bajo el cursor movería
  a los demás de sitio, y eso se lee como que la fila se rompe.

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
    /* `group` es lo que deja que el ratón sobre CUALQUIER punto de la fila abra
       todos los círculos a la vez. Puestos a reaccionar uno por uno, separar
       sólo el que está debajo del cursor movería a los demás de sitio y la fila
       se leería como algo que se rompe, no como algo que se abre. */
    <div
      className={cn("group flex items-center justify-center gap-3", className)}
    >
      <ul aria-hidden className="flex items-center">
        {avatares.map((foto, i) => (
          /* ── LOS CÍRCULOS SE SOLAPAN, Y AL PASAR EL RATÓN SE SEPARAN ──

             En reposo cada uno se monta sobre el anterior y tapa media cara.
             Al abrirse, el margen negativo pasa a positivo y las cuatro caras
             quedan enteras a la vista: eso es el "mostrar más contenido".

             ⚠️ EL MARGEN VA EN CADA <li> Y NO CON `-space-x-*`. La utilidad de
             Tailwind aplica el margen desde un `:where(... > :not(:last-child))`
             cuya especificidad es cero, y encima cuelga del CONTENEDOR: no hay
             forma de pasarle un `group-hover` al hijo. Declarándolo aquí, el
             mismo elemento tiene el valor en reposo, el de apertura y la
             transición.

             `first:ml-0` deja el primero en su sitio para que la fila crezca
             hacia la derecha y no se desplace entera. */
          <li
            key={foto ?? i}
            className="-ml-3 size-9 overflow-hidden rounded-full border border-[var(--dg-borde-vivo)] ring-2 ring-[var(--dg-hero-fondo)] transition-[margin,transform] duration-500 ease-out first:ml-0 group-hover:ml-1 group-hover:scale-105 sm:-ml-4 sm:size-11 sm:group-hover:ml-1.5"
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
