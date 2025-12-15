'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const filterCategories = [
  {
    name: 'Fragrance Type',
    options: ['Perfume', 'Attar', 'Oud', 'Gift Set']
  },
  {
    name: 'Size',
    options: ['12ml', '25ml', '50ml', '100ml']
  },
  {
    name: 'Price Range',
    options: ['Under ₹2,000', '₹2,000 - ₹5,000', '₹5,000 - ₹10,000', 'Above ₹10,000']
  },
  {
    name: 'Fragrance Notes',
    options: ['Floral', 'Woody', 'Oriental', 'Fresh', 'Spicy', 'Citrus']
  }
]

export function ProductFilters() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['Fragrance Type'])

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    )
  }

  return (
    <div className="bg-white dark:bg-luxury-black rounded-2xl p-6 luxury-shadow dark:dark-luxury-shadow">
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="flex items-center justify-between w-full font-semibold text-lg mb-6"
      >
        <span>Filters</span>
        {isFiltersOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isFiltersOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="space-y-6">
            {filterCategories.map((category) => (
              <div key={category.name} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleSection(category.name)}
                  className="flex items-center justify-between w-full text-left font-medium mb-3"
                >
                  {category.name}
                  {expandedSections.includes(category.name) ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                
                {expandedSections.includes(category.name) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    {category.options.map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-luxury-rosegold dark:text-luxury-gold focus:ring-luxury-rosegold dark:focus:ring-luxury-gold"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{option}</span>
                      </label>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 bg-gradient-to-r from-luxury-rosegold to-luxury-gold dark:from-luxury-gold dark:to-yellow-400 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            Apply Filters
          </button>
        </motion.div>
      )}
    </div>
  )
}