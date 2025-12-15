'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Save, X } from 'lucide-react'
import Image from 'next/image'
import { api } from '@/lib/api'

interface ImageManagerProps {
  product: any
  onClose: () => void
  onUpdate: () => void
}

export function ImageManager({ product, onClose, onUpdate }: ImageManagerProps) {
  const [newImage, setNewImage] = useState('')
  const [imagePreview, setImagePreview] = useState(product.image)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setNewImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newImage) return
    
    setLoading(true)
    try {
      await api.updateProduct(product._id, { image: newImage })
      onUpdate()
      onClose()
    } catch (error) {
      console.error('Failed to update image:', error)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-luxury-black rounded-2xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-xl">Change Product Image</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="font-medium mb-2">{product.name}</p>
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src={imagePreview}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div>
                <label className="cursor-pointer">
                  <span className="text-luxury-rosegold hover:text-luxury-gold font-medium">
                    Upload new image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG, GIF up to 10MB
              </p>
            </div>

            <div className="flex space-x-4">
              <motion.button
                type="submit"
                disabled={loading || !newImage}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Save size={18} />
                <span>{loading ? 'Updating...' : 'Update Image'}</span>
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
        </div>
      </motion.div>
    </div>
  )
}