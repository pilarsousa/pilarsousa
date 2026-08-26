import { cn } from "@/lib/cn";
import type { Tramo } from "@/components/lista-de-espera/content";

/*
  Pinta un texto troceado con sus resaltados.

  El copy se guarda partido en tramos —`{ text, acento?, fuerte? }`— y no como
  una frase con HTML dentro, porque content.ts es data plana: si llevara
  etiquetas, cada cambio de copy obligaría a tocar marcado y cada cambio de
  diseño obligaría a tocar el copy.

  DOS FORMAS DE RESALTAR, y son distintas a propósito:

  · `acento` es el resaltado principal.
  · `fuerte` es el secundario, para frases que rematan un bloque.

  Ninguno trae color fijo: los dos se pasan como clase desde fuera. Es
  imprescindible en esta landing, donde el mismo párrafo puede caer sobre blanco
  o sobre la lluvia de código — el verde de la marca funciona sobre oscuro y se
  vuelve ilegible sobre blanco, así que cada panel decide con qué destaca.
*/
export function Tramos({
  partes,
  acento,
  fuerte,
}: {
  partes: Tramo[];
  acento?: string;
  fuerte?: string;
}) {
  return (
    <>
      {partes.map((parte) => {
        if (!parte.acento && !parte.fuerte) {
          return <span key={parte.text}>{parte.text}</span>;
        }

        return (
          <span
            key={parte.text}
            className={cn(
              parte.acento && (acento ?? "text-accent"),
              parte.fuerte && (fuerte ?? "font-semibold"),
            )}
          >
            {parte.text}
          </span>
        );
      })}
    </>
  );
}
