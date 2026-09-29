import { Hero } from "@/components/bootcamp-v1/sections/Hero";
import { Manifiesto } from "@/components/bootcamp-v1/sections/Manifiesto";
import { Patron } from "@/components/bootcamp-v1/sections/Patron";
import { Experiencia } from "@/components/bootcamp-v1/sections/Experiencia";
import { Bonos } from "@/components/bootcamp-v1/sections/Bonos";
import { Pilar } from "@/components/bootcamp-v1/sections/Pilar";
import { Cierre } from "@/components/bootcamp-v1/sections/Cierre";
import { Faq } from "@/components/bootcamp-v1/sections/Faq";
import { Footer } from "@/components/bootcamp-v1/sections/Footer";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/bootcamp-v1/ui/Reveal";
import { PricingCard } from "@/components/bootcamp-v1/ui/PricingCard";

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
