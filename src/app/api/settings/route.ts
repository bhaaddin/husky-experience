import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
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
