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
    const image = await prisma.galleryImage.update({ where: { id: params.id }, data: body })
    return NextResponse.json({ success: true, data: image })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update image' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    await prisma.galleryImage.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true, message: 'Image deleted' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete image' }, { status: 500 })
  }
}
