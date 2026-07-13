import { Heart, Camera, Sparkles, Shield } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: '14 Unique Personalities',
    description: 'Each of our Siberian Huskies has their own distinct personality, from playful puppies to gentle elders. Meet them all and find your favorite.',
  },
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'Our expert photographers capture the magic of your interaction with our pack. Every session includes professionally edited digital photos.',
  },
  {
    icon: Sparkles,
    title: 'Unforgettable Experience',
    description: 'This is more than just a photo shoot. It\'s a chance to play, cuddle, and create memories with these beautiful dogs in a natural setting.',
  },
  {
    icon: Shield,
    title: 'Safe & Ethical',
    description: 'Our dogs are family. They live in spacious, loving environments and are never stressed. Your safety and their wellbeing are our top priorities.',
  },
]

export function ValueProps() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#D69E2E] font-semibold text-sm tracking-wider uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-6">
            More Than Just Photos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We create immersive experiences that connect you with nature's most beautiful creatures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-[#F7FAFC] to-white border border-gray-100 hover:border-[#D69E2E]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1A365D] to-[#2D5A8E] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <value.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A202C] mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
