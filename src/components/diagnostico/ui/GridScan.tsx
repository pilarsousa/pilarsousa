"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  BloomEffect,
  ChromaticAberrationEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
import { cn } from "@/lib/cn";

/*
  ═══════════════════════════════════════════════════════════════════════════
  GRIDSCAN — la rejilla en perspectiva del hero
  ═══════════════════════════════════════════════════════════════════════════

  Un túnel de líneas que se pierde en el fondo y un haz que lo recorre a lo
  largo, adaptado de React Bits (reactbits.dev). La rejilla se inclina siguiendo
  al ratón, y en móvil al giro del aparato.

  ── QUÉ SE QUITÓ DEL ORIGINAL, Y POR QUÉ ──

  · EL SEGUIMIENTO FACIAL POR WEBCAM, con él face-api.js entero (~700 KB) y la
    descarga de sus modelos desde un CDN. Venía desactivado por defecto
    (`enableWebcam=false`), así que eran 700 KB de bundle para una función que
    esta landing no va a usar jamás: nadie que entra a hacer un test de siete
    preguntas le da la cámara a una página. En una landing de pauta el peso se
    paga en conversión.

    Con él se fueron el <video> de previsualización, el HUD de depuración, los
    filtros de mediana de las señales de la cara y `uiFaceActive`.

  · EL ARCHIVO CSS APARTE. Eran tres reglas, dos de ellas del HUD que ya no
    existe. La única que quedaba viva —posición y recorte del contenedor— cabe
    en las clases del propio elemento.

  ── QUÉ SE AÑADIÓ ──

  Dos protecciones que el original no trae y que en este proyecto son norma
  (ver MagicRings, que hace lo mismo):

  · CREAR EL RENDERER VA EN try/catch. En un navegador sin canvas acelerado el
    constructor LANZA, y sin esto se lleva por delante el render de la página
    entera: el hero se quedaría en blanco. Capturado, la landing pierde el fondo
    animado y la promesa se lee igual.

  · prefers-reduced-motion SE RESPETA. Quien lo pide recibe UN FOTOGRAMA quieto
    —la rejilla dibujada, sin barrido ni inclinación— y no un hueco: el bucle no
    llega a arrancar. Es una preferencia del sistema, no una sugerencia.

  ── EL LIENZO ES TRANSPARENTE ──

  `alpha: true` y el color de fondo a cero, así que se ve el verde del hero por
  detrás. La rejilla se suma a lo que haya, no lo tapa.
*/

