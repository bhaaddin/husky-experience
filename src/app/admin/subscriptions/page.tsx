'use client'

import { useState, useEffect } from 'react'
import { Download, Trash2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/subscriptions')
      .then((res) => res.json())
      .then((data) => { setSubscriptions(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const activeCount = subscriptions.filter((s) => s.subscribed).length

  const exportCSV = () => {
    const csv = 'Email,Subscribed,Created At\n' + subscriptions.map((s) => `${s.email},${s.subscribed},${s.createdAt}`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscribers.csv'
    a.click()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C]">Subscribers</h1>
          <p className="text-gray-500 mt-1">{activeCount} active subscribers</p>
        </div>
        <Button variant="outline" onClick={exportCSV}><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7FAFC] border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Email</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Subscribed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : subscriptions.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">No subscribers yet</td></tr>
            ) : subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{sub.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={sub.subscribed ? 'success' : 'outline'}>{sub.subscribed ? 'Active' : 'Unsubscribed'}</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
