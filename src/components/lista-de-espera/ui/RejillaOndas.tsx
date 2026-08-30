"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

/*
  La rejilla de ondas del pie, en WebGL.

  Es una adaptación de RippleGrid (reactbits.dev) a esta landing. Dibuja una
  retícula que ondula desde el centro y responde al cursor con ondas propias.

  ── POR QUÉ AQUÍ Y NO EN OTRA SECCIÓN ──

  El pie es el único sitio de la landing donde cabe: el resto de las secciones ya
  tienen fondo —banners con la lluvia de código dibujada— y superponerle una
  retícula animada sería ruido sobre ruido. El pie era negro liso, así que la
  rejilla le da profundidad sin competir con nada.

  ── QUÉ SE CAMBIÓ DEL ORIGINAL ──

  · Tipado. El original es JavaScript suelto; aquí los uniforms llevan tipo y el
    hexToRgb devuelve una tupla, que es lo que espera ogl.
  · SE PARA CUANDO NO SE VE. El original anima sin descanso mientras esté
    montado, y como el pie está al final de la página eso significa un shader
    corriendo todo el rato que el visitante pasa arriba. Con un
    IntersectionObserver el bucle sólo gira cuando el pie está en pantalla, y se
    corta también con la pestaña oculta.
  · Respeta prefers-reduced-motion: quien lo pidió no recibe nada —ni el canvas—
    y el pie se queda con su fondo liso. Es el mismo criterio de LaserFlow y de
    LluviaCodigo.
  · El contenedor va aquí en clases y no en un CSS aparte, que es un archivo
    menos.

  ── LOS UNIFORMS SE ACTUALIZAN, NO SE RECREA EL PROGRAMA ──

  El segundo efecto escribe sobre el objeto de uniforms que ya está enlazado al
  shader. Recompilar el programa en cada cambio de prop tiraría el contexto de
  WebGL y volvería a subir la geometría a la tarjeta para nada.

  ── EL DPR ESTÁ LIMITADO A 2 ──

  En una pantalla a 3x, un shader a pantalla completa cuesta el doble de píxeles
  que a 2x sin diferencia visible en una retícula de líneas finas.
*/

const hexARgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

type Props = {
  color?: string;
  intensidadOnda?: number;
  tamano?: number;
  grosor?: number;
  distanciaFundido?: number;
  fuerzaVineta?: number;
  intensidadBrillo?: number;
  opacidad?: number;
  rotacion?: number;
  interaccion?: boolean;
  radioInteraccion?: number;
};

