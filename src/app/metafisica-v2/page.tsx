import { Hero } from "@/components/metafisica-v2/sections/Hero";
import { QueEsperar } from "@/components/metafisica-v2/sections/QueEsperar";
import { Magia } from "@/components/metafisica-v2/sections/Magia";
import { Oportunidad } from "@/components/metafisica-v2/sections/Oportunidad";
import { Dispuesta } from "@/components/metafisica-v2/sections/Dispuesta";
import { Cierre } from "@/components/metafisica-v2/sections/Cierre";
import { Footer } from "@/components/metafisica-v2/sections/Footer";

/* Mismo orden que la referencia (LeadsMastery). */
export default function MetafisicaV2() {
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
