"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsHidden(false)

      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null,
      )
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsHidden(true)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Hide on mobile
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={cn(
          "fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] transition-transform duration-75",
          isHidden && "opacity-0",
          isClicking && "scale-75",
        )}
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      />
      {/* Cursor ring */}
      <div
        className={cn(
          "fixed top-0 left-0 w-6 h-6 border border-primary/50 rounded-full pointer-events-none z-[9998] transition-all duration-150",
          isHidden && "opacity-0",
          isPointer && "w-10 h-10 border-primary bg-primary/10",
          isClicking && "scale-85",
        )}
        style={{
          transform: `translate(${position.x - (isPointer ? 20 : 12)}px, ${position.y - (isPointer ? 20 : 12)}px)`,
        }}
      />
    </>
  )
}
