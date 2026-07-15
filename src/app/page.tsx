import { Hero } from "@/components/sections/Hero";
import { Transmision } from "@/components/sections/Transmision";
import { Codigo } from "@/components/sections/Codigo";
import { Protocolo } from "@/components/sections/Protocolo";
import { Pilar } from "@/components/sections/Pilar";
import { Acceso } from "@/components/sections/Acceso";

export default function Home() {
  return (
    <main>
      <Hero />
      <Transmision />
      <Codigo />
      <Protocolo />
      <Pilar />
      <Acceso />
    </main>
  );
}
