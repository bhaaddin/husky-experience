'use client'

import { useState, useEffect } from 'react'
import { Calendar, Search, Filter, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const url = filter === 'all' ? '/api/admin/bookings' : `/api/admin/bookings?status=${filter}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => { setBookings(data.data?.items || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [filter])

  const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'outline'> = {
    confirmed: 'success', pending: 'warning', cancelled: 'danger', completed: 'outline', refunded: 'danger',
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setBookings(bookings.map((b) => b.id === id ? { ...b, status } : b))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C]">Bookings</h1>
          <p className="text-gray-500 mt-1">Manage all reservations</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
      </div>

      <div className="flex gap-3 mb-6">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === status ? 'bg-[#1A365D] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7FAFC] border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Reference</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Customer</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Package</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">No bookings found</td></tr>
            ) : bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-[#1A365D]">{b.bookingReference}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-[#1A202C]">{b.user?.name || 'Guest'}</p>
                  <p className="text-xs text-gray-500">{b.user?.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.package?.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#1A202C]">${(b.totalPriceCents / 100).toFixed(0)}</td>
                <td className="px-6 py-4"><Badge variant={statusColors[b.status]}>{b.status}</Badge></td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {b.status === 'pending' && (
                      <Button size="sm" variant="success" onClick={() => handleStatusUpdate(b.id, 'confirmed')}>Confirm</Button>
                    )}
                    {b.status === 'confirmed' && (
                      <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(b.id, 'completed')}>Complete</Button>
                    )}
                    {['pending', 'confirmed'].includes(b.status) && (
                      <Button size="sm" variant="danger" onClick={() => handleStatusUpdate(b.id, 'cancelled')}>Cancel</Button>
                    )}
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
