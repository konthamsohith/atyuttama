"use client";

import { useEffect, useRef } from "react";

/**
 * Ripple — recreation of the Framer "Ripple — Realistic Water Ripple for
 * Images" component (framer.com/m/Ripple-Qymb.js).
 *
 * A WebGL2 heightmap water simulation over an image: a wave equation
 * propagates a height field (ping-pong float textures); the render pass turns
 * the height gradient into a refraction offset + specular glint on the image.
 * Drops are added at the cursor (and ambiently), so the surface ripples like
 * water. Falls back to the static image when WebGL2/float targets are missing.
 */

interface RippleProps {
    image?: string;
    width?: number;
    height?: number;
    /** Only run the simulation when this tile is the front/active card. */
    active?: boolean;
    className?: string;
}

const VERT = `#version 300 es
in vec2 a_pos; out vec2 v_uv;
void main(){ v_uv = a_pos*0.5+0.5; gl_Position = vec4(a_pos,0.0,1.0); }`;

const UPDATE = `#version 300 es
precision highp float;
in vec2 v_uv; out vec4 o;
uniform sampler2D u_tex; uniform vec2 u_delta;
void main(){
  vec4 info = texture(u_tex, v_uv);
  vec2 dx = vec2(u_delta.x,0.0); vec2 dy = vec2(0.0,u_delta.y);
  float avg = (texture(u_tex,v_uv-dx).r + texture(u_tex,v_uv-dy).r
             + texture(u_tex,v_uv+dx).r + texture(u_tex,v_uv+dy).r) * 0.25;
  info.g += (avg - info.r) * 2.0;
  info.g *= 0.992;
  info.r += info.g;
  o = info;
}`;

const DROP = `#version 300 es
precision highp float;
in vec2 v_uv; out vec4 o;
uniform sampler2D u_tex; uniform vec2 u_center; uniform float u_radius; uniform float u_strength;
const float PI = 3.141592653589793;
void main(){
  vec4 info = texture(u_tex, v_uv);
  float d = max(0.0, 1.0 - length(u_center - v_uv)/u_radius);
  d = 0.5 - cos(d*PI)*0.5;
  info.r += d * u_strength;
  o = info;
}`;

