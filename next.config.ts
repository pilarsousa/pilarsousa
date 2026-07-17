import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16 solo permite los valores de quality declarados acá; pedir uno
       fuera de la lista se ignora silenciosamente y sirve el default (75).
       90 es para el fondo del Hero de Misión Origen, que se escala por encima
       de su tamaño real y no tiene margen para perder detalle. */
    qualities: [75, 90],
  },
};

export default nextConfig;
