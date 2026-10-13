import { Hero } from "@/components/cientifico-v3/sections/Hero";
import { QueEsperar } from "@/components/cientifico-v3/sections/QueEsperar";
import { Magia } from "@/components/cientifico-v3/sections/Magia";
import { Oportunidad } from "@/components/cientifico-v3/sections/Oportunidad";
import { Dispuesta } from "@/components/cientifico-v3/sections/Dispuesta";
import { Cierre } from "@/components/cientifico-v3/sections/Cierre";
import { Footer } from "@/components/cientifico-v3/sections/Footer";

/* Mismo orden que la referencia (LeadsMastery). */
export default function CientificoV3() {
  return (
    <main>
      <Hero />
      <QueEsperar />
      <Magia />
      <Oportunidad />
      <Dispuesta />
      <Cierre />
      <Footer />
    </main>
  );
}