const RENDER = `#version 300 es
precision highp float;
in vec2 v_uv; out vec4 o;
uniform sampler2D u_tex; uniform sampler2D u_image; uniform vec2 u_delta; uniform vec2 u_cover;
void main(){
  vec2 dx = vec2(u_delta.x,0.0); vec2 dy = vec2(0.0,u_delta.y);
  float du = texture(u_tex, v_uv+dx).r - texture(u_tex, v_uv-dx).r;
  float dv = texture(u_tex, v_uv+dy).r - texture(u_tex, v_uv-dy).r;
  vec2 uv = (v_uv - 0.5) * u_cover + 0.5;
  uv.y = 1.0 - uv.y;
  vec3 col = texture(u_image, uv + vec2(du,dv) * 0.32).rgb;
  float spec = pow(max(0.0, (du+dv)*0.5 + 0.5), 6.0);
  col += vec3(spec) * 0.12;
  o = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
}
function program(gl: WebGL2RenderingContext, vs: string, fs: string) {
    const p = gl.createProgram()!;
    gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    return p;
}

const Ripple = ({
    image = "/images/testimonials/person2.jpg",
    width = 240,
    height = 150,
    active = true,
    className,
}: RippleProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointer = useRef<{ x: number; y: number; moved: boolean }>({ x: 0.5, y: 0.5, moved: false });
    // read latest `active` inside the rAF without rebuilding the WebGL context
    const activeRef = useRef(active);
    activeRef.current = active;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        const gl = canvas.getContext("webgl2", { antialias: false, premultipliedAlpha: false });
        if (!gl || !gl.getExtension("EXT_color_buffer_float")) return; // fallback: static image shows

        const SIM = 256;
        const delta: [number, number] = [1 / SIM, 1 / SIM];

        // fullscreen quad
        const quad = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quad);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        const updateP = program(gl, VERT, UPDATE);
        const dropP = program(gl, VERT, DROP);
        const renderP = program(gl, VERT, RENDER);

        const bindQuad = (p: WebGLProgram) => {
            const loc = gl.getAttribLocation(p, "a_pos");
            gl.bindBuffer(gl.ARRAY_BUFFER, quad);
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        };

        // ping-pong height textures
        const makeTex = () => {
            const t = gl.createTexture()!;
            gl.bindTexture(gl.TEXTURE_2D, t);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, SIM, SIM, 0, gl.RGBA, gl.HALF_FLOAT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            return t;
        };
        const texs = [makeTex(), makeTex()];
        const fbos = texs.map((t) => {
            const f = gl.createFramebuffer()!;
            gl.bindFramebuffer(gl.FRAMEBUFFER, f);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
            return f;
        });
        let cur = 0;

        // image texture (placeholder until loaded)
        const imgTex = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, imgTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([20, 22, 30, 255]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        const cover: [number, number] = [1, 1];
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, imgTex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            const Ca = width / height;
            const Ia = img.width / img.height;
            if (Ia > Ca) {
                cover[0] = Ca / Ia;
                cover[1] = 1;
            } else {
                cover[0] = 1;
                cover[1] = Ia / Ca;
            }
        };
        img.src = image;

        const pass = (p: WebGLProgram, target: WebGLFramebuffer | null, w: number, h: number) => {
            gl.useProgram(p);
            bindQuad(p);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target);
            gl.viewport(0, 0, w, h);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        };

        const addDrop = (cx: number, cy: number, radius: number, strength: number) => {
            gl.useProgram(dropP);
            gl.uniform1i(gl.getUniformLocation(dropP, "u_tex"), 0);
            gl.uniform2f(gl.getUniformLocation(dropP, "u_center"), cx, cy);
            gl.uniform1f(gl.getUniformLocation(dropP, "u_radius"), radius);
            gl.uniform1f(gl.getUniformLocation(dropP, "u_strength"), strength);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texs[cur]);
            pass(dropP, fbos[1 - cur], SIM, SIM);
            cur = 1 - cur;
        };

        let raf = 0;
        let t = 0;
        let nextAmbient = 30;
        const seedX = [0.3, 0.7, 0.5, 0.2, 0.8];
        const seedY = [0.4, 0.6, 0.3, 0.7, 0.5];

        const frame = () => {
            // Off-screen / non-front tile: keep the last rendered frame, do no
            // WebGL work, just idle cheaply so the carousel stays smooth.
            if (!activeRef.current) {
                raf = requestAnimationFrame(frame);
                return;
            }
            t++;

            if (pointer.current.moved) {
                addDrop(pointer.current.x, pointer.current.y, 0.03, 0.12);
                pointer.current.moved = false;
            }
            if (t >= nextAmbient) {
                const k = t % seedX.length;
                addDrop(seedX[k], seedY[k], 0.04, 0.09);
                nextAmbient = t + 90;
            }

            // propagate
            for (let i = 0; i < 4; i++) {
                gl.useProgram(updateP);
                gl.uniform1i(gl.getUniformLocation(updateP, "u_tex"), 0);
                gl.uniform2f(gl.getUniformLocation(updateP, "u_delta"), delta[0], delta[1]);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texs[cur]);
                pass(updateP, fbos[1 - cur], SIM, SIM);
                cur = 1 - cur;
            }

            // render to screen
            gl.useProgram(renderP);
            gl.uniform1i(gl.getUniformLocation(renderP, "u_tex"), 0);
            gl.uniform1i(gl.getUniformLocation(renderP, "u_image"), 1);
            gl.uniform2f(gl.getUniformLocation(renderP, "u_delta"), delta[0], delta[1]);
            gl.uniform2f(gl.getUniformLocation(renderP, "u_cover"), cover[0], cover[1]);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texs[cur]);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, imgTex);
            pass(renderP, null, canvas.width, canvas.height);

            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);

        const onMove = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            pointer.current.x = (e.clientX - r.left) / r.width;
            pointer.current.y = 1 - (e.clientY - r.top) / r.height;
            pointer.current.moved = true;
        };
        canvas.addEventListener("pointermove", onMove);

        return () => {
            cancelAnimationFrame(raf);
            canvas.removeEventListener("pointermove", onMove);
        };
    }, [image, width, height]);

    return (
        <div className={`relative overflow-hidden rounded-md ${className ?? ""}`} style={{ width, height }}>
            {/* static fallback (shown if WebGL2 unavailable) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            />
            <canvas ref={canvasRef} className="relative h-full w-full" />
        </div>
    );
};

export default Ripple;
