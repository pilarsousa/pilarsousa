import { Hero } from "@/components/sections/Hero";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Patron } from "@/components/sections/Patron";
import { Experiencia } from "@/components/sections/Experiencia";
import { Pilar } from "@/components/sections/Pilar";
import { Cierre } from "@/components/sections/Cierre";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifiesto />
      <Patron />
      <Experiencia />
      <Pilar />
      <Cierre />
    </main>
  );
}
