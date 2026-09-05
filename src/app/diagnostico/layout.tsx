import type { Metadata } from "next";
import "./diagnostico.css";

/*
  Diagnóstico de frecuencia — el lead magnet, servido en /diagnostico.

  TRES RUTAS, UN SOLO EMBUDO:
    /diagnostico            landing de promesa
    /diagnostico/encuesta       formulario (3 pasos) + las 7 preguntas
    /diagnostico/resultado  frecuencia dominante + comunidad de WhatsApp

  ── POR QUÉ ESTE LAYOUT ESTÁ VACÍO ──

  Ni scroll suave, ni cursor propio, ni entradas de scroll: todo eso vive en el
  layout de /lista-de-espera y ahí tiene sentido, porque es un recorrido largo
  de ocho secciones que se lee de arriba abajo. Esto es lo contrario — once
  pantallas cortas que se sustituyen en el sitio, con un formulario en medio—,
  y cada una de esas piezas estorbaría: el scroll inercial pelea con el foco
  automático de los campos, y un cursor dibujado por JS tapa el punto de
  inserción del texto.

  El único añadido es el ámbito de la paleta, que trae los colores y las dos
  familias tipográficas.
*/

export const metadata: Metadata = {
  /*
    Favicon propio de esta ruta, con el logotipo nuevo de Pilar. El layout raíz
    emite el favicon.ico del sitio para todas las páginas; declararlo aquí es lo
    que hace que en /diagnostico gane éste.

    ⚠️ NO APUNTA AL ORIGINAL, sino a una copia de 128x128 (10 KB frente a los
    120 del archivo de 1254x1254). Un favicon se pide en cada página y Next NO
    optimiza lo que se referencia desde `metadata.icons`: se sirve tal cual
    desde /public.

    SI CAMBIA EL LOGOTIPO HAY QUE REGENERARLO, porque es una copia y no se
    entera sola:

      node -e "require('sharp')('public/diagnostico/contenido/logo/new-logo.png')
        .resize(128,128,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}})
        .png({compressionLevel:9}).toFile('public/diagnostico/favicon.png')"
  */
  icons: { icon: "/diagnostico/favicon.png" },
  title: "Descubre tu frecuencia dominante | Volver al Origen",
  description:
    "Un diagnóstico de 7 preguntas para descubrir qué frecuencia te está frenando, y el primer paso para cambiarla. Menos de 60 segundos.",
  /* ⚠️ noindex MIENTRAS SEA UN BOCETO. Los textos son provisionales, cuatro de
     las siete preguntas están sin confirmar y el branding no llegó: si Google
     lo indexa ahora, queda cacheada una versión en obras que además compite
     con las otras landings del dominio.

     SE RETIRA ANTES DE LANZAR — si no, la campaña apunta a una página que los
     buscadores tienen prohibido mostrar. */
  robots: { index: false, follow: false },
  openGraph: {
    title: "¿Qué frecuencia te está frenando?",
    description:
      "Haz el diagnóstico gratuito y recibe un video personalizado de Pilar con la solución exacta para elevar tu frecuencia.",
    type: "website",
    locale: "es_ES",
  },
};

export default function DiagnosticoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="dg-scope min-h-svh">{children}</div>;
}
