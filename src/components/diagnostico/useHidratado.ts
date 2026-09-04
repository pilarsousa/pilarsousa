"use client";

import { useSyncExternalStore } from "react";

/*
  Devuelve false mientras React está hidratando y true a partir de entonces.

  ── QUÉ PROBLEMA RESUELVE ──

  El embudo tiene que leer sessionStorage para recuperar el avance, y eso choca
  con la hidratación: el servidor no tiene sessionStorage, así que si el primer
  render del navegador ya usara ese dato, produciría un HTML distinto al que
  vino del servidor y React descartaría el árbol entero.

  La salida habitual —un `useState(false)` que un efecto pone a true— hace
  exactamente lo mismo, pero pasando por un efecto que sólo existe para
  provocar un segundo render. Es lo que la regla `set-state-in-effect` señala
  con razón: un efecto que llama a setState en su cuerpo encadena renders.

  ── POR QUÉ useSyncExternalStore ES LO CORRECTO AQUÍ ──

  Es la API que React trae precisamente para leer un valor que difiere entre
  servidor y cliente. Recibe una instantánea para cada lado, pinta la del
  servidor durante la hidratación y vuelve a renderizar con la del cliente en
  cuanto termina. Sin efectos y sin desajuste.

  Las dos instantáneas devuelven BOOLEANOS Y NO OBJETOS, y eso importa: React
  llama a getSnapshot en cada render y compara el resultado con el anterior. Un
  objeto nuevo cada vez nunca sería igual al anterior y provocaría un bucle de
  renders; un booleano se compara por valor y es estable para siempre.

  `suscribir` no hace nada porque este valor no cambia nunca después de
  hidratar. Es una constante del módulo, no una función creada en cada render:
  una referencia nueva haría que React se resuscribiera continuamente.
*/

const suscribir = () => () => {};
const enCliente = () => true;
const enServidor = () => false;

export function useHidratado(): boolean {
  return useSyncExternalStore(suscribir, enCliente, enServidor);
}
