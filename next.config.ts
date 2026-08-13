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
    /* beforeFiles, y NO la lista suelta que devuelve rewrites() por defecto.

       Esa lista corresponde a "afterFiles": se evalúa DESPUÉS de las rutas del
       sistema de archivos, así que sólo sirve para URLs que no existen. Como /
       sí existe —la sirve (ventas-root)— la regla no llegaba a aplicarse nunca
       y el dominio de pauta seguía mostrando la landing de venta.

       beforeFiles se evalúa antes que los archivos, que es lo que hace falta
       para sustituir una ruta que ya existe. */
    return {
      beforeFiles: [
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

        /* La misma landing, además, bajo un slug con nombre.

           La raíz sigue sirviéndola: esto NO la sustituye, se suma. Son dos
           puertas a la misma página, para poder repartir tráfico de pauta con
           una URL que se explica sola cuando se comparte por WhatsApp o se lee
           en pantalla.

           También es rewrite y no redirect, por lo mismo que la regla de
           arriba: la URL que ve el visitante es la que se compartió, y no salta
           a /volver-al-origen a mitad de camino.

           El alias sin el ".0" existe porque algunos gestores de anuncios,
           acortadores y clientes de correo cortan una URL al encontrar un punto
           seguido de dígitos —lo leen como extensión de archivo— y dejarían el
           enlace roto. Las dos formas llevan al mismo sitio, así que da igual
           cuál se pegue.

           Sin condición de host, a diferencia de la raíz: el slug es
           inequívoco y no pisa ninguna ruta existente, así que puede
           responder también en el dominio principal. */
        {
          source: "/lista-de-espera-3.0",
          destination: "/volver-al-origen",
        },
        {
          source: "/lista-de-espera-3",
          destination: "/volver-al-origen",
        },

        /* La página de gracias bajo el mismo slug.

           Sin esto, quien entra por /lista-de-espera-3.0 y se registra aterriza
           en /volver-al-origen/gracias: funciona, pero deja a la vista la ruta
           interna que el rewrite existe para ocultar, y rompe la familia de
           URL a mitad del recorrido. */
        {
          source: "/lista-de-espera-3.0/gracias",
          destination: "/volver-al-origen/gracias",
        },
        {
          source: "/lista-de-espera-3/gracias",
          destination: "/volver-al-origen/gracias",
        },
      ],
    };
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
