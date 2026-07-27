import { Hero } from "@/components/ventas/sections/Hero";
import { ParaQuien } from "@/components/ventas/sections/ParaQuien";
import { QueVasALograr } from "@/components/ventas/sections/QueVasALograr";
import { Oferta } from "@/components/ventas/sections/Oferta";
import { Testimonios } from "@/components/ventas/sections/Testimonios";
import { Precio } from "@/components/ventas/sections/Precio";
import { Pilar } from "@/components/ventas/sections/Pilar";
import { Faq } from "@/components/ventas/sections/Faq";
import { Footer } from "@/components/mision-origen/sections/Footer";

/*
  Landing de ventas — /ventas.

  Orden persuasivo:
    1. Hero (promesa + CTA)
    2. Para quién es este producto (cualifica)
    3. Qué vas a lograr (resultados)
    4. Oferta irresistible (valor + mockup)
    5. Testimonios (prueba social)
    6. Resumen y precio (cierre + CTA)
    7. Quién es Pilar (autoridad)
    8. Soporte y FAQ (últimas objeciones)

  Reutiliza componentes de la landing de registro (testimonios, bio de Pilar,
  footer) para no duplicar contenido ni estilo.
*/
export default function VentasPage() {
  return (
    <main>
      <Hero />
      <ParaQuien />
      <QueVasALograr />
      <Oferta />
      <Testimonios />
      <Precio />
      <Pilar />
      <Faq />
      <Footer />
    </main>
  );
}
