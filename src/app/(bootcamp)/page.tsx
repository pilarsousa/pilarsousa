import { Hero } from "@/components/sections/Hero";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Patron } from "@/components/sections/Patron";
import { Experiencia } from "@/components/sections/Experiencia";
import { Bonos } from "@/components/sections/Bonos";
import { Pilar } from "@/components/sections/Pilar";
import { Cierre } from "@/components/sections/Cierre";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PricingCard } from "@/components/ui/PricingCard";

export default function Home() {
  return (
    <>
      {/* overflow-x-clip: a global belt so decorative overflow (ambient glows,
          sheens, ribbons) can bleed past a section without ever producing a
          horizontal scrollbar on mobile. */}
      <main className="overflow-x-clip">
        <Hero />
        <Manifiesto />
        <Patron />
        <Experiencia />

        {/* The offer sits after the three-day class cards so the visitor first
            understands what they will experience, then sees the price. */}
        <section
          id="precio"
          className="bg-background py-[clamp(4rem,2rem+8vh,7rem)]"
        >
          <Container>
            <Reveal>
              <PricingCard />
            </Reveal>
          </Container>
        </section>

        <Bonos />
        <Pilar />
        <Cierre />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
