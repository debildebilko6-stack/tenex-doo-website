import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TENEX d.o.o. | Niskogradnja Sarajevo",
  description:
    "Niskogradnja, iskopi, prevoz i rušenja u Sarajevu i široj BiH. Jasni rokovi, sigurna izvedba i procjena u 24h.",
  keywords: "niskogradnja, iskopi, prevoz, rušenja, Sarajevo, BiH, građevina, TENEX",
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
    type: "website",
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
