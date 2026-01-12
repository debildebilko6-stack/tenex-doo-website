"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: string
  className?: string
  textClassName?: string
  delay?: number
}

export function GlitchText({ children, className, textClassName, delay = 0 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isGlitching, setIsGlitching] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)

          setTimeout(() => {
            let iteration = 0
            const interval = setInterval(() => {
              setDisplayText(
                children
                  .split("")
                  .map((char, index) => {
                    if (char === " ") return " "
                    if (index < iteration) return children[index]
                    return chars[Math.floor(Math.random() * chars.length)]
                  })
                  .join(""),
              )

              if (iteration >= children.length) {
                clearInterval(interval)
                setDisplayText(children)
              }

              iteration += 1 / 2
            }, 30)
          }, delay)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [children, delay, isVisible])

  // Periodic glitch effect
  useEffect(() => {
    if (!isVisible) return

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 100)
      }
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [isVisible])

  return (
    <span
      ref={ref}
      className={cn("relative inline-block", isGlitching && "animate-glitch", className)}
      data-text={children}
    >
      <span className={cn("relative z-10", textClassName)}>{displayText || children}</span>
      {isGlitching && (
        <>
          <span
            className={cn("absolute inset-0 text-cyan-400 opacity-70", textClassName)}
            style={{ clipPath: "inset(20% 0 60% 0)", transform: "translate(-2px, 2px)" }}
          >
            {displayText}
          </span>
          <span
            className={cn("absolute inset-0 text-red-400 opacity-70", textClassName)}
            style={{ clipPath: "inset(60% 0 10% 0)", transform: "translate(2px, -2px)" }}
          >
            {displayText}
          </span>
        </>
      )}
    </span>
  )
}
