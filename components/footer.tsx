"use client"

import { Facebook, Instagram, Linkedin, Youtube, ArrowUp, Mail, Phone, MapPin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

const footerLinks = {
  usluge: [
    { label: "Iskopi", href: "#usluge" },
    { label: "Prevozi", href: "#usluge" },
    { label: "Rušenja", href: "#usluge" },
    { label: "Niskogradnja", href: "#usluge" },
  ],
  kompanija: [
    { label: "O nama", href: "#o-nama" },
    { label: "Naša oprema", href: "#oprema" },
    { label: "Projekti", href: "#projekti" },
    { label: "Kontakt", href: "#kontakt" },
  ],
  pravno: [
    { label: "Politika privatnosti", href: "#" },
    { label: "Uvjeti korištenja", href: "#" },
    { label: "Licenca", href: "#" },
  ],
}

const socialLinks: { icon: typeof Facebook; href: string; label: string }[] = []

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    const footer = document.querySelector("footer")
    if (footer) observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <footer className="relative bg-card border-t border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div
          className={cn(
            "relative rounded-3xl bg-secondary/20 p-8 md:p-12 border border-border/50 overflow-hidden transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                Spremni za saradnju?
              </h3>
              <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
                Pouzdan partner za niskogradnju. Godina osnivanja: {siteConfig.foundedYear}.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 h-14 font-semibold whitespace-nowrap group"
              asChild
            >
              <a href="#kontakt">
                {siteConfig.primaryCtaText}
                <ArrowUp className="w-5 h-5 ml-2 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div
            className={cn(
              "lg:col-span-2 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <a href="#pocetna" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-background/80 border border-border/50 transition-transform group-hover:scale-105">
                <img src="/2.5dlogo.png" alt="TENEX logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="block text-xl font-bold text-foreground">TENEX</span>
                <span className="block text-xs text-muted-foreground tracking-[0.2em] uppercase font-mono">
                  d.o.o. Sarajevo
                </span>
              </div>
            </a>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Vaš pouzdan partner za sve vrste niskogradnje od{" "}
              <span className="text-primary font-semibold">{siteConfig.foundedYear}</span> godine. Kvalitet,
              pouzdanost i profesionalnost u svakom projektu.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href={siteConfig.contact.phone.href}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group whitespace-nowrap"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="font-mono">{siteConfig.contact.phone.value}</span>
              </a>
              <a
                href={siteConfig.contact.email.href}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group whitespace-nowrap"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                {siteConfig.contact.email.value}
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div>{siteConfig.contact.addressLine1}</div>
                  <a
                    href={siteConfig.contact.map?.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary underline underline-offset-4"
                  >
                    Otvori u mapama
                  </a>
                </div>
              </div>
            </div>

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <div
              key={category}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${categoryIndex * 100 + 200}ms` }}
            >
              <h4 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li
                    key={link.label}
                    className={cn(isVisible && "animate-slide-up")}
                    style={{ animationDelay: `${categoryIndex * 100 + linkIndex * 50 + 300}ms` }}
                  >
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.companyName}. Sva prava zadržana.
          </div>
          <div className="text-xs text-muted-foreground">
            Sarajevo, Bosna i Hercegovina
          </div>
        </div>
      </div>
    </footer>
  )
}
