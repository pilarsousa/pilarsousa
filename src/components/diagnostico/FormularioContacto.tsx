"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { FORMULARIO } from "@/components/diagnostico/contenido";
import {
  guardarEstado,
  leerEstado,
  type DatosContacto,
} from "@/components/diagnostico/almacen";
import {
  pasoDelFormulario,
  validarCampo,
} from "@/components/diagnostico/recorrido";
import { useHidratado } from "@/components/diagnostico/useHidratado";
import { PasoCampo } from "@/components/diagnostico/ui/PasoCampo";

/*
  ═══════════════════════════════════════════════════════════════════════════
  EL FORMULARIO DE CONTACTO — nombre, email y teléfono
  ═══════════════════════════════════════════════════════════════════════════

  ── UNA TARJETA DE DOS COLUMNAS ──

  Contenido a la izquierda, ilustración a la derecha, disolviéndose hacia el
  centro. En móvil no hay sitio para dos columnas: la ilustración se va arriba
  y el contenido debajo, metido dentro del fundido.

  La imagen SANGRA hasta el borde de la tarjeta —su columna no tiene relleno y
  la tarjeta recorta con `overflow-hidden`— para que se lea como parte de la
  pieza y no como una foto pegada dentro de una caja.

  ── VIVE EN LA LANDING, NO DETRÁS DE UN BOTÓN ──

  Antes había un botón que llevaba a otra página a rellenarlo. Es un paso de
  más entre la promesa y la conversión, y encima el más caro: quien acaba de
  leer el titular y está decidido tiene que pulsar, esperar una navegación y
  sólo entonces encontrarse el primer campo.

  ── UN CAMPO POR PANTALLA, AUNQUE ESTÉ EMPOTRADO ──

  El documento pide captura "uno por uno, interactivo", y se mantiene: los tres
  campos se turnan en el mismo sitio en vez de apilarse. Tres campos a la vez
  se leen como un trámite; uno solo se lee como una pregunta.

  Y las tres ilustraciones miden lo mismo, así que la tarjeta NO CAMBIA DE
  ALTURA entre pasos y nada de lo que hay debajo en la landing se mueve
  mientras se rellena.

  ── LO REUTILIZA /diagnostico/encuesta ──

  Si alguien abre el test directamente —un enlace compartido, una recarga con
  el almacenamiento bloqueado— no hay datos de contacto, y esa página monta
  este mismo componente antes de las preguntas en vez de devolverlo a la
  landing. Rebotarlo sería un bucle para quien tenga el almacenamiento
  desactivado.
*/

const VACIO: DatosContacto = { nombre: "", email: "", telefono: "" };

/* El formulario en blanco y en su primer paso: lo que el SERVIDOR pinta
   siempre, y por tanto lo que el cliente tiene que pintar mientras hidrata
   para que los dos HTML coincidan. */
const VISTA_VACIA = { paso: 0, datos: VACIO };

/* Estado inicial leído del borrador en una sola pasada, como inicializador
   perezoso y no dentro de un efecto: así el formulario nace ya relleno para
   quien vuelve, sin el render de más que haría parpadear los campos vacíos.
   leerEstado() captura su propia excepción, así que esto también corre en el
   servidor sin romper.

   EL PASO SE DEDUCE DE LOS DATOS y no se lee de ningún sitio: se abre en el
   primer campo que todavía no valida. Ver recorrido.ts. */
function contactoInicial(): { paso: number; datos: DatosContacto } {
  const guardado = leerEstado();
  if (!guardado) return { paso: 0, datos: VACIO };
  return {
    paso: pasoDelFormulario(guardado.datos),
    datos: guardado.datos,
  };
}

