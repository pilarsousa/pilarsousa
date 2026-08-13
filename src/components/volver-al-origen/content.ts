/*
  Todo el texto de la landing de lista de espera, en un único sitio.

  El copy es el entregado por el cliente y se transcribe literal: los títulos
  van en minúsculas con las versalitas aplicadas por CSS (text-transform), no
  escritos en MAYÚSCULAS aquí, para que los lectores de pantalla no los deletreen
  letra a letra.

  Los testimonios no se copian aquí: son las reseñas reales que ya viven en
  mision-origen/ui/testimonials.ts. Este archivo sólo decide CUÁLES se muestran.
*/

import { TESTIMONIALS } from "@/components/mision-origen/ui/testimonials";

export const HERO = {
  eyebrow: "Lista de espera",
  titleTop: "3.ª edición de",
  titleMain: ["Volver al", "Origen"],
  /* Subtítulo del cliente. Va partido en tramos para poder resaltar los cuatro
     ámbitos del cierre sin meter HTML dentro del string. */
  intro: [
    {
      text: "Entrenamiento intensivo de 40 días de metafísica práctica con Pilar Sousa para salir del estancamiento espiritual, encarnar una nueva identidad y manifestar una realidad extraordinaria en ",
    },
    { text: "salud, relaciones, dinero y propósito.", strong: true },
  ],
  privacy: "Tu información está 100% protegida. No enviamos spam.",
  /* Texto del CTA del hero, que ahora abre el modal en vez de tener el
     formulario debajo. */
  cta: "Quiero acceder a la lista de espera",
};

/* Copy del modal del formulario. El badge y el aviso de privacidad se reutilizan
   de HERO: son los mismos y duplicarlos los dejaría desincronizados. */
export const MODAL = {
  title: "Reservá tu lugar",
  intro:
    "Serás de los primeros en acceder, con precio especial y bonos exclusivos.",
  close: "Cerrar",
};

export const FORM = {
  fields: {
    nombre: "Tu nombre",
    telefono: "Tu número de WhatsApp",
    email: "Tu correo electrónico",
  },
  submit: "Quiero acceder a la lista de espera",
  submitting: "Registrando…",
  success: "¡Estás en la lista!",
  error: "No pudimos registrarte. Revisá tu conexión y probá de nuevo.",
};

/* Los iconos se nombran, no se importan: content.ts es data y no debe arrastrar
   componentes de React. BenefitCard traduce el nombre al icono de lucide. */
export const BENEFICIOS = {
  title: "¿Qué te llevarás por acceder a la",
  titleAccent: "lista de espera",
  items: [
    {
      icon: "clock" as const,
      title: "Acceso anticipado",
      text: "Entérate antes que nadie de la próxima apertura y ten prioridad para conseguir una de las plazas.",
    },
    {
      icon: "tag" as const,
      title: "Mejores condiciones",
      text: "Accede a condiciones y precio especiales antes de la apertura al público.",
    },
    {
      icon: "gift" as const,
      title: "Regalos y bonos especiales",
      text: "Recibe regalos y bonos exclusivos por formar parte de la lista de espera.",
    },
  ],
  cta: "Quiero acceder",
};

export const TESTIMONIOS = {
  title: "Lo que dicen quienes",
  titleAccent: "ya dieron el paso",
  subtitle: "Validado por quienes ya lo vivieron.",
  cta: "Quiero acceder",
};

/*
  Qué reseñas entran en el carrusel, por índice sobre TESTIMONIALS.

  El cliente pidió "los 5 mejores": estas cinco son las de 5 estrellas que
  además tienen foto de perfil, así que ninguna card cae en el avatar de
  respaldo con la inicial. Para mostrar las trece, cambiar FEATURED por
  TESTIMONIALS.map((_, i) => i).
*/
const FEATURED = [1, 11, 0, 12, 4];

export const FEATURED_TESTIMONIALS = FEATURED.map((i) => TESTIMONIALS[i]).filter(
  Boolean,
);

export const PILAR = {
  title: "¿Quién es",
  titleAccent: "Pilar Sousa",
  signature: "Pilar Sousa",
  /* Bio entregada por el cliente para esta landing. Es más corta que la de
     Misión Origen y cambia detalles (aquí el libro va antes que la comunidad),
     así que son textos distintos a propósito y no deben unificarse. */
  paragraphs: [
    "Hace más de 10 años tuve mi despertar espiritual. Desde entonces comenzó una búsqueda incansable por comprender cómo funcionan realmente la realidad, la consciencia y las leyes universales que gobiernan nuestra vida.",
    "Ese camino me llevó a escribir mi primer libro y a acompañar a cientos de personas en sus propios procesos de transformación.",
    "Hoy, después de haber compartido mis enseñanzas con una comunidad de más de 600.000 personas, Volver al Origen reúne todo aquello que he aprendido, vivido y aplicado durante estos años.",
  ],
  cta: "Quiero acceder a la lista de espera",
};

export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} Pilar Sousa. Todos los derechos reservados.`,
};

export const GRACIAS = {
  title: "¡Te falta el último paso!",
  intro: [
    { text: "Gracias, " },
    { text: "tu registro ha sido completado", strong: true },
    { text: " y solo te falta " },
    { text: "acceder al grupo privado de WhatsApp", strong: true },
    { text: " para no perderte ninguna novedad." },
  ],
  detail: [
    { text: "Toda la información importante sobre la próxima edición y los próximos pasos " },
    { text: "los iremos compartiendo a través de este grupo privado de WhatsApp", strong: true },
  ],
  nudge: "Haz clic ahora aquí abajo para acceder.",
  cta: "Acceder al grupo privado de WhatsApp",
  whatsappUrl: "https://chat.whatsapp.com/HMR8VTK4wFVHczUuCKc24u",
};

/* Destino tras completar el formulario. Vive aquí y no suelto en el formulario
   porque es el final del recorrido que describe este archivo. */
export const GRACIAS_PATH = "/volver-al-origen/gracias";

/* Aquí vivía FORM_ANCHOR ("#registro"), el ancla del formulario del hero. Se
   retiró al pasar el formulario al modal: los CTA ya no navegan a ninguna
   parte, lo abren. El id "registro" sigue en el <h1> del hero porque es a lo
   que apunta el aria-labelledby de la sección. */
