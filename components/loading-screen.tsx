"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { getPerfTier, prefersReducedMotion } from "@/lib/perf"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startTimeRef = useRef(0)
  const [perfTier, setPerfTier] = useState<"low" | "mid" | "high">("low")
  const [reduceMotion, setReduceMotion] = useState(false)

  const fullText = "TENEX"

  useEffect(() => {
    document.documentElement.dataset.tenexReady = "false"
  }, [])

  useEffect(() => {
    setReduceMotion(prefersReducedMotion())
    setPerfTier(getPerfTier())
    startTimeRef.current = performance.now()
  }, [])

  useEffect(() => {
    const durationMs = perfTier === "high" ? 2400 : perfTier === "mid" ? 2200 : 2000
    const start = performance.now()
    let rafId = 0

    const tick = (now: number) => {
      const progressValue = Math.min((now - start) / durationMs, 1) * 100
      setProgress(progressValue)
      if (progressValue < 100) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    // Keep canvas idle by default (visuals simplified for performance).
  }, [])

  // Text scramble effect
  useEffect(() => {
    if (progress < 50) return

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
    let iteration = 0

    const interval = setInterval(() => {
      setDisplayText(
        fullText
          .split("")
          .map((char, index) => {
            if (index < iteration) return fullText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join(""),
      )

      if (iteration >= fullText.length) {
        clearInterval(interval)
        setDisplayText(fullText)
      }

      iteration += 0.5
    }, 50)

    return () => clearInterval(interval)
  }, [progress >= 50])

  // Transition phases
  useEffect(() => {
    if (progress >= 100) {
      const now = performance.now()
      const elapsed = now - startTimeRef.current
      const minVisibleMs = 2500
      const delay = Math.max(minVisibleMs - elapsed, 0)

      setPhase("revealing")
      setTimeout(() => {
        setIsLoaded(true)
        setPhase("done")
      }, 800 + delay)
      setTimeout(() => setIsHidden(true), 1500 + delay)
    }
  }, [progress])

  useEffect(() => {
    if (!isHidden) return
    document.documentElement.dataset.tenexReady = "true"
    window.dispatchEvent(new Event("tenex:ready"))
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
    })
  }, [isHidden])

  if (isHidden) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-all duration-700 overflow-hidden",
        isLoaded && "opacity-0 pointer-events-none",
      )}
    >
      {/* Matrix rain canvas (disabled for perf) */}
      {!reduceMotion && perfTier === "high" ? (
        <canvas ref={canvasRef} className="absolute inset-0 opacity-15" />
      ) : null}

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container with effects */}
        <div className="relative mb-12">
          {/* Orbiting rings */}
          {perfTier === "high" && !reduceMotion ? (
            <>
              <div className="absolute inset-0 -m-16">
                <div className="w-56 h-56 rounded-full border border-primary/20 animate-rotate-slow" />
              </div>
              <div className="absolute inset-0 -m-12">
                <div
                  className="w-48 h-48 rounded-full border border-primary/30 animate-rotate-slow"
                  style={{ animationDirection: "reverse", animationDuration: "15s" }}
                />
              </div>
              <div className="absolute inset-0 -m-8">
                <div
                  className="w-40 h-40 rounded-full border border-primary/40 animate-rotate-slow"
                  style={{ animationDuration: "10s" }}
                />
              </div>
            </>
          ) : null}

          {/* Main logo */}
          <div
            className={cn(
              "w-36 h-36 rounded-2xl border border-border/50 bg-background/80 overflow-hidden transition-all duration-500",
              phase === "revealing" && "scale-110",
            )}
          >
            <img src="/2.5dlogo.png" alt="TENEX logo" className="w-full h-full object-cover" />
          </div>

          {/* Corner accent */}
          <div className={cn("absolute -bottom-2 -right-2 w-8 h-8 bg-foreground rounded-lg", perfTier === "high" && !reduceMotion && "animate-float")} />

          {/* Floating particles */}
          {perfTier === "high" && !reduceMotion
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full animate-orbit"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i}s`,
                  }}
                />
              ))
            : null}
        </div>

        {/* Company name with glitch effect */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3 font-mono tracking-wider">
            <span
              className={cn("inline-block transition-all duration-300", phase === "revealing" && "animate-glitch-text")}
            >
              {displayText || "-----"}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <p className="text-sm text-muted-foreground tracking-[0.4em] uppercase font-mono">Niskogradnja</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        {/* Progress section */}
        <div className="w-72 space-y-4">
          {/* Main progress bar */}
          <div className="h-1 bg-secondary rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary to-amber-400 transition-all duration-200 rounded-full relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Progress text */}
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              INITIALIZING
            </span>
            <span className="text-primary tabular-nums">{Math.min(Math.round(progress), 100)}%</span>
          </div>

          {/* Loading states */}
          <div className="text-center text-xs text-muted-foreground font-mono space-y-1">
            <div className={cn("transition-opacity", progress > 20 ? "opacity-100" : "opacity-30")}>
              ✓ Loading assets
            </div>
            <div className={cn("transition-opacity", progress > 50 ? "opacity-100" : "opacity-30")}>
              ✓ Initializing 3D engine
            </div>
            <div className={cn("transition-opacity", progress > 80 ? "opacity-100" : "opacity-30")}>✓ Ready</div>
          </div>
        </div>
      </div>

      {/* Bottom decorative dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              progress > i * 20 ? "bg-primary scale-100" : "bg-secondary scale-75",
            )}
            style={{ transitionDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-xs font-mono text-muted-foreground/50">
        <div>SYS.INIT</div>
        <div>v2.0.30</div>
      </div>
      <div className="absolute top-8 right-8 text-xs font-mono text-muted-foreground/50 text-right">
        <div>TENEX.OS</div>
        <div>©1993-2024</div>
      </div>
    </div>
  )
}
