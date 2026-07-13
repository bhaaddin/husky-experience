'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/packages')
      .then((res) => res.json())
      .then((data) => { setPackages(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this package?')) return
    await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' })
    setPackages(packages.filter((p) => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C]">Packages</h1>
          <p className="text-gray-500 mt-1">Manage service packages and pricing</p>
        </div>
        <Button asChild><Link href="/admin/packages/new"><Plus className="h-4 w-4 mr-2" /> Add Package</Link></Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-400 col-span-full text-center py-12">Loading...</p>
        ) : packages.map((pkg) => (
          <div key={pkg.id} className={`bg-white rounded-2xl p-6 border ${pkg.featured ? 'border-[#D69E2E] ring-1 ring-[#D69E2E]/20' : 'border-gray-200'}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1A202C]">{pkg.name}</h3>
                <p className="text-sm text-gray-500">{pkg.durationMinutes} min</p>
              </div>
              {pkg.featured && <Badge variant="warning">Featured</Badge>}
            </div>
            <p className="text-3xl font-bold text-[#1A365D] mb-4">${(pkg.priceCents / 100).toFixed(0)}</p>
            <p className="text-sm text-gray-600 mb-6 line-clamp-2">{pkg.description}</p>
            <div className="flex items-center gap-2">
              <Link href={`/admin/packages/${pkg.id}`} className="p-2 rounded-lg hover:bg-gray-100"><Pencil className="h-4 w-4" /></Link>
              <button onClick={() => handleDelete(pkg.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              <Badge variant={pkg.isActive ? 'success' : 'danger'} className="ml-auto">{pkg.isActive ? 'Active' : 'Inactive'}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
