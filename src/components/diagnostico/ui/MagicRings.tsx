"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
  ═══════════════════════════════════════════════════════════════════════════
  ANILLOS — el fondo animado del hero
  ═══════════════════════════════════════════════════════════════════════════

  Anillos concéntricos que crecen y se desvanecen, dibujados en un shader.
  Sustituye a la fotografía del hero y va DEBAJO de la promesa, como
  atmósfera.

  ── DE DÓNDE SALE ──

  Del componente MagicRings de react-bits, pasado a TypeScript. NO se instaló
  con `shadcn add`: este proyecto usa npm y no tiene shadcn configurado
  —tampoco un components.json—, así que ese comando habría creado andamiaje
  nuevo para traer un solo archivo. `three` ya estaba en las dependencias
  porque lo usa LaserFlow en las otras dos landings.

  ── POR QUÉ NO REVIENTA EN UN NAVEGADOR SIN WebGL ──

  Tres cortafuegos, y ninguno sobra en una página que es el primer contacto
  con la campaña:

  · crear el renderer va en try/catch — en un navegador sin canvas acelerado,
    el constructor LANZA en vez de devolver null.
  · si no hay WebGL2, se desmonta y no se pinta nada. El shader usa
    características que no están garantizadas en WebGL1.
  · el bucle se para cuando el hero sale de pantalla (IntersectionObserver) y
    cuando la pestaña pasa a segundo plano. Un shader corriendo detrás de otra
    pestaña gasta batería para nadie.

  En cualquiera de esos casos el hero se queda sin fondo animado y la promesa
  se lee igual: el texto nunca depende de que esto funcione.

  ── prefers-reduced-motion ──

  No se anula el componente entero: se pinta UN FOTOGRAMA y se para. Quitarlo
  del todo dejaría el hero vacío, que es peor que una imagen quieta — y una
  imagen quieta es exactamente lo que esa preferencia pide.
