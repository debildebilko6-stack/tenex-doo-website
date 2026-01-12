"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Award, Building, Truck, Users, TrendingUp, Star } from "lucide-react"

const timelineEvents = [
  {
    year: "1993",
    title: "Osnivanje firme",
    description: "Emir Kulaglić osniva TENEX d.o.o. u Sarajevu sa vizijom izgradnje pouzdane građevinske kompanije.",
    icon: Building,
  },
  {
    year: "2000",
    title: "Proširenje flote",
    description: "Nabavka prvih modernih bagera i kamiona, što omogućava veće i složenije projekte.",
    icon: Truck,
  },
  {
    year: "2008",
    title: "100 zaposlenih",
    description: "Kompanija dostiže milestone od 100 zaposlenih i postaje jedan od lidera u regiji.",
    icon: Users,
  },
  {
    year: "2015",
    title: "Regionalno širenje",
    description: "Započinjemo projekte širom Bosne i Hercegovine, gradeći reputaciju pouzdanog partnera.",
    icon: TrendingUp,
  },
  {
    year: "2020",
    title: "Certifikacija kvaliteta",
    description: "Dobivanje ISO certifikata i priznanja za izvrsnost u građevinskoj industriji.",
    icon: Award,
  },
  {
    year: "2024",
    title: "30+ godina uspjeha",
    description: "Tri decenije pouzdanosti, kvaliteta i posvećenosti svakom projektu.",
    icon: Star,
  },
]

export function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timelineEvents.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30">
        <div className="absolute inset-0 border border-primary/10 rounded-full animate-pulse" />
        <div
          className="absolute inset-10 border border-primary/10 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute inset-20 border border-primary/10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-6 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/90">Naša historija</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="text-foreground">30 godina </span>
            <span className="text-gradient">izgradnje povjerenja</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Progress line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border/50 -translate-y-1/2" />
          <div
            ref={progressRef}
            className="absolute top-1/2 left-0 h-px bg-primary -translate-y-1/2 transition-all duration-500"
            style={{ width: `${(activeIndex / (timelineEvents.length - 1)) * 100}%` }}
          />

          {/* Timeline nodes */}
          <div className="relative flex justify-between">
            {timelineEvents.map((event, index) => (
              <button
                key={event.year}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative group flex flex-col items-center transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Node */}
                <div
                  className={cn(
                    "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 relative z-10",
                    activeIndex === index
                      ? "bg-primary text-primary-foreground scale-110 animate-electric-pulse"
                      : activeIndex > index
                        ? "bg-primary/50 text-primary-foreground"
                        : "bg-card border-2 border-border text-muted-foreground group-hover:border-primary/50",
                  )}
                >
                  <event.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>

                {/* Year */}
                <span
                  className={cn(
                    "mt-4 text-sm md:text-base font-bold transition-colors",
                    activeIndex === index ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {event.year}
                </span>

                {/* Pulse ring */}
                {activeIndex === index && (
                  <div className="absolute top-0 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-primary animate-ping opacity-30" />
                )}
              </button>
            ))}
          </div>

          {/* Content card */}
          <div
            className={cn(
              "mt-6 glass-card rounded-3xl p-4 md:p-5 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {(() => {
                    const Icon = timelineEvents[activeIndex].icon
                    return <Icon className="w-10 h-10 text-primary" />
                  })()}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-primary font-mono text-sm mb-2">{timelineEvents[activeIndex].year}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {timelineEvents[activeIndex].title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {timelineEvents[activeIndex].description}
                </p>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-2 mt-4 justify-center">
              {timelineEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    activeIndex === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30",
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
