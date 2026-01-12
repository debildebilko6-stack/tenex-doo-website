"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresa",
    value: siteConfig.contact.addressLine1,
    subvalue: siteConfig.contact.addressLine2,
    href: siteConfig.contact.map?.href,
  },
  {
    icon: Phone,
    label: siteConfig.contact.phone.label,
    value: siteConfig.contact.phone.value,
    subvalue: siteConfig.serviceArea,
  },
  {
    icon: Mail,
    label: siteConfig.contact.email.label,
    value: siteConfig.contact.email.value,
    subvalue: "Odgovaramo u roku od 24h",
  },
  {
    icon: Clock,
    label: "Radno vrijeme",
    value: siteConfig.contact.hours,
    subvalue: "Područje: " + siteConfig.serviceArea,
  },
]

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  return (
    <section ref={sectionRef} id="kontakt" className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          className={cn(
            "text-center max-w-2xl mx-auto mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 mb-3">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-foreground/90">Ponuda i procjena</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 leading-[1.1]">
            {"Pošaljite upit za brzu procjenu"}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            {"Kratak opis projekta je dovoljan. Javljamo se u roku od 24h sa sljedećim korakom."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          <div
            className={cn(
              "bg-card rounded-2xl p-6 md:p-8 border border-border/50 transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
            )}
          >
            <h3 className="text-xl font-bold text-foreground mb-1">{"Pošaljite upit"}</h3>
            <p className="text-muted-foreground mb-5">{"Očekivani odgovor u roku od 24h"}</p>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Hvala vam!</h4>
                <p className="text-muted-foreground">{"Vaša poruka je uspješno poslana. Javit ćemo vam se uskoro."}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Ime i prezime</label>
                    <Input
                      placeholder={"Vaše ime"}
                      className="bg-secondary/50 border-border/50 h-11 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Telefon ili email</label>
                    <Input
                      placeholder="+387 6X XXX XXX ili email"
                      className="bg-secondary/50 border-border/50 h-11 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Vrsta usluge</label>
                    <select className="w-full h-11 px-3 bg-secondary/50 border border-border/50 rounded-xl text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                      <option value="">Odaberite uslugu</option>
                      <option value="iskopi">Iskopi i priprema terena</option>
                      <option value="prevoz">Prevoz materijala</option>
                      <option value="rusenja">{"Rušenja i uklanjanje"}</option>
                      <option value="niskogradnja">Niskogradnja</option>
                      <option value="uredenje">{"Uređenje terena"}</option>
                      <option value="specijalno">Specijalni radovi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{"Lokacija gradilišta"}</label>
                    <Input
                      placeholder={"Sarajevo, općina"}
                      className="bg-secondary/50 border-border/50 h-11 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Kratak opis</label>
                  <Textarea
                    placeholder={"Šta treba uraditi, okvirna količina, rok..."}
                    className="bg-secondary/50 border-border/50 min-h-[96px] rounded-xl resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-xl text-sm font-semibold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {siteConfig.primaryCtaText}
                </Button>
                <div className="text-xs text-muted-foreground">
                  Odgovor u roku od 24h. Bez spama i bez dijeljenja podataka.
                </div>
              </form>
            )}
          </div>

          <div
            className={cn(
              "space-y-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
            )}
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {contactInfo.map((item, index) => (
                <div
                  key={item.label}
                  className={cn(
                    "p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer",
                    isVisible && "animate-slide-up",
                  )}
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="w-10 h-10 bg-secondary/40 rounded-xl flex items-center justify-center mb-3 transition-all">
                    <item.icon className="w-5 h-5 text-foreground/70" />
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="font-semibold text-foreground text-sm">{item.value}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary underline underline-offset-4"
                    >
                      Otvori u mapama
                    </a>
                  ) : null}
                  <div className="text-sm text-muted-foreground">{item.subvalue}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={siteConfig.contact.phone.href}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card px-3 py-1.5 text-sm text-foreground"
              >
                <Phone className="w-4 h-4 text-foreground/70" />
                Pozovi
              </a>
              <a
                href={siteConfig.contact.email.href}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card px-3 py-1.5 text-sm text-foreground"
              >
                <Mail className="w-4 h-4 text-foreground/70" />
                Email
              </a>
              <a
                href={siteConfig.contact.whatsapp.href}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card px-3 py-1.5 text-sm text-foreground"
              >
                WhatsApp
              </a>
              <a
                href={siteConfig.contact.viber.href}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card px-3 py-1.5 text-sm text-foreground"
              >
                Viber
              </a>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-card border border-border/50">
              <iframe
                title="TENEX lokacija"
                src={siteConfig.contact.map?.embedSrc}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 bg-background/80 border border-border/50 p-3 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{siteConfig.companyName}</div>
                    <div className="text-sm text-muted-foreground">{siteConfig.contact.addressLine1}</div>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-full border-border/60" asChild>
                    <a href={siteConfig.contact.map?.href} target="_blank" rel="noreferrer">
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
