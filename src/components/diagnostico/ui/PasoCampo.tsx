"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Mail, User } from "lucide-react";
import { BotonDg } from "@/components/diagnostico/ui/BotonDg";
import { WhatsAppIcon } from "@/components/lista-de-espera/ui/WhatsAppIcon";

/*
  Un paso del formulario previo: un solo campo en pantalla.

  ── UN CAMPO POR PANTALLA, QUE ES LO QUE PIDE EL DOCUMENTO ──

  "Captura, uno por uno, interactivo". Cuesta tres pantallas en vez de una,
  pero cada una pide una sola cosa y se responde sin pensar. Un formulario con
  tres campos a la vez se lee como un trámite; éste se lee como una
  conversación, que es el efecto que busca la referencia de Hormozi.

  ── ES UN <form> DE VERDAD ──

  Y no un div con un botón. Eso da gratis dos cosas que a mano cuestan trabajo:
  la tecla Intro envía —que es como se rellena un campo suelto— y el teclado de
  los móviles muestra "Ir" en vez de un salto de línea.

  `noValidate` desactiva los globos del navegador: sus mensajes salen en el
  idioma del sistema y con un tono que no es el de la página. La validación la
  hace el componente padre, que es quien sabe qué se está pidiendo.

  ── EL TEXTO VA ALINEADO A LA IZQUIERDA ──

  Estuvo centrado mientras la tarjeta era una columna estrecha, y ahí era lo
  correcto. Ahora la tarjeta tiene la ilustración al lado: el contenido ocupa
  una columna con su propio margen, y centrarlo dentro de ella lo dejaría
  flotando respecto del campo y del botón, que sí ocupan el ancho completo.

  ── EL FOCO SE PONE SOLO, PERO NO SIEMPRE ──

  Entre pasos sí: sin eso, cada campo obliga a tocarlo antes de escribir, y son
  tres toques de más en el punto de mayor abandono del embudo.

  Al CARGAR LA PÁGINA no, y de ahí `enfocarAlMontar`. En la landing el
  formulario está empotrado debajo de la promesa: enfocarlo al entrar
  desplazaría la página hasta él —saltándose el titular que justifica
  rellenarlo—, abriría el teclado en un móvil antes de que nadie lo haya
  pedido, y a un lector de pantalla le quitaría el principio de la página.

  Quien decide es el componente padre, porque es el único que sabe si está en
  el primer paso recién cargado o en el segundo tras pulsar "continuar".
*/

/* El nombre del icono viaja como texto desde contenido.ts —que es un archivo
   de contenido y no debe importar componentes— y se traduce aquí. */
const ICONOS = {
  usuario: User,
  correo: Mail,
  whatsapp: WhatsAppIcon,
} as const;

export type NombreIcono = keyof typeof ICONOS;

