'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, Dog, Calendar, Package, Image, FileText, 
  Star, Settings, Users, Mail, Shield, LogOut, ChevronLeft,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Dogs', href: '/admin/dogs', icon: Dog },
  { name: 'Packages', href: '/admin/packages', icon: Package },
  { name: 'Gallery', href: '/admin/gallery', icon: Image },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { name: 'Subscribers', href: '/admin/subscriptions', icon: Mail },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A365D] to-[#D69E2E] flex items-center justify-center">
              <span className="text-sm">🐺</span>
            </div>
            <div>
              <span className="text-sm font-bold text-[#1A365D]">The Husky</span>
              <span className="text-[10px] text-gray-500 block">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#1A365D] text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#1A365D]'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A365D] mb-3">
            <ChevronLeft className="h-4 w-4" /> View Website
          </Link>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
