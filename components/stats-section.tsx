"use client"

import { useEffect, useRef, useState } from "react"
import { Truck, Building, Users, Award, TrendingUp, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { icon: Building, value: 500, suffix: "+", label: "Završenih projekata", description: "Uspješno realizovano" },
  { icon: Truck, value: 50, suffix: "+", label: "Teških mašina", description: "U našoj floti" },
  { icon: Users, value: 100, suffix: "+", label: "Zaposlenih", description: "Stručnih radnika" },
  { icon: Award, value: 30, suffix: "+", label: "Godina iskustva", description: "Od 1993. godine" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2500
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * value))
            if (progress < 1) {
              requestAnimationFrame(step)
            }
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tabular-nums">
      {count}
      <span className="text-primary">{suffix}</span>
    </div>
  )
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
            <TrendingUp className="w-4 h-4 text-primary" />
            TENEX u brojkama
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "relative text-center p-8 rounded-3xl transition-all duration-700 group",
                "bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Counter */}
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />

              {/* Label */}
              <div className="text-base font-medium text-foreground mt-3">{stat.label}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.description}</div>

              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-3xl">
                <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 transform rotate-45 translate-x-4 -translate-y-4 group-hover:bg-primary/20 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-muted-foreground inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>
              Pouzdani partner od <strong className="text-foreground">1993.</strong> godine
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
