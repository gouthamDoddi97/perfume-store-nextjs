'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Star, Users, Gift } from 'lucide-react'
import { api } from '@/lib/api'

export function HeroSection() {
  const [currentProduct, setCurrentProduct] = useState(0)
  const [heroProducts, setHeroProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHeroProducts()
  }, [])

  useEffect(() => {
    if (heroProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentProduct((prev) => (prev + 1) % heroProducts.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [heroProducts])

  const fetchHeroProducts = async () => {
    try {
      console.log('Fetching hero carousel products...')
      const products = await api.getProducts({ heroCarousel: true })
      console.log('Hero products fetched:', products)
      setHeroProducts(products) // Use all hero carousel products
    } catch (error) {
      console.error('Failed to fetch hero products:', error)
    }
    setLoading(false)
  }

  const getBadge = (product) => {
    if (product.isBestSeller) return 'BESTSELLER'
    if (product.originalPrice && product.originalPrice > product.price) {
      const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      return `${discount}% OFF`
    }
    if (product.category === 'Gift Set') return 'GIFT SET'
    return 'NEW'
  }

  return (
    <section className="relative bg-gradient-to-b from-luxury-cream to-white dark:from-luxury-black dark:to-luxury-darkgray overflow-hidden">
      {/* Desktop Hero */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-6 pt-8 pb-16">
          <div className="grid grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>10K+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={20} className="text-yellow-500 fill-current" />
                  <span>4.9 Rating</span>
                </div>
              </div>

              <div>
                <h1 className="text-6xl font-bold mb-6 leading-tight">
                  Premium Fragrances
                  <br />
                  <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold bg-clip-text text-transparent">
                    Up to 30% OFF
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Authentic Attars • Luxury Perfumes • Premium Quality
                </p>
              </div>

              <div className="flex space-x-4">
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white px-8 py-4 rounded-xl font-semibold text-lg"
                  >
                    Shop All Products
                  </motion.button>
                </Link>
                <Link href="/attars">
                  <button className="border-2 border-luxury-rosegold text-luxury-rosegold px-8 py-4 rounded-xl font-semibold text-lg hover:bg-luxury-rosegold hover:text-white transition-colors">
                    Explore Attars
                  </button>
                </Link>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Gift size={24} />
                  <span className="font-semibold text-lg">Limited Time Offer</span>
                </div>
                <p>Free shipping on orders above ₹2,999</p>
              </div>
            </motion.div>

            {/* Right Content - Product Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {loading ? (
                <div className="bg-white dark:bg-luxury-black rounded-3xl p-8 luxury-shadow text-center">
                  <p className="text-gray-500 text-lg">Loading products...</p>
                </div>
              ) : heroProducts.length === 0 ? (
                <div className="bg-white dark:bg-luxury-black rounded-3xl p-8 luxury-shadow text-center">
                  <p className="text-gray-500 text-lg">No hero products selected</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-luxury-black rounded-3xl p-8 luxury-shadow">
                  {heroProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentProduct === index ? 1 : 0 }}
                      className={`${currentProduct === index ? 'block' : 'hidden'}`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="bg-red-500 text-white text-sm px-4 py-2 rounded-full font-semibold">
                          {getBadge(product)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Star size={18} className="text-yellow-500 fill-current" />
                          <span className="text-lg font-medium">{product.rating || 4.5}</span>
                        </div>
                      </div>

                      <div className="relative w-64 h-64 mx-auto mb-6">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-2xl"
                        />
                      </div>

                      <div className="text-center">
                        <h3 className="font-bold text-2xl mb-4">{product.name}</h3>
                        <div className="flex items-center justify-center space-x-3 mb-6">
                          <span className="text-3xl font-bold text-luxury-rosegold">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-gray-500 line-through text-xl">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        
                        <Link href="/products">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3"
                          >
                            <ShoppingBag size={20} />
                            <span>Buy Now</span>
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {heroProducts.length > 1 && (
                <div className="flex justify-center space-x-3 mt-6">
                  {heroProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProduct(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentProduct === index ? 'bg-luxury-rosegold w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Hero */}
      <div className="lg:hidden px-4 pt-4 pb-8">
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center space-x-6 mb-6 text-sm text-gray-600 dark:text-gray-400"
        >
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>10K+ Happy Customers</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span>4.9 Rating</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Premium Fragrances
            <br />
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold bg-clip-text text-transparent">
              Up to 30% OFF
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Authentic Attars • Luxury Perfumes • Premium Quality
          </p>
        </motion.div>

        {/* Featured Product Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mb-8"
        >
          {loading ? (
            <div className="bg-white dark:bg-luxury-black rounded-3xl p-6 luxury-shadow mx-auto max-w-sm text-center">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : heroProducts.length === 0 ? (
            <div className="bg-white dark:bg-luxury-black rounded-3xl p-6 luxury-shadow mx-auto max-w-sm text-center">
              <p className="text-gray-500">No hero products selected</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-luxury-black rounded-3xl p-6 luxury-shadow mx-auto max-w-sm">
              {heroProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentProduct === index ? 1 : 0 }}
                  className={`${currentProduct === index ? 'block' : 'hidden'}`}
                >
                  {/* Product Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {getBadge(product)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{product.rating || 4.5}</span>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-luxury-rosegold">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Quick Buy Button */}
                    <Link href="/products">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                      >
                        <ShoppingBag size={18} />
                        <span>Buy Now</span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Product Indicators */}
          {heroProducts.length > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              {heroProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProduct(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentProduct === index ? 'bg-luxury-rosegold w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col space-y-3 max-w-sm mx-auto"
        >
          <Link href="/products">
            <button className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white py-4 rounded-xl font-semibold text-lg">
              Shop All Products
            </button>
          </Link>
          
          <div className="grid grid-cols-2 gap-3">
            <Link href="/attars">
              <button className="w-full border-2 border-luxury-rosegold text-luxury-rosegold py-3 rounded-xl font-medium">
                Attars
              </button>
            </Link>
            <Link href="/perfumes/male">
              <button className="w-full border-2 border-luxury-rosegold text-luxury-rosegold py-3 rounded-xl font-medium">
                Perfumes
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Special Offer Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-2xl text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Gift size={20} />
            <span className="font-semibold">Limited Time Offer</span>
          </div>
          <p className="text-sm">Free shipping on orders above ₹2,999</p>
        </motion.div>
      </div>
    </section>
  )
}