*/

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform float uCoverageAlpha;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float coverage = 0.0;
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    float ringAmount = ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px);
    c = mix(c, rc, vec3(ringAmount));
    coverage = max(coverage, ringAmount);
  }
  c *= 1.0 + uBurst * 2.0;

  // ⚠️ EL RUIDO SE MULTIPLICA POR LO QUE YA HAY, NO SE SUMA A PELO.
  //
  // El original sumaba el ruido directamente al color, y eso levanta TODOS los
  // píxeles — también los vacíos. Como el alfa sale del brillo, un lienzo que
  // debería ser transparente acababa con un velo uniforme por encima:
  // exactamente el "fondo" que no queremos.
  //
  // (Ojo al editar: este shader vive dentro de una plantilla de JavaScript, así
  // que un acento invertido en un comentario CIERRA la cadena y rompe el
  // archivo entero. Nada de comillas invertidas aquí dentro.)
  //
  // Midiendo primero cuánto anillo hay en este píxel y escalando el ruido por
  // ese valor, el grano textura la línea y deja el vacío en cero. El parámetro
  // sigue significando lo mismo donde importa.
  float base = max(c.r, max(c.g, c.b));
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount * base;

  float intensity = max(c.r, max(c.g, c.b));
  vec3 emissiveColor = intensity > 0.0001 ? clamp(c / intensity, 0.0, 1.0) : vec3(0.0);
  vec3 outputColor = mix(emissiveColor, clamp(c, 0.0, 1.0), uCoverageAlpha);
  float outputAlpha = mix(intensity, coverage, uCoverageAlpha);
  gl_FragColor = vec4(outputColor, clamp(outputAlpha * uOpacity, 0.0, 1.0));
}
`;

export type MagicRingsProps = {
  color?: string;
  colorTwo?: string;
  speed?: number;
  ringCount?: number;
  attenuation?: number;
  lineThickness?: number;
  baseRadius?: number;
  radiusStep?: number;
  scaleRate?: number;
  opacity?: number;
  blur?: number;
  noiseAmount?: number;
  rotation?: number;
  ringGap?: number;
  fadeIn?: number;
  fadeOut?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  hoverScale?: number;
  parallax?: number;
  clickBurst?: boolean;
  /*
    "luminance" normaliza el color a brillo pleno y usa el brillo original como
    OPACIDAD. Es lo que hace que unos anillos definidos en verde muy oscuro se
    vean como un verde vivo translúcido en vez de como manchas negras sobre el
    fondo. Es el modo por defecto y el que queremos aquí.
  */
  alphaMode?: "luminance" | "coverage";
  className?: string;
};

export function MagicRings({
  color = "#fc42ff",
  colorTwo = "#42fcff",
  speed = 1,
  ringCount = 6,
  attenuation = 10,
  lineThickness = 2,
  baseRadius = 0.35,
  radiusStep = 0.1,
  scaleRate = 0.1,
  opacity = 1,
  blur = 0,
  noiseAmount = 0.1,
  rotation = 0,
  ringGap = 1.5,
  fadeIn = 0.7,
  fadeOut = 0.5,
  followMouse = false,
  mouseInfluence = 0.2,
  hoverScale = 1.2,
  parallax = 0.05,
  clickBurst = false,
  alphaMode = "luminance",
  className,
}: MagicRingsProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<[number, number]>([0, 0]);
  const smoothMouseRef = useRef<[number, number]>([0, 0]);
  const hoverAmountRef = useRef(0);
  const isHoveredRef = useRef(false);
  const burstRef = useRef(0);

  /*
    Las props viajan por una ref y no por las dependencias del efecto.

    El bucle de animación se crea UNA VEZ y lee de aquí en cada fotograma. Si
    dependiera de las props, cambiar cualquiera destruiría el renderer y el
    contexto WebGL para volver a crearlos — y un contexto WebGL no es gratis:
    los navegadores limitan cuántos puede haber vivos a la vez.
  */
  const propsRef = useRef({
    color, colorTwo, speed, ringCount, attenuation, lineThickness,
    baseRadius, radiusStep, scaleRate, opacity, noiseAmount,
    rotation, ringGap, fadeIn, fadeOut, followMouse, mouseInfluence,
    hoverScale, parallax, clickBurst, alphaMode,
  });
  /*
    ⚠️ LA REF SE ESCRIBE EN UN EFECTO, NO DURANTE EL RENDER.

    El original de react-bits lo hace mientras pinta, y React 19 lo prohíbe:
    con los renders interrumpibles, un render que se descarta habría dejado la
    ref ya escrita y el árbol y ella quedarían contando cosas distintas.

    En un efecto sin lista de dependencias corre después de CADA render, así
    que el bucle lee las props con un fotograma de retraso como mucho. Para un
    fondo decorativo eso es invisible.
  */
  useEffect(() => {
    propsRef.current = {
      color, colorTwo, speed, ringCount, attenuation, lineThickness,
      baseRadius, radiusStep, scaleRate, opacity, noiseAmount,
      rotation, ringGap, fadeIn, fadeOut, followMouse, mouseInfluence,
      hoverScale, parallax, clickBurst, alphaMode,
    };
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      /* Sin canvas acelerado el constructor lanza. El hero se queda sin fondo
         animado y la promesa se lee igual. */
      return;
    }

    if (!renderer.capabilities.isWebGL2) {
      renderer.dispose();
      return;
    }

    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      uTime: { value: 0 },
      uAttenuation: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color() },
      uColorTwo: { value: new THREE.Color() },
      uLineThickness: { value: 0 },
      uBaseRadius: { value: 0 },
      uRadiusStep: { value: 0 },
      uScaleRate: { value: 0 },
      uRingCount: { value: 0 },
      uOpacity: { value: 1 },
      uNoiseAmount: { value: 0 },
      uRotation: { value: 0 },
      uRingGap: { value: 1.6 },
      uFadeIn: { value: 0.5 },
      uFadeOut: { value: 0.75 },
      uMouse: { value: new THREE.Vector2() },
      uMouseInfluence: { value: 0 },
      uHoverAmount: { value: 0 },
      uHoverScale: { value: 1 },
      uParallax: { value: 0 },
      uBurst: { value: 0 },
      uCoverageAlpha: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(quad);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      /* El tope de 2 en la densidad de píxeles NO es pereza: en una pantalla a
         3x este shader dibujaría nueve veces los píxeles de una a 1x, y es un
         fondo — no merece ese coste. A 2x ya no se distinguen los bordes. */
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);
      uniforms.uResolution.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current[0] = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current[1] = -((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onMouseEnter = () => {
      isHoveredRef.current = true;
    };
    const onMouseLeave = () => {
      isHoveredRef.current = false;
      mouseRef.current[0] = 0;
      mouseRef.current[1] = 0;
    };
    const onClick = () => {
      burstRef.current = 1;
    };

    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("mouseenter", onMouseEnter);
    mount.addEventListener("mouseleave", onMouseLeave);
    mount.addEventListener("click", onClick);

    let frameId = 0;
    let isVisible = false;
    let isPageVisible = !document.hidden;
    let elapsed = 0;
    let lastT = 0;

    const aplicarUniformes = () => {
      const p = propsRef.current;
      uniforms.uTime.value = elapsed;
      uniforms.uAttenuation.value = p.attenuation;
      uniforms.uColor.value.set(p.color);
      uniforms.uColorTwo.value.set(p.colorTwo);
      uniforms.uLineThickness.value = p.lineThickness;
      uniforms.uBaseRadius.value = p.baseRadius;
      uniforms.uRadiusStep.value = p.radiusStep;
      uniforms.uScaleRate.value = p.scaleRate;
      uniforms.uRingCount.value = p.ringCount;
      uniforms.uOpacity.value = p.opacity;
      uniforms.uNoiseAmount.value = p.noiseAmount;
      uniforms.uRotation.value = (p.rotation * Math.PI) / 180;
      uniforms.uRingGap.value = p.ringGap;
      uniforms.uFadeIn.value = p.fadeIn;
      uniforms.uFadeOut.value = p.fadeOut;
      uniforms.uMouse.value.set(
        smoothMouseRef.current[0],
        smoothMouseRef.current[1],
      );
      uniforms.uMouseInfluence.value = p.followMouse ? p.mouseInfluence : 0;
      uniforms.uHoverAmount.value = hoverAmountRef.current;
      uniforms.uHoverScale.value = p.hoverScale;
      uniforms.uParallax.value = p.parallax;
      uniforms.uBurst.value = p.clickBurst ? burstRef.current : 0;
      uniforms.uCoverageAlpha.value = p.alphaMode === "coverage" ? 1 : 0;
    };

    /* Quien pide menos movimiento recibe UN FOTOGRAMA quieto, no un hueco. El
       bucle no llega a arrancar. */
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animate = (t: number) => {
      frameId = requestAnimationFrame(animate);
      const p = propsRef.current;

      const dt = lastT === 0 ? 0 : Math.min(t - lastT, 100);
      lastT = t;
      elapsed += dt * 0.001 * p.speed;

      smoothMouseRef.current[0] +=
        (mouseRef.current[0] - smoothMouseRef.current[0]) * 0.08;
      smoothMouseRef.current[1] +=
        (mouseRef.current[1] - smoothMouseRef.current[1]) * 0.08;
      hoverAmountRef.current +=
        ((isHoveredRef.current ? 1 : 0) - hoverAmountRef.current) * 0.08;
      burstRef.current *= 0.95;
      if (burstRef.current < 0.001) burstRef.current = 0;

      aplicarUniformes();
      renderer.render(scene, camera);
    };

    const tryStart = () => {
      if (sinMovimiento) return;
      if (isVisible && isPageVisible && frameId === 0) {
        lastT = 0;
        frameId = requestAnimationFrame(animate);
      }
    };
    const tryStop = () => {
      if (frameId !== 0) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    if (sinMovimiento) {
      /* Un instante distinto de cero para que los anillos aparezcan formados y
         no todos colapsados en el centro. */
      elapsed = 1.2;
      aplicarUniformes();
      renderer.render(scene, camera);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) tryStart();
        else tryStop();
      },
      { threshold: 0 },
    );
    io.observe(mount);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) tryStart();
      else tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    tryStart();

    return () => {
      tryStop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mouseenter", onMouseEnter);
      mount.removeEventListener("mouseleave", onMouseLeave);
      mount.removeEventListener("click", onClick);
      /* El canvas se retira comprobando que siga siendo hijo: en desarrollo,
         el modo estricto de React monta y desmonta dos veces, y un
         removeChild sobre un nodo que ya no está lanza. */
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      quad.geometry.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        ...(blur > 0 ? { filter: `blur(${blur}px)` } : null),
      }}
    />
  );
}
