import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const siteUrl = "https://tenex-doo.vercel.app"

export const metadata: Metadata = {
  title: "TENEX d.o.o. | Niskogradnja Sarajevo",
  description:
    "Niskogradnja, iskopi, prevoz i rušenja u Sarajevu i široj BiH. Jasni rokovi, sigurna izvedba i procjena u 24h.",
  keywords: "niskogradnja, iskopi, prevoz, rušenja, Sarajevo, BiH, građevina, TENEX",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/2.5dlogo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/2.5dlogo.png",
  },
  openGraph: {
    title: "TENEX d.o.o. | Niskogradnja Sarajevo",
    description: "Niskogradnja, iskopi, prevoz i rušenja u Sarajevu i široj BiH.",
    url: siteUrl,
    type: "website",
    siteName: siteConfig.companyName,
  },
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bs">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: siteConfig.companyName,
              url: siteUrl,
              telephone: siteConfig.contact.phone.value,
              email: siteConfig.contact.email.value,
              areaServed: siteConfig.serviceArea,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.contact.addressLine1,
                addressLocality: siteConfig.city,
                addressRegion: "BiH",
              },
              logo: `${siteUrl}/2.5dlogo.png`,
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
