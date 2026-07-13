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
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}
