"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FORMULARIO, PREGUNTAS } from "@/components/diagnostico/contenido";
import {
  calcularDiagnostico,
  type Respuestas,
} from "@/components/diagnostico/puntaje";
import {
  almacenDisponible,
  guardarEstado,
  guardarResultado,
  leerEstado,
  limpiarEstado,
  type DatosContacto,
} from "@/components/diagnostico/almacen";
import { enviarFormulario, enviarResultado } from "@/components/diagnostico/enviar";
import {
  datosCompletos,
  preguntasRespondidasSeguidas,
} from "@/components/diagnostico/recorrido";
import { useHidratado } from "@/components/diagnostico/useHidratado";
import { FormularioContacto } from "@/components/diagnostico/FormularioContacto";
import { Progreso } from "@/components/diagnostico/ui/Progreso";
import { PasoPregunta } from "@/components/diagnostico/ui/PasoPregunta";
import { BotonDg } from "@/components/diagnostico/ui/BotonDg";

/*
  ═══════════════════════════════════════════════════════════════════════════
  LAS 7 PREGUNTAS — /analisis/encuesta
  ═══════════════════════════════════════════════════════════════════════════

  El formulario de contacto YA NO ESTÁ AQUÍ: se rellena en la propia landing,
  antes de llegar a esta página. Lo que queda es el puente y las preguntas.

  ── PERO EL FORMULARIO SIGUE IMPORTÁNDOSE, Y NO ES UN RESTO ──

  Es la red para quien llega a esta URL sin datos de contacto: un enlace
  compartido, un marcador, o alguien con el almacenamiento del navegador
  bloqueado —Safari en privado, cookies de terceros denegadas— donde lo que se
  rellenó en la landing no llegó a guardarse.

  En ese caso se monta aquí el mismo formulario en vez de devolverlo a la
  landing. Rebotarlo sería un bucle infinito justo para quien tiene el
  almacenamiento desactivado: rellenaría, no se guardaría, y volvería a
  aparecer aquí sin datos una y otra vez. Montándolo en el sitio, los datos
  viven en memoria y el recorrido termina.

  ── UNA SOLA RUTA PARA LAS SIETE PREGUNTAS ──

  Y no siete rutas. Lo que sí hace falta de ellas es el BOTÓN ATRÁS DEL
  NAVEGADOR, que la gente usa para corregir una respuesta; se recupera a mano
  con `history.pushState` en cada avance y un oyente de `popstate`.

  ⚠️ EL pushState CONSERVA EL ESTADO QUE YA HUBIERA (`...history.state`). El
  enrutador de Next guarda ahí sus propios datos internos; sobrescribirlos con
  un objeto limpio le rompe la navegación de forma difícil de diagnosticar.
*/

/* Pantalla 0: el puente. De la 1 a la 7: las preguntas. */
const IDX_INTRO = 0;
const IDX_PRIMERA_PREGUNTA = 1;
const IDX_FIN = IDX_PRIMERA_PREGUNTA + PREGUNTAS.length;

/*
  RETARDO ANTES DE PASAR A LA SIGUIENTE PREGUNTA.

  Sin él, la opción elegida se desvanece en el mismo fotograma del clic y el
  test parece haberse saltado una pregunta. Con 260 ms da tiempo a ver el
  recuadro marcarse y todavía se percibe como instantáneo — por encima de unos
  400 ms empieza a sentirse como una espera.
*/
const RETARDO_AVANCE = 260;

function acotarPaso(paso: number): number {
  return Math.min(Math.max(paso, 0), IDX_FIN - 1);
}

type Estado = {
  paso: number;
  datos: DatosContacto;
  respuestas: Respuestas;
};

/*
  Estado inicial leído del borrador en una sola pasada, como inicializador
  perezoso y no dentro de un efecto: un efecto que llama a setState encadena un
  render de más y haría parpadear el puente antes de saltar a la pregunta
  guardada. Aquí el estado nace ya correcto.

  EL BORRADOR NO GUARDA NINGÚN NÚMERO DE PASO, a propósito (ver almacen.ts): se
  deduce de las RESPUESTAS ya dadas, que es el único dato que no puede mentir.
  Un índice guardado se desincroniza de los datos en cuanto algo va mal, y
  entonces deja a alguien en la pregunta 5 con la 3 sin contestar.
*/
function estadoInicial(): Estado {
  const guardado = leerEstado();
  if (!guardado) {
    return {
      paso: IDX_INTRO,
      datos: { nombre: "", email: "", telefono: "" },
      respuestas: {},
    };
  }

  const contestadas = preguntasRespondidasSeguidas(guardado.respuestas);

  return {
    paso: acotarPaso(
      contestadas === 0 ? IDX_INTRO : IDX_PRIMERA_PREGUNTA + contestadas,
    ),
    datos: guardado.datos,
    respuestas: guardado.respuestas,
  };
}

