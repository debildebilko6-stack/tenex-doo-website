"use client"

const clips = [
  { id: "clip-1", src: "/demolition-clip-1.mp4", poster: "/demolition-clip-1.jpg" },
  { id: "clip-2", src: "/demolition-clip-2.mp4", poster: "/demolition-clip-2.jpg" },
  { id: "clip-3", src: "/demolition-clip-3.mp4", poster: "/demolition-clip-3.jpg" },
]

export function VideoHighlightsSection() {
  return (
    <section id="video" className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 mb-3">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-foreground/90">Video projekat</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 leading-[1.1]">
            {"Rušenje objekta Elektrodistribucije, Sarajevo"}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            {"Tri kratka isječka za brzi pregled. Video se učitava tek kada kliknete na reprodukciju."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {clips.map((clip) => (
            <div key={clip.id} className="rounded-2xl border border-border/50 bg-card overflow-hidden">
              <video className="w-full h-auto" controls preload="metadata" playsInline poster={clip.poster}>
                <source src={clip.src} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Puni video:{" "}
          <a className="text-primary underline underline-offset-4" href="/Untitled.mp4">
            Otvori video
          </a>
        </div>
      </div>
    </section>
  )
}
