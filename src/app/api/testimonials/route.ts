import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { testimonialSchema } from '@/lib/validations'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = testimonialSchema.parse(body)
    const testimonial = await prisma.testimonial.create({ data })
    return NextResponse.json({ success: true, data: testimonial })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 })
  }
}