const vert = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = /* glsl */ `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uTilt;
uniform float uYaw;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uLineJitter;
uniform float uScanOpacity;
uniform float uScanDirection;
uniform float uNoise;
uniform float uBloomOpacity;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uPhaseTaper;
uniform float uScanDuration;
uniform float uScanDelay;
varying vec2 vUv;

float smoother01(float a, float b, float x){
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    vec3 ro = vec3(0.0);
    vec3 rd = normalize(vec3(p, 2.0));

    float cR = cos(uTilt), sR = sin(uTilt);
    rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

    float cY = cos(uYaw), sY = sin(uYaw);
    rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;

    vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
    rd.xy += skew * rd.z;

    vec3 color = vec3(0.0);
    float minT = 1e20;
    float gridScale = max(1e-5, uGridScale);
    float fadeStrength = 2.0;
    vec2 gridUV = vec2(0.0);

    float hitIsY = 1.0;
    for (int i = 0; i < 4; i++)
    {
        float isY = float(i < 2);
        float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
        float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
        float den = isY * rd.y + (1.0 - isY) * rd.x;
        float t = num / den;
        vec3 h = ro + rd * t;

        float depthBoost = smoothstep(0.0, 3.0, h.z);
        h.xy += skew * 0.15 * depthBoost;

        bool use = t > 0.0 && t < minT;
        gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
        minT = use ? t : minT;
        hitIsY = use ? isY : hitIsY;
    }

    vec3 hit = ro + rd * minT;
    float dist = length(hit - ro);

    float jitterAmt = clamp(uLineJitter, 0.0, 1.0);
    if (jitterAmt > 0.0) {
      vec2 j = vec2(
        sin(gridUV.y * 2.7 + iTime * 1.8),
        cos(gridUV.x * 2.3 - iTime * 1.6)
      ) * (0.15 * jitterAmt);
      gridUV += j;
    }
    float fx = fract(gridUV.x);
    float fy = fract(gridUV.y);
    float ax = min(fx, 1.0 - fx);
    float ay = min(fy, 1.0 - fy);
    float wx = fwidth(gridUV.x);
    float wy = fwidth(gridUV.y);
    float halfPx = max(0.0, uLineThickness) * 0.5;

    float tx = halfPx * wx;
    float ty = halfPx * wy;
    float aax = wx;
    float aay = wy;

    float lineX = 1.0 - smoothstep(tx, tx + aax, ax);
    float lineY = 1.0 - smoothstep(ty, ty + aay, ay);
    float primaryMask = max(lineX, lineY);

    vec2 gridUV2 = (hitIsY > 0.5 ? hit.xz : hit.zy) / gridScale;
    if (jitterAmt > 0.0) {
      vec2 j2 = vec2(
        cos(gridUV2.y * 2.1 - iTime * 1.4),
        sin(gridUV2.x * 2.5 + iTime * 1.7)
      ) * (0.15 * jitterAmt);
      gridUV2 += j2;
    }
    float fx2 = fract(gridUV2.x);
    float fy2 = fract(gridUV2.y);
    float ax2 = min(fx2, 1.0 - fx2);
    float ay2 = min(fy2, 1.0 - fy2);
    float wx2 = fwidth(gridUV2.x);
    float wy2 = fwidth(gridUV2.y);
    float tx2 = halfPx * wx2;
    float ty2 = halfPx * wy2;
    float aax2 = wx2;
    float aay2 = wy2;
    float lineX2 = 1.0 - smoothstep(tx2, tx2 + aax2, ax2);
    float lineY2 = 1.0 - smoothstep(ty2, ty2 + aay2, ay2);
    float altMask = max(lineX2, lineY2);

    float edgeDistX = min(abs(hit.x - (-0.5)), abs(hit.x - 0.5));
    float edgeDistY = min(abs(hit.y - (-0.2)), abs(hit.y - 0.2));
    float edgeDist = mix(edgeDistY, edgeDistX, hitIsY);
    float edgeGate = 1.0 - smoothstep(gridScale * 0.5, gridScale * 2.0, edgeDist);
    altMask *= edgeGate;

    float lineMask = max(primaryMask, altMask);
    float fade = exp(-dist * fadeStrength);

    float dur = max(0.05, uScanDuration);
    float del = max(0.0, uScanDelay);
    float scanZMax = 2.0;
    float widthScale = max(0.1, uScanGlow);
    float sigma = max(0.001, 0.18 * widthScale * uScanSoftness);
    float sigmaA = sigma * 2.0;

    float cycle = dur + del;
    float tCycle = mod(iTime, cycle);
    float scanPhase = clamp((tCycle - del) / dur, 0.0, 1.0);
    float phase = scanPhase;
    if (uScanDirection > 0.5 && uScanDirection < 1.5) {
      phase = 1.0 - phase;
    } else if (uScanDirection > 1.5) {
      float t2 = mod(max(0.0, iTime - del), 2.0 * dur);
      phase = (t2 < dur) ? (t2 / dur) : (1.0 - (t2 - dur) / dur);
    }
    float scanZ = phase * scanZMax;
    float dz = abs(hit.z - scanZ);
    float lineBand = exp(-0.5 * (dz * dz) / (sigma * sigma));
    float taper = clamp(uPhaseTaper, 0.0, 0.49);
    float headFade = smoother01(0.0, taper, phase);
    float tailFade = 1.0 - smoother01(1.0 - taper, 1.0, phase);
    float phaseWindow = headFade * tailFade;
    float combinedPulse = lineBand * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);
    float auraBand = exp(-0.5 * (dz * dz) / (sigmaA * sigmaA));
    float combinedAura = (auraBand * 0.25) * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);

    vec3 gridCol = uLinesColor * lineMask * fade;
    vec3 scanCol = uScanColor * combinedPulse;
    vec3 scanAura = uScanColor * combinedAura;

    color = gridCol + scanCol + scanAura;

    float n = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898,78.233))) * 43758.5453123);
    color += (n - 0.5) * uNoise;
    color = clamp(color, 0.0, 1.0);

    float alpha = clamp(max(lineMask, combinedPulse), 0.0, 1.0);
    float gx = 1.0 - smoothstep(tx * 2.0, tx * 2.0 + aax * 2.0, ax);
    float gy = 1.0 - smoothstep(ty * 2.0, ty * 2.0 + aay * 2.0, ay);
    float halo = max(gx, gy) * fade;
    alpha = max(alpha, halo * clamp(uBloomOpacity, 0.0, 1.0));

    fragColor = vec4(color, alpha);
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`;

