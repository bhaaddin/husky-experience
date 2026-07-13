import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { bookingSchema } from '@/lib/validations'
import { generateBookingReference } from '@/lib/utils'
import { sendEmail, bookingConfirmationEmail } from '@/lib/email'
import { createPaymentIntent } from '@/lib/stripe'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const status = searchParams.get('status')

    const where: any = {}
    if (status) where.status = status

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: { package: true, user: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.booking.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        items: bookings,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = bookingSchema.parse(body)

    const pkg = await prisma.package.findFirst({
      where: { OR: [{ id: data.packageId }, { slug: data.packageId }] },
    })

    if (!pkg) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      )
    }

    const bookingDate = new Date(data.bookingDate)
    const [hours, minutes] = data.startTime.split(':').map(Number)
    const startTime = new Date(bookingDate)
    startTime.setHours(hours, minutes, 0, 0)
    const endTime = new Date(startTime.getTime() + pkg.durationMinutes * 60 * 1000)

    const existingBooking = await prisma.booking.findFirst({
      where: {
        bookingDate: bookingDate,
        status: { in: ['pending', 'confirmed'] },
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    })

    if (existingBooking) {
      return NextResponse.json(
        { success: false, error: 'This time slot is no longer available' },
        { status: 409 }
      )
    }

    const totalPriceCents = pkg.priceCents * data.numParticipants
    const depositCents = Math.round(totalPriceCents * pkg.depositPercentage / 100)

    let user = null
    if (data.email) {
      user = await prisma.user.findUnique({ where: { email: data.email } })
      if (!user) {
        const bcrypt = await import('bcryptjs')
        const tempPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10)
        user = await prisma.user.create({
          data: {
            email: data.email,
            name: data.name,
            passwordHash: tempPassword,
            phone: data.phone,
          },
        })
      }
    }

    const booking = await prisma.booking.create({
      data: {
        bookingReference: generateBookingReference(),
        userId: user?.id,
        packageId: pkg.id,
        bookingDate,
        startTime,
        endTime,
        numParticipants: data.numParticipants,
        totalPriceCents,
        depositPaidCents: 0,
        remainingCents: totalPriceCents,
        status: 'pending',
        specialRequirements: data.specialRequirements,
      },
      include: { package: true },
    })

    await sendEmail({
      to: data.email,
      subject: `Booking Received - ${booking.bookingReference}`,
      html: bookingConfirmationEmail({
        name: data.name,
        bookingReference: booking.bookingReference,
        packageName: pkg.name,
        date: bookingDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        time: data.startTime,
        participants: data.numParticipants,
        total: `$${(totalPriceCents / 100).toFixed(2)}`,
        deposit: `$${(depositCents / 100).toFixed(2)}`,
      }),
    })

    return NextResponse.json({
      success: true,
      data: booking,
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
