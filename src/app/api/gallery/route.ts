import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const where: any = {}
    if (category) where.category = category

    const [images, total] = await Promise.all([
      prisma.galleryImage.findMany({
        where,
        orderBy: { displayOrder: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.galleryImage.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: { items: images, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 })
  }
}
