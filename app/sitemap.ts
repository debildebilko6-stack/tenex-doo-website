import type { MetadataRoute } from "next"

const siteUrl = "https://tenex-doo.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projekti`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
}
