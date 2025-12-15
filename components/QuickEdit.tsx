'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react'
import { api } from '@/lib/api'

interface QuickEditProps {
  product: any
  onClose: () => void
  onUpdate: () => void
}

export function QuickEdit({ product, onClose, onUpdate }: QuickEditProps) {
  const [formData, setFormData] = useState({
    price: product.price,
    originalPrice: product.originalPrice || '',
    stock: product.stock,
    status: product.status,
    isBestSeller: product.isBestSeller || false,
    isFeatured: product.isFeatured || false,
    isHeroCarousel: product.isHeroCarousel || false
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      console.log('Updating product with data:', formData)
      const result = await api.updateProduct(product._id, formData)
      console.log('Update result:', result)
      
      if (result.error) {
        alert('Error: ' + result.error)
      } else {
        onUpdate()
        onClose()
      }
    } catch (error) {
      console.error('Failed to update product:', error)
      alert('Failed to update product: ' + error.message)
    }
    setLoading(false)
  }

  const discountPercent = formData.originalPrice && formData.originalPrice > formData.price
    ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
    : 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-luxury-black rounded-2xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-xl">Quick Edit: {product.name}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Price (₹)</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Original Price (₹) - Optional</label>
            <input
              type="number"
              value={formData.originalPrice}
              onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
            />
            {discountPercent > 0 && (
              <p className="text-sm text-green-600 mt-1">
                Discount: {discountPercent}% OFF
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stock Quantity</label>
            <input
              type="number"
              required
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                className="w-4 h-4 text-luxury-rosegold border-gray-300 rounded focus:ring-luxury-rosegold"
              />
              <span className="text-sm font-medium">Best Seller</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 text-luxury-rosegold border-gray-300 rounded focus:ring-luxury-rosegold"
              />
              <span className="text-sm font-medium">Featured Product</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isHeroCarousel}
                onChange={(e) => setFormData(prev => ({ ...prev, isHeroCarousel: e.target.checked }))}
                className="w-4 h-4 text-luxury-rosegold border-gray-300 rounded focus:ring-luxury-rosegold"
              />
              <span className="text-sm font-medium">Hero Carousel</span>
            </label>
          </div>

          <div className="flex space-x-4 mt-6">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Save size={18} />
              <span>{loading ? 'Updating...' : 'Update'}</span>
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}