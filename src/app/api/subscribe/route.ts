import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { subscribeSchema } from '@/lib/validations'
import { sendEmail, newsletterEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = subscribeSchema.parse(body)

    const existing = await prisma.subscription.findUnique({ where: { email: data.email } })
    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json({ success: true, message: 'Already subscribed' })
      }
      await prisma.subscription.update({ where: { email: data.email }, data: { subscribed: true } })
    } else {
      await prisma.subscription.create({ data: { email: data.email } })
    }

    await sendEmail({
      to: data.email,
      subject: 'Welcome to The Husky Experience Pack!',
      html: newsletterEmail(data.email.split('@')[0]),
    })

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 500 })
  }
}