/* Amortiguador crítico: lleva un valor hasta su destino sin rebotar y sin
   saltos, aunque el destino cambie a mitad de camino. Es lo que hace que la
   rejilla siga al ratón con inercia en vez de pegarse a él. */
function amortiguar(
  actual: number,
  destino: number,
  vel: { v: number },
  tiempo: number,
  dt: number,
): number {
  const t = Math.max(0.0001, tiempo);
  const omega = 2 / t;
  const x = omega * dt;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

  const cambio = actual - destino;
  const objetivo = actual - cambio;
  const temp = (vel.v + omega * cambio) * dt;
  vel.v = (vel.v - omega * temp) * exp;

  let salida = objetivo + (cambio + temp) * exp;

  /* Si se pasó del destino, se clava en él: sin esto el valor oscila
     alrededor del objetivo en lugar de asentarse. */
  if ((destino - actual) * (salida - destino) > 0) {
    salida = destino;
    vel.v = 0;
  }
  return salida;
}

export type GridScanProps = {
  sensitivity?: number;
  lineThickness?: number;
  linesColor?: string;
  scanColor?: string;
  scanOpacity?: number;
  gridScale?: number;
  lineJitter?: number;
  scanDirection?: "forward" | "backward" | "pingpong";
  enablePost?: boolean;
  bloomIntensity?: number;
  bloomThreshold?: number;
  bloomSmoothing?: number;
  chromaticAberration?: number;
  noiseIntensity?: number;
  scanGlow?: number;
  scanSoftness?: number;
  scanPhaseTaper?: number;
  scanDuration?: number;
  scanDelay?: number;
  /* En móvil la rejilla sigue el giro del aparato. Sin ratón, es lo único que
     puede moverla. */
  enableGyro?: boolean;
  /* Milisegundos antes de que la rejilla vuelva al centro al salir el ratón.
     Sin espera, cruzar el hero de lado a lado la deja dando tumbos. */
  snapBackDelay?: number;
  className?: string;
};

