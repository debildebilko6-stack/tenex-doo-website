"use client"

import { useRef, useState, useEffect } from "react"
import { ArrowRight, Phone, Mail, MapPin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "./magnetic-button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function CTASection() {
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

  return (
    <section ref={sectionRef} className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 bg-background/80 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">Spremni za novi projekat?</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
            Započnimo zajedno
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            Kontaktirajte nas danas i dobijte <span className="text-primary font-semibold">tačnu procjenu</span> za vaš
            projekat. Jasan plan i dogovoreni rokovi prije početka.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <MagneticButton>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 h-14 text-base font-semibold"
                asChild
              >
                <a href="#kontakt" className="flex items-center">
                  {siteConfig.primaryCtaText}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-12 h-14 text-base font-semibold border-border/60 bg-transparent hover:bg-secondary/40"
                asChild
              >
                <a href={siteConfig.contact.phone.href} className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  {siteConfig.contact.phone.value}
                </a>
              </Button>
            </MagneticButton>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Phone, label: "Telefon", value: siteConfig.contact.phone.value, subtext: siteConfig.contact.hours },
              { icon: Mail, label: "Email", value: siteConfig.contact.email.value, subtext: "Odgovaramo u 24h" },
              { icon: MapPin, label: "Servisna zona", value: siteConfig.city, subtext: siteConfig.serviceArea },
            ].map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "p-6 rounded-2xl border border-border/50 bg-card transition-all duration-500",
                  isVisible && "animate-slide-up",
                )}
                style={{ animationDelay: `${index * 150 + 300}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/40 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-foreground/70" />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-mono">
                  {item.label}
                </div>
                <div className="text-foreground font-semibold text-lg mb-1">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
