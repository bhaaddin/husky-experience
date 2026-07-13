'use client'

import { Calendar, DollarSign, Users, TrendingUp, ArrowUpRight, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: 'Total Bookings', value: '127', change: '+12%', icon: Calendar, color: 'bg-blue-500' },
  { label: 'Revenue (Month)', value: '$18,450', change: '+8%', icon: DollarSign, color: 'bg-emerald-500' },
  { label: 'Active Subscribers', value: '842', change: '+15%', icon: Users, color: 'bg-purple-500' },
  { label: 'Conversion Rate', value: '4.2%', change: '+0.3%', icon: TrendingUp, color: 'bg-amber-500' },
]

const recentBookings = [
  { ref: 'HE-AX7K2M9P', name: 'Sarah Mitchell', package: 'Arctic Adventure', date: '2026-07-15', status: 'confirmed', amount: '$349' },
  { ref: 'HE-BT3N5R1W', name: 'James Chen', package: 'Legacy Collection', date: '2026-07-18', status: 'pending', amount: '$599' },
  { ref: 'HE-CV8P2K4L', name: 'Emily Davis', package: 'Puppy Play', date: '2026-07-20', status: 'confirmed', amount: '$149' },
  { ref: 'HE-DM5Q9T7X', name: 'The Rodriguez Family', package: 'Group Experience', date: '2026-07-22', status: 'pending', amount: '$899' },
  { ref: 'HE-EN1R6V3Y', name: 'Michael Torres', package: 'Arctic Adventure', date: '2026-07-25', status: 'confirmed', amount: '$349' },
]

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'outline'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'danger',
  completed: 'outline',
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A202C]">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#1A202C]">{stat.value}</p>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" /> {stat.change} this month
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.ref} className="flex items-center justify-between p-4 bg-[#F7FAFC] rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#1A365D]/10 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-[#1A365D]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1A202C]">{booking.name}</p>
                        <p className="text-sm text-gray-500">{booking.package} · {booking.ref}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#1A202C]">{booking.amount}</p>
                      <Badge variant={statusColors[booking.status]}>{booking.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a href="/admin/bookings" className="block p-3 bg-[#F7FAFC] rounded-xl hover:bg-[#1A365D]/5 transition-colors">
                <p className="font-medium text-[#1A202C] text-sm">View All Bookings</p>
                <p className="text-xs text-gray-500">Manage reservations</p>
              </a>
              <a href="/admin/dogs/new" className="block p-3 bg-[#F7FAFC] rounded-xl hover:bg-[#1A365D]/5 transition-colors">
                <p className="font-medium text-[#1A202C] text-sm">Add New Dog</p>
                <p className="text-xs text-gray-500">Create a new husky profile</p>
              </a>
              <a href="/admin/gallery" className="block p-3 bg-[#F7FAFC] rounded-xl hover:bg-[#1A365D]/5 transition-colors">
                <p className="font-medium text-[#1A202C] text-sm">Upload Photos</p>
                <p className="text-xs text-gray-500">Add to the gallery</p>
              </a>
              <a href="/admin/blog/new" className="block p-3 bg-[#F7FAFC] rounded-xl hover:bg-[#1A365D]/5 transition-colors">
                <p className="font-medium text-[#1A202C] text-sm">Write Blog Post</p>
                <p className="text-xs text-gray-500">Share stories & tips</p>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: '10:00 AM', name: 'Sarah Mitchell', type: 'Arctic Adventure' },
                { time: '2:00 PM', name: 'Chen Family', type: 'Puppy Play' },
                { time: '4:00 PM', name: 'Michael Torres', type: 'Arctic Adventure' },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-[#F7FAFC] rounded-xl">
                  <Clock className="h-4 w-4 text-[#D69E2E]" />
                  <div>
                    <p className="text-sm font-medium text-[#1A202C]">{event.name}</p>
                    <p className="text-xs text-gray-500">{event.time} · {event.type}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
