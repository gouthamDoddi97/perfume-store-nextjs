import { ProductGrid } from '@/components/ProductGrid'
import { ProductFilters } from '@/components/ProductFilters'

export const metadata = {
  title: 'Premium Perfumes & Attars - Moonlight Collection',
  description: 'Browse our complete collection of luxury perfumes, authentic attars, and premium oud fragrances.',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover premium fragrances crafted for the discerning connoisseur
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  )
}