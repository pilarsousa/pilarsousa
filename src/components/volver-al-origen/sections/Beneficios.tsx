import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { BenefitCard } from "@/components/volver-al-origen/ui/BenefitCard";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
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
      /* ── AQUÍ IBA EL FILETE CON EL ✦, Y CON ÉL EL RELLENO SUPERIOR ──

         El separador vivía dentro del contenedor y gobernaba todo el espacio
         entre el hero y el título: la sección iba a `pt-0` y los huecos los
         ponían sus dos márgenes (mt-8/lg:mt-4 arriba, mb-24 abajo).

         Retirado el filete, ese espacio hay que devolverlo aquí o el título se
         pega al hero. Los 128 px de `pt` son los que sumaban antes el margen
         inferior del filete (96) y el suyo propio (32 en móvil, 16 en
         escritorio) — así la distancia hasta el título no cambia.

         ⚠️ EL HERO SIGUE APORTANDO SU PARTE por debajo del panel (64 px en
         móvil, 80 en escritorio). Si se toca su relleno inferior, hay que
         revisar este valor. */
      className="bg-background pt-32 pb-[clamp(3.5rem,2rem+7vh,6rem)] lg:pt-28"
    >
      <VoContainer>
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
