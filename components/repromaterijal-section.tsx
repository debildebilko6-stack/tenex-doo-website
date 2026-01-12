"use client";

export function RepromaterijalSection() {
  return (
    <section id="repromaterijal" className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_55%)]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 mb-3">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-foreground/90">Repromaterijal</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 leading-[1.1]">
              Materijali koji predstavljaju naš kvalitet
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4">
              Profesionalni promotivni materijali za partnere, događaje i gradilišta. Dosljedan vizuelni identitet, jasna poruka i uredna izvedba.
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5 mb-4">
              {[
                "Katalozi i tehnička dokumentacija",
                "Signalizacija i tablice na terenu",
                "Radne uniforme i zaštitna oprema",
                "Vozila i brendiranje opreme",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-xl border border-border/50 bg-card/60 px-3 py-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl border border-border/50 bg-card/70 px-4 py-2">
                <div className="text-xs text-muted-foreground">Od</div>
                <div className="text-lg font-semibold text-foreground">1993.</div>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/70 px-4 py-2">
                <div className="text-xs text-muted-foreground">Fokus</div>
                <div className="text-lg font-semibold text-foreground">Uredna izvedba</div>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/70 px-4 py-2">
                <div className="text-xs text-muted-foreground">Utisak</div>
                <div className="text-lg font-semibold text-foreground">Profesionalno</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="relative rounded-2xl border border-border/50 bg-card p-3 md:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <img
                src="/repromaterijal.png"
                alt="Repromaterijal TENEX"
                className="w-full max-h-[55vh] object-contain"
              />
              <div className="absolute top-4 right-4 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-xs text-foreground/80">
                TENEX identitet
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
