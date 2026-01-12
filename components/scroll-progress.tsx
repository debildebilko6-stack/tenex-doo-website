"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const newProgress = (scrollTop / scrollHeight) * 100
      setProgress(newProgress)
      setIsVisible(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-secondary/50">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/50 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
          style={{ left: `${progress - 10}%` }}
        />
      </div>

      {/* Side progress indicator */}
      <div
        className={cn(
          "fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
        )}
      >
        <div className="relative h-32 w-1 bg-secondary/30 rounded-full overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-primary rounded-full transition-all duration-150"
            style={{ height: `${progress}%` }}
          />
        </div>
        <div className="mt-3 text-center">
          <span className="text-xs font-mono text-primary">{Math.round(progress)}%</span>
        </div>
      </div>
    </>
  )
}
