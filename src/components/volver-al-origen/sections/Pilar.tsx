import Image from "next/image";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { PilarBio } from "@/components/volver-al-origen/ui/PilarBio";
import { WaitlistCta } from "@/components/volver-al-origen/ui/WaitlistCta";
import { PILAR } from "@/components/volver-al-origen/content";
import pilarMovil from "@/../public/volver-origen/public/img/landing/pilarsousa-mobile.jpg";
import pilarDesktop from "@/../public/volver-origen/public/img/landing/pilarsousa-pc.jpg";

/*
  Sección 4 — Quién es Pilar. Dos maquetaciones distintas, no una responsive.

  ESCRITORIO — el retrato ocupa el fondo a sangre y el texto se apoya sobre la
  derecha, con un velo lateral que lo separa de la foto. Mismo planteo que el
  hero y que la sección equivalente de Misión Origen.

  Un detalle del encuadre condiciona el diseño: pilarsousa-pc.jpg es 1920x900
  (2,13:1) y Pilar está CENTRADA, no a un lado. Como la sección es más apaisada
  que la foto, object-cover la recorta en vertical y no en horizontal, así que
  ella se queda en el centro haga lo que haga object-position. Por eso el velo
  no puede empezar en la mitad: arranca a insinuarse en el 28% y sólo se vuelve
  sólido pasado el 60%, de modo que la cara queda limpia y lo que se funde bajo
  el texto es el borde de su pelo.

  MÓVIL — el retrato vertical va a sangre en la parte alta con el título y la
  firma encima, y la historia debajo sobre fondo plano.

  LA HISTORIA VIENE PLEGADA. La columna muestra hasta "…entendí algo
  fundamental:" y el resto se despliega con un botón. Es una cuestión de alto:
  el retrato ocupa el fondo de la sección entera, así que el alto de esta
  columna es el alto de la foto, y con la historia completa a la vista el
  retrato se estiraba hasta deformarla. Ver PilarBio.

  Cada tamaño usa su propio encuadre y ninguno lleva `priority`, así que son
  lazy y el navegador no descarga el que está en display:none.

  Los degradados van en style y no en utilidades de Tailwind: las clases
  arbitrarias generan reglas en el archivo CSS, que el navegador cachea con
  fuerza, mientras que un degradado en línea viaja en el HTML y se ve al
  recargar sin vaciar la caché.
*/
export function Pilar() {
  return (
    <section
      /* aria-label en la sección: el título se renderiza dos veces —sobre la
         foto en móvil, en la columna de texto en escritorio— y cada copia se
         oculta con display:none en el tamaño que no le toca. Los lectores de
         pantalla ignoran lo oculto, así que sólo se anuncia una. */
      aria-label={`${PILAR.title} ${PILAR.titleAccent}?`}
      className="relative isolate overflow-x-clip lg:flex lg:min-h-[780px] lg:items-center lg:py-24"
    >
      {/* ══ MÓVIL: retrato a sangre con el texto encima ══ */}
      <div className="relative lg:hidden">
        {/* La foto se funde por arriba y por abajo con MÁSCARA, no con velos de
            color.

            Antes llevaba dos degradados que pintaban #0b1502 sólido en los
            extremos. Con fondo liso colaban; sobre la textura continua se leen
            como dos bloques planos que la tapan. La máscara vuelve transparente
            la propia foto y deja pasar lo que haya detrás, sea lo que sea.

            El título va al 10% del alto, dentro del tramo en que la foto aún
            está entrando, así que queda sobre la textura oscura y se lee sin
            necesitar el velo que antes lo oscurecía.

            El desvanecido de abajo arranca en el 72% y no en el 58%: antes
            empezaba tan arriba que el pelo y el torso ya se veían apagados. Al
            cerrarlo, la figura llega entera y sólo se disuelve el pie. */}
        <div
          className="relative aspect-3/4 w-full"
          style={{ maskImage: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 72%, transparent 94%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 72%, transparent 94%)" }}
        >
          <Image
            src={pilarMovil}
            alt="Pilar Sousa"
            fill
            quality={90}
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-top"
          />

          {/* Título sobre la cabeza: la coronilla está sobre el 22% del alto. */}
          <div className="absolute inset-x-0 top-[10%] px-6">
            <SectionTitle accent={PILAR.titleAccent} after="?">
              {PILAR.title}
            </SectionTitle>
          </div>

          {/* Aquí iba la firma "Pilar Sousa". Se retiró: el título que está
              arriba de la propia foto ya la nombra, y repetirlo a los pocos
              centímetros duplicaba el nombre sin añadir nada. El hueco que
              dejaba lo ocupa ahora el texto, que sube hasta esa altura.

              PILAR.signature sigue en content.ts por si se quiere recuperar. */}
        </div>
      </div>

      {/* ══ ESCRITORIO: retrato de fondo ══ */}
      {/* Dos máscaras compuestas, en lugar de los tres velos de color que
          había aquí (el lateral y las dos costuras de arriba y abajo).

          Aquellos pintaban #0b1502 sólido y, sobre la textura continua, se leen
          como bloques planos que la tapan: justo lo que se ve a la derecha del
          retrato. Enmascarando, la foto se vuelve transparente y deja pasar la
          textura, que es lo que debe haber detrás del texto.

          · la horizontal apaga la foto hacia la derecha, donde va la columna de
            texto. Termina en el 64% del ancho, no en el 70%, para dejar aire
            entre la figura y el texto;
          · la vertical la funde con las secciones de arriba y de abajo.

          mask-composite las cruza: sólo se ve la foto donde AMBAS la dejan
          pasar. Sin componer, la segunda sustituiría a la primera. Safari
          necesita su propio prefijo y llama "source-in" a lo que el estándar
          llama "intersect".

          El texto ya no necesita el velo para leerse: cae sobre la textura
          oscura, que da contraste de sobra. */}
      {/* ALTO PROPIO Y ANCLADO ARRIBA, no inset-0.

          Con inset-0 la capa medía lo que midiera la sección, así que al
          desplegar "Ver más" el retrato crecía con el texto: la foto se estiraba
          y el encuadre cambiaba a mitad de lectura.

          Fijándola en 780 px —el mismo valor que el min-h de la sección— cuando
          la bio está plegada cubre exactamente la sección, igual que antes, y
          cuando se despliega la sección crece hacia abajo sin que la foto se
          entere. El texto que sobresale cae por debajo, donde la máscara
          vertical ya la ha desvanecido del todo, así que no hay canto.

          Si se cambia el min-h de la sección, hay que cambiar este alto con él o
          la foto dejará de cubrirla en reposo. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 hidden h-[780px] lg:block"
        style={{
          maskImage: "linear-gradient(to right, #000 0%, #000 26%, transparent 64%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, #000 0%, #000 26%, transparent 64%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        {/* La foto ocupa el 72% izquierdo, no el ancho completo.

            Es lo que la desplaza a la izquierda, y hacía falta un rodeo:
            ocupando todo el ancho, la sección resulta más apaisada (2,4:1) que
            la imagen (2,13:1), así que object-cover la ajusta a lo ancho y
            recorta en vertical — con lo que object-position en horizontal no
            hace absolutamente nada y Pilar se queda clavada en el centro,
            justo detrás del texto.

            Al encerrarla en un contenedor más estrecho la proporción se
            invierte (1,74:1 frente a 2,13:1), el recorte pasa a ser horizontal
            y Pilar se sitúa sobre el 36% del ancho de pantalla en lugar del
            45%. De paso, object-position vuelve a tener efecto: el 45% la
            corre un poco más a la izquierda todavía. */}
        <div className="absolute inset-y-0 left-0 w-[72%]">
          <Image
            src={pilarDesktop}
            alt=""
            fill
            quality={90}
            sizes="72vw"
            placeholder="blur"
            className="object-cover object-[45%_center]"
          />
        </div>

      </div>

      {/* relative z-10 es imprescindible, no decorativo.

          En móvil el texto sube con margen negativo y se mete dentro del bloque
          de la foto. Ese bloque está posicionado y el contenedor del texto no,
          así que por orden de pintado del CSS el bloque queda por encima y tapa
          las primeras líneas del primer párrafo. Posicionar este contenedor y
          darle z-index lo devuelve al frente. */}
      <VoContainer className="relative z-10 pb-16 lg:py-0">
        {/* En escritorio el contenido ocupa poco menos de la mitad derecha, que
            es donde el velo ya es sólido. */}
        <div className="lg:ml-auto lg:max-w-[42%]">
          {/* Sólo el título en escritorio; en móvil va sobre la foto.

              La firma no se repite aquí: el título ya nombra a Pilar dos líneas
              más arriba y en esta maqueta quedaban el nombre y el nombre otra
              vez, seguidos. En móvil sí tiene sentido, porque allí va sobre el
              retrato y hace de pie de foto. */}
          <div className="hidden lg:block">
            <ScrollIn>
              <SectionTitle
                accent={PILAR.titleAccent}
                after="?"
                className="text-left"
              >
                {PILAR.title}
              </SectionTitle>
            </ScrollIn>

            {/* Entradilla del copy nuevo: resume una década en una línea antes
                de que empiece la historia larga. Sólo en escritorio, como el
                título que acompaña — en móvil ese título va sobre la foto y
                colgarle un párrafo encima taparía el retrato. */}
            <ScrollIn delay={0.05}>
              <p className="mt-4 font-sans text-base leading-relaxed text-foreground/70 sm:text-lg">
                {PILAR.subtitle}
              </p>
            </ScrollIn>
          </div>

          {/* -mt-[42px] en móvil: sube el texto 42 px, hasta el 89% del alto de
              la foto, ya dentro del tramo en que el fundido es negro pleno.

              Ese porcentaje es el límite prudente. El fundido llega a negro
              pleno en el 88%, y por encima del 85% todavía se transparenta la
              imagen lo suficiente como para que el texto claro empiece a
              pelearse con ella. Subirlo más pide adelantar también el fundido,
              no sólo mover este número. */}
          <div className="-mt-[42px] lg:mt-5">
            <PilarBio />
          </div>

          {/* Centrado en los dos tamaños, y con su tope de ancho también en
              escritorio.

              Estuvo pegado al borde izquierdo y a ancho de columna, con la idea
              de que el texto entrara en una sola línea. No lo conseguía: la
              columna mide un 42% del contenedor —unos 479 px— y este rótulo
              necesita cerca de 560, así que partía igualmente en "…LISTA DE /
              ESPERA". Se pagaba un botón descentrado a cambio de nada.

              Centrado comparte eje con el "Ver más" que tiene justo encima, que
              es lo que hace que los dos se lean como un bloque. */}
          <ScrollIn delay={0.2}>
            <div className="mt-9 flex justify-center">
              <WaitlistCta className="max-w-md">{PILAR.cta}</WaitlistCta>
            </div>
          </ScrollIn>
        </div>

      </VoContainer>
    </section>
  );
}
