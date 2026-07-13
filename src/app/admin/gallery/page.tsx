'use client'

import { useState, useEffect } from 'react'
import { Upload, Trash2, Star, Grid, List, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then((res) => res.json())
      .then((data) => { setImages(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleUpload = async () => {
    const url = prompt('Enter image URL:')
    if (!url) return
    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: url, title: 'New Image', category: 'The Pack' }),
    })
    if (res.ok) {
      const data = await res.json()
      setImages([data.data, ...images])
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
    setImages(images.filter((i) => i.id !== id))
  }

  const filtered = images.filter((i) =>
    !search || i.title?.toLowerCase().includes(search.toLowerCase()) || i.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C]">Gallery</h1>
          <p className="text-gray-500 mt-1">Manage your photo gallery</p>
        </div>
        <Button onClick={handleUpload}><Upload className="h-4 w-4 mr-2" /> Upload Image</Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A365D]/20"
          />
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button onClick={() => setView('grid')} className={`p-2 rounded-md ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}><Grid className="h-4 w-4" /></button>
          <button onClick={() => setView('list')} className={`p-2 rounded-md ${view === 'list' ? 'bg-white shadow-sm' : ''}`}><List className="h-4 w-4" /></button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-12">Loading...</p>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div key={img.id} className="group relative aspect-square bg-gray-200 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img.imageUrl})` }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(img.id)} className="p-2 bg-white rounded-lg hover:bg-red-50"><Trash2 className="h-4 w-4 text-red-600" /></button>
                </div>
              </div>
              {img.featured && <div className="absolute top-2 right-2"><Badge variant="warning"><Star className="h-3 w-3 mr-1" /> Featured</Badge></div>}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-medium">{img.title || 'Untitled'}</p>
                <p className="text-white/70 text-xs">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F7FAFC] border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Image</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Title</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Category</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((img) => (
                <tr key={img.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3"><div className="w-12 h-12 rounded-lg bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url(${img.imageUrl})` }} /></td>
                  <td className="px-6 py-3 text-sm">{img.title || 'Untitled'}</td>
                  <td className="px-6 py-3 text-sm">{img.category}</td>
                  <td className="px-6 py-3 text-right"><button onClick={() => handleDelete(img.id)} className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
