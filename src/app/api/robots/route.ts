import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://alkhewani.cloud'
  
  const robots = `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /booking/manage/

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
`.trim()

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    }
  })
}