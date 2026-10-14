import type { MetadataRoute } from "next";

/*
  Web manifest del sitio, compartido por todas las landings. Existe por los
  iconos: es de donde Android saca el de la pantalla de inicio, y de donde
  Windows y macOS sacan el del acceso directo cuando alguien instala la página
  desde Chrome o Edge.

  `display: "browser"` a propósito: esto son landings, no una aplicación. Con
  "standalone" Chrome ofrecería instalarlas y se abrirían sin barra de
  direcciones.

  Los iconos viven en /public/icons y los genera
  scripts/generate-favicons.mjs. El "maskable" es aparte porque Android lo
  recorta con la forma del tema del teléfono y sólo garantiza el 80% central:
  lleva el logotipo más pequeño sobre el verde del disco.
*/
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Volver al Origen | Pilar Sousa",
    short_name: "Volver al Origen",
    start_url: "/",
    display: "browser",
    background_color: "#013103",
    theme_color: "#013103",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
