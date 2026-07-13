import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    })
    return NextResponse.json({ success: true, data: packages })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch packages' }, { status: 500 })
  }
}
