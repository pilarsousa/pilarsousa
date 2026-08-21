import { Check } from "lucide-react";
import { VoContainer } from "@/components/lista-de-espera/ui/VoContainer";
import { ScrollIn } from "@/components/lista-de-espera/ui/ScrollIn";
import { SectionTitle } from "@/components/lista-de-espera/ui/SectionTitle";
import { RaicesFondo } from "@/components/lista-de-espera/ui/RaicesFondo";
import { PARA_VOS } from "@/components/lista-de-espera/content";
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

  EL FONDO LO CRUZA UN SISTEMA DE RAÍCES, y llegó tras cuatro intentos.

  Primero fueron flechas entre card y card. Se cambiaron porque una flecha dice
  "y entonces" —implica secuencia— y estos seis puntos son condiciones
  independientes: con reconocerse en una basta. Después, un camino punteado por
  hueco. Después, una raíz por hueco.

  Los tres compartían el mismo problema de fondo: eran un ENLACE, una pieza que
  iba de A a B, y por muy orgánico que se dibujara se leía como un conector
  colocado. Una raíz de verdad no une dos cosas — nace en un sitio, se extiende,
  y por el camino pasa cerca de unas cuantas.

  Por eso ahora es una sola pieza a nivel de sección: los troncos entran por los
  cantos de la pantalla y bajan cruzando el hueco que deja el zigzag. Ver
  RaicesFondo.

  Es también lo único de la página que no va punteado, y no es incoherencia: el
  punteado es el hilo que cose unas secciones con otras; esto es el suelo de
  ésta.

  Los tres intentos anteriores están en el historial de git, no en ui/: dejar
  componentes muertos "por si acaso" sólo consigue que alguien los encuentre y
  no sepa si están en uso. El PNG de la flecha sí sigue en public, que es un
  asset y no código.

  Sin CTA a propósito. Aquí el visitante todavía está decidiendo si esto le
  habla; pedirle el dato en mitad de esa lectura interrumpe justo lo que la
  sección intenta provocar. El siguiente botón llega dos secciones más abajo,
  cuando ya sabe qué va a entrenar.

  Sin textura propia: se queda con el fondo oscuro continuo de la página, que es
  el que alterna con las texturas claras de las secciones vecinas.
*/

export function ParaVos() {
  return (
    <section
      aria-labelledby="para-vos-title"
      /* Sin relleno superior: ese hueco lo pone el filete de cierre de la
         sección anterior, que es quien separa las dos. Sumar el nuestro dejaba
         el filete mucho más cerca de lo de arriba que de lo de abajo. */
      className="relative isolate pt-0 pb-[clamp(4rem,2.5rem+7vh,8rem)] text-foreground"
    >
      {/* Las raíces van A NIVEL DE SECCIÓN y no dentro del contenedor: el
          contenedor tiene ancho máximo y márgenes, así que un trazo que naciera
          en su borde nacería a mitad de pantalla. Aquí abarcan el ancho
          completo, y el x=0 del dibujo es el canto real de la ventana.

          -z-10 las deja sobre el fondo y bajo las cards. Que una raíz se meta
          por debajo de una card y salga por el otro lado es justamente lo que
          la hace parecer que estaba ahí antes que ella.

          inset-y-8 en vez de inset-y-0: recorta el nacimiento y el final para
          que no lleguen a tocar las secciones vecinas.

          SÓLO EN MÓVIL. Cada tronco muere en el borde de una card concreta, y
          esos destinos están calculados sobre el zigzag; en escritorio las cards
          van en rejilla de dos columnas y no significarían nada. Allí queda la
          espina vertical de más abajo. */}
      <RaicesFondo className="absolute inset-x-0 inset-y-8 -z-10 lg:hidden" />

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
              <li key={item} className="relative pb-12 last:pb-0 lg:pb-0">
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
                    {/* El borde va al 40% y con resplandor, no al 20% liso: la
                        textura del fondo tiene grano y contraste propios, y un
                        contorno tan tenue se perdía dentro de ella — la card se
                        leía como una mancha oscura sin canto.

                        El resplandor es el mismo recurso de los paneles de la
                        sección anterior: una línea de luz de 1 px sobre el canto
                        superior, donde da la luz, y un halo verde muy difuso por
                        fuera. Sobre fondo oscuro una sombra negra no se ve; en
                        verde, la card se recorta contra la textura. */}
                    <div className="flex items-start gap-3 rounded-xl border border-accent/40 bg-vo-forest/45 p-5 shadow-[inset_0_1px_0_0_rgba(180,226,54,0.25),0_18px_46px_-30px_var(--vo-glow-strong)] backdrop-blur-sm">
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

              </li>
            );
          })}
          </ul>
        </div>
      </VoContainer>
    </section>
  );
}
