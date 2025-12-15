import { ShoppingCart } from '@/components/ShoppingCart'

export const metadata = {
  title: 'Shopping Cart - Moonlight Attar Perfumes',
  description: 'Review your selected fragrances and proceed to checkout.',
}

export default function CartPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
            Shopping{' '}
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Cart
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Review your selected fragrances
          </p>
        </div>

        <ShoppingCart />
      </div>
    </div>
  )
}