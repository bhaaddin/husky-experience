'use client'

import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

const categories = ['All', 'The Pack', 'Client Sessions', 'Behind the Scenes', 'Puppies']

const images = [
  { id: 1, src: '/images/gallery/1.jpg', alt: 'Husky running in snow', category: 'The Pack', featured: true },
  { id: 2, src: '/images/gallery/2.jpg', alt: 'Family with huskies', category: 'Client Sessions' },
  { id: 3, src: '/images/gallery/3.jpg', alt: 'Husky portrait', category: 'The Pack' },
  { id: 4, src: '/images/gallery/4.jpg', alt: 'Puppy playing', category: 'Puppies' },
  { id: 5, src: '/images/gallery/5.jpg', alt: 'Behind the scenes', category: 'Behind the Scenes' },
  { id: 6, src: '/images/gallery/6.jpg', alt: 'Couple with huskies', category: 'Client Sessions' },
  { id: 7, src: '/images/gallery/7.jpg', alt: 'Husky close up', category: 'The Pack' },
  { id: 8, src: '/images/gallery/8.jpg', alt: 'Kids with puppies', category: 'Client Sessions' },
  { id: 9, src: '/images/gallery/9.jpg', alt: 'Pack running', category: 'The Pack' },
  { id: 10, src: '/images/gallery/10.jpg', alt: 'Photographer at work', category: 'Behind the Scenes' },
  { id: 11, src: '/images/gallery/11.jpg', alt: 'Sleeping puppies', category: 'Puppies' },
  { id: 12, src: '/images/gallery/12.jpg', alt: 'Husky in field', category: 'The Pack' },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxImage, setLightboxImage] = useState<typeof images[0] | null>(null)

  const filtered = selectedCategory === 'All'
    ? images
    : images.filter((img) => img.category === selectedCategory)

  return (
    <>
      <section className="relative py-32 bg-[#1A365D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D] to-[#2D5A8E] opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A glimpse into the magic of The Husky Experience
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A365D] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => setLightboxImage(image)}
              >
                <div className="aspect-square bg-gray-200">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${image.src})` }}
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                  <p className="text-white/70 text-xs">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-4xl w-full">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${lightboxImage.src})` }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-medium">{lightboxImage.alt}</p>
              <p className="text-white/60 text-sm">{lightboxImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
