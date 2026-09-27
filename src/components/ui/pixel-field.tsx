"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/*
 * Pixel mosaic. The canvas is carved into square cells separated by a hairline
 * gap; each cell samples a slow-drifting noise field once and snaps it to a few
 * brightness steps, so the motion reads as blocky pixels rather than a gradient.
 * Cells dissolve in at random on mount, the brightest step picks up the brand
 * gradient, and cells near the pointer light up.
 */

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;      // canvas size in device px
uniform float uCell;    // cell pitch in device px
uniform float uGap;     // gap between cells in device px
uniform float uTime;
uniform float uReveal;  // 0 → 1 intro dissolve
uniform vec3 uMouse;    // x, y (device px, GL origin), strength 0..1
uniform vec4 uShape;    // ellipse cx, cy, rx, ry (uv, GL origin)
uniform float uLevels;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 local = gl_FragCoord.xy - cell * uCell;
  if (local.x < uGap || local.y < uGap) discard;

  vec2 center = (cell + 0.5) * uCell;
  vec2 uv = center / uRes;

  // Drifting field sampled once per cell.
  vec2 p = cell * 0.075;
  float n = fbm(p + vec2(uTime * 0.06, -uTime * 0.035));
  n = n * 0.75 + 0.25 * fbm(p * 0.5 - vec2(uTime * 0.02, uTime * 0.04));

  vec2 d = vec2((uv.x - uShape.x) / uShape.z, (uv.y - uShape.y) / uShape.w);
  float mask = 1.0 - smoothstep(0.1, 1.0, length(d));
  float v = smoothstep(0.32, 0.78, n) * mask;

  // Pointer halo, measured in cells so it stays round and blocky.
  float halo = 0.0;
  if (uMouse.z > 0.001) {
    float dist = length((center - uMouse.xy) / uCell);
    halo = uMouse.z * (1.0 - smoothstep(1.5, 7.5, dist + hash(cell) * 1.5));
    v = max(v, halo);
  }

  // Random-order dissolve on mount, plus a rare per-cell twinkle.
  float seed = hash(cell + 3.1);
  if (seed > uReveal) discard;
  float twinkle = step(0.985, hash(cell + floor(uTime * 1.5 + seed * 7.0)));
  v = max(v, twinkle * 0.3 * mask);

  float level = floor(v * uLevels + 0.001) / uLevels;
  if (level <= 0.0) discard;

  // Low steps are quiet greys; the top step carries the brand gradient.
  float t = clamp(uv.x * 0.8 + 0.2 * (1.0 - uv.y) + 0.1 * sin(uTime * 0.2 + uv.y * 3.0), 0.0, 1.0);
  vec3 brand = t < 0.5 ? mix(uC0, uC1, t * 2.0) : mix(uC1, uC2, t * 2.0 - 1.0);
  float top = step(uLevels - 1.5, level * uLevels);
  float hot = max(top, step(0.5, halo));
  float alpha = mix(0.04 + level * 0.3, 0.8, hot);
  vec3 color = mix(vec3(1.0), brand, hot);

  gl_FragColor = vec4(color * alpha, alpha);
}
`;

// Brand stops: blue, orange, sand.
const STOPS: [number, number, number][] = [
  [25 / 255, 150 / 255, 235 / 255], // #1996eb
  [239 / 255, 107 / 255, 57 / 255], // #ef6b39
  [209 / 255, 201 / 255, 163 / 255], // #d1c9a3
];

const REVEAL_MS = 1800;

type PixelFieldProps = {
  className?: string;
  /** Cell pitch in CSS px (square size + gap). */
  cell?: number;
  /** Gap between cells in CSS px. */
  gap?: number;
  /** Number of brightness steps. */
  levels?: number;
  /** Ellipse the pixels live in: [cx, cy, rx, ry] as fractions, y measured from the top. */
  shape?: [number, number, number, number];
  /** Light up cells around the pointer. */
  interactive?: boolean;
};

export function PixelField({
  className,
  cell = 16,
  gap = 2,
  levels = 4,
  shape = [0.5, 0.5, 0.7, 0.7],
  interactive = false,
}: PixelFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [cx, cy, rx, ry] = shape;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // A fresh canvas per effect run: a context released in cleanup can never
    // be reused, and Strict Mode runs effects twice in development.
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 block size-full";
    host.appendChild(canvas);

    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: true });
    if (!gl) {
      canvas.remove();
      return;
    }

    const program = gl.createProgram();
    for (const [type, source] of [
      [gl.VERTEX_SHADER, VERTEX],
      [gl.FRAGMENT_SHADER, FRAGMENT],
    ] as const) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("PixelField shader:", gl.getShaderInfoLog(shader));
        canvas.remove();
        return;
      }
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u("uRes");
    const uCell = u("uCell");
    const uGap = u("uGap");
    const uTime = u("uTime");
    const uReveal = u("uReveal");
    const uMouse = u("uMouse");
    gl.uniform4f(u("uShape"), cx, 1 - cy, rx, ry);
    gl.uniform1f(u("uLevels"), levels);
    gl.uniform3fv(u("uC0"), STOPS[0]);
    gl.uniform3fv(u("uC1"), STOPS[1]);
    gl.uniform3fv(u("uC2"), STOPS[2]);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let dpr = 1;
    let time = 0;
    let reveal = reduceMotion ? 1 : 0;
    const mouse = { x: 0, y: 0, s: 0 };
    const target = { x: 0, y: 0, s: 0 };

    const draw = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uReveal, reveal);
      gl.uniform3f(uMouse, mouse.x * dpr, mouse.y * dpr, mouse.s);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(host.clientWidth * dpr));
      const h = Math.max(1, Math.round(host.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
        gl.uniform1f(uCell, cell * dpr);
        gl.uniform1f(uGap, gap * dpr);
      }
      draw();
    };

    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      time += dt;
      reveal = Math.min(1, reveal + (dt * 1000) / REVEAL_MS);
      const k = 1 - Math.pow(0.0005, dt);
      mouse.x += (target.x - mouse.x) * k;
      mouse.y += (target.y - mouse.y) * k;
      mouse.s += (target.s - mouse.s) * k * 0.5;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (reduceMotion || frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      if (inside && target.s === 0) {
        // Enter from the pointer, not from wherever the halo last faded out.
        mouse.x = x;
        mouse.y = rect.height - y;
      }
      target.x = x;
      target.y = rect.height - y;
      target.s = inside ? 1 : 0;
    };
    if (interactive && finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start();
      else stop();
    });
    visibility.observe(host);

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [cell, gap, levels, cx, cy, rx, ry, interactive]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn("pointer-events-none absolute overflow-hidden", className)}
    />
  );
}
