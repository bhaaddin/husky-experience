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
    const updateData: any = { ...body }
    if (body.status === 'published' && !body.publishedAt) {
      updateData.publishedAt = new Date()
    }
    const post = await prisma.blogPost.update({ where: { id: params.id }, data: updateData })
    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    await prisma.blogPost.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true, message: 'Blog post deleted' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete blog post' }, { status: 500 })
  }
}
