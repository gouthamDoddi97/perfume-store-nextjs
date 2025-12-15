'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useCartStore, Product } from '@/lib/store'
import { api } from '@/lib/api'



interface ProductGridProps {
  category?: string
  subCategory?: string
  bestSellers?: boolean
  featured?: boolean
}

export function ProductGrid({ category, subCategory, bestSellers, featured }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    fetchProducts()
  }, [category, subCategory, bestSellers, featured])

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts({ category, subCategory, bestSellers, featured })
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {products.length} products
        </p>
        <select className="bg-white dark:bg-luxury-black border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating</option>
          <option>Newest</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              
              {/* Wishlist */}
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors">
                <Heart size={18} className="text-gray-600 dark:text-gray-300" />
              </button>
              
              {/* Category */}
              <div className="absolute top-4 left-4 bg-luxury-rosegold dark:bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </div>
              
              {/* Discount */}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute bottom-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
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

              {/* Fragrance Notes */}
              <div className="flex flex-wrap gap-1">
                {product.notes && product.notes.map((note) => (
                  <span
                    key={note}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Rating */}
              {product.rating && (
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
                    {product.rating} ({product.reviews || 0})
                  </span>
                </div>
              )}

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
    </div>
  )
}