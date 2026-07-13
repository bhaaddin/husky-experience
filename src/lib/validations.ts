import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
})

export const bookingSchema = z.object({
  packageId: z.string().uuid('Invalid package'),
  bookingDate: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Time is required'),
  numParticipants: z.number().min(1).max(20),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  specialRequirements: z.string().optional(),
})

export const dogSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0).max(30),
  breed: z.string().default('Siberian Husky'),
  personality: z.string().optional(),
  funFact: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  imageAlt: z.string().optional(),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
})

export const packageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  durationMinutes: z.number().min(15, 'Minimum 15 minutes'),
  priceCents: z.number().min(0),
  depositPercentage: z.number().min(0).max(100).default(50),
  maxParticipants: z.number().min(1).max(50).default(4),
  featured: z.boolean().default(false),
  includes: z.array(z.string()).optional(),
  requirements: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
})

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().url().optional().or(z.literal('')),
  imageAlt: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  tags: z.array(z.string()).optional(),
})

export const galleryImageSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url('Valid image URL required'),
  imageAlt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
})

export const testimonialSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientImage: z.string().url().optional().or(z.literal('')),
  content: z.string().min(10, 'Review must be at least 10 characters'),
  rating: z.number().min(1).max(5),
  approved: z.boolean().default(false),
  featured: z.boolean().default(false),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.enum(['general', 'booking', 'partnership', 'press', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const settingsSchema = z.object({
  siteTitle: z.string().optional(),
  siteDescription: z.string().optional(),
  logo: z.string().url().optional().or(z.literal('')),
  favicon: z.string().url().optional().or(z.literal('')),
  contactEmail: z.string().email().optional().or(z.literal('')),
  businessPhone: z.string().optional(),
  businessAddress: z.string().optional(),
  businessHours: z.string().optional(),
  heroImage: z.string().url().optional().or(z.literal('')),
  heroVideo: z.string().url().optional().or(z.literal('')),
  socialInstagram: z.string().url().optional().or(z.literal('')),
  socialFacebook: z.string().url().optional().or(z.literal('')),
  socialTiktok: z.string().url().optional().or(z.literal('')),
  minAdvanceBookingHours: z.number().default(24),
  maxBookingWindowDays: z.number().default(90),
  cancellationPolicy: z.string().optional(),
  stripePublicKey: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})
