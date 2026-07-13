'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', featuredImage: '', imageAlt: '', status: 'draft', tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)

  const addTag = () => {
    if (tagInput && !form.tags.includes(tagInput)) {
      setForm({ ...form, tags: [...form.tags, tagInput] })
      setTagInput('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push('/admin/blog')
    } finally { setLoading(false) }
  }

  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1A365D] mb-6"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link>
      <h1 className="text-3xl font-bold text-[#1A202C] mb-8">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^\w]+/g, '-') })} />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Textarea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <Textarea label="Content (Markdown)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="min-h-[300px] font-mono text-sm" />
          <Input label="Featured Image URL" value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} />
          <Input label="Image Alt Text" value={form.imageAlt} onChange={(e) => setForm({ ...form, imageAlt: e.target.value })} />
          <Select
            label="Status"
            options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }, { value: 'archived', label: 'Archived' }]}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium mb-1.5">Tags</label>
            <div className="flex gap-2">
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add tag..." onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
              <Button type="button" variant="outline" onClick={addTag}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })} className="text-gray-400 hover:text-red-600">×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <Button type="submit" size="lg" disabled={loading}>{loading ? 'Saving...' : 'Save Post'}</Button>
      </form>
    </div>
  )
}
