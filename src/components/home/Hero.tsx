'use client'

import Link from 'next/link'
import { ArrowDown, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1A365D]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url(/images/hero-husky.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D]/90 via-[#1A365D]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D] via-transparent to-transparent opacity-60" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#D69E2E] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Now Booking Spring 2026 Sessions
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Create{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D69E2E] to-[#E8B84B]">
              Lifelong Memories
            </span>{' '}
            with Our Pack of 14 Siberian Huskies
          </h1>

          <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">
            Professional photography sessions where you can interact with and have your 
            photos taken alongside these majestic dogs. More than just photos — it's an 
            experience you'll never forget.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="xl" variant="gold">
              <Link href="/booking">Book Your Experience</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-[#1A365D]">
              <Link href="/about">
                <Play className="h-5 w-5 mr-2" />
                Meet Our Pack
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md">
            <div>
              <p className="text-3xl font-bold text-[#D69E2E]">14</p>
              <p className="text-sm text-white/70">Unique Huskies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#D69E2E]">500+</p>
              <p className="text-sm text-white/70">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#D69E2E]">5.0</p>
              <p className="text-sm text-white/70">Star Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white/50" />
      </div>
    </section>
  )
}
