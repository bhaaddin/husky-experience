import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, stories, and updates from The Husky Experience.',
}

const posts = [
  {
    slug: 'preparing-for-your-husky-session',
    title: 'How to Prepare for Your Husky Photography Session',
    excerpt: 'Everything you need to know before your visit — from what to wear to how to interact with our pack.',
    image: '/images/blog/prep-session.jpg',
    author: 'The Husky Team',
    date: '2026-06-15',
    category: 'Tips & Guides',
    tags: ['photography', 'tips', 'preparation'],
  },
  {
    slug: 'meet-atlas-pack-leader',
    title: 'Meet Atlas: The Heart and Soul of Our Pack',
    excerpt: 'The story of how one remarkable husky inspired an entire business and touched hundreds of lives.',
    image: '/images/blog/atlas-story.jpg',
    author: 'The Husky Team',
    date: '2026-06-01',
    category: 'Pack Stories',
    tags: ['husky', 'story', 'atlas'],
  },
  {
    slug: 'husky-care-tips',
    title: '5 Essential Tips for Living with Siberian Huskies',
    excerpt: 'From our years of experience with 14 huskies, here are the most important lessons we\'ve learned.',
    image: '/images/blog/care-tips.jpg',
    author: 'The Husky Team',
    date: '2026-05-20',
    category: 'Husky Care',
    tags: ['care', 'husky', 'tips'],
  },
  {
    slug: 'behind-the-scenes',
    title: 'Behind the Scenes: A Day at The Husky Experience',
    excerpt: 'Ever wondered what happens before and after your session? Take a peek behind the curtain.',
    image: '/images/blog/behind-scenes.jpg',
    author: 'The Husky Team',
    date: '2026-05-10',
    category: 'Behind the Scenes',
    tags: ['behind the scenes', 'day in the life'],
  },
]

export default function BlogPage() {
  return (
    <>
      <section className="relative py-32 bg-[#1A365D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D] to-[#2D5A8E] opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Stories, tips, and updates from our pack
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A365D]/20 focus:border-[#1A365D]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 ${i === 0 ? 'md:col-span-2' : ''}`}>
                  <div className={`${i === 0 ? 'aspect-[2/1]' : 'aspect-[16/9]'} bg-gray-200 relative overflow-hidden`}>
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#1A365D] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {post.author}
                      </span>
                    </div>
                    <h2 className={`font-bold text-[#1A202C] group-hover:text-[#1A365D] transition-colors mb-3 ${i === 0 ? 'text-2xl' : 'text-xl'}`}>
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-[#D69E2E] font-medium mt-4 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
