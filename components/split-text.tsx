"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  type?: "words" | "chars"
}

export function SplitText({ children, className, delay = 0, type = "words" }: SplitTextProps) {
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

  const elements = type === "words" ? children.split(" ") : children.split("")

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {elements.map((element, i) => (
        <span key={i} className="overflow-hidden inline-block pb-[0.15em]">
          <span
            className={cn(
              "inline-block transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-full blur-sm",
            )}
            style={{
              transitionDelay: `${delay + i * (type === "words" ? 80 : 30)}ms`,
            }}
          >
            {element}
            {type === "words" && i < elements.length - 1 && "\u00A0"}
          </span>
        </span>
      ))}
    </span>
  )
}
