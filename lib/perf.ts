export type PerfTier = "low" | "mid" | "high"

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function getPerfTier(): PerfTier {
  if (typeof navigator === "undefined") return "high"

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency || 8

  if (prefersReducedMotion()) return "low"
  if ((memory && memory <= 4) || cores <= 4) return "low"
  if ((memory && memory <= 8) || cores <= 6) return "mid"
  return "high"
}
