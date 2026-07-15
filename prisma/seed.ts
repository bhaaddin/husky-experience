import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const dogs = [
  {
    name: 'Atlas',
    age: 5,
    breed: 'Siberian Husky',
    personality: 'The Gentle Leader',
    funFact: 'Loves belly rolls and has heterochromia (one blue eye, one brown)',
    bio: 'Atlas is the heart and soul of our pack. As the eldest, he leads with quiet confidence and a gentle demeanor that makes everyone feel safe. His striking heterochromatic eyes tell a story of wisdom and kindness.',
    imageUrl: '/images/dogs/GPCG7577_1783917373446.jpg',
    imageAlt: 'Atlas the Siberian Husky with heterochromatic eyes',
    featured: true,
    displayOrder: 1,
  },
  {
    name: 'Luna',
    age: 3,
    breed: 'Siberian Husky',
    personality: 'The Playful Spirit',
    funFact: 'Can jump 6 feet high and loves snow more than treats',
    bio: 'Luna embodies the joyful spirit of the pack. Her boundless energy and love for play make her an instant favorite. Whether chasing snowflakes or greeting new friends, she does everything with infectious enthusiasm.',
    imageUrl: '/images/dogs/GPCH7593_1783917407751.jpg',
    imageAlt: 'Luna the playful Siberian Husky in snow',
    featured: true,
    displayOrder: 2,
  },
  {
    name: 'Nova',
    age: 2,
    breed: 'Siberian Husky',
    personality: 'The Cuddle Bug',
    funFact: 'Will lean against you for hours if you let her',
    bio: 'Nova has mastered the art of the perfect cuddle. Her gentle nature and love for human contact make her the ultimate therapy dog. She intuitively knows when someone needs comfort.',
    imageUrl: '/images/dogs/GPCJ7614_1783917453925.jpg',
    imageAlt: 'Nova the cuddly Siberian Husky',
    featured: true,
    displayOrder: 3,
  },
  {
    name: 'Storm',
    age: 4,
    breed: 'Siberian Husky',
    personality: 'The Adventurer',
    funFact: 'Has been on hiking trails across 3 states',
    bio: 'Storm lives for adventure. Whether trekking mountain trails or exploring new territories, his spirit of exploration is unmatched. He inspires everyone to embrace the wild.',
    imageUrl: '/images/dogs/GXCP7626_1783956824131.jpg',
    imageAlt: 'Storm the adventurous Siberian Husky on trail',
    featured: true,
    displayOrder: 4,
  },
  {
    name: 'Winter',
    age: 1,
    breed: 'Siberian Husky',
    personality: 'The Little Mischief',
    funFact: 'Newest puppy who stole everyone\'s heart',
    bio: 'As the newest and youngest member, Winter brings pure puppy joy to the pack. Her clumsy attempts at play and endless curiosity remind us all to find wonder in small things.',
    imageUrl: '/images/dogs/GXCE7575_1783917079078.jpg',
    imageAlt: 'Winter the playful Husky puppy',
    featured: false,
    displayOrder: 5,
  },
  {
    name: 'Koda',
    age: 6,
    breed: 'Siberian Husky',
    personality: 'The Social Butterfly',
    funFact: 'Makes friends with every human he meets',
    bio: 'Koda has never met a stranger. His friendly disposition and love for people make him the ultimate ambassador for the breed. He reminds us that friendship knows no boundaries.',
    imageUrl: '/images/dogs/GXCF7576_1783917242964.jpg',
    imageAlt: 'Koda the friendly Siberian Husky',
    featured: false,
    displayOrder: 6,
  },
  {
    name: 'Sasha',
    age: 3,
    breed: 'Siberian Husky',
    personality: 'The Drama Queen',
    funFact: 'Howls on command for treats',
    bio: 'Sasha has a flair for the dramatic. Her expressive howls and theatrical poses make every session entertaining. She knows exactly how to work the camera.',
    imageUrl: '/images/dogs/GXCP7626_1783956868780.jpg',
    imageAlt: 'Sasha the dramatic Siberian Husky',
    featured: false,
    displayOrder: 7,
  },
  {
    name: 'Bear',
    age: 8,
    breed: 'Siberian Husky',
    personality: 'The Gentle Giant',
    funFact: 'Largest in the pack at 65 lbs but thinks he\'s a lap dog',
    bio: 'Bear may be the biggest, but his heart is even bigger. Despite his imposing size, he\'s the gentlest soul in the pack. His calm presence grounds the entire pack.',
    imageUrl: '/images/dogs/GXCQ7627_1783956796789.jpg',
    imageAlt: 'Bear the gentle giant Siberian Husky',
    featured: false,
    displayOrder: 8,
  },
  {
    name: 'Maple',
    age: 2,
    breed: 'Siberian Husky',
    personality: 'The Explorer',
    funFact: 'Always first to investigate new things',
    bio: 'Maple\'s curiosity knows no bounds. She approaches every new situation with wide-eyed wonder and fearless determination. Her adventurous spirit is contagious.',
    imageUrl: '/images/dogs/GXCW7633_1783956629053.jpg',
    imageAlt: 'Maple the curious Siberian Husky explorer',
    featured: false,
    displayOrder: 9,
  },
  {
    name: 'Zeus',
    age: 4,
    breed: 'Siberian Husky',
    personality: 'The Protector',
    funFact: 'Self-appointed guardian of the pack',
    bio: 'Zeus takes his role as guardian seriously. His watchful eyes and protective nature ensure the pack\'s safety. Beneath his serious exterior lies a heart of gold.',
    imageUrl: '/images/dogs/GXCX7634_1783956585237.jpg',
    imageAlt: 'Zeus the protective Siberian Husky',
    featured: false,
    displayOrder: 10,
  },
  {
    name: 'Yuki',
    age: 1,
    breed: 'Siberian Husky',
    personality: 'The Snow Dancer',
    funFact: 'Loves rolling in fresh snow more than anything',
    bio: 'Yuki was born for winter. Her name means snow in Japanese, and she lives up to it. Watching her dance through fresh powder is pure magic.',
    imageUrl: '/images/dogs/GXDG7643_1783956373599.jpg',
    imageAlt: 'Yuki the snow-loving Husky puppy',
    featured: false,
    displayOrder: 11,
  },
  {
    name: 'Frost',
    age: 5,
    breed: 'Siberian Husky',
    personality: 'The Zen Master',
    funFact: 'Most calm and patient of all',
    bio: 'Frost embodies serenity. In a pack of high-energy huskies, he\'s the calm center. His patience and steady presence teach us all the value of stillness.',
    imageUrl: '/images/dogs/GXDG7643_1783956401525.jpg',
    imageAlt: 'Frost the calm Siberian Husky',
    featured: false,
    displayOrder: 12,
  },
  {
    name: 'Sky',
    age: 3,
    breed: 'Siberian Husky',
    personality: 'The Speed Demon',
    funFact: 'Fastest runner in the pack',
    bio: 'Sky was born to run. Her speed and agility are unmatched in the pack. Watching her sprint across open fields with ears flying back is pure poetry in motion.',
    imageUrl: '/images/dogs/GXDG7643_1783956457198.jpg',
    imageAlt: 'Sky the fast Siberian Husky running',
    featured: false,
    displayOrder: 13,
  },
  {
    name: 'Ghost',
    age: 7,
    breed: 'Siberian Husky',
    personality: 'The Wise Elder',
    funFact: 'Oldest of the pack and knows over 15 commands',
    bio: 'Ghost carries the wisdom of the pack. As the eldest, he\'s seen it all and guides the younger ones with quiet authority. His presence commands respect and love.',
    imageUrl: '/images/dogs/GXDG7643_1783956488041.jpg',
    imageAlt: 'Ghost the wise elder Siberian Husky',
    featured: false,
    displayOrder: 14,
  },
  {
    name: 'DJ',
    age: 4,
    breed: 'Siberian Husky',
    personality: 'The Playful Clown',
    funFact: 'Has a signature goofy grin that melts hearts',
    bio: 'DJ brings laughter wherever he goes. His goofy antics and signature grin bring joy to everyone he meets. He reminds us not to take life too seriously.',
    imageUrl: '/images/dogs/GXDJ7646_1783956321054.jpg',
    imageAlt: 'DJ the playful Siberian Husky with goofy grin',
    featured: false,
    displayOrder: 15,
  },
]

