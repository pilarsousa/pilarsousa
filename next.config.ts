import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 solo permite los valores de quality declarados acá; pedir uno
       fuera de la lista se ignora silenciosamente y sirve el default (75).
       90 es para el fondo del Hero de Volver al Origen, que se escala por encima
       de su tamaño real y no tiene margen para perder detalle. */
    qualities: [75, 90],
  },

  async redirects() {
    return [
      /* En el dominio de pauta, /ventas queda como alias técnico viejo: la URL
         pública/canónica es /. No hacerlo global: otros dominios pueden tener
         otra raíz. */
      {
        source: "/ventas",
        has: [{ type: "host", value: "lp.pilarsousa.es" }],
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
