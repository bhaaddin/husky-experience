import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { dogSchema } from '@/lib/validations'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'admin') {
    throw new Error('Unauthorized')
  }
  return session
}

export async function GET() {
  try {
    await requireAdmin()
    const dogs = await prisma.dog.findMany({ orderBy: { displayOrder: 'asc' } })
    return NextResponse.json({ success: true, data: dogs })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch dogs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin()
    const body = await req.json()
    const data = dogSchema.parse(body)
    const dog = await prisma.dog.create({ data })
    return NextResponse.json({ success: true, data: dog })
  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    if (error.name === 'ZodError') return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 })
    return NextResponse.json({ success: false, error: 'Failed to create dog' }, { status: 500 })
  }
}
