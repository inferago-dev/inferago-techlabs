"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/*
 * Animated grain field. Two slow diagonal waves are thresholded against an
 * 8×8 Bayer matrix (blended with a flickering hash for film-grain shimmer),
 * so light renders as crisp dots rather than a blur. Dot colour runs along
 * the brand gradient and density falls off inside an ellipse, so the grain
 * thins out into black toward the edges.
 */

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 uCells;   // canvas size in grain cells
uniform float uTime;
uniform vec3 uMouse;   // x, y (uv, GL origin), strength 0..1
uniform vec4 uShape;   // ellipse cx, cy, rx, ry (uv, GL origin)
uniform float uBias;   // base density, ~0.3 sparse … ~0.7 dense
uniform float uGrain;  // 0 = pure ordered dither, 1 = pure noise
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;

float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 cell = floor(gl_FragCoord.xy);
  vec2 uv = cell / uCells;
  float aspect = uCells.x / uCells.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  if (uMouse.z > 0.001) {
    vec2 dm = p - vec2(uMouse.x * aspect, uMouse.y);
    p += dm * exp(-dot(dm, dm) * 8.0) * 0.35 * uMouse.z;
  }

  float v = uBias
    + 0.24 * sin(dot(p, normalize(vec2(0.55, 1.0))) * 4.6 - uTime * 0.45)
    + 0.14 * sin(dot(p, normalize(vec2(1.0, 0.28))) * 7.8 + uTime * 0.32)
    + 0.08 * sin(length(p - vec2(aspect * 0.5, 0.5)) * 11.0 - uTime * 0.6);

  vec2 d = vec2((uv.x - uShape.x) / uShape.z, (uv.y - uShape.y) / uShape.w);
  v *= 1.0 - smoothstep(0.0, 1.0, length(d));

  float flicker = hash(cell + floor(uTime * 14.0) * 17.0);
  float threshold = mix(bayer8(cell), flicker, uGrain);

  float t = clamp(uv.x + 0.18 * sin(p.y * 2.6 + uTime * 0.25), 0.0, 1.0);
  vec3 ink = t < 0.5 ? mix(uC0, uC1, smoothstep(0.0, 0.5, t)) : mix(uC1, uC2, smoothstep(0.5, 1.0, t));
  ink *= 0.6 + 0.4 * clamp(v * 1.5, 0.0, 1.0);

  gl_FragColor = v > threshold ? vec4(ink, 1.0) : vec4(0.0);
}
`;

// Brand stops: blue, orange, sand.
const STOPS: [number, number, number][] = [
  [25 / 255, 150 / 255, 235 / 255], // #1996eb
  [239 / 255, 107 / 255, 57 / 255], // #ef6b39
  [209 / 255, 201 / 255, 163 / 255], // #d1c9a3
];

// Neutral greys running light, deep, mid, so the grain shows a range of shades.
const GREY_STOPS: [number, number, number][] = [
  [0.62, 0.62, 0.64],
  [0.28, 0.28, 0.3],
  [0.48, 0.48, 0.5],
];

type DitherFieldProps = {
  className?: string;
  /** Grain cell size in CSS px. */
  cell?: number;
  /** Base density: ~0.3 sparse, ~0.7 dense. */
  bias?: number;
  /** How much random flicker mixes into the ordered dither (0–1). */
  grain?: number;
  /** Ellipse the grain lives in: [cx, cy, rx, ry] as fractions, y measured from the top. */
  shape?: [number, number, number, number];
  /** Warp the field around the pointer. */
  interactive?: boolean;
  /** Brand colours, or neutral greys. */
  tone?: "brand" | "grey";
};

export function DitherField({
  className,
  cell = 3,
  bias = 0.5,
  grain = 0.35,
  shape = [0.5, 0, 0.7, 1],
  interactive = false,
  tone = "brand",
}: DitherFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [cx, cy, rx, ry] = shape;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // A fresh canvas per effect run: a context released in cleanup can never
    // be reused, and Strict Mode runs effects twice in development.
    const canvas = document.createElement("canvas");
    canvas.className =
      "absolute top-0 left-0 block opacity-0 transition-opacity duration-[1500ms] [image-rendering:pixelated]";
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
        console.error("DitherField shader:", gl.getShaderInfoLog(shader));
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
    const uCells = u("uCells");
    const uTime = u("uTime");
    const uMouse = u("uMouse");
    gl.uniform4f(u("uShape"), cx, 1 - cy, rx, ry);
    gl.uniform1f(u("uBias"), bias);
    gl.uniform1f(u("uGrain"), grain);
    const stops = tone === "grey" ? GREY_STOPS : STOPS;
    gl.uniform3fv(u("uC0"), stops[0]);
    gl.uniform3fv(u("uC1"), stops[1]);
    gl.uniform3fv(u("uC2"), stops[2]);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let time = 0;
    const mouse = { x: 0.5, y: 0.5, s: 0 };
    const target = { x: 0.5, y: 0.5, s: 0 };

    const draw = () => {
      gl.uniform1f(uTime, time);
      gl.uniform3f(uMouse, mouse.x, mouse.y, mouse.s);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const w = Math.max(1, Math.ceil(host.clientWidth / cell));
      const h = Math.max(1, Math.ceil(host.clientHeight / cell));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = `${w * cell}px`;
        canvas.style.height = `${h * cell}px`;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uCells, w, h);
      }
      draw();
    };

    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      time += dt;
      const k = 1 - Math.pow(0.001, dt);
      mouse.x += (target.x - mouse.x) * k;
      mouse.y += (target.y - mouse.y) * k;
      mouse.s += (target.s - mouse.s) * k * 0.6;
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
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = 1 - (e.clientY - rect.top) / rect.height;
      const inside = target.x >= 0 && target.x <= 1 && target.y >= 0 && target.y <= 1;
      target.s = inside ? 1 : 0;
    };
    if (interactive && finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

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
  }, [cell, bias, grain, cx, cy, rx, ry, interactive, tone]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn("pointer-events-none absolute overflow-hidden", className)}
    />
  );
}
