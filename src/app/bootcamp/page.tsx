import { Hero } from "@/components/bootcamp-v2/sections/Hero";
import { Manifiesto } from "@/components/bootcamp-v2/sections/Manifiesto";
import { Patron } from "@/components/bootcamp-v2/sections/Patron";
import { Experiencia } from "@/components/bootcamp-v2/sections/Experiencia";
import { Bonos } from "@/components/bootcamp-v2/sections/Bonos";
import { Pilar } from "@/components/bootcamp-v2/sections/Pilar";
import { Cierre } from "@/components/bootcamp-v2/sections/Cierre";
import { Faq } from "@/components/bootcamp-v2/sections/Faq";
import { Footer } from "@/components/bootcamp-v2/sections/Footer";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/bootcamp-v2/ui/Reveal";
import { PricingCard } from "@/components/bootcamp-v2/ui/PricingCard";
import { GridScanBackdrop } from "@/components/bootcamp-v2/ui/GridScanBackdrop";
import { CountdownHeader } from "@/components/bootcamp-v2/ui/CountdownHeader";
import { BOOTCAMP_START } from "@/lib/links";

export default function Home() {
  return (
    <>
      {/* Countdown bar, stuck to the top for the whole scroll. It was taken
          down while the event was weeks away (no urgency then) and is back for
          the final day. */}
      <CountdownHeader target={BOOTCAMP_START} />
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
          className="relative isolate overflow-hidden bg-background py-[clamp(4rem,2rem+8vh,7rem)]"
        >
          {/* The Diagnóstico's animated grid, behind the card. `isolate` keeps
              its -z-10 layer inside this section instead of under the page. */}
          <GridScanBackdrop className="-z-10" />
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
