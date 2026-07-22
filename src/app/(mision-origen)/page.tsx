import { Hero } from "@/components/mision-origen/sections/Hero";
import { Transmision } from "@/components/mision-origen/sections/Transmision";
import { Codigo } from "@/components/mision-origen/sections/Codigo";
import { Protocolo } from "@/components/mision-origen/sections/Protocolo";
import { Pilar } from "@/components/mision-origen/sections/Pilar";
import { Acceso } from "@/components/mision-origen/sections/Acceso";
import { Footer } from "@/components/mision-origen/sections/Footer";
import { ScrollArrow } from "@/components/mision-origen/ui/ScrollArrow";

export default function Home() {
  return (
    <main>
      <Hero />

      {/*
        Puente Hero → Transmisión: la flecha se monta en la costura entre ambas
        secciones. Se ubica aquí (fuera del Hero) porque el Hero tiene
        overflow-hidden, que recortaría la mitad que sobresale. Este contenedor
        de altura cero deja la flecha centrada horizontalmente y a caballo del
        borde (mitad en el Hero, mitad en Transmisión) vía -translate-y-1/2.
      */}
      <div className="relative z-20 h-0">
        <a
          href="#transmision"
          aria-label="Bajar a la siguiente sección"
          className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Bounce lives on an inner span so it doesn't fight the -translate-y
              that pins the anchor to the section seam.
              Two sizes: the SVG takes its dimensions from a numeric prop, so
              the responsive step is done by rendering one per breakpoint and
              toggling visibility rather than with CSS classes. */}
          <span className="block animate-bounce-soft transition-transform duration-300 group-hover:scale-110">
            <span className="block sm:hidden">
              <ScrollArrow size={36} />
            </span>
            <span className="hidden sm:block">
              <ScrollArrow size={44} />
            </span>
          </span>
        </a>
      </div>

      <Transmision />
      <Codigo />
      <Protocolo />
      <Pilar />
      <Acceso />
      <Footer />
    </main>
  );
}
