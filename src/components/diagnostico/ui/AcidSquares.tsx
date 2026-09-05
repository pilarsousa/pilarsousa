"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, RenderTarget, Triangle } from "ogl";
import { cn } from "@/lib/cn";

type Detail = "low" | "medium" | "high";

type AcidSquaresProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  detail?: Detail;
  speed?: number;
  waveDepth?: number;
  zoom?: number;
  density?: number;
  glow?: number;
  exposure?: number;
  spread?: number;
  stepSize?: number;
  colorShift?: number;
  contrast?: number;
  brightness?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  blur?: number;
  grain?: boolean;
  grainIntensity?: number;
  lightMode?: boolean;
  className?: string;
};

const DETAIL_STEPS: Record<Detail, number> = {
  low: 20,
  medium: 32,
  high: 48,
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uWaveDepth;
uniform float uZoom;
uniform float uDensity;
uniform float uSpread;
uniform float uStepSize;
uniform float uGlow;
uniform float uExposure;
uniform float uColorShift;
uniform float uContrast;
uniform float uBrightness;
uniform float uOpacity;
uniform float uSteps;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uMouseRadius;
uniform float uEnableMouse;
uniform float uMouseActive;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uLightMode;
out vec4 fragColor;

void main() {
  vec2 frag = gl_FragCoord.xy;
  float zoom = max(uZoom, 0.05);
  float aspect = iResolution.x / iResolution.y;
  vec2 ndc = (2.0 * frag - iResolution.xy) / iResolution.y;
  vec2 dir = ndc * (0.5 / zoom);

  vec2 mouseNdc = vec2(uMouse.x * aspect, uMouse.y);
  float mr = max(uMouseRadius, 0.01);
  vec2 md = ndc - mouseNdc;
  float dent = exp(-dot(md, md) / (mr * mr)) * (3.0 * uMouseStrength * uEnableMouse * uMouseActive);

  float travel = sin(iTime * uSpeed) * uWaveDepth;
  float density = max(uDensity, 1.0);
  float spread = clamp(uSpread, 0.05, 0.6);
  float stepSize = max(uStepSize, 0.0005);
  float glowGain = max(uGlow, 0.0);

  vec3 tOffset = vec3(0.0, dent, travel);
  vec3 p = vec3(0.0);
  float s = 0.0;
  float glow = 0.0;

  for (int i = 0; i < 64; i++) {
    if (float(i) >= uSteps) break;
    p += vec3(dir * s, s);
    vec3 q = p + tOffset;
    s += density - length(q.xz) + length(ceil(q).xy);
    s = stepSize + abs(s) * spread;
    glow += glowGain / s;
  }

  float e = glow / max(uExposure, 1.0);
  float shimmer = 0.5 + 0.5 * dot(cos(iTime * uColorShift + p), vec3(0.3333));
  float v = tanh(e * uBrightness * mix(0.7, 1.05, shimmer));
  v = clamp((v - 0.5) * uContrast + 0.5, 0.0, 1.0);

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.55, v));
  col = mix(col, uColor3, smoothstep(0.55, 1.0, v));
  col *= v;

  float a = clamp(v, 0.0, 1.0) * uOpacity;
  vec3 outRgb = col * a;
  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    a = clamp(a + gv, 0.0, 1.0);
  }
  if (uLightMode > 0.5) {
    float peak = max(col.r, max(col.g, col.b));
    vec3 chroma = pow(clamp(col / max(peak, 0.0001), 0.0, 1.0), vec3(1.16));
    fragColor = vec4(mix(vec3(1.0), chroma, a * 0.94), 1.0);
  } else {
    fragColor = vec4(outRgb, a);
  }
}
`;

const postFragment = `#version 300 es
precision highp float;
uniform sampler2D tMap;
uniform vec2 iResolution;
uniform vec2 uDirection;
uniform float uRadius;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float iTime;
out vec4 fragColor;

