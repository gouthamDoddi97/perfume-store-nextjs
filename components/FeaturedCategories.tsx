'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    name: 'Male Perfumes',
    description: 'Masculine luxury fragrances',
    image: '/male.jpg',
    href: '/perfumes/male'
  },
  {
    name: 'Female Perfumes',
    description: 'Elegant feminine scents',
    image: '/download.jpg',
    href: '/perfumes/female'
  },
  {
    name: 'Attars',
    description: 'Traditional oil-based fragrances',
    image: '/attar.jpg',
    href: '/attars'
  },
  {
    name: 'About Us',
    description: 'Our fragrance journey',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=300&fit=crop',
    href: '/about'
  }
]

export function FeaturedCategories() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our carefully curated collections of premium fragrances
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={category.href}>
                <div className="relative overflow-hidden rounded-2xl luxury-shadow dark:dark-luxury-shadow bg-white dark:bg-luxury-darkgray">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-luxury text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                  
                  <div className="absolute top-4 right-4 w-12 h-12 bg-luxury-rosegold/20 dark:bg-luxury-gold/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}