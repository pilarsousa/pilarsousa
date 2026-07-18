import type { StaticImageData } from "next/image";
import card1 from "@/../public/Testimonios/cards-test/card-1.png";
import card2 from "@/../public/Testimonios/cards-test/card-2.png";
import card4 from "@/../public/Testimonios/cards-test/card-4.png";
import card6 from "@/../public/Testimonios/cards-test/card-6.png";
import card7 from "@/../public/Testimonios/cards-test/card-7.png";
import card8 from "@/../public/Testimonios/cards-test/card-8.png";
import card11 from "@/../public/Testimonios/cards-test/card-11.png";
import card12 from "@/../public/Testimonios/cards-test/card-12.png";
import card13 from "@/../public/Testimonios/cards-test/card-13.png";

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

/* Reseñas reales. Las cards sin foto (3, 5, 9, 10) muestran la inicial del
   nombre. El "título" original (lo que iba entre comillas) se omite a pedido:
   en la card y el modal se muestra sólo la opinión. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Federico Esteso",
    text: "Volver al Origen es magico! He aprendido a vivir en conciencia y coherencia. Esta capacitación en metafísica es lo que necesitaba con ejemplos prácticos y mas sencillos de lo que pensaba. Siento que soy infinito y tengo paz. Me he descubierto a mi mismo desde otro lugar mas poderoso, de alta autoestima y apreciando el momento presente de mi vida en un 100 %.\nMi ansiedad por miedos y querer controlar todo la domino y gestiono feliz.\nGracias Pilar",
    stars: 5,
    date: "29 May. 2026",
    photo: card1,
  },
  {
    name: "Karen Garcia",
    text: "Para mí ha sido una experiencia totalmente transformada! Un antes y un después. Desde la primera semana me sentí cómo una cebolla, dejando caer capas y capas que eran necesarias para dejar ver a el ser infinito y poderoso que soy. Si estás listo o lista para realmente vivir desde el corazón y transformar esos miedos que a veces nos duermen en poder y diamante puro. Este es el lugar! Pilar es un ser que enseña y motiva con su propia vida. Posee mucha sabiduría y te guiará con amor.",
    stars: 5,
    date: "29 May. 2026",
    photo: card2,
  },
  {
    name: "Luciana Garcia",
    text: "Para mi este entrenamiento con Pilar ha sido un regalo de la vida. Ella ha sabido compilar con gran sabiduría información de metafísica de toda una vida, con un paso a paso real y práctico para que todos entendamos cómo aplicar en nuestra vida.\n\nEl entrenamiento de Pilar es el resultado evidente de años de estudio y preparación para compartir una joya con el mundo.\n\nMe siento más feliz y preparada que nunca para llevar una vida más coherente con lo que dicta mi corazón. Siento que he integrado finalmente los recuerdos de mi alma para jugar el Juego de la Vida :)\n\nGRACIAS querida Pilar, te quiero mucho.\nLu",
    stars: 5,
    date: "5 Jun. 2026",
    photo: null,
  },
  {
    name: "Lisally Garcia",
    text: "Este programa llegó justo a tiempo, y agradecida inmediatamente porque Pilar nos ha podido guiar, orientar entre tanta creencias, pensamientos y pajas mentales (porque yo si que tenía 😂 ), me ayudó mucho porque dar orden a muchas de las cosas que mi vieja identidad me había vendido ha sido liberador, sigo aprendiendo, y recordando con amor cada aporte suyo para construir mi nueva identidad, para que cada vez que mire atrás recuerde quién soy y quién me acompaña. Gracias Pilar ❤️",
    stars: 4,
    date: "17 Jun. 2026",
    photo: card4,
  },
  {
    name: "Alondra Lázaro Cordova",
    text: "Volver al origen fue una experiencia maravillosa, me hizo ver y ser conciente de la paja mental que mantenía en mi zona de confort, gracias a Pilar puedo ser capaz de identificarme con el ser abundante, infinito, presente y conciente, que toda expansión viene de la incomodidad, que el sentirse incómodo no es malo sino necesario para crecer. 🥰🔥❤️",
    stars: 4,
    date: "19 Abr. 2026",
    photo: null,
  },
  {
    name: "THE GABO GM",
    text: "Es un programa excelente, la verdad te hacen ver las cosas desde dentro, desde la verdad, sin embargo se me hace muy rápido, el hecho de que haya 2 codigos por semana es mucho, es mucha información para poner en práctica y para digerirla. Siento que deberia ser uno por semana. Sin embargo estoy muy agradecido por conocer a Pilar y aprender tantas cosas.",
    stars: 4,
    date: "29 May. 2026",
    photo: card6,
  },
  {
    name: "Carolina Zepeda",
    text: "Ha sido un camino de autodescubrimiento, de darme cuenta que me sentía bloqueada y estancada por el simple hecho de estar interfiriendo con mi creador. Me encanta como Pilar nos fue llevando de la mano con una coherencia increíble, viviendo los códigos con nosotros y experimentándolos conforme íbamos avanzando, demostrando en carne propia que si funcionan. Me siento súper agradecida de ser parte de la primera edición. De ahora en adelante viviré los retos de mi vida no con miedo sino con la mirada en Dios, dejaré de tomarme la vida tan enserio. No venimos a sufrir ni a sanar, venimos a recordar quienes somos ✨",
    stars: 5,
    date: "30 May. 2026",
    photo: card7,
  },
  {
    name: "Germán Araujo",
    text: "Pilar es un faro en la oscuridad. Y como cualquier cerillo (o fósforo)...la mas leve luz es capaz de apartar a la mas profunda oscuridad. Es esa luz que no está dispuesta a apagarse. No hará el trabajo de remar por nosotros, nosotros DEBEMOS hacerlo. SU aporte es mantener esa luz en forma CLARA, CONSISTENTE, COHERENTE que nos ayuda en enfocarnos claramente en la dirección, forma de nuestra vida.\nSu curso no se trata de tener la píldora mágica, es un llamado a tu YO interno para recordar quien eres y que actúes en congruencia. Y no es un camino color de rosa. Es despertar en la marea brava y debes nadar, debes brazear por tí, pero no a ciegas sino con la lucidez que te regala Pilar. Ese faro. Ahí bajo la promesa de no apagarse, bajo tu responsabilidad de seguir remando.\nEl feedback para el curso sería: a) Información mas gráficamente estructurada para sintetizar y relacionar conceptos. 2) Un horario para LATAM !!!!! la diferencia de horario muchas veces nos obliga a llevar sesiones asincrónicas cuando el valor es escucharla en vivo!.\ngracias",
    stars: 4,
    date: "1 Jun. 2026",
    photo: card8,
  },
  {
    name: "Victor Flores",
    text: "Pilar tiene una energia unica que sientes que conectas con ella desde el principio aparte de que es super clara su manera de explicar y transmitir las cosas",
    stars: 5,
    date: "16 Jun. 2026",
    photo: null,
  },
  {
    name: "Francesca",
    text: "Al principio dudé un poco por mi miedo (de entonces) podía perder tiempo o dinero? Algo me impulsó y dijo \"aquí es\"... Y pues si, está siendo de las mejores inversiones en mi. Un verdadero placer y honor estar en este entrenamiento de desarrollo personal y espiritual con Pilar.\nMuchos años con información variada y revuelta en la cabeza, buscando técnicas fuera para transformar lo de dentro... Ahora entiendo, asimilo y sobre todo \"siento\" lo importante y esencial.\nSé que a nuestra mente le viene bien las estructuras, por eso, esta forma en que está sabiendo ponerla sobre la mesa y darla a conocer, me parece genial; que por cierto ella transmite seguridad de todo lo que sabe, es dulce y firme a la vez; Y que además ha ido también pasando situaciones sobre la marcha con nosotros, como una buena líder.\nEl miedo se pasa con acción, hábitos y coherencia en uno mismo.\nSin duda me llevo muchas experiencias y aprendizajes a seguir implementando día a día. Hoy casi al acabar los 40 días, soy literal y metafóricamente otra persona.\nLo recomiendo totalmente. Gracias infinitas Pilar, Sonia y equipo 💝♾️💫",
    stars: 5,
    date: "",
    photo: null,
  },
  {
    name: "Madelaine Ríos Godoy Nicol",
    text: "Fue un taller de metafísica que literalmente me explotó la cabeza.\nMuy práctica y clara la explicación de Pilar\n100% recomendado",
    stars: 5,
    date: "16 Jun. 2026",
    photo: card11,
  },
  {
    name: "Beatriz Sebastián",
    text: "He hecho muchas formaciones pero esta experiencia ha sido distinta, transformadora. No es solo teoría, te aporta conciencia y claridad, te desafía; cada clase era más útil y reveladora que la anterior, no te deja indiferente ni puedes volver a ser como antes. Pilar transmite una energía muy potente y su pasión es contagiosa! Súper recomendable! Gracias :)",
    stars: 5,
    date: "18 Jun. 2026",
    photo: card12,
  },
  {
    name: "Aryab Rafael",
    text: "Sin duda un cambio total de paradigma de vida, precisa en su estructura y orden, conceptos que venia aprendiendo hace años, Pilar hace que sea simple y tangible este proceso para su aplicacion, agradecido con ella por haber tomado esas decisiones disruptiva e incomodisimas, que hoy nos han permitido a todos nosotros recordar y tener claridad",
    stars: 5,
    date: "30 May. 2026",
    photo: card13,
  },
];
