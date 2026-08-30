import { ClockAlert, Video } from "lucide-react";

/*
  Los dos distintivos del hero: "LISTA DE ESPERA" y "3.ª EDICIÓN".

  ── ERAN DOS PNG Y AHORA SON CÓDIGO ──

  Antes se servían como lista-de-espera.png y 3era-edicion.png, y eso costaba
  más de lo que parecía:

  · 80 KB de imagen para dibujar dos píldoras con texto.
  · el texto no era texto — no se podía seleccionar, ni traducir, ni leer con un
    lector de pantalla salvo por su `alt`, ni escalaba con las preferencias de
    tipografía del sistema.
  · cada archivo traía cocidos su tamaño, su color y su margen transparente, así
    que ajustar el alto obligaba a compensar ese aire a mano con márgenes
    negativos: en el hero había un -3,2vw sólo para cancelarlo.
  · y no podían reaccionar al cursor.

  En código son texto de verdad, pesan cero y responden.

  ── EL CRISTAL SON CUATRO CAPAS Y NINGUNA SOBRA ──

  1. `backdrop-blur` desenfoca la foto del hero por detrás. Es lo que convierte
     la píldora en vidrio en vez de en un rectángulo de color.
  2. un fondo verde muy diluido, que le da tinte al vidrio. Sin él el desenfoque
     parece un fallo de renderizado.
  3. el filete exterior en verde translúcido, que recorta la pieza del fondo.
  4. dos sombras INTERNAS: una clara arriba y una oscura abajo. Son las que dan
     el relieve — sin ellas la píldora se ve plana por muy desenfocada que esté.
     Es el mismo recurso que ya usan el botón y los tarjetones de la landing.

  ── AL PASAR EL RATÓN ──

  La píldora se levanta un pelo, el vidrio se aclara, el filete se enciende y
  aparece un halo verde exterior. El icono gira sobre sí mismo.

  Todo son `transform`, `opacity`, colores y sombras: nada que obligue al
  navegador a rehacer la maquetación, así que las seis piezas del hero pueden
  animarse a la vez sin tirones.

  Con `prefers-reduced-motion` la transición se anula desde el reset global de la
  hoja; los cambios de color siguen ocurriendo, que es lo que hace falta para
  saber que la pieza responde.

  ── SON DECORATIVOS PARA EL LECTOR DE PANTALLA ──

  Los iconos van con aria-hidden porque lo que dicen ya lo dice el rótulo de al
  lado. La píldora entera NO: su texto sí se anuncia, que es la mejora principal
  frente a las imágenes que sustituye.
*/

/*
  ⚠️ NINGUNO DE LOS DOS ICONOS PUEDE SER REDONDO, y ese fue el problema de los
  anteriores: eran Info y Target —los dos, círculos— y el sello los envolvía en
  otro disco. El resultado eran dos anillos concéntricos, que se leen como un
  error de maquetación antes que como un icono.

  Ahora el disco desapareció y los dibujos tienen silueta propia:

  · reloj con aviso — la lista de espera: algo que ocurrirá y hay que esperar.
  · cámara de vídeo — la 3.ª edición, que es un programa en directo. Dice qué
    tipo de cosa es antes de leer el rótulo.
*/
const SELLOS = [
  { icono: ClockAlert, texto: "Lista de espera" },
  { icono: Video, texto: "3.ª edición" },
] as const;

export function SellosHero() {
  return (
    /* El gap va en vw como el resto del hero, para que la separación entre los
       dos sellos escale con ellos y no se abra en pantallas grandes. */
    <div className="flex flex-wrap items-center gap-[2.6vw] md:gap-[0.6vw]">
      {SELLOS.map(({ icono: Icono, texto }) => (
        <span
          key={texto}
          className={[
            "group/sello inline-flex items-center rounded-full",
            /* Las medidas van en em contra el font-size de la píldora: así el
               alto, el relleno y el icono escalan juntos y sus proporciones no
               se descuadran en ningún ancho. */
            "gap-[0.62em] px-[1.15em] py-[0.6em]",
            "text-[3.1vw] md:text-[clamp(0.5rem,0.72vw,0.95rem)]",
            /* ── EL CRISTAL ──

               El desenfoque es CORTO —6px— a propósito: detrás está la foto del
               hero, y con un desenfoque alto el sello se convierte en un vidrio
               esmerilado que tapa la imagen en vez de dejarla adivinar. Una
               lámina fina deja pasar la forma de lo que hay detrás.

               El tinte va en DEGRADADO y no plano: más claro arriba, apagándose
               hacia abajo. Un tinte uniforme se lee como un rectángulo de color
               translúcido; en degradado, como vidrio recibiendo luz. */
            "border border-[#a3ca23]/45 backdrop-blur-[6px]",
            "bg-[linear-gradient(180deg,rgba(163,202,35,0.22)_0%,rgba(163,202,35,0.1)_55%,rgba(20,32,6,0.16)_100%)]",
            /* Y EL RELIEVE: luz arriba, sombra abajo. Es lo que da volumen —la
               luz entra desde arriba, así que el canto superior brilla y el
               inferior queda oscuro—. Sin ese par la píldora es plana por muy
               translúcida que sea. La tercera es la sombra proyectada, que la
               separa de la foto. */
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.38),inset_0_-1px_0_0_rgba(8,16,2,0.6),0_2px_10px_-4px_rgba(0,0,0,0.7)]",
            "transition-[background-color,border-color,box-shadow,transform] duration-300 ease-out",
            "hover:-translate-y-[1px] hover:border-[#b8ea3c]/80 hover:bg-[#a3ca23]/22",
            "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(10,20,2,0.5),0_0_18px_-2px_rgba(163,202,35,0.55)]",
          ].join(" ")}
        >
          {/* EL ICONO VA SUELTO, SIN DISCO. Llevaba uno —un círculo oscuro con
              su propio filete— y dentro iban Info y Target, que son círculos
              también: dos anillos concéntricos que se leían como un fallo.

              Sin la montura el dibujo se sostiene solo, y de paso el sello se
              vuelve más ligero: una píldora con un disco dentro son dos formas
              cerradas en una pieza que mide 30 px de alto.

              Se queda el aclarado al pasar el ratón —de lima a lima brillante—,
              que es lo que mantiene viva la respuesta al cursor sin necesidad
              de que gire nada. */}
          <Icono
            aria-hidden
            strokeWidth={2.2}
            className="size-[1.15em] shrink-0 text-[#b8ea3c] transition-colors duration-300 group-hover/sello:text-[#d8f06a]"
          />

          <span className="font-sans text-[1em] leading-none font-semibold tracking-[0.08em] whitespace-nowrap text-[#f4f1e4] uppercase transition-colors duration-300 group-hover/sello:text-white">
            {texto}
          </span>
        </span>
      ))}
    </div>
  );
}
