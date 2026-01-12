"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Zap, Gauge, Weight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MagneticButton } from "./magnetic-button"

const equipment = [
  {
    name: "Caterpillar 320",
    type: "Bager",
    specs: { weight: "20 tona", power: "158 KS", reach: "10 m" },
    image: "/caterpillar-320-excavator-yellow-construction.jpg",
    description: "Najsvestraniji bager za srednje i velike projekte iskopavanja.",
  },
  {
    name: "Volvo A40G",
    type: "Damper",
    specs: { weight: "39 tona", power: "473 KS", capacity: "24 m³" },
    image: "/volvo-articulated-dump-truck-yellow-construction.jpg",
    description: "Zglobni damper za transport velikih količina materijala.",
  },
  {
    name: "Komatsu D61",
    type: "Buldozer",
    specs: { weight: "18 tona", power: "168 KS", blade: "4,2 m" },
    image: "/komatsu-bulldozer-yellow-construction-heavy.jpg",
    description: "Moćan buldozer za nivelaciju i pripremu terena.",
  },
  {
    name: "Hitachi ZX350NLC-3",
    type: "Gusjeničarski hidraulični bager",
    specs: { weight: "≈ 35 t", power: "≈ 202 kW / 271 KS", capacity: "≈ 1,2–1,8 m³" },
    image: "/Hitachi ZX350NLC-3.jpg",
    description: "Teški zemljani radovi, putogradnja i iskop u zahtjevnom terenu.",
  },
  {
    name: "MAN TGS 41.440",
    type: "Kamion kiper",
    specs: { weight: "41 tona", power: "440 KS", capacity: "20 m³" },
    image: "/man-dump-truck-construction-heavy-duty-transport.jpg",
    description: "Pouzdani kamion za transport svih vrsta materijala.",
  },
  {
    name: "Bobcat E35",
    type: "Mini bager",
    specs: { weight: "3,5 tona", power: "33 KS", reach: "4 m" },
    image: "/bobcat-mini-excavator-compact-yellow-construction.jpg",
    description: "Kompaktni mini bager za uske prostore i precizne radove.",
  },
]

export function EquipmentSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
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

  const scrollTo = (index: number) => {
    if (index < 0) index = equipment.length - 1
    if (index >= equipment.length) index = 0
    setActiveIndex(index)
  }

  useEffect(() => {
    if (isHovering) return
    const interval = setInterval(() => {
      scrollTo(activeIndex + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [activeIndex, isHovering])

  return (
    <section ref={sectionRef} id="oprema" className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          className={cn(
            "flex flex-col md:flex-row md:items-end justify-between mb-5 md:mb-6 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 mb-4">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-foreground/90 font-mono">NAŠA OPREMA</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              <span className="text-foreground">Moderna </span>
              <span className="text-primary">flota</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-md">
              Lista opreme i broj mašina (dodati).
            </p>
          </div>

          <div className="flex items-center gap-4 mt-5 md:mt-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-sm font-mono bg-background/80">
              <span className="text-foreground font-semibold text-lg">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{String(equipment.length).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-2">
              <MagneticButton>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-11 h-11 bg-transparent hover:bg-secondary/40 border-border/60"
                  onClick={() => scrollTo(activeIndex - 1)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-11 h-11 bg-transparent hover:bg-secondary/40 border-border/60"
                  onClick={() => scrollTo(activeIndex + 1)}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-border/50 bg-card">
            {equipment.map((item, index) => (
              <div
                key={item.name}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  activeIndex === index ? "opacity-100" : "opacity-0",
                )}
              >
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/60 text-foreground text-xs font-semibold rounded-full mb-3">
                  <Zap className="w-4 h-4" />
                  {equipment[activeIndex].type}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
                  {equipment[activeIndex].name}
                </h3>

                <p className="text-sm md:text-base text-muted-foreground mb-2 max-w-md">
                  {equipment[activeIndex].description}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(equipment[activeIndex].specs).map(([key, value], i) => (
                    <div
                      key={key}
                      className="p-2 rounded-xl border border-border/50 bg-background/80 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        {i === 0 && <Weight className="w-4 h-4 text-foreground/70" />}
                        {i === 1 && <Zap className="w-4 h-4 text-foreground/70" />}
                        {i === 2 && <Gauge className="w-4 h-4 text-foreground/70" />}
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                          {key === "weight"
                            ? "TEŽINA"
                            : key === "power"
                              ? "SNAGA"
                              : key === "reach"
                                ? "DOMET"
                                : key === "capacity"
                                  ? "KAPACITET"
                                  : key === "blade"
                                    ? "NOŽ"
                                    : key.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 justify-center">
            {equipment.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className="group relative h-6 min-w-[40px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: activeIndex === index ? "84px" : "40px" }}
              >
                <div className="absolute inset-0 bg-muted-foreground/20 rounded-full" />
                <div
                  className={cn(
                    "absolute inset-0 bg-foreground/50 rounded-full transition-all duration-300",
                    activeIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
