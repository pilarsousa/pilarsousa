import Image from "next/image";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { PilarBio } from "@/components/volver-al-origen/ui/PilarBio";
import { VoCta } from "@/components/volver-al-origen/ui/VoCta";
import { FORM_ANCHOR, PILAR } from "@/components/volver-al-origen/content";
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
      className="relative isolate overflow-x-clip bg-background lg:flex lg:h-[780px] lg:items-center"
    >
      {/* ══ MÓVIL: retrato a sangre con el texto encima ══ */}
      <div className="relative lg:hidden">
        <div className="relative aspect-3/4 w-full">
          <Image
            src={pilarMovil}
            alt="Pilar Sousa"
            fill
            quality={90}
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-top"
          />

          {/* Velo superior: funde el borde de arriba con el verde de la sección
              —arranca en el color exacto del fondo, si empieza por debajo del
              100% se dibuja una línea— y da contraste al título, porque esa
              zona de la foto es clara. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #0b1502 0%, rgba(11,21,2,0.82) 12%, rgba(11,21,2,0.45) 26%, transparent 42%)",
            }}
          />

          {/* Fundido inferior hacia el fondo de la sección */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to top, #0b1502 0%, #0b1502 12%, rgba(11,21,2,0.4) 34%, transparent 62%)",
            }}
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
      <div aria-hidden className="absolute inset-0 -z-20 hidden lg:block">
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

        {/* Velo lateral: transparente sobre Pilar, sólido bajo el texto. Se
            cierra en el 68%, antes de que acabe la foto en el 72%, para que su
            borde derecho quede tapado y no se vea el corte. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, transparent 0%, transparent 20%, rgba(11,21,2,0.45) 38%, rgba(11,21,2,0.92) 56%, #0b1502 68%)",
          }}
        />

        {/* Costuras con las secciones vecinas, para que la foto no corte en
            seco ni arriba ni abajo. */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            backgroundImage: "linear-gradient(to bottom, #0b1502, transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            backgroundImage: "linear-gradient(to top, #0b1502, transparent)",
          }}
        />
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
        <div className="lg:ml-auto lg:max-w-[48%]">
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
          </div>

          {/* -mt-[62px] en móvil: sube el texto 62 px, hasta el 88% del alto de
              la foto, justo donde el fundido llega a negro pleno.

              Ese porcentaje es el límite prudente. El fundido llega a negro
              pleno en el 88%, y por encima del 85% todavía se transparenta la
              imagen lo suficiente como para que el texto claro empiece a
              pelearse con ella. Subirlo más pide adelantar también el fundido,
              no sólo mover este número. */}
          <div className="-mt-[62px] lg:mt-5">
            <PilarBio />
          </div>

          {/* Centrado respecto a la columna de texto, no alineado a su borde. */}
          <ScrollIn delay={0.2}>
            <div className="mt-9 flex justify-center">
              <VoCta href={FORM_ANCHOR} className="max-w-md">
                {PILAR.cta}
              </VoCta>
            </div>
          </ScrollIn>
        </div>
      </VoContainer>
    </section>
  );
}
