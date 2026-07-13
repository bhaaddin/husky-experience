'use client'

import { useState } from 'react'
import { Check, Calendar, User, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

const steps = [
  { id: 1, name: 'Select Package', icon: CreditCard },
  { id: 2, name: 'Choose Date', icon: Calendar },
  { id: 3, name: 'Your Details', icon: User },
  { id: 4, name: 'Confirm', icon: Check },
]

const packages = [
  { id: 'puppy-play', name: 'The Puppy Play', duration: '30 min', price: 149, icon: '🐾' },
  { id: 'arctic-adventure', name: 'The Arctic Adventure', duration: '1 hour', price: 349, icon: '❄️' },
  { id: 'legacy-collection', name: 'The Legacy Collection', duration: '2 hours', price: 599, icon: '👑' },
  { id: 'group-experience', name: 'Group Experience', duration: '2 hours', price: 899, icon: '👥' },
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', participants: '1', requirements: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pkg = packages.find(p => p.id === selectedPackage)

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    return dates
  }

  const handleSubmit = async () => {
    if (!pkg || !selectedDate || !selectedTime) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg.id,
          bookingDate: selectedDate,
          startTime: selectedTime,
          numParticipants: parseInt(formData.participants),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialRequirements: formData.requirements,
        }),
      })

      if (res.ok) {
        setStep(5) // Success
      }
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7FAFC] py-20">
        <div className="max-w-md w-full mx-auto text-center p-8">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#1A202C] mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your booking! We&apos;ve sent a confirmation email to {formData.email}. 
            We can&apos;t wait to meet you and the pack!
          </p>
          <Button onClick={() => { setStep(1); setSelectedPackage(null) }}>
            Book Another Session
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="relative py-32 bg-[#1A365D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D] to-[#2D5A8E] opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Book Your Experience</h1>
          <p className="text-xl text-white/80">Choose your adventure and reserve your spot</p>
        </div>
      </section>

      <section className="py-16 bg-[#F7FAFC] min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  step === s.id ? 'bg-[#1A365D] text-white' :
                  step > s.id ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <s.icon className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium hidden sm:inline">{s.name}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 ${
                    step > s.id ? 'bg-emerald-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1A202C] mb-6">Select Your Package</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {packages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPackage(p.id)}
                      className={`text-left p-6 rounded-2xl border-2 transition-all ${
                        selectedPackage === p.id
                          ? 'border-[#1A365D] bg-[#1A365D]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{p.icon}</span>
                      <h3 className="font-semibold text-[#1A202C] mt-2">{p.name}</h3>
                      <p className="text-sm text-gray-500">{p.duration}</p>
                      <p className="text-lg font-bold text-[#1A365D] mt-2">${p.price}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1A202C] mb-6">Choose Date & Time</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Available Dates</label>
                  <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                    {generateDates().slice(0, 14).map((date) => {
                      const d = new Date(date + 'T00:00:00')
                      return (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            selectedDate === date
                              ? 'bg-[#1A365D] text-white'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <p className="text-xs text-gray-500">{d.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                          <p className="font-semibold">{d.getDate()}</p>
                          <p className="text-xs text-gray-500">{d.toLocaleDateString('en-US', { month: 'short' })}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Available Times</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-xl font-medium transition-all ${
                            selectedTime === time
                              ? 'bg-[#1A365D] text-white'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1A202C] mb-6">Your Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Select
                    label="Number of Participants"
                    options={Array.from({ length: 10 }, (_, i) => ({
                      value: String(i + 1),
                      label: `${i + 1} ${i === 0 ? 'person' : 'people'}`,
                    }))}
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <Textarea
                    label="Special Requirements (optional)"
                    placeholder="Any allergies, accessibility needs, or special requests..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  />
                </div>
              </div>
            )}

            {step === 4 && pkg && (
              <div>
                <h2 className="text-2xl font-bold text-[#1A202C] mb-6">Confirm Your Booking</h2>
                <div className="bg-[#F7FAFC] rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Package</span>
                    <span className="font-semibold">{pkg.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Date</span>
                    <span className="font-semibold">{new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Time</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-semibold">{formData.participants}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Name</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold">{formData.email}</span>
                  </div>
                  <div className="flex justify-between py-3 text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-[#1A365D]">${pkg.price}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && step < 5 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              )}
              <div className="ml-auto">
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && !selectedPackage) ||
                      (step === 2 && (!selectedDate || !selectedTime)) ||
                      (step === 3 && (!formData.name || !formData.email || !formData.phone))
                    }
                  >
                    Next <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting} variant="gold" size="lg">
                    {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
