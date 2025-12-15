'use client'

import { motion } from 'framer-motion'
import { Brain, Heart, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function FragranceQuiz() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-luxury-cream via-luxury-rosegold/10 to-luxury-cream dark:from-luxury-black dark:via-luxury-gold/5 dark:to-luxury-darkgray">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 rounded-full flex items-center justify-center"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            
            <h2 className="font-luxury text-4xl md:text-5xl font-bold">
              Find Your Perfect{' '}
              <span className="bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 bg-clip-text text-transparent">
                Fragrance
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Take our personalized fragrance quiz and discover scents that match your personality, mood, and style preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow"
            >
              <Heart className="w-12 h-12 text-luxury-rosegold dark:text-luxury-gold mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Personality Match</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Discover fragrances that reflect your unique personality and lifestyle
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow"
            >
              <Sparkles className="w-12 h-12 text-luxury-rosegold dark:text-luxury-gold mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Mood Based</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Find scents that complement your current mood and desired ambiance
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow"
            >
              <Brain className="w-12 h-12 text-luxury-rosegold dark:text-luxury-gold mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get AI-powered suggestions based on your preferences and history
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/quiz"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Fragrance Quiz
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}