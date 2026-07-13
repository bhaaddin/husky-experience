import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { galleryImageSchema } from '@/lib/validations'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const images = await prisma.galleryImage.findMany({ orderBy: { displayOrder: 'asc' } })
    return NextResponse.json({ success: true, data: images })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const body = await req.json()
    const data = galleryImageSchema.parse(body)
    const image = await prisma.galleryImage.create({ data })
    return NextResponse.json({ success: true, data: image })
  } catch (error: any) {
    if (error.name === 'ZodError') return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 })
    return NextResponse.json({ success: false, error: 'Failed to upload image' }, { status: 500 })
  }
}
