import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Product } from '@/lib/models'

export async function POST() {
  try {
    await connectDB()
    
    // Force update all products to have isHeroCarousel field
    const result = await Product.updateMany(
      {},
      { $set: { isHeroCarousel: false } }
    )
    
    console.log('Migration result:', result)
    
    // Verify the update
    const products = await Product.find({}).select('name isHeroCarousel')
    console.log('Products after migration:', products)
    
    return NextResponse.json({ 
      message: 'Migration completed successfully',
      modifiedCount: result.modifiedCount,
      products: products
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ 
      error: 'Migration failed', 
      details: error.message 
    }, { status: 500 })
  }
}