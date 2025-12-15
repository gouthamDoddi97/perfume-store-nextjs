import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Product, Admin, Offer } from '@/lib/models'

export async function GET() {
  return NextResponse.json({ message: 'Use POST method to seed database' })
}

export async function POST() {
  try {
    console.log('Connecting to database...')
    await connectDB()
    console.log('Database connected successfully')

    // Test simple operation first
    const adminCount = await Admin.countDocuments()
    console.log('Admin count:', adminCount)

    // Create admin user
    await Admin.findOneAndUpdate(
      { username: 'admin@moonlight' },
      {
        username: 'admin@moonlight',
        password: 'moonlight2024',
        name: 'Admin',
        role: 'admin'
      },
      { upsert: true }
    )
    console.log('Admin created/updated')

    // Seed products with proper categories
    const products = [
      {
        name: 'Royal Oud Intense',
        category: 'Oud',
        subCategory: 'Unisex',
        size: '50ml',
        price: 4999,
        originalPrice: 6999,
        stock: 15,
        description: 'Premium oud fragrance with rich, woody notes',
        notes: ['Oud', 'Rose', 'Saffron'],
        rating: 4.8,
        reviews: 124,
        isBestSeller: true,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop'
      },
      {
        name: 'Mystic Rose Attar',
        category: 'Attar',
        subCategory: 'Traditional',
        size: '12ml',
        price: 2499,
        originalPrice: 3499,
        stock: 8,
        description: 'Traditional rose attar with jasmine undertones',
        notes: ['Rose', 'Jasmine', 'Sandalwood'],
        rating: 4.9,
        reviews: 89,
        isBestSeller: true,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop'
      },
      {
        name: 'Midnight Elegance',
        category: 'Perfume',
        subCategory: 'Male',
        size: '100ml',
        price: 3999,
        originalPrice: 5499,
        stock: 12,
        description: 'Sophisticated masculine fragrance for evening wear',
        notes: ['Bergamot', 'Cedar', 'Musk'],
        rating: 4.6,
        reviews: 67,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop'
      },
      {
        name: 'Floral Dreams',
        category: 'Perfume',
        subCategory: 'Female',
        size: '75ml',
        price: 3499,
        stock: 20,
        description: 'Delicate floral perfume perfect for daily wear',
        notes: ['Peony', 'Lily', 'White Musk'],
        rating: 4.7,
        reviews: 95,
        image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=400&fit=crop'
      },
      {
        name: 'Saffron Majesty Attar',
        category: 'Attar',
        subCategory: 'Traditional',
        size: '6ml',
        price: 1999,
        stock: 15,
        description: 'Pure saffron attar with royal essence',
        notes: ['Saffron', 'Rose', 'Amber'],
        rating: 4.8,
        reviews: 43,
        image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop'
      },
      {
        name: 'Luxury Gift Collection',
        category: 'Gift Set',
        subCategory: 'Unisex',
        size: 'Set of 3',
        price: 7999,
        originalPrice: 9999,
        stock: 5,
        description: 'Premium gift set with 3 signature fragrances',
        notes: ['Mixed Collection'],
        rating: 4.9,
        reviews: 28,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1549558549-415fe4c37b60?w=400&h=400&fit=crop'
      }
    ]

    for (const productData of products) {
      await Product.findOneAndUpdate(
        { name: productData.name },
        productData,
        { upsert: true }
      )
    }

    console.log('Products seeded successfully')
    return NextResponse.json({ 
      message: 'Database seeded successfully',
      productsCount: products.length,
      categories: {
        Attar: products.filter(p => p.category === 'Attar').length,
        Perfume: products.filter(p => p.category === 'Perfume').length,
        Oud: products.filter(p => p.category === 'Oud').length,
        'Gift Set': products.filter(p => p.category === 'Gift Set').length
      }
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ 
      error: 'Failed to seed database', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}