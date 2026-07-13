'use client'

import { useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  GripVertical, Trash2, Eye, Edit, Plus, ChevronUp, ChevronDown, 
  Layout, Image, Video, Users, Calendar, MessageSquare, Star, 
  Save, Smartphone, Monitor, ArrowUpDown, Move
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Block Types
export const BLOCK_TYPES = [
  { id: 'hero', name: 'Hero Section', icon: Layout, description: 'Full-width hero with background, headline, CTA' },
  { id: 'feature-grid', name: 'Feature Grid', icon: Layout, description: '3-4 column feature cards' },
  { id: 'dog-showcase', name: 'Dog Showcase', icon: Users, description: 'Carousel of featured dogs' },
  { id: 'booking-cta', name: 'Booking CTA', icon: Calendar, description: 'Call-to-action for booking' },
  { id: 'social-feed', name: 'Social Feed', icon: MessageSquare, description: 'Instagram feed display' },
  { id: 'testimonials', name: 'Testimonials', icon: Star, description: 'Client reviews carousel' },
  { id: 'image-block', name: 'Image Block', icon: Image, description: 'Single image with caption' },
  { id: 'video-block', name: 'Video Block', icon: Video, description: 'Embedded video player' },
  { id: 'text-block', name: 'Text Block', icon: MessageSquare, description: 'Rich text content' },
  { id: 'behind-story', name: 'Behind the Story', icon: Video, description: 'Story with media gallery' },
]

export interface PageBlock {
  id: string
  type: string
  content: Record<string, any>
  order: number
}

interface PageBuilderProps {
  initialBlocks?: PageBlock[]
  onSave: (blocks: PageBlock[]) => void
  onPreview: (blocks: PageBlock[]) => void
}

export const blockDefaultContent: Record<string, Record<string, any>> = {
  hero: {
    headline: 'Create Lifelong Memories with Our Pack',
    subhead: 'Professional Photography Sessions with 14 Siberian Huskies',
    ctaText: 'Book Your Experience',
    ctaLink: '/booking',
    backgroundImage: '/images/hero-husky.jpg',
    backgroundVideo: '',
    overlayOpacity: 0.6,
  },
  'feature-grid': {
    features: [
      { icon: 'heart', title: '14 Unique Personalities', description: 'Each husky has their own story' },
      { icon: 'camera', title: 'Professional Photography', description: 'High-quality memories to keep forever' },
      { icon: 'sparkles', title: 'Unforgettable Experience', description: 'More than just photos - it\'s an adventure' },
      { icon: 'shield', title: 'Safe & Ethical', description: 'Our dogs are family first' },
    ],
  },
  'dog-showcase': {
    title: 'Meet Our Pack',
    subtitle: 'Get to know our 14 beautiful huskies',
    displayCount: 4,
    layout: 'carousel',
  },
  'booking-cta': {
    title: 'Ready for Your Adventure?',
    subtitle: 'Book your session today and create memories that last a lifetime.',
    buttonText: 'Book Now',
    buttonLink: '/booking',
    backgroundImage: '/images/cta-background.jpg',
  },
  'social-feed': {
    title: 'Follow Our Journey',
    subtitle: 'Latest moments from our pack',
    instagramHandle: 'husky_experience',
    postsToShow: 12,
    layout: 'masonry',
  },
  testimonials: {
    title: 'What Our Guests Say',
    subtitle: 'Real experiences from real people',
    layout: 'carousel',
    autoPlay: true,
  },
  'image-block': {
    image: '/images/sample.jpg',
    alt: 'Image description',
    caption: '',
    link: '',
  },
  'video-block': {
    videoUrl: '',
    poster: '/images/video-poster.jpg',
    title: '',
    description: '',
  },
  'text-block': {
    content: '<p>Start writing your content here...</p>',
    alignment: 'center',
  },
  'behind-story': {
    title: 'Behind the Story',
    subtitle: 'The moments that matter',
    storyContent: '<p>Tell the story behind the session...</p>',
    media: [],
    relatedDog: '',
    tags: [],
  },
}

function SortableBlock({ block, index, onEdit, onDelete, onMoveUp, onMoveDown, onDuplicate }: { 
  block: PageBlock
  index: number
  onEdit: () => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDuplicate: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const typeInfo = BLOCK_TYPES.find(b => b.id === block.type) || BLOCK_TYPES[0]

  return (
    <div ref={setNodeRef} style={style} className={cn('group relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all hover:border-[#1A365D]/30 hover:shadow-lg', isDragging && 'shadow-xl ring-2 ring-[#1A365D]/20')}>
      <div className="absolute top-3 right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <button onClick={onMoveUp} disabled={index === 0} className="p-1.5 rounded-lg bg-white/90 hover:bg-[#1A365D] hover:text-white transition-colors" aria-label="Move up"><ChevronUp className="h-4 w-4" /></button>
        <button onClick={onMoveDown} disabled={index === 999} className="p-1.5 rounded-lg bg-white/90 hover:bg-[#1A365D] hover:text-white transition-colors" aria-label="Move down"><ChevronDown className="h-4 w-4" /></button>
      </div>
      
      <div {...attributes} {...listeners} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1A365D] cursor-grab active:cursor-grabbing">
        <GripVertical className="h-6 w-6" />
      </div>

      <div className="p-5 pl-14">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#1A365D]/10 flex items-center justify-center flex-shrink-0">
              <typeInfo.icon className="h-6 w-6 text-[#1A365D]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C] truncate">{typeInfo.name}</h3>
              <p className="text-xs text-gray-500 truncate max-w-xs">{typeInfo.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">{block.type}</Badge>
                <Badge variant={block.content.published ? 'success' : 'warning'} className="text-xs">
                  {block.content.published ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={onEdit} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#1A365D] transition-colors" aria-label="Edit"><Edit className="h-4 w-4" /></button>
            <button onClick={onDuplicate} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#1A365D] transition-colors" aria-label="Duplicate"><Plus className="h-4 w-4" /></button>
            <button onClick={onDelete} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {Object.entries(block.content).slice(0, 4).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider">{key}</span>
                <span className="text-gray-700 truncate">{typeof value === 'string' ? value.substring(0, 50) : Array.isArray(value) ? `${value.length} items` : JSON.stringify(value).substring(0, 50)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PageBuilder({ initialBlocks = [], onSave, onPreview }: PageBuilderProps) {
  const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks.length > 0 ? initialBlocks : [
    { id: '1', type: 'hero', content: { ...blockDefaultContent.hero, published: true }, order: 0 },
    { id: '2', type: 'feature-grid', content: { ...blockDefaultContent['feature-grid'], published: true }, order: 1 },
    { id: '3', type: 'dog-showcase', content: { ...blockDefaultContent['dog-showcase'], published: true }, order: 2 },
    { id: '4', type: 'social-feed', content: { ...blockDefaultContent['social-feed'], published: true }, order: 3 },
    { id: '5', type: 'testimonials', content: { ...blockDefaultContent.testimonials, published: true }, order: 4 },
  ])
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [dirty, setDirty] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setBlocks(items => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        const newItems = [...items]
        const [removed] = newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, removed)
        return newItems.map((item, index) => ({ ...item, order: index }))
      })
      setDirty(true)
    }
  }

  const addBlock = (type: string) => {
    const newBlock: PageBlock = {
      id: `${Date.now()}`,
      type,
      content: { ...blockDefaultContent[type], published: false },
      order: blocks.length,
    }
    setBlocks([...blocks, newBlock])
    setShowAddPanel(false)
    setDirty(true)
  }

  const updateBlock = (id: string, content: Record<string, any>) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: { ...b.content, ...content } } : b))
    setDirty(true)
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id).map((b, i) => ({ ...b, order: i })))
    setDirty(true)
  }

  const duplicateBlock = (id: string) => {
    const block = blocks.find(b => b.id === id)
    if (!block) return
    const newBlock: PageBlock = {
      id: `${Date.now()}`,
      type: block.type,
      content: { ...block.content, published: false },
      order: blocks.length,
    }
    setBlocks([...blocks, newBlock])
    setDirty(true)
  }

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === id)
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= blocks.length) return
    
    const newBlocks = [...blocks]
    const [removed] = newBlocks.splice(index, 1)
    newBlocks.splice(newIndex, 0, removed)
    setBlocks(newBlocks.map((b, i) => ({ ...b, order: i })))
    setDirty(true)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-white rounded-2xl border border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-[#1A202C]">Page Builder</h2>
          <p className="text-gray-500">Drag blocks to reorder. Click Edit to customize.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => onPreview(blocks)}>
            <Eye className="h-4 w-4 mr-2" /> Preview
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowAddPanel(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Block
          </Button>
          <Button variant={dirty ? 'gold' : 'outline'} size="sm" onClick={() => { onSave(blocks); setDirty(false) }}>
            <Save className="h-4 w-4 mr-2" /> {dirty ? 'Save Changes' : 'Saved'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
        <div className="lg:w-3/4 h-full min-h-0 flex flex-col">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {blocks.map((block, index) => (
                  <SortableBlock
                    key={block.id}
                    block={block}
                    index={index}
                    onEdit={() => setSelectedBlock(block.id)}
                    onDelete={() => deleteBlock(block.id)}
                    onMoveUp={() => moveBlock(block.id, 'up')}
                    onMoveDown={() => moveBlock(block.id, 'down')}
                    onDuplicate={() => duplicateBlock(block.id)}
                  />
                ))}
                {blocks.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Layout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No blocks yet. Click "Add Block" to start building your page.</p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="lg:w-1/4 h-full min-h-0">
          <div className="bg-white rounded-2xl border border-gray-200 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-[#1A202C]">Block Settings</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedBlock(null)}>Close</Button>
            </div>
            
            {selectedBlock ? (
              <BlockEditor 
                block={blocks.find(b => b.id === selectedBlock)!} 
                onUpdate={updateBlock}
                onClose={() => setSelectedBlock(null)}
              />
            ) : showAddPanel ? (
              <AddBlockPanel onAdd={addBlock} onClose={() => setShowAddPanel(false)} />
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center">
                <Layout className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h4 className="text-lg font-medium text-gray-500 mb-2">Select a block to edit</h4>
                <p className="text-gray-400 mb-6">Or add a new block to get started</p>
                <Button onClick={() => setShowAddPanel(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Block
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddPanel(false)}>
          <AddBlockPanel onAdd={addBlock} onClose={() => setShowAddPanel(false)} />
        </div>
      )}
    </div>
  )
}

function AddBlockPanel({ onAdd, onClose }: { onAdd: (type: string) => void; onClose: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1A202C]">Add New Block</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">✕</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {BLOCK_TYPES.map(type => (
          <button
            key={type.id}
            onClick={() => onAdd(type.id)}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#1A365D] hover:bg-[#1A365D]/5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center mb-3 group-hover:bg-[#1A365D] group-hover:text-white transition-colors">
              <type.icon className="h-5 w-5 text-[#1A365D] group-hover:text-white" />
            </div>
            <h4 className="font-medium text-[#1A202C] group-hover:text-[#1A365D]">{type.name}</h4>
            <p className="text-xs text-gray-500 mt-1">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function BlockEditor({ block, onUpdate, onClose }: { block: PageBlock; onUpdate: (id: string, content: Record<string, any>) => void; onClose: () => void }) {
  const [content, setContent] = useState(block.content)
  const [saved, setSaved] = useState(false)

  const handleChange = (key: string, value: any) => {
    const newContent = { ...content, [key]: value }
    setContent(newContent)
    onUpdate(block.id, newContent)
    setSaved(false)
  }

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const fields = getFieldsForBlock(block.type, content, handleChange)

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-[#1A202C]">Editing: {BLOCK_TYPES.find(b => b.id === block.type)?.name}</h4>
        <div className="flex items-center gap-2">
          <Badge variant={content.published ? 'success' : 'warning'} className="text-xs">
            {content.published ? 'Published' : 'Draft'}
          </Badge>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={content.published} onChange={e => handleChange('published', e.target.checked)} className="rounded border-gray-300 text-[#1A365D]" />
            <span className="text-sm text-gray-600">Published</span>
          </label>
        </div>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {fields.map(field => (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === 'textarea' && (
              <Textarea
                value={content[field.key] || ''}
                onChange={e => handleChange(field.key, e.target.value)}
                rows={(field as any).rows || 4}
                className="font-mono text-sm"
              />
            )}
            {field.type === 'richtext' && (
              <RichTextEditor
                content={content[field.key] || ''}
                onChange={value => handleChange(field.key, value)}
              />
            )}
            {field.type === 'input' && (
              <Input
                value={content[field.key] || ''}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={(field as any).placeholder}
              />
            )}
            {field.type === 'select' && field.options && (
              <select
                value={content[field.key] || ''}
                onChange={e => handleChange(field.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A365D]/20 focus:border-[#1A365D]"
              >
                {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            )}
            {field.type === 'checkbox' && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content[field.key] || false}
                  onChange={e => handleChange(field.key, e.target.checked)}
                  className="rounded border-gray-300 text-[#1A365D]"
                />
                <span className="text-sm text-gray-600">{field.label}</span>
              </label>
            )}
            {field.type === 'image' && (
              <ImageUploader
                value={content[field.key] || ''}
                onChange={value => handleChange(field.key, value)}
                label={field.label}
              />
            )}
            {field.type === 'media-gallery' && (
              <MediaGallery
                value={content[field.key] || []}
                onChange={value => handleChange(field.key, value)}
              />
            )}
            {field.type === 'repeater' && (
              <RepeaterField
                value={content[field.key] || []}
                onChange={value => handleChange(field.key, value)}
                fields={field.fields || []}
              />
            )}
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={save} variant={saved ? 'success' : 'gold'}>
          {saved ? 'Saved!' : 'Save Block'}
        </Button>
      </div>
    </div>
  )
}

function getFieldsForBlock(type: string, content: Record<string, any>, onChange: (key: string, value: any) => void) {
  const baseFields = [
    { key: 'published', label: 'Published', type: 'checkbox' as const },
  ]

  type FieldDef = 
    | { key: string; label: string; type: 'input' | 'textarea' | 'select' | 'checkbox' | 'image' | 'media-gallery' | 'repeater' | 'richtext'; placeholder?: string; rows?: number; options?: { value: string; label: string }[]; fields?: any[] }

  switch (type) {
    case 'hero':
      return [
        ...baseFields,
        { key: 'headline', label: 'Headline', type: 'input' as const, placeholder: 'Main headline' },
        { key: 'subhead', label: 'Subheadline', type: 'textarea' as const, rows: 2, placeholder: 'Supporting text' },
        { key: 'ctaText', label: 'CTA Button Text', type: 'input' as const, placeholder: 'Book Now' },
        { key: 'ctaLink', label: 'CTA Link', type: 'input' as const, placeholder: '/booking' },
        { key: 'backgroundImage', label: 'Background Image', type: 'image' as const },
        { key: 'backgroundVideo', label: 'Background Video URL', type: 'input' as const, placeholder: 'https://...' },
        { key: 'overlayOpacity', label: 'Overlay Opacity (0-1)', type: 'input' as const, placeholder: '0.6' },
      ] as FieldDef[]
    case 'feature-grid':
      return [
        ...baseFields,
        { 
          key: 'features', 
          label: 'Features', 
          type: 'repeater' as const,
          fields: [
            { key: 'icon', label: 'Icon (heart, camera, sparkles, shield)', type: 'input' as const },
            { key: 'title', label: 'Title', type: 'input' as const },
            { key: 'description', label: 'Description', type: 'textarea' as const },
          ]
        },
      ]
    case 'dog-showcase':
      return [
        ...baseFields,
        { key: 'title', label: 'Section Title', type: 'input' as const },
        { key: 'subtitle', label: 'Subtitle', type: 'input' as const },
        { key: 'displayCount', label: 'Number of Dogs to Show', type: 'input' as const },
        { key: 'layout', label: 'Layout', type: 'select' as const, options: [
          { value: 'carousel', label: 'Carousel' },
          { value: 'grid', label: 'Grid' },
        ]},
      ]
    case 'booking-cta':
      return [
        ...baseFields,
        { key: 'title', label: 'Title', type: 'input' as const },
        { key: 'subtitle', label: 'Subtitle', type: 'textarea' as const },
        { key: 'buttonText', label: 'Button Text', type: 'input' as const },
        { key: 'buttonLink', label: 'Button Link', type: 'input' as const },
        { key: 'backgroundImage', label: 'Background Image', type: 'image' as const },
      ]
    case 'social-feed':
      return [
        ...baseFields,
        { key: 'title', label: 'Title', type: 'input' as const },
        { key: 'subtitle', label: 'Subtitle', type: 'input' as const },
        { key: 'instagramHandle', label: 'Instagram Handle', type: 'input' as const },
        { key: 'postsToShow', label: 'Posts to Show', type: 'input' as const },
        { key: 'layout', label: 'Layout', type: 'select' as const, options: [
          { value: 'masonry', label: 'Masonry' },
          { value: 'carousel', label: 'Carousel' },
          { value: 'grid', label: 'Grid' },
        ]},
      ]
    case 'testimonials':
      return [
        ...baseFields,
        { key: 'title', label: 'Title', type: 'input' as const },
        { key: 'subtitle', label: 'Subtitle', type: 'input' as const },
        { key: 'layout', label: 'Layout', type: 'select' as const, options: [
          { value: 'carousel', label: 'Carousel' },
          { value: 'grid', label: 'Grid' },
        ]},
        { key: 'autoPlay', label: 'Auto Play', type: 'checkbox' as const },
      ]
    case 'image-block':
      return [
        ...baseFields,
        { key: 'image', label: 'Image', type: 'image' as const },
        { key: 'alt', label: 'Alt Text', type: 'input' as const },
        { key: 'caption', label: 'Caption', type: 'input' as const },
        { key: 'link', label: 'Link (optional)', type: 'input' as const },
      ]
    case 'video-block':
      return [
        ...baseFields,
        { key: 'videoUrl', label: 'Video URL (MP4/WebM/YouTube)', type: 'input' as const },
        { key: 'poster', label: 'Poster Image', type: 'image' as const },
        { key: 'title', label: 'Title', type: 'input' as const },
        { key: 'description', label: 'Description', type: 'textarea' as const },
      ]
    case 'text-block':
      return [
        ...baseFields,
        { key: 'content', label: 'Content', type: 'richtext' as const },
        { key: 'alignment', label: 'Alignment', type: 'select' as const, options: [
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]},
      ]
    case 'behind-story':
      return [
        ...baseFields,
        { key: 'title', label: 'Title', type: 'input' as const },
        { key: 'subtitle', label: 'Subtitle', type: 'input' as const },
        { key: 'storyContent', label: 'Story Content', type: 'richtext' as const },
        { key: 'media', label: 'Media Gallery', type: 'media-gallery' as const },
        { key: 'relatedDog', label: 'Related Dog', type: 'select' as const, options: [
          { value: '', label: 'None' },
          { value: 'luna', label: 'Luna' },
          { value: 'thor', label: 'Thor' },
          { value: 'nova', label: 'Nova' },
          { value: 'atlas', label: 'Atlas' },
        ]},
        { key: 'tags', label: 'Tags (comma separated)', type: 'input' as const },
      ]
    default:
      return baseFields
  }
}

function ImageUploader({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  return (
    <div className="space-y-2">
      {value && (
        <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1A365D] hover:bg-[#1A365D]/5 transition-colors cursor-pointer">
        <p className="text-sm text-gray-500">Click or drag to upload</p>
        <p className="text-xs text-gray-400">Max 10MB • JPG, PNG, WebP</p>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = () => onChange(reader.result as string)
              reader.readAsDataURL(file)
            }
          }}
          id={`upload-${label}`}
        />
        <label htmlFor={`upload-${label}`} className="cursor-pointer">
          <button type="button" className="mt-2 px-4 py-2 bg-[#1A365D] text-white rounded-lg text-sm hover:bg-[#152C4D]">Choose File</button>
        </label>
      </div>
      {value && (
        <button onClick={() => onChange('')} className="text-sm text-red-600 hover:text-red-700">Remove</button>
      )}
    </div>
  )
}

function MediaGallery({ value, onChange }: { value: any[]; onChange: (value: any[]) => void }) {
  const [media, setMedia] = useState(value)
  
  const addMedia = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const newMedia = [...media, { url: reader.result, type: file.type.startsWith('video') ? 'video' : 'image', name: file.name }]
      setMedia(newMedia)
      onChange(newMedia)
    }
    reader.readAsDataURL(file)
  }

  const removeMedia = (index: number) => {
    const newMedia = media.filter((_, i) => i !== index)
    setMedia(newMedia)
    onChange(newMedia)
  }

  return (
    <div className="space-y-3">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1A365D] hover:bg-[#1A365D]/5 transition-colors cursor-pointer">
        <p className="text-sm text-gray-500">Drag images/videos here or click</p>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={e => Array.from(e.target.files || []).forEach(addMedia)}
          id="media-upload"
        />
        <label htmlFor="media-upload" className="cursor-pointer">
          <button type="button" className="mt-2 px-4 py-2 bg-[#1A365D] text-white rounded-lg text-sm">Choose Files</button>
        </label>
      </div>
      {media.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {media.map((item, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
              {item.type === 'video' ? (
                <video src={item.url} className="w-full h-full object-cover" muted />
              ) : (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => removeMedia(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function RepeaterField({ value, onChange, fields }: { value: any[]; onChange: (value: any[]) => void; fields: any[] }) {
  const [items, setItems] = useState(value)

  const updateItem = (index: number, key: string, val: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [key]: val }
    setItems(newItems)
    onChange(newItems)
  }

  const addItem = () => {
    const newItem: Record<string, any> = {}
    fields.forEach(f => { newItem[f.key] = '' })
    const newItems = [...items, newItem]
    setItems(newItems)
    onChange(newItems)
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
    onChange(newItems)
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Item {index + 1}</span>
            <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
          </div>
          <div className="space-y-2">
            {fields.map(field => (
              <div key={field.key} className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">{field.label}</label>
                {field.type === 'textarea' && (
                  <Textarea value={item[field.key] || ''} onChange={e => updateItem(index, field.key, e.target.value)} rows={2} className="text-sm" />
                )}
                {field.type === 'input' && (
                  <Input value={item[field.key] || ''} onChange={e => updateItem(index, field.key, e.target.value)} className="text-sm" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={addItem} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-[#1A365D] hover:text-[#1A365D] hover:bg-[#1A365D]/5">
        + Add Item
      </button>
    </div>
  )
}

function RichTextEditor({ content, onChange }: { content: string; onChange: (value: string) => void }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex gap-1 p-2 bg-gray-50 border-b border-gray-200 flex-wrap">
        {['bold', 'italic', 'underline', 'strike', 'code', '|', 'heading1', 'heading2', 'heading3', '|', 'bulletList', 'orderedList', '|', 'link', 'image'].map((btn, i) => (
          <button
            key={i}
            type="button"
            className={cn(
              'p-1.5 rounded hover:bg-gray-200 transition-colors',
              btn === '|' && 'w-px h-6 bg-gray-300 mx-1 hover:bg-gray-300 cursor-default'
            )}
            onClick={() => {
              if (btn === '|') return
              document.execCommand(btn === 'heading1' ? 'formatBlock' : btn === 'heading2' ? 'formatBlock' : btn === 'heading3' ? 'formatBlock' : btn, false, 
                btn === 'heading1' ? '<h1>' : btn === 'heading2' ? '<h2>' : btn === 'heading3' ? '<h3>' : undefined)
            }}
          >
            {btn === 'bold' && <strong>B</strong>}
            {btn === 'italic' && <em>I</em>}
            {btn === 'underline' && <u>U</u>}
            {btn === 'strike' && <s>S</s>}
            {btn === 'code' && <span style={{fontFamily: 'monospace'}}>{}</span>}
            {btn === 'heading1' && 'H1'}
            {btn === 'heading2' && 'H2'}
            {btn === 'heading3' && 'H3'}
            {btn === 'bulletList' && '•'}
            {btn === 'orderedList' && '1.'}
            {btn === 'link' && '🔗'}
            {btn === 'image' && '🖼️'}
          </button>
        ))}
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="p-4 min-h-[200px] focus:outline-none"
        onInput={e => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}