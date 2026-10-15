import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { Encabezado } from "@/components/cientifico-v2/ui/Encabezado";
import { Destacado } from "@/components/cientifico-v2/ui/Destacado";
import { HuecoImagen } from "@/components/cientifico-v2/ui/HuecoImagen";
import { Firma } from "@/components/cientifico-v2/ui/Firma";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { PILAR } from "@/components/cientifico-v2/content";

/**
 * Bloque 8 · Quién es Pilar Sousa. La foto que pide el brief (enseñando en
 * la pizarra, no posando) todavía no está: va el hueco con su descripción.
 * Al lado, la presentación de la profesora con sus tres datos en grande,
 * como las credenciales de una cátedra, y su firma.
 */
export function SobrePilar() {
  return (
    <section aria-labelledby="pilar-titulo" className="relative py-20 sm:py-28">
      <Contenedor className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <HuecoImagen descripcion={PILAR.foto} className="aspect-[4/5] w-full" />
        </Reveal>

        <div>
          <Encabezado id="pilar-titulo" antetitulo={PILAR.antetitulo} titulo={PILAR.titulo} />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              <Destacado texto={PILAR.texto} />
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Fila flexible y no grilla de tres: "+600.000" en Cinzel es más
                ancho que un tercio de la columna y se montaba sobre el "13". */}
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-7 border-y border-(--cv2-oro)/25 py-7 sm:gap-x-12">
              {PILAR.datos.map(({ valor, etiqueta, prefijo }) => (
                <div key={etiqueta} className="flex flex-col justify-end">
                  {/* El tope de ancho va en la etiqueta: el número manda. */}
                  <dt className="order-2 mt-2 max-w-[10rem] text-sm font-semibold leading-snug text-(--cv2-gris) sm:text-base">
                    {etiqueta}
                  </dt>
                  <dd className="order-1">
                    {prefijo && (
                      <span className="block text-sm font-bold uppercase tracking-[0.18em] text-(--cv2-oro)/80">
                        {prefijo}
                      </span>
                    )}
                    <span className="cv2-titulo block whitespace-nowrap text-[2rem] font-bold leading-none sm:text-[2.4rem]">
                      {valor}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Firma className="mt-8 text-[2.6rem] sm:text-[3rem]" />
        </div>
      </Contenedor>
    </section>
  );
}
