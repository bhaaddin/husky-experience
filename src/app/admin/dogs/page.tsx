'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Star, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AdminDogsPage() {
  const [dogs, setDogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/dogs')
      .then((res) => res.json())
      .then((data) => { setDogs(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dog?')) return
    await fetch(`/api/admin/dogs/${id}`, { method: 'DELETE' })
    setDogs(dogs.filter((d) => d.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C]">Dogs</h1>
          <p className="text-gray-500 mt-1">Manage your pack of huskies</p>
        </div>
        <Button asChild>
          <Link href="/admin/dogs/new"><Plus className="h-4 w-4 mr-2" /> Add Dog</Link>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7FAFC] border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Dog</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Age</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Personality</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : dogs.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">No dogs yet. Add your first husky!</td></tr>
            ) : dogs.map((dog) => (
              <tr key={dog.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden">
                      {dog.imageUrl && <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${dog.imageUrl})` }} />}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A202C]">{dog.name}</p>
                      <p className="text-sm text-gray-500">{dog.breed}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{dog.age} {dog.age === 1 ? 'year' : 'years'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{dog.personality}</td>
                <td className="px-6 py-4">
                  {dog.featured ? <Badge variant="success">Featured</Badge> : <Badge variant="outline">Active</Badge>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/about#dog-${dog.id}`} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#1A365D]">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link href={`/admin/dogs/${dog.id}`} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#1A365D]">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button onClick={() => handleDelete(dog.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
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
