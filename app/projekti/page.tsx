const placeholders = Array.from({ length: 12 }, (_, i) => ({
  title: `Projekt #${i + 1}`,
  location: "Lokacija (dodati)",
  scope: "Opseg radova (dodati)",
}))

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Projekti (u pripremi)</h1>
          <p className="text-lg text-muted-foreground">
            Dodajte realne projekte sa prije/poslije fotografijama, lokacijom, godinom i kratkim ishodom.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholders.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/50 bg-card p-5">
              <div className="mb-4 h-32 rounded-xl border border-dashed border-border/70 bg-secondary/20 flex items-center justify-center text-xs text-muted-foreground">
                Dodati fotografije prije/poslije
              </div>
              <div className="font-semibold text-foreground">{item.title}</div>
              <div className="text-sm text-muted-foreground">{item.location}</div>
              <div className="text-sm text-muted-foreground">{item.scope}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border/50 bg-card p-5">
          <div className="font-semibold text-foreground mb-1">Sadrzaj koji nedostaje</div>
          <ul className="text-sm text-muted-foreground list-disc pl-5">
            <li>Fotografije prije/poslije (6–12 projekata)</li>
            <li>Lokacija + godina</li>
            <li>Opseg radova i ishod</li>
            <li>Kontakt osoba (ako javno)</li>
          </ul>
          <div className="text-xs text-muted-foreground mt-3">
            Projekti se dodaju u komponentu `components/projects-section.tsx` ili kroz CMS ako ga uvedete.
          </div>
        </div>
      </section>
    </main>
  )
}
