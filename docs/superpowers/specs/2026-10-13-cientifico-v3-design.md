# Científico V3 — landing de Pilar Sousa sobre la estructura de LeadsMastery

Fecha: 2026-10-13 · Ruta: `/cientifico-v3` · Estado: diseño aprobado, pendiente de plan

## Objetivo

Una variante nueva de la landing del evento gratuito de Pilar Sousa que replique,
sección por sección y al detalle, la landing "LeadsMastery" de Jhonny Lubo
(referencia: landing + página de gracias, desktop y mobile), con:

- la paleta de Pilar (la de `cientifico-v1`) en lugar de la de la referencia,
- copy propio en la voz de Pilar: metafísica y espiritualidad contadas con la
  metáfora del laboratorio (hipótesis, experimento, comprobar),
- el tubo de ensayo de `cientifico-v1` integrado en la estructura de Lubo.

No es objetivo: tocar `cientifico-v1`, `mision-origen` ni ninguna otra landing;
crear páginas legales; producir el video de la página de gracias.

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Ruta | `/cientifico-v3` y `/cientifico-v3/gracias`, `robots: noindex` |
| Componentes | Carpeta propia `src/components/cientifico-v3/`. Se copian de v1 sólo las piezas que sirven (cuenta atrás, modal + formulario, `Reveal`, lógica del tubo); nada se importa de `cientifico-v1`. |
| Tema | Oscuro, como la referencia |
| Foto del hero | `public/mision-origen/foto-pilar.jpg` |
| Foto de las entradas | `public/mision-origen-venta/herosection.jpg`, recortada sobre la cara y el círculo |
| Piezas gráficas | Construidas en código: entradas, botón-entrada, barra superior, firma, anotaciones SVG |
| Tubo de ensayo | Reemplaza al celular en la sección "debes estar dispuesta a" |
| Tipografía | Manrope (ya cargada en `src/app/layout.tsx`) |
| Footer | Sin enlaces legales: el repo no tiene esas páginas |
| Evento | 17 de octubre de 2026, 19:00 Europe/Madrid (igual que v1) |

## Sistema visual

### Paleta

Se mapea la de la referencia a la de Pilar (fuente de verdad: `cientifico-v1.css`).

| Rol | Referencia | V3 |
|---|---|---|
| Fondo base | negro | `#0c0a12` (negro con tinte Cosmos) |
| Superficie de cards | gris `#1f1f1f` | `#16131e` con borde `rgb(255 255 255 / 0.06)` |
| Destacado de texto | menta | Salvia `#7DA89A` (aclarada a `#9cc4b6` donde no llegue a 4.5:1) |
| Degradado de marca | violeta → menta | Violeta Alma `#A391B8` → Salvia `#7DA89A` |
| Botón-entrada | violeta | Cosmos `#4B3A6B` → Violeta Alma `#A391B8`, texto `#F4EEE4` |
| Halos de fondo | violeta | Cosmos / Violeta Alma, radiales y difuminados |
| Detalles cálidos | — | Arena Dorada `#D9C7A7` (firma, alguna anotación) |
| WhatsApp | verde | verde WhatsApp (se mantiene: es lo que la gente reconoce) |

Los tokens viven en `src/app/cientifico-v3/cientifico-v3.css` bajo
`.mo-scope.cv3-scope`, siguiendo el mismo patrón que v1 (redefinir los tokens
semánticos en el wrapper del layout). Sin la malla de líneas de `.mo-scope`.

### Tipografía

Manrope para todo: títulos 700–800, cuerpo 400–500. El wordmark replica
*Leads***Mastery**: "Volver al" en 300 + "Origen" en 800 con el degradado de marca.
La firma usa una manuscrita de Google Fonts. Se declara en `src/app/layout.tsx`
junto a las demás, como pide la convención del repo; la fuente sólo se descarga
en las rutas que la usan.

### Piezas construidas en código

- **Barra superior** con el corte en ángulo: una línea con el degradado de marca
  que baja desde los bordes y enmarca la barra central (SVG).
- **Botón-entrada**: rectángulo con muescas semicirculares a los lados, código
  de barras a la derecha separado por un troquel y un canto inferior más oscuro.
  Abre el modal de registro.
- **Entrada 3D** (`Entrada`): foto con velo violeta→salvia, wordmark, "En vivo
  online", "17 de octubre", bordes troquelados y talón blanco con código de
  barras. Se usa inclinada y flotando en 6 lugares (como en la referencia).
- **Firma** "Pilar Sousa" en manuscrita, color Arena Dorada.
- **Anotaciones a mano** (SVG que se dibuja con `stroke-dashoffset`): sobre la
  foto del hero ("Identidad", "Frecuencia", "Yo actual → Yo origen" en cajas,
  equivalente al "Confianza F1 → F2" de Lubo), el círculo alrededor de "Tu
  oportunidad" y el trazo del titular de cierre.
- **"Origen" manuscrito desenfocado** de fondo bajo las cards de "para quién"
  (equivalente al "Leads" de Lubo).

## Secciones de la landing

