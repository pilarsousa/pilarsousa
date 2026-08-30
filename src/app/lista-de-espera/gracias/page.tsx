import type { Metadata } from "next";
import { Check } from "lucide-react";
import { VoContainer } from "@/components/lista-de-espera/ui/VoContainer";
import { LogoVao } from "@/components/lista-de-espera/ui/LogoVao";
import { LluviaCodigo } from "@/components/lista-de-espera/ui/LluviaCodigo";
import { BotonVo } from "@/components/lista-de-espera/ui/BotonVo";
import { WhatsAppIcon } from "@/components/lista-de-espera/ui/WhatsAppIcon";
import { Footer } from "@/components/lista-de-espera/sections/Footer";
import { GRACIAS } from "@/components/lista-de-espera/content";

/*
  Página de gracias — /lista-de-espera/gracias.

  El registro no termina en el formulario: el paso que de verdad importa es
  entrar al grupo de WhatsApp, así que la página tiene un solo objetivo y un
  solo botón, sin navegación que distraiga.

  ── POR QUÉ SE RETIRÓ LA FOTO DEL ATARDECER ──

  Llevaba de fondo una fotografía de un bosque al atardecer, y fallaba por dos
  motivos que se sumaban:

  · NO PERTENECÍA A ESTA LANDING. Todo el recorrido —ocho secciones— es negro
    con verde lima y lluvia de código, y el visitante aterrizaba de golpe en un
    bosque naranja y cálido. El salto rompía la continuidad justo en el momento
    de más confianza, que es el que sigue a dejar los datos.
  · Y NO SE LEÍA. El titular es verde lima y el fondo, naranja: son casi
    complementarios, el peor par posible para contraste. La página intentaba
    compensarlo con un doble oscurecido radial que arrancaba ya al 55% en el
    centro —o sea, tapando la foto para poder leer encima de ella—. Cuando hay
    que ocultar el fondo para que el texto funcione, el fondo sobra.

  Ahora la página usa el mismo lenguaje que el resto: negro, lluvia de código,
  halos verdes y la retícula del scope. No hay salto, no hay problema de
  contraste, y de paso se ahorran dos fotografías de fondo.

  ── LA JERARQUÍA ES DISTINTA A LA DE UNA SECCIÓN DE VENTA ──

  Aquí no hay que convencer de nada: el visitante YA se registró. Lo único que
  falta es que pulse un botón, así que todo lo demás se ordena para llevar a él
  — el tilde confirma que el paso anterior salió bien, el titular lo dice en una
  línea, y el cuerpo explica sólo lo justo para que el botón tenga sentido.

  noindex: es una página de post-conversión. Si Google la indexa, la gente puede
  llegar al grupo sin haberse registrado, y además compite en resultados con la
  landing real.
*/

