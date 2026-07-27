import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 solo permite los valores de quality declarados acá; pedir uno
       fuera de la lista se ignora silenciosamente y sirve el default (75).
       90 es para el fondo del Hero de Misión Origen, que se escala por encima
       de su tamaño real y no tiene margen para perder detalle. */
    qualities: [75, 90],
  },

  async redirects() {
    return [
      /* lp.pilarsousa.es es el dominio de la landing de ventas. Quien entre a su
         raíz se envía a /ventas, para que ese dominio muestre la landing de
         ventas directamente (útil en pauta). El `has` de host acota el redirect
         SOLO a ese dominio: registro.pilarsousa.es y el resto NO se ven
         afectados y siguen sirviendo la raíz (Misión Origen). Temporal (307)
         para no cachearlo por si el mapeo de dominios cambia. */
      {
        source: "/",
        has: [{ type: "host", value: "lp.pilarsousa.es" }],
        destination: "/ventas",
        permanent: false,
      },
      /* Misión Origen pasó a la raíz (/); antes vivía en /mision-origen y esa
         URL puede estar en campañas/pauta. Temporal (307, no se cachea) por si
         más adelante se quiere /mision-origen para otra cosa. */
      {
        source: "/mision-origen",
        destination: "/",
        permanent: false,
      },
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
