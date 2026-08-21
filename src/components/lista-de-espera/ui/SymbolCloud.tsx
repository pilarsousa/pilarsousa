"use client";

import { memo, useEffect, useState, type ComponentProps } from "react";
import { Cloud } from "react-icon-cloud";
import { NUBE } from "@/components/lista-de-espera/content";

/*
  Nube de símbolos que gira en tres dimensiones.

  Portada del IconCloud del portfolio, sobre la misma librería
  (react-icon-cloud, que envuelve el motor TagCanvas), con la paleta y los
  símbolos de esta landing.

  DOS DETALLES DEL MOTOR QUE NO SE PUEDEN CAMBIAR:

  1. Los iconos van envueltos en <a>. TagCanvas recoge sus elementos con
     getElementsByTagName("a") sobre los hijos del lienzo; un <span> o un <img>
     suelto le resulta invisible y dibujaría una nube vacía. Los enlaces son
     decorativos, así que llevan preventDefault y quedan fuera del recorrido de
     tabulación: no llevan a ninguna parte y no deben capturar el teclado.

  2. Se espera a que las imágenes estén cargadas antes de montar la nube. El
     motor mide cada icono al crear su tag, y con la imagen aún sin cargar la
     mide como 0x0 y la deja fuera del reparto. De ahí la precarga previa.

  El <img> es una etiqueta normal y no next/image a propósito: TagCanvas
  manipula el DOM por su cuenta y necesita los nodos tal cual, sin la envoltura
  ni el lazy loading que añade el componente de Next.
*/

/* Giro lento a propósito: es un elemento de fondo, no el foco de la sección, y
   a más velocidad los símbolos compiten con el texto de al lado. Estos valores
   son la mitad de los iniciales.

   El tipo se toma de la propia firma del componente en lugar de usar `as
   const`: aquello dejaba las propiedades como solo lectura y la librería espera
   una tupla mutable en `initial`. */
const OPCIONES: ComponentProps<typeof Cloud>["options"] = {
  reverse: true,
  depth: 1,
  wheelZoom: false,
  imageScale: 2,
  activeCursor: "default",
  tooltip: "native",
  initial: [0.08, -0.08],
  clickToFront: 500,
  tooltipDelay: 0,
  outlineColour: "#0000",
  maxSpeed: 0.015,
  minSpeed: 0.007,
};

function precargar(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    /* Se resuelve también en error: una imagen rota no debe dejar la nube
       entera esperando para siempre. */
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function SymbolCloudBase() {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    let cancelado = false;
    Promise.all(NUBE.map((s) => precargar(s.image))).then(() => {
      if (!cancelado) setListo(true);
    });
    return () => {
      cancelado = true;
    };
  }, []);

  /* Reserva de alto mientras carga: sin esto la sección da un salto cuando la
     nube aparece de golpe. */
  if (!listo) {
    return <div aria-hidden className="h-[320px] w-full sm:h-[380px]" />;
  }

  return (
    <div aria-hidden className="[&_canvas]:!max-w-full">
      <Cloud
        containerProps={{
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          },
        }}
        options={OPCIONES}
      >
        <>
          {NUBE.map(({ name, image }) => (
            <a
              key={name}
              href="#"
              title={name}
              tabIndex={-1}
              onClick={(e) => e.preventDefault()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={name} src={image} width={44} height={44} />
            </a>
          ))}
        </>
      </Cloud>
    </div>
  );
}

/* memo: el componente no recibe props, así que puede saltarse cualquier
   re-render que venga de arriba. No es sólo rendimiento — cada render vuelve a
   crear el objeto containerProps y la lista de hijos de <Cloud>, TagCanvas lo
   lee como una configuración nueva y rehace la esfera: la nube pega un tirón y
   cambia de sentido. Con memo, el lienzo sigue girando sin enterarse. */
export const SymbolCloud = memo(SymbolCloudBase);
