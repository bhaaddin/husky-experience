import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const booking = await prisma.booking.findFirst({
      where: { OR: [{ id: params.id }, { bookingReference: params.id }] },
      include: { package: true, user: true },
    })

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: booking })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch booking' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.booking.update({
      where: { id: params.id },
      data: { status: 'cancelled' },
    })

    return NextResponse.json({ success: true, message: 'Booking cancelled' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to cancel booking' }, { status: 500 })
  }
}
