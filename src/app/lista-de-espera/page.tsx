import { Hero } from "@/components/lista-de-espera/sections/Hero";
import { PanelCodigo } from "@/components/lista-de-espera/sections/PanelCodigo";
import { QueEntrenas } from "@/components/lista-de-espera/sections/QueEntrenas";
import { Experiencia } from "@/components/lista-de-espera/sections/Experiencia";
import { Resenas } from "@/components/lista-de-espera/sections/Resenas";
import { Pilar } from "@/components/lista-de-espera/sections/Pilar";
import { ListaEspera } from "@/components/lista-de-espera/sections/ListaEspera";
import { Faq } from "@/components/lista-de-espera/sections/Faq";
import { Footer } from "@/components/lista-de-espera/sections/Footer";

/*
  Landing de lista de espera — rediseño de la 3.ª edición, en /lista-de-espera.

  EN CONSTRUCCIÓN. El diseño anterior se retiró entero y la página se está
  rehaciendo sobre el montaje nuevo, sección a sección. Montadas hasta ahora:

    01 Hero                ✓
    02 Diagnóstico         ✓ ┐ comparten banner-2 y por eso van las dos
    03 Es para vos si      ✓ ┘ dentro de PanelCodigo, no sueltas aquí
    04 Qué vas a entrenar  ✓
    05 Una experiencia     ◐ montada la mitad de arriba; falta la banda de las
                             tres áreas, que ocupa el 40% inferior del banner
    06 Testimonios         ✓
    07 Quién es Pilar      ✓
    08 Entrá ahora a la lista ✓
    FAQ                    ✓

  EL FONDO DE LA PÁGINA ES BLANCO, al revés que en el diseño anterior. Cada
  sección trae su propio banner con los cortes diagonales ya dibujados y con
  zonas transparentes; lo que asoma por ellas es este blanco. Un fondo oscuro
  global —como el que había— taparía justo eso.

  Los ANCESTROS de la sección 4 no pueden llevar `overflow` distinto de
  `visible`: sus cards usan `position: sticky`, que deja de funcionar sin avisar
  en cuanto un ancestro recorta. Las secciones hermanas sí pueden recortar su
  propio eje X cuando un asset decorativo sangra fuera del viewport.

  El Footer se mantiene montado para que la página no quede sin cierre mientras
  se construye; su diseño se revisará al llegar a él.
*/
export default function ListaDeEsperaPage() {
  return (
    <>
      <main className="bg-white">
        <Hero />
        <PanelCodigo />
        <QueEntrenas />
        <Experiencia />
        <Resenas />
        <Pilar />
        <ListaEspera />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
