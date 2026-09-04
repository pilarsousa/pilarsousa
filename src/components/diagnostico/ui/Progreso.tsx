/*
  La barra de avance del test.

  ── ES SÓLO LA BARRA: EL NÚMERO VIVE AL PIE DE LA PREGUNTA ──

  Llevaba encima "Paso 3 de 7" y un porcentaje. Dejó de tener sentido cuando el
  contador se movió al final de cada pregunta: eran dos sitios de la misma
  pantalla diciendo exactamente lo mismo, y el de arriba llegaba primero — con
  lo cual lo primero que se leía en cada pregunta era un número de expediente.

  Se queda la barra porque no es información repetida sino otra cosa: el número
  se lee, la barra se ve. De un vistazo dice cuánto falta sin tener que
  procesar una cifra, y eso es justo lo que sostiene a alguien en la quinta de
  siete pantallas.

  ── SIGUE ANUNCIÁNDOSE, AUNQUE YA NO SE LEA ──

  role="progressbar" con sus tres valores. Quitar el texto visible no puede
  dejar sin la información a quien usa un lector de pantalla: sin estos
  atributos, una barra sin rótulo es un div vacío. Con ellos se anuncia
  "Avance del diagnóstico, 3 de 7".

  ── EL ANCHO SE ANIMA CON transform, NO CON width ──

  El relleno se dibuja al 100% y se encoge con `scaleX`. Animar `width`
  recalcularía la disposición en cada fotograma; `transform` sólo compone. Los
  detalles, en .dg-progreso-relleno (diagnostico.css).
*/
export function Progreso({
  paso,
  total,
}: {
  /* Empieza en 0. Se le suma 1 para contar, porque nadie cuenta desde cero. */
  paso: number;
  total: number;
}) {
  const hechos = Math.min(paso + 1, total);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={hechos}
      aria-label="Avance del diagnóstico"
      /* mx-auto: la barra tiene tope de ancho, y sin él quedaría pegada a la
         izquierda de su hueco en vez de centrada entre el botón "atrás" y el
         margen simétrico de la derecha. */
      className="mx-auto h-1 w-full max-w-xl overflow-hidden rounded-full bg-[var(--dg-borde)]"
    >
      <div
        className="dg-progreso-relleno h-full w-full rounded-full bg-[var(--dg-acento)]"
        style={{ transform: `scaleX(${hechos / total})` }}
      />
    </div>
  );
}
