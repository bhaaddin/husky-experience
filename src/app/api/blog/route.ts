import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { author: { select: { name: true } } },
      }),
      prisma.blogPost.count({ where: { status: 'published' } }),
    ])

    return NextResponse.json({
      success: true,
      data: { items: posts, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}
