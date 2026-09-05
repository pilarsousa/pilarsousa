import { cn } from "@/lib/cn";

/*
  Filete con destello — el separador entre el hero y lo que viene debajo.

  Es el mismo recurso que SparkDivider en /volver-al-origen y
  /lista-de-espera, con los tokens de esta ruta. Se rehace en vez de importar
  aquél porque sus colores son los de aquellas landings (`vo-bone`, `accent`),
  y traerlos aquí metería una paleta ajena justo en la pieza cuyo trabajo es
  marcar dónde cambia el tono.

  ── LOS EXTREMOS SE DESVANECEN ──

  Una línea de extremos definidos, a lo ancho de la página, se lee como un
  BORDE — el canto de algo. Desvanecida se lee como una PAUSA, que es lo que
  hace falta: no separa dos cajas, separa dos momentos.

  ── DOS DEGRADADOS ESPEJADOS, NO UNO ROTADO ──

  SparkDivider consigue la simetría rotando la segunda mitad 180°. Aquí no,
  y la razón es concreta: un elemento con `transform` (o `rotate`) abre su
  propio contexto de apilado y pasa a pintarse con los posicionados, es decir
  DESPUÉS del contenido normal. Sobre un fondo cualquiera da igual; encima del
  hero, cuyo fundido inferior es un absoluto casi opaco, no: la mitad rotada
  flotaba por encima del fundido y la mitad sin rotar quedaba debajo. Media
  línea, y el destello tampoco.

  Escribiendo los dos degradados a mano, las dos mitades y el destello se
  pintan en la misma capa. La simetría deja de depender de una transformación
  que además mueve el elemento de plano.

  ── EL DESTELLO ES UN CARÁCTER, NO UN SVG ──

  A este tamaño una figura vectorial no aporta nada, y el glifo hereda el color
  y el cuerpo de la tipografía sin tener que declararlos.

  aria-hidden porque no aporta información: es una pausa visual. Un lector de
  pantalla que lo anunciara sólo añadiría ruido entre dos bloques.
*/
export function SeparadorDg({ className }: { className?: string }) {
  const filete = "h-px flex-1";

  return (
    <div aria-hidden className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          filete,
          "bg-[linear-gradient(90deg,transparent_0%,var(--dg-brillo-medio)_100%)]",
        )}
      />
      <span className="text-xs text-[var(--dg-acento)]">✦</span>
      <span
        className={cn(
          filete,
          "bg-[linear-gradient(90deg,var(--dg-brillo-medio)_0%,transparent_100%)]",
        )}
      />
    </div>
  );
}
