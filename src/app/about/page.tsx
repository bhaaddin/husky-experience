import { Metadata } from 'next'
import { Heart, Award, Users, Leaf } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Husky Experience - our story, our pack of 14 Siberian Huskies, and our commitment to ethical, unforgettable encounters.',
}

const dogs = [
  { name: 'Atlas', age: 5, personality: 'The Gentle Leader', funFact: 'Loves belly rolls and has heterochromia' },
  { name: 'Luna', age: 3, personality: 'The Playful Spirit', funFact: 'Can jump 6 feet high' },
  { name: 'Ghost', age: 7, personality: 'The Wise Elder', funFact: 'Knows over 15 commands' },
  { name: 'Nova', age: 2, personality: 'The Cuddle Bug', funFact: 'Will lean against you for hours' },
  { name: 'Storm', age: 4, personality: 'The Adventurer', funFact: 'Has hiked across 3 states' },
  { name: 'Winter', age: 1, personality: 'The Little Mischief', funFact: 'Stole everyone\'s heart' },
  { name: 'Koda', age: 6, personality: 'The Social Butterfly', funFact: 'Makes friends with every human' },
  { name: 'Sasha', age: 3, personality: 'The Drama Queen', funFact: 'Howls on command for treats' },
  { name: 'Bear', age: 8, personality: 'The Gentle Giant', funFact: 'Largest in the pack at 65 lbs' },
  { name: 'Maple', age: 2, personality: 'The Explorer', funFact: 'Always first to investigate new things' },
  { name: 'Zeus', age: 4, personality: 'The Protector', funFact: 'Self-appointed guardian of the pack' },
  { name: 'Yuki', age: 1, personality: 'The Snow Dancer', funFact: 'Loves rolling in fresh snow' },
  { name: 'Frost', age: 5, personality: 'The Zen Master', funFact: 'Most calm and patient of all' },
  { name: 'Sky', age: 3, personality: 'The Speed Demon', funFact: 'Fastest runner in the pack' },
]

const values = [
  { icon: Heart, title: 'Love First', description: 'Every dog is a beloved family member. Their happiness and wellbeing always come first.' },
  { icon: Award, title: 'Excellence', description: 'From our dog care to our photography, we never compromise on quality.' },
  { icon: Users, title: 'Community', description: 'Building a community of dog lovers who share our passion for these magnificent animals.' },
  { icon: Leaf, title: 'Ethical Practices', description: 'Spacious living areas, enrichment activities, and veterinary care — our dogs live their best lives.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative py-32 bg-[#1A365D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D] to-[#2D5A8E] opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A journey of love, passion, and 14 extraordinary Siberian Huskies
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#D69E2E] font-semibold text-sm tracking-wider uppercase mb-3">
                Our Journey
              </p>
              <h2 className="text-4xl font-bold text-[#1A202C] mb-6">
                It Started with One Husky
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  What began as a lifelong love for Siberian Huskies grew into something magical. 
                  When we adopted our first husky, Atlas, we discovered that these dogs don&apos;t just 
                  capture your heart — they transform your entire world.
                </p>
                <p>
                  Friends and family wanted to experience the joy of being around these majestic 
                  creatures. We realized that not everyone can have a husky, but everyone deserves 
                  to feel the connection these dogs offer.
                </p>
                <p>
                  Today, our pack has grown to 14 beautiful Siberian Huskies, each with their own 
                  unique personality. The Husky Experience was born from a simple idea: share the 
                  magic of these dogs with the world through professional photography and 
                  unforgettable encounters.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-gray-200 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/images/about-story.jpg)' }} />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#D69E2E] rounded-2xl p-6 text-white shadow-xl">
                <p className="text-3xl font-bold">8+</p>
                <p className="text-sm opacity-90">Years of Love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#D69E2E] font-semibold text-sm tracking-wider uppercase mb-3">
              Our Values
            </p>
            <h2 className="text-4xl font-bold text-[#1A202C]">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <value.icon className="h-12 w-12 text-[#D69E2E] mb-4" />
                <h3 className="text-xl font-semibold text-[#1A202C] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#D69E2E] font-semibold text-sm tracking-wider uppercase mb-3">
              The Pack
            </p>
            <h2 className="text-4xl font-bold text-[#1A202C] mb-4">Meet All 14 Huskies</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each of our Siberian Huskies has a unique personality and story. Get to know them all.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dogs.map((dog, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(/images/dogs/${dog.name.toLowerCase()}.jpg)` }} />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#1A202C]">{dog.name}</h3>
                      <p className="text-[#D69E2E] text-sm">{dog.personality}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{dog.age}y</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{dog.funFact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
