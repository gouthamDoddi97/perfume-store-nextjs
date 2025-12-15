'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import ProductReviews from '@/components/ProductReviews'

interface Product {
  _id: string
  name: string
  category: string
  size: string
  price: number
  originalPrice?: number
  description: string
  image: string
  notes: string[]
  rating: number
  reviews: number
  stock: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        const data = await response.json()
        
        if (response.ok) {
          setProduct(data.product)
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>
  }

  return (
    <div className="min-h-screen bg-luxury-cream dark:bg-luxury-darkgray">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-luxury-black dark:text-white mb-2">
                {product.name}
              </h1>
              <p className="text-luxury-rosegold text-lg">{product.category} • {product.size}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= product.rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-luxury-black dark:text-white">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Notes */}
            <div>
              <h3 className="font-semibold mb-2">Fragrance Notes:</h3>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-luxury-rosegold/20 text-luxury-black dark:text-white rounded-full text-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded-lg px-3 py-2"
                >
                  {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">
                  {product.stock} in stock
                </span>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-luxury-rosegold text-white py-3 px-6 rounded-lg hover:bg-opacity-90 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="p-3 border border-luxury-rosegold text-luxury-rosegold rounded-lg hover:bg-luxury-rosegold hover:text-white">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={productId} />
      </div>
    </div>
  )
}