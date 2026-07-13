import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ success: false, error: 'Date parameter required' }, { status: 400 })
    }

    const bookingDate = new Date(date)
    const dayOfWeek = bookingDate.getDay()

    if (dayOfWeek === 0) {
      return NextResponse.json({ success: true, data: [] })
    }

    const allSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']

    const existingBookings = await prisma.booking.findMany({
      where: {
        bookingDate,
        status: { in: ['pending', 'confirmed'] },
      },
      select: { startTime: true, endTime: true },
    })

    const availableSlots = allSlots.map((time) => {
      const [hours, minutes] = time.split(':').map(Number)
      const slotStart = new Date(bookingDate)
      slotStart.setHours(hours, minutes, 0, 0)
      const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000)

      const isBooked = existingBookings.some((booking: { startTime: Date; endTime: Date }) => {
        return slotStart < booking.endTime && slotEnd > booking.startTime
      })

      return {
        time,
        available: !isBooked,
        startTime: time,
        endTime: `${String(hours + 1).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
      }
    })

    return NextResponse.json({ success: true, data: availableSlots })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch available slots' }, { status: 500 })
  }
}
