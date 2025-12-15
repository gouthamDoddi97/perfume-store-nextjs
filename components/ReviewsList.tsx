'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface Review {
  _id: string
  customerName: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewsListProps {
  productId: string
  refreshTrigger?: number
}

export default function ReviewsList({ productId, refreshTrigger }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`)
      const data = await response.json()
      
      if (response.ok) {
        setReviews(data.reviews)
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [productId, refreshTrigger])

  if (loading) {
    return <div className="text-center py-4">Loading reviews...</div>
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to review this product!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews ({reviews.length})</h3>
      
      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{review.customerName}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          {review.comment && (
            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  )
}