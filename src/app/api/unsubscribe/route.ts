import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json()
    await prisma.subscription.update({ where: { email }, data: { subscribed: false } })
    return NextResponse.json({ success: true, message: 'Unsubscribed' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
