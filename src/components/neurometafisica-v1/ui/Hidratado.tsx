"use client";

import { useEffect } from "react";

/**
 * Marca <html> con .cv2-hidratado cuando React arrancó. Los trazos de tiza
 * (.cv2-trazo-texto, .cv2-trazo, .cv2-firma-trazo) sólo se ocultan para
 * "escribirse" con esa clase puesta: si el JS no corre, se ven ya escritos.
 */
export function Hidratado() {
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.classList.add("cv2-hidratado");
    return () => raiz.classList.remove("cv2-hidratado");
  }, []);
  return null;
}
