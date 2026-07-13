import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const dogs = await prisma.dog.findMany({
      where: { featured: true },
      orderBy: { displayOrder: 'asc' },
    })
    return NextResponse.json({ success: true, data: dogs })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch featured dogs' }, { status: 500 })
  }
}