Cada sección replica la composición, proporciones y espaciados de la referencia.
El copy abajo es la línea editorial; se pule en implementación sin cambiar su
sentido. Los destacados en salvia van en **negrita** en esta spec.

1. **Barra superior** (fija). Wordmark + "Comienza en:" + cuenta atrás en 4
   cajas (DÍAS · HRS · MIN · SEG). Mobile: wordmark arriba de "Comienza en:", a
   la izquierda de las cajas, como la referencia.

2. **Hero.** `foto-pilar.jpg` a la derecha con tratamiento oscuro y desvanecida
   hacia el texto; anotaciones SVG encima. Mobile: foto arriba, contenido debajo.
   - Badges (2 filas): "Masterclass online gratuita" · "🇪🇸 19:00 h" /
     "En vivo online" · "17 de octubre".
   - H1: "Voy a revelarte el método que convirtió mi vida en un laboratorio y
     que te permitirá **manifestar resultados que puedes comprobar**."
   - Bajada: cómo funciona realmente la realidad, por qué tu identidad decide lo
     que manifiestas y el experimento con el que doy un salto cuántico cada 90 días.
   - Línea salvia: "¡Regístrate y asegura tu entrada gratuita ahora!"
   - Botón-entrada: "Quiero mi entrada gratuita".

3. **Para quién.** Eyebrow salvia "Tengas o no experiencia y totalmente gratis,"
   + 4 cards con barra salvia arriba (ancho variable, como la referencia):
   - Para quienes **llevan años estudiando metafísica** y sienten que saben mucho
     pero su vida no termina de cambiar.
   - Si **manifiestas en algunas áreas** pero siempre vuelves al mismo punto de partida.
   - Si quieres **dejar de coleccionar técnicas** y aplicar un método que puedas comprobar.
   - Si quieres **vivir alineada con tu propósito** y no desde el miedo que te frena.
   Debajo, "Origen" manuscrito desenfocado.

4. **¿Qué puedes esperar de este evento?** Título con degradado de marca, bajada
   "Desliza para ver todo lo que vas a comprobar en esta masterclass gratuita." y
   flechas ← →. A la derecha, carrusel de cards con forma de carpeta (pestaña
   arriba a la izquierda), foto de Pilar en duotono Cosmos/Salvia, wordmark,
   título, texto y código de barras al pie. La tercera card queda cortada por el
   borde, como en la referencia. 4 cards:
   - "Descubrirás cómo funciona realmente la realidad" — y por qué saber más no
     significa manifestar más. (`fondo-hero-2.jpg`)
   - "Domina el arte de reprogramar tu identidad" — para que tus resultados dejen
     de repetir el mismo patrón. (`pilar-sousa-2.png`)
   - "Aprende los 3 pasos de mi Sistema Práctico de Manifestación" — para dar un
     salto cuántico cada 90 días. (`Fondo-PilarSousaPC.jpg`)
   - "Convierte tu vida en tu propio laboratorio" — con un experimento que puedes
     empezar esa misma noche. (`pilarsousa-pc.jpg`)
   Desplazamiento con scroll-snap; las flechas mueven una card. Mobile: el
   bloque de título va arriba y el carrusel debajo.

5. **La verdadera magia.** Panel violeta (Cosmos → Violeta Alma) con 2 capas
   apiladas detrás y una pestaña arriba al centro. Título "La verdadera magia de
   este método", texto "Es su capacidad para convertir lo que ya sabes de
   espiritualidad en una realidad que puedes ver, comprobar y sostener.",
   botón-entrada y firma. Una entrada flotando arriba a la izquierda y otra a la
   derecha.

6. **Tu oportunidad.** Título con degradado "Tu oportunidad para dar tu salto
   cuántico empieza aquí." con el círculo dibujado alrededor de "Tu oportunidad"
   y un trazo que lo tacha (como la referencia). "Este evento es para ti, si:".
   Grid 2×2 de pares: card (frase con destacado salvia) + párrafo debajo.
   - **Llevas años en el camino espiritual** y quieres ver por fin ese
     conocimiento reflejado en tu vida.
   - Has probado decretos, visualizaciones y afirmaciones, pero **algo sigue sin
     cambiar**.
   - **Manifiestas a ratos**, pero siempre vuelves al mismo punto de partida.
   - Has seguido a otros mentores y **terminaste con más información y menos
     claridad**.
   Cada párrafo profundiza con una pregunta, como en la referencia. Fondo con
   halos Cosmos en los bordes.

7. **Debes estar dispuesta a.** "Pero, para aprovechar esta oportunidad, debes
   estar dispuesta a:". Marquee gigante e infinito "○ Volver al **Origen**" (el
   "Origen" con degradado). Al centro, el **tubo de ensayo**, que se llena con el
   scroll. Alrededor, 4 cards flotantes en las posiciones de la referencia, que
   se encienden cuando el líquido llega a su marca:
   - **Ser tu propio experimento.** Si estás dispuesta a observar tu vida como
     un laboratorio, este evento es para ti.
   - **Soltar la vieja identidad.** Si estás lista para dejar de ser quien te
     trajo hasta aquí, este evento es para ti.
   - **Pasar a la acción.** El miedo se pasa con acción, hábitos y coherencia.
     Si estás lista para aplicar y no sólo para saber, este evento es para ti.
   - **Comprometerte con tu salto.** Si estás dispuesta a sostener tu nueva
     identidad incluso cuando nadie mira, este evento es para ti.
   Mobile: el tubo pasa a una columna lateral fija y las cards se apilan (el
   layout flotante no entra a 375 px).

