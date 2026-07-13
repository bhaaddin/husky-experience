import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const dog = await prisma.dog.findUnique({ where: { id: params.id } })
    if (!dog) return NextResponse.json({ success: false, error: 'Dog not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: dog })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch dog' }, { status: 500 })
  }
}