export function RejillaOndas({
  color = "#a3ca23",
  intensidadOnda = 0.05,
  tamano = 10,
  grosor = 15,
  distanciaFundido = 1.5,
  fuerzaVineta = 2,
  intensidadBrillo = 0.1,
  opacidad = 1,
  rotacion = 0,
  interaccion = true,
  radioInteraccion = 1,
}: Props) {
  const caja = useRef<HTMLDivElement>(null);

  /* Las props viajan por ref al segundo efecto para que el primero —el que monta
     WebGL— pueda depender de un array vacío: recrear el contexto cada vez que
     cambia un número sería tirar y rehacer toda la escena. */
  const props = useRef<Props>({});
  props.current = {
    color,
    intensidadOnda,
    tamano,
    grosor,
    distanciaFundido,
    fuerzaVineta,
    intensidadBrillo,
    opacidad,
    rotacion,
    interaccion,
    radioInteraccion,
  };

  const uniforms = useRef<Record<string, { value: unknown }> | null>(null);

  useEffect(() => {
    const contenedor = caja.current;
    if (!contenedor) return;

    /* Quien pidió no ver animaciones no recibe ni el canvas: esto es decoración
       pura y no deja ningún hueco al no dibujarse. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raton = { x: 0.5, y: 0.5 };
    const destino = { x: 0.5, y: 0.5 };
    let influencia = 0;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    contenedor.appendChild(gl.canvas);

    const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

    const frag = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= iResolution.x / iResolution.y;

  if (gridRotation != 0.0) {
    uv = rotate(gridRotation * pi / 180.0) * uv;
  }

  float dist = length(uv);
  float func = sin(pi * (iTime - dist));
  vec2 rippleUv = uv + uv * func * rippleIntensity;

  if (mouseInteraction && mouseInfluence > 0.0) {
    vec2 mouseUv = (mousePosition * 2.0 - 1.0);
    mouseUv.x *= iResolution.x / iResolution.y;
    float mouseDist = length(uv - mouseUv);

    float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));

    float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
    rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
  }

  vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
  vec2 b = abs(a);

  float aaWidth = 0.5;
  vec2 smoothB = vec2(
    smoothstep(0.0, aaWidth, b.x),
    smoothstep(0.0, aaWidth, b.y)
  );

  vec3 color = vec3(0.0);
  color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
  color += exp(-gridThickness * smoothB.y);
  color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
  color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

  if (glowIntensity > 0.0) {
    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
  }

  float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));

  vec2 vignetteCoords = vUv - 0.5;
  float vignetteDistance = length(vignetteCoords);
  float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
  vignette = clamp(vignette, 0.0, 1.0);

  float finalFade = ddd * vignette;
  float alpha = length(color) * finalFade * opacity;
  gl_FragColor = vec4(color * gridColor * finalFade * opacity, alpha);
}`;

    const u = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] as [number, number] },
      gridColor: { value: hexARgb(props.current.color ?? "#a3ca23") },
      rippleIntensity: { value: props.current.intensidadOnda ?? 0.05 },
      gridSize: { value: props.current.tamano ?? 10 },
      gridThickness: { value: props.current.grosor ?? 15 },
      fadeDistance: { value: props.current.distanciaFundido ?? 1.5 },
      vignetteStrength: { value: props.current.fuerzaVineta ?? 2 },
      glowIntensity: { value: props.current.intensidadBrillo ?? 0.1 },
      opacity: { value: props.current.opacidad ?? 1 },
      gridRotation: { value: props.current.rotacion ?? 0 },
      mouseInteraction: { value: props.current.interaccion ?? true },
      mousePosition: { value: [0.5, 0.5] as [number, number] },
      mouseInfluence: { value: 0 },
      mouseInteractionRadius: { value: props.current.radioInteraccion ?? 1 },
    };
    uniforms.current = u;

    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program: new Program(gl, { vertex: vert, fragment: frag, uniforms: u }),
    });

    const medir = () => {
      const { clientWidth: w, clientHeight: h } = contenedor;
      /* Un tamaño de cero deja el canvas en un estado del que no se recupera
         solo; puede pasar si el pie arranca oculto. */
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      u.iResolution.value = [w, h];
    };

    const mover = (e: MouseEvent) => {
      const r = contenedor.getBoundingClientRect();
      destino.x = (e.clientX - r.left) / r.width;
      /* La Y se invierte porque en WebGL el origen está abajo y en la ventana,
         arriba. */
      destino.y = 1 - (e.clientY - r.top) / r.height;
    };
    const entrar = () => {
      influencia = 1;
    };
    const salir = () => {
      influencia = 0;
    };

    window.addEventListener("resize", medir);
    contenedor.addEventListener("mousemove", mover);
    contenedor.addEventListener("mouseenter", entrar);
    contenedor.addEventListener("mouseleave", salir);
    medir();

    /* ── EL BUCLE SÓLO GIRA CUANDO EL PIE SE VE ──

       El pie está al final de la página, así que sin esto el shader estaría
       calculando a pantalla completa todo el rato que el visitante pasa arriba
       leyendo. Con el observador, el trabajo ocurre sólo cuando hay algo que
       mirar.

       El reloj del shader (iTime) se lleva aparte y sólo avanza mientras se
       dibuja: si usara el tiempo del navegador, al volver a entrar en pantalla
       la onda daría un salto proporcional a lo que estuvo parada. */
    let frame = 0;
    let visible = false;
    let ultimo = 0;
    let reloj = 0;

    const dibujar = (t: number) => {
      frame = requestAnimationFrame(dibujar);
      if (!visible || document.hidden) {
        ultimo = t;
        return;
      }

      reloj += Math.min((t - ultimo) / 1000, 0.05);
      ultimo = t;
      u.iTime.value = reloj;

      /* El cursor se persigue con interpolación en vez de saltar a su posición:
         la onda tiene que sentirse como agua, no como un puntero. */
      raton.x += (destino.x - raton.x) * 0.1;
      raton.y += (destino.y - raton.y) * 0.1;
      u.mouseInfluence.value += (influencia - u.mouseInfluence.value) * 0.05;
      u.mousePosition.value = [raton.x, raton.y];

      renderer.render({ scene: mesh });
    };
    frame = requestAnimationFrame(dibujar);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        ultimo = performance.now();
        if (visible) medir();
      },
      { threshold: 0 },
    );
    io.observe(contenedor);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", medir);
      contenedor.removeEventListener("mousemove", mover);
      contenedor.removeEventListener("mouseenter", entrar);
      contenedor.removeEventListener("mouseleave", salir);
      /* Soltar el contexto a mano: un contexto de WebGL no lo recoge el
         recolector de basura al desmontar el nodo, y el navegador sólo permite
         unos pocos vivos a la vez. */
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (gl.canvas.parentNode === contenedor) {
        contenedor.removeChild(gl.canvas);
      }
      uniforms.current = null;
    };
  }, []);

  /* Cambios de prop en caliente: se escriben sobre los uniforms ya enlazados. */
  useEffect(() => {
    const u = uniforms.current;
    if (!u) return;
    u.gridColor.value = hexARgb(color);
    u.rippleIntensity.value = intensidadOnda;
    u.gridSize.value = tamano;
    u.gridThickness.value = grosor;
    u.fadeDistance.value = distanciaFundido;
    u.vignetteStrength.value = fuerzaVineta;
    u.glowIntensity.value = intensidadBrillo;
    u.opacity.value = opacidad;
    u.gridRotation.value = rotacion;
    u.mouseInteraction.value = interaccion;
    u.mouseInteractionRadius.value = radioInteraccion;
  }, [
    color,
    intensidadOnda,
    tamano,
    grosor,
    distanciaFundido,
    fuerzaVineta,
    intensidadBrillo,
    opacidad,
    rotacion,
    interaccion,
    radioInteraccion,
  ]);

  return (
    <div
      ref={caja}
      aria-hidden
      /* pointer-events-none NO va aquí: el canvas tiene que recibir el ratón
         para que las ondas respondan. Como es puramente decorativo y no cubre
         ningún control —el contenido del pie va por encima con su propio
         z-index— eso no roba ningún clic. */
      className="absolute inset-0 h-full w-full overflow-hidden"
    />
  );
}
