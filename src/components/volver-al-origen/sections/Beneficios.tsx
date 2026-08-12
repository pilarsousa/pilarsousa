import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { Reveal } from "@/components/bootcamp/ui/Reveal";
import { BenefitCard } from "@/components/volver-al-origen/ui/BenefitCard";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { VoCta } from "@/components/volver-al-origen/ui/VoCta";
import { BENEFICIOS, FORM_ANCHOR } from "@/components/volver-al-origen/content";

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
      className="bg-background py-[clamp(3.5rem,2rem+7vh,6rem)]"
    >
      <VoContainer>
        <Reveal>
          <SectionTitle
            id="beneficios-title"
            accent={BENEFICIOS.titleAccent}
            after="?"
          >
            {BENEFICIOS.title}
          </SectionTitle>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 divide-y divide-accent/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {BENEFICIOS.items.map((item, i) => (
            /* El delay escalona la entrada de las tres columnas de izquierda a
               derecha, en lugar de que aparezcan de golpe. */
            <Reveal key={item.icon} delay={i * 0.12} className="py-10 md:py-0">
              <BenefitCard icon={item.icon} title={item.title} text={item.text} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <VoCta href={FORM_ANCHOR} className="max-w-xs">
              {BENEFICIOS.cta}
            </VoCta>
          </div>
        </Reveal>
      </VoContainer>
    </section>
  );
}
