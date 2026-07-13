import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { package: true, user: true },
    })
    if (!booking) return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: booking })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch booking' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const body = await req.json()
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: body,
      include: { package: true },
    })
    return NextResponse.json({ success: true, data: booking })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update booking' }, { status: 500 })
  }
}
