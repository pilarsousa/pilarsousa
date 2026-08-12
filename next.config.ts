import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 solo permite los valores de quality declarados acá; pedir uno
       fuera de la lista se ignora silenciosamente y sirve el default (75).
       90 es para el fondo del Hero de Volver al Origen, que se escala por encima
       de su tamaño real y no tiene margen para perder detalle. */
    qualities: [75, 90],
  },

  async rewrites() {
    return [
      /* En el dominio de pauta la raíz sirve la landing de LISTA DE ESPERA de
         la tercera edición, no la de venta.

         Es un rewrite y no un redirect: la URL sigue siendo lp.pilarsousa.es/ y
         el visitante nunca ve /volver-al-origen. Con un redirect la barra de
         direcciones cambiaría y las URL de la pauta dejarían de coincidir con
         lo que se comparte.

         Condicionado por host, igual que el resto de reglas de este archivo:
         los demás dominios conservan la landing de venta en su raíz. */
      {
        source: "/",
        has: [{ type: "host", value: "lp.pilarsousa.es" }],
        destination: "/volver-al-origen",
      },
    ];
  },

  async redirects() {
    return [
      /* NOTA: aquí había un redirect de /ventas a / en el dominio de pauta,
         de cuando la raíz era la landing de venta. Se retiró al pasar la raíz
         a la lista de espera: mantenerlo habría mandado a quien buscara la
         página de venta a un formulario de espera, y habría dejado esa landing
         inalcanzable en ese dominio. Ahora /ventas la sirve directamente. */
      /* La gracias del Bootcamp se movió a /bootcamp/gracias. El checkout de
         Stripe todavía puede apuntar a /gracias: esta red de seguridad evita
         que el comprador caiga en un 404 tras pagar. Quitar una vez que la URL
         de éxito del checkout esté actualizada a /bootcamp/gracias. */
      {
        source: "/gracias",
        destination: "/bootcamp/gracias",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
