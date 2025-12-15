import { HeroSection } from '@/components/HeroSection'
import { FeaturedCategories } from '@/components/FeaturedCategories'
import { BestSellers } from '@/components/BestSellers'
import { SpecialOffers } from '@/components/SpecialOffers'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <FeaturedCategories />
      <BestSellers />
      <SpecialOffers />
    </div>
  )
}