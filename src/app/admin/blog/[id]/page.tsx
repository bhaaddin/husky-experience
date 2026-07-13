'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/blog').then((r) => r.json()).then((d) => {
      const post = d.data?.find((p: any) => p.id === params.id)
      if (post) setForm(post)
    })
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/blog/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push('/admin/blog')
    } finally { setLoading(false) }
  }

  if (!form) return <div className="text-center py-20 text-gray-400">Loading...</div>

  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1A365D] mb-6"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <h1 className="text-3xl font-bold text-[#1A202C] mb-8">Edit Post</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea label="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="min-h-[300px] font-mono text-sm" />
          <Select
            label="Status"
            options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }, { value: 'archived', label: 'Archived' }]}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          />
        </div>
        <Button type="submit" size="lg" disabled={loading}>{loading ? 'Saving...' : 'Update Post'}</Button>
      </form>
    </div>
  )
}
