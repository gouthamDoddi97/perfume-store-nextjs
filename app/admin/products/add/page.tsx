'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Save, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Attar',
    subCategory: 'Traditional',
    size: '',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    image: '',
    notes: '',
    isBestSeller: false,
    isFeatured: false,
    isHeroCarousel: false
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData(prev => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    
    if (!formData.image) {
      alert('Please upload a product image')
      return
    }
    
    if (!formData.name || !formData.category || !formData.size || !formData.price || !formData.stock) {
      alert('Please fill all required fields')
      return
    }
    
    setLoading(true)
    
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: Number(formData.stock),
        notes: formData.notes.split(',').map(note => note.trim()).filter(Boolean)
      }
      
      console.log('Creating product:', productData)
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      })
      
      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Product created:', result)
      
      if (result.error) {
        alert('Error: ' + result.error + (result.details ? ' - ' + result.details : ''))
      } else {
        alert('Product added successfully!')
        router.push('/admin/products')
      }
    } catch (error) {
      console.error('Failed to create product:', error)
      alert('Failed to create product: ' + (error.message || 'Network error'))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </button>
          
          <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-luxury-black rounded-2xl luxury-shadow p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const newCategory = e.target.value
                  setFormData(prev => ({ 
                    ...prev, 
                    category: newCategory,
                    subCategory: newCategory === 'Perfume' ? 'Male' : 
                               newCategory === 'Attar' ? 'Traditional' : 'Unisex'
                  }))
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
              >
                <option value="Attar">Attar</option>
                <option value="Perfume">Perfume</option>
                <option value="Oud">Oud</option>
                <option value="Gift Set">Gift Set</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sub Category</label>
              <select
                value={formData.subCategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
              >
                {formData.category === 'Perfume' && (
                  <>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                  </>
                )}
                {formData.category === 'Attar' && (
                  <>
                    <option value="Traditional">Traditional</option>
                    <option value="Modern">Modern</option>
                    <option value="Unisex">Unisex</option>
                  </>
                )}
                {(formData.category === 'Oud' || formData.category === 'Gift Set') && (
                  <>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <input
                type="text"
                required
                placeholder="e.g., 50ml, 12ml"
                value={formData.size}
                onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price (₹)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Original Price (₹) - Optional</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fragrance Notes (comma separated)</label>
              <input
                type="text"
                placeholder="e.g., Rose, Jasmine, Sandalwood"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-rosegold focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('')
                      setFormData(prev => ({ ...prev, image: '' }))
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <label className="cursor-pointer">
                      <span className="text-luxury-rosegold hover:text-luxury-gold font-medium">
                        Upload an image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                className="rounded border-gray-300 text-luxury-rosegold focus:ring-luxury-rosegold"
              />
              <span>Best Seller</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="rounded border-gray-300 text-luxury-rosegold focus:ring-luxury-rosegold"
              />
              <span>Featured Product</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isHeroCarousel}
                onChange={(e) => setFormData(prev => ({ ...prev, isHeroCarousel: e.target.checked }))}
                className="rounded border-gray-300 text-luxury-rosegold focus:ring-luxury-rosegold"
              />
              <span>Hero Carousel</span>
            </label>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-luxury-rosegold to-luxury-gold text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            <Save size={20} />
            <span>{loading ? 'Creating Product...' : 'Create Product'}</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}