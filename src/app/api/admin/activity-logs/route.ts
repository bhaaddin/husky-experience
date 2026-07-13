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
    const limit = parseInt(searchParams.get('limit') || '50')

    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: { select: { name: true, email: true } } },
    })
    return NextResponse.json({ success: true, data: logs })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch activity logs' }, { status: 500 })
  }
}