export function FormularioContacto({
  onCompleto,
  transicionActiva = false,
  /* Ver el comentario de `enfocarAlMontar` en PasoCampo: en la landing no se
     roba el foco al cargar; en la página del test, donde el formulario es lo
     único que hay, sí. */
  enfocarPrimerCampo = false,
  className,
}: {
  onCompleto: (datos: DatosContacto) => void;
  transicionActiva?: boolean;
  enfocarPrimerCampo?: boolean;
  className?: string;
}) {
  const hidratado = useHidratado();
  const [estado, setEstado] = useState(contactoInicial);
  const [error, setError] = useState<string | null>(null);

  /* Los manejadores trabajan siempre sobre el estado real; sólo lo que se
     PINTA pasa por el filtro de la hidratación, más abajo. Como los
     manejadores no pueden dispararse antes de hidratar, los dos coinciden en
     todo momento en que importa. */
  const { paso, datos } = estado;

  /* Guarda los datos para que sobrevivan a la navegación hacia las preguntas y
     a una recarga. NO se guarda en qué paso va: quien lea el borrador deduce
     eso de los propios datos (ver recorrido.ts y almacen.ts).

     Las respuestas ya dadas se releen y se vuelven a escribir para no pisarlas:
     este componente no las toca, pero guarda el objeto entero. */
  useEffect(() => {
    guardarEstado({ datos, respuestas: leerEstado()?.respuestas ?? {} });
  }, [datos]);

  const total = FORMULARIO.pasos.length;
  const definicion = FORMULARIO.pasos[paso];

  /* Se conserva la última función recibida en una ref para que los manejadores
     no tengan que recrearse si el padre pasa una función nueva en cada
     render. */
  const alCompletar = useRef(onCompleto);
  useEffect(() => {
    alCompletar.current = onCompleto;
  }, [onCompleto]);

  const continuar = useCallback(() => {
    if (transicionActiva) {
      return;
    }

    const problema = validarCampo(definicion.campo, datos[definicion.campo]);
    if (problema) {
      setError(problema);
      return;
    }
    setError(null);

    if (paso < total - 1) {
      setEstado((previo) => ({ ...previo, paso: paso + 1 }));
      return;
    }

    /* Último campo: los datos están completos. Se normalizan aquí —una sola
       vez— para que quien los reciba no tenga que volver a limpiarlos. */
    const limpios = {
      nombre: datos.nombre.trim(),
      email: datos.email.trim(),
      telefono: datos.telefono.trim(),
    };

    /*
      ⚠️ COMPLETAR EL FORMULARIO EMPIEZA UN RECORRIDO NUEVO, Y ESO BORRA LAS
      RESPUESTAS ANTERIORES.

      Sin esta línea, quien ya había hecho el test en esta pestaña conservaba
      sus respuestas en la sesión: al rellenar el formulario otra vez y entrar
      al cuestionario aparecía en la pregunta siguiente a la última que había
      contestado la vez anterior. La página deducía bien "por dónde ibas"; el
      problema es que era el recorrido equivocado.

      Va AQUÍ y no al entrar al cuestionario a propósito: dar los datos es lo
      único que significa con certeza "empiezo una pasada nueva". Al entrar al
      cuestionario no se puede distinguir eso de una recarga a mitad del test,
      que sí tiene que conservar lo respondido.
    */
    guardarEstado({ datos: limpios, respuestas: {} });

    alCompletar.current(limpios);
  }, [definicion, datos, paso, total, transicionActiva]);

  /*
    ── LO QUE SE PINTA DURANTE LA HIDRATACIÓN ──

    La tarjeta se dibuja ENTERA desde el primer fotograma, vacía y en el paso
    1. Aquí no se puede esconder detrás de un hueco reservado como hace el
    test: es el elemento de conversión de la landing, y dejarlo en blanco medio
    segundo —justo debajo del titular— es perder gente en el único punto que
    importa.

    VISTA_VACIA es exactamente lo que `contactoInicial()` devuelve cuando corre
    en el SERVIDOR (allí sessionStorage lanza y se captura), así que los dos
    HTML coinciden. La única diferencia posible es un borrador guardado, y en
    ese caso los campos se rellenan solos al terminar de hidratar.
  */
  const vista = hidratado ? estado : VISTA_VACIA;
  const vDefinicion = FORMULARIO.pasos[vista.paso];

  return (
    /* ── DOS CAPAS PARA UN FILETE DE UN PÍXEL ──

       La de fuera lleva el degradado cónico que gira (.dg-borde-giro) y 1 px de
       relleno; la de dentro tapa el centro con el fondo de la tarjeta. Lo único
       que asoma del degradado es ese milímetro del contorno.

       El radio de fuera es el de dentro MÁS 1 PX: con el mismo valor, la
       esquina exterior queda más cerrada que la interior y el filete se ve más
       grueso en las esquinas que en los lados.

       La capa interior es la que recorta (`overflow-hidden`), porque es la que
       tiene el radio de la tarjeta y la que la ilustración tiene que respetar
       al sangrar hasta el borde. */
    <div
      className={cn("dg-borde-giro rounded-[calc(1.5rem+1px)] p-px", className)}
    >
      <div
        aria-busy={transicionActiva}
        className="dg-relieve relative overflow-hidden rounded-3xl bg-[var(--dg-fondo-alto)]"
      >
        {/* ── EN ESCRITORIO YA NO HAY DOS COLUMNAS ──

          La tarjeta llevaba la ilustración del paso a la derecha. Se retiró de
          escritorio por el feedback de la primera entrega —"sin fondo, no usar
          esa imagen"— y ahí queda una sola columna centrada.

          EN MÓVIL SE QUEDA, y es una decisión explícita: la ilustración va
          arriba, a lo ancho, y el contenido debajo. Por eso la imagen lleva
          `md:hidden` y no se borró.

          ── EL SUELO DE ALTURA SIGUE HACIENDO FALTA ──

          `md:min-h-[23rem]` está un poco por encima de lo que mide hoy la
          tarjeta con sus tres pasos. Ese margen es lo que absorbe que un texto
          crezca un renglón sin que la tarjeta cambie de alto y todo lo que hay
          debajo dé un salto.

          Ya pasó una vez —"¿A qué email te lo envío?" se partía en dos— y se
          arregló ensanchando la tarjeta. Pero el ancho sólo resuelve los textos
          de HOY: en cuanto Laureano cambie una línea, vuelve. Con el contenido
          centrado en vertical, el aire sobrante se reparte arriba y abajo en
          vez de acumularse al final. */}
        <div className="grid md:min-h-[23rem]">
          {/* ══ CONTENIDO ══
            En móvil va SEGUNDO, debajo de la ilustración. El margen negativo lo
            mete dentro del fundido inferior de ésta; sin él quedaría por debajo
            del rectángulo con una franja de fondo vacío en medio.

            En escritorio no hay ilustración, así que `md:mt-0` cancela ese
            tirón y la columna recupera su relleno completo.

            ── EL TOPE DE 36rem ES LO QUE SALVA A LOS CAMPOS ──

            La tarjeta mide 64rem para igualar a la del recurso, pero el
            formulario NO puede medir eso: un campo de nombre de 960 px deja de
            leerse como un campo y pasa a leerse como una barra, y el ojo tiene
            que recorrer casi un metro de pantalla entre el rótulo y el final del
            recuadro.

            Con el tope, lo que crece es el marco y el aire; el formulario se
            queda en la medida en la que se rellena cómodo. */}
          <div className="order-2 mx-auto -mt-6 w-full max-w-xl px-6 pt-0 pb-7 sm:px-8 sm:pb-8 md:mt-0 md:flex md:flex-col md:justify-center md:py-9">
            {/* La clave cambia con el paso para que el bloque se remonte y la
              animación de entrada vuelva a correr; si no, los tres campos se
              sucederían con un corte seco en el mismo sitio. */}
            <div key={vDefinicion.campo} className="dg-entra">
              <PasoCampo
                campo={vDefinicion.campo}
                icono={vDefinicion.icono}
                distintivo={vDefinicion.distintivo}
                etiqueta={vDefinicion.etiqueta}
                ayuda={vDefinicion.ayuda}
                placeholder={vDefinicion.placeholder}
                tipo={vDefinicion.tipo}
                autoComplete={vDefinicion.autoComplete}
                inputMode={vDefinicion.inputMode}
                valor={vista.datos[vDefinicion.campo]}
                error={error}
                onCambio={(valor) => {
                  setEstado((previo) => ({
                    ...previo,
                    datos: { ...previo.datos, [vDefinicion.campo]: valor },
                  }));
                  /* El error se retira al empezar a corregir, no al reenviar:
                   mantenerlo mientras se escribe la solución es regañar por
                   algo que ya se está arreglando. */
                  if (error) setError(null);
                }}
                onEnviar={continuar}
                /* Sin onAtras en el primer campo: desde ahí no hay a dónde
                 volver, y la ausencia del prop es lo que hace que el botón no
                 se dibuje. */
                onAtras={
                  vista.paso > 0
                    ? () => {
                        setEstado((previo) => ({
                          ...previo,
                          paso: previo.paso - 1,
                        }));
                        setError(null);
                      }
                    : undefined
                }
                enfocarAlMontar={vista.paso > 0 || enfocarPrimerCampo}
                rotuloBoton={
                  vista.paso === total - 1
                    ? FORMULARIO.empezar
                    : FORMULARIO.siguiente
                }
              />
            </div>

            {/* ── LOS TRES PUNTOS, AL PIE ──

              Sustituyen a una barra de progreso, que aquí sería
              desproporcionada: son tres pasos y se ven de un vistazo; una
              barra al 33% sobre una landing parece decir que queda mucho por
              delante.

              Van con aria-hidden y el estado real lo dice el texto de al lado:
              para un lector de pantalla, tres rayas de colores no son
              información. */}
            {/* CENTRADOS, aunque el resto de la columna vaya alineado a la
              izquierda. No es una incoherencia: los puntos no forman parte de
              la conversación —no se leen con la pregunta ni con el campo—, son
              el pie de la tarjeta. Pegados al margen izquierdo quedaban
              colgando del botón; centrados cierran el bloque. */}
          <div className="mt-6 flex items-center justify-center gap-2.5">
              <span aria-hidden className="flex items-center gap-1.5">
                {FORMULARIO.pasos.map((p, i) => (
                  <span
                    key={p.campo}
                    className={
                      i <= vista.paso
                        ? "h-1.5 w-6 rounded-full bg-[var(--dg-acento)] transition-colors duration-300"
                        : "h-1.5 w-6 rounded-full bg-[var(--dg-borde)] transition-colors duration-300"
                    }
                  />
                ))}
              </span>
              <span className="text-[0.72rem] tracking-[0.12em] text-[var(--dg-texto-tenue)] uppercase">
                {vista.paso + 1} de {total}
              </span>
            </div>
          </div>

          {/* ══ ILUSTRACIÓN — SÓLO EN MÓVIL ══

            `md:hidden` la retira en escritorio, que es lo que pidió el
            feedback. En móvil se queda tal cual: arriba, a lo ancho y en 16:9,
            que es la proporción del archivo, así que no se recorta nada.

            Ya no hay variante de escritorio: se fueron el `absolute` que le
            hacía llenar el alto de la columna de al lado y el `aspect-auto`
            que anulaba la proporción. Sin segunda columna no hay alto que
            llenar.

            La clave la remonta en cada paso para que entre con la misma
            animación que el texto — si no, el texto aparecería y la imagen
            saltaría de golpe. */}
          <div className="order-1 md:hidden">
            <Image
              key={vDefinicion.campo}
              src={vDefinicion.imagen}
              alt=""
              width={1672}
              height={941}
              quality={90}
              sizes="(min-width: 640px) 36rem, 100vw"
              className="dg-imagen-formulario dg-entra aspect-video w-full object-cover"
            />
          </div>
        </div>

        {transicionActiva && (
          <div
            role="status"
            aria-live="polite"
            className="dg-entra absolute inset-0 z-20 flex items-center justify-center bg-[var(--dg-fondo-alto)] px-6 text-center"
          >
            <div className="max-w-sm">
              <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--dg-acento)] uppercase">
                Datos listos
              </p>
              <p className="dg-titulo mt-3 text-[1.35rem] leading-tight text-balance text-[var(--dg-texto)] sm:text-[1.55rem]">
                Preparando tus preguntas
              </p>
              <div
                aria-hidden
                className="mx-auto mt-6 h-1 w-44 overflow-hidden rounded-full bg-[var(--dg-borde)]"
              >
                <span className="dg-puente-carga block h-full w-1/2 rounded-full bg-[var(--dg-acento)] shadow-[0_0_18px_var(--dg-brillo-medio)]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
