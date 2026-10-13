import type { StaticImageData } from "next/image";

export type Testimonial = {
  name: string;
  /** Full opinion text (shown in the modal). */
  text: string;
  /** 1–5. */
  stars: number;
  /** Human-readable date as provided. */
  date: string;
  /** Profile photo, or null → render the name's initial. */
  photo: StaticImageData | null;
};

/* ⚠️ TESTIMONIOS TEMPORALES — reemplazar por reseñas reales de esta edición.
   Las reseñas de /mision-origen siguen en components/mision-origen/ui/
   testimonials.ts. Sin foto: la card muestra la inicial del nombre. */
const TEXTO =
  "Testimonio temporal. Aquí va la reseña real de una persona que participó: qué le pasaba antes, qué experimentó durante el evento y qué cambió después.\n\nUn segundo párrafo opcional, para ver cómo se comporta la card cuando el texto es largo y aparece el \"Ver más\".";

export const TESTIMONIALS: Testimonial[] = [
  { name: "Alumna temporal", text: TEXTO, stars: 5, date: "Fecha", photo: null },
  { name: "Alumno temporal", text: TEXTO, stars: 5, date: "Fecha", photo: null },
  { name: "Participante temporal", text: TEXTO, stars: 5, date: "Fecha", photo: null },
  { name: "Reseña temporal", text: TEXTO, stars: 5, date: "Fecha", photo: null },
  { name: "Nombre temporal", text: TEXTO, stars: 5, date: "Fecha", photo: null },
];
