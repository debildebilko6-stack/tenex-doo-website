"use client"

import { Pickaxe, Truck, Building2, Hammer, Mountain, Shovel, HardHat, Wrench } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const items = [
  { icon: Pickaxe, text: "ISKOPI" },
  { icon: Truck, text: "TRANSPORT" },
  { icon: Building2, text: "RUŠENJA" },
  { icon: Mountain, text: "NIVELACIJA" },
  { icon: Shovel, text: "NISKOGRADNJA" },
  { icon: HardHat, text: "PROFESIONALCI" },
  { icon: Hammer, text: "GRAĐEVINA" },
  { icon: Wrench, text: "ODRŽAVANJE" },
]

export function MarqueeSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      className="relative py-6 overflow-hidden border-y border-border/50 bg-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn("flex", isHovered ? "[animation-play-state:paused]" : "animate-marquee")}>
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-4 px-8 whitespace-nowrap">
            <item.icon className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold tracking-[0.2em] text-foreground">{item.text}</span>
            <span className="text-foreground/30">·</span>
          </div>
        ))}
      </div>
    </section>
  )
}
