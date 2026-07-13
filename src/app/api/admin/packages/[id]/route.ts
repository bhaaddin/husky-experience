import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const body = await req.json()
    const pkg = await prisma.package.update({ where: { id: params.id }, data: body })
    return NextResponse.json({ success: true, data: pkg })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update package' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    await prisma.package.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true, message: 'Package deleted' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete package' }, { status: 500 })
  }
}
