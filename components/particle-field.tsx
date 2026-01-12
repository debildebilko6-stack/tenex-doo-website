"use client"

import { useEffect, useRef } from "react"
import { getPerfTier, prefersReducedMotion } from "@/lib/perf"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (prefersReducedMotion()) return

    const perfTier = getPerfTier()
    if (perfTier !== "high") return
    const delayMs = perfTier === "high" ? 300 : 1200
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let cleanup: (() => void) | null = null
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      const cap = perfTier === "low" ? 1 : perfTier === "mid" ? 1.25 : 1.5
      dpr = Math.min(window.devicePixelRatio || 1, cap)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const start = () => {
      // Initialize particles
      const particleCount = perfTier === "low" ? 20 : perfTier === "mid" ? 40 : 50
      const connectionDistance = perfTier === "low" ? 60 : perfTier === "mid" ? 80 : 100
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "#f59e0b" : "#ffffff",
      }))

      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY }
      }
      window.addEventListener("mousemove", handleMouseMove)

      let animationId: number
      let running = true
      let lastFrame = 0
      const frameInterval = 33

      const animate = (now: number) => {
        if (!running) return
        if (now - lastFrame < frameInterval) {
          animationId = requestAnimationFrame(animate)
          return
        }
        lastFrame = now
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const particles = particlesRef.current
        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i]
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy

          // Mouse interaction
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 0 && dist < 150) {
            const force = (150 - dist) / 150
            particle.vx -= (dx / dist) * force * 0.02
            particle.vy -= (dy / dist) * force * 0.02
          }

          // Boundary check
          if (particle.x < 0 || particle.x > width) particle.vx *= -1
          if (particle.y < 0 || particle.y > height) particle.vy *= -1

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.globalAlpha = particle.opacity
          ctx.fill()

          // Draw connections
          for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j]
            const dx2 = particle.x - other.x
            const dy2 = particle.y - other.y
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
            if (dist2 < connectionDistance) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.strokeStyle = particle.color
              ctx.globalAlpha = (1 - dist2 / connectionDistance) * 0.15
              ctx.stroke()
            }
          }
        }

        ctx.globalAlpha = 1
        animationId = requestAnimationFrame(animate)
      }

      animate(performance.now())

      const handleVisibility = () => {
        if (document.hidden) {
          running = false
          cancelAnimationFrame(animationId)
        } else {
          running = true
          animate(performance.now())
        }
      }
      document.addEventListener("visibilitychange", handleVisibility)

      cleanup = () => {
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
      window.removeEventListener("resize", resize)
      if (readyHandler) {
        window.removeEventListener("tenex:ready", readyHandler as EventListener)
      }
      if (cleanup) cleanup()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />
}
