import { Check } from "lucide-react";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { CaminoZigzag } from "@/components/volver-al-origen/ui/CaminoZigzag";
import { PARA_VOS } from "@/components/volver-al-origen/content";
import { cn } from "@/lib/cn";

/*
  Sección 3 — Volver al Origen es para vos si…

  Es la sección de identificación: seis frases en las que el lector tiene que
  reconocerse. Va justo después del argumento, cuando ya ha aceptado el
  diagnóstico y necesita comprobar que va con él.

  DOS MAQUETACIONES DISTINTAS, no una responsive:

  · MÓVIL — zigzag. Las cards ocupan el 58% del ancho y se alternan a izquierda
    y derecha, unidas por la flecha. Seis cajas idénticas a ancho completo se
    recorren sin que la vista se fije en ninguna; alternando el lado el ojo tiene
    que trabajar un poco, y eso es lo que hace que se lean.

    Ese 58% es estrecho a sabiendas de lo que cuesta: en un móvil pequeño deja
    unos 24 caracteres por línea, así que las frases más largas ocupan cinco o
    seis renglones y la sección crece a lo alto. Se acepta porque el
    desplazamiento entre una card y la siguiente es lo que hace legible el
    zigzag: con cards anchas apenas se despegan y la diagonal no se ve.

  · ESCRITORIO — rejilla de dos columnas, sin flechas. Allí ya hay dos columnas
    que dan ese ritmo por sí solas, y el zigzag sobre una rejilla no se
    entendería.

  EL ANCHO DEL 58% VA EN UN DIV INTERIOR, NO EN EL <li>, y no es indiferente.

  La flecha se coloca en absolute con porcentajes, y esos porcentajes se miden
  contra el ancestro posicionado — que es el <li>. Con el ancho puesto ahí, un
  "left-[54%]" significaba el 54% de la CARD, o sea un punto dentro de ella: la
  flecha nacía por debajo y centrada en lugar de salir por el costado. Con el
  <li> a ancho completo, los porcentajes vuelven a referirse al ancho de la
  sección, que es contra lo que hay que medir para llegar al borde de la card.

  AQUÍ HUBO FLECHAS y se cambiaron por el camino punteado. El motivo no es
  estético sino de significado: una flecha dice "y entonces", implica secuencia,
  y estos seis puntos son condiciones independientes — con reconocerse en una
  basta. El camino une sin ordenar, que es la relación real entre ellos. De paso
  hermana esta sección con la de la reflexión, que ya llevaba uno igual.

  El PNG de la flecha sigue en public por si se quisiera recuperar.

  Sin CTA a propósito. Aquí el visitante todavía está decidiendo si esto le
  habla; pedirle el dato en mitad de esa lectura interrumpe justo lo que la
  sección intenta provocar. El siguiente botón llega dos secciones más abajo,
  cuando ya sabe qué va a entrenar.

  Sin textura propia: se queda con el fondo oscuro continuo de la página, que es
  el que alterna con las texturas claras de las secciones vecinas.
*/