export function GridScan({
  sensitivity = 0.55,
  lineThickness = 1,
  linesColor = "#5b9800",
  scanColor = "#f5f5f5",
  scanOpacity = 0.4,
  gridScale = 0.1,
  lineJitter = 0.1,
  scanDirection = "pingpong",
  enablePost = true,
  bloomIntensity = 0.6,
  bloomThreshold = 0,
  bloomSmoothing = 0,
  chromaticAberration = 0.002,
  noiseIntensity = 0.01,
  scanGlow = 0.5,
  scanSoftness = 2,
  scanPhaseTaper = 0.9,
  scanDuration = 2.0,
  scanDelay = 2.0,
  enableGyro = false,
  snapBackDelay = 250,
  className,
}: GridScanProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  /* Hacia dónde mira la rejilla (destino) y dónde está ahora (actual). El
     amortiguador lleva lo segundo hacia lo primero en cada fotograma. */
  const destino = useRef({ x: 0, y: 0 });
  const actual = useRef({ x: 0, y: 0 });
  const velX = useRef({ v: 0 });
  const velY = useRef({ v: 0 });

  /*
    ── LAS PROPS VIVEN EN UNA REF, Y EL EFECTO NO DEPENDE DE ELLAS ──

    El original lista las veintitantas props como dependencias del efecto que
    monta el lienzo: cambiar un color destruye el renderer y crea otro. Aquí el
    montaje corre UNA VEZ y los uniformes se actualizan en el sitio, que es
    además cómo lo hace MagicRings.

    Perder un contexto WebGL por cambiar un color no es gratis: los navegadores
    limitan cuántos puede haber vivos a la vez y acaban descartando el más
    viejo.
  */
  const propsRef = useRef({
    sensitivity,
    lineThickness,
    linesColor,
    scanColor,
    scanOpacity,
    gridScale,
    lineJitter,
    scanDirection,
    bloomIntensity,
    bloomThreshold,
    bloomSmoothing,
    chromaticAberration,
    noiseIntensity,
    scanGlow,
    scanSoftness,
    scanPhaseTaper,
    scanDuration,
    scanDelay,
  });
  /*
    ⚠️ LA REF SE ACTUALIZA EN UN EFECTO, NO DURANTE EL RENDER.

    Escribirla en el cuerpo del componente parece más directo y es un error:
    con el render concurrente de React 19, el cuerpo puede ejecutarse y
    descartarse sin llegar a pintar, y la ref se quedaría con valores de un
    render que nunca ocurrió. El linter lo caza (react-hooks/refs).

    Sin lista de dependencias: corre después de CADA render, así que el bucle
    lee las props con un fotograma de retraso como mucho. Para un fondo
    decorativo eso es invisible. Es el mismo patrón que MagicRings.
  */
  useEffect(() => {
    propsRef.current = {
      sensitivity,
      lineThickness,
      linesColor,
      scanColor,
      scanOpacity,
      gridScale,
      lineJitter,
      scanDirection,
      bloomIntensity,
      bloomThreshold,
      bloomSmoothing,
      chromaticAberration,
      noiseIntensity,
      scanGlow,
      scanSoftness,
      scanPhaseTaper,
      scanDuration,
      scanDelay,
    };
  });

  /* ── El ratón y el giro del aparato ── */
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let vuelta: number | null = null;

    const alMover = (e: MouseEvent) => {
      if (vuelta !== null) {
        window.clearTimeout(vuelta);
        vuelta = null;
      }
      const r = el.getBoundingClientRect();
      destino.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      destino.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };

    /* Al salir el ratón la rejilla vuelve al centro, pero no en el acto: con la
       espera, cruzarla de lado a lado no la deja dando tumbos. */
    const alSalir = () => {
      if (vuelta !== null) window.clearTimeout(vuelta);
      vuelta = window.setTimeout(
        () => {
          destino.current.x = 0;
          destino.current.y = 0;
        },
        Math.max(0, snapBackDelay),
      );
    };

    const alGirar = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;
      destino.current.x = THREE.MathUtils.clamp(gamma / 45, -1, 1);
      destino.current.y = THREE.MathUtils.clamp(-beta / 30, -1, 1);
    };

    el.addEventListener("mousemove", alMover);
    el.addEventListener("mouseleave", alSalir);
    if (enableGyro) window.addEventListener("deviceorientation", alGirar);

    return () => {
      el.removeEventListener("mousemove", alMover);
      el.removeEventListener("mouseleave", alSalir);
      if (enableGyro) window.removeEventListener("deviceorientation", alGirar);
      if (vuelta !== null) window.clearTimeout(vuelta);
    };
  }, [enableGyro, snapBackDelay]);

  /* ── El lienzo ── */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ⚠️ EN try/catch: sin canvas acelerado el constructor LANZA, y sin esto se
       lleva por delante el render de la página entera. Capturado, el hero se
       queda sin fondo animado y la promesa se lee igual. */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const srgb = (hex: string) => new THREE.Color(hex).convertSRGBToLinear();
    const p0 = propsRef.current;

    const uniforms = {
      iResolution: {
        value: new THREE.Vector3(
          mount.clientWidth,
          mount.clientHeight,
          renderer.getPixelRatio(),
        ),
      },
      iTime: { value: 0 },
      uSkew: { value: new THREE.Vector2(0, 0) },
      uTilt: { value: 0 },
      uYaw: { value: 0 },
      uLineThickness: { value: p0.lineThickness },
      uLinesColor: { value: srgb(p0.linesColor) },
      uScanColor: { value: srgb(p0.scanColor) },
      uGridScale: { value: p0.gridScale },
      uLineJitter: { value: THREE.MathUtils.clamp(p0.lineJitter, 0, 1) },
      uScanOpacity: { value: p0.scanOpacity },
      uNoise: { value: p0.noiseIntensity },
      uBloomOpacity: { value: p0.bloomIntensity },
      uScanGlow: { value: p0.scanGlow },
      uScanSoftness: { value: p0.scanSoftness },
      uPhaseTaper: { value: p0.scanPhaseTaper },
      uScanDuration: { value: p0.scanDuration },
      uScanDelay: { value: p0.scanDelay },
      uScanDirection: {
        value:
          p0.scanDirection === "backward"
            ? 1
            : p0.scanDirection === "pingpong"
              ? 2
              : 0,
      },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometria = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometria, material));

    let composer: EffectComposer | null = null;
    let bloom: BloomEffect | null = null;
    let chroma: ChromaticAberrationEffect | null = null;

    if (enablePost) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      bloom = new BloomEffect({
        intensity: 1.0,
        luminanceThreshold: p0.bloomThreshold,
        luminanceSmoothing: p0.bloomSmoothing,
      });
      bloom.blendMode.opacity.value = Math.max(0, p0.bloomIntensity);

      chroma = new ChromaticAberrationEffect({
        offset: new THREE.Vector2(
          p0.chromaticAberration,
          p0.chromaticAberration,
        ),
        radialModulation: true,
        modulationOffset: 0,
      });

      const pase = new EffectPass(camera, bloom, chroma);
      pase.renderToScreen = true;
      composer.addPass(pase);
    }

    /* El lienzo se dimensiona con la caja del contenedor, así que hay que
       repintarlo cuando ésta cambie. ResizeObserver y no el evento `resize` de
       la ventana: el hero también cambia de alto cuando el texto se reparte en
       otro número de renglones, y eso la ventana no lo anuncia. */
    const medir = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h, renderer.getPixelRatio());
      composer?.setSize(w, h);
    };
    const observador = new ResizeObserver(medir);
    observador.observe(mount);

    /* Se aplican los valores que puedan haber cambiado desde el montaje, sin
       tocar el renderer. Ver la nota de propsRef. */
    const sincronizar = () => {
      const p = propsRef.current;
      uniforms.uLineThickness.value = p.lineThickness;
      uniforms.uLinesColor.value.copy(srgb(p.linesColor));
      uniforms.uScanColor.value.copy(srgb(p.scanColor));
      uniforms.uGridScale.value = p.gridScale;
      uniforms.uLineJitter.value = THREE.MathUtils.clamp(p.lineJitter, 0, 1);
      uniforms.uScanOpacity.value = THREE.MathUtils.clamp(p.scanOpacity, 0, 1);
      uniforms.uNoise.value = Math.max(0, p.noiseIntensity);
      uniforms.uBloomOpacity.value = Math.max(0, p.bloomIntensity);
      uniforms.uScanGlow.value = p.scanGlow;
      uniforms.uScanSoftness.value = p.scanSoftness;
      uniforms.uPhaseTaper.value = p.scanPhaseTaper;
      uniforms.uScanDuration.value = Math.max(0.05, p.scanDuration);
      uniforms.uScanDelay.value = Math.max(0, p.scanDelay);
      uniforms.uScanDirection.value =
        p.scanDirection === "backward"
          ? 1
          : p.scanDirection === "pingpong"
            ? 2
            : 0;

      if (bloom) {
        bloom.blendMode.opacity.value = Math.max(0, p.bloomIntensity);
        bloom.luminanceMaterial.threshold = p.bloomThreshold;
        bloom.luminanceMaterial.smoothing = p.bloomSmoothing;
      }
      chroma?.offset.set(p.chromaticAberration, p.chromaticAberration);
    };

    const pintar = (dt: number) => {
      renderer.clear(true, true, true);
      if (composer) composer.render(dt);
      else renderer.render(scene, camera);
    };

    /*
      ⚠️ QUIEN PIDE MENOS MOVIMIENTO RECIBE UN FOTOGRAMA QUIETO, NO UN HUECO.

      La rejilla se dibuja una vez —con el barrido en su sitio y sin
      inclinación— y el bucle no llega a arrancar. Quitar el fondo entero sería
      pasarse: lo que molesta del efecto es el movimiento, no que haya líneas.
    */
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      sincronizar();
      uniforms.iTime.value = 0;
      pintar(0);
      return () => {
        observador.disconnect();
        material.dispose();
        geometria.dispose();
        composer?.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };
    }

    let frame = 0;
    let ultimo = performance.now();

    const animar = () => {
      frame = requestAnimationFrame(animar);
      const ahora = performance.now();
      const dt = Math.max(0, Math.min(0.1, (ahora - ultimo) / 1000));
      ultimo = ahora;

      sincronizar();

      /* La sensibilidad decide a la vez cuánto se inclina la rejilla y cuánto
         tarda en llegar: más sensible es más recorrido y menos amortiguación. */
      const s = THREE.MathUtils.clamp(propsRef.current.sensitivity, 0, 1);
      const escalaSkew = THREE.MathUtils.lerp(0.06, 0.2, s);
      const suavizado = THREE.MathUtils.lerp(0.45, 0.12, s);
      /* El eje vertical se amplifica: el mismo recorrido de ratón se percibe
         menor en vertical que en horizontal, porque el hero es más ancho que
         alto. */
      const impulsoY = THREE.MathUtils.lerp(1.2, 1.6, s);

      actual.current.x = amortiguar(
        actual.current.x,
        destino.current.x,
        velX.current,
        suavizado,
        dt,
      );
      actual.current.y = amortiguar(
        actual.current.y,
        destino.current.y,
        velY.current,
        suavizado,
        dt,
      );

      uniforms.uSkew.value.set(
        actual.current.x * escalaSkew,
        -actual.current.y * impulsoY * escalaSkew,
      );
      uniforms.iTime.value = ahora / 1000;
      pintar(dt);
    };

    frame = requestAnimationFrame(animar);

    return () => {
      cancelAnimationFrame(frame);
      observador.disconnect();
      material.dispose();
      geometria.dispose();
      composer?.dispose();
      renderer.dispose();
      /* forceContextLoss libera el contexto WebGL en el acto en vez de esperar
         al recolector: son un recurso limitado por pestaña. */
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
    /* SIN DEPENDENCIAS DE PROPS a propósito: sólo `enablePost`, que sí cambia la
       cadena de render y obliga a rehacerla. Todo lo demás entra por la ref. */
  }, [enablePost]);

  return (
    <div
      ref={mountRef}
      className={cn("relative size-full overflow-hidden", className)}
    />
  );
}
