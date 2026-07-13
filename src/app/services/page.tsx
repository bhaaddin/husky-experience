import { Metadata } from 'next'
import Link from 'next/link'
import { Check, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: 'Explore our photography session packages — from quick puppy play sessions to premium legacy collections.',
}

const packages = [
  {
    id: 'puppy-play',
    name: 'The Puppy Play',
    duration: '30 min',
    price: 149,
    description: 'A quick, joyful meet & greet with our adorable husky puppies. Perfect for a fun introduction.',
    includes: ['30-minute session', '5 professionally edited digital photos', 'Meet 2-3 puppies', 'Print release included'],
    featured: false,
    icon: '🐾',
  },
  {
    id: 'arctic-adventure',
    name: 'The Arctic Adventure',
    duration: '1 hour',
    price: 349,
    description: 'Our most popular experience. A full hour with the pack in our stunning outdoor setting.',
    includes: ['60-minute session', '20 professionally edited digital photos', 'Access to full pack', 'Multiple locations', 'Print release included', 'Online gallery'],
    featured: true,
    icon: '❄️',
  },
  {
    id: 'legacy-collection',
    name: 'The Legacy Collection',
    duration: '2 hours',
    price: 599,
    description: 'Our premium experience. Extended time, exclusive access, and heirloom-quality prints.',
    includes: ['120-minute session', '50 professionally edited digital photos', 'Private session with entire pack', '5 printed 8x10 photos', 'Custom photo album', 'Video highlights reel', 'Online gallery with unlimited downloads'],
    featured: false,
    icon: '👑',
  },
  {
    id: 'group-experience',
    name: 'Group Experience',
    duration: '2 hours',
    price: 899,
    description: 'Corporate team-building, family reunions, or group celebrations with our huskies.',
    includes: ['120-minute session', '30 professionally edited digital photos per person', 'Up to 20 participants', 'Dedicated handler', 'Team photo session', 'Print release included'],
    featured: false,
    icon: '👥',
  },
]

const addons = [
  { name: 'Extra Digital Photos (10)', price: 75 },
  { name: 'Canvas Print (16x20)', price: 120 },
  { name: 'Photo Album (20 pages)', price: 250 },
  { name: 'Video Highlights Reel', price: 150 },
  { name: 'Rush Editing (24 hours)', price: 100 },
]

const faqs = [
  { q: 'What should I wear?', a: 'Wear comfortable, weather-appropriate clothing in solid colors. Avoid busy patterns that distract from the dogs. Layers are great for outdoor sessions.' },
  { q: 'Are the dogs safe?', a: 'Absolutely. All our huskies are well-trained, socialized, and supervised by professional handlers at all times. Your safety is our top priority.' },
  { q: 'What if it rains?', a: 'Light rain sessions are magical! For severe weather, we offer free rescheduling up to 24 hours before your session.' },
  { q: 'Can I bring my own dog?', a: 'For safety reasons, we cannot accommodate outside dogs during sessions. Our pack dynamic is carefully maintained.' },
  { q: 'How do I receive my photos?', a: 'Photos are delivered via a private online gallery within 7-10 business days. You can download, share, and print them.' },
  { q: 'What is your cancellation policy?', a: 'Full refund if cancelled 48+ hours before. 50% refund for 24-48 hours. No refund for less than 24 hours. Rescheduling is always free.' },
]

export default function ServicesPage() {
  return (
    <>
      <section className="relative py-32 bg-[#1A365D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D] to-[#2D5A8E] opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Services & Pricing</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Choose the perfect experience for you and our pack
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F7FAFC]" id="packages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                id={pkg.id}
                className={`relative bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  pkg.featured
                    ? 'ring-2 ring-[#D69E2E] shadow-xl scale-[1.02]'
                    : 'shadow-md hover:shadow-xl'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D69E2E] to-[#E8B84B] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-4xl mb-4">{pkg.icon}</div>
                <h3 className="text-xl font-bold text-[#1A202C] mb-2">{pkg.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4" />
                  <span>{pkg.duration}</span>
                </div>
                <p className="text-gray-600 text-sm mb-6">{pkg.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#1A365D]">${pkg.price}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-[#D69E2E] mt-0.5 shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full ${pkg.featured ? '' : 'variant-outline'}`} variant={pkg.featured ? 'default' : 'outline'}>
                  <Link href={`/booking?package=${pkg.id}`}>Book Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-8 text-center">Add-Ons</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#F7FAFC] rounded-xl">
                <span className="text-sm font-medium text-[#1A202C]">{addon.name}</span>
                <span className="text-sm font-bold text-[#D69E2E]">${addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FFF8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl p-6 shadow-sm group">
                <summary className="font-semibold text-[#1A202C] cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-[#D69E2E] group-open:rotate-45 transition-transform text-2xl">+</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
