import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { blogPostSchema } from '@/lib/validations'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } },
    })
    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const body = await req.json()
    const data = blogPostSchema.parse(body)
    const post = await prisma.blogPost.create({
      data: {
        ...data,
        authorId: (session.user as any).id,
        publishedAt: data.status === 'published' ? new Date() : null,
      },
    })
    return NextResponse.json({ success: true, data: post })
  } catch (error: any) {
    if (error.name === 'ZodError') return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 })
    return NextResponse.json({ success: false, error: 'Failed to create blog post' }, { status: 500 })
  }
}
