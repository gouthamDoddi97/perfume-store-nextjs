'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const searchProducts = [
  { id: 1, name: 'Royal Oud Intense', category: 'Oud', price: 4999, image: 'https://picsum.photos/100/100?random=10' },
  { id: 2, name: 'Mystic Rose Attar', category: 'Attar', price: 2499, image: 'https://picsum.photos/100/100?random=11' },
  { id: 3, name: 'Amber Nights', category: 'Perfume', price: 3999, image: 'https://picsum.photos/100/100?random=12' },
  { id: 4, name: 'Saffron Dreams', category: 'Attar', price: 1999, image: 'https://picsum.photos/100/100?random=13' },
  { id: 5, name: 'Ocean Breeze', category: 'Perfume', price: 2999, image: 'https://picsum.photos/100/100?random=14' },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(searchProducts)

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults(searchProducts)
    }
  }, [query])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-white dark:bg-luxury-black rounded-2xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden luxury-shadow dark:dark-luxury-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search perfumes, attars, oud..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-lg outline-none"
                  autoFocus
                />
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-4 space-y-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                      </div>
                      <span className="font-semibold text-luxury-rosegold dark:text-luxury-gold">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No products found for "{query}"</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}