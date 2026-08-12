import { Hero } from "@/components/volver-al-origen/sections/Hero";
import { Beneficios } from "@/components/volver-al-origen/sections/Beneficios";
import { Testimonios } from "@/components/volver-al-origen/sections/Testimonios";
import { Pilar } from "@/components/volver-al-origen/sections/Pilar";
import { Footer } from "@/components/volver-al-origen/sections/Footer";

/*
  Landing de lista de espera — /volver-al-origen.

  Las cuatro secciones del copy entregado, en su orden:
    1. Hero — promesa + formulario, visible sin hacer scroll
    2. Qué te llevarás por entrar en la lista (motivo para dejar el dato)
    3. Lo que dicen quienes ya dieron el paso (prueba social)
    4. Quién es Pilar (autoridad)

  Todos los CTA apuntan al ancla del formulario del hero, así que desde
  cualquier punto del scroll se vuelve al mismo sitio.
*/
export default function VolverAlOrigenPage() {
  return (
    <>
      <main>
        <Hero />
        <Beneficios />
        <Testimonios />
        <Pilar />
      </main>
      <Footer />
    </>
  );
}
