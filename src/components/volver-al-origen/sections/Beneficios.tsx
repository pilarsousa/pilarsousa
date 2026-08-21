import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { BenefitCard } from "@/components/volver-al-origen/ui/BenefitCard";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { SparkDivider } from "@/components/volver-al-origen/ui/SparkDivider";
import { WaitlistCta } from "@/components/volver-al-origen/ui/WaitlistCta";
import { BENEFICIOS } from "@/components/volver-al-origen/content";

/*
  Sección 2 — Qué te llevarás por acceder a la lista.

  Las tres ventajas van separadas por filetes verticales, no en cards: mantiene
  el bloque ligero sobre el negro profundo. En mobile los filetes pasan a
  horizontales, porque una línea vertical entre elementos apilados no separa
  nada.
*/
export function Beneficios() {
  return (
    <section
      aria-labelledby="beneficios-title"
      /* Sin padding superior: todo el espacio de arriba lo gobierna el filete
         con sus propios márgenes, para que los dos huecos que lo rodean se
         puedan cuadrar exactamente. Si la sección aportara el suyo, el hueco
         de arriba sería la suma de dos valores y el de abajo uno solo, y no
         habría forma de igualarlos. */
      className="bg-background pt-0 pb-[clamp(3.5rem,2rem+7vh,6rem)]"
    >
      <VoContainer>
        {/* Separador con el hero. Vive aquí y no en la página para que respete
            el ancho de contenido (1140 px) en vez de cruzar la pantalla entera.

            Los dos huecos que lo rodean miden 96 px EXACTOS, arriba y abajo.

            El margen superior no es 96 porque el hero ya aporta su parte: deja
            64 px por debajo del panel en móvil y 80 en escritorio. De ahí que
            aquí se sumen los 32 y 16 que faltan en cada caso. Los de abajo sí
            son los 96 completos, porque nada más los aporta.

            Si se toca el padding inferior del hero, hay que recalcular estos
            dos márgenes o la simetría se rompe. */}
        <SparkDivider fade className="mt-8 mb-24 lg:mt-4" />

        <ScrollIn>
          <SectionTitle
            id="beneficios-title"
            accent={BENEFICIOS.titleAccent}
            after="?"
          >
            {BENEFICIOS.title}
          </SectionTitle>
        </ScrollIn>

        {/* Separación por hueco, no por líneas divisorias: ahora cada ventaja
            es una card con su propio borde, y sumar rayas entre ellas duplicaría
            la separación.

            El hueco es amplio (32 px en móvil, 56 en escritorio) porque el panel
            inclinado que asoma detrás de cada card necesita aire para leerse;
            apretadas, el de una se solapa con la vecina. */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-14">
          {BENEFICIOS.items.map((item, i) => (
            /* Cada card entra desde un lado distinto: la izquierda desde fuera
               por la izquierda, la del medio desde abajo y la derecha desde
               fuera por la derecha. Las tres convergen hacia el centro, que es
               más vistoso que verlas subir en paralelo.

               El delay las escalona en lugar de que aparezcan de golpe. h-full
               iguala el alto de las tres aunque su texto ocupe distinto número
               de renglones. */
            <ScrollIn
              key={item.icon}
              delay={i * 0.12}
              from={(["left", "up", "right"] as const)[i] ?? "up"}
              className="h-full"
            >
              <BenefitCard icon={item.icon} title={item.title} text={item.text} />
            </ScrollIn>
          ))}
        </div>

        <ScrollIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <WaitlistCta className="max-w-xs">{BENEFICIOS.cta}</WaitlistCta>
          </div>
        </ScrollIn>
      </VoContainer>
    </section>
  );
}
