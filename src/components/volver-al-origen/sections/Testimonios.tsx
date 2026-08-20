import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTexture } from "@/components/volver-al-origen/ui/SectionTexture";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { TrustScore } from "@/components/volver-al-origen/ui/TrustScore";
import { TestimonialCarousel } from "@/components/volver-al-origen/ui/TestimonialCarousel";
import { WaitlistCta } from "@/components/volver-al-origen/ui/WaitlistCta";
import {
  FEATURED_TESTIMONIALS,
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


export function Testimonios() {
  return (
    <section
      aria-labelledby="testimonios-title"
      /* El mínimo del clamp baja a 5rem: los 7rem anteriores eran un colchón
         desproporcionado en pantallas de móvil, donde el alto es el recurso
         escaso. En escritorio el máximo sigue igual. */
      className="relative isolate py-[clamp(5rem,3rem+8vh,10rem)] text-foreground"
    >
      {/* Textura clara: es la que alterna con las dos oscuras que la rodean.

          Sustituye al degradado de tinte liso que había aquí. El desvanecido de
          los bordes lo aporta ahora la máscara del propio componente, con las
          mismas paradas (35% y 65%) que usaba aquel, así que la transición
          entre secciones se lee igual que antes. */}
      <SectionTexture variant="claro" />


      <VoContainer>
        <ScrollIn>
          <SectionTitle
            id="testimonios-title"
            accent={TESTIMONIOS.titleAccent}
            /* Sin accentClassName: al volver el fondo a oscuro, el verde
               luminoso por defecto vuelve a ser el acento correcto (10,6:1). */
          >
            {TESTIMONIOS.title}
          </SectionTitle>
        </ScrollIn>

        {/* Entradilla del copy nuevo. Las dos líneas van separadas y no en un
            párrafo: la primera desarma la objeción ("no nos creas") y la segunda
            invita, y leídas de corrido se anulan entre sí. */}
        <ScrollIn delay={0.05}>
          <div className="mx-auto mt-4 max-w-2xl space-y-1 text-center font-sans text-base leading-relaxed text-foreground/75 sm:text-lg">
            {TESTIMONIOS.intro.map((linea) => (
              <p key={linea}>{linea}</p>
            ))}
          </div>
        </ScrollIn>
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
          <ScrollIn delay={0.1}>
            <TrustScore className="max-w-sm lg:max-w-none" />
          </ScrollIn>

          {/* min-w-0: un hijo de grid tiene min-width auto por defecto y se
              negaría a encogerse por debajo de su contenido, desbordando la
              fila. */}
          <div className="min-w-0">
            <ScrollIn delay={0.15}>
              <p className="text-center font-display text-xl uppercase tracking-[0.06em] sm:text-2xl lg:text-left">
                {TESTIMONIOS.subtitle}
              </p>
            </ScrollIn>

            <TestimonialCarousel items={FEATURED_TESTIMONIALS} />
          </div>
        </div>
      </div>

      <VoContainer>
        <ScrollIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <WaitlistCta className="max-w-xs">{TESTIMONIOS.cta}</WaitlistCta>
          </div>
        </ScrollIn>
      </VoContainer>
    </section>
  );
}
