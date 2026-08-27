import Image from "next/image";
import { TestimonialCarousel } from "@/components/lista-de-espera/ui/TestimonialCarousel";
import {
  TESTIMONIOS,
  FEATURED_TESTIMONIALS,
} from "@/components/lista-de-espera/content";
import trustpilot from "@/../public/volver-origen/public/Recursos/generales/trutspilot.png";

/*
  Sección 6 — Lo que dicen quienes ya volvieron al origen.

  LA CABECERA VA EN LA RETÍCULA DE LA PÁGINA —del 20,5% al 79,5%— PERO EL
  CARRUSEL NO. La fila de reseñas ocupa el ancho completo de la ventana y se
  desvanece por los cantos, que es lo que cuenta que hay más de las que caben. Si
  se metiera dentro de la retícula, la fila terminaría en un borde limpio y
  parecería una lista de cinco, no un carrusel.

  Por eso la sección no lleva un contenedor común: la cabecera se coloca a un
  lado y la pista al otro.

  EL SELLO DE TRUSTPILOT ES UNA IMAGEN, no una maqueta con las estrellas
  redibujadas. Es una valoración de un tercero y su aspecto es suyo: rehacerla en
  HTML la convertiría en algo que podemos editar sin querer, y una nota media que
  se puede retocar desde el CSS deja de ser una prueba.

  El carrusel es cliente —necesita el scroll de la pista y el diálogo de "ver
  más"—; el resto de la sección es servidor.
*/
export function Resenas() {
  return (
    <section
      aria-labelledby="resenas-titulo"
      className="relative bg-white py-8 sm:py-[3.25vw]"
    >
      <div className="mx-auto w-[86%] sm:w-[59%]">
        <div className="border-t-[max(0.05vw,1px)] border-[#d9d9d9]" />

        <div className="flex flex-col items-start gap-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:gap-[2vw] sm:py-[1.4vw]">
          <h2
            id="resenas-titulo"
            className="font-display text-[clamp(1rem,5vw,1.35rem)] leading-[1.25] text-[#141b0a] sm:text-[clamp(0.8rem,1.35vw,1.75rem)] sm:leading-[1.3]"
          >
            {TESTIMONIOS.title}
            {/* Dos líneas siempre: la frase tiene una junta natural entre lo que
                se dice y quién lo dice, y dejarla partir sola la corta por donde
                caiga. */}
            <br />
            {TESTIMONIOS.titleAccent}
          </h2>

          <Image
            src={trustpilot}
            alt="Pilar Sousa — Volver al Origen en Trustpilot: 4,8 sobre 5 con 74 opiniones"
            quality={90}
            sizes="280px"
            className="h-auto w-full max-w-[200px] shrink-0 sm:w-[13.75vw] sm:max-w-[280px] sm:min-w-[180px]"
          />
        </div>

        <div className="border-t-[max(0.05vw,1px)] border-[#d9d9d9]" />
      </div>

      <div className="mt-4 sm:mt-[1.4vw]">
        <TestimonialCarousel items={FEATURED_TESTIMONIALS} />
      </div>
    </section>
  );
}