export function ParaVos() {
  const ultimo = PARA_VOS.items.length - 1;

  return (
    <section
      aria-labelledby="para-vos-title"
      /* Sin relleno superior: ese hueco lo pone el filete de cierre de la
         sección anterior, que es quien separa las dos. Sumar el nuestro dejaba
         el filete mucho más cerca de lo de arriba que de lo de abajo. */
      className="relative isolate pt-0 pb-[clamp(4rem,2.5rem+7vh,8rem)] text-foreground"
    >
      <VoContainer>
        <ScrollIn>
          <SectionTitle id="para-vos-title" accent={PARA_VOS.titleAccent}>
            {PARA_VOS.title}
          </SectionTitle>
        </ScrollIn>

        {/* En escritorio el camino no serpentea: sería imposible de seguir
            entre dos columnas de tres cards. Se queda en una espina vertical
            punteada por el hueco central de la rejilla — la misma idea, mucho
            más callada. Es lo que pidió el cliente: "algo parecido, pero no tan
            wow".

            La opacidad es la mitad que la de los tramos de móvil: allí el camino
            hace de enlace entre dos cards concretas y hay que verlo; aquí sólo
            recuerda que las seis pertenecen al mismo bloque. */}
        <div className="relative">
          <svg
            viewBox="0 0 2 100"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
            className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-0.5 -translate-x-1/2 text-accent lg:block"
          >
            <path
              d="M1 0 V100"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeDasharray="4 9"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity="0.25"
            />
          </svg>

          <ul className="mt-12 flex flex-col lg:grid lg:grid-cols-2 lg:gap-5">
          {PARA_VOS.items.map((item, i) => {
            /* Los pares a la izquierda, los impares a la derecha. En escritorio
               se anula: allí manda la rejilla. */
            const aLaIzquierda = i % 2 === 0;

            return (
              /* A ancho completo y relative: es el sistema de referencia de la
                 flecha. El pb abre el hueco por el que baja. */
              <li key={item} className="relative pb-14 last:pb-0 lg:pb-0">
                <div
                  className={cn(
                    "w-[58%] lg:w-full",
                    aLaIzquierda ? "mr-auto" : "ml-auto",
                  )}
                >
                  {/* El retardo escalona la entrada. 0,06 s por frase es corto a
                      propósito: son seis y con un paso mayor la última llegaría
                      tarde.

                      Cada card entra desde el lado en el que está: en móvil
                      acompaña al zigzag y en escritorio, a la columna de la
                      rejilla en la que cae. */}
                  <ScrollIn
                    delay={i * 0.06}
                    from={aLaIzquierda ? "left" : "right"}
                  >
                    <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-vo-forest/40 p-5 backdrop-blur-sm">
                      {/* shrink-0 para que el disco no se aplaste cuando el
                          texto ocupa varias líneas, y mt-0.5 para alinearlo con
                          la primera línea en vez de con el bloque entero. */}
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                        <Check
                          size={14}
                          strokeWidth={2.4}
                          className="text-accent"
                          aria-hidden
                        />
                      </span>
                      <p className="font-sans text-sm leading-relaxed text-foreground/90 sm:text-[0.95rem]">
                        {item}
                      </p>
                    </div>
                  </ScrollIn>
                </div>

                {/* El tramo vive dentro del <li> de la card de la que sale, no
                    suelta entre elementos: así la lista sigue siendo seis
                    elementos y un lector de pantalla no se encuentra huecos
                    vacíos entre ellos. Nada después de la última, que no enlaza
                    con nada.

                    SALE DEL COSTADO Y CRUZA EL HUECO EN DIAGONAL. Los tres
                    números que lo consiguen, y de dónde salen:

                    · w-[30%] con proporción cuadrada. Deja el trazo en unos
                      100 px de alto: se lee como un enlace entre dos cards sin
                      robarles protagonismo.
                    · left-[56%] se mide contra el ancho completo de la sección
                      —por eso el 58% de la card va en un div interior, ver
                      arriba—. La card llega al 58% y el trazo arranca sobre el
                      2% de la caja, así que el nacimiento cae justo en su
                      borde derecho y parece brotar de ella.
                    · -bottom-1 lo sitúa de modo que el arranque del trazo quede
                      a la ALTURA de la card, solapándola un poco, y la punta
                      aterrice justo encima de la siguiente. Es la diferencia
                      entre salir del costado y colgar del pie.

                    La caja se sale por debajo del <li> y pisa el siguiente, pero
                    lo que invade es margen transparente. pointer-events-none por
                    si algún día hay algo pulsable ahí debajo.

                    Estas clases de posición se le pasan al componente en vez de
                    envolverlo en un div: dentro necesita colgar de ellas la
                    referencia del observador que dispara el trazado, y esa
                    referencia no puede ir en el elemento recortado. El porqué,
                    en CaminoZigzag. */}
                {i < ultimo && (
                  <CaminoZigzag
                    espejo={!aLaIzquierda}
                    className={cn(
                      "pointer-events-none absolute -bottom-1 aspect-square w-[30%] lg:hidden",
                      aLaIzquierda ? "left-[56%]" : "right-[56%]",
                    )}
                  />
                )}
              </li>
            );
          })}
          </ul>
        </div>
      </VoContainer>
    </section>
  );
}
