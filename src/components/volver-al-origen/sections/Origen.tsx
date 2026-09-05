import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { ORIGEN } from "@/components/volver-al-origen/content";

/*
  Sección — La historia de Volver al Origen.

  Va DESPUÉS de los testimonios y ANTES de quién es Pilar, y ese orden importa:
  primero el visitante ve que a otros les funcionó (prueba), luego lee de dónde
  sale el método (razón) y por último quién lo firma (persona). Puesta antes de
  los testimonios sería pedirle 450 palabras de lectura a alguien que todavía no
  tiene motivo para concederlas.

  ── EL PROBLEMA REAL DE ESTA SECCIÓN ES EL LARGO ──

  Son unas 450 palabras en once párrafos. En una landing de captación, donde se
  escanea más de lo que se lee, un muro así se salta entero — y con él se va el
  único sitio donde se explica POR QUÉ existe esto.

  La maqueta está montada contra ese riesgo, y por eso no es una columna de
  párrafos seguidos:

    · MEDIDA DE LECTURA CORTA (~62 caracteres). Un renglón largo obliga al ojo
      a buscar dónde empieza el siguiente y es lo primero que cansa.
    · DOS FRASES SACADAS DEL CUERPO, más grandes y en verde: la que hace
      bisagra ("saber más no significa tener mejores resultados") y la de
      cierre. Quien sólo escanea se lleva el argumento completo con leer esas
      dos.
    · LAS CIFRAS EN UNA FILA APARTE. Son lo único verificable del bloque —10
      años, 13 códigos, 2 ediciones, 350 alumnos— y dentro de un párrafo no las
      ve nadie.
    · AIRE ENTRE BLOQUES, no entre párrafos. Los grupos temáticos se separan
      más que las frases de dentro, así que la sección se lee como cuatro
      paradas y no como un rollo continuo.

  ── FONDO PLANO, SIN TINTE ──

  Testimonios y QueEs usan un tinte verde que entra y sale por los bordes. Esta
  se queda en el negro del fondo general a propósito: va justo entre Testimonios
  (con tinte) y Pilar (con el retrato a sangre), y meter un tercer tratamiento
  en medio rompe la alternancia oscuro-tinte-oscuro que da ritmo a la página.

  Lo que la separa de sus vecinas es el aire, que es suficiente cuando el bloque
  de al lado ya trae su propio color.
*/
export function Origen() {
  return (
    <section
      aria-labelledby="origen-title"
      className="relative isolate bg-background py-[clamp(4.5rem,3rem+7vh,8rem)] text-foreground"
    >
      <VoContainer>
        <ScrollIn>
          {/* Sin `after="?"`: el título es "¿Qué es Volver al Origen?" y el
              signo de cierre va dentro del acento, porque el nombre de marca no
              debería partirse del signo que lo acompaña. */}
          <SectionTitle id="origen-title" accent={ORIGEN.titleAccent} after="?">
            {ORIGEN.title}
          </SectionTitle>
        </ScrollIn>

        {/* ── LA COLUMNA DE LECTURA ──

            65ch y centrada, no el ancho del contenedor (1140 px). A esa medida
            un renglón mide unos 62 caracteres, que es la horquilla en la que el
            ojo salta de línea sin buscar. A 1140 px serían más de 120 y el
            texto se volvería incómodo justo en la sección más larga.

            `text-pretty` evita que un párrafo termine con una palabra suelta en
            la última línea. */}
        <div className="mx-auto mt-12 max-w-[65ch] text-pretty sm:mt-14">
          <ScrollIn>
            <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-[color-mix(in_srgb,var(--color-vo-bone)_82%,transparent)] sm:text-lg">
              {ORIGEN.problema.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </ScrollIn>

          {/* ══ LA BISAGRA ══

              La frase que da la vuelta al argumento, sacada del cuerpo y
              tratada como una cita: filete verde a la izquierda, cuerpo mayor y
              el color de acento.

              El filete va a la izquierda y no un entrecomillado porque no es
              una cita de nadie: es la misma voz del texto subiendo el tono. Un
              <blockquote> diría que se está citando una fuente externa. */}
          <ScrollIn>
            <p className="my-10 border-l-2 border-vo-lumen/70 pl-5 text-[1.25rem] leading-[1.6] font-medium text-vo-lumen sm:my-12 sm:pl-6 sm:text-[1.4rem]">
              {ORIGEN.giro}
            </p>
          </ScrollIn>

          <ScrollIn>
            <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-[color-mix(in_srgb,var(--color-vo-bone)_82%,transparent)] sm:text-lg">
              {ORIGEN.origen.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </ScrollIn>

          {/* ══ EL SISTEMA ══

              Va sobre una superficie propia —verde bosque con un filo claro
              arriba— porque es el tramo donde se nombra lo que se vende: los 13
              Códigos y qué NO es esto ("aquí no buscamos darte más
              información"). Levantarlo del fondo hace que se lea como el núcleo
              del bloque y no como dos párrafos más.

              El filo superior de 1 px es el mismo recurso que las cards de
              Beneficios: una línea clara arriba basta para que una superficie
              plana deje de parecer un rectángulo pintado. */}
          <ScrollIn>
            <div className="relative my-10 overflow-hidden rounded-2xl bg-vo-forest/60 p-6 shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--color-vo-bone)_14%,transparent)] sm:my-12 sm:p-8">
              <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-[color-mix(in_srgb,var(--color-vo-bone)_88%,transparent)] sm:text-lg">
                {ORIGEN.sistema.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </ScrollIn>

          {/* ══ LAS CIFRAS ══

              Lo único verificable del bloque, y por eso salen del párrafo: "más
              de 350 alumnos" dentro de un renglón no lo ve nadie, y en una fila
              de cuatro se lee de un vistazo.

              ⚠️ LAS CIFRAS SALEN DEL TEXTO DEL CLIENTE, sin redondear ni
              inventar. El "+" de "+350" es su "más de 350". Si cambia el copy
              hay que cambiarlas aquí también o quedarían contradiciendo al
              párrafo de al lado.

              Dos columnas en móvil y cuatro desde `sm`: a cuatro en una
              pantalla estrecha, "Códigos Originales" parte en tres renglones y
              la fila se descuadra.

              La lista va aria-hidden: las cuatro cifras están dichas en los
              párrafos que las rodean, y un lector de pantalla las leería dos
              veces —la segunda sin contexto, como cifras sueltas. */}
          <ScrollIn>
            <ul
              aria-hidden
              className="my-10 grid grid-cols-2 gap-x-4 gap-y-7 border-y border-[color-mix(in_srgb,var(--color-vo-bone)_12%,transparent)] py-8 sm:my-12 sm:grid-cols-4"
            >
              {ORIGEN.datos.map((d) => (
                /* `items-start` con la columna en flex: las cuatro cifras
                   arrancan a la misma altura aunque una etiqueta ocupe dos
                   renglones —"Códigos Originales" lo hace— en vez de centrarse
                   cada una en su propia caja y quedar desalineadas entre sí. */
                <li
                  key={d.etiqueta}
                  className="flex flex-col items-center text-center"
                >
                  {/* tabular-nums para que las cuatro cifras compartan el ancho
                      de dígito y queden ópticamente alineadas aunque unas
                      tengan dos caracteres y otras cuatro. */}
                  <p className="font-display text-[1.75rem] leading-none font-semibold tabular-nums text-vo-lumen sm:text-[2rem]">
                    {d.cifra}
                  </p>
                  <p className="mt-2 text-[0.8rem] leading-snug tracking-[0.08em] text-[color-mix(in_srgb,var(--color-vo-bone)_60%,transparent)] uppercase">
                    {d.etiqueta}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollIn>

          <ScrollIn>
            <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-[color-mix(in_srgb,var(--color-vo-bone)_82%,transparent)] sm:text-lg">
              {ORIGEN.prueba.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </ScrollIn>

          {/* ══ EL CIERRE ══

              La frase con la que termina el cliente. Va centrada, en el tipo de
              titulares y sin filete: cerrando, no interrumpiendo como la
              bisagra.

              ⚠️ EL EMOJI 💚 DEL ORIGINAL NO ESTÁ. No es un descuido: en esta
              tipografía y a este cuerpo el corazón se pinta con la fuente de
              emoji del sistema —otro estilo, otro peso— justo en el remate de
              la sección. El verde ya lo pone el color del texto, que es lo que
              el emoji venía a decir. Está en content.ts si se quiere devolver:
              iría al final de `cierre`. */}
          <ScrollIn>
            <p className="font-display mt-2 text-center text-[1.15rem] leading-[1.6] text-balance text-vo-lumen sm:text-[1.35rem]">
              {ORIGEN.cierre}
            </p>
          </ScrollIn>
        </div>
      </VoContainer>
    </section>
  );
}
