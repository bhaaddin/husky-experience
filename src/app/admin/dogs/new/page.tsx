'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function NewDogPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', age: 1, breed: 'Siberian Husky', personality: '', funFact: '', bio: '', imageUrl: '', imageAlt: '', featured: false, displayOrder: 0,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/dogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, age: parseInt(String(form.age)) }),
      })
      if (res.ok) router.push('/admin/dogs')
    } finally { setLoading(false) }
  }

  return (
    <div>
      <Link href="/admin/dogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1A365D] mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Dogs
      </Link>
      <h1 className="text-3xl font-bold text-[#1A202C] mb-8">Add New Dog</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
          <Input label="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Age (years)" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) || 0 })} />
            <Input label="Breed" value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} />
          </div>
          <Input label="Personality" placeholder="e.g., The Gentle Leader" value={form.personality} onChange={(e) => setForm({ ...form, personality: e.target.value })} />
          <Input label="Fun Fact" value={form.funFact} onChange={(e) => setForm({ ...form, funFact: e.target.value })} />
          <Textarea label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <Input label="Image URL" placeholder="https://..." value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <Input label="Image Alt Text" value={form.imageAlt} onChange={(e) => setForm({ ...form, imageAlt: e.target.value })} />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
              <span className="text-sm">Featured</span>
            </label>
            <Input label="Display Order" type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })} className="w-32" />
          </div>
        </div>
        <Button type="submit" size="lg" disabled={loading}>{loading ? 'Saving...' : 'Save Dog'}</Button>
      </form>
    </div>
  )
}
