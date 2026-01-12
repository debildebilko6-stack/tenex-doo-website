"use client"

import type { ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Simple wrapper - smooth scroll is handled by CSS
  return <>{children}</>
}
