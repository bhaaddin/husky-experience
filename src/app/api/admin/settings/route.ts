import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const settings = await prisma.setting.findMany()
    const settingsMap: Record<string, unknown> = {}
    for (const s of settings) {
      settingsMap[s.key] = s.value
    }
    return NextResponse.json({ success: true, data: settingsMap })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const body = await req.json()
    const updates = Object.entries(body).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: value as Prisma.InputJsonValue },
        create: { key, value: value as Prisma.InputJsonValue },
      })
    )
    await Promise.all(updates)
    return NextResponse.json({ success: true, message: 'Settings updated' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 })
  }
}
