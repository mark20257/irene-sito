'use client'

import { useEffect, useRef } from 'react'
import { cn, whenIdle } from '@/lib/utils'

/* ════════════════════════════════════════════════════════════════════
   Blob 3D — un "brand" liquido che cresce.
   WebGL puro (nessuna libreria): un fragment shader in raymarching
   disegna una sfera deformata con riflessi viola/lilla iridescenti.
   - segue il mouse (rotazione) e cresce con lo scroll
   - si mette in pausa quando è fuori schermo o la scheda è nascosta
   - risoluzione adattiva (leggero anche su mobile): se i fotogrammi sono
     lenti abbassa la risoluzione, se restano lenti si ferma su un fotogramma
   - con rendering software (niente GPU) non parte: resta la sfera in CSS
   - movimento ridotto: un solo fotogramma statico
   - senza WebGL resta la sfera in CSS sotto
   ════════════════════════════════════════════════════════════════════ */

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uGrow;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float sdf(vec3 p) {
  p.xz *= rot(uTime * 0.16 + uMouse.x * 0.7);
  p.yz *= rot(uTime * 0.11 - uMouse.y * 0.55);
  float t = uTime * 0.55;
  float d = length(p) - (1.0 + uGrow * 0.12);
  d += 0.11 * sin(2.9 * p.x + t) * sin(2.5 * p.y + t * 1.3) * sin(2.7 * p.z - t * 0.8);
  d += 0.035 * sin(6.5 * p.x - t * 1.6) * sin(6.1 * p.y + t) * sin(6.7 * p.z + t * 1.2);
  return d * 0.72;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    sdf(p + e.xyy) - sdf(p - e.xyy),
    sdf(p + e.yxy) - sdf(p - e.yxy),
    sdf(p + e.yyx) - sdf(p - e.yyx)
  ));
}

vec3 shade(vec3 p, vec3 rd) {
  vec3 n = calcNormal(p);
  vec3 v = -rd;
  vec3 l = normalize(vec3(-0.55, 0.75, 0.6));
  vec3 l2 = normalize(vec3(0.75, -0.45, 0.45));
  float diff = max(dot(n, l), 0.0);
  float fres = pow(clamp(1.0 - dot(n, v), 0.0, 1.0), 2.2);
  vec3 deep = vec3(0.2, 0.03, 0.4);
  vec3 violet = vec3(0.66, 0.3, 1.0);
  vec3 lilac = vec3(0.91, 0.8, 1.0);
  vec3 orchid = vec3(0.98, 0.68, 1.0);
  vec3 plum = vec3(0.56, 0.2, 0.92);
  float band = 0.5 + 0.5 * sin(dot(n, vec3(2.1, 1.3, 0.9)) * 3.2 + uTime * 0.45);
  vec3 col = mix(deep, violet, smoothstep(-0.05, 0.95, diff * 1.1 + n.y * 0.2));
  col = mix(col, mix(plum, orchid, band), fres * 0.55);
  col = mix(col, lilac, pow(fres, 2.5) * 0.65);
  col += lilac * smoothstep(0.55, 1.0, n.y) * 0.12;
  vec3 h = normalize(l + v);
  col += mix(vec3(1.0), lilac, 0.35) * pow(max(dot(n, h), 0.0), 48.0) * 0.55; // riflesso morbido, appena lilla
  col += vec3(1.0) * pow(max(dot(n, normalize(l2 + v)), 0.0), 30.0) * 0.18;
  col += orchid * pow(max(dot(n, l2), 0.0), 3.0) * 0.25;
  return col;
}

