"use client"

import { useEffect, useRef, useState } from "react"
import { getPerfTier, prefersReducedMotion } from "@/lib/perf"

interface Point {
  x: number
  y: number
  age: number
}

export function CursorTrail() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window
    if (isTouchDevice) return

    setIsVisible(true)
    const canvas = trailRef.current
    const ctx = canvas?.getContext("2d")
    const reduceMotion = prefersReducedMotion()
    const perfTier = getPerfTier()
    const maxPoints = perfTier === "low" ? 0 : perfTier === "mid" ? 30 : 50
    const enableTrail = maxPoints > 0 && !reduceMotion
    const enableRaf = !reduceMotion

    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Add point to trail
      if (enableTrail) {
        pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 })
        if (pointsRef.current.length > maxPoints) {
          pointsRef.current.shift()
        }
      }

      // Move dot immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
      if (!enableRaf && ringRef.current) {
        ringPosRef.current = { x: e.clientX, y: e.clientY }
        ringRef.current.style.left = `${e.clientX}px`
        ringRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [role='button'], input, textarea, select, .magnetic")) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    // Animation loop
    let animationId: number
    let running = true
    const animate = () => {
      if (!running) return
      if (enableRaf) {
        // Smooth ring follow
        ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.15
        ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.15

        if (ringRef.current) {
          ringRef.current.style.left = `${ringPosRef.current.x}px`
          ringRef.current.style.top = `${ringPosRef.current.y}px`
        }
      }

      // Draw trail
      if (enableTrail && ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Age points (in-place to avoid extra allocations)
        const points = pointsRef.current
        let writeIndex = 0
        for (let i = 0; i < points.length; i++) {
          const point = points[i]
          point.age += 1
          if (point.age < 30) {
            points[writeIndex] = point
            writeIndex++
          }
        }
        points.length = writeIndex

        // Draw trail
        if (points.length > 2) {
          ctx.beginPath()
          ctx.moveTo(points[0].x, points[0].y)

          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2
            const yc = (points[i].y + points[i + 1].y) / 2
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
          }

          const gradient = ctx.createLinearGradient(
            points[0].x,
            points[0].y,
            points[points.length - 1].x,
            points[points.length - 1].y,
          )
          gradient.addColorStop(0, "rgba(217, 119, 6, 0)")
          gradient.addColorStop(1, "rgba(217, 119, 6, 0.4)")

          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.lineCap = "round"
          ctx.stroke()
        }
      }

      if (enableRaf) {
        animationId = requestAnimationFrame(animate)
      }
    }
    if (enableRaf) {
      animate()
    }

    const handleVisibility = () => {
      if (!enableRaf) return
      if (document.hidden) {
        running = false
        cancelAnimationFrame(animationId)
      } else {
        running = true
        animate()
      }
    }
    if (enableRaf) {
      document.addEventListener("visibilitychange", handleVisibility)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      if (enableRaf) {
        document.removeEventListener("visibilitychange", handleVisibility)
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <canvas
        ref={trailRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{ mixBlendMode: "screen" }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          width: isHovering ? "12px" : "8px",
          height: isHovering ? "12px" : "8px",
          background: "oklch(0.75 0.18 55)",
          borderRadius: "50%",
          mixBlendMode: "difference",
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: isHovering ? "60px" : "40px",
          height: isHovering ? "60px" : "40px",
          border: `2px solid oklch(0.75 0.18 55 / ${isHovering ? 0.8 : 0.4})`,
          borderRadius: "50%",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
          boxShadow: isHovering ? "0 0 20px oklch(0.75 0.18 55 / 0.3)" : "none",
        }}
      />
    </>
  )
}
