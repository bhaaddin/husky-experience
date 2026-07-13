import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const status = searchParams.get('status')

    const where: any = {}
    if (status) where.status = status

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: { package: true, user: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.booking.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: { items: bookings, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
