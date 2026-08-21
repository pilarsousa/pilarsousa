import { Hero } from "@/components/lista-de-espera/sections/Hero";
import { Entrenar } from "@/components/lista-de-espera/sections/Entrenar";
import { ParaVos } from "@/components/lista-de-espera/sections/ParaVos";
import { QueEntrenas } from "@/components/lista-de-espera/sections/QueEntrenas";
import { Experiencia } from "@/components/lista-de-espera/sections/Experiencia";
import { Testimonios } from "@/components/lista-de-espera/sections/Testimonios";
import { Pilar } from "@/components/lista-de-espera/sections/Pilar";
import { ListaEspera } from "@/components/lista-de-espera/sections/ListaEspera";
import { Faq } from "@/components/lista-de-espera/sections/Faq";
import { Footer } from "@/components/lista-de-espera/sections/Footer";

/*
  Landing de lista de espera (BORRADOR) — /lista-de-espera.

  Las secciones, en el orden del guion entregado por el cliente:

    1. Hero — promesa, duración y CTA, visible sin hacer scroll
    2. No venís a aprender más, venís a entrenar — el argumento
    3. Volver al Origen es para vos si… — identificación
    4. Qué vas a entrenar — las cinco capacidades
    5. Una experiencia diseñada para tu vida real — qué incluye
    6. Lo que dicen quienes ya volvieron al origen — prueba social
    7. Quién es Pilar — autoridad
    8. Entrá ahora a la lista de espera — bonos y formulario
    9. Preguntas frecuentes — las últimas objeciones

  El recorrido responde a las preguntas del visitante según van apareciendo: qué
  es esto, por qué me hace falta, va conmigo, qué me llevo, quién más lo hizo,
  quién lo dirige, cómo entro y qué me estoy jugando.

  LOS FONDOS ALTERNAN, y no es decoración: es lo que separa una sección de la
  siguiente sin dibujar una línea. La página tiene por debajo una textura oscura
  fija (ver el layout) y las secciones pares montan encima una textura clara que
  entra y sale difuminada por sus bordes:

    Hero        oscuro
    Entrenar    claro
    ParaVos     oscuro
    QueEntrenas claro
    Experiencia oscuro
    Testimonios claro
    Pilar       oscuro
    ListaEspera claro
    Faq         oscuro

  Al añadir una sección hay que respetar la alternancia con la que tenga encima,
  o dos claras seguidas se leerán como una sola.

  Los CTA repartidos por la página abren el modal de registro. El formulario a
  la vista está una sola vez, en la sección 8, que es donde el recorrido termina.
*/
export default function VolverAlOrigenPage() {
  return (
    <>
      <main>
        <Hero />
        <Entrenar />
        <ParaVos />
        <QueEntrenas />
        <Experiencia />
        <Testimonios />
        <Pilar />
        <ListaEspera />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