async function main() {
  console.log('🌱 Seeding database with 14 huskies...')

  for (const dog of dogs) {
    const existing = await prisma.dog.findFirst({
      where: { name: dog.name }
    })

    if (existing) {
      await prisma.dog.update({
        where: { id: existing.id },
        data: dog,
      })
      console.log(`✅ Updated: ${dog.name}`)
    } else {
      await prisma.dog.create({ data: dog })
      console.log(`✅ Created: ${dog.name}`)
    }
  }

  // Add some sample packages
  const packages = [
    {
      name: 'The Puppy Play',
      slug: 'puppy-play',
      description: 'A quick, joyful meet & greet with our adorable husky puppies. Perfect for a fun introduction.',
      durationMinutes: 30,
      priceCents: 14900,
      depositPercentage: 50,
      maxParticipants: 4,
      featured: false,
      includes: ['30-minute session', '5 professionally edited digital photos', 'Meet 2-3 puppies', 'Print release included'],
      requirements: 'Great for families with children',
      imageUrl: '/images/dogs/GXCE7575_1783917079078.jpg',
      displayOrder: 1,
      isActive: true,
    },
    {
      name: 'The Arctic Adventure',
      slug: 'arctic-adventure',
      description: 'Our most popular experience. A full hour with the pack in our stunning outdoor setting.',
      durationMinutes: 60,
      priceCents: 34900,
      depositPercentage: 50,
      maxParticipants: 4,
      featured: true,
      includes: ['60-minute session', '20 professionally edited digital photos', 'Access to full pack', 'Multiple locations', 'Print release included', 'Online gallery'],
      requirements: 'Suitable for all ages',
      imageUrl: '/images/dogs/GPCG7577_1783917373446.jpg',
      displayOrder: 2,
      isActive: true,
    },
    {
      name: 'The Legacy Collection',
      slug: 'legacy-collection',
      description: 'Our premium experience. Extended time, exclusive access, and heirloom-quality prints.',
      durationMinutes: 120,
      priceCents: 59900,
      depositPercentage: 50,
      maxParticipants: 4,
      featured: false,
      includes: ['120-minute session', '50 professionally edited digital photos', 'Private session with entire pack', '5 printed 8x10 photos', 'Custom photo album', 'Video highlights reel', 'Online gallery with unlimited downloads'],
      requirements: 'Best for serious photography enthusiasts',
      imageUrl: '/images/dogs/GPCG7577_1783917373446.jpg',
      displayOrder: 3,
      isActive: true,
    },
    {
      name: 'Group Experience',
      slug: 'group-experience',
      description: 'Corporate team-building, family reunions, or group celebrations with our huskies.',
      durationMinutes: 120,
      priceCents: 89900,
      depositPercentage: 50,
      maxParticipants: 20,
      featured: false,
      includes: ['120-minute session', '30 professionally edited digital photos per person', 'Up to 20 participants', 'Dedicated handler', 'Team photo session', 'Print release included'],
      requirements: 'Minimum 6 participants, maximum 20',
      imageUrl: '/images/dogs/GXDG7643_1783956488041.jpg',
      displayOrder: 4,
      isActive: true,
    },
  ]

  for (const pkg of packages) {
    const existing = await prisma.package.findFirst({
      where: { slug: pkg.slug }
    })

    if (existing) {
      await prisma.package.update({
        where: { id: existing.id },
        data: pkg,
      })
      console.log(`✅ Updated package: ${pkg.name}`)
    } else {
      await prisma.package.create({ data: pkg })
      console.log(`✅ Created package: ${pkg.name}`)
    }
  }

  // Add gallery images
  const galleryImages = [
    { title: 'Atlas in Snow', description: 'Majestic Atlas posing in fresh snow', imageUrl: '/images/dogs/GPCG7577_1783917373446.jpg', imageAlt: 'Atlas husky in snow', category: 'The Pack', tags: ['atlas', 'snow', 'portrait'], featured: true, displayOrder: 1 },
    { title: 'Family Session', description: 'Happy family with Luna and Atlas', imageUrl: '/images/dogs/GPCH7593_1783917407751.jpg', imageAlt: 'Family with huskies', category: 'Client Sessions', tags: ['family', 'luna', 'atlas'], featured: true, displayOrder: 2 },
    { title: 'Nova Portrait', description: 'Beautiful close-up of Nova', imageUrl: '/images/dogs/GPCJ7614_1783917453925.jpg', imageAlt: 'Nova husky portrait', category: 'The Pack', tags: ['nova', 'portrait'], featured: false, displayOrder: 3 },
    { title: 'Puppy Play', description: 'Winter the puppy playing in snow', imageUrl: '/images/dogs/GXCE7575_1783917079078.jpg', imageAlt: 'Winter puppy playing', category: 'Puppies', tags: ['winter', 'puppy', 'snow'], featured: true, displayOrder: 4 },
    { title: 'Behind the Scenes', description: 'Photographer capturing Storm in action', imageUrl: '/images/dogs/GXCF7576_1783917242964.jpg', imageAlt: 'Behind the scenes photography', category: 'Behind the Scenes', tags: ['storm', 'photography', 'action'], featured: false, displayOrder: 5 },
    { title: 'Couple Session', description: 'Engagement session with Koda and Nova', imageUrl: '/images/dogs/GXCP7626_1783956824131.jpg', imageAlt: 'Couple with huskies', category: 'Client Sessions', tags: ['couple', 'engagement', 'koda', 'nova'], featured: false, displayOrder: 6 },
    { title: 'Storm Portrait', description: 'Storm the adventurer on mountain trail', imageUrl: '/images/dogs/GXCP7626_1783956868780.jpg', imageAlt: 'Storm husky on trail', category: 'The Pack', tags: ['storm', 'trail', 'adventure'], featured: false, displayOrder: 6 },
    { title: 'Bear the Gentle Giant', description: 'Bear showing his gentle nature', imageUrl: '/images/dogs/GXCQ7627_1783956796789.jpg', imageAlt: 'Bear the gentle giant', category: 'The Pack', tags: ['bear', 'gentle', 'giant'], featured: false, displayOrder: 7 },
    { title: 'Pack Running', description: 'Full pack running through field', imageUrl: '/images/dogs/GXCW7633_1783956629053.jpg', imageAlt: 'Husky pack running', category: 'The Pack', tags: ['pack', 'running', 'action'], featured: true, displayOrder: 8 },
    { title: 'Photographer at Work', description: 'Capturing the perfect moment', imageUrl: '/images/dogs/GXCX7634_1783956585237.jpg', imageAlt: 'Photographer working', category: 'Behind the Scenes', tags: ['photography', 'behind scenes'], featured: false, displayOrder: 9 },
    { title: 'Sleeping Puppies', description: 'Winter and Yuki sleeping together', imageUrl: '/images/dogs/GXDG7643_1783956373599.jpg', imageAlt: 'Sleeping husky puppies', category: 'Puppies', tags: ['puppies', 'sleeping', 'winter', 'yuki'], featured: true, displayOrder: 10 },
    { title: 'Husky in Field', description: 'Zeus posing in golden hour light', imageUrl: '/images/dogs/GXDG7643_1783956401525.jpg', imageAlt: 'Zeus husky in field', category: 'The Pack', tags: ['zeus', 'field', 'golden hour'], featured: false, displayOrder: 11 },
    { title: 'DJ the Clown', description: 'DJ showing his goofy grin', imageUrl: '/images/dogs/GXDG7643_1783956457198.jpg', imageAlt: 'DJ goofy grin', category: 'The Pack', tags: ['dj', 'funny', 'grin'], featured: false, displayOrder: 12 },
    { title: 'Frost the Zen Master', description: 'Frost in deep meditation', imageUrl: '/images/dogs/GXDG7643_1783956488041.jpg', imageAlt: 'Frost zen pose', category: 'The Pack', tags: ['frost', 'zen', 'calm'], featured: false, displayOrder: 13 },
    { title: 'DJ Action Shot', description: 'DJ jumping for joy', imageUrl: '/images/dogs/GXDJ7646_1783956321054.jpg', imageAlt: 'DJ jumping', category: 'Client Sessions', tags: ['dj', 'jump', 'action'], featured: false, displayOrder: 14 },
  ]

  for (const img of galleryImages) {
    const existing = await prisma.galleryImage.findFirst({
      where: { imageUrl: img.imageUrl }
    })

    if (!existing) {
      await prisma.galleryImage.create({ data: img })
      console.log(`✅ Added gallery image: ${img.title}`)
    }
  }

  // Add sample blog posts
  const blogPosts = [
    {
      title: 'How to Prepare for Your Husky Photography Session',
      slug: 'preparing-for-husky-session',
      excerpt: 'Everything you need to know before your visit — from what to wear to how to interact with our pack.',
      content: `## Before Your Session

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
- Your smile and love for dogs!

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

### How to Receive Your Photos

Photos are delivered via a private online gallery within 7-10 business days. You can download, share, and print them as you wish.`,
      featuredImage: '/images/dogs/GXCE7575_1783917079078.jpg',
      imageAlt: 'Preparing for husky photography session',
      status: 'published',
      tags: ['photography', 'tips', 'preparation'],
    },
    {
      title: 'Meet Atlas: The Heart and Soul of Our Pack',
      slug: 'meet-atlas-pack-leader',
      excerpt: 'The story of how one remarkable husky inspired an entire business and touched hundreds of lives.',
      content: `## Meet Atlas: The Heart and Soul of Our Pack

When we adopted Atlas eight years ago, we never imagined he would inspire an entire business dedicated to sharing the magic of Siberian Huskies with the world.

### The Beginning

Atlas came to us as a rescue. His striking heterochromatic eyes—one blue, one brown—immediately captured our hearts. But it was his gentle spirit and intuitive nature that truly set him apart.

### The Pack Grows

Atlas became the anchor for what would become a family of 14 Siberian Huskies. Each new addition brought their own personality, but Atlas remained the steady center.

### The Business Is Born

Friends and family kept asking to visit, to meet Atlas, to take photos. We realized that not everyone can have a husky, but everyone deserves to experience the connection these incredible dogs offer.

Thus, The Husky Experience was born—from one remarkable dog who taught us that the love between humans and huskies is something worth sharing.

### Atlas Today

At 8 years old, Atlas has slowed down a bit, but his spirit remains unchanged. He still leads the pack with quiet authority, greets every visitor with a gentle nudge, and reminds us daily why we fell in love with this breed.

### Visit Atlas

You can meet Atlas during any of our sessions. He's the one with the mismatched eyes and the soulful gaze that says, "I've been waiting for you."

---

*Atlas turns 9 this winter. We're planning a special celebration—stay tuned!*`,
      featuredImage: '/images/dogs/GPCG7577_1783917373446.jpg',
      imageAlt: 'Atlas the husky pack leader',
      status: 'published',
      tags: ['husky', 'story', 'atlas'],
    },
    {
      title: '5 Essential Tips for Living with Siberian Huskies',
      slug: 'husky-care-tips',
      excerpt: 'From our years of experience with 14 huskies, here are the most important lessons we\'ve learned.',
      content: `## 5 Essential Tips for Living with Siberian Huskies

After years of living with 14 Siberian Huskies, we've learned a thing or two. Here are the most important lessons we've learned.

### 1. Exercise Isn't Optional

Huskies were bred to run 100+ miles a day. A tired husky is a good husky. Plan for:
- Minimum 2 hours of vigorous exercise daily
- Mental stimulation (puzzle toys, training)
- Variety in activities (running, hiking, swimming)

### 2. Secure Your Yard

Huskies are escape artists. They can:
- Jump 6-foot fences
- Dig under barriers
- Open doors and gates

Invest in 6-foot+ fencing with dig guards. Check perimeter weekly.

### 3. Embrace the Fur

Huskies shed. A lot. Twice a year they "blow their coat."
- Invest in a high-quality vacuum
- Brush daily during shedding season
- Accept that fur is now a condiment in your food

### 4. Training Requires Creativity

Huskies are intelligent but independent. They don't live to please you—they live to please themselves.
- Make training a game
- Use high-value rewards
- Keep sessions short and fun
- Be consistent, not harsh

### 5. They're Not Guard Dogs

Huskies love everyone. They'll greet a burglar with a wagging tail and show them where the good treats are.
- Don't expect protection
- Expect enthusiastic greetings for everyone
- Socialize extensively from puppyhood

---

*These tips come from 8+ years with 14 huskies. Every dog is unique, but these fundamentals apply to the breed.*`,
      featuredImage: '/images/dogs/GXCF7576_1783917242964.jpg',
      imageAlt: 'Husky care tips',
      status: 'published',
      tags: ['care', 'husky', 'tips'],
    },
    {
      title: 'Behind the Scenes: A Day at The Husky Experience',
      slug: 'behind-the-scenes',
      excerpt: 'Ever wondered what happens before and after your session? Take a peek behind the curtain.',
      content: `## Behind the Scenes: A Day at The Husky Experience

Ever wondered what happens before and after your session? Take a peek behind the curtain.

### Morning Routine (6:00 AM)

The day starts early for our pack. Each husky gets:
- Individual health check
- Tailored breakfast (some have special diets)
- Morning run in the exercise yard
- Grooming session (brushing, nail check, paw care)

### Pre-Session Prep (8:30 AM)

Before guests arrive:
- Session area setup (props, lighting, backdrops)
- Camera gear preparation and testing
- Pack briefing with handlers
- Final grooming touch-ups for featured dogs

### During Sessions (10:00 AM - 4:00 PM)

Each session is unique, but the flow typically includes:
1. **Welcome & Safety Briefing** (10 min) — Meet the handler, learn pack etiquette
2. **Meet & Greet** (15 min) — Dogs approach naturally, treats and bonding
3. **Guided Photography** (30-90 min) — Professional photographer captures moments
4. **Free Play** (15 min) — Unstructured time for candid shots
5. **Wrap Up** (10 min) — Water break, final photos, goodbyes

Between sessions, dogs rotate for rest. No dog works more than 2 hours consecutively.

### Evening Wind-Down (5:00 PM)

- Light dinner
- Evening walk or play session
- Final health check
- Cuddle time with handlers
- Lights out by 8:00 PM

---

*The magic you see in photos is built on a foundation of love, care, and respect for every dog in our pack.*`,
      featuredImage: '/images/dogs/GXDG7643_1783956488041.jpg',
      imageAlt: 'Behind the scenes husky photography',
      status: 'published',
      tags: ['behind the scenes', 'day in the life'],
    },
  ]

  for (const post of blogPosts) {
    const existing = await prisma.blogPost.findFirst({
      where: { slug: post.slug }
    })

    if (existing) {
      await prisma.blogPost.update({
        where: { id: existing.id },
        data: post,
      })
      console.log(`✅ Updated blog: ${post.title}`)
    } else {
      await prisma.blogPost.create({ data: post })
      console.log(`✅ Created blog: ${post.title}`)
    }
  }

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })