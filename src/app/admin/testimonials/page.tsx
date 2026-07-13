'use client'

import { useState, useEffect } from 'react'
import { Check, X, Star, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then((res) => res.json())
      .then((data) => { setTestimonials(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleUpdate = async (id: string, updates: any) => {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    setTestimonials(testimonials.map((t) => t.id === id ? { ...t, ...updates } : t))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    setTestimonials(testimonials.filter((t) => t.id !== id))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A202C]">Testimonials</h1>
        <p className="text-gray-500 mt-1">Manage client reviews</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7FAFC] border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Client</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Review</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Rating</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1A202C]">{t.clientName}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{t.content}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < t.rating ? 'fill-[#D69E2E] text-[#D69E2E]' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {t.approved ? <Badge variant="success">Approved</Badge> : <Badge variant="warning">Pending</Badge>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {!t.approved && (
                      <Button size="sm" variant="success" onClick={() => handleUpdate(t.id, { approved: true })}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    {t.approved && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdate(t.id, { approved: false })}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
