import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, phone: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 })
  }
}
