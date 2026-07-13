import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const posts: Record<string, any> = {
  'preparing-for-your-husky-session': {
    title: 'How to Prepare for Your Husky Photography Session',
    image: '/images/blog/prep-session.jpg',
    author: 'The Husky Team',
    date: '2026-06-15',
    category: 'Tips & Guides',
    content: `
## Before Your Session

Getting ready for your husky photography session is part of the fun! Here's everything you need to know to make the most of your experience.

### What to Wear

**Do wear:**
- Solid colors (earth tones, blues, and whites work beautifully)
- Comfortable, weather-appropriate clothing
- Closed-toe shoes (we're outdoors!)
- Layers for unpredictable weather

**Avoid:**
- Busy patterns that distract from the dogs
- Dark black (can look flat in photos)
- Expensive jewelry or accessories

### What to Bring

- Water bottle (it can get exciting!)
- Sunscreen and bug spray for outdoor sessions
- Any personal items you'd like in photos
- A treat for yourself — you'll be smiling a lot!

### How to Interact with Our Huskies

Our pack loves attention, but here are some tips for the best interaction:

1. **Let them come to you** — Our huskies are social and will approach naturally
2. **Stay calm** — Excitement is great, but calm energy helps the dogs relax
3. **Follow the handler** — Our professional handlers will guide you
4. **Be yourself** — The best photos capture genuine moments

### Weather Policy

We shoot in most weather conditions! Light rain can create magical, moody photos. However, for safety we reschedule during:
- Heavy rain or thunderstorms
- Extreme heat (above 90°F)
- Dangerous weather conditions

Rescheduling is always free with 24 hours notice.
    `,
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts[params.slug]
  return {
    title: post?.title || 'Blog Post',
    description: post?.content?.slice(0, 160),
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1A202C] mb-4">Post Not Found</h1>
          <Button asChild variant="outline">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative h-[50vh] min-h-[400px] bg-gray-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D] via-[#1A365D]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            <span className="inline-block bg-[#D69E2E] text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4" />{post.author}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-[#1A202C] prose-a:text-[#1A365D] prose-strong:text-[#1A202C]">
            {post.content.split('\n\n').map((paragraph: string, i: number) => {
              if (paragraph.startsWith('## ')) return <h2 key={i}>{paragraph.slice(3)}</h2>
              if (paragraph.startsWith('### ')) return <h3 key={i}>{paragraph.slice(4)}</h3>
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) return <p key={i}><strong>{paragraph.slice(2, -2)}</strong></p>
              return <p key={i}>{paragraph}</p>
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Written by</p>
              <p className="font-semibold text-[#1A202C]">{post.author}</p>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
