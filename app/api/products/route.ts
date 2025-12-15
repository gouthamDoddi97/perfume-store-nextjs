import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Product } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const subCategory = searchParams.get('subCategory')
    const bestSellers = searchParams.get('bestSellers')
    const featured = searchParams.get('featured')
    const heroCarousel = searchParams.get('heroCarousel')
    
    let query: any = { status: 'Active' }
    
    if (category) query.category = category
    if (subCategory) query.subCategory = subCategory
    if (bestSellers === 'true') query.isBestSeller = true
    if (featured === 'true') query.isFeatured = true
    if (heroCarousel === 'true') query.isHeroCarousel = true
    
    console.log('API Query:', query)
    console.log('Hero carousel param:', heroCarousel)
    
    const products = await Product.find(query)
      .select('name category subCategory size price originalPrice stock image notes rating reviews isBestSeller isFeatured isHeroCarousel status')
      .lean()
      .sort({ createdAt: -1 })
      .limit(50)
    
    console.log('Products found:', products.length)
    if (heroCarousel === 'true') {
      console.log('Hero products returned:', products.map(p => ({ name: p.name, hasImage: !!p.image, price: p.price })))
    }
    
    const allProducts = await Product.find({ status: 'Active' }).select('name isHeroCarousel image price')
    console.log('All active products:', allProducts.map(p => ({ name: p.name, isHeroCarousel: p.isHeroCarousel, hasImage: !!p.image, price: p.price })))
    
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()
    
    console.log('Received product data:', data)
    
    const product = new Product({
      ...data,
      status: 'Active'
    })
    
    console.log('Creating product:', product)
    await product.save()
    console.log('Product saved successfully')
    
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json({ 
      error: 'Failed to create product', 
      details: error.message 
    }, { status: 500 })
  }
}