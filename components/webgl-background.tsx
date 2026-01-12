"use client"

import { useEffect, useRef } from "react"
import { getPerfTier, prefersReducedMotion } from "@/lib/perf"

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (prefersReducedMotion()) return

    const perfTier = getPerfTier()
    if (perfTier !== "high") return
    const delayMs = perfTier === "high" ? 300 : 1200
    let cleanup: (() => void) | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const start = () => {
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
      if (!gl) return

    // Shader sources
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      #define PI 3.14159265359

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for(int i = 0; i < 5; i++) {
          value += amplitude * smoothNoise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 mouse = u_mouse / u_resolution;
        
        // Create flowing noise pattern
        float t = u_time * 0.1;
        vec2 q = vec2(fbm(uv * 3.0 + t), fbm(uv * 3.0 + vec2(1.0) + t));
        vec2 r = vec2(fbm(uv * 3.0 + q + t), fbm(uv * 3.0 + q + vec2(1.0) + t));
        
        float f = fbm(uv * 3.0 + r);
        
        // Mouse influence
        float mouseDist = length(uv - mouse);
        float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * 0.3;
        
        // Color palette - amber/orange theme
        vec3 color1 = vec3(0.03, 0.02, 0.05); // Dark background
        vec3 color2 = vec3(0.85, 0.47, 0.02); // Primary amber
        vec3 color3 = vec3(0.95, 0.65, 0.15); // Light amber
        vec3 color4 = vec3(0.05, 0.03, 0.08); // Deep dark
        
        vec3 color = mix(color1, color4, f);
        color = mix(color, color2, smoothstep(0.3, 0.7, f) * 0.15);
        color = mix(color, color3, mouseInfluence);
        
        // Add subtle scan lines
        float scanline = sin(gl_FragCoord.y * 1.5) * 0.02;
        color += scanline;
        
        // Vignette
        float vignette = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5));
        color *= vignette;
        
        // Add grain
        float grain = noise(uv * 500.0 + u_time) * 0.03;
        color += grain;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    // Create program
    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    // Set up geometry
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, "u_time")
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const mouseLocation = gl.getUniformLocation(program, "u_mouse")

    let mouseX = 0
    let mouseY = 0
    let dpr = 1

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX * dpr
        mouseY = canvas.height - e.clientY * dpr
      }
      window.addEventListener("mousemove", handleMouseMove)

      const resize = () => {
        const cap = perfTier === "low" ? 1 : perfTier === "mid" ? 1.25 : 1.5
        dpr = Math.min(window.devicePixelRatio || 1, cap)
        canvas.width = Math.floor(window.innerWidth * dpr)
        canvas.height = Math.floor(window.innerHeight * dpr)
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      resize()
      window.addEventListener("resize", resize)

    // Animation loop
    const startTime = Date.now()
    let animationId: number
      let running = true
      let lastFrame = 0
      const frameInterval = 33

      const render = (now: number) => {
        if (!running) return
        if (now - lastFrame < frameInterval) {
          animationId = requestAnimationFrame(render)
          return
        }
        lastFrame = now
        const time = (Date.now() - startTime) / 1000
        gl.uniform1f(timeLocation, time)
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
        gl.uniform2f(mouseLocation, mouseX, mouseY)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        animationId = requestAnimationFrame(render)
      }
      render(performance.now())

      const handleVisibility = () => {
        if (document.hidden) {
          running = false
          cancelAnimationFrame(animationId)
        } else {
          running = true
          render(performance.now())
        }
      }
      document.addEventListener("visibilitychange", handleVisibility)

      cleanup = () => {
        window.removeEventListener("resize", resize)
        window.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("visibilitychange", handleVisibility)
        cancelAnimationFrame(animationId)
      }
    }

    let readyHandler: ((e: Event) => void) | null = null
    const scheduleStart = () => {
      timeoutId = setTimeout(start, delayMs)
    }

    if (document.documentElement.dataset.tenexReady === "true") {
      scheduleStart()
    } else {
      const handleReady = () => {
        if (readyHandler) {
          window.removeEventListener("tenex:ready", readyHandler as EventListener)
        }
        scheduleStart()
      }
      readyHandler = handleReady
      window.addEventListener("tenex:ready", readyHandler as EventListener)
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (readyHandler) {
        window.removeEventListener("tenex:ready", readyHandler as EventListener)
      }
      if (cleanup) cleanup()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" style={{ opacity: 0.6 }} />
}
