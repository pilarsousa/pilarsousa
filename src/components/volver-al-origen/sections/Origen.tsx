import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { OrigenCards } from "@/components/volver-al-origen/ui/OrigenCards";
import { ORIGEN } from "@/components/volver-al-origen/content";

/*
  Sección — La historia de Volver al Origen.

  Va DESPUÉS de los testimonios y ANTES de quién es Pilar, y ese orden importa:
  primero el visitante ve que a otros les funcionó (prueba), luego lee de dónde
  sale el método (razón) y por último quién lo firma (persona). Puesta antes de
  los testimonios sería pedirle 450 palabras de lectura a alguien que todavía no
  tiene motivo para concederlas.

  ── DEVUELVE LA PÁGINA AL OSCURO ──

  Encima queda el panel crema (Beneficios + Testimonios) y debajo el retrato de
  Pilar sobre negro. Esta sección es la que cierra el tramo claro y devuelve el
  recorrido a su fondo natural, y por eso lleva el banner de la lluvia de código
  como fondo: es la textura de la marca y ata el bloque al resto de la página.

  ── EL BANNER TIENE UN PICO BLANCO ARRIBA, Y ESO NO ES UN DEFECTO ──

  banner-3-web.webp trae recortada una uve invertida blanca en su borde
  superior. Puesta debajo del panel crema, esa uve hace de empalme: el crema
  entra en la sección por el pico y se disuelve en el negro sin necesidad de un
  degradado. Por eso la imagen se ancla arriba (`bg-top`) y no se centra.

  ⚠️ EL COLOR DE LA UVE TIENE QUE SER EL DEL PANEL DE ENCIMA. Hoy coincide
  —blanco contra #fff8ef— y a esa escala la diferencia no se ve, pero si el
  panel cambia de tono habrá que retocar el archivo o el empalme cantará.

  ── EL LARGO SIGUE SIENDO EL PROBLEMA A RESOLVER ──

  Son unas 450 palabras en once párrafos. En una landing de captación, donde se
  escanea más de lo que se lee, un muro así se salta entero — y con él se va el
  único sitio donde se explica POR QUÉ existe esto. Cómo se reparte el texto,
  en OrigenCards.
*/
export function Origen() {
  return (
    <section
      aria-labelledby="origen-title"
      /* `overflow-x-clip` y no `hidden`: recorta lo que asome por los lados sin
         crear un contexto de scroll, que rompería cualquier `position: sticky`
         que se monte dentro más adelante. */
      className="relative isolate overflow-x-clip bg-background py-[clamp(4.5rem,3rem+7vh,8rem)] text-foreground"
    >
      {/* ── EL FONDO ──

          Va como imagen de fondo y no como <Image> a propósito: es una textura
          que se repite hacia abajo, no una fotografía con motivo. Un <Image>
          obligaría a fijarle alto y a decidir un recorte; así el navegador la
          ancla arriba y el resto lo pinta el negro de la sección, que es el
          mismo color en el que la imagen termina.

          `bg-cover` en escritorio y `bg-contain` en móvil: la imagen es
          apaisada, y en una pantalla vertical `cover` la ampliaría tanto que
          sólo se vería un trozo del centro — con lo que el pico blanco de
          arriba, que es lo que empalma con el panel, quedaría fuera de cuadro.

          La opacidad la baja a la mitad porque encima va texto: a plena
          intensidad los dígitos verdes compiten con los párrafos. Lo que se
          busca es que se intuya la textura, no leerla. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/volver-origen/public/Recursos/generales/banner-3-web.webp')] bg-contain bg-top bg-no-repeat opacity-50 sm:bg-cover"
      />

      {/* Fundido inferior: la imagen termina en su propio negro, pero si la
          sección es más alta que ella el canto se nota. Este degradado lo
          disuelve en el fondo antes de llegar al retrato de Pilar. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40"
        style={{
          backgroundImage:
            "linear-gradient(to top, var(--color-vo-black), transparent)",
        }}
      />

      <VoContainer className="relative">
        <ScrollIn>
          <SectionTitle id="origen-title" accent={ORIGEN.titleAccent} after="?">
            {ORIGEN.title}
          </SectionTitle>
        </ScrollIn>

        <OrigenCards />
      </VoContainer>
    </section>
  );
}