export function PasoCampo({
  campo,
  icono,
  distintivo,
  etiqueta,
  ayuda,
  placeholder,
  tipo,
  autoComplete,
  inputMode,
  valor,
  error,
  onCambio,
  onEnviar,
  onAtras,
  rotuloBoton,
  enfocarAlMontar = true,
}: {
  campo: string;
  icono: NombreIcono;
  distintivo: string;
  etiqueta: string;
  ayuda: string;
  placeholder: string;
  tipo: string;
  autoComplete: string;
  inputMode: "text" | "email" | "tel";
  valor: string;
  error: string | null;
  onCambio: (valor: string) => void;
  onEnviar: () => void;
  /* Ausente en el primer campo: desde ahí no hay a dónde volver. Su ausencia es
     lo que decide si se dibuja el botón de atrás, en vez de un booleano
     aparte — así no se puede quedar un botón sin nada que hacer. */
  onAtras?: () => void;
  rotuloBoton: string;
  enfocarAlMontar?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const Icono = ICONOS[icono];

  useEffect(() => {
    if (!enfocarAlMontar) return;
    /* preventScroll: en móvil, enfocar un campo desplaza la página para
       dejarlo sobre el teclado. Como aquí el campo ya está donde tiene que
       estar, ese desplazamiento sólo produce un salto. */
    ref.current?.focus({ preventScroll: true });
  }, [campo, enfocarAlMontar]);

  const idError = `${campo}-error`;

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); onEnviar(); }}>
      {/* ── EL DISTINTIVO ──

          Dice para qué se pide este dato antes de pedirlo, que es lo que quita
          el reparo a escribirlo: nadie deja su teléfono sin saber para qué.
          Sustituye a la cabecera fija que llevaba antes la tarjeta, y a
          diferencia de aquélla cambia con el campo.

          El icono va aria-hidden: repite lo que ya dice el texto de al lado. */}
      {/* El aria-hidden va en el <span> y no en <Icono>: el glifo de WhatsApp
          es un componente propio que sólo acepta className, así que pasarle
          atributos sueltos no compila. Envolverlo funciona igual y sirve para
          los tres. */}
      <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.16em] text-[var(--dg-acento)] uppercase">
        <span aria-hidden className="flex shrink-0">
          <Icono className="size-4" />
        </span>
        {distintivo}
      </p>

      {/* ── EL TAMAÑO ESTÁ MEDIDO CONTRA EL TITULAR MÁS LARGO ──

          "¿A qué email te lo envío?" son 25 caracteres, y en Trajan —que es
          una versalita ancha— pide unos 400 px. La columna de contenido mide
          434 (56rem de tarjeta, 1fr de 1,8, menos el relleno), así que entra
          con unos 34 px de margen.

          A 1,75rem pedía 437 y se partía en dos renglones, que es lo que hacía
          crecer la tarjeta en ese paso y saltar todo lo que hay debajo. Se
          arregló con las dos cosas a la vez: ensanchando la tarjeta y bajando
          el cuerpo un punto. Sólo con el ancho quedaba al filo; sólo con el
          cuerpo, el titular quedaba demasiado pequeño al lado del hero.

          ⚠️ SI SE ALARGA ALGÚN TITULAR, hay que rehacer esta cuenta — o
          confiar en el suelo de altura de la tarjeta, que está justo para
          absorber un renglón de más sin que se note. */}
      <label
        htmlFor={campo}
        className="dg-titulo mt-3 block text-[1.4rem] leading-tight text-[var(--dg-texto)] sm:text-[1.6rem]"
      >
        {etiqueta}
      </label>

      <p className="mt-2 max-w-sm text-[0.85rem] leading-relaxed text-[var(--dg-texto-suave)]">
        {ayuda}
      </p>

      {/* ── EL CAMPO, CON SU ICONO DENTRO ──

          El icono va en absoluto y el relleno izquierdo del input le hace
          sitio. No se puede meter dentro del <input> —no admite hijos— ni
          usarlo como imagen de fondo, porque entonces no se podría teñir con
          el color del tema.

          pointer-events-none: está encima del campo, y sin esto un clic sobre
          el icono no llegaría al input y no enfocaría nada. */}
      <div className="relative mt-5">
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--dg-texto-tenue)]"
        >
          <Icono className="size-[1.05rem]" />
        </span>
        <input
          ref={ref}
          id={campo}
          name={campo}
          type={tipo}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={valor}
          onChange={(e) => onCambio(e.target.value)}
          /* aria-invalid y aria-describedby son lo que hace que el error se
             anuncie: sin ellos el mensaje está en pantalla pero un lector de
             pantalla no lo asocia al campo y lo lee como texto suelto. */
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? idError : undefined}
          className="w-full rounded-xl border border-[var(--dg-borde)] bg-[var(--dg-superficie)] py-3.5 pr-4 pl-11 text-[1rem] text-[var(--dg-texto)] placeholder:text-[var(--dg-texto-tenue)] focus:border-[var(--dg-borde-vivo)] focus:outline-none aria-[invalid]:border-[#c2603f]"
        />
      </div>

      {/* role="alert" para que el error se lea en cuanto aparece, sin esperar a
          que el visitante navegue hasta él. */}
      {error && (
        <p id={idError} role="alert" className="mt-2 text-[0.82rem] text-[#e08a68]">
          {error}
        </p>
      )}

      {/* ── LA FILA DE BOTONES ──

          El de atrás es un cuadrado con una flecha, a la izquierda, y el de
          continuar ocupa todo lo que sobra. Es cuadrado y no ancho a
          propósito: si los dos midieran lo mismo, retroceder y avanzar
          pesarían igual, y sólo uno de los dos es el camino.

          `size-[3em]` con `sinRelleno`: el relleno horizontal del botón normal
          impide que sea cuadrado, y 3em es exactamente el `min-h` de BotonDg,
          así que los dos tienen la misma altura sin fijar ningún píxel. */}
      <div className="mt-5 flex items-stretch gap-2.5">
        {onAtras && (
          <BotonDg
            variante="secundario"
            ancho="propio"
            sinRelleno
            onClick={onAtras}
            ariaLabel="Volver al paso anterior"
            className="size-[3em] shrink-0"
          >
            <ArrowLeft className="size-[1.15em]" aria-hidden />
          </BotonDg>
        )}
        <BotonDg type="submit" ancho="propio" className="flex-1">
          {rotuloBoton}
          {/* La flecha va DENTRO del botón y no como icono suelto al lado:
              forma parte del rótulo —dice hacia dónde lleva— y así hereda su
              color y su tamaño sin tener que repetirlos. */}
          <ArrowRight className="size-[1.1em] shrink-0" aria-hidden />
        </BotonDg>
      </div>
    </form>
  );
}
