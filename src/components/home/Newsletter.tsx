'use client'

import { useState } from 'react'
import { Send, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#1A365D] to-[#2D5A8E] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            🐺
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Join the Pack
        </h2>
        <p className="text-xl text-white/80 mb-10">
          Subscribe for exclusive offers, adorable updates, and be the first to know about 
          new sessions and special events.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 text-white">
            <Check className="h-6 w-6 text-[#D69E2E]" />
            <p className="text-lg">Welcome to the pack! Check your email for a special surprise.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-[#D69E2E]"
            />
            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                'Subscribing...'
              ) : (
                <>
                  Subscribe
                  <Send className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        )}

        <p className="text-sm text-white/50 mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
