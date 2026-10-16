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

/* Los doce bloques del brief, en su orden. El botón único ("Quiero mi
   plaza") va en el hero, tras Qué es (4), Lo que te llevas (6) y la prueba
   social (9), en la plaza y en el cierre. */
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
      <Plaza />
      <Faq />
      <Cierre />
      <Footer />
    </main>
  );
}
