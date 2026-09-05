import type { CSSProperties } from "react";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { OrigenCards } from "@/components/volver-al-origen/ui/OrigenCards";
import { ORIGEN } from "@/components/volver-al-origen/content";

/*
  Sección — La historia de Volver al Origen.

  Va DESPUÉS de los testimonios y ANTES de quién es Pilar, y ese orden importa:
  primero el visitante ve que a otros les funcionó (prueba), luego lee de dónde
  sale el método (razón) y por último quién lo firma (persona). Puesta antes de
  los testimonios sería pedirle 450 palabras de lectura a alguien que todavía no
  tiene motivo para concederlas.

  ── ES LA ÚNICA SECCIÓN CLARA DE LA PÁGINA, Y ESO ES EL RECURSO ──

  Toda la landing es negro profundo con tintes verdes. Ésta se levanta sobre el
  crema del embudo del diagnóstico (--vo-origen-panel), y el corte es
  deliberado: es el tramo más largo de leer, y sobre claro se lee mejor y se
  distingue como "aquí se cuenta algo" en vez de ser un bloque más de la
  sucesión oscura.

  ⚠️ POR ESO TODO EL TEXTO DE DENTRO VA EN VERDE OSCURO. Las utilidades de la
  página —text-foreground, text-vo-bone— son para fondo oscuro y aquí quedarían
  crema sobre crema, invisibles. Los colores de esta sección salen de sus
  propios tokens, definidos abajo.

  ── EL LARGO SIGUE SIENDO EL PROBLEMA A RESOLVER ──

  Son unas 450 palabras en once párrafos. En una landing de captación, donde se
  escanea más de lo que se lee, un muro así se salta entero — y con él se va el
  único sitio donde se explica POR QUÉ existe esto.

  De ahí que el relato esté partido en cards (ver OrigenCards) en vez de ser una
  columna seguida: cada una es una parada con su propio asunto, y las dos frases
  que cargan el argumento salen del cuerpo y se tratan aparte.
*/

/*
  ── LA PALETA CLARA, TOMADA DEL EMBUDO DEL DIAGNÓSTICO ──

  Son los mismos valores que /diagnostico usa en su panel crema y en .dg-claro:
  el crema muestreado del fondo (#fff8ef), el verde de marca y el verde 2.

  Van como variables en línea y NO como tokens en globals.css a propósito: sólo
  las usa esta sección, y meterlas en la hoja global las convertiría en parte
  del sistema de la página —que es oscuro— invitando a usarlas donde no
  corresponde.

  `--le-bento-rgb` es la que leen los efectos de las cards (BentoMagico) para
  el foco del cursor, las partículas y el borde. Sin ella usarían el lima
  #a3ca23 de la landing borrador, que sobre este crema no se ve.
*/
const PALETA = {
  "--vo-origen-panel": "#fff8ef",
  "--vo-origen-tinta": "#002f01",
  "--vo-origen-tinta-suave": "#084a2c",
  "--vo-origen-verde": "#084a2c",
  "--le-bento-rgb": "8, 74, 44",
} as CSSProperties;

export function Origen() {
  return (
    <section
      aria-labelledby="origen-title"
      style={PALETA}
      /* `overflow-x-clip` y no `hidden`: las cards se inclinan con el cursor y
         pueden asomar un par de píxeles por el canto, pero un `overflow:hidden`
         crea un contexto de scroll que rompe el `position: sticky` de cualquier
         cosa que se monte dentro más adelante. */
      className="relative isolate overflow-x-clip bg-[var(--vo-origen-panel)] py-[clamp(4.5rem,3rem+7vh,8rem)] text-[var(--vo-origen-tinta)]"
    >
      {/* ── LAS COSTURAS CON LAS SECCIONES VECINAS ──

          Arriba y abajo hay negro profundo, y el salto a un crema pleno es el
          contraste más duro de la página (14:1). Sin nada en medio se lee como
          un corte de maqueta, no como un cambio de tono.

          Los dos degradados van del color EXACTO del fondo general al
          transparente. Tiene que ser exacto: un negro cualquiera o un verde
          aproximado dejaría una franja de un tercer color justo en la junta,
          que es peor que el corte que se está arreglando.

          Son cortos (56 px) porque no están difuminando una imagen, sino
          empalmando dos planos de color: con más, el crema tardaría demasiado
          en llegar y la sección parecería empezar sucia. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-14"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-vo-black), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
        style={{
          backgroundImage:
            "linear-gradient(to top, var(--color-vo-black), transparent)",
        }}
      />

      <VoContainer className="relative">
        <ScrollIn>
          {/* ⚠️ NO USA <SectionTitle>, y no es un olvido.

              Esa pieza trae el color del acento pensado para fondo oscuro —el
              verde luminoso #b4e236, que sobre este crema baja a 1,6:1 y deja
              de leerse— y además descifra el texto letra a letra sobre un
              fondo que aquí no acompaña.

              El título se compone a mano con la tipografía y las versalitas del
              sistema, que es lo que lo mantiene reconocible como título de esta
              página, y con la tinta de esta sección. */}
          <h2
            id="origen-title"
            className="font-display text-center text-[1.6rem] leading-[1.2] tracking-[0.04em] text-balance uppercase sm:text-[2rem] md:text-[2.4rem]"
          >
            {ORIGEN.title}{" "}
            <span className="text-[var(--vo-origen-verde)]">
              {ORIGEN.titleAccent}
            </span>
            ?
          </h2>
        </ScrollIn>

        <OrigenCards />
      </VoContainer>
    </section>
  );
}
