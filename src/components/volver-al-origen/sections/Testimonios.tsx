import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { Reveal } from "@/components/bootcamp/ui/Reveal";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { TrustScore } from "@/components/volver-al-origen/ui/TrustScore";
import { TestimonialCarousel } from "@/components/volver-al-origen/ui/TestimonialCarousel";
import { VoCta } from "@/components/volver-al-origen/ui/VoCta";
import {
  FEATURED_TESTIMONIALS,
  FORM_ANCHOR,
  TESTIMONIOS,
} from "@/components/volver-al-origen/content";

/*
  Sección 3 — Prueba social.

  El fondo es casi el mismo negro profundo que el resto de la página, apenas
  levantado por un verde algo más vivo (--color-vo-sage). No busca separar el
  bloque por contraste, sino insinuarlo: se nota que hay una zona distinta sin
  que aparezca un rectángulo con bordes.

  El degradado va de DENTRO hacia FUERA: el tinte es pleno en el tercio central
  de la sección y se desvanece hacia arriba y hacia abajo hasta desaparecer por
  completo en los bordes, de modo que el paso al color de las secciones vecinas
  es una difuminación larga y no una juntura.

  Es lo contrario del primer planteo, donde el color de las secciones vecinas
  entraba en franjas por los bordes: aquel dibujaba dos bandas con principio y
  fin.

  Al ser un fondo oscuro, los textos van en claro y el acento recupera el verde
  luminoso, que sobre este tinte da 10,6:1 de contraste.

  Layout en desktop: la nota global de Trustpilot a la izquierda y la cinta de
  reseñas en movimiento a la derecha, separadas 224 px y con la fila en su
  propio ancho (ver más abajo). minmax(0,1fr) en la columna derecha, y no 1fr a
  secas: sin el mínimo en 0 una pista más ancha que la pantalla estiraría la
  celda y aparecería scroll horizontal en la página.
*/

/* Tinte de la sección. Literal y no var(--color-vo-sage) porque va dentro de un
   radial-gradient() en un style inline. */
const TINT = "#1f310c";

export function Testimonios() {
  return (
    <section
      aria-labelledby="testimonios-title"
      /* El mínimo del clamp baja a 5rem: los 7rem anteriores eran un colchón
         desproporcionado en pantallas de móvil, donde el alto es el recurso
         escaso. En escritorio el máximo sigue igual. */
      className="relative isolate bg-background py-[clamp(5rem,3rem+8vh,10rem)] text-foreground"
    >
      {/* Difuminado del tinte, de dentro hacia fuera.

          LINEAL VERTICAL Y NO RADIAL, y el motivo es matemático, no estético.
          En un radial los radios se miden sobre el tamaño de la caja, pero la
          distancia del centro al borde es sólo la MITAD del alto. Con un radio
          vertical del 72% —como estaba— el borde de la sección cae en el 69% del
          recorrido del degradado, donde todavía queda un 44% de opacidad: el
          color nunca llegaba a transparente dentro de la sección y en la juntura
          aparecía un escalón. Ese era el corte que se veía.

          En un lineal vertical el 0% y el 100% caen exactamente en los bordes
          superior e inferior, así que el desvanecido completo está garantizado
          sin depender del alto que acabe teniendo la sección.

          Las paradas están en 35% y 65%: el tinte sólo es pleno en el tercio
          central y dedica un 35% del alto a entrar y otro 35% a salir. Esa
          transición larga es lo que hace que el paso entre el color de esta
          sección y el de las vecinas se lea como una difuminación y no como un
          cambio de bloque.

          -z-10 lo mantiene por debajo del contenido: es un elemento posicionado
          y sin esto pintaría por encima del texto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 0%, ${TINT} 35%, ${TINT} 65%, transparent 100%)`,
        }}
      />


      <VoContainer>
        <Reveal>
          <SectionTitle
            id="testimonios-title"
            accent={TESTIMONIOS.titleAccent}
            /* Sin accentClassName: al volver el fondo a oscuro, el verde
               luminoso por defecto vuelve a ser el acento correcto (10,6:1). */
          >
            {TESTIMONIOS.title}
          </SectionTitle>
        </Reveal>
      </VoContainer>

      {/*
        Esta fila SALE del ancho del Container (max-w-6xl) y usa uno propio, más
        amplio. Es lo que permite que los dos bloques se alejen mutuamente del
        centro —la card hacia la izquierda, la cinta hacia la derecha— dejando
        hueco limpio en medio.

        Subiendo sólo el gap dentro del contenedor normal no se consigue el
        mismo efecto: al no haber más ancho disponible, la cinta se comprimiría
        en lugar de desplazarse hacia afuera.

        El título y el CTA se quedan en el Container normal para seguir
        alineados con el resto de secciones de la página.
      */}
      <div className="mx-auto mt-12 w-full max-w-[86rem] px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-56">
          <Reveal delay={0.1}>
            <TrustScore className="max-w-sm lg:max-w-none" />
          </Reveal>

          {/* min-w-0: un hijo de grid tiene min-width auto por defecto y se
              negaría a encogerse por debajo de su contenido, desbordando la
              fila. */}
          <div className="min-w-0">
            <Reveal delay={0.15}>
              <p className="text-center font-display text-xl uppercase tracking-[0.06em] sm:text-2xl lg:text-left">
                {TESTIMONIOS.subtitle}
              </p>
            </Reveal>

            <TestimonialCarousel items={FEATURED_TESTIMONIALS} />
          </div>
        </div>
      </div>

      <VoContainer>
        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <VoCta href={FORM_ANCHOR} className="max-w-xs">
              {TESTIMONIOS.cta}
            </VoCta>
          </div>
        </Reveal>
      </VoContainer>
    </section>
  );
}
