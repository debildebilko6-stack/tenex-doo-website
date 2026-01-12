"use client"

import { useEffect, useRef } from "react"
import { Play, ArrowRight, ChevronDown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "./magnetic-button"
import { siteConfig } from "@/lib/site-config"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let isActive = true

    const scheduleUpdate = () => {
      if (!isActive) return
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const hero = heroRef.current
        const bg = bgRef.current
        if (!hero || !bg) return
        const rect = hero.getBoundingClientRect()
        const x = rect.width ? (mouseRef.current.x - rect.left) / rect.width : 0
        const y = rect.height ? (mouseRef.current.y - rect.top) / rect.height : 0
        const scrollY = scrollRef.current
        bg.style.transform = `translate(${x * -30}px, ${y * -30 + scrollY * 0.3}px) scale(1.2)`
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      scheduleUpdate()
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
      scheduleUpdate()
    }

    const handleResize = () => scheduleUpdate()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    scheduleUpdate()

    const observer = new IntersectionObserver(
      ([entry]) => {
        isActive = entry.isIntersecting
        if (isActive) {
          scheduleUpdate()
        }
      },
      { threshold: 0.1 },
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => {
      observer.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <section ref={heroRef} id="pocetna" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ transform: "translate(0px, 0px) scale(1.2)" }}
      >
        <video
          className="w-full h-full object-cover brightness-90"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-demolition.jpg"
          aria-label={"Video rušenja objekta Elektrodistribucije, Sarajevo"}
        >
          <source src="/hero-demolition.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 bg-background/80 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">Godina osnivanja {siteConfig.foundedYear}</span>
          </div>

          <h1 className="mb-5 text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight text-foreground leading-[1.1]">
            {"Iskustvo koje traje od 1993."}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-9 leading-relaxed">
            {"Jasna procjena, dogovoreni rokovi i sigurna izvedba bez skrivenih troškova. "}
            <span className="text-primary font-semibold">{"Iskopi, prevozi, rušenja"}</span>
            {" i niskogradnja u Sarajevu i šire, uz tim koji preuzima odgovornost od početka do predaje terena."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <MagneticButton>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-14 text-base font-semibold"
                asChild
              >
                <a href="#kontakt" className="flex items-center">
                  {siteConfig.primaryCtaText}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-14 text-base font-semibold border-border/60 hover:bg-secondary/40 bg-transparent"
                asChild
              >
                <a href="#projekti" className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <Play className="w-4 h-4 text-primary ml-0.5" />
                  </div>
                  Pogledajte projekte
                </a>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-medium font-mono">
          {"Otkrijte više"}
        </span>
        <div className="w-6 h-10 rounded-full border border-muted-foreground/50 flex items-center justify-center">
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  )
}
