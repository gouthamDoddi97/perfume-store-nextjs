'use client'

import { motion } from 'framer-motion'
import { Gift, Sparkles, Clock } from 'lucide-react'
import Link from 'next/link'

export function SpecialOffers() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
            Special{' '}
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Offers
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Festive Discount */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 p-8 text-white"
          >
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-8 h-8" />
                <span className="text-lg font-semibold">Festive Special</span>
              </div>
              
              <h3 className="font-luxury text-3xl font-bold mb-4">
                Up to 40% OFF
              </h3>
              
              <p className="text-lg mb-6 opacity-90">
                Celebrate the season with our exclusive festive collection. Limited time offer on premium fragrances.
              </p>
              
              <Link
                href="/offers/festive"
                className="inline-flex items-center px-6 py-3 bg-white text-luxury-rosegold dark:text-luxury-gold font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Shop Festive Collection
              </Link>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
          </motion.div>

          {/* Gift Sets Offer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-luxury-black dark:bg-luxury-darkgray p-8 text-white"
          >
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <Gift className="w-8 h-8 text-luxury-gold" />
                <span className="text-lg font-semibold">Gift Sets</span>
              </div>
              
              <h3 className="font-luxury text-3xl font-bold mb-4 text-luxury-gold">
                Buy 2 Get 1 Free
              </h3>
              
              <p className="text-lg mb-6 text-gray-300">
                Perfect for gifting or treating yourself. Mix and match from our curated gift set collection.
              </p>
              
              <Link
                href="/gift-sets"
                className="inline-flex items-center px-6 py-3 bg-luxury-gold text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors"
              >
                Explore Gift Sets
              </Link>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-luxury-gold/10 rounded-full -translate-y-14 translate-x-14" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-luxury-gold/10 rounded-full translate-y-10 -translate-x-10" />
          </motion.div>
        </div>

        {/* Limited Time Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Limited Time Offer</span>
          </div>
          <p className="text-lg">
            Free shipping on orders above ₹2,999 | Use code: <span className="font-bold">FREESHIP</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}