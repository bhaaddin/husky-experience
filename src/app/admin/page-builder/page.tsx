'use client'

import { useState, useEffect } from 'react'
import { Plus, Save, Eye, Smartphone, Monitor, RotateCcw, Download, Upload, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PageBuilder, PageBlock, blockDefaultContent, BLOCK_TYPES } from '@/components/admin/PageBuilder'
import { cn } from '@/lib/utils'

const PAGE_TEMPLATES = {
  home: {
    name: 'Homepage',
    blocks: [
      { id: '1', type: 'hero', content: {}, order: 0 },
      { id: '2', type: 'feature-grid', content: {}, order: 1 },
      { id: '3', type: 'dog-showcase', content: {}, order: 2 },
      { id: '4', type: 'booking-cta', content: {}, order: 3 },
      { id: '5', type: 'social-feed', content: {}, order: 4 },
      { id: '6', type: 'testimonials', content: {}, order: 4 },
    ]
  },
  about: {
    name: 'About Page',
    blocks: [
      { id: '1', type: 'hero', content: { headline: 'Our Story', subhead: 'A journey of love and 14 huskies' }, order: 0 },
      { id: '2', type: 'text-block', content: { content: '<p>Our story began with one husky...</p>' }, order: 1 },
      { id: '3', type: 'dog-showcase', content: { title: 'Meet the Pack', displayCount: 14 }, order: 2 },
      { id: '4', type: 'behind-story', content: { title: 'Behind the Story' }, order: 3 },
    ]
  },
  services: {
    name: 'Services Page',
    blocks: [
      { id: '1', type: 'hero', content: { headline: 'Our Experiences', subhead: 'Choose your perfect adventure' }, order: 0 },
      { id: '2', type: 'feature-grid', content: { features: [
        { icon: 'paw', title: 'Puppy Play', description: '30 min with puppies' },
        { icon: 'snowflake', title: 'Arctic Adventure', description: '1 hour with full pack' },
        { icon: 'crown', title: 'Legacy Collection', description: '2 hour premium session' },
      ]}, order: 1 },
      { id: '3', type: 'booking-cta', content: {}, order: 2 },
    ]
  },
  contact: {
    name: 'Contact Page',
    blocks: [
      { id: '1', type: 'hero', content: { headline: 'Contact Us', subhead: 'We\'d love to hear from you' }, order: 0 },
      { id: '2', type: 'text-block', content: { content: '<p>Get in touch...</p>' }, order: 1 },
    ]
  },
}

