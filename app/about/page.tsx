'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Award, Users, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-luxury text-5xl md:text-6xl font-bold mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
              Moonlight
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Crafting luxury fragrances that tell stories, evoke memories, and define personalities since our inception.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="font-luxury text-3xl font-bold">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Moonlight Attar & Perfumes was born from a passion for creating exceptional fragrances that capture the essence of luxury and tradition. Our journey began with a simple belief: every person deserves to find their signature scent.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We blend traditional attar-making techniques with modern perfumery to create unique fragrances that speak to the soul. Each bottle tells a story, each scent creates a memory.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative h-96 rounded-2xl overflow-hidden"
          >
            <Image
              src="https://picsum.photos/600/400?random=18"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="font-luxury text-3xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Passion',
                description: 'Every fragrance is crafted with love and dedication'
              },
              {
                icon: Award,
                title: 'Quality',
                description: 'Premium ingredients and meticulous attention to detail'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building relationships with fragrance enthusiasts worldwide'
              },
              {
                icon: Sparkles,
                title: 'Innovation',
                description: 'Blending tradition with modern perfumery techniques'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow"
              >
                <value.icon className="w-12 h-12 text-luxury-rosegold dark:text-luxury-gold mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="font-luxury text-3xl font-bold text-center mb-12">Our Gallery</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[19, 20, 21, 22, 23, 24, 25, 26].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative h-48 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={`https://picsum.photos/300/300?random=${num}`}
                  alt={`Gallery Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-luxury-rosegold/10 to-luxury-gold/10 dark:from-luxury-gold/10 dark:to-yellow-400/10 rounded-2xl p-12 text-center"
        >
          <h2 className="font-luxury text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            To help every individual discover their signature scent through our carefully curated collection of luxury perfumes and traditional attars, creating lasting memories and defining personal style.
          </p>
        </motion.div>
      </div>
    </div>
  )
}