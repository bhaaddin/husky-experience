import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: { author: { select: { name: true, image: true } } },
    })

    if (!post) return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })

    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blog post' }, { status: 500 })
  }
}
