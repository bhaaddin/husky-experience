import Link from 'next/link'
import { Button } from '@/components/ui/button'

const highlights = [
  {
    title: 'The Puppy Play Session',
    description: 'Meet our adorable husky puppies and capture their playful energy in candid shots. Perfect for families and dog lovers of all ages.',
    image: '/images/highlight-puppies.jpg',
    cta: 'Learn More',
    href: '/services#puppy-play',
    reversed: false,
  },
  {
    title: 'The Arctic Adventure',
    description: 'A full hour with our pack in our beautiful outdoor setting. Watch them run, play, and interact in their natural element while our photographers capture every moment.',
    image: '/images/highlight-arctic.jpg',
    cta: 'View Packages',
    href: '/services#arctic-adventure',
    reversed: true,
  },
  {
    title: 'The Legacy Collection',
    description: 'Our premium experience includes extended time with the pack, professional prints, and a private session tailored to your vision. Create heirloom-quality memories.',
    image: '/images/highlight-legacy.jpg',
    cta: 'Book Premium',
    href: '/services#legacy-collection',
    reversed: false,
  },
]

export function ExperienceHighlights() {
  return (
    <section className="py-24 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#D69E2E] font-semibold text-sm tracking-wider uppercase mb-3">
            Our Experiences
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-6">
            Choose Your Adventure
          </h2>
        </div>

        <div className="space-y-24">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                highlight.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-12 items-center`}
            >
              <div className="flex-1 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                  <div
                    className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${highlight.image})` }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gradient-to-br from-[#D69E2E] to-[#E8B84B] opacity-20" />
              </div>

              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-6">
                  {highlight.title}
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {highlight.description}
                </p>
                <Button asChild size="lg">
                  <Link href={highlight.href}>{highlight.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
