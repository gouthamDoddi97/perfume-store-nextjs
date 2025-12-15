import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Review, Product } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { productId, customerPhone, customerName, rating, comment } = await request.json()

    if (!productId || !customerPhone || !customerName || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existingReview = await Review.findOne({ productId, customerPhone })
    if (existingReview) {
      return NextResponse.json({ error: 'You have already reviewed this product' }, { status: 400 })
    }

    const review = new Review({
      productId,
      customerPhone,
      customerName,
      rating,
      comment
    })
    await review.save()

    await updateProductRating(productId)

    return NextResponse.json({ message: 'Review submitted successfully', review })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const reviews = await Review.find({ 
      productId, 
      status: 'Approved' 
    }).sort({ createdAt: -1 })

    return NextResponse.json({ reviews })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

async function updateProductRating(productId: string) {
  const reviews = await Review.find({ productId, status: 'Approved' })
  
  if (reviews.length === 0) return

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = Math.round((totalRating / reviews.length) * 10) / 10

  await Product.findByIdAndUpdate(productId, {
    rating: averageRating,
    reviews: reviews.length
  })
}