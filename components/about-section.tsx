"use client"

import { useRef, useEffect, useState } from "react"
import { CheckCircle2, Award, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

const highlights = [
  `Porodična firma sa tradicijom od ${siteConfig.foundedYear}.`,
  "Vrhunska oprema i redovno održavanje",
  "Licencirani i osigurani radnici",
  "Poštivanje rokova i budžeta",
  "Ekološki osviješteno poslovanje",
  "Podrška klijentima tokom projekta",
]

const values = [
  { icon: Award, title: "Kvalitet", description: "Visoki standardi u industriji" },
  { icon: Users, title: "Tim", description: "Iskusni profesionalci" },
  { icon: Target, title: "Preciznost", description: "Svaki detalj je bitan" },
]

export function AboutSection() {
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
    <section ref={sectionRef} id="o-nama" className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div
            className={cn(
              "relative transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            )}
          >
            <div className="relative aspect-[4/3] max-w-md mx-auto">
              <div className="absolute inset-6 rounded-3xl overflow-hidden border border-border/50">
                <img
                  src="/aerial-construction-site-excavators-heavy-machiner.jpg"
                  alt="TENEX radovi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-2xl border border-border/50 max-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">{siteConfig.foundedYear}</div>
                    <div className="text-xs text-muted-foreground">Osnivanje</div>
                  </div>
                </div>
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary rounded-full" />
                </div>
              </div>

              <div className="absolute -top-3 -right-3 w-28 h-28 rounded-2xl overflow-hidden border-4 border-background">
                <img src="/excavator-yellow-construction-machinery.jpg" alt="TENEX oprema" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-700 delay-150",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 mb-4">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-foreground/90">O nama</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 leading-[1.1]">
              Tri decenije <span className="text-primary">povjerenja</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-2">
              {"TENEX d.o.o. je porodična firma osnovana "}{siteConfig.foundedYear}{". godine u Sarajevu. Fokusirani smo na sigurnu izvedbu, dogovorene rokove i odgovoran odnos prema svakoj lokaciji."}
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              {"Kombinujemo modernu opremu, stručan kadar i jasnu organizaciju rada bez obzira na veličinu projekta."}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-3">
              {values.map((value) => (
                <div key={value.title} className="p-3 rounded-2xl bg-card/60 border border-border/50 text-center">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <value.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">{value.title}</div>
                  <div className="text-[12px] text-muted-foreground mt-1">{value.description}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5 mb-3">
              {highlights.map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-xl bg-secondary/20 border border-transparent",
                    isVisible && "animate-slide-up",
                  )}
                  style={{ animationDelay: `${index * 50 + 300}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[13px] text-foreground leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 p-3 bg-card rounded-2xl border border-border/50">
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-border/60 bg-background">
                <img src="/2.5dlogo.png" alt="TENEX logo" className="w-16 h-16 object-contain p-2" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground text-base">Porodi?na firma od {siteConfig.foundedYear}.</div>
                <div className="text-sm text-muted-foreground">Dugoro?no povjerenje i odgovoran odnos.</div>
              </div>
              <Button variant="outline" className="rounded-full bg-transparent">
                {"Vi?e o nama"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