8. **Cierre.** Entrada grande + talón separados e inclinados. Titular con el
   trazo de corchete a mano: "No te pierdas la oportunidad de conocer el método
   que uso para manifestar desde mi nueva identidad, **dando un salto cuántico
   cada 90 días y viviendo la realidad que durante años soñé**." Botón-entrada y
   pastilla con borde "¡Solamente quedan 37 entradas disponibles!" (`ENTRADAS_RESTANTES`,
   constante editable).

9. **Footer.** Halo Cosmos desde abajo, wordmark, "Este sitio no forma parte ni
   está respaldado por Meta. Facebook es una marca comercial de Meta Platforms,
   Inc." y "Pilar Sousa® · Todos los derechos reservados 2026".

## Tubo de ensayo sobre fondo oscuro

Se parte de `Hallazgos.tsx`/`useTubo` de v1 (llenado por tramos con GSAP
ScrollTrigger, burbujas, menisco, marcas) y se adapta:

- Las cards son las 4 flotantes; el nivel sube un cuarto por card, en el orden
  de lectura.
- El PNG (`tubo-cientifico-recorte.png`) tiene el interior blanquecino pensado
  para fondo claro con `multiply`. En oscuro: el vidrio baja de opacidad, el
  líquido (Salvia → Cielo Claro) lleva brillo propio y un halo violeta detrás.
  El blend definitivo se elige mirándolo en el navegador.
- Sin JS o con `prefers-reduced-motion`, el tubo aparece lleno y las cards
  encendidas.

## Registro

- Todos los botones abren el modal de registro (copia de `ReservaModal` /
  `ReservaForm` de v1) con el estilo oscuro de v3.
- Envía a `/api/register` con `source: "cientifico-v3"`; al registrar, redirige
  a `/cientifico-v3/gracias`.
- Errores de red: el mensaje que ya usa el formulario de v1.

## Página de gracias

Réplica de la de la referencia:

- Barra superior con el corte en ángulo: "📅 17 de octubre" · wordmark ·
  "En vivo online".
- "¡Gracias por registrarte!" con degradado de marca.
- "Estás a un solo paso de validar tu entrada al laboratorio donde:" +
  "**Voy a compartir contigo** el método que convertirá lo que sabes de
  manifestación en resultados que puedes comprobar en tu propia vida."
- Pastilla "Mira el video a continuación para las últimas instrucciones:".
- Marco de video con pestaña arriba y barra de progreso con degradado.
  `VIDEO_URL` constante: si está vacía, muestra un póster oscurecido de Pilar
  con el rótulo "Video temporal".
- "Forma parte de nuestro círculo privado en WhatsApp y valida tu entrada." +
  bajada + botón verde "Quiero validar mi entrada" con el logo de WhatsApp
  (`MO_WHATSAPP_COMMUNITY_URL`).
- "Recomendaciones adicionales:" con 2 cards (barra salvia / barra violeta):
  reservar el 17 de octubre a las 19:00 en el calendario, y compartir la
  invitación con quien busca ese cambio.
- "Nos vemos dentro" + firma, y el wordmark al pie.
- Entradas flotando a la izquierda y a la derecha.

## Archivos

```
src/app/layout.tsx       + variable de la fuente manuscrita de la firma
src/app/cientifico-v3/
  layout.tsx           metadata noindex, wrapper .mo-scope.cv3-scope, barra, modal
  page.tsx             compone las secciones
  cientifico-v3.css    tokens y estilos propios (tubo, entradas, botón, marquee)
  gracias/page.tsx
src/components/cientifico-v3/
  sections/            Hero, ParaQuien, QueEsperar, Magia, Oportunidad,
                       Dispuesta, Cierre, Footer
  ui/                  BarraSuperior, Countdown, Wordmark, BotonEntrada, Entrada,
                       Firma, Anotaciones, Marquee, Tubo, Carrusel, Reveal,
                       ReservaModal, ReservaForm
  content.ts           copy y constantes (fecha, ENTRADAS_RESTANTES, VIDEO_URL)
```

## Verificación

El repo no tiene tests. Se considera terminado cuando:

- `npx tsc --noEmit` y `npm run lint` pasan sin errores nuevos.
- Capturas en Edge headless a 1440 px y 390 px de `/cientifico-v3` y
  `/cientifico-v3/gracias`, comparadas lado a lado con la referencia por sección.
- No hay scroll horizontal en 375 px.
- El tubo se llena con el scroll y enciende las 4 cards; con reduced-motion
  aparece lleno.
- El registro llega a `/api/register` con `source: "cientifico-v3"` y redirige
  a la página de gracias.
