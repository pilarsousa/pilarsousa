"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  FICHA_FRECUENCIA,
  FRECUENCIAS,
  RESULTADO,
  type Frecuencia,
} from "@/components/diagnostico/contenido";
import { leerResultado } from "@/components/diagnostico/almacen";
import { useHidratado } from "@/components/diagnostico/useHidratado";
import { BotonDg } from "@/components/diagnostico/ui/BotonDg";
import { MedicionFrecuencias } from "@/components/diagnostico/ui/MedicionFrecuencias";
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
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <h1 className="dg-titulo text-[1.5rem] text-[var(--dg-texto)] sm:text-[1.8rem]">
          {RESULTADO.sinResultadoTitulo}
        </h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--dg-texto-suave)]">
          {RESULTADO.sinResultadoTexto}
        </p>
        <div className="mt-8 flex justify-center">
          <BotonDg href="/analisis/encuesta">
            {RESULTADO.sinResultadoCta}
          </BotonDg>
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
    <div
      className={cn(
        "mx-auto px-5 py-12 sm:py-16",
        hayReparto ? "max-w-4xl" : "max-w-2xl",
      )}
    >
      {/* ═════════ PASO 1 — el diagnóstico ═════════

          Con reparto son dos columnas: la medición a la izquierda y el
          diagnóstico a la derecha. En móvil se apilan, y AHÍ EL ORDEN SE
          INVIERTE — el diagnóstico primero. Es lo que la persona vino a buscar;
          el desglose explica el resultado, así que no puede llegar antes que
          él. En escritorio caben los dos a la vez y la medición se lee como el
          soporte de lo que dice el titular de al lado. */}
      <section
        className={cn(
          "grid gap-9",
          hayReparto && "md:grid-cols-2 md:items-center md:gap-10",
        )}
      >
        {hayReparto && (
          <div className="order-2 md:order-1">
            <MedicionFrecuencias
              porcentajes={porcentajes}
              dominante={frecuencia}
            />
          </div>
        )}

        <div className="order-1 text-center md:order-2">
          {/* El tilde antes que nada. Quien llega acaba de dejar sus datos y lo
            primero que necesita saber, antes que su resultado, es que el envío
            salió bien. */}
          <span
            aria-hidden
            /* El disco entra y el tilde se traza dentro, en ese orden. Es el
               único momento del embudo en que hay algo que confirmar, y un
               tilde ya puesto se lo salta. Ver .dg-check en analisis.css. */
            className="dg-check mx-auto flex size-14 items-center justify-center rounded-full border border-[var(--dg-acento)]/40 bg-[var(--dg-fondo-alto)] text-[var(--dg-acento-vivo)]"
          >
            <Check className="size-7" strokeWidth={2.6} />
          </span>

          <p className="mt-6 text-[0.72rem] tracking-[0.18em] text-[var(--dg-texto-tenue)] uppercase">
            {RESULTADO.etiqueta}
            {/* El nombre sólo aparece si lo tenemos. Con el resultado recuperado
              de la URL no hay nombre, y un "Hola, ." delata la costura. */}
            {nombre && ` · ${nombre}`}
          </p>

          <h1 className="dg-titulo mt-3 text-[1.35rem] leading-tight text-[var(--dg-texto)] sm:text-[1.7rem]">
            {RESULTADO.titulo}
          </h1>

          {/* EL NOMBRE DE LA FRECUENCIA ES LO MÁS GRANDE DE LA PÁGINA. Es la
            única información que el visitante vino a buscar; todo lo demás
            —el tilde, el aviso del email, el grupo— existe alrededor de esta
            palabra. */}
          {/* ⚠️ SIN CLASE DE COLOR: .dg-luz-texto pinta la palabra con un
              degradado recortado a las letras y el color en transparente. Un
              `text-[...]` aquí ganaría en la hoja, devolvería el color plano y
              el barrido desaparecería sin que se entienda por qué. */}
          <p className="dg-titulo dg-luz-texto mt-2 text-[2.6rem] leading-none font-bold sm:text-[3.4rem]">
            {ficha.titulo}
          </p>

          <p className="mx-auto mt-5 max-w-lg text-[1rem] leading-relaxed text-[var(--dg-texto)] sm:text-[1.08rem]">
            {ficha.resumen}
          </p>

          <p className="mx-auto mt-3 max-w-lg text-[0.92rem] leading-relaxed text-[var(--dg-texto-suave)]">
            {ficha.descripcion}
          </p>
        </div>
      </section>

      {/* Las dos cajas de abajo NO se ensanchan con la cabecera. Aunque la
          página pase a 64rem para que quepan la medición y el diagnóstico, un
          párrafo de aviso a ese ancho se lee mal: la línea se hace tan larga
          que el ojo pierde el renglón al volver. */}
      <div className="mx-auto max-w-2xl">
        {/* ── El aviso del email ──
          Va en su propia caja, separado del diagnóstico: es una instrucción
          ("andá a revisar tu casilla"), no parte del resultado, y mezclarlos
          hace que se lea por encima. */}
        <section className="mt-9 rounded-2xl border border-[var(--dg-borde)] bg-[var(--dg-fondo-alto)] p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <span
              aria-hidden
              className="mt-0.5 shrink-0 text-[var(--dg-acento)]"
            >
              <Mail className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.95rem] leading-relaxed text-[var(--dg-texto)]">
                {RESULTADO.emailAviso}
              </p>
              {/* El email, si lo tenemos, sirve para dos cosas a la vez: confirma
                que se escribió bien y dice exactamente dónde mirar.
                `break-words` porque un correo largo desborda la caja en un
                móvil estrecho. */}
              {email && (
                <p className="mt-1.5 text-[0.85rem] break-words text-[var(--dg-acento)]">
                  {email}
                </p>
              )}
              <p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--dg-texto-tenue)]">
                {RESULTADO.emailNota}
              </p>
            </div>
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

        {/* ═════════ PASO 2 — la comunidad ═════════ */}
        <section className="mt-6 rounded-2xl border border-[var(--dg-acento)]/25 bg-[var(--dg-fondo-alto)] p-6 text-center sm:p-7">
          {/* El latido y no el barrido: el nombre de la frecuencia está en
              esta misma pantalla, y repetir el mismo recurso a dos palmos haría
              que ninguno de los dos señalara nada. */}
          <h2 className="dg-titulo dg-latido text-[1.15rem] text-[var(--dg-texto)] sm:text-[1.3rem]">
            {RESULTADO.comunidadTitulo}
          </h2>
          <p className="mx-auto mt-2.5 max-w-md text-[0.93rem] leading-relaxed text-[var(--dg-texto-suave)]">
            {RESULTADO.comunidadTexto}
          </p>

          <div className="mt-6 flex justify-center">
            {hayWhatsapp ? (
              <BotonDg
                href={RESULTADO.whatsappUrl}
                /* El pulso vive en un ::after del botón, no en su box-shadow:
                   animar esa propiedad aquí sustituiría el brillo interior y la
                   sombra que le dan cuerpo. Ver .dg-pulso. */
                className="dg-pulso sm:min-w-[18rem]"
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
        </section>
      </div>
    </div>
  );
}
