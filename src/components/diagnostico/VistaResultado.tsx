"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  FICHA_FRECUENCIA,
  FRECUENCIAS,
  LANDING,
  RESULTADO,
  type Frecuencia,
} from "@/components/diagnostico/contenido";
import { leerResultado } from "@/components/diagnostico/almacen";
import { useHidratado } from "@/components/diagnostico/useHidratado";
import { BotonDg } from "@/components/diagnostico/ui/BotonDg";
import { RepartoDesplegable } from "@/components/diagnostico/ui/RepartoDesplegable";
import { WhatsAppIcon } from "@/components/lista-de-espera/ui/WhatsAppIcon";

/*
  ═══════════════════════════════════════════════════════════════════════════
  PÁGINA DE RESULTADOS — los dos pasos que pide el documento
  ═══════════════════════════════════════════════════════════════════════════

    Paso 1 · "Tu frecuencia dominante es [X]" + el aviso del email.
    Paso 2 · La invitación a la comunidad de WhatsApp.

  Van uno debajo del otro en la misma pantalla y no en dos vistas: el visitante
  ya convirtió, y obligarle a pulsar "siguiente" para llegar al único botón que
  importa es una puerta de más entre él y el grupo.

  ── DE DÓNDE SALE EL RESULTADO ──

  Dos fuentes, en este orden:

  1. sessionStorage, que trae además el nombre y el email para poder
     personalizar el aviso.
  2. El parámetro `f` de la URL, como red por si el almacenamiento está
     bloqueado (Safari en privado, cookies de terceros denegadas).

  Se lee `window.location.search` a mano en vez de con `useSearchParams`
  a propósito: ese hook obliga a envolver el componente en <Suspense> y a que
  la ruta se renderice de forma dinámica. Aquí ya estamos en el navegador y
  dentro de un efecto, así que no aporta nada y sí cuesta.

  MANIPULAR LA URL NO SIRVE DE NADA, y conviene saber por qué no es un agujero:
  cambiar `?f=` sólo cambia el rótulo que ve quien lo cambió. El video lo manda
  el CRM a partir de lo que el servidor calculó con las respuestas reales.

  ── POR QUÉ NO SE LEE EN UN EFECTO ──

  El servidor no tiene sessionStorage, así que el dato no puede formar parte
  del HTML que se manda ni del primer render del navegador: React descartaría
  el árbol con un error de hidratación.

  La salida no es un efecto que ponga el estado —eso encadena un render de más
  y hace parpadear el estado "no tenemos tu diagnóstico" antes del resultado—
  sino un inicializador perezoso de useState, que corre una sola vez y deja el
  estado ya resuelto, más useHidratado() para no pintar nada hasta que el HTML
  del servidor ya no tenga que coincidir con nada.
*/

function esFrecuencia(valor: string): valor is Frecuencia {
  return (FRECUENCIAS as readonly string[]).includes(valor);
}

type Resuelto = {
  frecuencia: Frecuencia | null;
  nombre: string;
  email: string;
  /* El reparto de las 7 respuestas entre las 4 frecuencias, para dibujar el
     medición. Llega vacío cuando el resultado se recupera de la URL: allí sólo
     viaja la dominante. */
  porcentajes: Record<string, number>;
};

/* Corre también en el servidor, donde no existen sessionStorage ni window:
   leerResultado() captura su propia excepción, y el acceso a window va dentro
   de un try. En los dos casos sale el resultado vacío, que es lo correcto. */
