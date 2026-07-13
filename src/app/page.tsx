import { Hero } from '@/components/home/Hero'
import { ValueProps } from '@/components/home/ValueProps'
import { FeaturedDogs } from '@/components/home/FeaturedDogs'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'
import { ExperienceHighlights } from '@/components/home/ExperienceHighlights'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ExperienceHighlights />
      <FeaturedDogs />
      <Testimonials />
      <Newsletter />
    </>
  )
}
