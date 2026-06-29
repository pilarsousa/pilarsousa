import { Hero } from "@/components/sections/Hero";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Patron } from "@/components/sections/Patron";
import { Experiencia } from "@/components/sections/Experiencia";
import { AstroDivider } from "@/components/ui/AstroDivider";
import { Bonos } from "@/components/sections/Bonos";
import { Pilar } from "@/components/sections/Pilar";
import { Cierre } from "@/components/sections/Cierre";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Manifiesto />
        <Patron />
        <Experiencia />
        <AstroDivider />
        <Bonos />
        <Pilar />
        <Cierre />
      </main>
      <Footer />
    </>
  );
}
