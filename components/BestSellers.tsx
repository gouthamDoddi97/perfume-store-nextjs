'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { useCartStore, Product } from '@/lib/store'
import { api } from '@/lib/api'



export function BestSellers() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts({ bestSellers: true })
      console.log('Best sellers data:', data)
      // Show only first 4 best sellers
      setProducts(data.slice(0, 4))
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-luxury-darkgray/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-luxury-black rounded-2xl overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-luxury-darkgray/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
            Best{' '}
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Sellers
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our most loved fragrances, chosen by fragrance enthusiasts worldwide
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">No best sellers found. Please mark some products as best sellers in admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-luxury-black rounded-2xl luxury-shadow dark:dark-luxury-shadow overflow-hidden"
            >
              <Link href={`/products/${product._id}`} className="block">
              <div className="relative">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-luxury-rosegold dark:bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </div>
                
                {/* Discount */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              </Link>
              
              <div className="p-6 space-y-4">
                <Link href={`/products/${product._id}`}>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 hover:text-luxury-rosegold transition-colors">{product.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{product.size}</p>
                  </div>
                </Link>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-luxury-rosegold dark:text-luxury-gold">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    addItem(product)
                  }}
                  className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}