export function FlujoTest() {
  const router = useRouter();
  const hidratado = useHidratado();

  const [estado, setEstado] = useState<Estado>(estadoInicial);
  const { paso, datos, respuestas } = estado;

  const temporizador = useRef<number | null>(null);
  /* El paso con el que se montó el componente, para sellar la entrada actual
     del historial. Se inicializa una vez y NO SE REASIGNA NUNCA durante el
     render: escribir en una ref mientras se pinta deja el árbol y la ref
     desincronizados en los renders interrumpibles de React 19. */
  const pasoAlMontar = useRef(paso);

  /* ── El botón atrás del navegador ── */
  useEffect(() => {
    try {
      window.history.replaceState(
        { ...window.history.state, dgPaso: pasoAlMontar.current },
        "",
      );
    } catch {
      /* Algunos navegadores restringen history en contextos empotrados. Sin
         esto el atrás sale del test, pero las preguntas siguen funcionando. */
    }

    const alVolver = (evento: PopStateEvent) => {
      const destino = (evento.state as { dgPaso?: unknown } | null)?.dgPaso;
      /* Si la entrada no es nuestra, no se toca nada: el navegador está
         saliendo de la página y ése es su trabajo. */
      if (typeof destino === "number") {
        setEstado((previo) => ({ ...previo, paso: acotarPaso(destino) }));
      }
    };

    window.addEventListener("popstate", alVolver);
    return () => window.removeEventListener("popstate", alVolver);
  }, []);

  /* ── Guardar el avance en cada cambio ──

     ⚠️ AQUÍ ESTABA EL FALLO DE QUE EL FORMULARIO SE ABRIERA EN EL TELÉFONO.

     Esta línea guardaba además `paso: FORMULARIO.pasos.length - 1`, o sea el
     último campo del formulario, porque en esta página el paso significa otra
     cosa y había que dejar algo. Pero ese número lo leía el formulario de la
     landing como "por aquí ibas", y al volver se abría en el tercer campo con
     el nombre y el email dados por buenos sin haberlos escrito.

     Ya no se guarda ningún paso: cada pantalla deduce el suyo de los datos.
     Ver almacen.ts. */
  useEffect(() => {
    guardarEstado({ datos, respuestas });
  }, [datos, respuestas]);

  /* ── Volver arriba al cambiar de pregunta ──
     En un móvil, la 4 se responde con la página desplazada por la 3: sin esto,
     la siguiente aparece ya scrolleada y con el enunciado fuera de cuadro.
     `auto` y no `smooth`: un desplazamiento animado sobre un cambio de
     contenido se ve como un temblor. */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [paso]);

  /* Un temporizador pendiente cuando el componente se desmonta intentaría
     escribir estado sobre un árbol que ya no existe. */
  useEffect(() => {
    return () => {
      if (temporizador.current !== null) {
        window.clearTimeout(temporizador.current);
      }
    };
  }, []);

  /* ── Sin datos de contacto: a la landing ──

     El porqué de cada rama está explicado abajo, donde se decide qué pintar.
     La comprobación va aquí arriba porque los hooks no pueden ir después de un
     `return` condicional. */
  const faltanDatos = !datosCompletos(datos);
  useEffect(() => {
    if (!faltanDatos) return;
    if (!almacenDisponible()) return;
    /* `replace` y no `push`: esta URL no debe quedar en el historial, o el
       "atrás" desde la landing volvería a traer aquí. */
    router.replace("/analisis");
  }, [faltanDatos, router]);

  const irA = useCallback((destino: number) => {
    setEstado((previo) => ({ ...previo, paso: destino }));
    try {
      window.history.pushState({ ...window.history.state, dgPaso: destino }, "");
    } catch {
      /* Ver el comentario del replaceState. */
    }
  }, []);

  const finalizar = useCallback(
    (respuestasFinales: Respuestas) => {
      const diagnostico = calcularDiagnostico(respuestasFinales);
      /* Sólo puede ser null si no hay ni una respuesta válida, lo que aquí no
         debería ocurrir nunca. Si ocurre, se vuelve a la primera pregunta en
         vez de navegar a una página de resultados vacía. */
      if (!diagnostico) {
        irA(IDX_PRIMERA_PREGUNTA);
        return;
      }

      guardarResultado({
        frecuencia: diagnostico.dominante,
        nombre: datos.nombre.trim(),
        email: datos.email.trim(),
        porcentajes: diagnostico.porcentajes,
      });
      /* El borrador del test se borra, el resultado no: quien vuelva atrás
         desde la página de resultados empieza un test nuevo en vez de
         reaparecer en la pregunta 7 de uno ya terminado. */
      limpiarEstado();

      enviarResultado(datos, respuestasFinales);

      /* La frecuencia va también en la URL. No es la fuente de la verdad —esa
         es sessionStorage— pero permite que la página funcione si el
         almacenamiento está bloqueado, y deja el resultado visible para las
         herramientas de analítica. Manipularlo sólo cambia el rótulo que ve
         quien lo manipula: el video lo manda el CRM con lo que calculó el
         servidor. */
      /*
        ⚠️ `replace` Y NO `push`.

        El test ya está hecho: volver a él no tiene sentido, y con `push` la
        entrada del cuestionario se quedaba en el historial. Al pulsar "atrás"
        desde los resultados se aterrizaba en /analisis/encuesta — sin datos,
        porque se acaban de borrar— y aparecía el formulario en blanco, como si
        hubiera que empezar de cero.

        Con `replace`, la página de resultados OCUPA el sitio de la última
        entrada del test en vez de añadirse detrás.
      */
      router.replace(`/analisis/resultado?f=${diagnostico.dominante}`);
    },
    [datos, irA, router],
  );

  const elegirOpcion = useCallback(
    (idPregunta: string, idOpcion: string) => {
      const nuevas = { ...respuestas, [idPregunta]: idOpcion };
      setEstado((previo) => ({ ...previo, respuestas: nuevas }));

      if (temporizador.current !== null) {
        window.clearTimeout(temporizador.current);
      }
      /* El paso viene del cierre y no de una ref: entre el clic y los 260 ms
         del temporizador no hay nada que pueda cambiarlo salvo que el visitante
         pulse "atrás" en ese intervalo — y en ese caso lo correcto es avanzar
         desde la pregunta que acaba de responder, que es justo lo que hace el
         valor capturado. */
      temporizador.current = window.setTimeout(() => {
        if (paso >= IDX_FIN - 1) {
          finalizar(nuevas);
        } else {
          irA(paso + 1);
        }
      }, RETARDO_AVANCE);
    },
    [paso, respuestas, finalizar, irA],
  );

  const alCompletarContacto = useCallback((nuevos: DatosContacto) => {
    /* Mismo envío que hace la landing. Llega aquí sólo por la vía de
       emergencia —sin datos guardados—, así que no hay duplicado: o se mandó
       allí, o se manda aquí, nunca las dos veces. */
    enviarFormulario(nuevos);

    /* ⚠️ LAS RESPUESTAS SE VACÍAN TAMBIÉN AQUÍ, y no basta con que las haya
       borrado el formulario del almacenamiento: si este estado conservara las
       viejas, el efecto de guardado —que corre justo después— las volvería a
       escribir encima de lo que el formulario acaba de limpiar, y el borrado
       quedaría deshecho sin que se vea.

       Se construye el estado entero en vez de esparcir el anterior,
       precisamente para que no quede nada de la pasada previa. */
    setEstado({ paso: IDX_INTRO, datos: nuevos, respuestas: {} });
  }, []);

  /* Durante la hidratación no se pinta el contenido: el estado ya viene
     sembrado del borrador y sería distinto del HTML que mandó el servidor. El
     hueco ocupa el alto de la pantalla para que no haya salto al aparecer. */
  if (!hidratado) {
    return <div className="min-h-svh" aria-hidden />;
  }

  /*
    ── LLEGÓ SIN DATOS DE CONTACTO ──

    Dos situaciones que desde aquí se ven idénticas y hay que tratar al revés:

    · EL NAVEGADOR SÍ GUARDA. Entonces es que de verdad no hay nada que hacer
      en esta URL: un enlace compartido, un marcador, o el "atrás" desde los
      resultados de un test recién terminado. Se manda a la landing, que es
      donde está la promesa que justifica rellenar el formulario. El efecto de
      arriba ya está navegando, así que aquí no se pinta nada — enseñar un
      formulario que va a desaparecer es peor que un instante en blanco.

    · EL NAVEGADOR NO GUARDA (Safari en privado, cookies de terceros
      bloqueadas). Mandarlo a la landing sería un BUCLE: rellenaría, no se
      guardaría, y volvería aquí sin datos una y otra vez. A ése se le monta el
      formulario en el sitio, donde los datos viven en memoria y el recorrido
      llega a terminar.
  */
  if (faltanDatos) {
    if (almacenDisponible()) {
      return <div className="min-h-svh" aria-hidden />;
    }
    return (
      <div className="mx-auto w-full max-w-md px-5 pt-10 pb-16">
        {/* Aquí el formulario SÍ se enfoca solo: es lo único que hay en la
            pantalla, así que no le quita el sitio a nada y ahorra un toque. */}
        <FormularioContacto onCompleto={alCompletarContacto} enfocarPrimerCampo />
      </div>
    );
  }

  const enIntro = paso === IDX_INTRO;
  const indicePregunta = paso - IDX_PRIMERA_PREGUNTA;
  const pregunta = enIntro ? null : PREGUNTAS[indicePregunta];

  return (
    <div className="mx-auto w-full max-w-4xl px-5 pt-8 pb-16 sm:pt-10">
      {/* ── Cabecera: atrás + progreso ──
          El atrás delega en el historial del navegador en vez de restar uno al
          paso. Así hay UN SOLO camino de vuelta —el del navegador— y los dos
          gestos no pueden desincronizarse. */}
      <div className="mb-8 flex items-center gap-4">
        {paso > IDX_INTRO ? (
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex shrink-0 items-center gap-1.5 text-[0.8rem] text-[var(--dg-texto-tenue)] transition-colors hover:text-[var(--dg-texto)]"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Atrás
          </button>
        ) : (
          /* Un hueco del mismo ancho mantiene la barra centrada en el puente.
             Sin él, la barra salta al aparecer el botón en la pregunta 1. */
          <span aria-hidden className="w-[3.9rem] shrink-0" />
        )}

        {/* La barra cuenta sólo las 7 preguntas: los tres campos ya quedaron
            atrás, en la landing, y contarlos aquí haría empezar el test con la
            barra a un tercio sin que se entienda por qué. */}
        {!enIntro && (
          <Progreso paso={indicePregunta} total={PREGUNTAS.length} />
        )}
        <span aria-hidden className="w-[3.9rem] shrink-0" />
      </div>

      {/*
        LA CLAVE DEL <div> CAMBIA CON EL PASO, y eso es lo que dispara las
        animaciones de entrada: React desmonta el nodo anterior y monta uno
        nuevo, así que las animaciones CSS vuelven a correr. Sin la clave,
        React reutilizaría el mismo nodo, sólo cambiaría el texto, y las ocho
        pantallas se sucederían con un corte seco.

        ⚠️ ESTE ENVOLTORIO YA NO ANIMA NADA. Llevaba `dg-entra`, y cuando la
        pregunta pasó a montarse en cascada —ilustración, enunciado y las
        cuatro respuestas, cada una con su retardo— las dos animaciones se
        pisaban: el bloque entero se desplazaba mientras sus hijos también lo
        hacían, y el escalonado se perdía en el movimiento del conjunto.

        Ahora cada pantalla trae la suya. El puente, que es una sola cosa, se
        queda con `dg-entra`; la pregunta la reparte entre sus piezas.
      */}
      <div key={paso}>
        {/* ── El puente entre el formulario y la primera pregunta ──
            Existe para cambiar de marcha: se pasa de dar datos a hablar de uno
            mismo, y sin este respiro la primera pregunta llega como el cuarto
            campo del formulario. */}
        {enIntro && (
          <div className="dg-entra mx-auto max-w-md text-center">
            {/* El nombre se usa aquí y en ningún otro sitio del test: es el
                único momento en que la página habla antes de preguntar, y
                sirve además para confirmar que lo que se escribió llegó. */}
            {datos.nombre && (
              <p className="mb-3 text-[0.75rem] tracking-[0.16em] text-[var(--dg-acento)] uppercase">
                Hola, {datos.nombre.trim()}
              </p>
            )}
            {/* El título del test, literal del cliente. Va aquí y no en la
                landing porque es el nombre del cuestionario, no de la página:
                esta pantalla es justo la que da paso a las preguntas. */}
            <h1 className="dg-titulo text-[1.45rem] leading-tight text-balance text-[var(--dg-texto)] sm:text-[1.75rem]">
              {FORMULARIO.testTitulo}
            </h1>

            <p className="dg-titulo mt-4 text-[1.05rem] leading-snug text-balance text-[var(--dg-texto-suave)] sm:text-[1.2rem]">
              {FORMULARIO.introTest}
            </p>
            {/* El salto de línea lo pone el montaje, no el copy: introAyuda es
                un array de renglones (ver contenido.ts). El <br> va ANTES de
                cada línea salvo la primera, que es lo que evita dejar un salto
                colgando al final del párrafo. */}
            <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--dg-texto-suave)]">
              {FORMULARIO.introAyuda.map((linea, i) => (
                <Fragment key={linea}>
                  {i > 0 && <br />}
                  {linea}
                </Fragment>
              ))}
            </p>
            <div className="mt-8">
              <BotonDg
                onClick={() => irA(IDX_PRIMERA_PREGUNTA)}
                ancho="completo"
              >
                Empezar
              </BotonDg>
            </div>
          </div>
        )}

        {pregunta && (
          <PasoPregunta
            pregunta={pregunta}
            elegida={respuestas[pregunta.id]}
            onElegir={(idOpcion) => elegirOpcion(pregunta.id, idOpcion)}
            numero={indicePregunta + 1}
            totalPreguntas={PREGUNTAS.length}
          />
        )}
      </div>
    </div>
  );
}
