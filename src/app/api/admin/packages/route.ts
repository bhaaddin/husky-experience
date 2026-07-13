import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { packageSchema } from '@/lib/validations'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const packages = await prisma.package.findMany({ orderBy: { displayOrder: 'asc' } })
    return NextResponse.json({ success: true, data: packages })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch packages' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const body = await req.json()
    const data = packageSchema.parse(body)
    const pkg = await prisma.package.create({ data })
    return NextResponse.json({ success: true, data: pkg })
  } catch (error: any) {
    if (error.name === 'ZodError') return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 })
    return NextResponse.json({ success: false, error: 'Failed to create package' }, { status: 500 })
  }
}
