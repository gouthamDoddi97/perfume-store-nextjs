'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface ProductReviewProps {
  productId: string
  onReviewSubmitted?: () => void
}

export default function ProductReview({ productId, onReviewSubmitted }: ProductReviewProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!rating || !customerName || !customerPhone) {
      setMessage('Please fill all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          customerPhone,
          customerName,
          rating,
          comment
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessage('Review submitted successfully!')
        setRating(0)
        setComment('')
        setCustomerName('')
        setCustomerPhone('')
        onReviewSubmitted?.()
      } else {
        setMessage(data.error || 'Failed to submit review')
      }
    } catch (error) {
      setMessage('Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Rate this Product</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Your Rating *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-luxury-rosegold"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone *</label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-luxury-rosegold"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-luxury-rosegold"
            placeholder="Share your experience with this product..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-luxury-rosegold text-white py-3 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>

        {message && (
          <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}