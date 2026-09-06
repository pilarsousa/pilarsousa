import Image from "next/image";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { WaitlistCta } from "@/components/volver-al-origen/ui/WaitlistCta";
import { TestimonialCarousel } from "@/components/lista-de-espera/ui/TestimonialCarousel";
import {
  TESTIMONIOS,
  FEATURED_TESTIMONIALS,
} from "@/components/volver-al-origen/content";
import trustpilot from "@/../public/volver-origen/public/Recursos/generales/trutspilot.png";
import trustpilotMovil from "@/../public/volver-origen/public/Recursos/mobile/testimonio-mobile.jpeg";

/*
  Sección 3 — Lo que dicen quienes ya volvieron al origen.

  ── QUÉ SE FUE, Y POR QUÉ ──

  Esta sección tenía el panel de TrustScore: un bloque que redibujaba en HTML la
  nota de Trustpilot, sus barras de reparto y las estrellas. Se retira, y hay dos
  motivos:

  1. AL PASAR EL TRAMO A PANEL CLARO SE VOLVIÓ ILEGIBLE. Estaba escrito contra
     `text-foreground` sobre `bg-vo-forest`, y con los tokens invertidos del
     panel el texto quedaba verde oscuro sobre verde oscuro.

  2. EL PROBLEMA DE FONDO ES OTRO, y por eso no se arregló sino que se cambió:
     una nota media redibujada en HTML es una nota que se puede retocar desde el
     CSS, y eso deja de ser una prueba. El sello de Trustpilot es la valoración
     de un tercero y su aspecto es suyo.

  Ahora entra como IMAGEN, que es como ya lo resolvía la landing borrador.

  ── LA CABECERA VA EN RETÍCULA Y EL CARRUSEL NO ──

  La fila de reseñas ocupa el ancho completo de la ventana y se desvanece por los
  cantos: eso es lo que cuenta que hay más de las que caben. Metida dentro del
  contenedor, terminaría en un borde limpio y se leería como una lista de cinco,
  no como un carrusel.

  Por eso la sección no lleva un contenedor común — la cabecera se coloca a un
  lado y la pista al otro.

  ⚠️ EL CARRUSEL SE REUTILIZA DE /lista-de-espera, NO SE COPIA. Son 349 líneas
  con el diálogo de "ver más", el scroll de la pista y el duplicado para el
  bucle; duplicarlas dejaría dos copias que se separan a la primera corrección.
  Sus dependencias (StarTiles, el tipo Testimonial) ya son autónomas.

  Si algún día se borra esa landing, la pieza tendría que mudarse a un sitio
  común antes — no copiarse aquí.
*/
export function Testimonios() {
  return (
    <section
      aria-labelledby="testimonios-title"
      /* Sin fondo propio: lo pinta el panel claro que envuelve esta sección y
         la de Beneficios (ver page.tsx), y tiene que ser continuo entre las
         dos. */
      className="relative py-[clamp(3rem,2rem+5vh,5rem)]"
    >
      {/* El 86%/59% viene de la retícula de la landing borrador, de donde sale
          esta cabecera. Es más estrecha que el contenedor de las otras
          secciones a propósito: el titular y el sello son dos piezas que se
          miran entre sí, y a 1140 px quedarían en dos extremos sin relación. */}
      <div className="mx-auto w-[86%] sm:w-[59%]">
        {/* Los dos filetes encierran la cabecera. Sobre el panel claro hacen de
            marco de un bloque que, si no, flotaría entre dos zonas de aire. */}
        <div className="border-t-[max(0.05vw,1px)] border-[color-mix(in_srgb,var(--color-vo-black)_15%,transparent)]" />

        <ScrollIn>
          <div className="flex flex-col items-start gap-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:gap-[2vw] sm:py-[1.4vw]">
            {/* ⚠️ NO USA <SectionTitle>, y no es un olvido.

                Esa pieza descifra el texto letra a letra y trae el acento en
                verde luminoso, que sobre este crema baja a 1,6:1. Aquí el
                titular tiene que competir con un sello que trae su propia
                tipografía en negro, así que va compuesto a mano, en bold y en la
                tinta oscura del panel.

                EL BOLD IMPORTA: Trajan sólo tiene dos pesos, y sobre blanco el
                regular se leía liviano al lado de la cabecera de Trustpilot. */}
            <h2
              id="testimonios-title"
              className="font-display text-[clamp(1rem,5vw,1.35rem)] leading-[1.25] font-bold text-[#141b0a] sm:text-[clamp(0.95rem,1.4583vw,1.9rem)] sm:leading-[1.3]"
            >
              {TESTIMONIOS.title}
              {/* Dos líneas siempre. El punto de corte vive en el copy —ver
                  TESTIMONIOS en content.ts— así que aquí sólo se respeta.
                  Dejarlo partir solo lo cortaba por donde cayera según el
                  ancho. */}
              <br />
              {TESTIMONIOS.titleAccent}
            </h2>

            {/* ── DOS SELLOS, UNO POR TAMAÑO ──

                No es el mismo archivo reencuadrado. El de escritorio es la
                insignia compacta —logo, estrellas y nota— y el de móvil es la
                cabecera completa del perfil, que trae además el nombre y el
                número de opiniones en grande.

                En móvil hace falta esa versión: la insignia compacta se queda en
                200 px junto a un titular que ocupa toda la columna, y a ese
                tamaño las estrellas y el 4,8 son ilegibles.

                El alt sólo va en uno: los dos dicen lo mismo, y quien no ve las
                imágenes debe recibir la valoración una vez, no dos. */}
            <Image
              src={trustpilotMovil}
              alt="Pilar Sousa — Volver al Origen en Trustpilot: 4,8 sobre 5 con 74 opiniones"
              quality={90}
              sizes="100vw"
              className="h-auto w-full sm:hidden"
            />
            <Image
              src={trustpilot}
              alt=""
              aria-hidden
              quality={90}
              sizes="280px"
              className="hidden h-auto w-full shrink-0 sm:block sm:w-[13.75vw] sm:max-w-[280px] sm:min-w-[180px]"
            />
          </div>
        </ScrollIn>

        <div className="border-t-[max(0.05vw,1px)] border-[color-mix(in_srgb,var(--color-vo-black)_15%,transparent)]" />
      </div>

      {/* ⚠️ EL CARRUSEL LLEVA SU PROPIO ÁMBITO OSCURO.

          Sus cards son verde profundo con texto claro, y están escritas contra
          `text-foreground` y `text-accent`. Dentro del panel esos tokens valen
          verde oscuro, así que sin esto el texto de las reseñas saldría verde
          sobre verde — el mismo fallo que tenía el TrustScore.

          Se devuelven los tokens Y el `color` heredado, porque `text-foreground`
          está aplicado más arriba en el árbol y lo que baja es un color ya
          calculado. */}
      <div className="vo-ambito-oscuro mt-4 sm:mt-[1.4vw]">
        <TestimonialCarousel items={FEATURED_TESTIMONIALS} />
      </div>

      <ScrollIn delay={0.15}>
        <div className="mt-10 flex justify-center px-6">
          <WaitlistCta className="max-w-xs">{TESTIMONIOS.cta}</WaitlistCta>
        </div>
      </ScrollIn>
    </section>
  );
}
