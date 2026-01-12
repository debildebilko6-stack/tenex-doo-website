"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, MapPin, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const galleryItems = [
  {
    title: "Autoput Sarajevo-Mostar",
    category: "Niskogradnja",
    year: "2023",
    location: "Sarajevo - Mostar",
    image: "/highway-construction-aerial-view-mountain.jpg",
  },
  {
    title: "Stambeni kompleks Bjelašnica",
    category: "Iskopi",
    year: "2024",
    location: "Bjelašnica",
    image: "/residential-construction-excavation-mountain.jpg",
  },
  {
    title: "Poslovni centar Delta",
    category: "Rušenje",
    year: "2023",
    location: "Sarajevo",
    image: "/controlled-demolition-commercial-building.jpg",
  },
  {
    title: "Industrijska zona Vogošća",
    category: "Niskogradnja",
    year: "2024",
    location: "Vogošća",
    image: "/industrial-zone-construction-infrastructure.jpg",
  },
  {
    title: "Shopping centar Ilidža",
    category: "Iskopi",
    year: "2024",
    location: "Ilidža",
    image: "/shopping-center-excavation-foundation.jpg",
  },
]

export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleScroll = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setScrollProgress((scrollLeft / (scrollWidth - clientWidth)) * 100)
  }

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return
    const scrollAmount = 400
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 mb-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-foreground/90">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-foreground">Naši </span>
              <span className="text-primary">projekti</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 rounded-full border border-border/50 flex items-center justify-center hover:bg-secondary/40 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 rounded-full border border-border/50 flex items-center justify-center hover:bg-secondary/40 transition-all duration-300 group"
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-8 px-4 md:px-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {galleryItems.map((item, index) => (
          <div
            key={item.title}
            className={cn(
              "flex-none w-[85vw] md:w-[600px] snap-center transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="group relative rounded-3xl overflow-hidden aspect-[3/2] cursor-pointer">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-85" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-secondary/60 text-foreground text-sm font-medium rounded-full">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {item.year}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <MapPin className="w-4 h-4 text-foreground/60" />
                  {item.location}
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl border-2 border-border/40 group-hover:border-border/70 transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-3">
        <div className="h-1 bg-secondary/30 rounded-full overflow-hidden max-w-md mx-auto">
          <div
            className="h-full bg-foreground/50 rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress || 10}%` }}
          />
        </div>
      </div>
    </section>
  )
}
