'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'general', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className="relative py-32 bg-[#1A365D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D] to-[#2D5A8E] opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-[#1A202C] mb-8">Get in Touch</h2>
              {status === 'success' ? (
                <div className="bg-emerald-50 rounded-2xl p-8 text-center">
                  <Check className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-emerald-800 mb-2">Message Sent!</h3>
                  <p className="text-emerald-600">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <Select
                    label="Subject"
                    options={[
                      { value: 'general', label: 'General Inquiry' },
                      { value: 'booking', label: 'Booking Question' },
                      { value: 'partnership', label: 'Partnership' },
                      { value: 'press', label: 'Press & Media' },
                      { value: 'other', label: 'Other' },
                    ]}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                  <Textarea label="Message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  <Button type="submit" disabled={status === 'loading'} size="lg">
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-[#F7FAFC] rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-semibold text-[#1A202C]">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-[#D69E2E] mt-1" />
                    <div>
                      <p className="font-medium text-[#1A202C]">(555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Sun 9am-6pm</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-[#D69E2E] mt-1" />
                    <div>
                      <p className="font-medium text-[#1A202C]">hello@thehuskyexperience.com</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-[#D69E2E] mt-1" />
                    <div>
                      <p className="font-medium text-[#1A202C]">123 Husky Lane</p>
                      <p className="text-sm text-gray-500">Arctic Valley, AK 99701</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-[#D69E2E] mt-1" />
                    <div>
                      <p className="font-medium text-[#1A202C]">Sessions Available</p>
                      <p className="text-sm text-gray-500">Tuesday - Sunday, 9am - 5pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-gray-200 h-64">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/images/map.jpg)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