export default function PageBuilderAdmin() {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'services' | 'contact'>('home')
  const [blocks, setBlocks] = useState<PageBlock[]>([])
  const [history, setHistory] = useState<PageBlock[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [autoSave, setAutoSave] = useState(true)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')

  useEffect(() => {
    const template = PAGE_TEMPLATES[activePage]
    const savedBlocks = localStorage.getItem(`page-blocks-${activePage}`)
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks))
    } else {
      setBlocks(template.blocks.map(b => ({ ...b, content: { ...b.content } })))
    }
    setHistory([])
    setHistoryIndex(-1)
  }, [activePage])

  useEffect(() => {
    if (autoSave && blocks.length > 0) {
      const timer = setTimeout(() => {
        saveToStorage(blocks)
        setLastSaved(new Date())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [blocks, autoSave])

  const saveToStorage = (newBlocks: PageBlock[]) => {
    localStorage.setItem(`page-blocks-${activePage}`, JSON.stringify(newBlocks))
  }

  const pushHistory = (newBlocks: PageBlock[]) => {
    setHistory(prev => prev.slice(0, historyIndex + 1).concat([newBlocks]))
    setHistoryIndex(prev => prev + 1)
  }

  const handleBlocksChange = (newBlocks: PageBlock[]) => {
    setBlocks(newBlocks)
    pushHistory(newBlocks)
    saveToStorage(newBlocks)
    setLastSaved(new Date())
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 500))
    saveToStorage(blocks)
    setLastSaved(new Date())
    setSaving(false)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      const newBlocks = history[newIndex]
      setBlocks(newBlocks)
      saveToStorage(newBlocks)
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      const newBlocks = history[newIndex]
      setBlocks(newBlocks)
      saveToStorage(newBlocks)
    }
  }

  const handleReset = () => {
    const template = PAGE_TEMPLATES[activePage]
    const newBlocks = template.blocks.map(b => ({ ...b, content: { ...b.content } }))
    setBlocks(newBlocks)
    saveToStorage(newBlocks)
    setHistory([])
    setHistoryIndex(-1)
  }

  const handleDuplicate = () => {
    const newBlocks = blocks.map((b, i) => ({ ...b, id: `${b.id}-copy-${Date.now()}`, order: i + blocks.length }))
    setBlocks([...blocks, ...newBlocks])
  }

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#1A202C]">Page Builder</h1>
            <Badge variant="outline" className="text-sm">{PAGE_TEMPLATES[activePage].name}</Badge>
            <span className="text-sm text-gray-500">|</span>
            <span className="text-sm text-gray-500">{blocks.length} blocks</span>
{lastSaved && (
                <Badge variant="outline" className="text-xs">
                  Saved {lastSaved.toLocaleTimeString()}
                </Badge>
              )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={autoSave} onChange={e => setAutoSave(e.target.checked)} className="rounded" />
              Auto-save
            </label>

            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={cn('p-2 rounded transition-colors', previewMode === 'desktop' ? 'bg-white shadow-sm' : 'text-gray-500')}
                title="Desktop"
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={cn('p-2 rounded transition-colors', previewMode === 'mobile' ? 'bg-white shadow-sm' : 'text-gray-500')}
                title="Mobile"
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            <Button variant="outline" size="sm" onClick={handleUndo} disabled={historyIndex <= 0} title="Undo">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleRedo} disabled={historyIndex >= history.length - 1} title="Redo">
              <RotateCcw className="h-4 w-4 transform rotate-180" />
            </Button>

            <Button variant="outline" size="sm" onClick={handleDuplicate} title="Duplicate Page">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} title="Reset to Template">
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={() => {}}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="gold" size="sm" onClick={() => {}}>
              <Upload className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Page Tabs */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-gray-200">
          <nav className="flex gap-1" role="tablist">
            {Object.entries(PAGE_TEMPLATES).map(([key, page]) => (
              <button
                key={key}
                role="tab"
                aria-selected={activePage === key}
                onClick={() => setActivePage(key as any)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  activePage === key
                    ? 'bg-[#1A365D] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {page.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Builder Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar - Block Library */}
        <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto p-4 hidden lg:block">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Add Block</h3>
          <div className="space-y-2">
            {BLOCK_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  const newBlock: PageBlock = {
                    id: `${type.id}-${Date.now()}`,
                    type: type.id,
                    content: { ...blockDefaultContent[type.id] },
                    order: blocks.length,
                  }
                  handleBlocksChange([...blocks, newBlock])
                }}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all text-left',
                  'border-gray-200 hover:border-[#1A365D] hover:bg-[#1A365D]/5'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center flex-shrink-0">
                    <type.icon className="h-5 w-5 text-[#1A365D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{type.name}</p>
                    <p className="text-xs text-gray-500 truncate">{type.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Templates</h4>
            <div className="space-y-2">
              {Object.entries(PAGE_TEMPLATES).map(([key, page]) => (
                <button
                  key={key}
                  onClick={() => {
                    if (confirm(`Replace current page with ${page.name} template?`)) {
                      const newBlocks = page.blocks.map(b => ({ ...b, content: { ...b.content } }))
                      handleBlocksChange(newBlocks)
                    }
                  }}
                  className={cn(
                    'w-full p-3 rounded-lg border transition-colors text-left',
                    activePage === key ? 'border-[#1A365D] bg-[#1A365D]/5' : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <p className="font-medium text-sm">{page.name}</p>
                  <p className="text-xs text-gray-500">{page.blocks.length} blocks</p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8" style={{ background: previewMode === 'mobile' ? '#fff' : '#f8fafc' }}>
          <div className={cn(
            'max-w-4xl mx-auto',
            previewMode === 'mobile' && 'w-[375px] shadow-2xl rounded-xl h-[667px] overflow-y-auto bg-white'
          )}>
            <PageBuilder
              initialBlocks={blocks}
              onSave={handleBlocksChange}
              onPreview={() => {}}
            />
          </div>
        </main>

        {/* Right Sidebar - Block Settings */}
        <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-4 hidden xl:block">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Block Settings</h3>
          <p className="text-sm text-gray-500">Click a block to edit its settings</p>
        </aside>
      </div>
    </div>
  )
}