void main() {
  float m = min(uRes.x, uRes.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / m;
  vec3 ro = vec3(0.0, 0.0, 3.7);
  vec3 rd = normalize(vec3(uv, -1.55));
  float t = 0.0;
  float minD = 1e3;
  float minT = 0.0;
  bool hit = false;
  for (int i = 0; i < 64; i++) {
    float d = sdf(ro + rd * t);
    if (d < minD) { minD = d; minT = t; }
    if (d < 0.0015) { hit = true; break; }
    t += d;
    if (t > 6.0) break;
  }
  float px = 1.6 * minT / (m * 1.55);
  float alpha = hit ? 1.0 : 1.0 - smoothstep(0.0, px, minD);
  if (alpha <= 0.0) { gl_FragColor = vec4(0.0); return; }
  vec3 col = shade(ro + rd * (hit ? t : minT), rd);
  // satura a [0,1]: alcune GPU (es. su Mac) non lo fanno da sole e "riavvolgono" i valori
  // oltre 1, così il blu sparisce e il viola diventa arancione
  col = clamp(col, 0.0, 1.0);
  gl_FragColor = vec4(col * alpha, alpha);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV === 'development') console.warn('[Blob3D] shader:', gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

/**
 * Autocontrollo: legge qualche pixel dentro la sfera appena disegnata e verifica che sia viola
 * (blu ≥ rosso e verde). Alcune GPU/driver sbagliano i colori dello shader (visto: blu azzerato,
 * sfera arancione): in quel caso si resta sulla sfera CSS, che è identica ovunque.
 */
function rendersPurple(gl: WebGLRenderingContext) {
  const w = gl.drawingBufferWidth
  const h = gl.drawingBufferHeight
  const px = new Uint8Array(4)
  let inside = 0
  let purple = 0
  for (const [fx, fy] of [
    [0.5, 0.5],
    [0.4, 0.58],
    [0.6, 0.42],
    [0.5, 0.32],
    [0.5, 0.68],
  ]) {
    gl.readPixels(Math.round(w * fx), Math.round(h * fy), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px)
    if (px[3] < 230) continue // fuori dalla sfera
    inside++
    if (px[2] >= px[0] * 0.75 && px[2] >= px[1]) purple++
  }
  return inside === 0 || purple === inside
}

/** Avvia la sfera sul canvas; restituisce la pulizia (o nulla se WebGL non è adatto). */
function startBlob(el: HTMLCanvasElement, box: HTMLDivElement, grow: boolean): (() => void) | undefined {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // failIfMajorPerformanceCaveat: niente contesto se il browser non ha una GPU vera
  const gl = el.getContext('webgl', {
    alpha: true,
    antialias: false,
    premultipliedAlpha: true,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: true,
  })
  if (!gl) return
  const info = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
  if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) return

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return
  const prog = gl.createProgram()
  if (!prog) return
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(prog, 'uRes')
  const uTime = gl.getUniformLocation(prog, 'uTime')
  const uMouse = gl.getUniformLocation(prog, 'uMouse')
  const uGrow = gl.getUniformLocation(prog, 'uGrow')

  // risoluzione adattiva: massimo ~0,45 megapixel, meno se il dispositivo fatica
  let budget = 450_000
  const resize = () => {
    const w = box.clientWidth
    const h = box.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const scale = Math.min(dpr, Math.sqrt(budget / Math.max(1, w * h)))
    el.width = Math.max(1, Math.round(w * scale))
    el.height = Math.max(1, Math.round(h * scale))
    gl.viewport(0, 0, el.width, el.height)
    gl.uniform2f(uRes, el.width, el.height)
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(box)

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMove = (e: PointerEvent) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  let visible = true
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) start()
  })
  io.observe(box)

  let raf = 0
  let running = false
  let first = true
  let frozen = reduce
  const t0 = performance.now()

  // controllo qualità: media dei tempi tra fotogrammi su finestre da 24
  let last = 0
  let sum = 0
  let count = 0
  const govern = (now: number) => {
    if (last) {
      sum += now - last
      count++
    }
    last = now
    if (count < 24) return
    const avg = sum / count
    sum = count = 0
    if (avg < 34) return
    if (budget > 120_000) {
      budget = budget > 220_000 ? 220_000 : 120_000
      resize()
    } else {
      frozen = true
    }
  }

  const frame = (now: number) => {
    govern(now)
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05
    const g = grow ? Math.min(1, window.scrollY / Math.max(1, window.innerHeight)) : 0
    gl.uniform1f(uTime, reduce ? 4.0 : (now - t0) / 1000)
    gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.uniform1f(uGrow, g)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    if (first) {
      first = false
      if (!rendersPurple(gl)) {
        // colori sbagliati su questa GPU: niente 3D, resta la sfera CSS
        box.dataset.ready = 'fallback'
        running = false
        frozen = true
        return
      }
      box.dataset.ready = 'true'
    }
    if (frozen || !visible || document.hidden) {
      running = false
      last = 0
      return
    }
    raf = requestAnimationFrame(frame)
  }
  function start() {
    if (running || (frozen && !first)) return
    running = true
    raf = requestAnimationFrame(frame)
  }
  const onVisibility = () => !document.hidden && start()
  document.addEventListener('visibilitychange', onVisibility)

  start()

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('visibilitychange', onVisibility)
    // niente loseContext(): in sviluppo React rimonta il componente sullo stesso canvas
    gl.deleteBuffer(buf)
    gl.deleteProgram(prog)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
  }
}

export function Blob3D({ className, grow = true }: { className?: string; grow?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current
    const box = wrap.current
    if (!el || !box) return
    // Tutto il WebGL, anche la creazione del contesto (che può bloccare il thread per un attimo),
    // parte a pagina caricata e thread libero: il primo paint non lo aspetta mai.
    let dispose: (() => void) | undefined
    let cancelIdle: (() => void) | undefined
    const boot = () => {
      cancelIdle = whenIdle(() => {
        dispose = startBlob(el, box, grow)
      })
    }
    if (document.readyState === 'complete') boot()
    else window.addEventListener('load', boot, { once: true })
    return () => {
      window.removeEventListener('load', boot)
      cancelIdle?.()
      dispose?.()
    }
  }, [grow])

  return (
    <div ref={wrap} className={cn('group/blob', className ?? 'relative')} aria-hidden="true">
      {/* sfera CSS: visibile subito, e al posto del 3D se WebGL manca o sbaglia i colori */}
      <div className="absolute inset-[14%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_34%_28%,#f0dcff_0%,#a34dff_30%,#6a1fd6_58%,#2e0866_100%)] shadow-[inset_-28px_-36px_70px_rgb(30_4_70/0.5),inset_20px_24px_60px_rgb(240_220_255/0.22),0_40px_120px_-30px_rgb(150_70_250/0.65)] transition-opacity duration-700 group-data-[ready=true]/blob:opacity-0">
        {/* luce orchidea sul bordo in basso a destra + riflesso morbido in alto a sinistra */}
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_76%_82%,rgb(244_170_255/0.5)_0%,rgb(244_170_255/0)_36%)]" />
        <span className="absolute top-[13%] left-[17%] h-[24%] w-[34%] -rotate-[28deg] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.7),rgb(255_255_255/0))]" />
      </div>
      <canvas ref={canvas} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 group-data-[ready=true]/blob:opacity-100" />
    </div>
  )
}
