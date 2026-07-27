import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import mockup from "@/../public/mision-origen-venta/mockup.png";
import {
  GraduationCap,
  Route,
  Video,
  Users,
  Download,
  BadgeCheck,
} from "lucide-react";

/*
  Sección "Oferta irresistible".

  Muestra todo lo que incluye el programa con una imagen grande del packaging
  (libros, bonus, plataforma, sesiones) para maximizar el valor percibido antes
  del precio. Cada item lleva un icono que lo representa. Copy y lista
  PLACEHOLDER — editá con lo real.

  El mockup todavía no existe: se deja un recuadro marcado. Cuando tengas el
  arte, colocalo en public/ventas/mockup.png (o .jpg), importalo con next/image
  y reemplazá el recuadro punteado por el <Image />.
*/

const INCLUYE = [
  { icon: GraduationCap, text: "Acceso completo al entrenamiento de 40 días" },
  { icon: Route, text: "Sistema práctico paso a paso de manifestación" },
  { icon: Video, text: "Sesiones en vivo con Pilar Sousa" },
  { icon: Users, text: "Comunidad privada de acompañamiento" },
  { icon: Download, text: "Material descargable y recursos de apoyo" },
  { icon: BadgeCheck, text: "Certificado de participación" },
] as const;

export function Oferta() {
  return (
    <section id="oferta" className="bg-surface py-section">
      <Container>
        <div className="flex flex-col items-center gap-10 text-center">
          <Reveal>
            <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Todo lo que{" "}
              <NeonText variant="cyan">recibes</NeonText> al acceder hoy
            </h2>
          </Reveal>

          {/* Mockup con todo el packaging del programa */}
          <Reveal delay={0.15}>
            <div className="w-full max-w-4xl">
              <Image
                src={mockup}
                alt="Todo lo que incluye el programa: plataforma, sesiones, recursos, libro y certificado"
                priority
                sizes="(min-width: 768px) 56rem, 100vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          {/* Lista de lo que incluye — cada item con su icono */}
          <Reveal delay={0.2}>
            <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
              {INCLUYE.map(({ icon: Icon, text }, i) => (
                <li
                  key={i}
                  className="pricing-item shine-hover flex min-h-[60px] items-center gap-3 px-4 py-2"
                >
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black text-cyan"
                  >
                    <Icon size={18} />
                  </span>
                  <span className="font-sans text-sm font-light leading-tight text-foreground/90 sm:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
