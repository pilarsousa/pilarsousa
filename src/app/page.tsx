import { Hero } from "@/components/sections/Hero";
import { Transmision } from "@/components/sections/Transmision";
import { Codigo } from "@/components/sections/Codigo";
import { Protocolo } from "@/components/sections/Protocolo";
import { Pilar } from "@/components/sections/Pilar";
import { Acceso } from "@/components/sections/Acceso";
import { ScrollArrow } from "@/components/ui/ScrollArrow";

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
              that pins the anchor to the section seam. */}
          <span className="block animate-bounce-soft transition-transform duration-300 group-hover:scale-110">
            <ScrollArrow size={64} />
          </span>
        </a>
      </div>

      <Transmision />
      <Codigo />
      <Protocolo />
      <Pilar />
      <Acceso />
    </main>
  );
}
