export interface User {
  id: string
  email: string
  name: string | null
  role: string
  emailVerified: boolean
  phone: string | null
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Dog {
  id: string
  name: string
  age: number
  breed: string
  personality: string | null
  funFact: string | null
  bio: string | null
  imageUrl: string | null
  imageAlt: string | null
  featured: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface Package {
  id: string
  name: string
  slug: string
  description: string | null
  durationMinutes: number
  priceCents: number
  depositPercentage: number
  maxParticipants: number
  featured: boolean
  includes: string[]
  requirements: string | null
  imageUrl: string | null
  displayOrder: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  bookingReference: string
  userId: string | null
  packageId: string
  bookingDate: Date
  startTime: Date
  endTime: Date
  numParticipants: number
  totalPriceCents: number
  depositPaidCents: number | null
  remainingCents: number | null
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded'
  specialRequirements: string | null
  paymentIntentId: string | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
  package?: Package
  user?: User
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  imageAlt: string | null
  authorId: string | null
  status: 'draft' | 'published' | 'archived'
  publishedAt: Date | null
  views: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
  author?: User
}

export interface GalleryImage {
  id: string
  title: string | null
  description: string | null
  imageUrl: string
  imageAlt: string | null
  category: string | null
  tags: string[]
  featured: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  clientName: string
  clientImage: string | null
  content: string
  rating: number
  approved: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Setting {
  id: string
  key: string
  value: Record<string, unknown>
  description: string | null
  updatedAt: Date
}

export interface Subscription {
  id: string
  email: string
  subscribed: boolean
  createdAt: Date
}

export interface ActivityLog {
  id: string
  userId: string | null
  action: string
  details: Record<string, unknown>
  ipAddress: string | null
  userAgent: string | null
  createdAt: Date
}

export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface TimeSlot {
  time: string
  available: boolean
  startTime: string
  endTime: string
}
