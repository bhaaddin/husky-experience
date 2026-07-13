'use client'

import { useState, useEffect } from 'react'
import { Shield, UserCheck, UserX } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => { setUsers(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const roleColors: Record<string, 'default' | 'warning' | 'success' | 'outline'> = {
    admin: 'default', editor: 'warning', user: 'outline',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A202C]">Users</h1>
        <p className="text-gray-500 mt-1">Manage registered users</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7FAFC] border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">User</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Role</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Phone</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">No users yet</td></tr>
            ) : users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-[#1A202C]">{user.name || 'No name'}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4"><Badge variant={roleColors[user.role]}>{user.role}</Badge></td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.phone || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
