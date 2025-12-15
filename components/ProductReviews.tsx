'use client'

import { useState } from 'react'
import ProductReview from './ProductReview'
import ReviewsList from './ReviewsList'

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleReviewSubmitted = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="space-y-8">
      <ProductReview 
        productId={productId} 
        onReviewSubmitted={handleReviewSubmitted}
      />
      
      <ReviewsList 
        productId={productId} 
        refreshTrigger={refreshTrigger}
      />
    </div>
  )
}