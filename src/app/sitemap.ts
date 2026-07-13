import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://alkhewani.cloud'
  
  const staticPages = [
    '',
    '/about',
    '/services',
    '/gallery',
    '/booking',
    '/contact',
    '/blog',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  return [...staticPages]
}