function resolverResultado(): Resuelto {
  const guardado = leerResultado();
  if (guardado && esFrecuencia(guardado.frecuencia)) {
    return {
      frecuencia: guardado.frecuencia,
      nombre: guardado.nombre,
      email: guardado.email,
      porcentajes: guardado.porcentajes,
    };
  }

  try {
    const desdeUrl = new URLSearchParams(window.location.search).get("f");
    if (desdeUrl && esFrecuencia(desdeUrl)) {
      /* Por la URL sólo viaja la frecuencia: sin nombre, sin email y sin
         reparto. El aviso se muestra en su versión impersonal y la medición
         no se dibuja — no hay con qué. */
      return { frecuencia: desdeUrl, nombre: "", email: "", porcentajes: {} };
    }
  } catch {
    /* Sin window (servidor). */
  }

  return { frecuencia: null, nombre: "", email: "", porcentajes: {} };
}

export function VistaResultado() {
  const hidratado = useHidratado();
  const [{ frecuencia, nombre, email, porcentajes }] =
    useState<Resuelto>(resolverResultado);

  /* Primer fotograma: nada. Enseñar el estado "no tenemos tu diagnóstico" y
     sustituirlo un instante después por el resultado sería peor que esperar
     ese instante. */
  if (!hidratado) return <div className="min-h-[60svh]" aria-hidden />;

  /* ── Sin resultado: alguien abrió el enlace sin haber hecho el test ── */
  if (!frecuencia) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-md items-center px-5 py-20 text-center">
        <div className="rounded-3xl border border-[var(--dg-borde)] bg-[color-mix(in_srgb,var(--dg-fondo-alto)_88%,transparent)] p-6 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.95)]">
          <h1 className="dg-titulo text-[1.5rem] text-[var(--dg-texto)] sm:text-[1.8rem]">
            {RESULTADO.sinResultadoTitulo}
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--dg-texto-suave)]">
            {RESULTADO.sinResultadoTexto}
          </p>
          <div className="mt-8 flex justify-center">
            <BotonDg href="/diagnostico/encuesta">
              {RESULTADO.sinResultadoCta}
            </BotonDg>
          </div>
        </div>
      </div>
    );
  }

  const ficha = FICHA_FRECUENCIA[frecuencia];
  const hayWhatsapp = RESULTADO.whatsappUrl.length > 0;

  /* La medición sólo se puede dibujar con el reparto completo, y eso vive en
     el almacenamiento. Quien llegue con el resultado recuperado de la URL ve
     la página a una columna: es preferible a unas barras inventadas. */
  const hayReparto = Object.keys(porcentajes).length > 0;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:py-14">
      {/* ── LA TARJETA DEL DIAGNÓSTICO MIDE LO MISMO QUE LAS DE ABAJO ──

          Iba a 48rem centrada mientras el resto de la pantalla iba a 64rem, y
          eso era el desorden: cuatro tarjetas con tres cantos distintos: el de
          esta, el de la columna izquierda y el de la derecha. Nada alineaba con
          nada.

          A 64rem las cuatro comparten los dos cantos verticales y la retícula
          se lee de una pieza.

          El texto no se estira con ella: los párrafos de dentro llevan su
          propio `max-w-xl`, así que la línea sigue midiendo lo que se lee
          cómodo. Lo que crece es la caja, no la medida del texto. */}
      {/* ── LA TARJETA VA EN CLARO SOBRE EL VERDE DE LA PÁGINA ──

          El fondo de esta ruta ya es verde profundo, y una tarjeta verde oscuro
          encima se levantaba muy poco: el resultado —lo único que el visitante
          vino a buscar— pesaba lo mismo que el aviso del correo.

          En crema se despega del fondo sin necesidad de más adorno. Lo hace
          .dg-claro, que NO pinta colores sino que redefine los tokens dentro de
          la caja: el markup de dentro sigue escrito contra --dg-texto y
          --dg-acento igual que antes, y son esas variables las que cambian de
          valor. Ver diagnostico.css.

          ⚠️ POR ESO NO SE PUEDE METER AQUÍ NINGÚN `text-*` LITERAL: una utilidad
          con color propio gana a la variable y se quedaría crema sobre crema. */}
      <section className="dg-entra text-center">
        <div className="dg-borde-giro rounded-[calc(2rem+1px)] p-px">
          <div
            /* La luz del fondo va en verde y no en crema: dentro de .dg-claro
               los tokens están dados la vuelta, y un halo crema sobre una
               superficie crema no se vería. Es la misma pieza que llevan las
               tarjetas de la landing, con el color que le toca aquí. */
            style={
              {
                "--dg-aurora-luz": "rgba(8, 74, 44, 0.14)",
                "--dg-aurora-luz-2": "rgba(0, 47, 1, 0.09)",
              } as CSSProperties
            }
            className="dg-claro dg-relieve-claro dg-aurora relative overflow-hidden rounded-[2rem] px-5 py-8 sm:px-8 sm:py-10"
          >
            {/* El barrido diagonal ahora es verde muy diluido, porque el token
                del brillo se da la vuelta con el resto: un halo crema sobre una
                superficie crema no se vería. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,var(--dg-brillo-suave)_0%,transparent_34%,transparent_72%,var(--dg-brillo-suave)_100%)]"
            />

            <div className="relative">
              {/* El tilde antes que nada. Quien llega acaba de dejar sus datos y lo
            primero que necesita saber, antes que su resultado, es que el envío
            salió bien. */}
              <span
                aria-hidden
                /* El disco entra y el tilde se traza dentro, en ese orden. Es el
               único momento del embudo en que hay algo que confirmar, y un
               tilde ya puesto se lo salta. Ver .dg-check en diagnostico.css. */
                /* EL DISCO SE INVIERTE CON LA TARJETA: relleno verde y tilde crema.
               Sobre el crema, un tilde en el acento —que aquí ya es verde—
               dibujado sobre la propia superficie se leería, pero flojo. En
               negativo es lo más contrastado de la caja después del nombre de
               la frecuencia, que es la jerarquía que toca. */
                className="dg-check mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--dg-acento)] text-[var(--dg-acento-oscuro)] shadow-[0_10px_24px_-12px_var(--dg-brillo-fuerte)]"
              >
                <Check className="size-7" strokeWidth={2.6} />
              </span>

              <p className="mt-6 text-[0.72rem] tracking-[0.18em] text-[var(--dg-texto-tenue)] uppercase">
                {RESULTADO.etiqueta}
                {/* El nombre sólo aparece si lo tenemos. Con el resultado recuperado
              de la URL no hay nombre, y un "Hola, ." delata la costura. */}
                {nombre && ` · ${nombre}`}
              </p>

              <h1 className="dg-titulo mt-3 text-[1.35rem] leading-tight text-[var(--dg-texto)] sm:text-[1.8rem]">
                {RESULTADO.titulo}
              </h1>

              {/* EL NOMBRE DE LA FRECUENCIA ES LO MÁS GRANDE DE LA PÁGINA. Es la
            única información que el visitante vino a buscar; todo lo demás
            —el tilde, el aviso del email, el grupo— existe alrededor de esta
            palabra. */}
              {/* ⚠️ SIN CLASE DE COLOR: .dg-luz-texto pinta la palabra con un
              degradado recortado a las letras y el color en transparente. Un
              `text-[...]` aquí ganaría en la hoja, devolvería el color plano y
              el barrido desaparecería sin que se entienda por qué.

              .dg-luz-oscura es lo que lo hace posible sobre la tarjeta clara:
              el barrido de serie está construido con cremas y aquí las letras
              se habrían quedado invisibles. No sustituye a .dg-luz-texto, la
              acompaña — de la base vienen el recorte y la animación, y de ésta
              sólo el degradado. */}
              <p className="dg-titulo dg-luz-texto dg-luz-oscura mt-2 text-[3rem] leading-none font-bold sm:text-[4.4rem]">
                {ficha.titulo}
              </p>

              <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-[var(--dg-texto)] sm:text-[1.1rem]">
                {ficha.resumen}
              </p>

              <p className="mx-auto mt-3 max-w-xl text-[0.92rem] leading-relaxed text-[var(--dg-texto-suave)]">
                {ficha.descripcion}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2 text-[0.68rem] font-semibold tracking-[0.12em] uppercase">
                <span className="rounded-full border border-[var(--dg-borde)] bg-[var(--dg-superficie)] px-3 py-1.5 text-[var(--dg-texto-suave)]">
                  7 respuestas analizadas
                </span>
                <span className="rounded-full border border-[var(--dg-borde-vivo)] bg-[var(--dg-superficie-viva)] px-3 py-1.5 text-[var(--dg-acento-vivo)]">
                  Diagnóstico listo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LA COMPOSICIÓN CAMBIÓ CON EL DESPLEGABLE ──

          Era una retícula de dos columnas: el reparto a la izquierda y, a la
          derecha, el aviso del correo y el cierre apilados. Funcionaba mientras
          el reparto eran cuatro barras siempre visibles, porque medía parecido
          a la columna de al lado.

          Plegado mide 90 px, y esa columna pasó a ser una barra con medio metro
          de vacío debajo. Peor: al desplegarse cambia de alto, así que NINGUNA
          altura fija podía cuadrar los dos estados a la vez.

          Ahora manda la forma de cada pieza. El desplegable es una BANDA —ancha
          y baja, con un botón que cruza de canto a canto— y va a todo el ancho,
          debajo del diagnóstico. El aviso y el cierre, que sí son dos bloques de
          tamaño parecido, se reparten las dos columnas de la fila siguiente.

          Y de paso el orden mejora: reparto (el detalle del resultado), luego
          las dos cosas que quedan por hacer. Antes el cierre —lo único que hay
          que pulsar— caía en la esquina inferior derecha, que es justo donde no
          se mira.

          El margen superior iguala al hueco de la retícula (mt-5 = gap-5) para
          que todas las separaciones del bloque midan lo mismo. */}
      <div className="mx-auto mt-5 flex w-full max-w-5xl flex-col gap-5">
        {/* ── EL REPARTO YA NO ESTÁ A LA VISTA: SE DESPLIEGA ──

            Las cuatro barras competían con el nombre de la frecuencia a dos
            palmos de él. El resultado es UNA palabra; el reparto es el detalle
            de cómo se llegó a ella, y un detalle que se consulta no tiene por
            qué ocupar media pantalla desde el principio.

            El comentario va FUERA del `&&`: dentro sería un segundo hijo en una
            expresión que sólo admite uno, y no compila. */}
        {hayReparto && (
          <RepartoDesplegable
            porcentajes={porcentajes}
            dominante={frecuencia}
            titulo={RESULTADO.repartoTitulo}
          />
        )}

        {/* ── LAS DOS TARJETAS QUE QUEDAN, A LA PAR ──

            `items-stretch` (el valor por defecto de la retícula, escrito aquí
            porque importa) es lo que las hace terminar a la misma altura: el
            aviso son tres renglones y el cierre lleva botón, así que sin esto
            una acabaría antes que la otra y el canto inferior quedaría en
            diagonal.

            En móvil se apilan, y ahí el orden es el que ya tenían: primero el
            correo, después el grupo. */}
        <div
          className={cn(
            "grid items-stretch gap-5",
            /* A una sola columna cuando no hay reparto que enseñar: con la
               página ya estrecha, dos tarjetas a la par se quedarían
               demasiado justas. */
            hayReparto ? "lg:grid-cols-2" : "mx-auto max-w-2xl",
          )}
        >
          {/* ── El aviso del email ──
          Va en su propia caja, separado del diagnóstico: es una instrucción
          ("ve a revisar tu bandeja"), no parte del resultado, y mezclarlos
          hace que se lea por encima. */}
          {/* ── EL ICONO ARRIBA Y EN UN DISCO, NO AL COSTADO ──

            Iba suelto a la izquierda del texto, y eso lo dejaba en el papel de
            viñeta: un adorno de 20 px pegado al margen del párrafo.

            Centrado y sobre un disco de acento pasa a ser el encabezado de la
            tarjeta — lo primero que se ve, y lo que dice de qué va la caja
            antes de leer una palabra. De paso emparja con el disco del tilde de
            arriba: los dos discos, misma familia. */}
          {/* La columna en flex y centrada, por lo mismo que la tarjeta del
            cierre: si ésta es la más corta de las dos, el aire sobrante se
            reparte arriba y abajo en vez de dejar el texto colgando del borde
            superior con un hueco debajo. */}
          <section className="dg-claro dg-relieve-claro flex flex-col justify-center rounded-3xl p-5 text-center sm:p-6">
            <span
              aria-hidden
              className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--dg-acento)] text-[var(--dg-acento-oscuro)] shadow-[0_10px_24px_-12px_var(--dg-brillo-fuerte)]"
            >
              <Mail className="size-5" strokeWidth={1.9} />
            </span>

            <div className="mt-4">
              <p className="mx-auto max-w-sm text-[0.95rem] leading-relaxed text-[var(--dg-texto)]">
                {RESULTADO.emailAviso}
              </p>
              {/* El email, si lo tenemos, sirve para dos cosas a la vez: confirma
              que se escribió bien y dice exactamente dónde mirar.
              `break-words` porque un correo largo desborda la caja en un
              móvil estrecho. */}
              {email && (
                <p className="mt-2 text-[0.85rem] font-semibold break-words text-[var(--dg-acento)]">
                  {email}
                </p>
              )}
              <p className="mx-auto mt-2.5 max-w-sm text-[0.8rem] leading-relaxed text-[var(--dg-texto-tenue)]">
                {RESULTADO.emailNota}
              </p>
            </div>

            {/* ⚠️ SIN DECIDIR (sección 8 del documento): si va o no un botón que
            abra el correo. Se controla desde contenido.ts sin tocar esto.

            Mi opinión, para cuando se decida: en escritorio un botón "abrir mi
            correo" no puede saber qué cliente usa la persona, y mandar a
            gmail.com a quien usa Outlook es peor que no poner nada. */}
            {RESULTADO.mostrarBotonMail && (
              <div className="mt-4">
                <BotonDg href="https://mail.google.com" variante="secundario">
                  {RESULTADO.mailCta}
                </BotonDg>
              </div>
            )}
          </section>

          {/* ═════════ PASO 2 — la comunidad ═════════

            ── ES LO ÚNICO QUE QUEDA POR HACER, Y SE NOTA ──

            Las otras dos tarjetas informan: aquí está tu resultado, mirá el
            correo. Ésta pide una acción, y es la última del embudo entero — si
            pesa lo mismo que las de al lado, se lee como un tercer apartado y
            no como el final.

            Se queda EN OSCURO mientras las otras dos van en crema, y ése es el
            primer golpe: en una pantalla que ya se ha vuelto clara, la caja
            oscura es la que resalta. Encima lleva el borde con la luz girando
            (.dg-borde-vivo-anim), que es lo que la separa de "una tarjeta más
            marcada": no dice "esto importa", dice "esto te está esperando".

            ⚠️ EL REDONDEO DE FUERA ES EL DE DENTRO + 1px, que es el grosor del
            borde. Con el mismo valor, la curva exterior cae por dentro de la
            interior y el filo se ve más fino en las esquinas. */}
          {/* `flex` en el marco y `w-full` + centrado en la tarjeta: es lo que
            hace que el relleno de 1 px se estire a la altura de la columna y la
            tarjeta de dentro con él. Sin el flex, la tarjeta mide su contenido y
            el marco queda más alto que ella — con una franja del degradado
            asomando por abajo.

            El centrado vertical reparte el aire sobrante entre el titular y el
            botón cuando esta tarjeta es la más corta de las dos. */}
          <div className="dg-borde-vivo-anim flex rounded-[calc(1.5rem+1px)] p-px">
            <section className="relative flex w-full flex-col justify-center overflow-hidden rounded-3xl bg-[var(--dg-fondo-alto)] p-6 text-center sm:p-7">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,var(--dg-brillo-suave)_0%,transparent_40%,transparent_60%,var(--dg-brillo-suave)_100%)]"
              />

              <div className="relative">
                {/* El latido y no el barrido: el nombre de la frecuencia está en
              esta misma pantalla, y repetir el mismo recurso a dos palmos haría
              que ninguno de los dos señalara nada. */}
                {/* Sin .dg-latido: el titular se queda quieto. Ver la nota del pulso
              del botón, aquí debajo. */}
                <h2 className="dg-titulo text-[1.15rem] text-[var(--dg-texto)] sm:text-[1.3rem]">
                  {RESULTADO.comunidadTitulo}
                </h2>
                <p className="mx-auto mt-2.5 max-w-md text-[0.93rem] leading-relaxed text-[var(--dg-texto-suave)]">
                  {RESULTADO.comunidadTexto}
                </p>

                <div className="mt-6 flex justify-center">
                  {hayWhatsapp ? (
                    <BotonDg
                      href={RESULTADO.whatsappUrl}
                      /* ⚠️ SIN .dg-pulso, y no sólo por quitar adorno: ese pulso vivía
                   en un ::after del botón, y BotonDg usa ahora ::before y ::after
                   para su propio latido. Las dos reglas se peleaban por la misma
                   capa. El botón ya late por su cuenta, igual que en la landing. */
                      className="sm:min-w-[18rem]"
                    >
                      <span className="inline-flex items-center justify-center gap-2.5">
                        <WhatsAppIcon className="size-5 shrink-0" />
                        {RESULTADO.comunidadCta}
                      </span>
                    </BotonDg>
                  ) : (
                    /* Sin enlace configurado, el botón va desactivado. Es preferible a
               mandar a un enlace roto justo después de convertir. */
                    <BotonDg disabled className="sm:min-w-[18rem]">
                      {RESULTADO.comunidadCta}
                    </BotonDg>
                  )}
                </div>

                {/* ⚠️ AQUÍ HABÍA UN AVISO —"Enlace del grupo pendiente de
              configurar"— y se retiró. Era una nota para nosotros que se
              colaba en la pantalla del visitante: no le dice nada que pueda
              hacer, y encima aparecía justo en el momento de más confianza,
              después de convertir.

              El botón desactivado sí se queda: si algún día se vacía el
              enlace, es mejor un botón que no lleva a ningún sitio que uno que
              lleva a un enlace roto. Que esté apagado ya lo cuenta todo. */}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ── EL PIE, QUE AQUÍ NO ESTABA ──

          La landing lo tiene y esta pantalla no, y el corte se veía: la página
          terminaba en el borde inferior de la última tarjeta, sin cerrar.

          Es el mismo pie de la landing —la frase de marca en versalitas y el
          aviso de copyright—, y va exactamente igual de escueto: sin enlaces,
          por el mismo motivo por el que no hay menú. Cada enlace es una salida,
          y aquí más que en ningún sitio: el visitante ya convirtió y lo único
          que queda es que pulse el botón del grupo.

          Va dentro del contenedor y no fuera porque esta vista se monta dentro
          del <main> de la página; sacarlo de aquí obligaría a que resultado/
          page.tsx supiera de la existencia del pie. */}
      <footer className="mt-16 border-t border-[var(--dg-borde)]/50 pt-8 text-center">
        <p className="dg-titulo text-[0.9rem] leading-snug tracking-[0.14em] text-balance text-[var(--dg-texto-suave)] uppercase">
          {LANDING.tagline}
        </p>
        <p className="mt-3 text-xs text-[var(--dg-texto-tenue)]">
          © {new Date().getFullYear()} Volver al Origen · Pilar Sousa
        </p>
      </footer>
    </div>
  );
}
