'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const featuredDogs = [
  { name: 'Atlas', age: 5, personality: 'The Gentle Leader', image: '/images/dogs/atlas.jpg', funFact: 'Loves belly rolls and has heterochromia (one blue eye, one brown)' },
  { name: 'Luna', age: 3, personality: 'The Playful Spirit', image: '/images/dogs/luna.jpg', funFact: 'Can jump 6 feet high and loves snow' },
  { name: 'Ghost', age: 7, personality: 'The Wise Elder', image: '/images/dogs/ghost.jpg', funFact: 'Oldest of the pack and knows over 15 commands' },
  { name: 'Nova', age: 2, personality: 'The Cuddle Bug', image: '/images/dogs/nova.jpg', funFact: 'Will lean against you for hours if you let her' },
  { name: 'Storm', age: 4, personality: 'The Adventurer', image: '/images/dogs/storm.jpg', funFact: 'Has been on hiking trails across 3 states' },
  { name: 'Winter', age: 1, personality: 'The Little Mischief', image: '/images/dogs/winter.jpg', funFact: 'Newest puppy who stole everyone\'s heart' },
]

export function FeaturedDogs() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCount = 3

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredDogs.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredDogs.length) % featuredDogs.length)
  }

  const visibleDogs = []
  for (let i = 0; i < visibleCount; i++) {
    visibleDogs.push(featuredDogs[(currentIndex + i) % featuredDogs.length])
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-[#D69E2E] font-semibold text-sm tracking-wider uppercase mb-3">
              Our Pack
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C]">
              Meet the Stars
            </h2>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#1A365D] hover:bg-[#1A365D] hover:text-white transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#1A365D] hover:bg-[#1A365D] hover:text-white transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleDogs.map((dog, index) => (
            <div
              key={`${dog.name}-${currentIndex}-${index}`}
              className="group relative rounded-2xl overflow-hidden bg-gray-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${dog.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white/90 text-sm">{dog.funFact}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A202C]">{dog.name}</h3>
                    <p className="text-[#D69E2E] text-sm font-medium">{dog.personality}</p>
                  </div>
                  <span className="text-sm text-gray-500">{dog.age} {dog.age === 1 ? 'year' : 'years'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Meet All 14 Huskies</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
