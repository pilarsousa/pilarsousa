import type { Metadata } from "next";

/*
  Bootcamp Reset Identidad V1 — la versión en oro y negro, servida en
  /bootcamp-v1. page.tsx aquí es /bootcamp-v1 y gracias/page.tsx es
  /bootcamp-v1/gracias.

  Esta landing estuvo primero en la raíz del dominio y después en /bootcamp.
  Al entrar la V2 —el mismo Bootcamp con la identidad del Diagnóstico— se
  quedó con /bootcamp y ésta bajó a /bootcamp-v1. El código no cambió: sólo
  su ruta, sus imports y este comentario.

  Los tokens que usa son los que declara el @theme de globals.css en :root, así
  que no hay nada que redefinir — .bc-scope sólo lleva el grano de puntos.
*/

export const metadata: Metadata = {
  title: "Bootcamp Reset Identidad | Pilar Sousa",
  description:
    "No manifiestas lo que deseas. Manifiestas quien eres. Un campamento de metafísica práctica para resetear tu identidad y volver al origen.",
  /*
    ⚠️ noindex PORQUE EL COPY ES EL MISMO QUE EL DE /bootcamp, palabra por
    palabra. Son dos versiones de una sola página y sólo cambia el color: si
    Google indexa las dos, compiten entre ellas por la misma búsqueda y la que
    puede acabar ganando es la que no queremos mostrar.

    Se retira el día que esta versión vuelva a ser la principal, o cuando el
    copy de una de las dos deje de ser el de la otra.
  */
  robots: { index: false, follow: false },
  openGraph: {
    title: "Bootcamp Reset Identidad | Pilar Sousa",
    description:
      "No manifiestas lo que deseas. Manifiestas quien eres. Un campamento de metafísica práctica para resetear tu identidad.",
    type: "website",
    locale: "es_ES",
  },
};

export default function BootcampV1Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bc-scope">{children}</div>;
}
