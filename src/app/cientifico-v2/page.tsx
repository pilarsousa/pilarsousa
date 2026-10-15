import { Hero } from "@/components/cientifico-v2/sections/Hero";
import { TeSuena } from "@/components/cientifico-v2/sections/TeSuena";
import { Revelacion } from "@/components/cientifico-v2/sections/Revelacion";
import { QueEs } from "@/components/cientifico-v2/sections/QueEs";
import { Temario } from "@/components/cientifico-v2/sections/Temario";
import { TeLlevas } from "@/components/cientifico-v2/sections/TeLlevas";
import { ParaQuien } from "@/components/cientifico-v2/sections/ParaQuien";
import { SobrePilar } from "@/components/cientifico-v2/sections/SobrePilar";
import { PruebaSocial } from "@/components/cientifico-v2/sections/PruebaSocial";
import { Plaza } from "@/components/cientifico-v2/sections/Plaza";
import { Faq } from "@/components/cientifico-v2/sections/Faq";
import { Cierre } from "@/components/cientifico-v2/sections/Cierre";
import { Footer } from "@/components/cientifico-v2/sections/Footer";

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
