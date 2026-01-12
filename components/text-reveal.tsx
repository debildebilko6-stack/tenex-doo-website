"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const words = children.split(" ")

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className={cn(
              "inline-block transition-transform duration-700",
              isVisible ? "translate-y-0" : "translate-y-full",
            )}
            style={{ transitionDelay: `${delay + i * 50}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}