export const metadata: Metadata = {
  title: "Registro completado | Volver al Origen 3.0",
  description:
    "Tu registro en la lista de espera está completado. Accede al grupo privado de WhatsApp para recibir todas las novedades.",
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  const hasUrl = GRACIAS.whatsappUrl.length > 0;

  return (
    <>
      <main className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-[#050803] py-20">
        {/* LA LLUVIA DE CÓDIGO ES EL FONDO, como en las secciones 3, 5 y 8.
            Va más apagada que allí —0,28 contra 0,4— porque aquí no compite con
            un banner que la contenga: es lo único que hay detrás del texto, y a
            plena intensidad los glifos cruzarían por detrás de cada renglón. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <LluviaCodigo opacidad={0.28} />
        </div>

        {/* Los dos halos de los cantos, el mismo recurso de la sección 5. Aquí
            cumplen el papel que hacía la viñeta de la foto: enmarcan el bloque
            central sin tapar nada, porque suman luz en los bordes en vez de
            restarla en el medio.

            mix-blend-screen no puede oscurecer: sobre el negro del fondo suma
            verde, y el `isolate` del main mantiene la mezcla dentro de esta
            página. */}
        <div
          aria-hidden
          className="le-halo-a pointer-events-none absolute top-[12%] left-0 -z-10 h-[46%] w-[38%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,228,72,0.4)_0%,rgba(126,198,52,0.16)_45%,transparent_75%)] blur-[3vw] mix-blend-screen"
        />
        <div
          aria-hidden
          className="le-halo-b pointer-events-none absolute right-0 bottom-[10%] -z-10 h-[44%] w-[40%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,228,72,0.34)_0%,rgba(126,198,52,0.14)_45%,transparent_75%)] blur-[3vw] mix-blend-screen"
        />

        <VoContainer className="max-w-3xl">
          <div className="flex flex-col items-center text-center">
            {/* EL TILDE VA PRIMERO Y ES LO MÁS GRANDE DE LA CABECERA. Quien
                llega aquí acaba de dejar sus datos y lo primero que necesita
                saber, antes que ninguna otra cosa, es que el envío salió bien.
                Un titular lo dice con palabras; un tilde verde en un disco lo
                dice antes de leer.

                Es el mismo disco invertido que usan los tildes de "es para vos
                si…" y los iconos de los bonos. */}
            <span
              aria-hidden
              className="flex size-16 items-center justify-center rounded-full border border-[#a3ca23]/40 bg-[#0d1505] text-[#b8ea3c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_0_28px_-6px_rgba(163,202,35,0.7)] sm:size-[4.5rem]"
            >
              <Check className="size-8 sm:size-9" strokeWidth={2.6} />
            </span>

            {/* El distintivo, en el mismo cristal que los sellos del hero y el
                del modal: tres apariciones de la misma pieza a lo largo del
                recorrido. */}
            <p className="mt-6 inline-flex items-center rounded-full border border-[#a3ca23]/45 bg-[linear-gradient(180deg,rgba(163,202,35,0.2)_0%,rgba(163,202,35,0.09)_55%,rgba(20,32,6,0.14)_100%)] px-4 py-1.5 font-display text-xs tracking-[0.18em] text-[#d4ef7a] uppercase shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0_0_rgba(8,16,2,0.55)] backdrop-blur-[6px] sm:text-sm">
              <span className="-mr-[0.18em]">{GRACIAS.badge}</span>
            </p>

            {/* EL TITULAR VA EN DOS TINTAS, como los de la landing: el enunciado
                en hueso y el nombre del programa en lima. Antes iba entero en
                lima —que sobre el naranja de la foto era ilegible— y además
                desperdiciaba el `titleAccent` que el copy ya traía separado. */}
            <h1 className="mt-5 font-display text-2xl leading-[1.25] uppercase sm:text-3xl md:text-4xl">
              <span className="text-vo-bone">{GRACIAS.title}</span>{" "}
              <span className="font-bold text-[#b8ea3c]">
                {GRACIAS.titleAccent}
              </span>
            </h1>

            {/* EL CUERPO VA EN BLANCO PLENO Y NO AL 85%. Sobre un fondo con
                lluvia de código en movimiento, cualquier transparencia en la
                letra deja que los glifos se cuelen a través del texto. */}
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-white sm:text-lg">
              <Rich parts={GRACIAS.intro} />
            </p>

            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[#cfd3c6] sm:text-lg">
              <Rich parts={GRACIAS.detail} />
            </p>

            {/* El empujón, en su propia píldora verde. Es la misma tinta sobre
                fondo lima que usan las afirmaciones de la sección 3: sobre el
                negro, un bloque verde macizo es lo único que se recorta de
                verdad, y esta frase es la que tiene que verse. */}
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#4a6b12] bg-[linear-gradient(180deg,#a8cf3c_0%,#93c02c_45%,#7cae1f_100%)] px-5 py-2.5 font-sans text-sm font-bold text-[#16210a] shadow-[inset_0_2px_0_0_rgba(255,255,255,0.55),inset_0_-2px_0_0_rgba(28,52,4,0.5),0_4px_14px_-4px_rgba(124,181,24,0.5)] sm:text-base">
              <span aria-hidden>👇</span>
              {GRACIAS.nudge}
            </p>

            <div className="mt-7 flex w-full justify-center">
              {/* EL MISMO BOTÓN QUE TODA LA LANDING. Usaba VoCta —el del diseño
                  anterior— y era el único sitio donde aparecía esa pieza dentro
                  del recorrido nuevo: el visitante pulsaba seis botones iguales
                  y el séptimo, el que cierra el proceso, era otro.

                  Sin la flecha: el icono de WhatsApp ya dice a dónde lleva, y
                  dos iconos en un botón compiten entre sí. */}
              {hasUrl ? (
                <BotonVo
                  href={GRACIAS.whatsappUrl}
                  flecha={false}
                  className="max-w-[420px]"
                >
                  <span className="inline-flex items-center justify-center gap-3">
                    <WhatsAppIcon className="size-5 shrink-0" />
                    {GRACIAS.cta}
                  </span>
                </BotonVo>
              ) : (
                /* Sin enlace configurado el botón va deshabilitado: es preferible
                   a mandar al visitante a un enlace roto justo tras registrarse. */
                <BotonVo disabled flecha={false} className="max-w-[420px]">
                  {GRACIAS.cta}
                </BotonVo>
              )}
            </div>

            {/* La aclaración de para qué se usa el grupo. Va DESPUÉS del botón:
                antes, sembraría la duda sobre el spam justo cuando lo que hay
                que hacer es pulsar. */}
            <p className="mt-6 max-w-md font-sans text-xs leading-relaxed text-[#a9b09b]">
              {GRACIAS.disclaimer}
            </p>

            {!hasUrl && (
              <p className="mt-3 font-sans text-xs font-light text-[#a9b09b]/70">
                Enlace del grupo pendiente de configurar.
              </p>
            )}

            {/* EL LOGO CIERRA EN VEZ DE ABRIR. Estaba arriba del todo, y ahí
                empujaba hacia abajo lo único que importa —la confirmación y el
                botón—. Quien llega aquí ya sabe de quién es la página: viene de
                rellenar su formulario. Como remate firma el cierre sin robarle
                sitio a la acción. */}
            <LogoVao className="mt-12 w-24 opacity-70 sm:w-28" />
          </div>
        </VoContainer>
      </main>
      <Footer />
    </>
  );
}

/** Párrafo con tramos en negrita, definidos como data en content.ts. */
function Rich({ parts }: { parts: { text: string; strong?: boolean }[] }) {
  return (
    <>
      {parts.map((part) =>
        part.strong ? (
          <strong key={part.text} className="font-bold text-white">
            {part.text}
          </strong>
        ) : (
          <span key={part.text}>{part.text}</span>
        ),
      )}
    </>
  );
}