vec4 samp(vec2 uv) {
  return texture(tMap, uv);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution;
  vec2 texel = uDirection / iResolution;
  float st = uRadius * 0.25;
  vec4 sum = samp(uv) * 0.2026;
  sum += (samp(uv + texel * st) + samp(uv - texel * st)) * 0.179;
  sum += (samp(uv + texel * (st * 2.0)) + samp(uv - texel * (st * 2.0))) * 0.124;
  sum += (samp(uv + texel * (st * 3.0)) + samp(uv - texel * (st * 3.0))) * 0.0672;
  sum += (samp(uv + texel * (st * 4.0)) + samp(uv - texel * (st * 4.0))) * 0.0285;
  vec4 col = sum;
  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    col.rgb = clamp(col.rgb + gv, 0.0, 1.0);
    col.a = clamp(col.a + gv, 0.0, 1.0);
  }
  fragColor = col;
}
`;

type AcidContext = {
  program: Program;
};

const ctxMap = new WeakMap<HTMLDivElement, AcidContext>();

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    return [1, 1, 1];
  }

  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

function stepsFor(detail: Detail): number {
  return DETAIL_STEPS[detail] ?? DETAIL_STEPS.medium;
}

export function AcidSquares({
  color1 = "#5227FF",
  color2 = "#A855F7",
  color3 = "#FFFFFF",
  detail = "medium",
  speed = 0.7,
  waveDepth = 1,
  zoom = 1.3,
  density = 10,
  glow = 1,
  exposure = 2700,
  spread = 0.3,
  stepSize = 0.002,
  colorShift = 0,
  contrast = 1,
  brightness = 1,
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 0.1,
  mouseRadius = 0.35,
  blur = 0,
  grain = true,
  grainIntensity = 0.05,
  lightMode = false,
  className,
}: AcidSquaresProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseTarget = useRef<[number, number]>([0, 0]);
  const mouseCurrent = useRef<[number, number]>([0, 0]);
  const enableMouseRef = useRef(mouseInteraction);
  const mouseStrengthRef = useRef(mouseStrength);
  const mouseActive = useRef(0);
  const mouseActiveTarget = useRef(0);
  const blurRef = useRef(blur);
  const grainRef = useRef(grain);
  const grainIntensityRef = useRef(grainIntensity);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let renderer: Renderer | null = null;
    let canvas: HTMLCanvasElement | null = null;

    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });

      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      canvas = gl.canvas;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      container.appendChild(canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex,
        fragment,
        transparent: true,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uSpeed: { value: 0.7 },
          uWaveDepth: { value: 1 },
          uZoom: { value: 1.3 },
          uDensity: { value: 10 },
          uSpread: { value: 0.3 },
          uStepSize: { value: 0.002 },
          uGlow: { value: 1 },
          uExposure: { value: 2700 },
          uColorShift: { value: 0 },
          uContrast: { value: 1 },
          uBrightness: { value: 1 },
          uOpacity: { value: 1 },
          uSteps: { value: 32 },
          uColor1: { value: new Float32Array([1, 1, 1]) },
          uColor2: { value: new Float32Array([1, 1, 1]) },
          uColor3: { value: new Float32Array([1, 1, 1]) },
          uMouse: { value: new Float32Array([0, 0]) },
          uMouseStrength: { value: 0.1 },
          uMouseRadius: { value: 0.35 },
          uEnableMouse: { value: 1 },
          uMouseActive: { value: 0 },
          uGrain: { value: 1 },
          uGrainIntensity: { value: 0.05 },
          uLightMode: { value: 0 },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });
      const postProgram = new Program(gl, {
        vertex,
        fragment: postFragment,
        transparent: true,
        uniforms: {
          tMap: { value: null },
          iResolution: { value: new Float32Array([1, 1]) },
          uDirection: { value: new Float32Array([1, 0]) },
          uRadius: { value: 0 },
          uGrain: { value: 0 },
          uGrainIntensity: { value: 0.05 },
          iTime: { value: 0 },
        },
      });
      const postMesh = new Mesh(gl, { geometry, program: postProgram });

      let rtA: RenderTarget | null = null;
      let rtB: RenderTarget | null = null;

      const ensureTargets = () => {
        if (rtA && rtB) {
          return;
        }

        const width = gl.drawingBufferWidth;
        const height = gl.drawingBufferHeight;
        rtA = new RenderTarget(gl, { width, height, depth: false });
        rtB = new RenderTarget(gl, { width, height, depth: false });
      };

      const renderFrame = () => {
        const grainOn = grainRef.current ? 1 : 0;
        const grainAmount = grainIntensityRef.current;
        program.uniforms.uGrainIntensity.value = grainAmount;
        postProgram.uniforms.uGrainIntensity.value = grainAmount;

        if (blurRef.current > 0) {
          ensureTargets();

          if (!rtA || !rtB) {
            return;
          }

          program.uniforms.uGrain.value = 0;
          renderer?.render({ scene: mesh, target: rtA });

          const postUniforms = postProgram.uniforms;
          postUniforms.uRadius.value = blurRef.current * 14;
          postUniforms.tMap.value = rtA.texture;
          postUniforms.uDirection.value[0] = 1;
          postUniforms.uDirection.value[1] = 0;
          postUniforms.uGrain.value = 0;
          renderer?.render({ scene: postMesh, target: rtB });

          postUniforms.tMap.value = rtB.texture;
          postUniforms.uDirection.value[0] = 0;
          postUniforms.uDirection.value[1] = 1;
          postUniforms.uGrain.value = grainOn;
          renderer?.render({ scene: postMesh });
          return;
        }

        program.uniforms.uGrain.value = grainOn;
        renderer?.render({ scene: mesh });
      };

      ctxMap.set(container, { program });

      const setSize = () => {
        const rect = container.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        renderer?.setSize(width, height);

        const drawingWidth = gl.drawingBufferWidth;
        const drawingHeight = gl.drawingBufferHeight;
        const resolution = program.uniforms.iResolution.value;
        resolution[0] = drawingWidth;
        resolution[1] = drawingHeight;

        const postResolution = postProgram.uniforms.iResolution.value;
        postResolution[0] = drawingWidth;
        postResolution[1] = drawingHeight;

        if (rtA && rtB) {
          rtA.setSize(drawingWidth, drawingHeight);
          rtB.setSize(drawingWidth, drawingHeight);
        }

        renderFrame();
      };

      const resizeObserver = new ResizeObserver(setSize);
      resizeObserver.observe(container);
      setSize();

      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
        mouseTarget.current = [x, y];
        mouseActiveTarget.current = 1;
      };

      const handleMouseLeave = () => {
        mouseActiveTarget.current = 0;
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      let raf = 0;
      let isVisible = true;
      let isPageVisible = !document.hidden;
      const startedAt = performance.now();

      const loop = (time: number) => {
        program.uniforms.iTime.value = (time - startedAt) * 0.001;

        const current = mouseCurrent.current;
        const target = mouseTarget.current;
        current[0] += 0.05 * (target[0] - current[0]);
        current[1] += 0.05 * (target[1] - current[1]);

        const mouse = program.uniforms.uMouse.value;
        mouse[0] = current[0];
        mouse[1] = current[1];

        const activeTarget = enableMouseRef.current
          ? mouseActiveTarget.current
          : 0;
        mouseActive.current += 0.05 * (activeTarget - mouseActive.current);
        program.uniforms.uMouseActive.value = mouseActive.current;
        program.uniforms.uEnableMouse.value = enableMouseRef.current ? 1 : 0;
        program.uniforms.uMouseStrength.value = mouseStrengthRef.current;
        postProgram.uniforms.iTime.value = program.uniforms.iTime.value;

        renderFrame();
        raf = requestAnimationFrame(loop);
      };

      const tryStart = () => {
        if (isVisible && isPageVisible && raf === 0) {
          raf = requestAnimationFrame(loop);
        }
      };

      const tryStop = () => {
        if (raf !== 0) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;

          if (isVisible) {
            tryStart();
          } else {
            tryStop();
          }
        },
        { threshold: 0 },
      );
      intersectionObserver.observe(container);

      const handleVisibility = () => {
        isPageVisible = !document.hidden;

        if (isPageVisible) {
          tryStart();
        } else {
          tryStop();
        }
      };

      document.addEventListener("visibilitychange", handleVisibility);
      tryStart();

      return () => {
        tryStop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", handleVisibility);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        ctxMap.delete(container);

        if (rtA && rtB) {
          gl.deleteFramebuffer(rtA.buffer);
          gl.deleteFramebuffer(rtB.buffer);
          rtA.textures.forEach((texture) => gl.deleteTexture(texture.texture));
          rtB.textures.forEach((texture) => gl.deleteTexture(texture.texture));
        }

        if (canvas?.parentNode === container) {
          container.removeChild(canvas);
        }

        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    } catch {
      if (canvas?.parentNode === container) {
        container.removeChild(canvas);
      }

      renderer?.gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const context = ctxMap.get(container);

    if (!context) {
      return;
    }

    const { program } = context;
    const uniforms = program.uniforms;

    uniforms.uSpeed.value = speed;
    uniforms.uWaveDepth.value = waveDepth;
    uniforms.uZoom.value = zoom;
    uniforms.uDensity.value = density;
    uniforms.uSpread.value = spread;
    uniforms.uStepSize.value = stepSize;
    uniforms.uGlow.value = glow;
    uniforms.uExposure.value = exposure;
    uniforms.uColorShift.value = colorShift;
    uniforms.uContrast.value = contrast;
    uniforms.uBrightness.value = brightness;
    uniforms.uOpacity.value = opacity;
    uniforms.uLightMode.value = lightMode ? 1 : 0;
    uniforms.uSteps.value = stepsFor(detail);
    uniforms.uMouseRadius.value = mouseRadius;

    const colorOne = hexToRgb(color1);
    const uniformColorOne = uniforms.uColor1.value;
    uniformColorOne[0] = colorOne[0];
    uniformColorOne[1] = colorOne[1];
    uniformColorOne[2] = colorOne[2];

    const colorTwo = hexToRgb(color2);
    const uniformColorTwo = uniforms.uColor2.value;
    uniformColorTwo[0] = colorTwo[0];
    uniformColorTwo[1] = colorTwo[1];
    uniformColorTwo[2] = colorTwo[2];

    const colorThree = hexToRgb(color3);
    const uniformColorThree = uniforms.uColor3.value;
    uniformColorThree[0] = colorThree[0];
    uniformColorThree[1] = colorThree[1];
    uniformColorThree[2] = colorThree[2];

    enableMouseRef.current = mouseInteraction;
    mouseStrengthRef.current = mouseStrength;
    blurRef.current = blur;
    grainRef.current = grain;
    grainIntensityRef.current = grainIntensity;
  }, [
    color1,
    color2,
    color3,
    detail,
    speed,
    waveDepth,
    zoom,
    density,
    glow,
    exposure,
    spread,
    stepSize,
    colorShift,
    contrast,
    brightness,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    blur,
    grain,
    grainIntensity,
    lightMode,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("acid-squares-container", className)}
      aria-hidden
    />
  );
}
