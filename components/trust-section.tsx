"use client"

import { ShieldCheck, FileText, ClipboardCheck, Image } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const complianceItems = [
  {
    title: "Dozvole i licence",
    description: siteConfig.compliance.permits,
    icon: FileText,
  },
  {
    title: "Osiguranje radova",
    description: siteConfig.compliance.insurance,
    icon: ShieldCheck,
  },
  {
    title: "Certifikati i standardi",
    description: siteConfig.compliance.certifications,
    icon: ClipboardCheck,
  },
]

const caseStudies = Array.from({ length: 3 }, (_, i) => ({
  title: `Studija slučaja #${i + 1}`,
  location: "Lokacija (dodati)",
  scope: "Opseg radova (dodati)",
}))

export function TrustSection() {
  return (
    <section id="dokazi" className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 mb-4">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-foreground/90">Dokazi i usklađenost</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 leading-[1.1]">
            Povjerenje se gradi dokumentima i rezultatima
          </h2>
          <p className="text-lg text-muted-foreground">
            Ovdje dodajemo verifikovane dozvole, osiguranje i studije slučaja sa prije/poslije fotografijama.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {complianceItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/50 bg-card p-5 hover:border-border/70 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/40 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-foreground/70" />
              </div>
              <div className="font-semibold text-foreground mb-1">{item.title}</div>
              <div className="text-sm text-muted-foreground">{item.description}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {caseStudies.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/50 bg-card p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Image className="w-4 h-4 text-foreground/70" />
                Prije/poslije (dodati)
              </div>
              <div className="font-semibold text-foreground mb-1">{item.title}</div>
              <div className="text-sm text-muted-foreground">{item.location}</div>
              <div className="text-sm text-muted-foreground">{item.scope}</div>
              <div className="mt-4 rounded-xl border border-dashed border-border/70 bg-secondary/20 h-28 flex items-center justify-center text-xs text-muted-foreground">
                Dodati fotografije prije/poslije
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
