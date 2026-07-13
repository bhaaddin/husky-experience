import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const dogs = await prisma.dog.findMany({
      orderBy: { displayOrder: 'asc' },
    })
    return NextResponse.json({ success: true, data: dogs })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch dogs' }, { status: 500 })
  }
}
