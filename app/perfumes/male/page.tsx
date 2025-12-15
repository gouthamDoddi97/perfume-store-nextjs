import { ProductGrid } from '@/components/ProductGrid'
import { ProductFilters } from '@/components/ProductFilters'
import Image from 'next/image'

export const metadata = {
  title: 'Male Perfumes - Moonlight Attar Perfumes',
  description: 'Discover our collection of masculine luxury perfumes and fragrances.',
}

export default function MalePerfumesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <Image
              src="https://picsum.photos/1200/400?random=27"
              alt="Male Perfumes Collection"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="font-luxury text-4xl md:text-6xl font-bold mb-4">
                  Male Perfumes
                </h1>
                <p className="text-xl">
                  Masculine fragrances for the modern gentleman
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid category="Perfume" subCategory="Male" />
          </div>
        </div>
      </div>
    </div>
  )
}