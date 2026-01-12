"use client"

import { useState, useRef, useEffect } from "react"
import { Pickaxe, Truck, Building2, Hammer, ArrowRight, Shovel, Mountain } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

const services = [
  {
    icon: Pickaxe,
    title: "Iskopi i priprema terena",
    forWhom: "Investitori i izvođači prije gradnje",
    outcome: "Teren spreman za temelje bez zastoja",
    riskReduced: "Manje dodatnih iskopa i naknadnih troškova",
    includes: ["Iskop temelja", "Odvoz materijala", "Nivelacija terena", "Zaštita okolnog terena"],
    image: "/excavator-digging-construction-site-professional.jpg",
  },
  {
    icon: Truck,
    title: "Prevoz materijala",
    forWhom: "Gradilišta koja traže pouzdan transport",
    outcome: "Materijal na lokaciji kada treba",
    riskReduced: "Smanjeni zastoji na gradilištu",
    includes: ["Dostava agregata", "Odvoz šuta", "Specijalni transport", "Usklađivanje termina"],
    image: "/dump-truck-construction-transporting-gravel.jpg",
  },
  {
    icon: Building2,
    title: "Rušenja i uklanjanje",
    forWhom: "Objekti za rekonstrukciju ili novu gradnju",
    outcome: "Sigurno i čisto uklonjen objekat",
    riskReduced: "Manji rizik za okolne objekte",
    includes: ["Plan rušenja", "Kontrolisano uklanjanje", "Sortiranje materijala", "Očišćenje terena"],
    image: "/controlled-demolition-heavy-machinery-building.jpg",
  },
  {
    icon: Shovel,
    title: "Niskogradnja",
    forWhom: "Investitori infrastrukture i pristupa",
    outcome: "Stabilna podloga i uređena infrastruktura",
    riskReduced: "Manje reklamacija nakon predaje",
    includes: ["Priprema podloge", "Ugradnja slojeva", "Odvodnja", "Finalno nivelisanje"],
    image: "/road-construction-asphalt-heavy-machinery.jpg",
  },
  {
    icon: Mountain,
    title: "Uređenje terena",
    forWhom: "Terenske i urbanističke pripreme",
    outcome: "Ravan i stabilan teren za radove",
    riskReduced: "Smanjena erozija i slijeganje",
    includes: ["Nasipanje", "Zbijanje tla", "Drenaža", "Finalna nivelacija"],
    image: "/land-grading-bulldozer-terrain-preparation.jpg",
  },
  {
    icon: Hammer,
    title: "Specijalni radovi",
    forWhom: "Lokacije sa ograničenim pristupom",
    outcome: "Izvedeni radovi u zahtjevnim uslovima",
    riskReduced: "Manje zastoja zbog pristupa",
    includes: ["Mini mehanizacija", "Rad u uskim zonama", "Fazna izvedba", "Hitne intervencije"],
    image: "/specialized-construction-heavy-equipment.jpg",
  },
]

const processSteps = [
  {
    title: "Izlazak na teren",
    description: "Kratka procjena obima i rizika na licu mjesta.",
  },
  {
    title: "Ponuda i plan",
    description: "Jasni koraci, rokovi i troškovi prije početka.",
  },
  {
    title: "Izvođenje radova",
    description: "Izvedba uz stalni nadzor i dogovoreni raspored.",
  },
  {
    title: "Predaja terena",
    description: "Čist teren i dokumentovana primopredaja.",
  },
]

export function ServicesSection() {
  const [activeService, setActiveService] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="usluge" className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          className={cn(
            "max-w-3xl mb-5 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 mb-3">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-foreground/90">Usluge usmjerene na ishod</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 leading-[1.1]">
            {"Šta dobijate kada radimo mi"}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {"Svaka usluga je opisana kroz ishod, rizik koji uklanjamo i šta je uključeno. Jasno prije nego počnemo. Niskogradnja Sarajevo, iskopi i rušenja na jednoj adresi."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((service, index) => (
              <button
                key={service.title}
                onClick={() => setActiveService(index)}
                className={cn(
                  "w-full group flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-300",
                  activeService === index
                    ? "bg-card border border-border/70"
                    : "hover:bg-card/50 border border-transparent",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300",
                    activeService === index
                      ? "bg-secondary text-foreground"
                      : "bg-secondary text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  <service.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-foreground mb-1 leading-snug">{service.title}</h3>
                  <div className="space-y-1">
                    <p className="text-[12px] text-foreground/70 leading-snug">
                      <span className="text-foreground/80">Za koga:</span> {service.forWhom}
                    </p>
                    <p className="text-[12px] text-foreground/70 leading-snug">
                      <span className="text-foreground/80">Ishod:</span> {service.outcome}
                    </p>
                    <p className="text-[12px] text-foreground/70 leading-snug">
                      <span className="text-foreground/80">Rizik:</span> {service.riskReduced}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="relative lg:sticky lg:top-16 h-fit">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/2] border border-border/50 bg-card">
              {services.map((service, index) => (
                <img
                  key={service.title}
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-all duration-700",
                    activeService === index ? "opacity-100 scale-100" : "opacity-0 scale-105",
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                  {services[activeService].title}
                </h3>
                <div className="grid gap-1 text-[13px] text-foreground/70">
                  <div>
                    <span className="text-foreground/80 font-medium">Za koga:</span> {services[activeService].forWhom}
                  </div>
                  <div>
                    <span className="text-foreground/80 font-medium">Ishod:</span> {services[activeService].outcome}
                  </div>
                  <div>
                    <span className="text-foreground/80 font-medium">Rizik smanjujemo:</span> {services[activeService].riskReduced}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {services[activeService].includes.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-[11px] rounded-full text-foreground border border-border/50 bg-background/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <Button className="mt-2 h-9 px-4 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-full" asChild>
                  <a href="#kontakt">
                    {siteConfig.primaryCtaText}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border/50 bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">Kako radimo</h3>
            <span className="text-[11px] text-muted-foreground">{"4 koraka, jedna kontakt tačka"}</span>
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-xl bg-secondary/30 p-3">
                <div className="text-[11px] font-mono text-primary mb-1">0{index + 1}</div>
                <div className="font-semibold text-foreground mb-1 text-sm">{step.title}</div>
                <div className="text-[12px] text-muted-foreground leading-snug">{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
