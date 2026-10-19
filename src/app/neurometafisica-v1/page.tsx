import { Hero } from "@/components/neurometafisica-v1/sections/Hero";
import { TeSuena } from "@/components/neurometafisica-v1/sections/TeSuena";
import { Revelacion } from "@/components/neurometafisica-v1/sections/Revelacion";
import { QueEs } from "@/components/neurometafisica-v1/sections/QueEs";
import { Temario } from "@/components/neurometafisica-v1/sections/Temario";
import { TeLlevas } from "@/components/neurometafisica-v1/sections/TeLlevas";
import { ParaQuien } from "@/components/neurometafisica-v1/sections/ParaQuien";
import { SobrePilar } from "@/components/neurometafisica-v1/sections/SobrePilar";
import { PruebaSocial } from "@/components/neurometafisica-v1/sections/PruebaSocial";
import { Plaza } from "@/components/neurometafisica-v1/sections/Plaza";
import { Faq } from "@/components/neurometafisica-v1/sections/Faq";
import { Cierre } from "@/components/neurometafisica-v1/sections/Cierre";
import { Footer } from "@/components/neurometafisica-v1/sections/Footer";

/* Los doce bloques del brief. El cierre ("La información sola no te cambia
   la vida") va antes de la plaza y no al final, a pedido del cliente: la
   ficha con el precio queda como último empujón antes de las dudas. El botón
   único ("Quiero mi plaza") va en el hero, tras ¿Te suena?, Qué es, Lo que
   te llevas y la prueba social, en el cierre y en la plaza. */
export default function SeminarioNeurometafisica() {
  return (
    <main>
      <Hero />
      <TeSuena />
      <Revelacion />
      <QueEs />
      <Temario />
      <TeLlevas />
      <ParaQuien />
      <SobrePilar />
      <PruebaSocial />
      <Cierre />
      <Plaza />
      <Faq />
      <Footer />
    </main>
  );
}
