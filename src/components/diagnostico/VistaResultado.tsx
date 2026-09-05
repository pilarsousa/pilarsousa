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
      <div className="mx-auto flex min-h-[70svh] max-w-md items-center px-5 py-20 text-center">
        <div className="rounded-3xl border border-[var(--dg-borde)] bg-[color-mix(in_srgb,var(--dg-fondo-alto)_88%,transparent)] p-6 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.95)]">
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
      <section className="dg-entra text-center">
        <div className="dg-borde-giro rounded-[calc(2rem+1px)] p-px">
          <div className="dg-relieve relative overflow-hidden rounded-[2rem] bg-[var(--dg-fondo-alto)] px-5 py-8 sm:px-8 sm:py-10">
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
              el barrido desaparecería sin que se entienda por qué. */}
          <p className="dg-titulo dg-luz-texto mt-2 text-[3rem] leading-none font-bold sm:text-[4.4rem]">
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

      {/* ── LAS CUATRO TARJETAS, EN RETÍCULA ──

          Diagnóstico arriba a todo el ancho; debajo, dos columnas IGUALES: el
          reparto a la izquierda y, apiladas a la derecha, el aviso del correo y
          el cierre.

          ── COLUMNAS 1fr Y 1fr, NO 0,92 Y 1,08 ──

          Estaban desequilibradas para darle sitio al texto del aviso, y a
          cambio ninguna de las dos coincidía con el eje de la tarjeta de
          arriba. Iguales, la retícula tiene un solo eje central y las cuatro
          piezas caen sobre él.

          ── Y TERMINAN A LA MISMA ALTURA ──

          Llevaba `items-start`, así que cada columna medía lo que midiera su
          contenido y una acababa antes que la otra — el borde inferior en
          diagonal era la mitad del desorden. Sin él, las dos se estiran hasta
          la más alta.

          El margen superior iguala al hueco de la retícula (mt-5 = gap-5): así
          la separación entre la primera fila y la segunda es la misma que entre
          las columnas, y el conjunto se lee como una sola pieza en vez de como
          una tarjeta con dos cajas debajo. */}
      <div
        className={cn(
          "mx-auto mt-5 grid w-full gap-5",
          hayReparto
            ? "max-w-5xl lg:grid-cols-2"
            : "max-w-2xl",
        )}
      >
        {/* Al estirarse hasta la altura de la columna de al lado le sobra
            sitio, y `justify-center` reparte ese aire arriba y abajo en vez de
            dejar las barras colgando del borde superior.

            El comentario va FUERA del `&&`: dentro sería un segundo hijo en una
            expresión que sólo admite uno, y no compila. */}
        {hayReparto && (
          <section className="flex flex-col justify-center rounded-3xl border border-[var(--dg-borde)] bg-[color-mix(in_srgb,var(--dg-fondo-alto)_82%,transparent)] p-5 shadow-[0_24px_70px_-52px_rgba(0,0,0,0.95)] sm:p-6">
            <MedicionFrecuencias
              porcentajes={porcentajes}
              dominante={frecuencia}
            />
          </section>
        )}

        {/* `auto 1fr`: el aviso del correo mide lo suyo y el cierre se queda
            con lo que sobre. Sin esto, las dos tarjetas se repartirían el alto a
            partes iguales y el aviso —que es dos renglones— quedaría con un
            hueco enorme debajo. */}
        <div className="grid gap-5 lg:grid-rows-[auto_1fr]">
        {/* ── El aviso del email ──
          Va en su propia caja, separado del diagnóstico: es una instrucción
          ("andá a revisar tu casilla"), no parte del resultado, y mezclarlos
          hace que se lea por encima. */}
        <section className="rounded-3xl border border-[var(--dg-borde)] bg-[color-mix(in_srgb,var(--dg-fondo-alto)_86%,transparent)] p-5 shadow-[0_24px_70px_-52px_rgba(0,0,0,0.95)] sm:p-6">
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
        <section className="rounded-3xl border border-[var(--dg-acento)]/30 bg-[color-mix(in_srgb,var(--dg-superficie-viva)_70%,var(--dg-fondo-alto))] p-6 text-center shadow-[0_24px_70px_-48px_var(--dg-brillo-medio)] sm:p-7">
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
        </section>
        </div>
      </div>
    </div>
  );
}
