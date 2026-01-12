"use client"

import { useState, useEffect, useRef } from "react"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"

const testimonials: {
  name: string
  role: string
  content: string
  rating: number
  image: string
}[] = []

export function TestimonialsSection() {
  if (!siteConfig.showTestimonials || testimonials.length === 0) return null
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    } else {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      {/* Decorative quote marks */}
      <div className="absolute top-20 left-10 text-primary/5">
        <Quote className="w-40 h-40" />
      </div>
      <div className="absolute bottom-20 right-10 text-primary/5 rotate-180">
        <Quote className="w-40 h-40" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-2xl mx-auto mb-6 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/90">Iskustva klijenata</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="text-foreground">Šta kažu naši </span>
            <span className="text-gradient">partneri</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div
          className={cn(
            "max-w-4xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="relative bg-card rounded-3xl p-8 md:p-12 border border-border/50">
            {/* Quote icon */}
            <div className="absolute -top-6 left-12 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
              <Quote className="w-6 h-6 text-primary-foreground" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-4">
              "{testimonials[activeIndex].content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <img
                    src={testimonials[activeIndex].image || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonials[activeIndex].name}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 bg-transparent"
                  onClick={() => navigate("prev")}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 bg-transparent"
                  onClick={() => navigate("next")}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeIndex === index ? "w-8 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
