"use client"

import { Phone, ChevronRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="mx-auto max-w-screen-sm px-4 pb-4">
        <div className="flex items-center gap-2 rounded-2xl border border-border/50 bg-background/95 p-3 shadow-md">
          <a
            href={siteConfig.contact.phone.href}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground"
            aria-label="Pozovi"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a
            href="#kontakt"
            className="flex flex-1 items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
          >
            {siteConfig.primaryCtaText}
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
