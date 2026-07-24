/*
  Devuelve el país del visitante para preseleccionar el prefijo telefónico del
  formulario.

  Existe como endpoint, y no como lectura en el layout, a propósito: leer
  headers() en una página la vuelve dinámica y la saca del caché del CDN. Las
  landings deben seguir siendo estáticas — sólo quien abre el formulario paga
  esta petición, en lugar de todos los visitantes.

  El dato sale del header `x-vercel-ip-country`, que Vercel añade en su edge, así
  que no hay llamada a ningún servicio externo de geolocalización.
*/

/* Fallback cuando no hay header: en local no existe, y tampoco si el sitio se
   sirviera fuera de Vercel. España es el mercado principal de estas landings,
   así que conserva el comportamiento anterior. */
const DEFAULT_COUNTRY = "ES";

/* react-phone-number-input espera un ISO 3166-1 alpha-2 en mayúsculas; con
   cualquier otra cosa ignora el país o avisa por consola. */
const ISO_ALPHA2 = /^[A-Z]{2}$/;

export async function GET(request: Request) {
  const raw = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  const country = raw && ISO_ALPHA2.test(raw) ? raw : DEFAULT_COUNTRY;

  return Response.json(
    { country },
    {
      /* Cacheable en el edge por país: Vercel sirve la respuesta ya calculada a
         los siguientes visitantes de la misma región, en vez de ejecutar la
         función cada vez. */
      headers: {
        "Cache-Control": "public, s-maxage=86400",
        Vary: "x-vercel-ip-country",
      },
    },
  );
}
