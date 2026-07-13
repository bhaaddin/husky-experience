'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { 
  Bold, Italic, Underline, Strikethrough, Code, Heading1, Heading2, 
  List, ListOrdered, Quote, Link, Image, AlignLeft, AlignCenter, 
  AlignRight, Undo, Redo, X, Check, Plus, ChevronUp, ChevronDown, Trash2
} from 'lucide-react'

type ToolbarButton = 
  | { type: 'button'; id: string; icon: React.ElementType; title: string; shortcut?: string }
  | { type: 'divider' }

const TOOLBAR_BUTTONS: ToolbarButton[] = [
  { type: 'button', id: 'h1', icon: Heading1, title: 'Heading 1', shortcut: 'Ctrl+1' },
  { type: 'button', id: 'h2', icon: Heading2, title: 'Heading 2', shortcut: 'Ctrl+2' },
  { type: 'button', id: 'bold', icon: Bold, title: 'Bold', shortcut: 'Ctrl+B' },
  { type: 'button', id: 'italic', icon: Italic, title: 'Italic', shortcut: 'Ctrl+I' },
  { type: 'button', id: 'underline', icon: Underline, title: 'Underline', shortcut: 'Ctrl+U' },
  { type: 'button', id: 'strike', icon: Strikethrough, title: 'Strikethrough' },
  { type: 'button', id: 'code', icon: Code, title: 'Inline Code' },
  { type: 'divider' },
  { type: 'button', id: 'quote', icon: Quote, title: 'Quote', shortcut: 'Ctrl+Shift+Q' },
  { type: 'button', id: 'bullet', icon: List, title: 'Bullet List' },
  { type: 'button', id: 'ordered', icon: ListOrdered, title: 'Numbered List' },
  { type: 'divider' },
  { type: 'button', id: 'link', icon: Link, title: 'Add Link', shortcut: 'Ctrl+K' },
  { type: 'button', id: 'image', icon: Image, title: 'Add Image' },
  { type: 'divider' },
  { type: 'button', id: 'align-left', icon: AlignLeft, title: 'Align Left' },
  { type: 'button', id: 'align-center', icon: AlignCenter, title: 'Align Center' },
  { type: 'button', id: 'align-right', icon: AlignRight, title: 'Align Right' },
  { type: 'divider' },
  { type: 'button', id: 'undo', icon: Undo, title: 'Undo', shortcut: 'Ctrl+Z' },
  { type: 'button', id: 'redo', icon: Redo, title: 'Redo', shortcut: 'Ctrl+Shift+Z' },
]

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) {
  const [html, setHtml] = useState(content)
  const editorRef = useRef<HTMLDivElement>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkRange, setLinkRange] = useState<Range | null>(null)

  const format = (command: string, value?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    setHtml(editorRef.current?.innerHTML || '')
    onChange(editorRef.current?.innerHTML || '')
  }

  const handleLink = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      setLinkRange(range)
      setShowLinkInput(true)
      setTimeout(() => {
        const input = document.getElementById('link-input') as HTMLInputElement
        input?.focus()
      }, 0)
    }
  }

  const applyLink = () => {
    if (linkRange && linkUrl) {
      linkRange.deleteContents()
      const link = document.createElement('a')
      link.href = linkUrl
      link.textContent = linkRange.toString() || linkUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.className = 'text-[#1A365D] underline hover:text-[#D69E2E]'
      linkRange.insertNode(link)
      setLinkRange(null)
      setLinkUrl('')
      setShowLinkInput(false)
      format('default')
    }
  }

  const handleImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      format('insertImage', url)
    }
  }

  return (
    <div className="border border-gray-300 rounded-xl bg-white overflow-hidden">
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1">
        {TOOLBAR_BUTTONS.map((btn, index) => {
          if (btn.type === 'divider') {
            return <div key={`divider-${index}`} className="w-px h-6 bg-gray-200 mx-1" />
          }
          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => {
                if (btn.id === 'link') handleLink()
                else if (btn.id === 'image') handleImage()
                else format(btn.id.replace('-', ''), btn.id === 'h1' ? '<h1>' : btn.id === 'h2' ? '<h2>' : undefined)
              }}
              className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-600 hover:text-[#1A365D]"
              title={`${btn.title}${btn.shortcut ? ` (${btn.shortcut})` : ''}`}
            >
              <btn.icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {showLinkInput && linkRange && (
        <div className="border-b border-gray-200 p-2 bg-gray-50 flex gap-2">
          <input
            id="link-input"
            type="url"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A365D]/20 focus:border-[#1A365D]"
          />
          <Button size="sm" onClick={applyLink}><Check className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" onClick={() => { setShowLinkInput(false); setLinkRange(null) }}><X className="h-4 w-4" /></Button>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-4 prose prose-sm max-w-none focus:outline-none"
        style={{ minHeight: '200px' }}
        onInput={() => {
          setHtml(editorRef.current?.innerHTML || '')
          onChange(editorRef.current?.innerHTML || '')
        }}
        onBlur={() => onChange(editorRef.current?.innerHTML || '')}
        dangerouslySetInnerHTML={{ __html: html || '<p><br></p>' }}
        data-placeholder={placeholder}
      />

      <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
        <span>HTML: ~{html.length} chars</span>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={() => format('removeFormat')}>Clear Format</Button>
        </div>
      </div>

      <style jsx>{`
        [contentEditable="true"]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contentEditable="true"]:focus {
          outline: none;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }
        .prose a {
          color: #1A365D;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

interface ImageUploaderProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function ImageUploader({ value, onChange, label = 'Image' }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large (max 10MB)')
      return
    }
    const reader = new FileReader()
    reader.onload = e => {
      const dataUrl = e.target?.result as string
      setPreview(dataUrl)
      onChange(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
  }

  const clearImage = () => {
    setPreview(null)
    onChange('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      <input type="file" ref={fileInputRef} accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
      
      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-6 text-center transition-colors',
          dragging ? 'border-[#1A365D] bg-[#1A365D]/5' : 'border-gray-200 hover:border-gray-300',
          preview ? 'border-gray-300' : ''
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !preview && fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="relative max-w-xs mx-auto">
            <img src={preview} alt="Preview" className="max-h-48 rounded-lg shadow" />
            <button onClick={clearImage} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">✕</button>
          </div>
        ) : (
          <div className="space-y-2">
            <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">Drag & drop an image, or click to browse</p>
            <p className="text-xs text-gray-400">JPG, PNG, WebP up to 10MB</p>
          </div>
        )}
      </div>

      {value && !preview && (
        <p className="text-xs text-gray-500">Current: {value.substring(0, 50)}...</p>
      )}
    </div>
  )
}

interface MediaItem {
  id: number
  url: string
  type: 'image' | 'video'
  name: string
  size: number
  caption: string
}

interface MediaGalleryProps {
  value: MediaItem[]
  onChange: (value: MediaItem[] | ((prev: MediaItem[]) => MediaItem[])) => void
}

export function MediaGallery({ value, onChange }: MediaGalleryProps) {
  const [items, setItems] = useState<MediaItem[]>(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => setItems(value), [value])

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.size > 50 * 1024 * 1024) return
      const reader = new FileReader()
      reader.onload = e => {
        setItems((prev: MediaItem[]) => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target?.result as string,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          name: file.name,
          size: file.size,
          caption: '',
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const updateItem = (id: number, field: string, value: any) => {
    setItems((prev: MediaItem[]) => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
    onChange((prev: MediaItem[]) => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id: number) => {
    setItems((prev: MediaItem[]) => prev.filter(item => item.id !== id))
    onChange((prev: MediaItem[]) => prev.filter(item => item.id !== id))
  }

  const reorder = (fromIndex: number, toIndex: number) => {
    const newItems = [...items]
    const [removed] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, removed)
    setItems(newItems)
    onChange(newItems)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{items.length} media items</span>
        <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Plus className="h-4 w-4 mr-1" /> Add Media
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={e => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, index) => (
          <div key={item.id} className="relative group bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
            <div className="aspect-square relative">
              {item.type === 'video' ? (
                <video src={item.url} className="w-full h-full object-cover" muted />
              ) : (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => reorder(index, index - 1)} disabled={index === 0} className="p-1.5 bg-white/90 rounded hover:bg-white text-gray-700 disabled:opacity-50"><ChevronUp className="h-4 w-4" /></button>
                <button onClick={() => reorder(index, index + 1)} disabled={index === items.length - 1} className="p-1.5 bg-white/90 rounded hover:bg-white text-gray-700 disabled:opacity-50"><ChevronDown className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="p-3 space-y-2">
              <input
                type="text"
                value={item.caption}
                onChange={e => updateItem(item.id, 'caption', e.target.value)}
                placeholder="Caption (optional)"
                className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-[#1A365D]"
              />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{item.type}</span>
                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>No media added yet</p>
          <Button size="sm" className="mt-2" onClick={() => fileInputRef.current?.click()}>Add First Item</Button>
        </div>
      )}
    </div>
  )
}

interface RepeaterFieldProps {
  value: any[]
  onChange: (value: any[]) => void
  fields: { key: string; label: string; type: 'input' | 'textarea' | 'select'; options?: { value: string; label: string }[] }[]
}

export function RepeaterField({ value, onChange, fields }: RepeaterFieldProps) {
  const [items, setItems] = useState(value)

  useEffect(() => setItems(value), [value])

  const addItem = () => {
    const newItem: Record<string, any> = {}
    fields.forEach(f => newItem[f.key] = f.type === 'select' ? (f.options?.[0]?.value || '') : '')
    setItems([...items, newItem])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, key: string, val: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [key]: val }
    setItems(newItems)
    onChange(newItems)
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{items.length} items</span>
        <Button size="sm" variant="outline" onClick={addItem}><Plus className="h-4 w-4 mr-1" /> Add</Button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative group">
          <div className="absolute top-2 right-2">
            <Button size="sm" variant="ghost" onClick={() => removeItem(index)} className="opacity-0 group-hover:opacity-100 text-red-500"><Trash2 className="h-4 w-4" /></Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map(field => (
              <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <Textarea value={item[field.key] || ''} onChange={e => updateItem(index, field.key, e.target.value)} rows={3} className="text-sm" />
                ) : field.type === 'select' ? (
                  <select value={item[field.key] || ''} onChange={e => updateItem(index, field.key, e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#1A365D]">
                    {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                ) : (
                  <Input value={item[field.key] || ''} onChange={e => updateItem(index, field.key, e.target.value)} placeholder={field.label} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="text-center py-6 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>No items yet</p>
          <Button size="sm" className="mt-2" onClick={addItem}>Add First Item</Button>
        </div>
      )}
    </div>
  )
}