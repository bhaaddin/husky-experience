'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    rating: 5,
    content: 'This was the most magical experience! The huskies were so gentle and loving. Our family photos turned out absolutely stunning. We\'re already planning our next visit!',
    image: '/images/testimonials/sarah.jpg',
    session: 'Arctic Adventure',
  },
  {
    name: 'James & Emily Chen',
    rating: 5,
    content: 'We wanted something unique for our engagement photos and this exceeded all expectations. The photographers captured moments we\'ll treasure forever.',
    image: '/images/testimonials/james-emily.jpg',
    session: 'Legacy Collection',
  },
  {
    name: 'The Rodriguez Family',
    rating: 5,
    content: 'Our kids were in heaven! The puppies were so playful and the staff made sure everyone was safe and comfortable. Best family outing ever!',
    image: '/images/testimonials/rodriguez.jpg',
    session: 'Puppy Play Session',
  },
  {
    name: 'Michael Torres',
    rating: 5,
    content: 'As a professional photographer myself, I was blown away by the quality of both the experience and the photos. Atlas and Luna stole my heart!',
    image: '/images/testimonials/michael.jpg',
    session: 'Arctic Adventure',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#D69E2E] font-semibold text-sm tracking-wider uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-6">
            What Our Guests Say
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg relative">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-[#D69E2E]/20" />
            
            <div className="relative z-10">
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#D69E2E] text-[#D69E2E]" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-8 italic">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${testimonials[currentIndex].image})` }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#1A202C]">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-[#D69E2E]">{testimonials[currentIndex].session}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#1A365D] hover:bg-[#1A365D] hover:text-white transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex ? 'bg-[#1A365D] w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#1A365D] hover:bg-[#1A365D] hover:text-white transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
