'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/blog')
      .then((res) => res.json())
      .then((data) => { setPosts(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    setPosts(posts.filter((p) => p.id !== id))
  }

  const statusColors: Record<string, 'success' | 'warning' | 'outline'> = {
    published: 'success', draft: 'warning', archived: 'outline',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C]">Blog</h1>
          <p className="text-gray-500 mt-1">Manage blog posts</p>
        </div>
        <Button asChild><Link href="/admin/blog/new"><Plus className="h-4 w-4 mr-2" /> New Post</Link></Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7FAFC] border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Title</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Views</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">No blog posts yet</td></tr>
            ) : posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1A202C]">{post.title}</p>
                  <p className="text-sm text-gray-500 truncate max-w-md">{post.excerpt}</p>
                </td>
                <td className="px-6 py-4"><Badge variant={statusColors[post.status]}>{post.status}</Badge></td>
                <td className="px-6 py-4 text-sm text-gray-600">{post.views}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/blog/${post.id}`} className="p-2 rounded-lg hover:bg-gray-100"><Pencil className="h-4 w-4" /></Link>
                    <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600" /></button>
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
