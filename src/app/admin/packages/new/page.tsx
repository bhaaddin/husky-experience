'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function NewPackagePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', slug: '', description: '', durationMinutes: 60, priceCents: 0, depositPercentage: 50, maxParticipants: 4, featured: false, imageUrl: '', displayOrder: 0, isActive: true,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, priceCents: Math.round(form.priceCents * 100) }),
      })
      if (res.ok) router.push('/admin/packages')
    } finally { setLoading(false) }
  }

  return (
    <div>
      <Link href="/admin/packages" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1A365D] mb-6"><ArrowLeft className="h-4 w-4" /> Back to Packages</Link>
      <h1 className="text-3xl font-bold text-[#1A202C] mb-8">Add New Package</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
          <Input label="Package Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Duration (minutes)" type="number" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: parseInt(e.target.value) || 0 })} />
            <Input label="Price ($)" type="number" step="0.01" value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: parseFloat(e.target.value) || 0 })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Deposit %" type="number" value={form.depositPercentage} onChange={(e) => setForm({ ...form, depositPercentage: parseInt(e.target.value) || 0 })} />
            <Input label="Max Participants" type="number" value={form.maxParticipants} onChange={(e) => setForm({ ...form, maxParticipants: parseInt(e.target.value) || 1 })} />
          </div>
          <Input label="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" /><span className="text-sm">Featured</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" /><span className="text-sm">Active</span></label>
          </div>
        </div>
        <Button type="submit" size="lg" disabled={loading}>{loading ? 'Saving...' : 'Save Package'}</Button>
      </form>
    </div>
  )
}
