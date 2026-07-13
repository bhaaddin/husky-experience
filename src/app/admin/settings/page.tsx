'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, CreditCard, Mail, Share2, Shield, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const tabs = [
  { id: 'general', name: 'General', icon: Globe },
  { id: 'booking', name: 'Booking', icon: CreditCard },
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'social', name: 'Social Media', icon: Share2 },
  { id: 'seo', name: 'SEO', icon: Search },
  { id: 'security', name: 'Security', icon: Shield },
]

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => { setSettings(data.data || {}); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
    } finally { setSaving(false) }
  }

  const updateSetting = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A202C]">Settings</h1>
          <p className="text-gray-500 mt-1">Configure your website</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="flex gap-8">
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-[#1A365D] text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" /> {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-200">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A202C] mb-4">General Settings</h2>
              <Input label="Site Title" value={settings.siteTitle || ''} onChange={(e) => updateSetting('siteTitle', e.target.value)} />
              <Textarea label="Site Description" value={settings.siteDescription || ''} onChange={(e) => updateSetting('siteDescription', e.target.value)} />
              <Input label="Logo URL" value={settings.logo || ''} onChange={(e) => updateSetting('logo', e.target.value)} />
              <Input label="Favicon URL" value={settings.favicon || ''} onChange={(e) => updateSetting('favicon', e.target.value)} />
              <Input label="Contact Email" value={settings.contactEmail || ''} onChange={(e) => updateSetting('contactEmail', e.target.value)} />
              <Input label="Business Phone" value={settings.businessPhone || ''} onChange={(e) => updateSetting('businessPhone', e.target.value)} />
              <Textarea label="Business Address" value={settings.businessAddress || ''} onChange={(e) => updateSetting('businessAddress', e.target.value)} />
              <Textarea label="Business Hours" value={settings.businessHours || ''} onChange={(e) => updateSetting('businessHours', e.target.value)} />
              <Input label="Hero Image URL" value={settings.heroImage || ''} onChange={(e) => updateSetting('heroImage', e.target.value)} />
              <Input label="Hero Video URL" value={settings.heroVideo || ''} onChange={(e) => updateSetting('heroVideo', e.target.value)} />
            </div>
          )}

          {activeTab === 'booking' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A202C] mb-4">Booking Settings</h2>
              <Input label="Minimum Advance Booking (hours)" type="number" value={settings.minAdvanceBookingHours || 24} onChange={(e) => updateSetting('minAdvanceBookingHours', parseInt(e.target.value))} />
              <Input label="Maximum Booking Window (days)" type="number" value={settings.maxBookingWindowDays || 90} onChange={(e) => updateSetting('maxBookingWindowDays', parseInt(e.target.value))} />
              <Textarea label="Cancellation Policy" value={settings.cancellationPolicy || ''} onChange={(e) => updateSetting('cancellationPolicy', e.target.value)} />
              <Input label="Stripe Public Key" value={settings.stripePublicKey || ''} onChange={(e) => updateSetting('stripePublicKey', e.target.value)} />
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A202C] mb-4">Email Settings</h2>
              <p className="text-sm text-gray-500">Email settings are configured via environment variables (SENDGRID_API_KEY, SENDGRID_FROM_EMAIL).</p>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A202C] mb-4">Social Media</h2>
              <Input label="Instagram URL" value={settings.socialInstagram || ''} onChange={(e) => updateSetting('socialInstagram', e.target.value)} />
              <Input label="Facebook URL" value={settings.socialFacebook || ''} onChange={(e) => updateSetting('socialFacebook', e.target.value)} />
              <Input label="TikTok URL" value={settings.socialTiktok || ''} onChange={(e) => updateSetting('socialTiktok', e.target.value)} />
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A202C] mb-4">SEO Settings</h2>
              <Input label="Default Meta Title" value={settings.metaTitle || ''} onChange={(e) => updateSetting('metaTitle', e.target.value)} />
              <Textarea label="Default Meta Description" value={settings.metaDescription || ''} onChange={(e) => updateSetting('metaDescription', e.target.value)} />
              <Input label="Google Analytics ID" value={settings.googleAnalyticsId || ''} onChange={(e) => updateSetting('googleAnalyticsId', e.target.value)} />
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A202C] mb-4">Security Settings</h2>
              <p className="text-sm text-gray-500">Security settings are managed via environment variables and NextAuth.js configuration.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
