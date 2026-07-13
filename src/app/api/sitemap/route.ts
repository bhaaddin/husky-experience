import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://alkhewani.cloud'
  
  const staticPages = [
    '',
    '/about',
    '/services',
    '/gallery',
    '/booking',
    '/contact',
    '/blog',
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(path => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    }
  })
}