import Image from "next/image";
import { PILAR } from "@/components/lista-de-espera/content";
import pilarDesktop from "@/../public/volver-origen/public/Recursos/generales/banner-4-web.webp";
import pilarMobile from "@/../public/volver-origen/public/Recursos/mobile/bg-pilarsousa-mobile.jpg";

/*
  Seccion 7 - Quien es Pilar Sousa.

  El fondo desktop ya viene compuesto en el asset original: foto, luz lateral y
  fundido a negro. La seccion solo coloca el texto en las coordenadas del
  montaje para que el encuadre quede limpio y Pilar no reciba velos encima.
*/
export function Pilar() {
  const [lead, ...paragraphs] = PILAR.paragraphs;

  return (
    <section
      aria-label={`${PILAR.title} ${PILAR.titleAccent}?`}
      className="relative isolate overflow-hidden bg-[#111111]"
    >
      <div className="relative hidden aspect-[1920/801] w-full md:block">
        <Image
          src={pilarDesktop}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
        />

        {/* LA COLUMNA OCUPA MÁS ALTO A PROPÓSITO, y el margen sale del propio
            fondo, no de la vista: midiendo la luminancia de esta franja del
            banner, la zona clara —la única que aguanta letra negra— se mantiene
            por encima de 167 de media hasta el 85% del alto, y sólo por debajo
            se va a negro. El texto llegaba al 57%, así que sobraban 28 puntos de
            espacio bien iluminado.

            De ahí que se agrande la letra en vez de recortar la imagen por
            abajo: el encuadre llega a la altura de las rodillas y recortarlo
            partiría por medio muslo, y ese fundido a negro del pie es la
            transición hacia la sección siguiente. */}
        <div className="absolute left-[20.45%] top-[19.5%] w-[22.5%] text-[#060704]">
          <h2
            id="pilar-titulo"
            className="whitespace-nowrap font-display text-[clamp(0.95rem,1.5vw,1.9rem)] leading-[1.05] tracking-normal uppercase"
          >
            {PILAR.title} {PILAR.titleAccent}?
          </h2>

          {/* El interlineado sube de 1,16 a 1,45. Es lo que más aporta de todo
              el ajuste: 1,16 en un párrafo de cuatro renglones aprieta las
              líneas hasta que el bloque se lee como un ladrillo, y además es lo
              que hacía que ocupara tan poco. */}
          <div className="mt-[1.15vw] space-y-[0.95vw] font-sans text-[clamp(0.52rem,0.92vw,1.15rem)] leading-[1.45] font-medium tracking-normal text-black">
            <p className="font-extrabold">{lead}</p>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative min-h-[clamp(660px,178vw,780px)] w-full md:hidden">
        <Image
          src={pilarMobile}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-top"
        />

        <div className="absolute inset-x-0 top-[38%] px-6 pb-8 text-vo-bone">
          <h2
            id="pilar-titulo-mobile"
            className="font-display text-2xl leading-tight tracking-normal uppercase"
          >
            {PILAR.title}{" "}
            <span className="text-vo-lumen">{PILAR.titleAccent}</span>?
          </h2>

          <div className="mt-5 space-y-3.5 font-sans text-[0.82rem] leading-[1.48] text-vo-bone/88">
            <p className="font-extrabold text-vo-bone">{lead}</p>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
